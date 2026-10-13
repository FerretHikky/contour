import type { ButtonHTMLAttributes, ReactNode } from "react";
export declare const BUTTON_VARIANTS: readonly ["primary", "secondary", "tertiary", "ghost", "danger", "success"];
export declare const BUTTON_SIZES: readonly ["s", "m", "l"];
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
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
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map