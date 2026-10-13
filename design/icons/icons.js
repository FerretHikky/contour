/*
 * Reflower product icon registry.
 * Outline paths are based on Lucide Icons 1.25.0 (ISC), https://lucide.dev/.
 * Names ending in -filled use Google Material Icons (Apache 2.0),
 * https://github.com/google/material-design-icons.
 * This file is the master copy for Mini App and Admin; icons stay local.
 */
(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const ICONS = Object.freeze({
    search: [['circle', {cx: 11, cy: 11, r: 8}], ['path', {d: 'm21 21-4.3-4.3'}]],
    copy: [['rect', {width: 14, height: 14, x: 8, y: 8, rx: 2, ry: 2}], ['path', {d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'}]],
    x: [['path', {d: 'M18 6 6 18'}], ['path', {d: 'm6 6 12 12'}]],
    plus: [['path', {d: 'M5 12h14'}], ['path', {d: 'M12 5v14'}]],
    sparkles: [['path', {d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z'}], ['path', {d: 'M5 3v4'}], ['path', {d: 'M19 17v4'}], ['path', {d: 'M3 5h4'}], ['path', {d: 'M17 19h4'}]],
    sun: [['circle', {cx: 12, cy: 12, r: 4}], ['path', {d: 'M12 2v2'}], ['path', {d: 'M12 20v2'}], ['path', {d: 'm4.93 4.93 1.41 1.41'}], ['path', {d: 'm17.66 17.66 1.41 1.41'}], ['path', {d: 'M2 12h2'}], ['path', {d: 'M20 12h2'}], ['path', {d: 'm6.34 17.66-1.41 1.41'}], ['path', {d: 'm19.07 4.93-1.41 1.41'}]],
    moon: [['path', {d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'}]],
    rocket: [['path', {d: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'}], ['path', {d: 'm12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'}], ['path', {d: 'M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'}], ['path', {d: 'M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'}]],
    'clock-3': [['circle', {cx: 12, cy: 12, r: 10}], ['path', {d: 'M12 6v6h4'}]],
    check: [['path', {d: 'm5 12 4 4L19 6'}]],
    info: [['circle', {cx: 12, cy: 12, r: 10}], ['path', {d: 'M12 16v-4'}], ['path', {d: 'M12 8h.01'}]],
    'circle-alert': [['circle', {cx: 12, cy: 12, r: 10}], ['path', {d: 'M12 8v4'}], ['path', {d: 'M12 16h.01'}]],
    'triangle-alert': [['path', {d: 'm21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z'}], ['path', {d: 'M12 9v4'}], ['path', {d: 'M12 17h.01'}]],
    mail: [['rect', {width: 20, height: 16, x: 2, y: 4, rx: 2}], ['path', {d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'}]],
    'mail-filled': [['path', {d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z', fill: 'currentColor', stroke: 'none'}]],
    'circle-user': [['circle', {cx: 12, cy: 12, r: 10}], ['circle', {cx: 12, cy: 10, r: 3}], ['path', {d: 'M7 20.66a5 5 0 0 1 10 0'}]],
    'circle-user-filled': [['path', {d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z', fill: 'currentColor', stroke: 'none'}]],
    'user-round': [['circle', {cx: 12, cy: 8, r: 5}], ['path', {d: 'M20 21a8 8 0 0 0-16 0'}]],
    users: [['path', {d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2'}], ['circle', {cx: 9, cy: 7, r: 4}], ['path', {d: 'M22 21v-2a4 4 0 0 0-3-3.87'}], ['path', {d: 'M16 3.13a4 4 0 0 1 0 7.75'}]],
    hash: [['path', {d: 'M5 9h14'}], ['path', {d: 'M5 15h14'}], ['path', {d: 'M11 4 9 20'}], ['path', {d: 'm17 4-2 16'}]],
    'shopping-bag': [['path', {d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'}], ['path', {d: 'M3 6h18'}], ['path', {d: 'M16 10a4 4 0 0 1-8 0'}]],
    'shopping-bag-filled': [['path', {d: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2v2z', fill: 'currentColor', stroke: 'none'}]],
    list: [['path', {d: 'M8 6h13'}], ['path', {d: 'M8 12h13'}], ['path', {d: 'M8 18h13'}], ['path', {d: 'M3 6h.01'}], ['path', {d: 'M3 12h.01'}], ['path', {d: 'M3 18h.01'}]],
    pencil: [['path', {d: 'M12 20h9'}], ['path', {d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'}]],
    camera: [['path', {d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z'}], ['circle', {cx: 12, cy: 13, r: 3}]],
    'image-off': [['path', {d: 'M10.41 10.41a2 2 0 1 1-2.82-2.82'}], ['path', {d: 'M13.5 13.5 6 21'}], ['path', {d: 'm18 12 3 3'}], ['path', {d: 'M3.59 3.59A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.05-.22 1.41-.59'}], ['path', {d: 'M21 15V5a2 2 0 0 0-2-2H9'}], ['path', {d: 'm2 2 20 20'}]],
    'image-up': [['path', {d: 'M10.3 21H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v7'}], ['path', {d: 'm21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21'}], ['circle', {cx: 9, cy: 9, r: 2}], ['path', {d: 'm16 19 3-3 3 3'}], ['path', {d: 'M19 16v6'}]],
    'map-pin': [['path', {d: 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z'}], ['circle', {cx: 12, cy: 10, r: 3}]],
    'globe-2': [['circle', {cx: 12, cy: 12, r: 10}], ['path', {d: 'M2 12h20'}], ['path', {d: 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z'}]],
    archive: [['rect', {width: 20, height: 5, x: 2, y: 3, rx: 1}], ['path', {d: 'M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8'}], ['path', {d: 'M10 12h4'}]],
    'rotate-ccw': [['path', {d: 'M3 12a9 9 0 1 0 3-6.7L3 8'}], ['path', {d: 'M3 3v5h5'}]],
    calendar: [['path', {d: 'M8 2v4'}], ['path', {d: 'M16 2v4'}], ['rect', {width: 18, height: 18, x: 3, y: 4, rx: 2}], ['path', {d: 'M3 10h18'}]],
    'calendar-days': [['path', {d: 'M8 2v4'}], ['path', {d: 'M16 2v4'}], ['rect', {width: 18, height: 18, x: 3, y: 4, rx: 2}], ['path', {d: 'M3 10h18'}], ['path', {d: 'M8 14h.01'}], ['path', {d: 'M12 14h.01'}], ['path', {d: 'M16 14h.01'}], ['path', {d: 'M8 18h.01'}], ['path', {d: 'M12 18h.01'}]],
    'trash-2': [['path', {d: 'M3 6h18'}], ['path', {d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'}], ['path', {d: 'M19 6l-1 14c0 1-1 2-2 2H8c-1 0-2-1-2-2L5 6'}], ['path', {d: 'M10 11v6'}], ['path', {d: 'M14 11v6'}]],
    send: [['path', {d: 'm22 2-7 20-4-9-9-4Z'}], ['path', {d: 'M22 2 11 13'}]],
    'arrow-left': [['path', {d: 'm12 19-7-7 7-7'}], ['path', {d: 'M19 12H5'}]],
    'arrow-right': [['path', {d: 'M5 12h14'}], ['path', {d: 'm12 5 7 7-7 7'}]],
    'chevron-left': [['path', {d: 'm15 18-6-6 6-6'}]],
    'chevron-right': [['path', {d: 'm9 18 6-6-6-6'}]],
    'chevron-down': [['path', {d: 'm6 9 6 6 6-6'}]],
    'chevron-up': [['path', {d: 'm18 15-6-6-6 6'}]],
    'more-vertical': [['circle', {cx: 12, cy: 5, r: 1}], ['circle', {cx: 12, cy: 12, r: 1}], ['circle', {cx: 12, cy: 19, r: 1}]],
    'layout-dashboard': [['rect', {width: 7, height: 9, x: 3, y: 3, rx: 1}], ['rect', {width: 7, height: 5, x: 14, y: 3, rx: 1}], ['rect', {width: 7, height: 9, x: 14, y: 12, rx: 1}], ['rect', {width: 7, height: 5, x: 3, y: 16, rx: 1}]],
    'chart-column-increasing': [['path', {d: 'M3 3v18h18'}], ['path', {d: 'M18 17V9'}], ['path', {d: 'M13 17V5'}], ['path', {d: 'M8 17v-3'}]],
    package: [['path', {d: 'm7.5 4.27 9 5.15'}], ['path', {d: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z'}], ['path', {d: 'm3.3 7 8.7 5 8.7-5'}], ['path', {d: 'M12 22V12'}]],
    'credit-card': [['rect', {width: 20, height: 14, x: 2, y: 5, rx: 2}], ['path', {d: 'M2 10h20'}]],
    megaphone: [['path', {d: 'm3 11 18-5v12L3 14v-3Z'}], ['path', {d: 'M11.6 16.8 13 22H8l-1.8-7'}], ['path', {d: 'M3 11v3'}]],
    'log-out': [['path', {d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'}], ['path', {d: 'm16 17 5-5-5-5'}], ['path', {d: 'M21 12H9'}]],
    eye: [['path', {d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z'}], ['circle', {cx: 12, cy: 12, r: 3}]],
    'eye-off': [['path', {d: 'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a18 18 0 0 1-2.16 3.19'}], ['path', {d: 'M6.06 6.06A18.45 18.45 0 0 0 2 12s3 8 10 8a10.1 10.1 0 0 0 5.94-2.06'}], ['path', {d: 'M10.73 10.73a2 2 0 0 0 2.54 2.54'}], ['path', {d: 'm2 2 20 20'}]],
    ban: [['circle', {cx: 12, cy: 12, r: 10}], ['path', {d: 'm4.9 4.9 14.2 14.2'}]],
    shield: [['path', {d: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z'}]],
    'shield-check': [['path', {d: 'M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z'}], ['path', {d: 'm9 12 2 2 4-4'}]],
  });

  // Authored secondary layers, not an automatic fill of arbitrary outline paths.
  const DUOTONE = Object.freeze({
    mail: [['rect', {x: 2, y: 4, width: 20, height: 16, rx: 2}]],
    'circle-user': [['circle', {cx: 12, cy: 12, r: 10}]],
    'shopping-bag': [['path', {d: 'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'}]],
  });
  const glyphs = Object.freeze(Object.keys(ICONS).filter(name => !name.endsWith('-filled')));
  function namesForStyle(style = 'line') {
    if (style === 'line') return glyphs;
    if (style === 'solid') return glyphs.filter(name => ICONS[`${name}-filled`]);
    if (style === 'duotone') return Object.keys(DUOTONE);
    return [];
  }

  function create(name, options = {}) {
    const style = options.style;
    // Without a style retain the original API, including explicit -filled names.
    if (style && !namesForStyle(style).includes(name)) return null;
    const sourceName = style === 'solid' ? `${name}-filled` : name;
    const parts = ICONS[sourceName];
    if (!parts) return null;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [key, value] of Object.entries({
      viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet', fill: 'none', stroke: 'currentColor',
      'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'aria-hidden': 'true', focusable: 'false',
    })) svg.setAttribute(key, value);
    const layers = style === 'duotone'
      ? [...DUOTONE[name].map(([tag, attrs]) => [tag, {...attrs, fill: 'currentColor', stroke: 'none', class: 'rf-icon__tone'}]), ...parts]
      : parts;
    for (const [tag, attributes] of layers) {
      const part = document.createElementNS('http://www.w3.org/2000/svg', tag);
      for (const [key, value] of Object.entries(attributes)) part.setAttribute(key, value);
      svg.append(part);
    }
    return svg;
  }

  function render(root = document) {
    const hosts = root.matches?.('[data-lucide]') ? [root] : root.querySelectorAll?.('[data-lucide]') || [];
    for (const host of hosts) {
      const svg = create(host.dataset.lucide, {style: host.dataset.rfIconStyle});
      if (svg) {
        if (host.hasAttribute('aria-label')) {
          host.removeAttribute('aria-hidden');
          host.setAttribute('role', 'img');
        } else {
          host.setAttribute('aria-hidden', 'true');
          if (host.getAttribute('role') === 'img') host.removeAttribute('role');
        }
        host.replaceChildren(svg);
      } else {
        host.replaceChildren();
      }
    }
  }

  function set(host, name, options) {
    if (!host) return;
    if (options?.style) host.dataset.rfIconStyle = options.style;
    host.dataset.lucide = name;
    render(host);
  }

  window.ReflowerIcons = Object.freeze({create, render, set, names: Object.freeze(Object.keys(ICONS)), namesForStyle});

  function initialize() {
    render();
    new window.MutationObserver(records => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (added.nodeType === window.Node.ELEMENT_NODE) render(added);
        }
      }
    }).observe(document.body, {subtree: true, childList: true});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, {once: true});
  } else {
    initialize();
  }
})();
