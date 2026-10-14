import { getCountries, getCountryCallingCode } from 'libphonenumber-js/min';
import type { CountryCode } from 'libphonenumber-js';
export type { CountryCode } from 'libphonenumber-js';
export { getCountries, getCountryCallingCode };
export declare function normalizePhoneInput(text: string, country: CountryCode): string;
export declare function phoneDisplay(value: string): string;
export declare function phoneMask(country: CountryCode): string;
export declare function phoneDetails(value: string, country: CountryCode, allowed: readonly CountryCode[]): {
    country: CountryCode;
    valid: boolean;
    e164: string;
};
export declare function caretAfterDigits(text: string, count: number): number;
export declare function phoneNationalDisplay(value: string, country: CountryCode): string;
//# sourceMappingURL=phone.d.ts.map