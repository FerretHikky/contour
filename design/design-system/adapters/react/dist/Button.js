import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useId } from "react";
import { Icon } from "./Icon.js";
import { buttonBehavior } from "./buttonBehavior.js";
export const BUTTON_VARIANTS = [
    "primary",
    "secondary",
    "tertiary",
    "ghost",
    "danger",
    "success",
];
export const BUTTON_SIZES = ["s", "m", "l"];
/**
 * React Web adapter for the canonical Core Button.
 *
 * Presentation remains in Core CSS; this component owns only React rendering,
 * native button props and the declarative accessibility state.
 * The owner marker prevents Core's DOM observer from re-deriving React state.
 */
export const Button = forwardRef(function Button({ children, variant = "primary", size = "m", loading = false, skeleton = false, subtitle, startIcon, endIcon, block = false, className, disabled = false, type = "button", ...nativeProps }, ref) {
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
    return (_jsxs("button", { ...nativeProps, ref: ref, type: type, className: classes, ...behavior, "aria-labelledby": nativeProps["aria-labelledby"] ??
            (hasSubtitle && !nativeProps["aria-label"] ? labelId : undefined), "aria-describedby": describedBy, "data-rf-state-owner": "react", "data-loading": isLoading ? "true" : undefined, "data-skeleton": skeleton ? "true" : undefined, children: [_jsxs("span", { className: "rf-button__content", children: [startIcon ? _jsx(Icon, { name: startIcon }) : null, _jsxs("span", { className: "rf-button__copy", children: [_jsx("span", { className: "rf-button__label", id: labelId, children: children }), hasSubtitle ? (_jsx("span", { className: "rf-button__subtitle", id: subtitleId, children: subtitle })) : null] }), endIcon ? _jsx(Icon, { name: endIcon }) : null] }), isLoading ? (_jsx("span", { className: "rf-button__spinner", "aria-hidden": "true", "data-rf-loading-indicator": "" })) : null] }));
});
Button.displayName = "Button";
//# sourceMappingURL=Button.js.map