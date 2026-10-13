export type IconStyle = "line" | "solid" | "duotone";
export function set(host: HTMLElement, glyph: string, options?: {style?: IconStyle}): Promise<boolean>;
export function cancel(host: HTMLElement): void;
export function namesForStyle(style?: IconStyle): Promise<string[]>;
export function loadStyle(style?: IconStyle): Promise<Record<string, string>>;
export function create(glyph: string, style?: IconStyle): SVGElement | null;
export function render(root?: Document | HTMLElement): Promise<boolean[]>;
