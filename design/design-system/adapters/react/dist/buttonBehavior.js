/** Shared availability contract for both React button presentations. */
export function buttonBehavior({ disabled = false, loading, skeleton, "aria-disabled": ariaDisabled, "aria-busy": ariaBusy, onClick, onClickCapture, onKeyDown, onKeyDownCapture, }) {
    const nativeDisabled = disabled || loading || skeleton;
    const unavailable = nativeDisabled || ariaDisabled === true || ariaDisabled === "true";
    const block = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return {
        // aria-disabled alone deliberately keeps the action in the keyboard order.
        disabled: nativeDisabled,
        "aria-disabled": unavailable ? true : ariaDisabled,
        "aria-busy": loading || skeleton ? true : ariaBusy,
        onClickCapture: (event) => {
            if (unavailable)
                return block(event);
            onClickCapture?.(event);
        },
        onClick: (event) => {
            if (unavailable)
                return block(event);
            onClick?.(event);
        },
        onKeyDownCapture: (event) => {
            if (unavailable && (event.key === "Enter" || event.key === " "))
                return block(event);
            onKeyDownCapture?.(event);
        },
        onKeyDown: (event) => {
            if (unavailable && (event.key === "Enter" || event.key === " "))
                return block(event);
            onKeyDown?.(event);
        },
    };
}
//# sourceMappingURL=buttonBehavior.js.map