import type { ButtonHTMLAttributes } from "react";
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
/** Shared availability contract for both React button presentations. */
export declare function buttonBehavior({ disabled, loading, skeleton, "aria-disabled": ariaDisabled, "aria-busy": ariaBusy, onClick, onClickCapture, onKeyDown, onKeyDownCapture, }: Pick<NativeButtonProps, "disabled" | "aria-disabled" | "aria-busy" | "onClick" | "onClickCapture" | "onKeyDown" | "onKeyDownCapture"> & {
    loading: boolean;
    skeleton: boolean;
}): {
    disabled: boolean;
    "aria-disabled": boolean | "false" | undefined;
    "aria-busy": (boolean | "true" | "false") | undefined;
    onClickCapture: (event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClick: (event: import("react").MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onKeyDownCapture: (event: import("react").KeyboardEvent<HTMLButtonElement>) => void;
    onKeyDown: (event: import("react").KeyboardEvent<HTMLButtonElement>) => void;
};
export {};
//# sourceMappingURL=buttonBehavior.d.ts.map