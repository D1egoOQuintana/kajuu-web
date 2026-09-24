type BotanicalBloomProps = {
  className?: string;
  variant?:
    | "corner"
    | "stem"
    | "cluster"
    | "rose"
    | "hero-vine"
    | "footer-flower";
  motion?: "float" | "sway" | "breathe" | "none";
  tone?: "auto" | "light" | "dark";
};

const botanicalSources = {
  corner: "/brand/botanical/botanical-corner.svg",
  stem: "/brand/botanical/botanical-stem.svg",
  cluster: "/brand/botanical/botanical-cluster.svg",
  rose: "/brand/botanical/botanical-rose.svg",
  "hero-vine": "/brand/botanical/hero-floral-vine.svg",
  "footer-flower": "/brand/botanical/botanical-footer-flower.svg",
} as const;

export function BotanicalBloom({
  className,
  variant = "cluster",
  motion = "none",
  tone = "auto",
}: BotanicalBloomProps) {
  return (
    <span
      aria-hidden="true"
      className={[
        "botanical-bloom",
        `botanical-bloom--${variant}`,
        motion !== "none" ? `botanical-bloom--${motion}` : null,
        tone === "dark" ? "botanical-bloom--on-dark" : null,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span
        className="botanical-bloom__graphic"
        style={{
          WebkitMaskImage: `url(${botanicalSources[variant]})`,
          maskImage: `url(${botanicalSources[variant]})`,
        }}
      />
    </span>
  );
}
