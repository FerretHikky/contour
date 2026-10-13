// Foundation and Icon share the same data loader and exact SVG renderer.
import {getIndex, loadStyle, create, svgNode} from './icon-glyphs.js';
export {getIndex, loadStyle, create};
export function render(root) {
  root.querySelectorAll('[data-figma-glyph]').forEach(host => {
    const svg = create(host.dataset.figmaGlyph, host.dataset.figmaStyle || 'line');
    if (svg) host.replaceChildren(svg);
  });
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const label = value => value[0].toUpperCase() + value.slice(1);
const glyphMarkup = (key, glyphStyle, size = 'lg') => `<span class="rf-icon rf-icon--${size}" data-figma-glyph="${escape(key)}" data-figma-style="${glyphStyle}" aria-hidden="true"></span>`;
const dropdown = (name, options, initial) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${escape(initial)}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${label(name)}"><span data-rf-dropdown-value></span>${glyphMarkup('chevron-down', 'line', 'sm')}</button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${name === 'glyph' ? '<label class="rf-dropdown__search"><input class="rf-dropdown__search-input" type="search" data-rf-dropdown-search placeholder="Поиск иконки" aria-label="Поиск Glyph" autocomplete="off"></label><span class="rf-sr-only" data-rf-dropdown-status aria-live="polite"></span>' : ''}${options.map(([value, title]) => `<div class="rf-list-item rf-list-item--interactive rf-dropdown__item" role="option" data-rf-dropdown-item data-value="${escape(value)}" aria-selected="${value === initial}"><span class="rf-dropdown__item-label" data-rf-dropdown-label>${escape(title)}</span></div>`).join('')}${name === 'glyph' ? '<p class="rf-dropdown__state" data-rf-dropdown-empty role="status" hidden>Иконка не найдена</p>' : ''}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;

export async function renderComponentHero(host) {
  const index = await getIndex();
  if (!host.isConnected) return;
  host.innerHTML = index.styles.map(style => glyphMarkup('mail', style)).join('');
  host.querySelectorAll('[data-figma-style]').forEach(icon => {
    icon.replaceChildren(svgNode(index.samples[icon.dataset.figmaStyle]));
  });
}

export async function mount(root, {announce, updateQuery, model}) {
  const marker = root.firstElementChild;
  const index = await getIndex();
  const url = new URL(location.href);
  const tabs = ['anatomy', ...index.styles];
  const requested = url.searchParams.get('iconographyTab');
  let active = tabs.includes(requested) ? requested : (url.searchParams.has('icon') || requested === 'icons' ? 'line' : 'anatomy');
  await loadStyle('line');
  if (!root.contains(marker)) return;
  const tab = name => `<button class="rf-tab" id="icon-tab-${name}" type="button" role="tab" aria-selected="${name === active}" aria-controls="icon-panel-${name}" tabindex="${name === active ? 0 : -1}" data-icon-tab="${name}">${label(name)}</button>`;
  const panels = tabs.map(name => `<section class="rf-tab-panel" id="icon-panel-${name}" role="tabpanel" aria-labelledby="icon-tab-${name}" tabindex="0" ${name === active ? '' : 'hidden'}></section>`).join('');
  root.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Iconography</h1><p class="rf-text rf-text--body-large rf-text--secondary">Один набор. Три начертания. ${index.count} иконок для интерфейсов Reflower.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-iconography.png" alt="Композиция системных иконок Reflower" width="1536" height="1024"></div></header><div class="rf-tabs catalog-iconography-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Iconography">${tabs.map(tab).join('')}</div>${panels}</div>`;
  const anatomy = root.querySelector('#icon-panel-anatomy');
  const colors = model.registry.entries.find(item => item.registry.name === 'Icon').registry.variants;
  anatomy.innerHTML = `<section class="catalog-color-tab-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Anatomy</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Выберите Glyph, начертание и цветовую роль.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage"><span class="rf-icon rf-icon--lg rf-icon--primary" data-iconography-specimen role="img" aria-label="Mail, Line"></span></div><form class="catalog-typography-playground__controls" data-iconography-controls>${parameter('Glyph', 'Рисунок из набора Figma', dropdown('glyph', index.glyphs.map(item => [item.key, `${item.name} · ${item.group}`]), 'mail'))}${parameter('Style', 'Начертание иконки', dropdown('style', index.styles.map(item => [item, label(item)]), 'line'))}${parameter('Color', 'Системная цветовая роль', dropdown('color', colors.map(item => [item, label(item)]), 'primary'))}</form></div><p role="status" data-iconography-status></p><p class="catalog-callout">Icon — только графика, без фона и кнопочной рамки. Действие задаёт IconButton или TextField. Цвет и размер не меняют исходный рисунок.</p></section>`;
  const form = anatomy.querySelector('form');
  const specimen = anatomy.querySelector('[data-iconography-specimen]');
  const stage = anatomy.querySelector('.catalog-dimension-playground__stage');
  const themeToggle = document.createElement('button');
  themeToggle.type = 'button';
  themeToggle.className = 'rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle';
  themeToggle.setAttribute('data-iconography-theme-toggle', '');
  stage.prepend(themeToggle);
  const themeTokens = [...model.foundations.componentTokenTrace.icon, ...model.foundations.componentTokenTrace.button].filter(record => record.themeDependent);
  const canvas = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas');
  const renderTheme = theme => {
    const dark = theme === 'dark';
    stage.dataset.iconographyTheme = theme;
    themeTokens.forEach(record => stage.style.setProperty(`--rf-${record.name.replace('component.', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase()}`, record[theme].resolved));
    stage.style.background = canvas[theme].resolved;
    stage.style.colorScheme = theme;
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', `Тема превью: ${dark ? 'тёмная. Переключить на светлую' : 'светлая. Переключить на тёмную'}`);
    themeToggle.innerHTML = glyphMarkup(dark ? 'clear-night-01' : 'sunny', 'line', 'sm');
    render(themeToggle);
  };
  themeToggle.addEventListener('click', () => renderTheme(stage.dataset.iconographyTheme === 'dark' ? 'light' : 'dark'));
  renderTheme('light');
  let revision = 0;
  let selectedGlyph = 'mail';
  const update = async () => {
    const current = ++revision;
    const values = new FormData(form);
    const glyph = values.get('glyph'), color = values.get('color');
    let glyphStyle = values.get('style');
    if (glyph !== selectedGlyph) {
      selectedGlyph = glyph;
      const styles = index.styles.filter(style => index.glyphs.find(item => item.key === glyph)?.nodes[style]);
      if (!styles.includes(glyphStyle)) glyphStyle = styles[0];
      const template = document.createElement('template');
      template.innerHTML = dropdown('style', styles.map(style => [style, label(style)]), glyphStyle);
      form.querySelector('[name="style"]').closest('[data-rf-dropdown]').replaceWith(template.content);
      render(form);
    }
    const status = anatomy.querySelector('[data-iconography-status]');
    try {
      await loadStyle(glyphStyle);
      if (current !== revision || !root.contains(form)) return;
      specimen.className = `rf-icon rf-icon--lg rf-icon--${color}`;
      specimen.setAttribute('aria-label', `${glyph}, ${label(glyphStyle)}`);
      const svg = create(glyph, glyphStyle);
      specimen.replaceChildren(...(svg ? [svg] : []));
      specimen.hidden = !svg;
      status.textContent = svg ? '' : 'Не удалось загрузить иконку. Выберите стиль ещё раз.';
    } catch { if (current === revision) status.textContent = 'Не удалось загрузить иконку. Выберите стиль ещё раз.'; }
  };
  form.addEventListener('change', update);
  await update();
  render(root);
  const pages = new Map();
  async function showLibrary(glyphStyle) {
    const panel = root.querySelector(`#icon-panel-${glyphStyle}`);
    if (!panel || pages.has(glyphStyle)) return;
    pages.set(glyphStyle, true);
    panel.innerHTML = '<p role="status">Загружаем иконки…</p>';
    try {
      await loadStyle(glyphStyle);
      if (!root.contains(panel)) return;
      panel.innerHTML = `<section class="catalog-color-tab-section catalog-iconography-library rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">${label(glyphStyle)}</h2><p class="rf-text rf-text--body-medium rf-text--secondary">${index.available[glyphStyle]} иконок. Найдите рисунок и скопируйте его имя для Glyph.</p></header><div class="rf-text-field-group"><span class="rf-text-field__control"><span class="rf-text-field__icon rf-icon rf-icon--sm" data-figma-glyph="search" aria-hidden="true"></span><input class="rf-text-field rf-text-field--with-icon" id="iconography-search-${glyphStyle}" type="search" data-iconography-search placeholder=" " autocomplete="off"><label class="rf-text-field__label" for="iconography-search-${glyphStyle}">Найти иконку</label></span></div><p class="rf-text rf-text--body-small rf-text--secondary" role="status" data-iconography-count></p><div class="catalog-icon-grid" data-iconography-grid></div><button class="rf-button rf-button--secondary" type="button" data-iconography-more>Показать ещё</button></section>`;
      const search = panel.querySelector('[data-iconography-search]');
      render(panel);
      const grid = panel.querySelector('[data-iconography-grid]');
      const more = panel.querySelector('[data-iconography-more]');
      let limit = 72;
      search.value = new URL(location.href).searchParams.get('icon') || '';
      const filter = () => {
        const query = search.value.trim().toLowerCase();
        const matches = index.glyphs.filter(item => item.nodes[glyphStyle] && `${item.key} ${item.name} ${item.group}`.toLowerCase().includes(query));
        grid.innerHTML = matches.slice(0, limit).map(item => {
          return `<article class="catalog-icon-card" data-icon-name="${escape(item.key)}">${glyphMarkup(item.key, glyphStyle)}<code class="catalog-icon-card__name">${escape(item.key)}</code><span class="rf-text rf-text--caption rf-text--secondary">${escape(item.group)}</span><button class="rf-button rf-button--tertiary rf-button--s" type="button" data-copy-icon="${escape(item.key)}" aria-label="Скопировать ${escape(item.key)}">Copy</button></article>`;
        }).join('');
        panel.querySelector('[data-iconography-count]').textContent = matches.length ? `Показано ${Math.min(limit, matches.length)} из ${matches.length}` : 'Иконка не найдена';
        more.hidden = matches.length <= limit;
        render(grid);
      };
      search.addEventListener('input', () => { limit = 72; updateQuery('icon', search.value.trim()); filter(); });
      more.addEventListener('click', () => { limit += 72; filter(); });
      grid.addEventListener('click', async event => {
        const button = event.target.closest('[data-copy-icon]');
        if (!button || button.disabled) return;
        try { await navigator.clipboard.writeText(button.dataset.copyIcon); announce(`Icon ${button.dataset.copyIcon} скопирован`); }
        catch { announce('Не удалось скопировать. Выделите имя иконки вручную.'); }
      });
      filter();
    } catch {
      pages.delete(glyphStyle);
      panel.innerHTML = '<p role="status">Не удалось загрузить набор. Переключите вкладку для повтора.</p>';
    }
  }
  const sync = () => requestAnimationFrame(() => {
    active = root.querySelector('[data-icon-tab][aria-selected="true"]')?.dataset.iconTab;
    if (!active) return;
    updateQuery('iconographyTab', active === 'anatomy' ? '' : active);
    if (active !== 'anatomy') showLibrary(active);
  });
  const tablist = root.querySelector('[role="tablist"]');
  tablist.addEventListener('click', sync);
  tablist.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) sync(); });
  if (active !== 'anatomy') await showLibrary(active);
}
