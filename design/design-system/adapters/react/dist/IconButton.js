import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from "react";
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
];
export const ICON_BUTTON_SIZES = ["s", "m", "l"];
/** React Web adapter; the owner marker keeps derived state under React control. */
export const IconButton = forwardRef(function IconButton({ label, icon, variant = "primary", size = "m", loading = false, skeleton = false, className, disabled = false, type = "button", ...nativeProps }, ref) {
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
    return (_jsxs("button", { ...nativeProps, ref: ref, type: type, className: classes, "aria-label": label, ...behavior, "data-rf-state-owner": "react", "data-loading": isLoading ? "true" : undefined, "data-skeleton": skeleton ? "true" : undefined, children: [_jsx("span", { className: "rf-button__content", children: _jsx(Icon, { name: icon }) }), isLoading ? (_jsx("span", { className: "rf-button__spinner", "aria-hidden": "true", "data-rf-loading-indicator": "" })) : null] }));
});
IconButton.displayName = "IconButton";
//# sourceMappingURL=IconButton.js.map