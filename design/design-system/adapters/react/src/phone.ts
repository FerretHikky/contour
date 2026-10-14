import { AsYouType, getCountries, getCountryCallingCode, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js/min';
import examples from 'libphonenumber-js/mobile/examples';
import type { CountryCode } from 'libphonenumber-js';
export type { CountryCode } from 'libphonenumber-js';
export { getCountries, getCountryCallingCode };
export function normalizePhoneInput(text: string, country: CountryCode): string {
  const ascii = text.normalize('NFKC').replace(/[٠-٩]/g, c => String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g, c => String(c.charCodeAt(0)-1776));
  const digits = ascii.replace(/\D/g, '');
  if (!digits) return ascii.trim().startsWith('+') ? '+' : '';
  if (ascii.trim().startsWith('+')) return '+' + digits;
  if (digits.startsWith('00')) return '+' + digits.slice(2);
  const formatter = new AsYouType(country);
  formatter.input(digits);
  return formatter.getNumberValue() || '+' + getCountryCallingCode(country) + digits;
}
export function phoneDisplay(value: string): string { return new AsYouType().input(value); }
export function phoneMask(country: CountryCode): string {
  return getExampleNumber(country, examples)?.formatInternational().replace(/^(\+\d+) (.*)$/, (_, prefix: string, national: string) => prefix + ' ' + national.replace(/\d/g, '0')) || '+' + getCountryCallingCode(country);
}
export function phoneDetails(value: string, country: CountryCode, allowed: readonly CountryCode[]) {
  const number = parsePhoneNumberFromString(value);
  const detected = number?.country;
  const fallback = number && number.countryCallingCode !== getCountryCallingCode(country) ? getCountries().find(code => getCountryCallingCode(code) === number.countryCallingCode && allowed.includes(code)) : country;
  // Shared calling codes need a selected territory until metadata can distinguish it.
  const matches = detected ? allowed.includes(detected) : !!number && !!fallback && allowed.includes(fallback) && number.countryCallingCode === getCountryCallingCode(fallback);
  return { country: detected || fallback || country, valid: !!number && number.isPossible() && matches, e164: number?.number || value };
}
export function caretAfterDigits(text: string, count: number): number {
  if (count <= 0) return text.startsWith('+') ? 1 : 0;
  for (let i=0, n=0; i<text.length; i++) if (/\d/.test(text[i]!) && ++n === count) return i+1;
  return text.length;
}

export function phoneNationalDisplay(value: string, country: CountryCode): string {
  const prefix='+'+getCountryCallingCode(country);
  const display=phoneDisplay(value);
  return display.startsWith(prefix)?display.slice(prefix.length).trimStart():display;
}
