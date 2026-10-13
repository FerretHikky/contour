import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

import { Icon } from "./Icon.js";
import { buttonBehavior } from "./buttonBehavior.js";

export const ICON_BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "ghost",
  "danger",
  "success",
  "close",
] as const;

export const ICON_BUTTON_SIZES = ["s", "m", "l"] as const;

export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number];

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
  /** Localized accessible name of the action. */
  label: string;
  /** Canonical name from the local Reflower icon registry. */
  icon: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  loading?: boolean;
  skeleton?: boolean;
}

/** React Web adapter; the owner marker keeps derived state under React control. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      icon,
      variant = "primary",
      size = "m",
      loading = false,
      skeleton = false,
      className,
      disabled = false,
      type = "button",
      ...nativeProps
    },
    ref,
  ) {
    const isLoading = loading && !skeleton;
    const behavior = buttonBehavior({ ...nativeProps, disabled, loading, skeleton });
    const classes = [
      "rf-icon-button",
      `rf-icon-button--${variant}`,
      size === "m" ? null : `rf-icon-button--${size}`,
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
        aria-label={label}
        {...behavior}
        data-rf-state-owner="react"
        data-loading={isLoading ? "true" : undefined}
        data-skeleton={skeleton ? "true" : undefined}
      >
        <span className="rf-button__content">
          <Icon name={icon} />
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
  },
);

IconButton.displayName = "IconButton";
