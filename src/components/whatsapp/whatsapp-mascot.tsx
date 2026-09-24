"use client";

import {
  Alignment,
  Fit,
  Layout,
  RuntimeLoader,
  StateMachineInputType,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas-lite";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  KAJU_CAT_RIVE,
  type RiveAssetAudit,
  type RiveInputAudit,
} from "./rive-config";
import styles from "./whatsapp-system.module.css";

RuntimeLoader.setWasmUrl("/animations/rive.wasm");
RuntimeLoader.setWasmFallbackUrl(null);

type WhatsAppMascotProps = {
  className?: string;
  compact?: boolean;
  enableTracking?: boolean;
  onAssetAudit?: (audit: RiveAssetAudit) => void;
  presentation?: "panel" | "button";
  reactionSignal?: number;
};

const layout = new Layout({
  fit: Fit.Contain,
  alignment: Alignment.BottomCenter,
});

const inputTypeLabels: Record<number, RiveInputAudit["type"]> = {
  [StateMachineInputType.Number]: "Número",
  [StateMachineInputType.Trigger]: "Disparador",
  [StateMachineInputType.Boolean]: "Booleano",
};

type RiveStateMachineInput = ReturnType<typeof useStateMachineInput>;

function setBooleanInput(
  input: RiveStateMachineInput,
  value: boolean,
): void {
  if (!input) return;
  try {
    // The runtime can invalidate the underlying input during unmount.
    input.value = value;
  } catch {
    // Cleanup must stay silent once the Rive instance has been disposed.
  }
}

function readReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function WhatsAppMascot({
  className,
  compact = false,
  enableTracking = false,
  onAssetAudit,
  presentation = "panel",
  reactionSignal = 0,
}: WhatsAppMascotProps) {
  const [hasLoadError, setHasLoadError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(readReducedMotion);
  const lastQuadrant = useRef("");
  const previousReaction = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const { rive, RiveComponent } = useRive(
    {
      src: KAJU_CAT_RIVE.src,
      artboard: KAJU_CAT_RIVE.artboard,
      stateMachine: KAJU_CAT_RIVE.stateMachine,
      autoplay: !prefersReducedMotion,
      layout,
      shouldDisableRiveListeners: true,
      automaticallyHandleEvents: false,
      onLoadError: () => setHasLoadError(true),
      onRiveReady: (instance) => {
        const artboards = instance.contents.artboards ?? [];
        const primary =
          artboards.find((item) => item.name === KAJU_CAT_RIVE.artboard) ??
          artboards[0];

        if (!primary) return;
        onAssetAudit?.({
          artboard: primary.name,
          animations: [...primary.animations],
          stateMachines: primary.stateMachines.map((machine) => ({
            name: machine.name,
            inputs: machine.inputs.map((input) => ({
              name: input.name,
              type: inputTypeLabels[input.type] ?? "Desconocido",
              initialValue: input.initialValue,
            })),
          })),
        });
      },
    },
    {
      shouldUseIntersectionObserver: true,
      useDevicePixelRatio: true,
    },
  );

  const interactionStateMachine =
    enableTracking || reactionSignal > 0
      ? KAJU_CAT_RIVE.stateMachine
      : undefined;

  const clickInput = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.click : undefined,
  );
  const unclickInput = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.unclick : undefined,
  );
  const rightTrackTop = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.rightTrackTop : undefined,
  );
  const leftTrackBottom = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.leftTrackBottom : undefined,
  );
  const rightTrackBottom = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.rightTrackBottom : undefined,
  );
  const mouseTracking = useStateMachineInput(
    rive,
    interactionStateMachine,
    interactionStateMachine ? KAJU_CAT_RIVE.inputs.mouseTracking : undefined,
  );

  const canTrackPointer = useMemo(
    () =>
      enableTracking &&
      !prefersReducedMotion &&
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches,
    [enableTracking, prefersReducedMotion],
  );

  const resetTracking = useCallback(() => {
    lastQuadrant.current = "";
    setBooleanInput(rightTrackTop, false);
    setBooleanInput(leftTrackBottom, false);
    setBooleanInput(rightTrackBottom, false);
    setBooleanInput(mouseTracking, false);
  }, [leftTrackBottom, mouseTracking, rightTrackBottom, rightTrackTop]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!rive) return;
    if (prefersReducedMotion) {
      resetTracking();
      rive.pause(KAJU_CAT_RIVE.stateMachine);
    } else {
      rive.play(KAJU_CAT_RIVE.stateMachine);
    }
  }, [prefersReducedMotion, resetTracking, rive]);

  useEffect(() => {
    if (
      reactionSignal === 0 ||
      reactionSignal === previousReaction.current ||
      prefersReducedMotion
    ) {
      return;
    }

    previousReaction.current = reactionSignal;
    clickInput?.fire();
    const timer = window.setTimeout(() => unclickInput?.fire(), 460);
    return () => window.clearTimeout(timer);
  }, [clickInput, prefersReducedMotion, reactionSignal, unclickInput]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canTrackPointer) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const isRight = event.clientX - bounds.left >= bounds.width / 2;
    const isBottom = event.clientY - bounds.top >= bounds.height / 2;
    const quadrant = `${isRight ? "right" : "left"}-${
      isBottom ? "bottom" : "top"
    }`;

    if (quadrant === lastQuadrant.current) return;
    lastQuadrant.current = quadrant;
    setBooleanInput(mouseTracking, true);
    setBooleanInput(rightTrackTop, isRight && !isBottom);
    setBooleanInput(leftTrackBottom, !isRight && isBottom);
    setBooleanInput(rightTrackBottom, isRight && isBottom);
  };

  useEffect(() => {
    if (!canTrackPointer || !rive || !mouseTracking) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateTracking = () => {
      frame = 0;
      const root = rootRef.current;
      if (!root) return;

      const bounds = root.getBoundingClientRect();
      const isRight = pointerX >= bounds.left + bounds.width / 2;
      const isBottom = pointerY >= bounds.top + bounds.height / 2;
      const quadrant = `${isRight ? "right" : "left"}-${
        isBottom ? "bottom" : "top"
      }`;

      if (quadrant === lastQuadrant.current) return;
      lastQuadrant.current = quadrant;
      setBooleanInput(mouseTracking, true);
      setBooleanInput(rightTrackTop, isRight && !isBottom);
      setBooleanInput(leftTrackBottom, !isRight && isBottom);
      setBooleanInput(rightTrackBottom, isRight && isBottom);
    };

    const trackPointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === 0) frame = window.requestAnimationFrame(updateTracking);
    };

    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", trackPointer);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      resetTracking();
    };
  }, [
    canTrackPointer,
    leftTrackBottom,
    mouseTracking,
    resetTracking,
    rightTrackBottom,
    rightTrackTop,
    rive,
  ]);

  return (
    <div
      aria-hidden="true"
      className={[
        styles.mascot,
        compact ? styles.mascotCompact : "",
        presentation === "button" ? styles.mascotButton : "",
        hasLoadError ? styles.mascotFailed : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerLeave={resetTracking}
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      {!hasLoadError ? (
        <RiveComponent
          aria-hidden="true"
          className={styles.riveCanvas}
          role="presentation"
        />
      ) : null}
    </div>
  );
}
