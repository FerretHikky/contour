import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, useId } from 'react';
import * as countryFlags from 'country-flag-icons/react/1x1';
import { caretAfterDigits, getCountries, getCountryCallingCode, normalizePhoneInput, phoneDetails, phoneNationalDisplay, phoneMask } from './phone.js';
const allCountries = getCountries();
/** Controlled international value; formatting never sends data or verifies ownership. */
export const PhoneField = forwardRef(function PhoneField({ value, onValueChange, label, countryLabel, clearLabel, invalidMessage, defaultCountry = 'US', countries = allCountries, locale = 'en', id, disabled, readOnly, required, ...props }, ref) {
    if (!countries.length || !countries.includes(defaultCountry))
        throw new Error('PhoneField needs an allowed defaultCountry');
    const [focused, setFocused] = useState(false);
    const errorId = useId(), [validationError, setValidationError] = useState('');
    const [within, setWithin] = useState(false);
    const countryInput = useRef(null);
    const [selected, setSelected] = useState(defaultCountry);
    const input = useRef(null), caret = useRef(null);
    useImperativeHandle(ref, () => input.current, []);
    const details = phoneDetails(value, selected, countries);
    const country = countries.includes(details.country) ? details.country : selected;
    const display = phoneNationalDisplay(value, country);
    const Flag = countryFlags[country];
    const nationalMask = phoneMask(country).replace(/^\+\d+\s*/, '');
    const names = new Intl.DisplayNames([locale], { type: 'region' });
    useLayoutEffect(() => {
        const node = input.current;
        if (!node)
            return;
        node.setCustomValidity(value && !details.valid ? invalidMessage : '');
        if (caret.current !== null && document.activeElement === node) {
            const position = caretAfterDigits(display, caret.current);
            node.setSelectionRange(position, position);
            caret.current = null;
        }
    }, [display, details.valid, invalidMessage, value]);
    useLayoutEffect(() => {
        const node = countryInput.current;
        if (!node)
            return;
        const change = () => { const next = node.value; if (!countries.includes(next))
            return; setSelected(next); setValidationError(''); caret.current = null; onValueChange('', phoneDetails('', next, countries)); queueMicrotask(() => input.current?.focus()); };
        node.addEventListener('change', change);
        return () => node.removeEventListener('change', change);
    }, [countries, onValueChange]);
    function update(text, position) {
        setValidationError('');
        const before = text.slice(0, position).replace(/\D/g, '').length;
        const next = normalizePhoneInput(text, country);
        const nextDetails = phoneDetails(next, country, countries);
        const nextCountry = countries.includes(nextDetails.country) ? nextDetails.country : country;
        const nextDisplay = phoneNationalDisplay(next, nextCountry);
        const offset = nextDisplay.replace(/\D/g, '').length - text.replace(/\D/g, '').length;
        caret.current = Math.max(0, before + offset);
        if (countries.includes(nextDetails.country))
            setSelected(nextDetails.country);
        onValueChange(next, nextDetails);
        // A separator-only edit leaves the controlled value unchanged.
        if (next === value && input.current) {
            input.current.value = display;
            const pos = caretAfterDigits(display, caret.current);
            input.current.setSelectionRange(pos, pos);
            caret.current = null;
        }
    }
    return _jsxs("div", { className: "rf-text-field-group", children: [_jsxs("div", { className: "rf-phone-field rf-text-field", onFocusCapture: () => setWithin(true), onBlurCapture: event => { if (!event.currentTarget.contains(event.relatedTarget))
                    setWithin(false); }, "data-disabled": disabled || undefined, "data-invalid": !!validationError || props['aria-invalid'] || undefined, children: [_jsxs("div", { className: "rf-phone-field__country rf-dropdown rf-dropdown--anchored", "data-rf-dropdown": "", "data-rf-dropdown-mode": "selection", children: [_jsxs("button", { type: "button", className: "rf-dropdown__trigger rf-phone-field__country-trigger", "data-rf-dropdown-trigger": "", "aria-label": countryLabel + ': ' + names.of(country) + ' (+' + getCountryCallingCode(country) + ')', disabled: disabled || readOnly || countries.length === 1, children: [_jsx("span", { "aria-hidden": "true", className: "rf-phone-field__flag", children: Flag && _jsx(Flag, {}) }), _jsxs("span", { className: "rf-phone-field__code", "aria-hidden": "true", children: ["+", getCountryCallingCode(country)] }), countries.length > 1 && _jsx("span", { className: "rf-icon rf-icon--sm", "data-rf-icon-glyph": "chevron-down", "data-rf-dropdown-chevron": "", "aria-hidden": "true" })] }), _jsx("input", { ref: countryInput, type: "hidden", "data-rf-dropdown-input": "", value: country, readOnly: true }), _jsx("div", { className: "rf-dropdown__panel", "data-rf-dropdown-panel": "", role: "listbox", "aria-label": countryLabel, hidden: true, children: [...countries].sort((a, b) => (names.of(a) || a).localeCompare(names.of(b) || b, locale)).map(code => {
                                    const OptionFlag = countryFlags[code];
                                    return _jsxs("div", { role: "option", className: "rf-dropdown__item rf-list-item", "data-value": code, "aria-selected": code === country, children: [_jsx("span", { className: "rf-phone-field__flag", "aria-hidden": "true", children: OptionFlag && _jsx(OptionFlag, {}) }), _jsxs("span", { "data-rf-dropdown-label": "", children: [names.of(code), " (+", getCountryCallingCode(code), ")"] })] }, code);
                                }) })] }), _jsx("div", { className: "rf-phone-field__number rf-text-field__control", children: _jsx("input", { ...props, id: id, ref: input, type: "tel", inputMode: "tel", autoComplete: "tel-national", dir: "ltr", className: clearLabel ? "rf-text-field rf-text-field--with-action" : "rf-text-field", placeholder: focused ? nationalMask : label, onFocus: event => { setFocused(true); props.onFocus?.(event); }, onBlur: event => { setFocused(false); props.onBlur?.(event); }, disabled: disabled, readOnly: readOnly, required: required, value: display, "aria-label": label + ' (+' + getCountryCallingCode(country) + ')', "aria-invalid": !!validationError || props['aria-invalid'] || undefined, "aria-describedby": [props['aria-describedby'], validationError ? errorId : null].filter(Boolean).join(' ') || undefined, onInvalid: event => { event.preventDefault(); setValidationError(invalidMessage); props.onInvalid?.(event); }, onChange: event => update(event.target.value, event.target.selectionStart ?? event.target.value.length), onKeyDown: event => {
                                props.onKeyDown?.(event);
                                if (event.defaultPrevented || readOnly || disabled || event.altKey || event.ctrlKey || event.metaKey)
                                    return;
                                const node = event.currentTarget, a = node.selectionStart ?? 0, b = node.selectionEnd ?? 0;
                                if (a !== b)
                                    return;
                                if (event.key === 'Backspace' && a > 0 && /[ ()-]/.test(display[a - 1])) {
                                    event.preventDefault();
                                    let at = a - 1;
                                    while (at > 0 && !/\d/.test(display[at]))
                                        at--;
                                    update(display.slice(0, at) + display.slice(a), at);
                                }
                                else if (event.key === 'Delete' && /[ ()-]/.test(display[a] || '')) {
                                    event.preventDefault();
                                    let at = a;
                                    while (at < display.length && !/\d/.test(display[at]))
                                        at++;
                                    update(display.slice(0, a) + display.slice(at + 1), a);
                                }
                            } }) }), clearLabel && within && display && !disabled && !readOnly && _jsx("span", { className: "rf-text-field__action", children: _jsx("button", { type: "button", className: "rf-text-field__action-trigger", "aria-label": clearLabel, onClick: () => { caret.current = null; setValidationError(''); onValueChange('', phoneDetails('', country, countries)); input.current?.focus(); }, children: _jsx("span", { className: "rf-icon rf-icon--md", "data-rf-icon-glyph": "close", "aria-hidden": "true" }) }) })] }), validationError && _jsx("span", { id: errorId, className: "rf-text-field__error", role: "alert", children: validationError })] });
});
//# sourceMappingURL=PhoneField.js.map