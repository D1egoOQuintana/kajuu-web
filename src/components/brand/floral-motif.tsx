type FloralMotifProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function FloralMotif({
  className,
  tone = "light",
}: FloralMotifProps) {
  return (
    <svg
      aria-hidden="true"
      className={[
        "floral-motif",
        tone === "dark" ? "floral-motif--dark" : "floral-motif--light",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      fill="none"
      focusable="false"
      viewBox="0 0 620 620"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M152 494C251 468 327 396 361 296C386 222 379 146 342 82C445 157 489 275 450 380C412 482 297 540 152 494Z"
        fill="currentColor"
        opacity="0.1"
      />
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      >
        <path d="M86 548C190 520 273 459 323 365C371 275 381 176 352 78" />
        <path d="M119 489C196 436 238 365 244 276C249 202 229 137 184 82C298 110 376 178 409 286C438 383 407 469 319 544" />
        <path d="M174 532C260 520 336 484 401 423C467 361 506 285 520 194C440 225 378 274 333 341C292 401 273 465 276 533" />
        <path d="M246 277C294 255 339 250 383 262" />
      </g>
    </svg>
  );
}
