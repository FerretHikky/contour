import { AsYouType, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js/min';
import examples from 'libphonenumber-js/mobile/examples';
export { getCountries, getCountryCallingCode };
export function normalizePhoneInput(text, country) {
    const ascii = text.normalize('NFKC').replace(/[٠-٩]/g, c => String(c.charCodeAt(0) - 1632)).replace(/[۰-۹]/g, c => String(c.charCodeAt(0) - 1776));
    const digits = ascii.replace(/\D/g, '');
    if (!digits)
        return ascii.trim().startsWith('+') ? '+' : '';
    if (ascii.trim().startsWith('+'))
        return '+' + digits;
    if (digits.startsWith('00'))
        return '+' + digits.slice(2);
    const formatter = new AsYouType(country);
    formatter.input(digits);
    return formatter.getNumberValue() || '+' + getCountryCallingCode(country) + digits;
}
export function phoneDisplay(value) { return new AsYouType().input(value); }
export function phoneMask(country) {
    return getExampleNumber(country, examples)?.formatInternational().replace(/^(\+\d+) (.*)$/, (_, prefix, national) => prefix + ' ' + national.replace(/\d/g, '0')) || '+' + getCountryCallingCode(country);
}
export function phoneDetails(value, country, allowed) {
    const number = parsePhoneNumberFromString(value);
    const detected = number?.country;
    const fallback = number && number.countryCallingCode !== getCountryCallingCode(country) ? getCountries().find(code => getCountryCallingCode(code) === number.countryCallingCode && allowed.includes(code)) : country;
    // Shared calling codes need a selected territory until metadata can distinguish it.
    const matches = detected ? allowed.includes(detected) : !!number && !!fallback && allowed.includes(fallback) && number.countryCallingCode === getCountryCallingCode(fallback);
    return { country: detected || fallback || country, valid: !!number && number.isPossible() && matches, e164: number?.number || value };
}
export function caretAfterDigits(text, count) {
    if (count <= 0)
        return text.startsWith('+') ? 1 : 0;
    for (let i = 0, n = 0; i < text.length; i++)
        if (/\d/.test(text[i]) && ++n === count)
            return i + 1;
    return text.length;
}
export function phoneNationalDisplay(value, country) {
    const prefix = '+' + getCountryCallingCode(country);
    const display = phoneDisplay(value);
    return display.startsWith(prefix) ? display.slice(prefix.length).trimStart() : display;
}
//# sourceMappingURL=phone.js.map