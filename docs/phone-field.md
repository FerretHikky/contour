# PhoneField (Contour 1.1.0)

React PhoneField is an optional Core TextField composition with a round SVG flag / Core selection Dropdown country selector inside the field, a separate calling code and national-number input. Country and calling code share a tinted button with a Core chevron after the calling code (hidden for a single-country field). The national mask appears as a placeholder when focused; there is no floating label. The accessible input label remains present. Core runtime is required for dropdown keyboard, selection and dismissal behavior. SVG flags use country-flag-icons (MIT). Country metadata comes from pinned libphonenumber-js; formats are not inferred from interface language. Product supplies localized labels, defaultCountry and allowed countries. Generic defaults cover the library country list; products must pass their actual supported destinations.

Import web/phone-field.css alongside the component bundle. The native input displays only the national part; value/onValueChange use an international +digits string (including partial input); details.valid checks possible length and country, not deliverability or ownership. Product/server validation and OTP remain required. Typing formats with spaces. International paste detects country; national paste uses the selected country and its trunk prefix rules. Changing country clears the number explicitly. Editing preserves digit-relative caret; deletion across a separator removes the adjacent digit. No network requests or product credentials.

Props: id, label, countryLabel, optional clearLabel, invalidMessage, locale, defaultCountry, countries, value, onValueChange; native required, disabled, readOnly, autoFocus and aria attributes are forwarded. Ref targets the native telephone input. Format hint uses zeros, e.g. +000 000 00 00 00; it is derived from a country mobile example, not an input value. Single-country products show a non-interactive flag and calling code.

Canonical source: adapters/react/src/PhoneField.tsx and phone.ts. scripts/build-phone.mjs generates web/phone-field.js with React external; consumers bundle it with their own React. The root React export is also available. Library and metadata license files ship with the browser bundle. Included in the 1.1.0 release bundle; consumers adopt it through their reviewed dependency update.

Clear is visible only while the editable nonempty field or its clear action has focus; keyboard focus may move to clear without hiding it.

The country block starts at the field’s inner left border without an extra outer inset. Its own padding and the gap before the national number remain unchanged.

The anchored country list uses the complete field width. Active-option navigation scrolls only the listbox, never the containing form/dialog.

The country container stretches to the full inner field height, with no top/bottom inset; only the outer field border separates its background from the edge.
