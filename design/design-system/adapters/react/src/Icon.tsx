import { useEffect, useRef } from "react";
import type { HTMLAttributes } from "react";

export interface IconProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Canonical name from the local Reflower icon registry. */
  name: string;
  variant?: "brand" | "primary" | "secondary" | "tertiary" | "danger" | "success";
  /** Glyph style, separate from the native React style attribute. */
  iconStyle?: "line" | "solid" | "duotone";
  state?: "default" | "disabled" | "skeleton";
  size?: 12 | 16 | 24 | 32;
}

/**
 * Local glyph host. Inherits the parent's color unless variant is explicit.
 */
export function Icon({ name, variant, iconStyle = "line", state = "default", size = 24, className, ...nativeProps }: IconProps) {
  const hostRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let active = true;
    const host = hostRef.current;
    let cancel: (() => void) | undefined;
    host?.replaceChildren();
    void import("../icon-glyphs.js").then(runtime => {
      if (active && host) {
        cancel = () => runtime.cancel(host);
        return runtime.set(host, name, {style: iconStyle});
      }
    }).catch(() => {
      if (active && host) host.dataset.rfIconError = "load";
    });
    return () => {
      active = false;
      cancel?.();
    };
  }, [name, iconStyle]);

  const sizes = {12: "rf-icon--xs", 16: "rf-icon--sm", 24: "rf-icon--md", 32: "rf-icon--lg"};
  const classes = ["rf-icon", sizes[size], variant && `rf-icon--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      {...nativeProps}
      ref={hostRef}
      className={classes}
      data-rf-icon-glyph={name}
      data-rf-icon-style={iconStyle}
      data-state={state}
      role={nativeProps["aria-label"] ? "img" : undefined}
      aria-busy={state === "skeleton" && nativeProps["aria-label"] ? true : undefined}
      aria-hidden={nativeProps["aria-label"] ? undefined : true}
    />
  );
}
