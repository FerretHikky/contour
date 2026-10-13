import type { HTMLAttributes } from "react";
export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
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
export declare function Icon({ name, variant, iconStyle, state, size, className, ...nativeProps }: IconProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Icon.d.ts.map