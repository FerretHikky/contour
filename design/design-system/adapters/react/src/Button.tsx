import { forwardRef, useId } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Icon } from "./Icon.js";
import { buttonBehavior } from "./buttonBehavior.js";

export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "success",
] as const;

export const BUTTON_SIZES = ["s", "m", "l"] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  skeleton?: boolean;
  subtitle?: ReactNode;
  startIcon?: string;
  endIcon?: string;
  block?: boolean;
}

/**
 * React Web adapter for the canonical Core Button.
 *
 * Presentation remains in Core CSS; this component owns only React rendering,
 * native button props and the declarative accessibility state.
 * The owner marker prevents Core's DOM observer from re-deriving React state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "m",
    loading = false,
    skeleton = false,
    subtitle,
    startIcon,
    endIcon,
    block = false,
    className,
    disabled = false,
    type = "button",
    ...nativeProps
  },
  ref,
) {
  const id = useId();
  const hasSubtitle = Boolean(subtitle);
  const labelId = `${id}-label`;
  const subtitleId = `${id}-subtitle`;
  const isLoading = loading && !skeleton;
  const behavior = buttonBehavior({ ...nativeProps, disabled, loading, skeleton });
  const describedBy = [nativeProps["aria-describedby"], hasSubtitle ? subtitleId : undefined]
    .filter(Boolean)
    .join(" ") || undefined;
  const classes = [
    "rf-button",
    `rf-button--${variant}`,
    size === "m" ? null : `rf-button--${size}`,
    block ? "rf-button--block" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...nativeProps}
      ref={ref}
      type={type}
      className={classes}
      {...behavior}
      aria-labelledby={
        nativeProps["aria-labelledby"] ??
        (hasSubtitle && !nativeProps["aria-label"] ? labelId : undefined)
      }
      aria-describedby={describedBy}
      data-rf-state-owner="react"
      data-loading={isLoading ? "true" : undefined}
      data-skeleton={skeleton ? "true" : undefined}
    >
      <span className="rf-button__content">
        {startIcon ? <Icon name={startIcon} /> : null}
        <span className="rf-button__copy">
          <span className="rf-button__label" id={labelId}>{children}</span>
          {hasSubtitle ? (
            <span className="rf-button__subtitle" id={subtitleId}>
              {subtitle}
            </span>
          ) : null}
        </span>
        {endIcon ? <Icon name={endIcon} /> : null}
      </span>
      {isLoading ? (
        <span
          className="rf-button__spinner"
          aria-hidden="true"
          data-rf-loading-indicator=""
        />
      ) : null}
    </button>
  );
});

Button.displayName = "Button";
