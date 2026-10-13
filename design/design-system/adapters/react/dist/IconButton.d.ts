import type { ButtonHTMLAttributes } from "react";
export declare const ICON_BUTTON_VARIANTS: readonly ["primary", "secondary", "tertiary", "ghost", "danger", "success", "close"];
export declare const ICON_BUTTON_SIZES: readonly ["s", "m", "l"];
export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];
export type IconButtonSize = (typeof ICON_BUTTON_SIZES)[number];
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "aria-label"> {
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
export declare const IconButton: import("react").ForwardRefExoticComponent<IconButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=IconButton.d.ts.map