import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
/**
 * Local glyph host. Inherits the parent's color unless variant is explicit.
 */
export function Icon({ name, variant, iconStyle = "line", state = "default", size = 24, className, ...nativeProps }) {
    const hostRef = useRef(null);
    useEffect(() => {
        let active = true;
        const host = hostRef.current;
        let cancel;
        host?.replaceChildren();
        void import("../icon-glyphs.js").then(runtime => {
            if (active && host) {
                cancel = () => runtime.cancel(host);
                return runtime.set(host, name, { style: iconStyle });
            }
        }).catch(() => {
            if (active && host)
                host.dataset.rfIconError = "load";
        });
        return () => {
            active = false;
            cancel?.();
        };
    }, [name, iconStyle]);
    const sizes = { 12: "rf-icon--xs", 16: "rf-icon--sm", 24: "rf-icon--md", 32: "rf-icon--lg" };
    const classes = ["rf-icon", sizes[size], variant && `rf-icon--${variant}`, className]
        .filter(Boolean)
        .join(" ");
    return (_jsx("span", { ...nativeProps, ref: hostRef, className: classes, "data-rf-icon-glyph": name, "data-rf-icon-style": iconStyle, "data-state": state, role: nativeProps["aria-label"] ? "img" : undefined, "aria-busy": state === "skeleton" && nativeProps["aria-label"] ? true : undefined, "aria-hidden": nativeProps["aria-label"] ? undefined : true }));
}
//# sourceMappingURL=Icon.js.map