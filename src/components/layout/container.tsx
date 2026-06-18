import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
