// Typed module boundary for the separate Icon glyph loader. The runtime check
// covers Core and Catalog; icon behavior has its own browser/component tests.
export function getIndex(): Promise<typeof import("./icon-data/index.json")>;
export function loadStyle(style?: string): Promise<Record<string, string>>;
export function namesForStyle(style?: string): Promise<string[]>;
export function svgNode(source: string): Element;
export function create(glyph: string, style?: string): Element | null;
export function set(
  host: HTMLElement,
  glyph: string,
  options?: { style?: string },
): Promise<boolean>;
export function cancel(host: HTMLElement): void;
export function render(root?: Document | Element): Promise<boolean[]>;
