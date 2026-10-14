import type { InputHTMLAttributes } from 'react';
import { phoneDetails } from './phone.js';
import type { CountryCode } from './phone.js';
export interface PhoneFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'size' | 'defaultValue'> {
    value: string;
    onValueChange: (value: string, details: ReturnType<typeof phoneDetails>) => void;
    label: string;
    countryLabel: string;
    clearLabel?: string;
    invalidMessage: string;
    defaultCountry?: CountryCode;
    countries?: readonly CountryCode[];
    locale?: string;
}
/** Controlled international value; formatting never sends data or verifies ownership. */
export declare const PhoneField: import("react").ForwardRefExoticComponent<PhoneFieldProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=PhoneField.d.ts.map