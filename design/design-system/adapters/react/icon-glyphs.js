// Shared Icon runtime. SVG geometry comes only from the validated Figma exports.
const indexURL = new URL('./icon-data/index.json', import.meta.url);
const bundleURLs = {
  line: new URL('./icon-data/line.json', import.meta.url),
  solid: new URL('./icon-data/solid.json', import.meta.url),
  duotone: new URL('./icon-data/duotone.json', import.meta.url),
};
let indexPromise;
const pending = new Map();
const loaded = new Map();
const requests = new WeakMap();
let uniqueId = 0;
const instanceId = crypto.randomUUID();
async function json(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Icon: ${response.status}`);
  return response.json();
}
export function getIndex() {
  if (!indexPromise) indexPromise = json(indexURL, {cache: 'no-cache'}).catch(error => {
    indexPromise = null;
    throw error;
  });
  return indexPromise;
}
export async function loadStyle(style = 'line') {
  if (!Object.hasOwn(bundleURLs, style)) throw new Error('Unknown Icon style');
  if (!pending.has(style)) pending.set(style, (async () => {
    const index = await getIndex();
    const url = new URL(bundleURLs[style]);
    url.searchParams.set('v', index.versions[style]);
    const bundle = await json(url);
    loaded.set(style, bundle);
    return bundle;
  })().catch(error => { pending.delete(style); throw error; }));
  return pending.get(style);
}
export async function namesForStyle(style = 'line') {
  const index = await getIndex();
  return index.glyphs.filter(glyph => Object.hasOwn(glyph.nodes, style)).map(glyph => glyph.key);
}
export function svgNode(source) {
  const svg = new DOMParser().parseFromString(source, 'image/svg+xml').documentElement;
  const ids = new Map([...svg.querySelectorAll('[id]')].map(node => [node.id, `rf-glyph-${instanceId}-${++uniqueId}-${node.id}`]));
  for (const node of [svg, ...svg.querySelectorAll('*')]) {
    for (const attr of [...node.attributes]) {
      if (attr.name === 'id') node.id = ids.get(attr.value);
      else if (attr.value.startsWith('url(#')) node.setAttribute(attr.name, attr.value.replace(/url\(#([^)]*)\)/g, (_, id) => `url(#${ids.get(id) || id})`));
    }
  }
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  return document.importNode(svg, true);
}
// Synchronous creation after loadStyle; unsupported pairs never substitute a glyph.
export function create(glyph, style = 'line') {
  const bundle = loaded.get(style);
  return bundle && Object.hasOwn(bundle, glyph) ? svgNode(bundle[glyph]) : null;
}
export async function set(host, glyph, {style = 'line'} = {}) {
  if (!host) return false;
  host.dataset.rfIconGlyph = glyph;
  host.dataset.rfIconStyle = style;
  const request = {};
  requests.set(host, request);
  host.replaceChildren();
  host.removeAttribute('data-rf-icon-error');
  try {
    await loadStyle(style);
    if (requests.get(host) !== request || host.dataset.rfIconGlyph !== glyph || host.dataset.rfIconStyle !== style) return false;
    const svg = create(glyph, style);
    if (!svg) { host.dataset.rfIconError = 'unavailable'; return false; }
    host.replaceChildren(svg);
    if (host.hasAttribute('aria-label')) {
      host.removeAttribute('aria-hidden');
      host.setAttribute('role', 'img');
    } else {
      host.setAttribute('aria-hidden', 'true');
      if (host.getAttribute('role') === 'img') host.removeAttribute('role');
    }
    return true;
  } catch {
    if (requests.get(host) === request) host.dataset.rfIconError = 'load';
    return false;
  }
}
export function cancel(host) {
  if (host) requests.delete(host);
}
export function render(root = document) {
  const hosts = root.matches?.('[data-rf-icon-glyph]') ? [root] : [...root.querySelectorAll('[data-rf-icon-glyph]')];
  return Promise.all(hosts.map(host => set(host, host.dataset.rfIconGlyph, {style: host.dataset.rfIconStyle || 'line'})));
}
