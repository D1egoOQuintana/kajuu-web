export const KAJU_CAT_RIVE = {
  src: "/animations/kaju-cat.riv",
  artboard: "Artboard",
  stateMachine: "State Machine 1",
  inputs: {
    click: "Click",
    unclick: "Unclick",
    rightTrackTop: "Right track top",
    leftTrackBottom: "Left track bottom",
    rightTrackBottom: "Right track bottom",
    mouseTracking: "mouse tracking",
  },
} as const;

export type RiveInputAudit = {
  name: string;
  type: "Booleano" | "Disparador" | "Número" | "Desconocido";
  initialValue?: boolean | number;
};

export type RiveAssetAudit = {
  artboard: string;
  animations: string[];
  stateMachines: Array<{
    name: string;
    inputs: RiveInputAudit[];
  }>;
};
