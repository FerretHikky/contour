/* Generated from design/design-system/web/runtime/catalog.ts. Do not edit this JavaScript directly. */
(() => {
const MODEL_URL = '../generated/catalog-model.json';
const loadIconography = () => import(`./iconography.js?v=${model.runtimeAssets.iconography}`);
const STATIC_ROUTES=new Set(['overview','foundations','guidelines/terminology','guidelines/comparisons','guidelines/composition','guidelines/core-or-feature','guidelines/real-product','guidelines/do-dont','guidelines/building-feature','guidelines/accessibility','guidelines/specimens','guidelines/migration']);
const FOUNDATION_ROUTES=new Set(['foundations/colors','foundations/dimensions','foundations/typography','foundations/elevation','foundations/motion','foundations/grid','foundations/icons','foundations/media']);
const LEGACY_DIMENSION_ROUTES=new Set(['foundations/spacing','foundations/radius','foundations/borders']);
const LEGACY_FOUNDATION_ROUTES=new Map([['foundations/breakpoints','foundations/grid']]);
const LEGACY_COMPONENT_ROUTES=new Map([['patterns/navigation-bar','components/navigation-bar'],['primitives/container','foundations/grid'],['components/range','components/slider'],['components/listing-card','patterns/listing-card']]);
const LEVEL_ROUTES = new Set(['primitives', 'components', 'patterns']);
const LEVEL_LABELS = {primitive: 'Primitives', component: 'Components', pattern: 'Templates'};
const STATUS_LABELS = {stable: 'Stable', beta: 'Beta', experimental: 'Experimental', deprecated: 'Deprecated'};
const STATUS_CLASSES = {stable: 'rf-badge--success', beta: 'rf-badge--info', experimental: 'rf-badge--warning', deprecated: 'rf-badge--error'};
const CATEGORY_LABELS={layout:'Layout',typography:'Typography',media:'Media & icons',surface:'Surfaces',form:'Forms',selection:'Selection',input:'Inputs & selection',control:'Controls',feedback:'Feedback','data-display':'Data display',navigation:'Navigation',overlay:'Overlays'};
const COMPONENT_GROUPS = [
{id:'controls',label:'Controls',categories:['control']},
{id:'inputs-selection',label:'Inputs & selection',categories:['input']},
{id:'navigation',label:'Navigation',categories:['navigation']},
{id:'data-display',label:'Data display',categories:['data-display']},
{id:'feedback',label:'Feedback',categories:['feedback']},
{id:'overlays',label:'Overlays',categories:['overlay']},
{id:'media-icons',label:'Media & icons',categories:['media']},
];
const COMPONENT_STATUS_ORDER = ['stable','beta','experimental'];
const FOUNDATION_LABELS={colors:'Colors',dimensions:'Metrics',typography:'Typography',elevation:'Elevation',motion:'Motion',grid:'Grid',icons:'Iconography',media:'Media'};
const byId=id=>document.getElementById(id);
const content=byId('catalog-content'),liveRegion=byId('catalog-live'),loadError=byId('catalog-load-error'),foundationPage=byId('catalog-foundation-page'),indexPage=byId('catalog-index-page'),entityPage=byId('catalog-entity-page');
/** @type {CatalogModel | null} */
let model = null;
/** @type {CatalogEntry[]} */
let entries = [];
/** @type {Map<string, CatalogEntry>} */
let entryByRoute = new Map();
/** @type {Map<string, CatalogEntry>} */
let entryByName = new Map();
const escapeHtml = value => String(value ?? '')
.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
.replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const escapeAttribute = escapeHtml;
const titleCase = value => String(value).replace(/([a-z])([A-Z])/g, '$1 $2').replaceAll('-', ' ').replaceAll('.', ' ').replace(/^./, char => char.toUpperCase());
const formatValue = value => {
if (value && typeof value === 'object' && 'value' in value) return `${value.value}${value.unit || ''}`;
if (Array.isArray(value)) return value.length ? value.map(formatValue).join(', ') : 'none';
if (value && typeof value === 'object' && value.hex) return value.hex;
if (value && typeof value === 'object' && value.fontSize) return `${value.fontFamily?.[0] || 'System'} · ${formatValue(value.fontSize)} / ${value.fontWeight} / ${formatValue(value.lineHeight)} / ${formatValue(value.letterSpacing)}`;
if (value && typeof value === 'object') return JSON.stringify(value);
return String(value ?? '—');
};
const colorCss = value => {
if (typeof value === 'string') return value;
if (!value?.hex) return '';
if (value.alpha === undefined || value.alpha >= 1) return value.hex;
const alpha = Math.round(value.alpha * 255).toString(16).padStart(2, '0').toUpperCase();
return `${value.hex}${alpha}`;
};
const flatten = (node, prefix = '', leaves = []) => {
if (node && typeof node === 'object' && !Array.isArray(node)) {
if ('hex' in node || 'value' in node || 'colorSpace' in node) {
leaves.push([prefix, node]);
} else {
Object.entries(node).forEach(([key, value]) => flatten(value, prefix ? `${prefix}.${key}` : key, leaves));
}
} else {
leaves.push([prefix, node]);
}
return leaves;
};
const flattenTypographyRoles = (node, prefix = '', leaves = []) => {
if (node && typeof node === 'object' && !Array.isArray(node)) {
if ('fontSize' in node && 'fontWeight' in node && 'lineHeight' in node) leaves.push([prefix, node]);
else Object.entries(node).forEach(([key, value]) => flattenTypographyRoles(value, prefix ? `${prefix}.${key}` : key, leaves));
}
return leaves;
};
const statusBadge = status => `<span class="rf-badge ${STATUS_CLASSES[status] || ''}">${escapeHtml(STATUS_LABELS[status] || status)}</span>`;
function sectionVersion(route) {
const versions = model?.registry?.catalogVersions || {};
if (versions[route]) return versions[route];
const parent = String(route || '').split('/')[0];
return versions[parent] || '';
}
function applySectionVersion(element, route) {
if (element === indexPage && ['components','primitives'].includes(route)) return;
const version = sectionVersion(route);
const title = /** @type {HTMLElement} */(element.querySelector('h1'));
if (!version || !title) return;
let row = title.closest('.catalog-title-row');
if (!row) {
row = document.createElement('div');
row.className = 'catalog-title-row';
title.before(row);
row.append(title);
}
/** @type {HTMLElement} */(row.querySelector('[data-catalog-version]'))?.remove();
const badge = document.createElement('span');
badge.className = 'rf-badge rf-badge--brand catalog-version-badge';
badge.dataset.catalogVersion = version;
badge.textContent = `v${version}`;
badge.setAttribute('aria-label', `Версия раздела ${version}`);
row.append(badge);
}
const smallList = values => values.length
? `<ul class="catalog-api-list">${values.map(value => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`
: '<p class="rf-text rf-text--body-small rf-text--secondary">Не применяется.</p>';
function pageHeader(kicker, title, description, actions = '') {
return `<header class="catalog-page-header"><div class="rf-stack rf-stack--gap-3"><span class="catalog-page-kicker">${escapeHtml(kicker)}</span><h1 class="rf-text rf-text--display-medium">${escapeHtml(title)}</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(description)}</p></div>${actions ? `<div class="catalog-page-actions">${actions}</div>` : ''}</header>`;
}
function updateQuery(name, value) {
const url = new URL(window.location.href);
if (value) url.searchParams.set(name, value); else url.searchParams.delete(name);
window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}
/** @param {string} message */
function announce(message) {
liveRegion.textContent = message;
liveRegion.hidden = false;
window.clearTimeout(/** @type {typeof announce & {timeout?: number}} */(announce).timeout);
/** @type {typeof announce & {timeout?: number}} */(announce).timeout = window.setTimeout(() => { liveRegion.hidden = true; }, 2200);
}
function renderGuidance() {
document.getElementById('catalog-comparison-grid').innerHTML = model.guidance.comparisons.map(item => `
<section class="rf-card rf-stack rf-stack--gap-3" id="comparison/${escapeAttribute(item.id)}"><h2 class="rf-text rf-text--heading-h3">${escapeHtml(item.title)}</h2>${item.choices.map(choice => `<p class="rf-text rf-text--body-small"><a class="rf-link" href="#${escapeAttribute(entryByName.get(choice.target)?.route || 'components')}">${escapeHtml(choice.target)}</a> — ${escapeHtml(choice.when)}</p>`).join('')}<p class="catalog-callout rf-text rf-text--body-small">${escapeHtml(item.summary)}</p></section>`).join('');
document.getElementById('catalog-composition-grid').innerHTML = model.guidance.compositions.map(item => `
<section class="rf-card rf-stack rf-stack--gap-3" id="composition/${escapeAttribute(item.id)}"><h2 class="rf-text rf-text--heading-h3">${escapeHtml(item.title)}</h2><div class="rf-inline rf-inline--gap-2">${item.parts.map(part => `<a class="rf-badge" href="#${escapeAttribute(entryByName.get(part)?.route || 'components')}">${escapeHtml(part)}</a>`).join('<span aria-hidden="true">+</span>')}</div><p class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(item.note)}</p></section>`).join('');
document.getElementById('catalog-pilot-grid').innerHTML = model.guidance.pilotExamples.map(item => `
<section class="rf-card rf-stack rf-stack--gap-3" id="pilot/${escapeAttribute(item.id)}"><span class="rf-badge rf-badge--success">Production evidence</span><h2 class="rf-text rf-text--heading-h3">${escapeHtml(item.title)}</h2><p class="rf-text rf-text--body-small"><strong>Core:</strong> ${item.core.map(part => escapeHtml(part)).join(' → ')}</p><p class="rf-text rf-text--body-small"><strong>Supporting primitives:</strong> ${item.supporting.map(part => escapeHtml(part)).join(' + ')}</p><p class="rf-text rf-text--body-small"><strong>Feature layer:</strong> ${item.feature.map(part => escapeHtml(part)).join(', ')}</p><p class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(item.lesson)}</p></section>`).join('');
document.getElementById('catalog-building-steps').innerHTML = model.guidance.buildingFeatureSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('');
}
/** @param {Document | HTMLElement} root @param {boolean} silent */
function setupListingCardSpecimen(root = document, silent = false) {
const specimen = /** @type {HTMLButtonElement} */(root.querySelector('[data-listing-card-specimen]'));
const photo = /** @type {HTMLElement} */(specimen?.querySelector('.listing-card-specimen__media>.rf-image'));
const media = /** @type {HTMLElement} */(specimen?.querySelector('.rf-image-frame'));
const newBadge = /** @type {HTMLElement} */(specimen?.querySelector('.listing-card-specimen__new'));
const response = /** @type {HTMLElement} */(specimen?.querySelector('.listing-card-specimen__response'));
const own = /** @type {HTMLElement} */(specimen?.querySelector('.listing-card-specimen__own'));
const details = /** @type {HTMLElement} */(specimen?.querySelector('[data-listing-card-details]'));
const contentSkeleton = /** @type {HTMLElement} */(specimen?.querySelector('.listing-card-specimen__content-skeleton'));
const price = /** @type {HTMLElement} */(specimen?.querySelector('[data-listing-card-price]'));
const type = /** @type {HTMLElement} */(specimen?.querySelector('[data-listing-card-type]'));
const freshness = /** @type {HTMLElement} */(specimen?.querySelector('[data-listing-card-freshness]'));
const place = /** @type {HTMLElement} */(specimen?.querySelector('[data-listing-card-place]'));
const controls = /** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-listing-card-state]'));
if (!specimen || !photo || !media || !newBadge || !response || !details || !contentSkeleton || !price || !type || !freshness || !place || !controls.length) return;
controls.forEach(control => control.addEventListener('click', () => {
const mode = control.dataset.listingCardState;
const loading = mode === 'loading';
const error = mode === 'error';
const long = mode === 'long';
const responded = mode === 'responded' || mode === 'new-responded' || error;
const isNew = mode === 'new' || mode === 'new-responded' || mode === 'new-owned';
if (own) own.hidden = mode !== 'owned' && mode !== 'new-owned';
place.parentElement.hidden = loading;
controls.forEach(item => item.setAttribute('aria-pressed', String(item === control)));
specimen.dataset.listingCardMode = mode;
specimen.disabled = loading;
specimen.setAttribute('aria-busy', String(loading));
media.dataset.state = loading ? 'loading' : error ? 'error' : 'loaded';
if (loading) media.setAttribute('aria-busy', 'true'); else media.removeAttribute('aria-busy');
newBadge.hidden = !isNew;
response.hidden = !responded;
details.hidden = loading;
contentSkeleton.hidden = !loading;
price.textContent = long ? '123 456 789 000 сом' : '3 500 ₽';
type.textContent = long ? 'Авторский букет из пионовидных роз' : 'Букет';
freshness.textContent = long ? 'Хорошее состояние после бережного хранения' : 'Свежайший';
place.textContent = long ? 'Петропавловск-Камчатский, Камчатский край' : 'Москва';
specimen.setAttribute('aria-label', loading
? 'Загрузка объявления'
: long
? 'Открыть объявление: авторский букет из пионовидных роз, 123 456 789 000 сом, Петропавловск-Камчатский'
: error
? 'Открыть объявление: букет, фото не загрузилось, 3 500 рублей, Москва'
: 'Открыть объявление: букет, 3 500 рублей, Москва');
const announcements = {
default: 'Показана базовая карточка', responded: 'Показана карточка с откликом', new: 'Показана новая карточка',
'new-responded': 'Показана новая карточка с откликом', loading: 'Показана загрузка карточки',
error: 'Показана карточка с ошибкой фото', long: 'Показаны длинные однострочные значения',
};
if (!silent) announce(announcements[mode] || announcements.default);
}));
specimen.addEventListener('click', () => announce('Открытие объявления'));
}
function renderIndex(levelRoute, filterStatus = '') {
const level = levelRoute === 'primitives' ? 'primitive' : levelRoute === 'patterns' ? 'pattern' : 'component';
const selected = entries.filter(item => item.registry.level === level && (item.registry.status !== 'deprecated' || filterStatus === 'deprecated') && (!filterStatus || item.registry.status === filterStatus));
if (level === 'primitive' && !filterStatus) {
renderPrimitivesOverview(selected);
return;
}
if (level === 'component' && !filterStatus) {
renderComponentsOverview(selected);
return;
}
if (level === 'pattern' && !filterStatus) {
renderTemplatesOverview(selected);
return;
}
const grouped = Object.groupBy(selected, item => item.registry.category);
indexPage.dataset.dsLevel = level;
indexPage.innerHTML = pageHeader('Registry index', LEVEL_LABELS[level], `${selected.length} entries. Category и lifecycle берутся из Component Registry.`, filterStatus ? `<a class="rf-button rf-button--secondary" href="#${levelRoute}">Сбросить filter</a>` : '') +
(level === 'pattern' ? '<p class="catalog-callout catalog-callout--warning rf-text rf-text--body-small">Pattern candidates и experimental patterns находятся under evaluation и не являются Stable Core.</p>' : '') +
Object.entries(grouped).map(([category, group]) => `<section class="catalog-section rf-stack rf-stack--gap-4"><h2 class="rf-text rf-text--heading-h2">${escapeHtml(CATEGORY_LABELS[category] || titleCase(category))}</h2><div class="catalog-grid">${group.map(item => entityCard(item)).join('')}</div></section>`).join('');
}
function componentCategoryIcon(category) {
return ({media: 'image-off', input: 'search', form: 'search', selection: 'checkmark', control: 'toggle-off', 'data-display': 'grid-four-01', navigation: 'list-bullet-portrait', feedback: 'exclamation-mark-cr-fr', overlay: 'more-vr-al', surface: 'cube'}[category] || 'ai-02');
}
function buttonIllustration() {
return '<span class="rf-button rf-button--primary rf-button--l catalog-button-illustration" inert aria-hidden="true"><span class="rf-button__content"><span class="rf-button__label">Сохранить</span></span></span>';
}
function dropdownIllustration() {
return `<span class="catalog-dropdown-illustration" inert aria-hidden="true"><span class="rf-button rf-button--secondary rf-button--s"><span class="rf-button__content"><span class="rf-button__label">Действия</span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-up"></span></span></span><span class="rf-dropdown__panel">${[['Редактировать','edit'],['Поделиться','send'],['Удалить','trash-can']].map(([label,icon],index)=>`<span class="rf-list-item rf-dropdown__item${index===2?' rf-dropdown__item--destructive':''}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="${icon}"></span><span class="rf-dropdown__item-label">${label}</span></span>`).join('')}</span></span>`;
}
function textFieldIllustration() {
return '<span class="rf-text-field catalog-text-field-illustration" inert aria-hidden="true">Название</span>';
}
function switchIllustration() {
return '<span class="rf-switch catalog-switch-illustration" inert aria-hidden="true"><span class="rf-switch__control"><span class="rf-switch__track"></span></span></span>';
}
function counterMarkup(value = 3, variant = 'brand', maximum = 99, skeleton = false) {
const text = value > maximum ? `${maximum}+` : String(value);
return `<span class="rf-counter rf-counter--${variant}"${skeleton ? ' data-state="skeleton" aria-hidden="true"' : ''}><span class="rf-counter__value"${value > maximum ? ' aria-hidden="true"' : ''}>${text}</span>${value > maximum ? `<span class="rf-sr-only">${value}</span>` : ''}</span>`;
}
function segmentedIllustration() {
return '<span class="rf-segmented-control" inert aria-hidden="true"><span class="rf-segmented-control__item"><input class="rf-segmented-control__input" type="radio" checked tabindex="-1"><span class="rf-segmented-control__label">Список</span></span><span class="rf-segmented-control__item"><span class="rf-segmented-control__label">Карта</span></span></span>';
}
function chipIllustration() {
return '<span class="rf-chip rf-chip--primary rf-chip--md" inert aria-hidden="true"><span class="rf-chip__label">Пионы</span></span>';
}
function breadcrumbsMarkup(options = {}) {
const labels = options.labels || ['Главная', 'Компоненты', 'Breadcrumbs'];
const variant = options.variant === 'supporting' ? ' rf-breadcrumbs--supporting' : '';
const size = options.size === 'sm' ? ' rf-breadcrumbs--sm' : '';
const icon = options.icon ? '<span class="rf-icon rf-icon--sm" data-rf-icon-glyph="home" aria-hidden="true"></span>' : '';
const separator = options.separator === 'slash'
? '<span class="rf-breadcrumbs__separator" aria-hidden="true">/</span>'
: options.separator === 'dot'
? '<span class="rf-breadcrumbs__separator" aria-hidden="true">·</span>'
: '<span class="rf-breadcrumbs__separator" aria-hidden="true"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right"></span></span>';
const collapsedAt = Number.isInteger(options.collapsedAt) ? options.collapsedAt : -1;
const items = labels.map((label,index) => {
const before = index ? separator : '';
if (index === collapsedAt) return `<li class="rf-breadcrumbs__item">${before}<span class="rf-breadcrumbs__collapsed" aria-label="Пропущенные уровни">…</span></li>`;
if (index === labels.length - 1) return `<li class="rf-breadcrumbs__item">${before}<span class="rf-breadcrumbs__current" aria-current="page">${escapeHtml(label)}</span></li>`;
return `<li class="rf-breadcrumbs__item">${before}<a class="rf-breadcrumbs__link" href="#components/breadcrumbs">${index === 0 ? icon : ''}<span>${escapeHtml(label)}</span></a></li>`;
}).join('');
return `<nav class="rf-breadcrumbs${variant}${size}" aria-label="Хлебные крошки"><ol class="rf-breadcrumbs__list">${items}</ol></nav>`;
}
function breadcrumbsIllustration() {
return '<span class="rf-breadcrumbs" inert aria-hidden="true"><span class="rf-breadcrumbs__list"><span class="rf-breadcrumbs__item"><span class="rf-breadcrumbs__link"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="home"></span><span>Главная</span></span></span><span class="rf-breadcrumbs__item"><span class="rf-breadcrumbs__separator"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right"></span></span><span class="rf-breadcrumbs__current">Каталог</span></span></span></span>';
}
function navigationIllustration(variant) {
const items = [['Обзор', 'home'], ['Лента', 'shopping-bag'], ['Чаты', 'mail']];
return `<span class="catalog-navigation-illustration" inert aria-hidden="true"><span class="rf-navigation-bar rf-navigation-bar--${variant}">${items.map(([label, glyph], index) => `<span class="rf-navigation-bar__item"${index === 0 ? ' aria-current="page"' : ''}>${variant === 'bottom' ? `<span class="rf-icon rf-icon--md" data-rf-icon-glyph="${glyph}" data-rf-icon-style="solid"></span>` : ''}<span class="rf-navigation-bar__label">${label}</span></span>`).join('')}</span></span>`;
}
function componentOverviewCard(item) {
const entry = item.registry;
const replacement = entry.replacement ? `<span class="rf-text rf-text--caption">Replacement: ${escapeHtml(entry.replacement)}</span>` : '';
if (entry.name === 'Checkbox') return `<a class="catalog-home-card catalog-component-card rf-card rf-card--interactive" href="#${escapeAttribute(item.route)}" data-ds-name="Checkbox" data-ds-level="component" data-ds-status="${entry.status}"><span class="catalog-component-card__visual" inert aria-hidden="true">${checkboxIllustration()}</span><span class="catalog-home-card__body"><span class="catalog-component-card__heading"><strong>Checkbox</strong>${statusBadge(entry.status)}</span><span>${escapeHtml(entry.summary)}</span></span></a>`;
if (entry.name === 'Avatar') return `<a class="catalog-home-card catalog-component-card rf-card rf-card--interactive" href="#${escapeAttribute(item.route)}" data-ds-name="Avatar" data-ds-level="component" data-ds-status="${entry.status}"><span class="catalog-component-card__visual" inert aria-hidden="true">${avatarIllustration()}</span><span class="catalog-home-card__body"><span class="catalog-component-card__heading"><strong>Avatar</strong>${statusBadge(entry.status)}</span><span>${escapeHtml(entry.summary)}</span></span></a>`;
return `<a class="catalog-home-card catalog-component-card rf-card rf-card--interactive" href="#${escapeAttribute(item.route)}" data-ds-name="${escapeAttribute(entry.name)}" data-ds-level="${escapeAttribute(entry.level)}" data-ds-status="${escapeAttribute(entry.status)}"><span class="catalog-component-card__visual" inert aria-hidden="true">${entry.name === 'Calendar' ? `<span class="catalog-calendar-illustration">${primitivePreview('Calendar')}</span>` : entry.name === 'Spinner' ? '<span class="rf-spinner rf-spinner--lg" aria-hidden="true"></span>' : entry.name === 'Banner' ? `<span class="catalog-banner-preview" inert>${bannerPreview('Мои объявления','Активные и архивные',{size:'default'})}</span>` : entry.name === 'Toast' ? `<span class="catalog-toast-preview" inert>${toastPreview('Сохранено',true,false)}</span>` : entry.name === 'Alert' ? `<span class="catalog-alert-illustration" inert>${alertPreview('Готово','Изменения сохранены','','success',true,false)}</span>` : entry.name === 'ListItem' ? `<span class="catalog-list-item-illustration" inert>${listItemPreview('static','Уведомления','Настройки сообщений','icon','chevron')}</span>` : entry.name === 'Dropdown' ? dropdownIllustration() : entry.name === 'NavigationBar' ? navigationIllustration('top') : entry.name === 'TabBar' ? navigationIllustration('bottom') : entry.name === 'Breadcrumbs' ? breadcrumbsIllustration() : entry.name === 'Counter' ? counterMarkup() : entry.name === 'SegmentedControl' ? segmentedIllustration() : entry.name === 'Chip' ? chipIllustration() : entry.name === 'Radio' ? radioIllustration() : entry.name === 'Tabs' ? tabsIllustration() : entry.name === 'Button' ? buttonIllustration() : entry.name === 'TextField' ? textFieldIllustration() : entry.name === 'Switch' ? switchIllustration() : entry.name === 'Badge' ? badgeIllustration() : entry.name === 'Icon' ? '<span class="catalog-component-card__icon-preview" data-icon-card-preview></span>' : `<span class="catalog-component-card__specimen"><span class="catalog-component-card__icon"><span class="rf-icon rf-icon--md" data-rf-icon-glyph="${escapeAttribute(componentCategoryIcon(entry.category))}"></span></span><span class="catalog-component-card__specimen-copy"><span class="rf-text rf-text--label-small">${escapeHtml(CATEGORY_LABELS[entry.category] || titleCase(entry.category))}</span><strong class="rf-text rf-text--label-large">${escapeHtml(entry.name)}</strong></span></span>`}</span><span class="catalog-home-card__body"><span class="catalog-component-card__heading"><strong>${escapeHtml(['TextField', 'SegmentedControl', 'TabBar','NavigationBar','ListingCard','ListItem','FeatureCard','EmptyState'].includes(entry.name) ? titleCase(entry.name) : entry.name)}</strong>${statusBadge(entry.status)}</span><span>${escapeHtml(entry.summary)}</span>${replacement}</span></a>`;
}
function renderComponentsOverview(componentEntries) {
indexPage.dataset.dsLevel = 'component';
const visibleEntries = componentEntries.filter(item => !['IconButton','Tab'].includes(item.registry.name));
const statusRank = item => COMPONENT_STATUS_ORDER.indexOf(item.registry.status);
const groups = COMPONENT_GROUPS.map(group => ({...group,entries:visibleEntries.filter(item => group.categories.includes(item.registry.category)).sort((left,right) => statusRank(left) - statusRank(right) || left.registry.name.localeCompare(right.registry.name))})).filter(group => group.entries.length);
indexPage.innerHTML = `<header class="catalog-home-hero catalog-components-hero"><div class="catalog-home-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Components</h1><p class="rf-text rf-text--body-large rf-text--secondary">Готовые элементы интерфейса Contour с единым поведением, состояниями и доступностью.</p></div><div class="catalog-home-hero__media"><img class="rf-image catalog-home-hero__image" src="assets/catalog-home/components-components.png" alt="Композиция из системных компонентов Contour" width="1536" height="1024"></div></header><section class="catalog-home-section rf-stack rf-stack--gap-8" aria-labelledby="components-overview-title"><div class="catalog-home-section__heading rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="components-overview-title">Сущности Components</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Компоненты сгруппированы по назначению; внутри группы сначала показаны Stable, затем Beta и Experimental.</p></div><div class="catalog-component-groups rf-stack rf-stack--gap-8">${groups.map(group => `<section class="catalog-component-group rf-stack rf-stack--gap-4" aria-labelledby="component-group-${group.id}-title"><h3 class="rf-text rf-text--heading-h3" id="component-group-${group.id}-title">${escapeHtml(group.label)}</h3><div class="catalog-home-grid catalog-component-grid" data-component-group="${escapeAttribute(group.id)}">${group.entries.map(componentOverviewCard).join('')}</div></section>`).join('')}</div></section>`;

const iconPreview = /** @type {HTMLElement} */(indexPage.querySelector('[data-icon-card-preview]'));
if (iconPreview) loadIconography().then(library => library.renderComponentHero(iconPreview))
  .catch(() => announce('Не удалось загрузить превью Icon. Обновите страницу.'));
}
function renderPrimitivesOverview(primitiveEntries) {
indexPage.dataset.dsLevel = 'primitive';
const groups = Object.entries(Object.groupBy(primitiveEntries, item => item.registry.category));
indexPage.innerHTML = `<header class="catalog-home-hero"><div class="catalog-home-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Primitives</h1><p class="rf-text rf-text--body-large rf-text--secondary">Базовые элементы для построения интерфейса: расположение, текст, пропорции и доступность.</p></div><div class="catalog-home-hero__media"><img class="rf-image catalog-home-hero__image" src="assets/catalog-home/components-primitives.png" alt="Композиция базовых элементов интерфейса Contour" width="1536" height="1024"></div></header><section class="catalog-home-section rf-stack rf-stack--gap-8" aria-labelledby="primitives-overview-title"><div class="catalog-home-section__heading rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="primitives-overview-title">Сущности Primitives</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Из этих элементов собираются компоненты и шаблоны интерфейса.</p></div><div class="catalog-component-groups rf-stack rf-stack--gap-8">${groups.map(([category, items]) => `<section class="catalog-component-group rf-stack rf-stack--gap-4"><h3 class="rf-text rf-text--heading-h3">${escapeHtml(CATEGORY_LABELS[category] || titleCase(category))}</h3><div class="catalog-home-grid catalog-component-grid" data-primitive-group="${escapeAttribute(category)}">${items.map(componentOverviewCard).join('')}</div></section>`).join('')}</div></section>`;
}
function renderTemplatesOverview(templateEntries) {
indexPage.dataset.dsLevel = 'pattern';
const statusRank = item => COMPONENT_STATUS_ORDER.indexOf(item.registry.status);
const groups = Object.entries(Object.groupBy(templateEntries, item => item.registry.category)).map(([category,groupEntries]) => ({id:category,label:CATEGORY_LABELS[category] || titleCase(category),entries:groupEntries.sort((left,right) => statusRank(left) - statusRank(right) || left.registry.name.localeCompare(right.registry.name))}));
indexPage.innerHTML = `<header class="catalog-home-hero catalog-templates-hero"><div class="catalog-home-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Templates</h1><p class="rf-text rf-text--body-large rf-text--secondary">Готовые сборки из нескольких системных элементов для повторяемых интерфейсных сценариев.</p></div><div class="catalog-home-hero__media"><img class="rf-image catalog-home-hero__image" src="assets/catalog-home/guidelines-composition.png" alt="Композиция из готовых шаблонов интерфейса Contour" width="1536" height="1024"></div></header><section class="catalog-home-section rf-stack rf-stack--gap-8" aria-labelledby="templates-overview-title"><div class="catalog-home-section__heading rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="templates-overview-title">Сущности Templates</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Каждый Template собирает два или более зарегистрированных элемента. Registry автоматически направляет все сущности уровня pattern сюда, отдельно от Components.</p></div><div class="catalog-component-groups rf-stack rf-stack--gap-8">${groups.map(group => `<section class="catalog-component-group rf-stack rf-stack--gap-4" aria-labelledby="template-group-${group.id}-title"><h3 class="rf-text rf-text--heading-h3" id="template-group-${group.id}-title">${escapeHtml(group.label)}</h3><div class="catalog-home-grid catalog-component-grid" data-template-group="${escapeAttribute(group.id)}">${group.entries.map(componentOverviewCard).join('')}</div></section>`).join('')}</div></section>`;
}
function buttonSizeClass(size, iconOnly = false) {
if (size === 'm') return '';
return ` ${iconOnly ? 'rf-icon-button' : 'rf-button'}--${escapeAttribute(size)}`;
}
const buttonSizeLabel = size => size.toUpperCase();
function buttonVariantClass(variant, iconOnly = false) {
return `${iconOnly ? 'rf-icon-button' : 'rf-button'}--${escapeAttribute(variant)}`;
}
function renderButtonVariantRows(entry, iconOnly = false) {
return entry.variants.map(variant => `<article class="catalog-button-variant rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3">${escapeHtml(titleCase(variant))}</h3><code>.${buttonVariantClass(variant, iconOnly)}</code></header><div class="catalog-button-variant__samples">${entry.sizes.map(size => iconOnly ? `<span class="catalog-button-sample rf-stack rf-stack--gap-2"><button class="rf-icon-button ${buttonVariantClass(variant, true)}${buttonSizeClass(size, true)}" type="button" aria-label="${variant === 'danger' ? 'Удалить' : variant === 'close' ? 'Закрыть' : 'Подтвердить'}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="${variant === 'danger' ? 'trash-can' : variant === 'close' ? 'close' : 'checkmark'}" aria-hidden="true"></span></button><span class="rf-text rf-text--caption rf-text--secondary">${buttonSizeLabel(size)}</span></span>` : `<span class="catalog-button-sample rf-stack rf-stack--gap-2"><button class="rf-button ${buttonVariantClass(variant)}${buttonSizeClass(size)}" type="button"><span class="rf-button__content">${variant === 'danger' ? 'Удалить' : 'Продолжить'}</span></button><span class="rf-text rf-text--caption rf-text--secondary">${buttonSizeLabel(size)}</span></span>`).join('')}</div></article>`).join('');
}
function renderButtonEntity(item) {
const entry = item.registry;
const iconEntry = entryByName.get('IconButton')?.registry;
const guidance = model.guidance.components[entry.name] || defaultGuidance(entry);
const requestedTab = new URL(window.location.href).searchParams.get('buttonTab');
const tabNames = ['anatomy', 'button', 'icon-button'];
const selectedTab = tabNames.includes(requestedTab) ? requestedTab : 'anatomy';
const tabLabels = {anatomy: 'Anatomy', button: 'Button', 'icon-button': 'Icon Button'};
const tabButton = name => `<button class="rf-tab" id="button-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="button-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-button-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="button-panel-${name}" role="tabpanel" aria-labelledby="button-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const anatomy = `<section class="catalog-button-tab-section catalog-button-anatomy rf-stack rf-stack--gap-8" aria-labelledby="button-anatomy-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="button-anatomy-title">Как устроено действие</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Button сохраняет один action contract и меняет presentation через variant, size и state.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage"><span class="rf-button rf-button--primary rf-button--l"><span class="rf-button__content"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="checkmark" aria-hidden="true"></span><span class="rf-button__copy"><span class="rf-button__label">Сохранить</span><span class="rf-button__subtitle">Изменения будут опубликованы</span></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="right-arrow" aria-hidden="true"></span></span></span></div><ol class="catalog-button-anatomy__parts"><li><strong>Action root</strong><span>Нативный <code>button</code> для действия или <code>a</code> для перехода.</span></li><li><strong>Leading Icon</strong><span>Необязательная декоративная иконка из системного набора.</span></li><li><strong>Label</strong><span>Короткое видимое название результата действия.</span></li><li><strong>Subtitle</strong><span>Необязательное пояснение второй строкой; не заменяет доступное имя действия.</span></li><li><strong>Trailing Icon</strong><span>Используется только когда помогает объяснить направление.</span></li><li><strong>Loading indicator</strong><span>Принадлежит Core и не меняет размер кнопки.</span></li></ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><section class="catalog-button-contract rf-stack rf-stack--gap-4" aria-labelledby="button-contract-title"><h3 class="rf-text rf-text--heading-h3" id="button-contract-title">Contract</h3><div class="catalog-button-contract__grid"><article><strong>Variants</strong>${smallList(entry.variants)}</article><article><strong>Sizes</strong>${smallList(entry.sizes.map(buttonSizeLabel))}</article><article><strong>States</strong>${smallList(entry.states)}</article></div></section><div class="catalog-callout rf-stack rf-stack--gap-2"><span class="rf-badge rf-badge--success">Accessibility</span><strong>У каждого действия есть доступное имя и видимый focus.</strong><span>Label задаёт имя действия; Subtitle связан через <code>aria-describedby</code>. Loading сообщает <code>aria-busy</code> и блокирует повторное действие; icon-only presentation всегда использует IconButton.</span></div></section>`;
const parameterMeta = (title, hint) => `<span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>`;
const parameter = (title, hint, control, element = 'label', modifier = '') => `<${element} class="catalog-typography-playground__group catalog-button-playground__parameter${modifier ? ` ${modifier}` : ''}">${parameterMeta(title, hint)}${control}</${element}>`;
const dropdown = (name, values) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${name === 'size' ? 'm' : values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, name === 'size' ? buttonSizeLabel(value) : titleCase(value), {selected: false, description: name === 'size' ? {s:'32px',m:'40px',l:'48px'}[value] : name === 'variant' ? `.rf-button--${value}` : ''})).join('')}</span></span>`;
const subtitleSwitch = `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="subtitleEnabled" checked><span class="rf-switch__track"></span></span><span class="rf-sr-only">Показать Subtitle</span></label>`;
const iconSwitch = (name, label) => `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}"><span class="rf-switch__track"></span></span><span class="rf-sr-only">${label}</span></label>${iconGlyphControl(name, name === 'startIcon' ? 'checkmark' : 'right-arrow')}`;
const subtitleParameter = `<div class="catalog-typography-playground__group catalog-button-playground__parameter catalog-button-playground__parameter--subtitle">${parameterMeta('Subtitle', 'Дополнительное пояснение')}${subtitleSwitch}<input class="rf-text-field catalog-typography-playground__text" name="subtitle" value="Изменения будут опубликованы" aria-label="Subtitle: текст"></div>`;
const controls = parameter('Variant', 'Визуальный приоритет', dropdown('variant', entry.variants), 'div') + parameter('State', 'Состояние компонента', dropdown('state', entry.states), 'div') + parameter('Size', 'Размер действия', dropdown('size', entry.sizes), 'div') + `<div class="catalog-dimension-playground__parameter" data-button-width-control><span class="catalog-dimension-playground__meta"><strong id="button-width-label">Width</strong><output class="rf-text rf-text--caption rf-text--secondary" for="button-width" data-button-width-value>560px</output></span><div class="rf-slider-field catalog-dimension-playground__range"><input class="rf-slider" id="button-width" name="width" type="range" min="0" max="1600" step="1" value="560" aria-labelledby="button-width-label"><span class="rf-slider-field__limits" aria-hidden="true"><span>0px</span><span>1600px</span></span></div></div>` + parameter('Label', 'Видимое имя действия', '<input class="rf-text-field catalog-typography-playground__text" name="label" value="Сохранить">') + subtitleParameter + parameter('Start icon', 'Иконка перед текстом', iconSwitch('startIcon', 'Показать Start icon'), 'div', 'catalog-button-playground__parameter--toggle') + parameter('End icon', 'Иконка после текста', iconSwitch('endIcon', 'Показать End icon'), 'div', 'catalog-button-playground__parameter--toggle');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Button и проверьте результат в превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="button"><div class="catalog-dimension-playground__stage" data-button-playground-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-button-playground-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" data-button-playground-theme-icon="light" aria-hidden="true"></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="clear-night-01" data-button-playground-theme-icon="dark" aria-hidden="true" hidden></span></button><div data-button-width-preview><button class="rf-button rf-button--primary" type="button" data-playground-output><span class="rf-button__content"><span class="rf-icon rf-icon--md" data-rf-icon-glyph="checkmark" data-playground-start-icon aria-hidden="true" hidden></span><span class="rf-button__copy"><span class="rf-button__label">Сохранить</span><span class="rf-button__subtitle">Изменения будут опубликованы</span></span><span class="rf-icon rf-icon--md" data-rf-icon-glyph="right-arrow" data-playground-end-icon aria-hidden="true" hidden></span></span></button></div></div><form class="catalog-typography-playground__controls">${controls}</form></div></section>`;
const buttonExamples = model.codeExamples.components.Button.variants;
const iconButtonExamples = model.codeExamples.components.IconButton.variants;
const exampleTargetKey = target => `${target.platforms.join('-')}-${target.adapter}-${target.language}`;
const exampleTargetLabel = target => target.targetLabel;
const renderExampleCodeTab = (componentSlug, variant, target) => {
const targetKey = exampleTargetKey(target);
return `<button class="rf-tab" id="${escapeAttribute(componentSlug)}-example-${escapeAttribute(variant)}-${escapeAttribute(targetKey)}-tab" type="button" role="tab" aria-selected="false" aria-controls="${escapeAttribute(componentSlug)}-example-${escapeAttribute(variant)}-${escapeAttribute(targetKey)}-panel" tabindex="-1">${escapeHtml(exampleTargetLabel(target))}</button>`;
};
const renderExampleCodePanel = (componentSlug, variant, target) => {
const targetKey = exampleTargetKey(target);
const sourceId = `${componentSlug}-example-${variant}-${targetKey}-source`;
const panelId = `${componentSlug}-example-${variant}-${targetKey}-panel`;
const tabId = `${componentSlug}-example-${variant}-${targetKey}-tab`;
const adapter = model.codeExamples.adapters[target.adapter];
return `<section class="rf-tab-panel catalog-button-example__code-panel" id="${escapeAttribute(panelId)}" role="tabpanel" aria-labelledby="${escapeAttribute(tabId)}" tabindex="0" hidden><div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">${escapeHtml(adapter.label)}</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${escapeAttribute(sourceId)}" data-copy-code-label="${escapeAttribute(exampleTargetLabel(target))}" aria-label="Скопировать ${escapeAttribute(exampleTargetLabel(target))}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${escapeAttribute(sourceId)}">${escapeHtml(target.code)}</code></pre></section>`;
};
const variantExamples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4" aria-labelledby="button-examples-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="button-examples-title">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Распространённые варианты Button с назначением и готовым примером кода.</p></header><div class="catalog-button-example-list">${entry.variants.map(variant => {
const example = buttonExamples[variant];
const codeTabs = example.targets.map(target => renderExampleCodeTab('button', variant, target)).join('');
const codePanels = example.targets.map(target => renderExampleCodePanel('button', variant, target)).join('');
return `<article class="catalog-button-example" data-button-variant-example="${escapeAttribute(variant)}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Button — ${escapeHtml(titleCase(variant))}</h3><code>.rf-button--${escapeHtml(variant)}</code></header><div class="catalog-button-example__stage"><button class="rf-button rf-button--${escapeAttribute(variant)}" type="button"><span class="rf-button__content">${escapeHtml(example.previewLabel)}</span></button></div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${escapeAttribute(titleCase(variant))}: описание и готовый код"><button class="rf-tab" id="button-example-${escapeAttribute(variant)}-tab-description" type="button" role="tab" aria-selected="true" aria-controls="button-example-${escapeAttribute(variant)}-panel-description" tabindex="0">Описание</button>${codeTabs}</div><section class="rf-tab-panel" id="button-example-${escapeAttribute(variant)}-panel-description" role="tabpanel" aria-labelledby="button-example-${escapeAttribute(variant)}-tab-description" tabindex="0"><p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p></section>${codePanels}</div></article>`;
}).join('')}</div></section>`;
const buttonContent = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${variantExamples}</section>`;
const iconDropdown = (name, values) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${name === 'size' ? 'm' : values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, name === 'size' ? buttonSizeLabel(value) : titleCase(value), {selected: false, description: name === 'size' ? {s:'32px',m:'40px',l:'48px'}[value] : name === 'variant' ? `.rf-icon-button--${value}` : ''})).join('')}</span></span>`;
const iconControls = parameter('Variant', 'Визуальный приоритет', iconDropdown('variant', iconEntry.variants), 'div') + parameter('State', 'Состояние компонента', iconDropdown('state', iconEntry.states), 'div') + parameter('Size', 'Размер действия', iconDropdown('size', iconEntry.sizes), 'div') + parameter('Icon', 'Системная иконка', iconDropdown('icon', ['checkmark','pencil','close','left-arrow','trash-can']), 'div') + parameter('Style', 'Начертание иконки', iconStyleControl('iconStyle', 'Style'), 'div') + parameter('Accessible label', 'Локализованное имя действия', '<input class="rf-text-field catalog-typography-playground__text" name="label" value="Подтвердить">');
const iconPlayground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4" aria-labelledby="icon-button-playground-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="icon-button-playground-title">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Icon Button и проверьте доступное имя, вариант, размер и состояние.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="icon-button"><div class="catalog-dimension-playground__stage" data-icon-button-playground-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-icon-button-playground-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" data-icon-button-playground-theme-icon="light" aria-hidden="true"></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="clear-night-01" data-icon-button-playground-theme-icon="dark" aria-hidden="true" hidden></span></button><button class="rf-icon-button rf-icon-button--primary" type="button" aria-label="Подтвердить" data-icon-button-playground-output><span class="rf-button__content"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="checkmark" data-icon-button-playground-icon aria-hidden="true"></span></span></button></div><form class="catalog-typography-playground__controls">${iconControls}</form></div></section>`;
const iconVariantExamples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4" aria-labelledby="icon-button-examples-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="icon-button-examples-title">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Все варианты Icon Button с назначением и готовым кодом для Web + Mini App и React.</p></header><div class="catalog-button-example-list">${iconEntry.variants.map(variant => {
const example = iconButtonExamples[variant];
const codeTabs = example.targets.map(target => renderExampleCodeTab('icon-button', variant, target)).join('');
const codePanels = example.targets.map(target => renderExampleCodePanel('icon-button', variant, target)).join('');
return `<article class="catalog-button-example" data-icon-button-variant-example="${escapeAttribute(variant)}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Icon Button — ${escapeHtml(titleCase(variant))}</h3><code>.rf-icon-button--${escapeHtml(variant)}</code></header><div class="catalog-button-example__stage"><button class="rf-icon-button rf-icon-button--${escapeAttribute(variant)}" type="button" aria-label="${escapeAttribute(example.previewLabel)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="${escapeAttribute(example.previewIcon)}" aria-hidden="true"></span></button></div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${escapeAttribute(titleCase(variant))}: описание и готовый код"><button class="rf-tab" id="icon-button-example-${escapeAttribute(variant)}-tab-description" type="button" role="tab" aria-selected="true" aria-controls="icon-button-example-${escapeAttribute(variant)}-panel-description" tabindex="0">Описание</button>${codeTabs}</div><section class="rf-tab-panel" id="icon-button-example-${escapeAttribute(variant)}-panel-description" role="tabpanel" aria-labelledby="icon-button-example-${escapeAttribute(variant)}-tab-description" tabindex="0"><p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p></section>${codePanels}</div></article>`;
}).join('')}</div></section>`;
const iconContent = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${iconPlayground}${iconVariantExamples}</section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Button</h1><p class="rf-text rf-text--body-large rf-text--secondary">Действия Contour остаются понятными, предсказуемыми и доступными во всех состояниях.</p></div><div class="catalog-color-hero__media"><div class="catalog-button-hero__stage" data-button-hero inert aria-hidden="true">${buttonIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Button">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', anatomy)}${tabPanel('button', buttonContent)}${tabPanel('icon-button', iconContent)}</div>`;
wirePlayground(entry);
wireIconButtonPlayground(iconEntry);
loadIconGlyphControls(entityPage);
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
const source = document.getElementById(button.dataset.copyCodeTarget)?.textContent;
if (!source) return;
await navigator.clipboard.writeText(source);
announce(`${button.dataset.copyCodeLabel} скопирован`);
}));

const tabs = /** @type {HTMLElement} */(entityPage.querySelector('.catalog-button-tabs'));
const syncTabQuery = () => { const active = /** @type {HTMLButtonElement} */(tabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.buttonTab || 'anatomy'; updateQuery('buttonTab', active === 'anatomy' ? '' : active); };
tabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncTabQuery); });
tabs.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) window.requestAnimationFrame(syncTabQuery); });
}
function entityCard(item) {
const entry = item.registry;
const replacement = entry.replacement ? `<span class="rf-text rf-text--body-small">Replacement: <strong>${escapeHtml(entry.replacement)}</strong></span>` : '';
return `<a class="rf-card rf-card--interactive rf-stack rf-stack--gap-3" href="#${escapeAttribute(item.route)}" data-ds-name="${escapeAttribute(entry.name)}" data-ds-level="${escapeAttribute(entry.level)}" data-ds-status="${escapeAttribute(entry.status)}"><div class="rf-inline rf-inline--between"><span class="rf-text rf-text--heading-h3">${escapeHtml(entry.name)}</span>${statusBadge(entry.status)}</div><p class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(entry.summary)}</p><div class="rf-inline rf-inline--gap-1"><span class="rf-badge rf-badge--sm">${escapeHtml(entry.category)}</span>${entry.platforms.map(platform => `<span class="rf-badge rf-badge--sm">${escapeHtml(platform)}</span>`).join('')}</div>${replacement}</a>`;
}
function defaultGuidance(entry) {
if (entry.status === 'deprecated') {
return {useWhen: [`Только для legacy migration до перехода на ${entry.replacement}.`], dontUseWhen: ['Не использовать в новых features.'], anatomy: entry.dependencies.length ? entry.dependencies : ['Legacy contract']};
}
const lifecycle = entry.status === 'experimental' ? 'API ещё может измениться; используйте только в scoped experiment с evidence.' : entry.status === 'beta' ? 'Используйте на поддерживаемой platform и собирайте production evidence.' : 'Переиспользуйте canonical contract.';
return {
useWhen: [entry.purpose, lifecycle],
dontUseWhen: [entry.level === 'pattern' ? 'Одна похожая композиция не делает этот contract Stable Pattern.' : 'Не используйте для Contour-specific business semantics без feature composition.'],
anatomy: entry.dependencies.length ? [`${entry.name} root`, ...entry.dependencies.map(item => `${item} dependency or slot`)] : [`${entry.name} root`, 'Content or platform-native behavior'],
};
}
const priceCurrencies = {RUB:'₽', KGS:'сом', KZT:'₸', GEL:'₾', UZS:'сум', EUR:'€', USD:'$', GBP:'£', HNL:'L'};
function textFieldSource(variant, prefix) {
return model.codeExamples.components.TextField.variants[variant].targets[0].code.replaceAll(`textfield-${variant}`, prefix);
}
function renderTextFieldEntity(item) {
const entry = item.registry;
const examples = model.codeExamples.components.TextField.variants;
const guidance = model.guidance.components.TextField || defaultGuidance(entry);
const selected = new URLSearchParams(location.search).get('textFieldTab') === 'text-field' ? 'text-field' : 'anatomy';
const tabs = ['anatomy', 'text-field'];
const tabLabel = tab => tab === 'anatomy' ? 'Anatomy' : 'TextField';
const tab = name => `<button class="rf-tab" id="text-field-tab-${name}" type="button" role="tab" aria-selected="${selected === name}" aria-controls="text-field-panel-${name}" tabindex="${selected === name ? '0' : '-1'}" data-text-field-tab="${name}">${tabLabel(name)}</button>`;
const panel = (name, content) => `<section class="rf-tab-panel" id="text-field-panel-${name}" role="tabpanel" aria-labelledby="text-field-tab-${name}" tabindex="0"${selected === name ? '' : ' hidden'}>${content}</section>`;
const meta = (title, hint) => `<span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>`;
const parameter = (title, hint, control, wrapper = 'label', attrs = '') => `<${wrapper} class="catalog-typography-playground__group catalog-button-playground__parameter" ${attrs}>${meta(title, hint)}${control}</${wrapper}>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected: value === initial})).join('')}</span></span>`;
const textControl = (name, value) => `<input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${({hint:'Description',error:'Error text'})[name] || titleCase(name)}" value="${escapeAttribute(value)}">`;
const optionalText = (title, hint, name, value, toggleName, checked = !!name) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter catalog-button-playground__parameter--${name ? 'subtitle' : 'toggle'}">${meta(title, hint)}<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${toggleName}"${checked ? ' checked' : ''} aria-label="Показать ${title}"><span class="rf-switch__track" aria-hidden="true"></span></span></label>${name ? textControl(name, value) : ''}</div>`;
const iconParameter = (title, hint, name, glyph) => optionalText(title, hint, null, null, name).replace('</div>', `${iconGlyphControl(name, glyph)}</div>`);
const controls = parameter('Variant', 'Назначение поля', dropdown('variant', entry.variants, 'default', Object.fromEntries(entry.variants.map(v => [v, examples[v].previewLabel]))), 'div')
+ parameter('Currency', 'Валюта без пересчёта суммы', dropdown('currency', Object.keys(priceCurrencies), 'RUB'), 'div', 'data-price-currency hidden')
+ parameter('State', 'Состояние компонента', dropdown('state', entry.states, 'default'), 'div')
+ optionalText('Error', 'Ошибка в поле', null, null, 'error')
+ parameter('Size', 'Размер поля', dropdown('size', entry.sizes, 'md', {sm:'S', md:'M', lg:'L'}), 'div')
+ `<div class="catalog-typography-playground__group catalog-button-playground__parameter" data-text-field-width-control><span class="catalog-dimension-playground__meta"><strong id="text-field-width-label">Width</strong><output class="rf-text rf-text--caption rf-text--secondary" for="text-field-width" data-text-field-width-value>560px</output></span><div class="rf-slider-field catalog-dimension-playground__range"><input class="rf-slider" id="text-field-width" name="width" type="range" min="0" max="1600" step="1" value="560" aria-labelledby="text-field-width-label"><span class="rf-slider-field__limits" aria-hidden="true"><span>0px</span><span>1600px</span></span></div></div>`
+ optionalText('Label', 'Видимое имя поля', 'label', 'Название', 'showLabel')
+ parameter('Value', 'Значение в превью', textControl('value', ''))
+ optionalText('Placeholder', 'Подсказка для ввода', 'placeholder', 'Введите название', 'showPlaceholder', false)
+ optionalText('Description', 'Пояснение под полем', 'hint', 'Укажите название букета', 'showHint', false)
+ iconParameter('Start icon', 'Иконка перед текстом', 'startIcon', 'search')
+ iconParameter('End icon', 'Иконка после текста', 'endIcon', 'checkmark');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте TextField и проверьте ввод, состояние и тему в превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="text-field"><div class="catalog-dimension-playground__stage" data-text-field-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-text-field-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" data-text-field-theme-icon="light" aria-hidden="true"></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="clear-night-01" data-text-field-theme-icon="dark" aria-hidden="true" hidden></span></button><div class="catalog-text-field-preview" data-text-field-output></div></div><form class="catalog-typography-playground__controls">${controls}</form></div></section>`;
const cards = entry.variants.map(variant => {
const example = examples[variant];
const id = `text-field-example-${variant}`;
const source = example.targets[0];
return `<article class="catalog-button-example" data-text-field-variant-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">TextField — ${escapeHtml(example.previewLabel)}</h3><code>${escapeHtml(variant)}</code></header><div class="catalog-button-example__stage"><div class="catalog-text-field-preview">${textFieldSource(variant, id + '-input')}</div></div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${escapeAttribute(example.previewLabel)}: описание и готовый код"><button class="rf-tab" id="${id}-description-tab" type="button" role="tab" aria-selected="true" aria-controls="${id}-description-panel" tabindex="0">Описание</button><button class="rf-tab" id="${id}-web-tab" type="button" role="tab" aria-selected="false" aria-controls="${id}-web-panel" tabindex="-1">Web + Mini App</button></div><section class="rf-tab-panel" id="${id}-description-panel" role="tabpanel" aria-labelledby="${id}-description-tab" tabindex="0"><p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p></section><section class="rf-tab-panel catalog-button-example__code-panel" id="${id}-web-panel" role="tabpanel" aria-labelledby="${id}-web-tab" tabindex="0" hidden><div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(source.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать код ${escapeAttribute(example.previewLabel)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(source.code)}</code></pre></section></div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен TextField</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Нативное поле сохраняет ввод, автозаполнение и управление с клавиатуры. Label перемещается автоматически при фокусе и заполнении.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage"><div class="catalog-text-field-preview">${textFieldSource('default','text-field-anatomy-input')}</div></div><ol class="catalog-button-anatomy__parts">${[['Native input','Нативный input: тип, значение, ограничения и события.'],['Label','Видимая подпись связана с полем через for / id.'],['Leading icon','Декоративная иконка перед значением.'],['Trailing slot','Ровно один элемент справа: иконка, действие, очистка или показ пароля.'],['Helper / error','Пояснение или ошибка связаны с input через aria-describedby.']].map(([title,body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid">${[['Variants',entry.variants],['Sizes',entry.sizes],['States',entry.states]].map(([title,values])=>`<article class="rf-stack rf-stack--gap-2"><h3 class="rf-text rf-text--heading-h3">${title}</h3>${smallList(values)}</article>`).join('')}</div><p class="catalog-callout rf-text rf-text--body-small">Не заменяйте видимую подпись placeholder. Для ошибки используйте aria-invalid и связанное сообщение. Начальный фокус остаётся под управлением страницы. React и native adapters для TextField пока не реализованы; готовые примеры используют публичный Core Web.</p></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">TextField</h1><p class="rf-text rf-text--body-large rf-text--secondary">Ввод данных с понятной подписью, подсказкой и обратной связью во всех состояниях.</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-text-field-hero inert aria-hidden="true"><div class="catalog-text-field-preview">${textFieldIllustration()}</div></div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-text-field-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы TextField">${tabs.map(tab).join('')}</div>${panel('anatomy',anatomy)}${panel('text-field',`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Каждый вариант — отдельный пример с описанием и готовым кодом для Web + Mini App.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`)}</div>`;
wireTextFieldPlayground();
loadIconGlyphControls(entityPage);
const tabRoot = /** @type {HTMLElement} */(entityPage.querySelector('[data-text-field-tabs]'));
const syncQuery = () => { const active = /** @type {HTMLElement} */(tabRoot.querySelector('[data-text-field-tab][aria-selected="true"]'))?.dataset.textFieldTab; updateQuery('textFieldTab', active === 'text-field' ? active : ''); };
tabRoot.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[data-text-field-tab]')) requestAnimationFrame(syncQuery); });
tabRoot.addEventListener('keydown', event => { if (/** @type {HTMLElement} */(event.target).matches('[data-text-field-tab]') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код TextField скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));

}
function wireTextFieldPlayground() {
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="text-field"]'));
const form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form'));
const output = /** @type {HTMLElement} */(root.querySelector('[data-text-field-output]'));
const stage = /** @type {HTMLElement} */(root.querySelector('[data-text-field-theme]'));
const toggle = /** @type {HTMLElement} */(root.querySelector('[data-text-field-theme-toggle]'));
let previousSettings = '';
let previousVariant = '';
let savedEndIcon = false;
const syncWidth = () => {
const width = Number(form.elements.width.value);
output.style.setProperty('--catalog-text-field-width', `${width}px`);
root.querySelector('[data-text-field-width-value]').textContent = `${width}px`;
};
const update = event => {
syncWidth();
// Resizing the preview must not recreate the native field or reset password visibility.
if (event?.target === form.elements.width) {
previousSettings = JSON.stringify([.../** @type {CatalogTextFormData} */(new FormData(form))]);
return;
}
// Keep at least one naming surface enabled.
if (!form.elements.showLabel.checked && !form.elements.showPlaceholder.checked) {
form.elements[event?.target.name === 'showPlaceholder' ? 'showLabel' : 'showPlaceholder'].checked = true;
}
const data = /** @type {CatalogTextFormData} */(new FormData(form));
const settings = JSON.stringify([...data]);
if (settings === previousSettings) return;
const variant = data.get('variant');
const multiline = variant === 'multiline';
const password = variant === 'password';
const price = variant === 'price';
const fixedEnd = password || price || variant === 'date';
/** @type {HTMLElement} */(root.querySelector('[data-price-currency]')).hidden = !price;
output.innerHTML = textFieldSource(variant, 'playground-text-field');
const input = /** @type {HTMLInputElement | HTMLTextAreaElement} */(output.querySelector('input,textarea'));
/** @type {NodeListOf<HTMLElement>} */(form.querySelectorAll('.catalog-button-playground__parameter')).forEach(row => {
row.hidden = multiline && !row.matches('[data-text-field-width-control]') && !/** @type {HTMLInputElement} */(row.querySelector('[name="variant"],[name="placeholder"]'));
});
/** @type {HTMLElement} */(root.querySelector('[data-price-currency]')).hidden = !price;
const placeholderToggle = /** @type {HTMLElement} */(form.elements.showPlaceholder.closest('.rf-switch'));
placeholderToggle.hidden = multiline;
if (multiline) {
if (previousVariant !== variant) {
form.elements.placeholder.value = input.placeholder;
form.elements.value.value = '';
}
input.placeholder = form.elements.placeholder.value;
input.setAttribute('aria-label', input.placeholder.trim() || 'Multiline');
input.value = form.elements.value.value;
form.elements.placeholder.disabled = false;
output.dataset.fieldState = 'default';
output.removeAttribute('aria-busy');
output.removeAttribute('role');
output.removeAttribute('aria-label');
previousVariant = variant;
previousSettings = JSON.stringify([.../** @type {CatalogTextFormData} */(new FormData(form))]);
return;
}
const label = /** @type {HTMLElement} */(output.querySelector('.rf-text-field__label'));
const hint = /** @type {HTMLElement} */(output.querySelector('.rf-text-field__hint'));
if (price) {
const currency = form.elements.currency.value;
const suffix = /** @type {HTMLElement} */(output.querySelector('.rf-text-field__suffix'));
suffix.setAttribute('data-rf-currency', currency);
suffix.setAttribute('data-rf-currency-label', priceCurrencies[currency]);
}
if (previousVariant !== variant) {
const wasFixedEnd = ['password','price','date'].includes(previousVariant);
if (fixedEnd && !wasFixedEnd) savedEndIcon = form.elements.endIcon.checked;
if (fixedEnd || wasFixedEnd || previousVariant === 'multiline') {
form.elements.endIcon.checked = fixedEnd || savedEndIcon;
form.elements.value.value = '';
}
form.elements.label.value = label.textContent;
form.elements.hint.value = hint.textContent;
form.elements.placeholder.value = label.textContent;
form.elements.startIcon.checked = input.classList.contains('rf-text-field--with-icon');
previousVariant = variant;
}
form.elements.endIcon.disabled = fixedEnd;
for (const name of ['startIcon', 'endIcon']) {
const control = /** @type {HTMLElement} */(form.querySelector(`[data-icon-slot-control="${name}"]`));
control.hidden = name === 'endIcon' && fixedEnd;
/** @type {NodeListOf<HTMLButtonElement>} */(control.querySelectorAll('[data-rf-dropdown-trigger]')).forEach(trigger => { trigger.disabled = !/** @type {HTMLInputElement} */(form.elements[name]).checked; });
}
form.elements.value.type = variant === 'date' ? 'date' : password ? 'password' : 'text';
form.elements.value.toggleAttribute('data-rf-price', price);
form.elements.value.inputMode = price ? 'decimal' : 'text';
const state = data.get('state');
output.dataset.fieldState = state;
input.classList.toggle('rf-text-field--sm', data.get('size') === 'sm');
input.classList.toggle('rf-text-field--lg', data.get('size') === 'lg');
// Native type and autofill purpose come from the source-backed variant.
const fieldName = form.elements.label.value.trim() || label.textContent;
label.textContent = fieldName;
const showLabel = form.elements.showLabel.checked;
const showPlaceholder = form.elements.showPlaceholder.checked;
if (!showLabel) {
label.remove();
input.setAttribute('aria-label', fieldName);
}
input.value = form.elements.value.value;
// Preserve :placeholder-shown for floating labels.
input.placeholder = showPlaceholder ? (form.elements.placeholder.value.trim() || fieldName) : ' ';
form.elements.label.disabled = !showLabel;
form.elements.placeholder.disabled = !showPlaceholder;
/** @type {NodeListOf<HTMLElement>} */(output.querySelectorAll('.rf-text-field__icon,.rf-text-field__trailing-icon')).forEach(icon => icon.remove());
for (const [name, slot, modifier] of [['startIcon','icon','with-icon'],['endIcon','trailing-icon','with-trailing-icon']]) {
const enabled = /** @type {HTMLInputElement} */(form.elements[name]).checked && !(fixedEnd && name === 'endIcon');
input.classList.toggle(`rf-text-field--${modifier}`, enabled);
if (!enabled) continue;
input.parentElement.insertAdjacentHTML('beforeend', `<span class="rf-text-field__${slot} rf-icon rf-icon--sm" data-rf-icon-glyph="${escapeAttribute(form.elements[name + 'Glyph'].value)}" data-rf-icon-style="${escapeAttribute(form.elements[name + 'Style'].value)}" aria-hidden="true"></span>`);
}
const skeleton = state === 'skeleton';
input.disabled = state === 'disabled' || skeleton;
input.setAttribute('data-skeleton', String(skeleton));
input.setAttribute('aria-hidden', String(skeleton));
output.setAttribute('aria-busy', String(skeleton));
if (skeleton) { output.setAttribute('role', 'status'); output.setAttribute('aria-label', 'Загрузка поля'); }
else { output.removeAttribute('role'); output.removeAttribute('aria-label'); }
hint.textContent = form.elements.hint.value;
input.setAttribute('aria-invalid', String(data.has('error')));
hint.className = data.has('error') ? 'rf-text-field__error' : 'rf-text-field__hint';
hint.hidden = !data.has('showHint');
if (hint.hidden) {
const ids = input.getAttribute('aria-describedby').split(' ').filter(id => id !== hint.id).join(' ');
if (ids) input.setAttribute('aria-describedby', ids);
else input.removeAttribute('aria-describedby');
}
output.querySelectorAll('button').forEach(button => { button.disabled = input.disabled || input.readOnly; });
form.elements.hint.disabled = !data.has('showHint');
previousSettings = JSON.stringify([.../** @type {CatalogTextFormData} */(new FormData(form))]);

};
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', update);
form.addEventListener('change', update);
output.addEventListener('input', event => {
if (!/** @type {HTMLElement} */(event.target).matches('input,textarea')) return;
form.elements.value.value = /** @type {HTMLInputElement} */(event.target).value;
// Input/clear already updates the live preview; do not rebuild it on a later form event.
previousSettings = JSON.stringify([.../** @type {CatalogTextFormData} */(new FormData(form))]);
});
const applyTheme = theme => {
stage.dataset.textFieldTheme = theme;
stage.style.colorScheme = theme;
// Scope canonical resolved tokens to the preview, without changing the page theme.
for (const group of ['textField','button']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (!record.themeDependent) continue;
const variable = '--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase();
stage.style.setProperty(variable, String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'), String(record[theme].resolved));
const canvas = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas');
stage.style.setProperty('--rf-text-secondary', 'var(--rf-color-context-text-secondary-default)');
stage.style.setProperty('--rf-text-disabled', 'var(--rf-color-context-text-primary-disabled)');
stage.style.setProperty('--rf-icon-secondary', 'var(--rf-color-context-icon-secondary-default)');
stage.style.background = String(canvas[theme].resolved);
toggle.setAttribute('aria-pressed', String(theme === 'dark'));
toggle.setAttribute('aria-label', theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {NodeListOf<HTMLElement>} */(stage.querySelectorAll('[data-text-field-theme-icon]')).forEach(icon => { icon.hidden = icon.dataset.textFieldThemeIcon !== theme; });
};
toggle.addEventListener('click', () => applyTheme(stage.dataset.textFieldTheme === 'light' ? 'dark' : 'light'));
update();
applyTheme('light');
}
function tabsIllustration() {
return '<span class="rf-tabs catalog-tabs-illustration" inert aria-hidden="true"><span class="rf-tab-list"><span class="rf-tab" aria-current="page">Обзор</span><span class="rf-tab">Состав</span><span class="rf-tab">Уход</span></span></span>';
}
function renderTabsEntity(item) {
const entry = item.registry;
const tabEntry = entryByName.get('Tab').registry;
const tabTarget = model.codeExamples.components.Tab.variants.line.targets[0];
const guidance = {useWhen:[entry.purpose], dontUseWhen:['Для перехода на другую страницу используйте Link или TabBar.', 'Для выбора значения без связанных панелей используйте SegmentedControl.']};
const example = model.codeExamples.components.Tabs.variants.line, target = example.targets[0];
const requestedTab = new URLSearchParams(location.search).get('tabsTab');
const selected = ['items','tabs'].includes(requestedTab) ? requestedTab : 'anatomy';
const tab = (id, key, label, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id, key, body, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
// Tabs owns group IDs/selection/panels; each child uses the canonical Tab anatomy.
const specimen = id => {
const template = document.createElement('template');
template.innerHTML = target.code.replaceAll('tabs-demo-', id + '-');
const single = document.createElement('template');
single.innerHTML = tabTarget.code;
/** @type {NodeListOf<HTMLButtonElement>} */(template.content.querySelectorAll('[role="tab"]')).forEach(node => {
const child = /** @type {HTMLButtonElement} *//** @type {HTMLButtonElement} */((single.content.querySelector('[role="tab"]')).cloneNode(true));
for (const attribute of node.attributes) child.setAttribute(attribute.name, attribute.value);
child.querySelector('.rf-tab__label').textContent = node.textContent;
node.replaceWith(child);
});
return template.innerHTML.trim();
};
const itemSpecimen = id => tabTarget.code.replaceAll('tab-demo-', id + '-');
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const choices = [['about','Описание'],['details','Состав'],['delivery','Доставка'], ...Array.from({length:7}, (_,index) => [`extra-${index + 4}`,`Вкладка ${index + 4}`])];
const activeControl = `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="activeTab" value="about" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="Active tab"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${choices.map(([value,label]) => dropdownItem(value,label,{selected:value === 'about'})).join('')}</span></span>`;
const countControl = `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="tabCount" value="3" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="Количество табов"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${Array.from({length:10}, (_,index) => dropdownItem(String(index + 1),String(index + 1),{selected:index === 2})).join('')}</span></span>`;
const controls = parameter('Количество табов','От 1 до 10',countControl)
+ parameter('Active tab','Открытая панель',activeControl);
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Переключайте вкладки в превью или выберите активную панель. Для проверки фокуса используйте Tab, для переключения — стрелки, Home и End.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="tabs"><div class="catalog-dimension-playground__stage" data-tabs-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-tabs-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-tabs-preview" data-tabs-output>${specimen('tabs-playground')}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Tabs">${controls}</form></div></section>`;
const source = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="tabs-example-source" aria-label="Скопировать код Tabs"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="tabs-example-source">${escapeHtml(target.code)}</code></pre>`;
const cards = `<article class="catalog-button-example" data-tabs-example="line"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Tabs — Line</h3><code>line</code></header><div class="catalog-button-example__stage"><div class="catalog-tabs-preview">${specimen('tabs-example')}</div></div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Line: описание и код">${tab('tabs-example-code','description','Описание',true)}${tab('tabs-example-code','web','Web + Mini App',false)}</div>${panel('tabs-example-code','description',`<p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p>`,true)}${panel('tabs-example-code','web',source,false)}</div></article>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Tabs</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Одна активная вкладка открывает одну связанную панель.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage"><div class="catalog-tabs-preview">${specimen('tabs-anatomy')}</div></div><ol class="catalog-button-anatomy__parts">${[['Tab list','Группа вкладок с общим доступным названием.'],['Tab label','Короткая подпись описывает содержимое панели.'],['Selection indicator','Подчёркивание и цвет отмечают активную вкладку.'],['Tab panel','Панель связана с вкладкой через aria-controls и aria-labelledby.']].map(([title,body]) => `<li><strong>${title}</strong><span>${body}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid">${[['Variant',entry.variants],['Size',entry.sizes],['State',entry.states]].map(([title,values]) => `<article><h3 class="rf-text rf-text--heading-h3">${title}</h3>${smallList(values)}</article>`).join('')}</div><p class="catalog-callout rf-text rf-text--body-small">Core Web: Line / M. Segmented и S пока не реализованы. Hover и Focused проверяются настоящим наведением и клавиатурой; Selected отражает активную панель. Disabled пропускается стрелками. В каждом экземпляре нужны уникальные id. Tab и Tabs — Stable Core для Web и Mini App.</p></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Рабочий пример с описанием и готовым кодом публичного Core.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
const itemStates = tabEntry.states;
const itemDropdown = (name, values) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="default" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value,value === 'disabled' ? 'Disable' : titleCase(value),{selected:value === 'default'})).join('')}</span></span>`;
const itemIconParameter = (name, title, glyph) => parameter(title, 'Компонент Icon · 16 px', `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="Показать ${title}"><span class="rf-switch__track"></span></span></label>${iconGlyphControl(name, glyph)}`).replace('catalog-button-playground__parameter"', 'catalog-button-playground__parameter catalog-button-playground__parameter--toggle"');
const itemControls = parameter('Value','Выбрана ли вкладка',itemDropdown('value',['default','selected']))
+ parameter('State','Состояние взаимодействия',itemDropdown('state',itemStates))
+ parameter('Label','Подпись вкладки','<input class="rf-text-field catalog-typography-playground__text" name="label" aria-label="Label" value="Описание" maxlength="80">')
+ itemIconParameter('startIcon','Start icon','checkmark')
+ itemIconParameter('endIcon','End icon','right-arrow');
const itemCode = itemSpecimen('tab-item-example');
const itemSource = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><span>Один Tab из Line</span></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="tab-item-example-source" aria-label="Скопировать код Tab"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="tab-item-example-source">${escapeHtml(itemCode)}</code></pre>`;
const items = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Один Tab — элемент группы Tabs. Настройте состояние, подпись и тему превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="tab-item"><div class="catalog-dimension-playground__stage" data-tabs-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-tabs-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-tab-item-preview" data-tab-item-output>${itemSpecimen('tab-item-playground')}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Tab">${itemControls}</form></div></section><section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Отдельный элемент использует тот же Core, что и группа Tabs.</p></header><div class="catalog-button-example-list"><article class="catalog-button-example" data-tab-item-example><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Tab — Line</h3><code>line</code></header><div class="catalog-button-example__stage"><div class="catalog-tab-item-preview">${itemCode}</div></div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Tab: описание и код">${tab('tab-item-code','description','Описание',true)}${tab('tab-item-code','web','Web + Mini App',false)}</div>${panel('tab-item-code','description','<p class="rf-text rf-text--body-medium">Изолированный пример одного элемента, а не рекомендация создавать группу из одной вкладки. В интерфейсе Tab работает внутри Tabs и открывает связанную панель; здесь панель визуально скрыта, чтобы показать только сам элемент.</p>',true)}${panel('tab-item-code','web',itemSource,false)}</div></article></div></section></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Tabs</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-tabs-hero inert aria-hidden="true">${tabsIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-tabs-page><div class="rf-tab-list" role="tablist" aria-label="Разделы Tabs">${tab('tabs-page','anatomy','Anatomy',selected === 'anatomy')}${tab('tabs-page','items','Tab',selected === 'items')}${tab('tabs-page','tabs','Tabs',selected === 'tabs')}</div>${panel('tabs-page','anatomy',anatomy,selected === 'anatomy')}${panel('tabs-page','items',items,selected === 'items')}${panel('tabs-page','tabs',content,selected === 'tabs')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="tabs"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form'));
const output = /** @type {HTMLElement} */(root.querySelector('[data-tabs-output]')), list = /** @type {HTMLElement} */(output.querySelector('[role="tablist"]'));
const input = form.elements.activeTab, dropdown = input.closest('[data-rf-dropdown]');
const initialTabs = [.../** @type {NodeListOf<HTMLButtonElement>} */(list.querySelectorAll('[role="tab"]'))].map(node => /** @type {HTMLElement} */(node.cloneNode(true)));
const initialPanels = [.../** @type {NodeListOf<HTMLElement>} */(output.querySelectorAll('[role="tabpanel"]'))].map(node => /** @type {HTMLElement} */(node.cloneNode(true)));
const setCount = () => {
const count = Math.min(10, Math.max(1, Number(form.elements.tabCount.value) || 1));
const activeIndex = Math.max(0, choices.findIndex(([key]) => key === input.value));
const selectedIndex = Math.min(count - 1, activeIndex);
input.value = choices[selectedIndex][0];
list.replaceChildren();
/** @type {NodeListOf<HTMLElement>} */(output.querySelectorAll('[role="tabpanel"]')).forEach(panel => panel.remove());
for (let index = 0; index < count; index++) {
const [key,label] = choices[index], active = index === selectedIndex;
const child = /** @type {HTMLButtonElement} */((initialTabs[index] || initialTabs[0]).cloneNode(true));
const panel = /** @type {HTMLElement} */((initialPanels[index] || initialPanels[0]).cloneNode(true));
child.id = `tabs-playground-${key}-tab`;
child.setAttribute('aria-controls', `tabs-playground-${key}-panel`);
child.setAttribute('aria-selected', String(active));
child.tabIndex = active ? 0 : -1;
child.querySelector('.rf-tab__label').textContent = label;
panel.id = `tabs-playground-${key}-panel`;
panel.setAttribute('aria-labelledby', child.id);
panel.hidden = !active;
if (index >= initialPanels.length) panel.querySelector('p').textContent = `Содержимое вкладки ${index + 1}.`;
list.append(child);
list.parentElement.append(panel);
}
dropdown.querySelector('[data-rf-dropdown-panel]').innerHTML = choices.slice(0,count).map(([key,label]) => dropdownItem(key,label,{selected:key === input.value})).join('');
};
const sync = () => {
const active = /** @type {HTMLElement} */(list.querySelector('[aria-selected="true"]'));
const key = active.id.replace('tabs-playground-','').replace('-tab','');
input.value = key;
dropdown.querySelector('[data-rf-dropdown-value]').textContent = active.textContent;
/** @type {NodeListOf<HTMLElement>} */(dropdown.querySelectorAll('[role="option"]')).forEach(option => option.setAttribute('aria-selected', String(option.dataset.value === key)));
};
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('change', event => {
if (event.target === form.elements.tabCount) { setCount(); sync(); return; }
const next = /** @type {HTMLButtonElement} */(document.getElementById(`tabs-playground-${input.value}-tab`));
(next && !next.disabled ? next : /** @type {HTMLButtonElement} */(list.querySelector('[role="tab"]'))).click();
sync();
});
list.addEventListener('click', () => requestAnimationFrame(sync));
list.addEventListener('keydown', () => requestAnimationFrame(sync));
setCount();
sync();
const itemRoot = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="tab-item"]')), itemForm = /** @type {CatalogPlaygroundForm} */(itemRoot.querySelector('form'));
const itemOutput = /** @type {HTMLElement} */(itemRoot.querySelector('[data-tab-item-output]')), itemButton = /** @type {HTMLButtonElement} */(itemOutput.querySelector('[role="tab"]'));
const itemPanel = /** @type {HTMLElement} */(itemOutput.querySelector('[role="tabpanel"]'));
const updateItem = () => {
const state = itemForm.elements.state.value;
const selected = itemForm.elements.value.value === 'selected';
const icon = name => /** @type {HTMLInputElement} */(itemForm.elements[name]).checked ? `<span class="rf-icon rf-icon--sm" data-rf-icon-glyph="${escapeAttribute(itemForm.elements[name + 'Glyph'].value)}" data-rf-icon-style="${escapeAttribute(itemForm.elements[name + 'Style'].value)}" aria-hidden="true"></span>` : '';
itemButton.innerHTML = icon('startIcon') + `<span class="rf-tab__label">${escapeHtml(itemForm.elements.label.value.trim() || 'Описание')}</span>` + icon('endIcon');
itemButton.dataset.state = state;
itemButton.setAttribute('aria-selected', String(selected));
const skeleton = state === 'skeleton';
itemButton.disabled = state === 'disabled' || skeleton;
itemButton.tabIndex = itemButton.disabled ? -1 : 0;
itemPanel.hidden = !selected || skeleton;
if (skeleton) {
itemOutput.setAttribute('role', 'status');
itemOutput.setAttribute('aria-label', 'Загрузка вкладки');
itemOutput.setAttribute('aria-busy', 'true');
itemOutput.querySelector('[data-rf-tabs]').setAttribute('aria-hidden', 'true');
} else {
for (const attribute of ['role','aria-label','aria-busy']) itemOutput.removeAttribute(attribute);
/** @type {HTMLElement} */(itemOutput.querySelector('[data-rf-tabs]')).removeAttribute('aria-hidden');
}
for (const name of ['startIcon','endIcon']) /** @type {NodeListOf<HTMLButtonElement>} */(itemRoot.querySelectorAll(`[data-icon-slot-control="${name}"] [data-rf-dropdown-trigger]`)).forEach(trigger => { trigger.disabled = !/** @type {HTMLInputElement} */(itemForm.elements[name]).checked; });
};
itemForm.addEventListener('submit', event => event.preventDefault());
itemForm.addEventListener('input', updateItem);
itemForm.addEventListener('change', updateItem);
itemButton.addEventListener('click', () => {
const input = itemForm.elements.value;
input.value = 'selected';
input.dispatchEvent(new Event('change', {bubbles:true}));
});
updateItem();
loadIconGlyphControls(itemRoot);
wireTabsPreviewTheme(root);
wireTabsPreviewTheme(itemRoot);
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-tabs-page]'));
const syncQuery = () => {
const active = /** @type {HTMLElement} */(tabs.querySelector(':scope > [role="tablist"] [aria-selected="true"]'));
const value = active.id === 'tabs-page-items-tab' ? 'items' : active.id === 'tabs-page-tabs-tab' ? 'tabs' : '';
updateQuery('tabsTab', value);
};
tabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('#tabs-page-anatomy-tab,#tabs-page-items-tab,#tabs-page-tabs-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown', event => { if (/** @type {HTMLElement} */(event.target).matches('#tabs-page-anatomy-tab,#tabs-page-items-tab,#tabs-page-tabs-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Tabs скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function wireTabsPreviewTheme(root) {
const stage = /** @type {HTMLElement} */(root.querySelector('[data-tabs-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-tabs-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.tabsTheme = theme;
stage.style.colorScheme = theme;
for (const group of ['navigation','button','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./, '').replace(/([a-z])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase(), String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.', '-'), String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
themeButton.setAttribute('aria-label', theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click', () => applyTheme(stage.dataset.tabsTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
}
function checkboxIllustration() {
return '<span class="rf-choice rf-choice--md" inert aria-hidden="true"><span class="rf-choice__control"><input class="rf-choice__input" type="checkbox" checked tabindex="-1"><span class="rf-icon rf-icon--md" data-rf-icon-glyph="checkbox-check" data-rf-icon-style="line" aria-hidden="true"></span></span></span>';
}
function radioIllustration() {
return '<span class="rf-choice rf-choice--md" inert aria-hidden="true"><input class="rf-choice__input" type="radio" checked tabindex="-1"></span>';
}
function selectionErrorControl(kind) {
return `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="error" aria-label="Error"><span class="rf-switch__track"></span></span></label><span class="rf-sr-only" id="${kind}-error-message">Проверьте выбранное значение.</span>`;
}
function updateSelectionError(input, enabled, messageId) {
if (enabled) { input.setAttribute('aria-invalid','true'); input.setAttribute('aria-describedby',messageId); }
else { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
}
function renderRadioEntity(item) {
const entry = item.registry, example = model.codeExamples.components.Radio.variants.default, target = example.targets[0];
const selected = new URLSearchParams(location.search).get('radioTab') === 'radio' ? 'radio' : 'anatomy';
const tab = (id,key,label,active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id,key,body,active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
const dropdown = (name,values,initial,labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value,labels[value] || titleCase(value),{selected:value === initial})).join('')}</span></span>`;
const parameter = (title,hint,control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const states = entry.states.filter(value => !['unchecked','checked'].includes(value));
const controls = parameter('Value','Выбранное значение',dropdown('value',['unchecked','checked'],'unchecked')) + parameter('State','Состояние компонента',dropdown('state',states,'default',{disabled:'Disable'})) + parameter('Error','Ошибка проверки',selectionErrorControl('radio'));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Radio или выберите его в превью. Tab переводит фокус, Space выбирает значение.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="radio"><div class="catalog-dimension-playground__stage" data-radio-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-radio-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="rf-stack rf-stack--gap-2" data-radio-output><label class="rf-choice rf-choice--md"><input class="rf-choice__input" type="radio" name="radio-playground" value="checked" aria-label="Выбор варианта"></label></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Radio">${controls}</form></div></section>`;
const source = target.code.replaceAll('name="delivery-method"','name="radio-example-method"');
const code = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-radio-copy aria-label="Скопировать Radio"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(source)}</code></pre>`;
const examples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Группа Radio с описанием и готовым кодом.</p></header><article class="catalog-button-example" data-radio-example><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Radio — Default</h3><code>default</code></header><div class="catalog-button-example__stage">${source}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Radio: описание и код">${tab('radio-example','description','Описание',true)}${tab('radio-example','web','Web',false)}</div>${panel('radio-example','description',`<p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p>`,true)}${panel('radio-example','web',code,false)}</div></article></section>`;
const parts = [['Control','Нативный input type="radio" хранит checked и поддерживает клавиатуру.'],['Label','Кликабельная подпись объясняет каждый вариант.'],['Group','Общий name объединяет варианты. Fieldset и legend задают доступное имя группы.']];
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Radio</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Один переключатель представляет вариант; группа позволяет выбрать только один.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${radioIllustration()}</div><ol class="catalog-button-anatomy__parts">${parts.map(([title,body]) => `<li><strong>${title}</strong><span>${escapeHtml(body)}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(model.guidance.components.Radio.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(model.guidance.components.Radio.dontUseWhen)}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Value</h3>${smallList(['unchecked','checked'])}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(states)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3><p class="rf-text rf-text--body-medium">M · 24 px. Кликабельная строка — не меньше 44 px.</p></article></div><p class="catalog-callout rf-text rf-text--body-small">Stable · Web, native-first. Radio — новое имя RadioGroup; публичные классы rf-choice и rf-radio-group сохранены. В мобильном браузере используется тот же Web Core; отдельный native adapter не заявлен.</p></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Radio</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-radio-hero inert aria-hidden="true">${radioIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-radio-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Radio">${tab('radio','anatomy','Anatomy',selected === 'anatomy')}${tab('radio','radio','Radio',selected === 'radio')}</div>${panel('radio','anatomy',anatomy,selected === 'anatomy')}${panel('radio','radio',`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${examples}</section>`,selected === 'radio')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="radio"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-radio-output]'));
const inputs = [.../** @type {NodeListOf<HTMLInputElement>} */(output.querySelectorAll('input[type="radio"]'))], choice = /** @type {HTMLElement} */(output.querySelector('.rf-choice'));
const update = event => {
const state = form.elements.state.value, skeleton = state === 'skeleton';
choice.dataset.state = state;
inputs.forEach(input => {
input.checked = input.value === form.elements.value.value;
input.disabled = state === 'disabled' || skeleton;
updateSelectionError(input,form.elements.error.checked && !input.disabled,'radio-error-message');
});
if (skeleton) {
output.setAttribute('role','status');
output.setAttribute('aria-label','Загрузка выбора');
output.setAttribute('aria-busy','true');
choice.setAttribute('aria-hidden','true');
} else {
for (const attribute of ['role','aria-label','aria-busy']) output.removeAttribute(attribute);
choice.removeAttribute('aria-hidden');
}
if (event?.target === form.elements.state && state === 'focused') requestAnimationFrame(() => requestAnimationFrame(() => {
if (output.isConnected && form.elements.state.value === 'focused') (inputs.find(input => input.checked) || inputs[0]).focus(/** @type {FocusOptions & {focusVisible?: boolean}} */({preventScroll:true,focusVisible:true}));
}));
};
form.addEventListener('submit',event => event.preventDefault());
form.addEventListener('change',update);
output.addEventListener('change',event => {
if (!inputs.includes(/** @type {HTMLInputElement} */(event.target))) return;
form.elements.value.value = /** @type {HTMLInputElement} */(event.target).value;
form.elements.value.dispatchEvent(new Event('change',{bubbles:true}));
});
update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-radio-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-radio-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.radioTheme = theme;
stage.style.colorScheme = theme;
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
for (const group of ['selectionControl','button','icon','textField','text']) for (const record of model.foundations.componentTokenTrace[group] || []) if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark'));
themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.radioTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-radio-tabs]'));
const syncQuery = () => updateQuery('radioTab',tabs.querySelector('#radio-radio-tab').getAttribute('aria-selected') === 'true' ? 'radio' : '');
tabs.addEventListener('click',event => { if (/** @type {HTMLElement} */(event.target).closest('#radio-anatomy-tab,#radio-radio-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown',event => { if (/** @type {HTMLElement} */(event.target).matches('#radio-anatomy-tab,#radio-radio-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {HTMLElement} */(entityPage.querySelector('[data-radio-copy]')).addEventListener('click',async () => {
try { await navigator.clipboard.writeText(source); announce('Код Radio скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
});
}
function renderCheckboxEntity(item) {
const entry = item.registry;
const guidance = model.guidance.components.Checkbox;
const example = model.codeExamples.components.Checkbox.variants.default, target = example.targets[0];
const selected = new URLSearchParams(location.search).get('checkboxTab') === 'checkbox' ? 'checkbox' : 'anatomy';
const tab = (id, key, label, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id, key, body, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
const dropdown = (name, values, initial) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value,value === 'disabled' ? 'Disable' : titleCase(value),{selected:value === initial})).join('')}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const values = entry.states.filter(state => ['unchecked','checked','indeterminate'].includes(state));
const states = entry.states.filter(state => !values.includes(state));
const controls = parameter('Value','Выбранное значение',dropdown('value',values,'unchecked'))
+ parameter('State','Состояние компонента',dropdown('state',states,'default'))
+ parameter('Error','Ошибка проверки',selectionErrorControl('checkbox'));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Checkbox или переключите его прямо в превью. Tab показывает фокус, Space меняет значение.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="checkbox"><div class="catalog-dimension-playground__stage" data-checkbox-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-checkbox-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="rf-stack rf-stack--gap-2" data-checkbox-output>${target.code}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Checkbox">${controls}</form></div></section>`;
const exampleCodes = {};
const cards = values.map(value => {
const id = 'checkbox-example-' + value;
const markup = value === 'checked' ? target.code.replace('type="checkbox"','type="checkbox" checked') : value === 'indeterminate' ? target.code.replace('type="checkbox"',`type="checkbox" id="${id}-input"`) : target.code;
const source = markup + (value === 'indeterminate' ? `\n<script>document.getElementById('${id}-input').indeterminate = true;</script>` : '');
exampleCodes[value] = source;
const description = {unchecked:'Опция не выбрана.',checked:'Опция выбрана.',indeterminate:'Выбрана часть дочерних опций. Промежуточное значение задаётся DOM-свойством indeterminate.'}[value];
const code = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать Checkbox ${titleCase(value)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(source)}</code></pre>`;
return `<article class="catalog-button-example" data-checkbox-example="${value}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Checkbox — ${titleCase(value)}</h3><code>${value}</code></header><div class="catalog-button-example__stage">${markup}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${titleCase(value)}: описание и код">${tab(id,'description','Описание',true)}${tab(id,'web','Web',false)}</div>${panel(id,'description','<p class="rf-text rf-text--body-medium">' + escapeHtml(description + ' ' + example.description) + '</p>',true)}${panel(id,'web',code,false)}</div></article>`;
}).join('');
const parts = [['Control','Нативный input type="checkbox" хранит checked и поддерживает клавиатуру.'],['Indicator','Галочка показывает выбор не только цветом.'],['Accessible name','Встроенной подписи нет. Имя обязательно задаётся через aria-label или aria-labelledby.']];
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Checkbox</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Независимый выбор в форме. В отличие от Switch, значение может применяться после отправки формы.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${checkboxIllustration()}</div><ol class="catalog-button-anatomy__parts">${parts.map(([title,body]) => `<li><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Value</h3>${smallList(values)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(states)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3><p class="rf-text rf-text--body-medium">M · 24 px. Высота кликабельной строки — не меньше 44 px.</p></article></div><p class="catalog-callout rf-text rf-text--body-small">Stable · нативный input, радиус 8 px и системные Icon. Hover и Pressed доступны в State и при взаимодействии. Focused переводит настоящий фокус в превью. Skeleton сохраняет размер, скрывает содержимое и сообщает загрузку через aria-busy.</p></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Значения Checkbox с описанием и готовым кодом.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Checkbox</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-checkbox-hero inert aria-hidden="true">${checkboxIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-checkbox-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Checkbox">${tab('checkbox','anatomy','Anatomy',selected === 'anatomy')}${tab('checkbox','checkbox','Checkbox',selected === 'checkbox')}</div>${panel('checkbox','anatomy',anatomy,selected === 'anatomy')}${panel('checkbox','checkbox',content,selected === 'checkbox')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="checkbox"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form'));
/** @type {HTMLInputElement} */(entityPage.querySelector('[data-checkbox-example="indeterminate"] input')).indeterminate = true;
const output = /** @type {HTMLElement} */(root.querySelector('[data-checkbox-output]')), input = output.querySelector('input'), choice = /** @type {HTMLElement} */(output.querySelector('.rf-choice'));
const update = event => {
const state = form.elements.state.value, skeleton = state === 'skeleton';
choice.dataset.state = state;
input.checked = form.elements.value.value === 'checked';
input.indeterminate = form.elements.value.value === 'indeterminate';
input.disabled = state === 'disabled' || skeleton;
updateSelectionError(input,form.elements.error.checked && !input.disabled,'checkbox-error-message');
if (skeleton) {
output.setAttribute('role','status');
output.setAttribute('aria-label','Загрузка выбора');
output.setAttribute('aria-busy','true');
choice.setAttribute('aria-hidden','true');
} else {
for (const attribute of ['role','aria-label','aria-busy']) output.removeAttribute(attribute);
choice.removeAttribute('aria-hidden');
}
if (event?.target === form.elements.state && form.elements.state.value === 'focused') requestAnimationFrame(() => input.focus(/** @type {FocusOptions & {focusVisible?: boolean}} */({preventScroll:true,focusVisible:true})));
};
form.addEventListener('submit',event => event.preventDefault());
form.addEventListener('input',update);
form.addEventListener('change',update);
input.addEventListener('change',() => {
form.elements.value.value = input.checked ? 'checked' : 'unchecked';
form.elements.value.dispatchEvent(new Event('change',{bubbles:true}));
});
update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-checkbox-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-checkbox-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.checkboxTheme = theme;
stage.style.colorScheme = theme;
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
for (const group of ['selectionControl','button','icon','textField']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
}
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark'));
themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.checkboxTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-checkbox-tabs]'));
const syncQuery = () => updateQuery('checkboxTab',tabs.querySelector('#checkbox-checkbox-tab').getAttribute('aria-selected') === 'true' ? 'checkbox' : '');
tabs.addEventListener('click',event => { if (/** @type {HTMLElement} */(event.target).closest('#checkbox-anatomy-tab,#checkbox-checkbox-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown',event => { if (/** @type {HTMLElement} */(event.target).matches('#checkbox-anatomy-tab,#checkbox-checkbox-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-checkbox-example] [data-copy-code-target]')).forEach(button => button.addEventListener('click',async () => {
try { await navigator.clipboard.writeText(exampleCodes[/** @type {HTMLElement} */(button.closest('[data-checkbox-example]')).dataset.checkboxExample]); announce('Код Checkbox скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function avatarIllustration() {
return '<span class="rf-avatar rf-avatar--xl" inert aria-hidden="true">А</span>';
}
function renderAvatarEntity(item) {
const entry = item.registry, examples = model.codeExamples.components.Avatar.variants;
const selected = new URLSearchParams(location.search).get('avatarTab') === 'avatar' ? 'avatar' : 'anatomy';
const tab = (id, key, label, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id, key, body, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected:value === initial})).join('')}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const sizeLabels = Object.fromEntries(entry.sizes.map(size => {
const token = model.foundations.componentTokenTrace.avatar.find(record => record.name === 'component.avatar.' + size);
return [size, `${({xs:'XS',sm:'S',md:'M',lg:'L',xl:'XL'})[size]} · ${token.resolved}`];
}));
const controls = parameter('Variant','Изображение, инициалы или иконка',dropdown('variant',entry.variants,'initials'))
+ parameter('State','Состояние загрузки изображения',dropdown('state',entry.states,'loaded'))
+ parameter('Size','Диаметр аватара',dropdown('size',entry.sizes,'md',sizeLabels))
+ parameter('Name','Доступное имя пользователя','<input class="rf-text-field catalog-typography-playground__text" name="name" aria-label="Name" value="Анна" maxlength="80">')
+ parameter('Initials','До двух букв вместо фото','<input class="rf-text-field catalog-typography-playground__text" name="initials" aria-label="Initials" value="А" maxlength="4">');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте вариант, состояние и размер Avatar. Фото для примера — локальное изображение цветов.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="avatar"><div class="catalog-dimension-playground__stage" data-avatar-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-avatar-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-avatar-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Avatar">${controls}</form></div></section>`;
const cards = entry.variants.map(variant => {
const example = examples[variant], target = example.targets[0], id = 'avatar-example-' + variant;
const source = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать Avatar ${titleCase(variant)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(target.code)}</code></pre>`;
return `<article class="catalog-button-example" data-avatar-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Avatar — ${titleCase(variant)}</h3><code>${variant}</code></header><div class="catalog-button-example__stage">${target.code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${titleCase(variant)}: описание и код">${tab(id,'description','Описание',true)}${tab(id,'web','Web + Mini App',false)}</div>${panel(id,'description','<p class="rf-text rf-text--body-medium">' + escapeHtml(example.description) + '</p>',true)}${panel(id,'web',source,false)}</div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Avatar</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Неинтерактивное изображение пользователя с устойчивой заменой, когда фото недоступно.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${avatarIllustration()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Container</strong><span>Круг фиксированного размера, системные фон и цвет.</span></li><li><strong>Image · optional</strong><span>Фото заполняет контейнер с сохранением пропорций.</span></li><li><strong>Fallback</strong><span>Инициалы или компонент Icon вместо отсутствующего изображения.</span></li><li><strong>Accessible name</strong><span>Полное имя доступно скринридеру. Рядом с тем же текстовым именем аватар может быть декоративным.</span></li></ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Нужно показать пользователя в профиле или списке.','Фото может отсутствовать — нужен буквенный или иконочный fallback.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['Для фото товара используйте Thumbnail или Image.','Действие редактирования оформляйте Button, а не кликабельным Avatar.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3>${smallList(Object.values(sizeLabels))}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Loading сохраняет геометрию и сообщает загрузку через aria-busy. Error и Empty показывают fallback. Загрузкой фото и переключением состояний управляет окружающий интерфейс; Playground моделирует их. Avatar не имеет hover, pressed или focus. Статус компонента — Beta.</p></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Варианты Avatar с описанием и готовым кодом.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Avatar</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-avatar-hero inert aria-hidden="true">${avatarIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-avatar-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Avatar">${tab('avatar','anatomy','Anatomy',selected === 'anatomy')}${tab('avatar','avatar','Avatar',selected === 'avatar')}</div>${panel('avatar','anatomy',anatomy,selected === 'anatomy')}${panel('avatar','avatar',content,selected === 'avatar')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="avatar"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-avatar-output]'));
const update = () => {
const variant = form.elements.variant.value, state = form.elements.state.value, name = form.elements.name.value.trim() || 'Пользователь';
const initials = Array.from(form.elements.initials.value.trim()).slice(0,2).join('');
const display = variant === 'image' && state === 'loaded' ? 'image' : variant !== 'placeholder' && initials ? 'initials' : 'placeholder';
output.innerHTML = examples[display].targets[0].code;
const avatar = /** @type {HTMLElement} */(output.querySelector('.rf-avatar'));
avatar.className = 'rf-avatar rf-avatar--' + form.elements.size.value;
avatar.dataset.state = state;
avatar.setAttribute('aria-label', state === 'loading' ? 'Загрузка фото: ' + name : name);
avatar.setAttribute('role', state === 'loading' ? 'status' : 'img');
if (state === 'loading') avatar.setAttribute('aria-busy','true');
if (display === 'initials') avatar.firstElementChild.textContent = initials;
form.elements.initials.disabled = variant === 'placeholder';
const img = avatar.querySelector('img');
if (img) img.addEventListener('error', () => { form.elements.state.value = 'error'; form.elements.state.dispatchEvent(new Event('change',{bubbles:true})); });
};
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input',update);
form.addEventListener('change',update);
update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-avatar-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-avatar-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.avatarTheme = theme;
stage.style.colorScheme = theme;
for (const group of ['avatar','button','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark'));
themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click', () => applyTheme(stage.dataset.avatarTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-avatar-tabs]'));
const syncQuery = () => updateQuery('avatarTab',tabs.querySelector('#avatar-avatar-tab').getAttribute('aria-selected') === 'true' ? 'avatar' : '');
tabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('#avatar-anatomy-tab,#avatar-avatar-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown', event => { if (/** @type {HTMLElement} */(event.target).matches('#avatar-anatomy-tab,#avatar-avatar-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Avatar скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function badgeIllustration() {
return '<span class="rf-badge rf-badge--brand" inert aria-hidden="true">Новое</span>';
}
function renderChipEntity(item) {
const entry = item.registry, examples = model.codeExamples.components.Chip.variants;
const selected = new URLSearchParams(location.search).get('chipTab') === 'chip' ? 'chip' : 'anatomy';
const tab = (id, key, label, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id, key, body, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected:value === initial})).join('')}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const iconParameter = (name, title, glyph) => parameter(title, 'Компонент Icon · L 24 / M 16 / S 12 px', `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="Показать ${title}"><span class="rf-switch__track"></span></span></label>${iconGlyphControl(name, glyph)}`).replace('catalog-button-playground__parameter"', 'catalog-button-playground__parameter catalog-button-playground__parameter--toggle"');
const controls = parameter('Variant','Визуальный вариант Chip',dropdown('variant',entry.variants,'primary'))
+ parameter('State','Состояние компонента',dropdown('state',entry.states,'default',{disabled:'Disable'}))
+ parameter('Size','L — 40 px · M — 32 px · S — 24 px',dropdown('size',entry.sizes,'md',{lg:'L',md:'M',sm:'S'}))
+ parameter('Label','Короткое название', '<input class="rf-text-field catalog-typography-playground__text" name="label" aria-label="Label" value="Пионы" maxlength="80">')
+ iconParameter('startIcon','Start icon','checkmark')
+ iconParameter('endIcon','End icon','close');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Chip и нажмите на него в превью. Tab показывает фокус, Space и Enter выполняют действие.</p></header><div class="catalog-dimension-playground catalog-button-playground" data-playground="chip"><div class="catalog-dimension-playground__stage" data-chip-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-chip-theme-toggle aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-chip-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Chip">${controls}</form></div></section>`;
const cards = entry.variants.map(variant => {
const example = examples[variant], target = example.targets[0], id = 'chip-example-' + variant;
const source = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать Chip ${titleCase(variant)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(target.code)}</code></pre>`;
return `<article class="catalog-button-example" data-chip-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Chip — ${titleCase(variant)}</h3><code>${variant}</code></header><div class="catalog-button-example__stage">${target.code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${titleCase(variant)}: описание и код">${tab(id,'description','Описание',true)}${tab(id,'web','Web',false)}</div>${panel(id,'description','<p class="rf-text rf-text--body-medium">' + escapeHtml(example.description) + '</p>',true)}${panel(id,'web',source,false)}</div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Chip</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Компактный элемент действия или фильтра в трёх визуальных вариантах.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${examples.primary.targets[0].code}</div><ol class="catalog-button-anatomy__parts"><li><strong>Container</strong><span>Форма, цвет и отступы задаются системными токенами.</span></li><li><strong>Label</strong><span>Короткий текст называет действие или условие.</span></li><li><strong>Variant</strong><span>Primary — фирменная заливка, Secondary — нейтральный фон, Tertiary — контур. Вариант не задаёт поведение.</span></li><li><strong>Start / End icon · optional</strong><span>Публичный Icon до и после текста: L — 24 px, M — 16 px, S — 12 px. Иконки декоративны и наследуют цвет Chip.</span></li></ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Нужно включить компактный фильтр.','Нужно показать и удалить применённое условие.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['Для статуса без действия используйте Badge.','Для основного действия используйте Button.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3><p class="rf-text rf-text--body-medium">L — 40 px, M — 32 px, S — 24 px. На сенсорном устройстве невидимая область нажатия — не менее 44 px.</p></article></div><p class="catalog-callout rf-text rf-text--body-small">Stable · Web. Core задаёт внешний вид; переключением фильтров, навигацией и удалением управляет продукт. Превью демонстрирует нажатие без изменения данных. Variant меняет только оформление.</p></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Варианты Chip с описанием и кодом. Обработчики действий подключает продукт.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
Object.assign(entityPage.dataset,{dsName:entry.name,dsLevel:entry.level,dsStatus:entry.status});
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Chip</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-chip-hero inert aria-hidden="true">${examples.primary.targets[0].code}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-chip-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Chip">${tab('chip','anatomy','Anatomy',selected === 'anatomy')}${tab('chip','chip','Chip',selected === 'chip')}</div>${panel('chip','anatomy',anatomy,selected === 'anatomy')}${panel('chip','chip',content,selected === 'chip')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="chip"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-chip-output]'));
root.classList.add('rf-stack','rf-stack--gap-4');
const update = () => {
const variant = form.elements.variant.value, state = form.elements.state.value;
output.innerHTML = examples[variant].targets[0].code;
const chip = /** @type {HTMLButtonElement} */(output.querySelector('.rf-chip')), label = form.elements.label.value.trim() || 'Пионы';
const iconSize = {lg:'md',md:'sm',sm:'xs'}[form.elements.size.value];
const icon = name => /** @type {HTMLInputElement} */(form.elements[name]).checked ? `<span class="rf-icon rf-icon--${iconSize}" data-rf-chip-icon="${name}" data-rf-icon-glyph="${escapeAttribute(form.elements[name + 'Glyph'].value)}" data-rf-icon-style="${escapeAttribute(form.elements[name + 'Style'].value)}" aria-hidden="true"></span>` : '';
chip.innerHTML = icon('startIcon') + `<span class="rf-chip__label">${escapeHtml(label)}</span>` + icon('endIcon');
for (const name of ['startIcon','endIcon']) /** @type {NodeListOf<HTMLButtonElement>} */(root.querySelectorAll(`[data-icon-slot-control="${name}"] [data-rf-dropdown-trigger]`)).forEach(trigger => { trigger.disabled = !/** @type {HTMLInputElement} */(form.elements[name]).checked; });
for (const size of entry.sizes) chip.classList.toggle('rf-chip--' + size,form.elements.size.value === size);
chip.dataset.state = state;
const skeleton = state === 'skeleton';
chip.disabled = state === 'disabled' || skeleton;
if (skeleton) chip.setAttribute('aria-hidden','true');
for (const [name,value] of Object.entries({role:'status','aria-busy':'true','aria-label':'Загрузка Chip'})) {
if (skeleton) output.setAttribute(name,value); else output.removeAttribute(name);
}
chip.addEventListener('click', () => announce('Действие Chip выполнено в превью'));
if (state === 'focused') requestAnimationFrame(() => { if (chip.isConnected) chip.focus(/** @type {FocusOptions & {focusVisible?: boolean}} */({preventScroll:true,focusVisible:true})); });
};
form.addEventListener('submit',event => event.preventDefault());
form.addEventListener('input',update); form.addEventListener('change',update); update(); loadIconGlyphControls(root);
const stage = /** @type {HTMLElement} */(root.querySelector('[data-chip-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-chip-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.chipTheme = theme; stage.style.colorScheme = theme;
for (const group of ['chip','button','icon','selectionControl']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark'));
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.chipTheme === 'light' ? 'dark' : 'light')); applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-chip-tabs]'));
const syncQuery = () => updateQuery('chipTab',tabs.querySelector('#chip-chip-tab').getAttribute('aria-selected') === 'true' ? 'chip' : '');
tabs.addEventListener('click',event => { if (/** @type {HTMLElement} */(event.target).closest('#chip-anatomy-tab,#chip-chip-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown',event => { if (/** @type {HTMLElement} */(event.target).matches('#chip-anatomy-tab,#chip-chip-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click',async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Chip скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function renderBadgeEntity(item) {
const entry = item.registry, guidance = model.guidance.components.Badge, examples = model.codeExamples.components.Badge.variants;
const selected = new URLSearchParams(location.search).get('badgeTab') === 'badge' ? 'badge' : 'anatomy';
const tab = (id, key, label, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${active}" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id, key, body, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${body}</section>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected:value === initial})).join('')}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const iconParameter = (name, title, glyph) => parameter(title, 'Компонент Icon · 12 px', `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="Показать ${title}"><span class="rf-switch__track"></span></span></label>${iconGlyphControl(name, glyph)}`).replace('catalog-button-playground__parameter"', 'catalog-button-playground__parameter catalog-button-playground__parameter--toggle"');
const controls = parameter('Variant','Смысловая роль метки',dropdown('variant',entry.variants,'neutral'))
+ parameter('State','Badge не интерактивен',dropdown('state',entry.states,'default'))
+ parameter('Size','Размер метки',dropdown('size',entry.sizes,'md',{sm:'S',md:'M'}))
+ parameter('Label','Короткий текст метки','<input class="rf-text-field catalog-typography-playground__text" name="label" aria-label="Label" value="Статус" maxlength="80">')
+ iconParameter('startIcon', 'Start icon', 'checkmark')
+ iconParameter('endIcon', 'End icon', 'right-arrow');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте вариант, размер и текст Badge.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="badge"><div class="catalog-dimension-playground__stage" data-badge-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-badge-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-badge-output>${examples.neutral.targets[0].code}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Badge">${controls}</form></div></section>`;
const cards = entry.variants.map(variant => {
const example = examples[variant];
const target = example.targets[0], id = 'badge-example-' + variant;
const source = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать Badge ${titleCase(variant)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(target.code)}</code></pre>`;
return `<article class="catalog-button-example" data-badge-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Badge — ${titleCase(variant)}</h3><code>${variant}</code></header><div class="catalog-button-example__stage">${target.code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${titleCase(variant)}: описание и код">${tab(id,'description','Описание',true)}${tab(id,'web','Web',false)}</div>${panel(id,'description','<p class="rf-text rf-text--body-medium">' + escapeHtml(example.description) + '</p>',true)}${panel(id,'web',source,false)}</div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Badge</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Короткая метка сообщает статус или категорию, но не выполняет действие.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${examples.brand.targets[0].code}</div><ol class="catalog-button-anatomy__parts"><li><strong>Container</strong><span>Фон, форма и отступы задаются системными токенами.</span></li><li><strong>Label</strong><span>Обязательный текст передаёт смысл независимо от цвета.</span></li><li><strong>Start / End icon · optional</strong><span>До и после текста — компонент Icon размером XS (12 px), наследующий цвет Badge.</span></li></ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3><p class="rf-text rf-text--body-medium">S / M</p></article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">State: Default или Skeleton. Skeleton сохраняет размеры, скрывает текст и иконки и сообщает загрузку через aria-busy. Badge не получает focus и не имеет hover, pressed или disabled. Для выбора используйте Chip, для действия — Button. Динамические объявления для скринридера настраивает окружающий интерфейс.</p></section>`;
const content = '<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">' + playground + '<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Варианты Badge с описанием и готовым кодом.</p></header><div class="catalog-button-example-list">' + cards + '</div></section></section>';
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Badge</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-badge-hero inert aria-hidden="true">${badgeIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-badge-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Badge">${tab('badge','anatomy','Anatomy',selected === 'anatomy')}${tab('badge','badge','Badge',selected === 'badge')}</div>${panel('badge','anatomy',anatomy,selected === 'anatomy')}${panel('badge','badge',content,selected === 'badge')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="badge"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-badge-output] .rf-badge'));
output.removeAttribute('data-label-wrap');
const update = () => {
output.className = 'rf-badge' + (form.elements.variant.value === 'neutral' ? '' : ' rf-badge--' + form.elements.variant.value) + (form.elements.size.value === 'md' ? '' : ' rf-badge--' + form.elements.size.value);
const skeleton = form.elements.state.value === 'skeleton';
output.dataset.state = form.elements.state.value;
const icon = name => /** @type {HTMLInputElement} */(form.elements[name]).checked ? `<span class="rf-icon rf-icon--xs" data-rf-icon-glyph="${escapeAttribute(form.elements[name + 'Glyph'].value)}" data-rf-icon-style="${escapeAttribute(form.elements[name + 'Style'].value)}" aria-hidden="true"></span>` : '';
output.innerHTML = icon('startIcon') + `<span class="rf-badge__label"${skeleton ? ' aria-hidden="true"' : ''}>${escapeHtml(form.elements.label.value.trim() || 'Статус')}</span>` + icon('endIcon');
for (const [name, value] of Object.entries({role:'status', 'aria-label':'Загрузка статуса', 'aria-busy':'true'})) {
if (skeleton) output.setAttribute(name, value); else output.removeAttribute(name);
}
for (const name of ['startIcon','endIcon']) /** @type {NodeListOf<HTMLButtonElement>} */(root.querySelectorAll(`[data-icon-slot-control="${name}"] [data-rf-dropdown-trigger]`)).forEach(trigger => { trigger.disabled = !/** @type {HTMLInputElement} */(form.elements[name]).checked; });
};
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', update);
form.addEventListener('change', update);
const stage = /** @type {HTMLElement} */(root.querySelector('[data-badge-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-badge-theme-toggle]'));
loadIconGlyphControls(root);
update();
const applyTheme = theme => {
stage.dataset.badgeTheme = theme;
stage.style.colorScheme = theme;
for (const group of ['badge','button','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (!record.themeDependent) continue;
stage.style.setProperty('--rf-' + record.name.replace(/^component\./, '').replace(/([a-z])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase(), String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.', '-'), String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
themeButton.setAttribute('aria-label', theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click', () => applyTheme(stage.dataset.badgeTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-badge-tabs]'));
const syncQuery = () => updateQuery('badgeTab', tabs.querySelector('#badge-badge-tab').getAttribute('aria-selected') === 'true' ? 'badge' : '');
tabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('#badge-anatomy-tab,#badge-badge-tab')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown', event => { if (/** @type {HTMLElement} */(event.target).matches('#badge-anatomy-tab,#badge-badge-tab') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Badge скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function switchSource(checked = false, disabled = false, state = 'default', size = 'md') {
const template = document.createElement('template');
template.innerHTML = model.codeExamples.components.Switch.variants.default.targets[0].code;
const input = template.content.querySelector('input');
input.toggleAttribute('checked', checked);
input.toggleAttribute('disabled', disabled || state === 'skeleton');
const control = /** @type {HTMLElement} */(template.content.querySelector('.rf-switch'));
control.className = `rf-switch rf-switch--${size}`;
control.dataset.state = disabled ? 'disabled' : state;
if (state === 'skeleton') {
control.setAttribute('aria-busy', 'true');
control.setAttribute('role', 'status');
control.setAttribute('aria-label', 'Загрузка настройки');
input.setAttribute('aria-hidden', 'true');
}
return template.innerHTML.trim();
}
function renderSwitchEntity(item) {
const entry = item.registry;
const guidance = model.guidance.components.Switch;
const selected = new URLSearchParams(location.search).get('switchTab') === 'switch' ? 'switch' : 'anatomy';
const tab = name => `<button class="rf-tab" id="switch-tab-${name}" type="button" role="tab" aria-selected="${selected === name}" aria-controls="switch-panel-${name}" tabindex="${selected === name ? '0' : '-1'}" data-switch-tab="${name}">${name === 'anatomy' ? 'Anatomy' : 'Switch'}</button>`;
const panel = (name, body) => `<section class="rf-tab-panel" id="switch-panel-${name}" role="tabpanel" aria-labelledby="switch-tab-${name}" tabindex="0"${selected === name ? '' : ' hidden'}>${body}</section>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected: value === initial})).join('')}</span></span>`;
const controls = parameter('Value', 'Значение настройки', dropdown('value', ['off', 'on'], 'off'))
+ parameter('State', 'Состояние переключателя', dropdown('state', entry.states, 'default', {focused:'Focussed'}))
+ parameter('Size', 'Высота дорожки', dropdown('size', entry.sizes, 'md', {lg:'L · 32 px', md:'M · 24 px', sm:'S · 16 px'}));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4" aria-labelledby="switch-playground-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="switch-playground-title">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Switch или переключите его прямо в превью. Для проверки фокуса используйте Tab, для переключения — Space.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="switch"><div class="catalog-dimension-playground__stage" data-switch-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-switch-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" data-switch-theme-icon="light" aria-hidden="true"></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="clear-night-01" data-switch-theme-icon="dark" aria-hidden="true" hidden></span></button><div data-switch-output>${switchSource()}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Switch">${controls}</form></div></section>`;
const example = model.codeExamples.components.Switch.variants.default;
const examples = /** @type {[string, string, boolean, boolean, string?][]} */([['off', 'Off', false, false], ['on', 'On', true, false]]).map(([key, title, checked, disabled, state = 'default']) => {
const id = `switch-example-${key}`;
const code = switchSource(checked, disabled, state);
return `<article class="catalog-button-example" data-switch-example="${key}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Switch — ${title}</h3><code>${state !== 'default' ? state : disabled ? 'disabled' : checked ? 'checked' : 'default'}</code></header><div class="catalog-button-example__stage">${code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${title}: описание и код"><button class="rf-tab" id="${id}-description-tab" type="button" role="tab" aria-selected="true" aria-controls="${id}-description-panel" tabindex="0">Описание</button><button class="rf-tab" id="${id}-web-tab" type="button" role="tab" aria-selected="false" aria-controls="${id}-web-panel" tabindex="-1">Web</button></div><section class="rf-tab-panel" id="${id}-description-panel" role="tabpanel" aria-labelledby="${id}-description-tab" tabindex="0"><p class="rf-text rf-text--body-medium">${disabled ? 'Недоступная настройка сохраняет своё значение, не переключается и пропускается при навигации Tab. Причину недоступности объясняет интерфейс рядом.' : escapeHtml(example.description)}</p></section><section class="rf-tab-panel catalog-button-example__code-panel" id="${id}-web-panel" role="tabpanel" aria-labelledby="${id}-web-tab" tabindex="0" hidden><div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${escapeHtml(example.targets[0].file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-source" aria-label="Скопировать Switch ${title}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-source">${escapeHtml(code)}</code></pre></section></div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Switch</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Одно действие — два значения. Нативный переключатель применяет настройку сразу.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${switchSource(true)}</div><ol class="catalog-button-anatomy__parts">${[['Control','Область нажатия не меньше 44 × 44 px, независимо от размера дорожки.'],['Native input','Checkbox с role="switch" хранит checked, поддерживает disabled и клавиатуру.'],['Track','Фон показывает Off или On.'],['Thumb','Круглый ползунок с одинаковым отступом 2 px. Положение показывает Off или On.']].map(([title, body]) => `<li><strong>${escapeHtml(title)}</strong><span>${escapeHtml(body)}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid"><article class="rf-stack rf-stack--gap-2"><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article class="rf-stack rf-stack--gap-2"><h3 class="rf-text rf-text--heading-h3">Size</h3><p class="rf-text rf-text--body-medium">L · 32 px / M · 24 px / S · 16 px</p></article><article class="rf-stack rf-stack--gap-2"><h3 class="rf-text rf-text--heading-h3">States</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Stable · Web API. React и native adapters пока не реализованы. Подключайте публичные core-ui.css и core-ui.js; сохранением настройки и обработкой ошибки владеет продукт. Встроенного Label нет: передайте aria-label или aria-labelledby. Focussed соответствует data-state="focused"; настоящий фокус работает через Tab. Skeleton требует disabled и aria-busy.</p></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Switch</h1><p class="rf-text rf-text--body-large rf-text--secondary">Включает и выключает настройку одним действием.</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" data-switch-hero inert aria-hidden="true">${switchIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-switch-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Switch">${tab('anatomy')}${tab('switch')}</div>${panel('anatomy', anatomy)}${panel('switch', `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Значения и состояния Switch с описанием и готовым кодом.</p></header><div class="catalog-button-example-list">${examples}</div></section></section>`)}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="switch"]'));
const form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form'));
const input = /** @type {HTMLInputElement} */(root.querySelector('[data-switch-output] input'));
const output = /** @type {HTMLElement} */(input.closest('.rf-switch'));
const update = () => {
const state = form.elements.state.value;
const skeleton = state === 'skeleton';
input.checked = form.elements.value.value === 'on';
input.disabled = state === 'disabled' || skeleton;
output.className = `rf-switch rf-switch--${form.elements.size.value}`;
output.dataset.state = state;
for (const [name, value] of Object.entries({'aria-busy':'true', role:'status', 'aria-label':'Загрузка настройки'})) {
if (skeleton) output.setAttribute(name, value); else output.removeAttribute(name);
}
if (skeleton) input.setAttribute('aria-hidden', 'true'); else input.removeAttribute('aria-hidden');
};
form.addEventListener('submit', event => event.preventDefault());
form.addEventListener('input', update);
form.addEventListener('change', update);
input.addEventListener('change', () => {
const value = input.checked ? 'on' : 'off';
form.elements.value.value = value;
form.elements.value.dispatchEvent(new Event('input', {bubbles: true}));
});
const stage = /** @type {HTMLElement} */(root.querySelector('[data-switch-theme]'));
const themeButton = /** @type {HTMLElement} */(root.querySelector('[data-switch-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.switchTheme = theme;
stage.style.colorScheme = theme;
for (const group of ['selectionControl', 'button', 'icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (!record.themeDependent) continue;
const variable = '--rf-' + record.name.replace(/^component\./, '').replace(/([a-z])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase();
stage.style.setProperty(variable, String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.', '-'), String(record[theme].resolved));
stage.style.setProperty('--rf-text-primary', 'var(--rf-color-context-text-primary-default)');
stage.style.setProperty('--rf-text-disabled', 'var(--rf-color-context-text-primary-disabled)');
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
themeButton.setAttribute('aria-label', theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {NodeListOf<HTMLElement>} */(stage.querySelectorAll('[data-switch-theme-icon]')).forEach(icon => { icon.hidden = icon.dataset.switchThemeIcon !== theme; });
};
themeButton.addEventListener('click', () => applyTheme(stage.dataset.switchTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-switch-tabs]'));
const syncQuery = () => { const active = /** @type {HTMLElement} */(tabs.querySelector('[data-switch-tab][aria-selected="true"]'))?.dataset.switchTab; updateQuery('switchTab', active === 'switch' ? active : ''); };
tabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[data-switch-tab]')) requestAnimationFrame(syncQuery); });
tabs.addEventListener('keydown', event => { if (/** @type {HTMLElement} */(event.target).matches('[data-switch-tab]') && ['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) requestAnimationFrame(syncQuery); });
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Switch скопирован'); }
catch { announce('Не удалось скопировать. Выделите код и скопируйте вручную.'); }
}));
}
function loadIconRuntime() {
return import('./icon-glyphs.js');
}
function iconStyleControl(name, label, disabled = false) {
return `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="line" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${label}"${disabled ? ' disabled' : ''}><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${['line','solid','duotone'].map(style => dropdownItem(style, titleCase(style), {selected: style === 'line'})).join('')}</span></span>`;
}
function iconGlyphControl(name, glyph) {
return `<span class="catalog-icon-glyph-control" data-icon-slot-control="${name}"><span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}Glyph" value="${glyph}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${name === 'startIcon' ? 'Start' : 'End'} icon: Glyph" disabled><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden><label class="rf-dropdown__search"><input class="rf-dropdown__search-input" type="search" data-rf-dropdown-search placeholder="Поиск иконки" aria-label="Поиск Glyph" autocomplete="off"></label><span class="rf-sr-only" data-rf-dropdown-status aria-live="polite"></span><span data-icon-glyph-options>${dropdownItem(glyph, titleCase(glyph), {selected:true})}</span><p class="rf-dropdown__state" data-rf-dropdown-empty role="status" hidden>Иконка не найдена</p></span></span>${iconStyleControl(name + 'Style', (name === 'startIcon' ? 'Start' : 'End') + ' icon: Style', true)}</span>`;
}
function loadIconGlyphControls(root) {
const controls = [.../** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-icon-slot-control]'))];
loadIconRuntime().then(runtime => runtime.getIndex()).then(index => {
for (const control of controls) {
if (!control.isConnected) continue;
const selected = /** @type {HTMLInputElement} */(control.querySelector('[data-rf-dropdown-input]')).value;
control.querySelector('[data-icon-glyph-options]').innerHTML = index.glyphs.map(glyph => dropdownItem(glyph.key, titleCase(glyph.key), {selected: glyph.key === selected})).join('');
const glyphInput = /** @type {HTMLInputElement} */(control.querySelector(`[name="${control.dataset.iconSlotControl}Glyph"]`));
const styleInput = /** @type {HTMLInputElement} */(control.querySelector(`[name="${control.dataset.iconSlotControl}Style"]`));
const syncStyles = () => {
const glyph = index.glyphs.find(item => item.key === glyphInput.value);
const available = style => Boolean(glyph?.nodes[style]);
/** @type {NodeListOf<HTMLElement>} */(styleInput.parentElement.querySelectorAll('[data-rf-dropdown-item]')).forEach(option => option.setAttribute('aria-disabled', String(!available(option.dataset.value))));
if (!available(styleInput.value)) {
styleInput.value = index.styles.find(available) || 'line';
styleInput.dispatchEvent(new Event('change', {bubbles:true}));
}
};
control.addEventListener('input', event => { if (event.target === glyphInput) syncStyles(); }, true);
syncStyles();
control.querySelector('[data-rf-dropdown-search]').dispatchEvent(new Event('input', {bubbles:true}));
}
}).catch(() => { if (controls.some(control => control.isConnected)) announce('Не удалось загрузить список иконок. Обновите страницу.'); });
}
async function renderIconEntity(item) {
entityPage.innerHTML = '<p role="status">Загружаем Icon…</p>';
const marker = entityPage.firstElementChild;
const runtime = await loadIconRuntime();
const glyphIndex = await runtime.getIndex();
if (!entityPage.contains(marker)) return;
const namesForStyle = style => glyphIndex.glyphs.filter(glyph => Object.hasOwn(glyph.nodes, style)).map(glyph => glyph.key);
const entry = item.registry;
const sizes = {xs:'12 px', sm:'16 px', md:'24 px', lg:'32 px'};
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${escapeAttribute(initial)}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${name === 'glyph' ? '<label class="rf-dropdown__search"><input class="rf-dropdown__search-input" type="search" data-rf-dropdown-search placeholder="Поиск иконки" aria-label="Поиск Glyph" autocomplete="off"></label><span class="rf-sr-only" data-rf-dropdown-status aria-live="polite"></span>' : ''}${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected: value === initial})).join('')}${name === 'glyph' ? '<p class="rf-dropdown__state" data-rf-dropdown-empty role="status" hidden>Иконка не найдена</p>' : ''}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const glyphControl = (style, glyph) => dropdown('glyph', namesForStyle(style), glyph);
const controls = parameter('Variant', 'Смысловая роль иконки', dropdown('variant', entry.variants, 'primary'))
 + parameter('Style', 'Начертание выбранного Glyph', dropdown('style', entry.styles, 'line'))
 + parameter('State', 'Состояние компонента', dropdown('state', entry.states, 'default'))
 + parameter('Size', 'Размер иконки', dropdown('size', entry.sizes, 'md', sizes))
 + parameter('Glyph', 'Иконка из нашего локального набора', `<span class="catalog-typography-playground__dropdown" data-icon-glyph-control>${glyphControl('line', 'mail')}</span>`);
const examples = model.codeExamples.components.Icon.variants;
const cards = entry.variants.map(variant => {
  const example = examples[variant], id = `icon-example-${variant}`;
  const targets = example.targets;
  const tab = (key, label, selected = false) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-controls="${id}-${key}-panel" aria-selected="${selected}" tabindex="${selected ? 0 : -1}">${label}</button>`;
  const panel = (key, content, selected = false) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${selected ? '' : ' hidden'}>${content}</section>`;
  return `<article class="catalog-button-example" data-icon-variant-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Icon — ${titleCase(variant)}</h3><code>.rf-icon--${variant}</code></header><div class="catalog-button-example__stage">${targets[0].code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${titleCase(variant)}: описание и готовый код">${tab('description', 'Описание', true)}${targets.map(target => tab(target.adapter, escapeHtml(target.targetLabel))).join('')}</div>${panel('description', `<p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p>`, true)}${targets.map(target => panel(target.adapter, `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge">${escapeHtml(target.languageLabel)}</span><code>${escapeHtml(target.file)}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-copy-code-target="${id}-${target.adapter}-source" aria-label="Скопировать ${escapeAttribute(target.targetLabel)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code id="${id}-${target.adapter}-source">${escapeHtml(target.code)}</code></pre>`)).join('')}</div></article>`;
}).join('');
const anatomy = `<section class="rf-stack rf-stack--gap-4"><h2 class="rf-text rf-text--heading-h2">Как устроена иконка</h2><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage"><span class="rf-icon rf-icon--lg rf-icon--primary" data-rf-icon-glyph="mail" data-rf-icon-style="duotone" aria-hidden="true"></span></div><ol class="catalog-button-anatomy__parts"><li><strong>Icon</strong><span>Контейнер 12, 16, 24 или 32 px. Без кнопочной обводки и фона.</span></li><li><strong>Glyph</strong><span>Рисунок из локального набора. Масштабируется без искажения пропорций.</span></li><li><strong>Variant и Style</strong><span>Цветовая роль не зависит от начертания: Line, Solid или Duotone.</span></li></ol></div><p class="catalog-callout">Icon не запускает действие. Для действия используйте IconButton или действие внутри TextField. Декоративная иконка скрыта от скринридера; смысловой иконке передайте aria-label. Tertiary — только для декоративной графики.</p><h3 class="rf-text rf-text--heading-h3">States</h3><div class="catalog-state-grid">${entry.states.map(state => `<div class="catalog-state-cell"><span>${titleCase(state)}</span><span class="rf-icon rf-icon--md rf-icon--primary" data-rf-icon-glyph="mail" data-state="${state}" aria-hidden="true"></span></div>`).join('')}</div><h3 class="rf-text rf-text--heading-h3">Sizes</h3><div class="rf-inline rf-inline--gap-4">${Object.entries(sizes).map(([size,label]) => `<span class="rf-stack rf-stack--gap-2"><span class="rf-icon rf-icon--${size}" data-rf-icon-glyph="mail" aria-hidden="true"></span><span>${label}</span></span>`).join('')}</div></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Icon и проверьте начертание, размер и тему в превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="icon"><div class="catalog-dimension-playground__stage" data-icon-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-icon-theme-toggle aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><span class="rf-icon rf-icon--primary rf-icon--md" data-rf-icon-glyph="mail" aria-label="Превью иконки" data-icon-output></span></div><form class="catalog-typography-playground__controls">${controls}</form></div><p class="rf-text rf-text--body-small rf-text--secondary" data-icon-style-note>Line — ${glyphIndex.available.line}, Solid — ${glyphIndex.available.solid}, Duotone — ${glyphIndex.available.duotone}. Glyph показывает доступные иконки выбранного Style.</p></section><section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Варианты Icon с описанием и готовым кодом. Web и Mini App подключают публичные Core CSS и JS; React — пакет Core UI. Все используют один набор Figma.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Icon</h1><p class="rf-text rf-text--body-large rf-text--secondary">Единый компонент для иконок Contour.</p></div><div class="catalog-color-hero__media"><div class="catalog-button-hero__stage catalog-icon-hero__stage" data-icon-component-hero aria-hidden="true"></div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Icon"><button class="rf-tab" type="button" id="icon-anatomy-tab" role="tab" aria-selected="false" aria-controls="icon-anatomy-panel" tabindex="-1">Anatomy</button><button class="rf-tab" type="button" id="icon-component-tab" role="tab" aria-selected="true" aria-controls="icon-component-panel" tabindex="0">Icon</button></div><section class="rf-tab-panel" id="icon-anatomy-panel" role="tabpanel" aria-labelledby="icon-anatomy-tab" tabindex="0" hidden>${anatomy}</section><section class="rf-tab-panel" id="icon-component-panel" role="tabpanel" aria-labelledby="icon-component-tab" tabindex="0">${content}</section></div>`;
const hero = /** @type {HTMLElement} */(entityPage.querySelector('[data-icon-component-hero]'));
loadIconography().then(library => library.renderComponentHero(hero)).catch(() => announce('Не удалось загрузить обложку Icon. Обновите страницу.'));
const form = /** @type {CatalogPlaygroundForm} */(entityPage.querySelector('[data-playground="icon"] form'));
const output = /** @type {HTMLElement} */(entityPage.querySelector('[data-icon-output]'));
let previousStyle = 'line';
const update = () => {
  const values = /** @type {CatalogTextFormData} */(new FormData(form)), glyphStyle = values.get('style');
  let glyph = values.get('glyph');
  if (glyphStyle !== previousStyle) {
    const names = namesForStyle(glyphStyle);
    if (!names.includes(glyph)) { glyph = names[0]; announce(`Glyph: ${glyph}. Для выбранного стиля показаны доступные иконки.`); }
    form.querySelector('[data-icon-glyph-control]').innerHTML = glyphControl(glyphStyle, glyph);
    previousStyle = glyphStyle;
  }
  output.className = `rf-icon rf-icon--${values.get('variant')} rf-icon--${values.get('size')}`;
  output.dataset.state = values.get('state');
  output.setAttribute('aria-busy', String(values.get('state') === 'skeleton'));
  output.setAttribute('aria-label', `${glyph}, ${glyphStyle}, ${values.get('state')}`);
  void runtime.set(output, glyph, {style: glyphStyle}).then(ok => { if (!ok && output.dataset.rfIconError) announce('Не удалось показать иконку. Выберите доступный Glyph или повторите попытку.'); });
};
form.addEventListener('change', update);
const stage = /** @type {HTMLElement} */(entityPage.querySelector('[data-icon-stage]')), themeButton = /** @type {HTMLElement} */(entityPage.querySelector('[data-icon-theme-toggle]'));
const applyTheme = dark => {
  const theme = dark ? 'dark' : 'light';
  model.foundations.componentTokenTrace.icon.filter(token => token.themeDependent).forEach(token => stage.style.setProperty(`--rf-${token.name.replace('component.', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase()}`, token[theme].resolved));
  stage.style.background = model.foundations.colors.records.find(token => token.name === 'color.context.background.canvas')[theme].resolved;
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', `Тема превью: ${dark ? 'тёмная. Переключить на светлую' : 'светлая. Переключить на тёмную'}`);
  /** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = dark ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click', () => applyTheme(themeButton.getAttribute('aria-pressed') !== 'true'));
/** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-copy-code-target]')).forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(document.getElementById(button.dataset.copyCodeTarget).textContent); announce('Код Icon скопирован'); }
  catch { announce('Не удалось скопировать код. Выделите его вручную.'); }
}));

void runtime.render(entityPage);
applyTheme(false);
update();
}

function renderTabBarEntity(item) {
const entry=item.registry,isNavigation=entry.name==='NavigationBar',title=isNavigation?'Navigation Bar':'Tab Bar';
const examples=model.codeExamples.components[entry.name].variants,guidance=model.guidance.components[entry.name],primaryExample=examples[isNavigation?'top':'bottom'].targets[0].code;
const queryKey=isNavigation?'navigationBarTab':'tabBarTab';
const requested=new URLSearchParams(location.search).get(queryKey);
const selected = ['item','playground'].includes(requested) ? requested : 'anatomy';
const tab = (id,key,label,active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="${id}-${key}-panel" tabindex="${active ? 0 : -1}">${label}</button>`;
const panel = (id,key,html,active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${html}</section>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${primaryExample}</div><ol class="catalog-button-anatomy__parts">${guidance.anatomy.map(part=>`<li>${escapeHtml(part)}</li>`).join('')}</ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2 class="rf-text rf-text--heading-h3">Use when</h2>${smallList(guidance.useWhen)}</section><section class="catalog-dont"><h2 class="rf-text rf-text--heading-h3">Don’t use when</h2>${smallList(guidance.dontUseWhen)}</section></div><div class="catalog-button-contract__grid"><article><h3>Variants</h3>${smallList(entry.variants)}</article><article><h3>States</h3>${smallList(entry.states)}</article></div><p class="catalog-callout">${title} отвечает за навигацию по разделам. Используйте nav и aria-current="page"; роль tablist остаётся у Tabs для локальных панелей. Tab перемещает фокус, Enter открывает раздел. Недоступный пункт не имеет href и не входит в Tab-порядок. ${isNavigation?'На мобильном Web до 640 px включительно оболочка заменяет Navigation Bar на Tab Bar.':'Нижняя панель учитывает safe area.'} CSS API сохраняет имена rf-navigation-bar; отдельного React adapter пока нет.</p></section>`;
const hints={'Item variant':'Расположение пункта в панели','State':'Состояние взаимодействия',Value:'Выбрана ли вкладка','Show label':'Показывать подпись под иконкой',Label:'Подпись вкладки',Icon:'Рисунок и стиль иконки',Counter:'Показывать счётчик и его значение',Variant:'Расположение панели навигации',Items:'Количество пунктов в панели','Current item':'Номер текущего раздела','Preview width':'Ширина области предпросмотра','Safe area':'Отступ снизу для системной области экрана','Long labels':'Проверка длинных подписей'};
const meta=title=>`<span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hints[title]}</span></span>`;
const control = (name,label,values) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter">${meta(label)}<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${label}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map((v,i)=>dropdownItem(v,titleCase(v),{selected:!i})).join('')}</span></span></div>`;
const parameter=(title,content)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter">${meta(title)}${content}</div>`;
const toggle=(name,label,checked=false)=>`<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" name="${name}" type="checkbox" role="switch" aria-label="${label}"${checked?' checked':''}><span class="rf-switch__track"></span></span></label>`;
const number=(name,label,value,min,max)=>parameter(label,`<input class="rf-text-field catalog-typography-playground__text" type="number" name="${name}" aria-label="${label}" value="${value}" min="${min}" max="${max}">`);
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="tab-bar"><div class="catalog-dimension-playground__stage" data-tab-bar-stage><div class="rf-stack rf-stack--gap-4"><div data-tab-bar-preview></div><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-tab-bar-theme aria-label="Тёмная тема превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button></div></div><form class="catalog-typography-playground__controls" data-tab-bar-controls>${control('count','Items',['3','2','4','5','6'])}${control('current','Current item',['1','2','3','4','5','6'])}${control('width','Preview width',['mobile','wide'])}${isNavigation?'':parameter('Safe area',toggle('safeArea','Показать безопасный отступ',true))}${parameter('Long labels',toggle('longLabels','Длинные подписи'))}</form></section></section>`;
const tabItem = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Tab</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="navigation-tab"><div class="catalog-dimension-playground__stage" data-tab-item-stage><div data-tab-item-preview></div><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-tab-item-theme aria-label="Тёмная тема превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button></div><form class="catalog-typography-playground__controls" data-tab-item-controls>${control('state','State',['default','hover','pressed','focused','disabled','skeleton'])}${control('value','Value',['default','selected'])}${parameter('Label',`${isNavigation?'':toggle('showLabel','Показать подпись',true)}<input class="rf-text-field catalog-typography-playground__text" name="label" aria-label="Подпись пункта" value="Объявления">`)}${isNavigation?'':parameter('Icon',iconGlyphControl('icon','shopping-bag').replaceAll('End icon:','Icon:'))}${isNavigation?'':parameter('Counter',`${toggle('counter','Показать счётчик')}<input class="rf-text-field catalog-typography-playground__text" type="number" name="count" aria-label="Count" value="1" min="0" max="999999" disabled>`)}</form></section></section>`;

const exampleRows = entry.variants.map(variant=>{const example=examples[variant],target=example.targets[0],id=`tab-bar-example-${variant}`;return `<article class="catalog-button-example"><header class="catalog-button-example__header"><h3>${titleCase(variant)}</h3></header><div class="catalog-button-example__stage" inert>${target.code}</div><div class="rf-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример ${variant}">${tab(id,'description','Описание',true)}${tab(id,'web',isNavigation?'Web':'Web + Mini App',false)}</div>${panel(id,'description',`<p>${escapeHtml(example.description)}</p>`,true)}${panel(id,'web',`<div class="catalog-button-example__code-toolbar"><code>${escapeHtml(target.file)}</code><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-tab-bar-copy="${variant}" aria-label="Скопировать ${variant}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(target.code)}</code></pre>`,false)}</div></article>`;}).join('');
entityPage.dataset.dsName=entry.name; entityPage.dataset.dsLevel=entry.level; entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">${title}</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" inert aria-hidden="true">${primaryExample}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-tab-bar-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы ${title}">${tab('tab-bar','anatomy','Anatomy',selected==='anatomy')}${tab('tab-bar','item','Tab',selected==='item')}${tab('tab-bar','playground',title,selected==='playground')}</div>${panel('tab-bar','anatomy',anatomy,selected==='anatomy')}${panel('tab-bar','item',tabItem,selected==='item')}${panel('tab-bar','playground',`<div class="rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><h2>Examples</h2>${exampleRows}</section></div>`,selected==='playground')}</div>`;
const root=entityPage,form=/** @type {HTMLFormElement} */(root.querySelector('[data-tab-bar-controls]')),output=/** @type {HTMLElement} */(root.querySelector('[data-tab-bar-preview]'));
let current=0;
const prepareItem=(link,label,glyph,glyphStyle='solid',showLabel=true,showIcon=true,count=null)=>{
link.innerHTML=`${showIcon?`<span class="rf-navigation-bar__icon"><span class="rf-icon rf-icon--md" data-rf-icon-glyph="${escapeAttribute(glyph)}" data-rf-icon-style="${escapeAttribute(glyphStyle)}" aria-hidden="true"></span>${count!==null?`<span class="rf-navigation-bar__counter" aria-hidden="true">${counterMarkup(count)}</span>`:''}</span>`:''}<span class="${showLabel?'rf-navigation-bar__label':'rf-sr-only'}">${escapeHtml(label)}</span>${count!==null?`<span class="rf-sr-only">, уведомлений: ${count}</span>`:''}${!showIcon&&count!==null?`<span aria-hidden="true">${counterMarkup(count)}</span>`:''}`;
link.title=label;
};
const update=()=>{
const data=new FormData(form),count=Number(data.get('count'));current=Math.min(current,count-1);
output.dataset.width=String(data.get('width'));output.dataset.safeArea=String(data.has('safeArea'));
output.innerHTML=primaryExample;
const nav=output.querySelector('nav'),sample=nav.firstElementChild;nav.replaceChildren();
const labels=['Объявления','Отклики','Профиль','Избранное','Сообщения','Настройки'],glyphs=['shopping-bag','mail','user-cr-fr'];
for(let i=0;i<count;i++){const link=/** @type {HTMLElement} */(sample.cloneNode(true));link.setAttribute('href','#section-'+i);prepareItem(link,data.has('longLabels')?labels[i]+' и дополнительные возможности':labels[i],glyphs[i%3],'solid',true,!isNavigation);link.removeAttribute('aria-current');nav.append(link);}
const links=nav.querySelectorAll('.rf-navigation-bar__item');
links[current].setAttribute('aria-current','page');
const currentInput=/** @type {HTMLInputElement} */(form.querySelector('[name="current"]'));currentInput.value=String(current+1);currentInput.parentElement.querySelector('[data-rf-dropdown-value]').textContent=String(current+1);
form.querySelectorAll('[name="current"] ~ [data-rf-dropdown-panel] [data-rf-dropdown-item]').forEach(option=>option.setAttribute('aria-disabled',String(Number(/** @type {HTMLElement} */(option).dataset.value)>count)));
};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('change',event=>{if(/** @type {HTMLInputElement} */(event.target).name==='current')current=Number(/** @type {HTMLInputElement} */(event.target).value)-1;update();});update();
output.addEventListener('click',event=>{const link=/** @type {HTMLElement} */(event.target).closest('.rf-navigation-bar__item');if(!link)return;event.preventDefault();if(link.getAttribute('aria-disabled')==='true')return;current=Array.from(output.querySelectorAll('.rf-navigation-bar__item')).indexOf(link);output.querySelectorAll('.rf-navigation-bar__item').forEach(el=>el.removeAttribute('aria-current'));link.setAttribute('aria-current','page');const input=/** @type {HTMLInputElement} */(form.querySelector('[name="current"]'));input.value=String(current+1);input.parentElement.querySelector('[data-rf-dropdown-value]').textContent=String(current+1);});
const itemForm=/** @type {HTMLFormElement} */(root.querySelector('[data-tab-item-controls]')),itemOutput=/** @type {HTMLElement} */(root.querySelector('[data-tab-item-preview]'));
const updateItem=()=>{const data=new FormData(itemForm);itemOutput.innerHTML=primaryExample;const links=itemOutput.querySelectorAll('.rf-navigation-bar__item');links.forEach((el,i)=>{if(i)el.remove();});const link=/** @type {HTMLElement} */(links[0]);link.removeAttribute('aria-current');
const countInput=/** @type {HTMLInputElement} */(itemForm.querySelector('[name="count"]'));if(countInput)countInput.disabled=!data.has('counter');
const count=Math.max(0,Math.min(999999,Math.floor(Number(countInput?.value)||0)));
prepareItem(link,String(data.get('label')||'Объявления'),String(data.get('iconGlyph')),String(data.get('iconStyle')),isNavigation||data.has('showLabel'),!isNavigation,data.has('counter')?count:null);
if(data.get('value')==='selected')link.setAttribute('aria-current','page');link.dataset.state=String(data.get('state'));
if(data.get('state')==='disabled'){link.setAttribute('aria-disabled','true');link.removeAttribute('href');link.setAttribute('tabindex','-1');}
if(data.get('state')==='skeleton'){link.removeAttribute('href');link.removeAttribute('aria-current');link.setAttribute('tabindex','-1');link.setAttribute('aria-hidden','true');}
itemForm.querySelectorAll('[data-icon-slot-control] [data-rf-dropdown-trigger]').forEach(trigger=>{/** @type {HTMLButtonElement} */(trigger).disabled=false;});
};
itemForm.addEventListener('submit',event=>event.preventDefault());itemForm.addEventListener('input',updateItem);itemForm.addEventListener('change',updateItem);updateItem();loadIconGlyphControls(itemForm);itemOutput.addEventListener('click',event=>event.preventDefault());
const themePreview=(stageSelector,buttonSelector)=>{const stage=/** @type {HTMLElement} */(root.querySelector(stageSelector)),themeButton=/** @type {HTMLButtonElement} */(root.querySelector(buttonSelector));
const applyTheme=theme=>{for(const record of model.foundations.componentTokenTrace.counter||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[theme].resolved));for(const [alias,role] of Object.entries({background:'background.canvas','active-background':'background.brand.subtle','container-background':'background.primary.default',divider:'border.secondary.default','selected-background':'background.brand.default','selected-text':'text.inverse.default',text:'text.secondary.default','text-active':'text.brand.default'}))stage.style.setProperty('--rf-navigation-'+alias,`var(--rf-color-context-${role.replaceAll('.','-')})`);stage.style.setProperty('--rf-text-disabled','var(--rf-color-context-text-primary-disabled)');stage.style.background='var(--rf-color-context-background-canvas)';stage.style.colorScheme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));stage.dataset.previewTheme=theme;themeButton.setAttribute('aria-label',theme==='dark'?'Светлая тема превью':'Тёмная тема превью');/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph=theme==='dark'?'clear-night-01':'sunny';};applyTheme('light');themeButton.addEventListener('click',()=>applyTheme(stage.dataset.previewTheme==='dark'?'light':'dark'));};
themePreview('[data-tab-bar-stage]','[data-tab-bar-theme]');themePreview('[data-tab-item-stage]','[data-tab-item-theme]');
root.querySelectorAll('[data-tab-bar-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(examples[/** @type {HTMLElement} */(button).dataset.tabBarCopy].targets[0].code);announce('Код Tab Bar скопирован');}catch{announce('Не удалось скопировать код');}}));
const tabs=root.querySelector('[data-tab-bar-tabs]');const sync=event=>{if(!/** @type {HTMLElement} */(event.target).closest('#tab-bar-anatomy-tab, #tab-bar-item-tab, #tab-bar-playground-tab'))return;window.requestAnimationFrame(()=>updateQuery(queryKey,tabs.querySelector('#tab-bar-item-tab').getAttribute('aria-selected')==='true'?'item':tabs.querySelector('#tab-bar-playground-tab').getAttribute('aria-selected')==='true'?'playground':''));};tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
}

function renderBreadcrumbsEntity(item) {
const entry = item.registry;
const selected = new URLSearchParams(location.search).get('breadcrumbsTab') === 'breadcrumbs' ? 'breadcrumbs' : 'anatomy';
const tab = (id,key,title,active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="${id}-${key}-panel" tabindex="${active ? 0 : -1}">${title}</button>`;
const panel = (id,key,content,active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${content}</section>`;
const dropdown = (name,values,labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map((value,index) => dropdownItem(value,labels[value] || titleCase(value),{selected:!index})).join('')}</span></span>`;
const parameter = (title,hint,control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const toggle = (name,title,checked = false) => `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="${title}"${checked ? ' checked' : ''}><span class="rf-switch__track"></span></span></label>`;
const exampleCode = `<nav class="rf-breadcrumbs" aria-label="Хлебные крошки">\n  <ol class="rf-breadcrumbs__list">\n    <li class="rf-breadcrumbs__item">\n      <a class="rf-breadcrumbs__link" href="/">Главная</a>\n    </li>\n    <li class="rf-breadcrumbs__item">\n      <span class="rf-breadcrumbs__separator" aria-hidden="true">\n        <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right"></span>\n      </span>\n      <span class="rf-breadcrumbs__current" aria-current="page">Breadcrumbs</span>\n    </li>\n  </ol>\n</nav>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Breadcrumbs</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Цепочка показывает положение текущей страницы и даёт прямые ссылки только на родительские уровни.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${breadcrumbsMarkup({labels:['Главная','Компоненты','Навигация','Breadcrumbs'],icon:true})}</div><ol class="catalog-button-anatomy__parts">${[['Navigation landmark','nav получает короткое доступное имя.'],['Ordered list','Порядок уровней важен и выражен семантически.'],['Ancestor link','Родительские страницы остаются нативными ссылками.'],['Separator','Системная Icon декоративна и скрыта от скринридера.'],['Current page','Не является ссылкой, выделена начертанием и получает aria-current=page.']].map(([title,text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Страница находится минимум на втором уровне и пользователю важно понимать её место в иерархии.','Нужно быстро вернуться к одному из родительских разделов без последовательных Back-переходов.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['На верхнем уровне цепочка не добавляет информации.','Для основных разделов продукта используйте TabBar.','Если путь длиннее пяти уровней, упростите архитектуру или явно сократите середину пути.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3>${smallList(entry.sizes)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Beta · Web. Рекомендуем не больше пяти видимых уровней. Сокращение «…» в первом API — информативный элемент; если нужно раскрывающее меню, оно отдельно композируется с Dropdown.</p></section>`;
const controls = parameter('Variant','Default или менее заметный Supporting',dropdown('variant',entry.variants,{default:'Default',supporting:'Supporting'})) + parameter('Size','M — основной, S — компактный',dropdown('size',['md','sm'],{md:'M',sm:'S'})) + parameter('Separator','Системный Chevron или текстовый знак',dropdown('separator',['chevron','slash','dot'],{chevron:'Chevron',slash:'Slash',dot:'Dot'})) + parameter('Levels','От 2 до 5 уровней',dropdown('levels',['3','2','4','5'],{'2':'2','3':'3','4':'4','5':'5'})) + parameter('Start icon','Home перед первым уровнем',toggle('icon','Показывать Home icon',true)) + parameter('Collapse','Сократить середину длинного пути',toggle('collapse','Сократить средний уровень'));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте вид цепочки и проверьте ссылки с клавиатуры. Текущая страница остаётся обычным текстом.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="breadcrumbs"><div class="catalog-dimension-playground__stage" data-breadcrumbs-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-breadcrumbs-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-breadcrumbs-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Breadcrumbs">${controls}</form></div></section>`;
const example = (id,title,description,markup,code = exampleCode) => `<article class="catalog-button-example"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">${title}</h3></header><div class="catalog-button-example__stage">${markup}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример ${title}">${tab(id,'description','Описание',true)}${tab(id,'web','Web',false)}</div>${panel(id,'description',`<p class="rf-text rf-text--body-medium">${description}</p>`,true)}${panel(id,'web',`<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>components/navigation.css</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-breadcrumbs-copy aria-label="Скопировать Breadcrumbs"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(code)}</code></pre>`,false)}</div></article>`;
const examples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Базовая, supporting и явно сокращённая цепочки.</p></header><div class="catalog-button-example-list">${example('breadcrumbs-default','Breadcrumbs — Default','Основная цепочка над заголовком вложенной страницы.',breadcrumbsMarkup({labels:['Главная','Компоненты','Breadcrumbs'],icon:true}))}${example('breadcrumbs-supporting','Breadcrumbs — Supporting','Менее заметный вариант для плотной служебной поверхности.',breadcrumbsMarkup({labels:['Админка','Пользователи','Анна'],variant:'supporting',size:'sm'}))}${example('breadcrumbs-collapsed','Breadcrumbs — Collapsed','Середина длинного пути сокращена без скрытого поведения.',breadcrumbsMarkup({labels:['Главная','…','Каталог','Цветы','Пионы'],collapsedAt:1,icon:true}))}</div></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${examples}</section>`;
entityPage.dataset.dsName = entry.name; entityPage.dataset.dsLevel = entry.level; entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Breadcrumbs</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage">${breadcrumbsMarkup({labels:['Главная','Breadcrumbs'],icon:true})}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-breadcrumbs-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Breadcrumbs">${tab('breadcrumbs','anatomy','Anatomy',selected === 'anatomy')}${tab('breadcrumbs','breadcrumbs','Breadcrumbs',selected === 'breadcrumbs')}</div>${panel('breadcrumbs','anatomy',anatomy,selected === 'anatomy')}${panel('breadcrumbs','breadcrumbs',content,selected === 'breadcrumbs')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="breadcrumbs"]'));
const form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-breadcrumbs-output]'));
const update = () => {
const data = /** @type {CatalogTextFormData} */(new FormData(form)), count = Number(data.get('levels'));
const source = ['Главная','Каталог','Цветы','Букеты','Пионы'];
const labels = count === 2 ? [source[0],source[4]] : count === 3 ? [source[0],source[2],source[4]] : count === 4 ? [source[0],source[1],source[2],source[4]] : source;
output.innerHTML = breadcrumbsMarkup({labels,variant:data.get('variant'),size:data.get('size'),separator:data.get('separator'),icon:data.has('icon'),collapsedAt:data.has('collapse') && labels.length > 3 ? 1 : -1});
};
form.addEventListener('input',update); form.addEventListener('change',update); update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-breadcrumbs-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-breadcrumbs-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.breadcrumbsTheme = theme; stage.style.colorScheme = theme;
for (const group of ['breadcrumbs','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark')); themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную'); /** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.breadcrumbsTheme === 'light' ? 'dark' : 'light')); applyTheme('light');
const sectionTabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-breadcrumbs-tabs] > .rf-tab-list'));
const syncSection = () => requestAnimationFrame(() => { const button = /** @type {HTMLElement} */(sectionTabs.querySelector('[aria-selected="true"]')); if (!button) return; const url = new URL(location.href); url.searchParams.set('breadcrumbsTab',button.id === 'breadcrumbs-anatomy-tab' ? 'anatomy' : 'breadcrumbs'); history.replaceState(null,'',url); });
sectionTabs.addEventListener('click',syncSection); sectionTabs.addEventListener('keydown',syncSection);
/** @type {NodeListOf<HTMLElement>} */(entityPage.querySelectorAll('[data-breadcrumbs-copy]')).forEach(button => button.addEventListener('click',async () => { try { await navigator.clipboard.writeText(exampleCode); announce('Код Breadcrumbs скопирован'); } catch { announce('Не удалось скопировать код. Выделите его вручную.'); } }));
}

function imageFrameMarkup(options = {}) {
const state = options.state || 'loaded';
const variant = options.variant === 'contain' ? ' rf-image--contain' : '';
const ratio = options.ratio === 'square' ? 'square' : options.ratio === 'landscape' ? 'landscape' : 'portrait';
const compact = options.compact ? ' rf-image-frame--compact' : '';
const alt = state === 'loaded' ? escapeAttribute(options.alt || 'Букет с подсолнухом') : '';
const fallbackLabel = state === 'empty' ? 'Изображение отсутствует' : 'Фото не загрузилось';
return `<span class="rf-aspect-ratio rf-aspect-ratio--${ratio} rf-image-frame${compact} catalog-thumbnail-preview" data-state="${escapeAttribute(state)}"${state === 'loading' ? ' aria-busy="true"' : ''}><img class="rf-image${variant}" src="assets/listing-card-figma-bouquet.png" alt="${alt}"><span class="rf-skeleton rf-skeleton--fill" aria-hidden="true"></span><span class="rf-media-fallback" role="img" aria-label="${fallbackLabel}"><span class="rf-media-fallback__icon" aria-hidden="true"><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="image-off"></span></span><span class="rf-media-fallback__label">${fallbackLabel}</span></span></span>`;
}

function renderImageEntity(item) {
const entry = item.registry;
const selected = new URLSearchParams(location.search).get('imageTab') === 'image' ? 'image' : 'anatomy';
const tab = (key,title,active) => `<button class="rf-tab" id="image-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="image-${key}-panel" tabindex="${active ? 0 : -1}">${title}</button>`;
const panel = (key,content,active) => `<section class="rf-tab-panel" id="image-${key}-panel" role="tabpanel" aria-labelledby="image-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${content}</section>`;
const dropdown = (name,values,labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map((value,index) => dropdownItem(value,labels[value] || titleCase(value),{selected:!index})).join('')}</span></span>`;
const parameter = (title,hint,control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const toggle = (name,title) => `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="${title}"><span class="rf-switch__track"></span></span></label>`;
const exampleCode = `<span class="rf-aspect-ratio rf-aspect-ratio--portrait rf-image-frame" data-state="loaded">\n  <img class="rf-image" src="data:image/jpeg;base64,…" alt="Букет пионов">\n  <span class="rf-skeleton rf-skeleton--fill" aria-hidden="true"></span>\n  <span class="rf-media-fallback" role="img" aria-label="Фото не загрузилось">…</span>\n</span>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Image</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Один media-slot сохраняет геометрию и показывает только presentation текущего состояния.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${imageFrameMarkup({state:'loaded'})}</div><ol class="catalog-button-anatomy__parts">${[['Frame','Заранее резервирует aspect ratio и владеет состоянием.'],['Image','Нативное img с обязательным alt для содержательной фотографии.'],['Skeleton','Заполняет тот же slot только во время loading.'],['Fallback','Внутренняя error/empty presentation с системной Icon.'],['Accessible label','Локализованное объяснение остаётся доступным и в compact.']].map(([title,text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Нужно показать содержательное или декоративное изображение в стабильном slot.','Загрузка, ошибка и отсутствие изображения должны выглядеть одинаково во всех продуктах.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['Для UI-пиктограммы используйте Icon.','Если media-slot не нужен по смыслу, не показывайте декоративную заглушку.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Beta · Web и Telegram Mini App. MediaFallback остаётся внутренней совместимой частью и не используется как самостоятельный новый API.</p></section>`;
const controls = parameter('State','Default, loading, error или empty',dropdown('state',['loaded','loading','error','empty'],{loaded:'Default'})) + parameter('Variant','Cover заполняет slot, Contain показывает файл полностью',dropdown('variant',['cover','contain'])) + parameter('Ratio','Геометрия резервируется до загрузки',dropdown('ratio',['portrait','square','landscape'])) + parameter('Compact','Скрыть видимую подпись fallback',toggle('compact','Компактный fallback')) + parameter('Alt','Описание содержательного изображения','<input class="rf-text-field catalog-typography-playground__text" type="text" name="alt" value="Букет с подсолнухом" aria-label="Alt">');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Переключите состояние, масштабирование и геометрию без изменения размера media-slot.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="image"><div class="catalog-dimension-playground__stage" data-image-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-image-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-image-output>${imageFrameMarkup({state:'loaded'})}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Image">${controls}</form></div></section>`;
const example = (title,description,markup) => `<article class="catalog-button-example"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">${title}</h3></header><div class="catalog-button-example__stage">${markup}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример ${title}">${tab(titleCase(title).replaceAll(' ', '-').toLowerCase() + '-description','Описание',true)}${tab(titleCase(title).replaceAll(' ', '-').toLowerCase() + '-web','Web',false)}</div>${panel(titleCase(title).replaceAll(' ', '-').toLowerCase() + '-description',`<p class="rf-text rf-text--body-medium">${description}</p>`,true)}${panel(titleCase(title).replaceAll(' ', '-').toLowerCase() + '-web',`<pre class="catalog-button-example__code"><code>${escapeHtml(exampleCode)}</code></pre>`,false)}</div></article>`;
const examples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Содержательное изображение и устойчивое состояние ошибки.</p></header><div class="catalog-button-example-list">${example('Image — Default','Cover внутри portrait slot.',imageFrameMarkup({state:'loaded'}))}${example('Image — Error','Внутренний fallback сохраняет ту же геометрию.',imageFrameMarkup({state:'error'}))}</div></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${examples}</section>`;
entityPage.dataset.dsName = entry.name; entityPage.dataset.dsLevel = entry.level; entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Image</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage">${imageFrameMarkup({state:'loaded',ratio:'landscape'})}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-image-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Image">${tab('anatomy','Anatomy',selected === 'anatomy')}${tab('image','Image',selected === 'image')}</div>${panel('anatomy',anatomy,selected === 'anatomy')}${panel('image',content,selected === 'image')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="image"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-image-output]'));
const update = () => { const data = /** @type {CatalogTextFormData} */(new FormData(form)); output.innerHTML = imageFrameMarkup({state:data.get('state'),variant:data.get('variant'),ratio:data.get('ratio'),compact:data.has('compact'),alt:data.get('alt')}); };
form.addEventListener('input',update); form.addEventListener('change',update);
const stage = /** @type {HTMLElement} */(root.querySelector('[data-image-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-image-theme-toggle]'));
const applyTheme = theme => { stage.dataset.imageTheme = theme; stage.style.colorScheme = theme; for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved)); stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved; themeButton.setAttribute('aria-pressed',String(theme === 'dark')); themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную'); /** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny'; };
themeButton.addEventListener('click',() => applyTheme(stage.dataset.imageTheme === 'light' ? 'dark' : 'light')); applyTheme('light');
const sectionTabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-image-tabs] > .rf-tab-list'));
const syncSection = () => requestAnimationFrame(() => { const button = /** @type {HTMLElement} */(sectionTabs.querySelector('[aria-selected="true"]')); if (!button) return; const url = new URL(location.href); url.searchParams.set('imageTab',button.id === 'image-anatomy-tab' ? 'anatomy' : 'image'); history.replaceState(null,'',url); });
sectionTabs.addEventListener('click',syncSection); sectionTabs.addEventListener('keydown',syncSection);
}

function renderSliderEntity(item) {
const entry = item.registry;
const selected = new URLSearchParams(location.search).get('sliderTab') === 'slider' ? 'slider' : 'anatomy';
const tab = (key,title,active) => `<button class="rf-tab" id="slider-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="slider-${key}-panel" tabindex="${active ? 0 : -1}">${title}</button>`;
const panel = (key,content,active) => `<section class="rf-tab-panel" id="slider-${key}-panel" role="tabpanel" aria-labelledby="slider-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${content}</section>`;
const parameter = (title,hint,control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const number = (name,value,attributes = '') => `<input class="rf-text-field catalog-typography-playground__text" type="number" name="${name}" value="${value}" ${attributes} aria-label="${titleCase(name)}">`;
const toggle = (name,title,checked = false) => `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="${title}"${checked ? ' checked' : ''}><span class="rf-switch__track"></span></span></label>`;
const exampleMarkup = sliderField('slider-example', 'Количество цветов', {min: 1, max: 100, step: 1, value: 24, output: true, limits: true, hint: 'Выберите приблизительное количество'});
const exampleCode = `<div class="rf-text-field-group rf-slider-field" data-rf-slider>\n  <label class="rf-text-field__label" for="quantity">Количество цветов</label>\n  <input class="rf-slider" id="quantity" type="range" min="1" max="100" value="24">\n</div>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Slider</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Нативный range control с системным треком, ползунком и опциональным текущим значением.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${sliderField('slider-anatomy', 'Количество цветов', {min: 0, max: 100, value: 50, output: true, limits: true})}</div><ol class="catalog-button-anatomy__parts">${[['Label','Обязательное видимое или доступное имя.'],['Current value','Опциональный output, синхронизированный Core.'],['Track','Показывает заполненную и оставшуюся часть диапазона.'],['Thumb','Перемещается мышью, касанием и клавиатурой.'],['Limits','Опциональные подписи min и max.']].map(([title,text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Нужно быстро выбрать приблизительное число в заданных границах.','Пользователь понимает значение по положению ползунка или output.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['Для точного числового ввода используйте Number TextField.','Не скрывайте границы, если диапазон нельзя понять из контекста.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Beta · Web. Каноническое имя и весь публичный контракт компонента — Slider: <code>component.slider.*</code>, <code>.rf-slider*</code> и <code>data-rf-slider*</code>.</p></section>`;
const controls = parameter('Min','Нижняя граница',number('min',0)) + parameter('Max','Верхняя граница',number('max',100)) + parameter('Step','Шаг изменения',number('step',1,'min="0.01" step="0.01"')) + parameter('Value','Текущее значение',number('value',50)) + parameter('Current value','Показывать значение рядом с Label',toggle('showValue','Показывать текущее значение',true)) + parameter('Disabled','Изменение недоступно',toggle('disabled','Отключить Slider'));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте границы, шаг и значение или переместите ползунок прямо в превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="slider"><div class="catalog-dimension-playground__stage" data-slider-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-slider-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button>${sliderField('playground-slider', 'Количество цветов', {value: 50, hint: 'Выберите приблизительное количество', limits: true, output: true, outputRoot: true})}</div><form class="catalog-typography-playground__controls" aria-label="Параметры Slider">${controls}</form></div></section>`;
const code = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>components/forms.css</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-slider-copy aria-label="Скопировать Slider"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(exampleCode)}</code></pre>`;
const example = `<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2></header><article class="catalog-button-example"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Slider — With value</h3><code>withValue</code></header><div class="catalog-button-example__stage">${exampleMarkup}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример Slider">${tab('example-description','Описание',true)}${tab('example-web','Web',false)}</div>${panel('example-description','<p class="rf-text rf-text--body-medium">Приблизительный выбор с видимым значением.</p>',true)}${panel('example-web',code,false)}</div></article></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${example}</section>`;
entityPage.dataset.dsName = entry.name; entityPage.dataset.dsLevel = entry.level; entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Slider</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage">${sliderField('slider-hero', 'Значение', {value: 64})}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-slider-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Slider">${tab('anatomy','Anatomy',selected === 'anatomy')}${tab('slider','Slider',selected === 'slider')}</div>${panel('anatomy',anatomy,selected === 'anatomy')}${panel('slider',content,selected === 'slider')}</div>`;
wirePlayground(entry);
const sliderStage = /** @type {HTMLElement} */(entityPage.querySelector('[data-slider-theme]'));
const sliderThemeButton = /** @type {HTMLElement} */(entityPage.querySelector('[data-slider-theme-toggle]'));
const applySliderTheme = theme => {
sliderStage.dataset.sliderTheme = theme;
sliderStage.style.colorScheme = theme;
for (const group of ['slider','textField','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (!record.themeDependent) continue;
const variable = '--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase();
sliderStage.style.setProperty(variable,String(record[theme].resolved));
}
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) sliderStage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
sliderStage.style.setProperty('--rf-text-primary','var(--rf-color-context-text-primary-default)');
sliderStage.style.setProperty('--rf-text-secondary','var(--rf-color-context-text-secondary-default)');
sliderStage.style.setProperty('--rf-text-disabled','var(--rf-color-context-text-primary-disabled)');
sliderStage.style.setProperty('--rf-icon-secondary','var(--rf-color-context-icon-secondary-default)');
sliderStage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
sliderThemeButton.setAttribute('aria-pressed',String(theme === 'dark'));
sliderThemeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(sliderThemeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
sliderThemeButton.addEventListener('click',() => applySliderTheme(sliderStage.dataset.sliderTheme === 'light' ? 'dark' : 'light'));
applySliderTheme('light');
const sectionTabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-slider-tabs] > .rf-tab-list'));
const syncSection = () => requestAnimationFrame(() => { const button = /** @type {HTMLElement} */(sectionTabs.querySelector('[aria-selected="true"]')); if (!button) return; const url = new URL(location.href); url.searchParams.set('sliderTab',button.id === 'slider-anatomy-tab' ? 'anatomy' : 'slider'); history.replaceState(null,'',url); });
sectionTabs.addEventListener('click',syncSection); sectionTabs.addEventListener('keydown',syncSection);
/** @type {HTMLElement} */(entityPage.querySelector('[data-slider-copy]')).addEventListener('click',async () => { try { await navigator.clipboard.writeText(exampleCode); announce('Код Slider скопирован'); } catch { announce('Не удалось скопировать код. Выделите его вручную.'); } });
}
function renderCounterEntity(item) {
const entry = item.registry, examples = model.codeExamples.components.Counter.variants;
const selected = new URLSearchParams(location.search).get('counterTab') === 'counter' ? 'counter' : 'anatomy';
const tab = (id,key,title,active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="${id}-${key}-panel" tabindex="${active ? 0 : -1}">${title}</button>`;
const panel = (id,key,content,active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${content}</section>`;
const dropdown = (name,values) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map((value,index) => dropdownItem(value,titleCase(value),{selected:!index})).join('')}</span></span>`;
const parameter = (title,hint,control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const number = (name,value,min) => `<input class="rf-text-field catalog-typography-playground__text" type="number" name="${name}" value="${value}" min="${min}" max="999999999" step="1" aria-label="${titleCase(name)}">`;
const controls = parameter('Variant','Цветовая роль',dropdown('variant',entry.variants)) + parameter('State','Counter не интерактивен',dropdown('state',entry.states)) + parameter('Value','Количество, включая 0',number('value',3,0)) + parameter('Max','Предел отображения: 99 → 99+',number('max',99,1));
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте число, предел отображения и оформление. Counter сообщает количество и не выполняет действие.</p></header><div class="catalog-dimension-playground catalog-button-playground" data-playground="counter"><div class="catalog-dimension-playground__stage" data-counter-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-counter-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-counter-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Counter">${controls}</form></div></section>`;
const cards = entry.variants.map(variant => {
const example = examples[variant], target = example.targets[0], id = 'counter-example-' + variant;
const code = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${target.file}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-counter-copy="${variant}" aria-label="Скопировать Counter ${titleCase(variant)}"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(target.code)}</code></pre>`;
return `<article class="catalog-button-example" data-counter-example="${variant}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Counter — ${titleCase(variant)}</h3><code>${variant}</code></header><div class="catalog-button-example__stage">${target.code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример Counter ${titleCase(variant)}">${tab(id,'description','Описание',true)}${tab(id,'web','Web',false)}</div>${panel(id,'description',`<p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p>`,true)}${panel(id,'web',code,false)}</div></article>`;
}).join('');
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Counter</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Числовая метка количества. Одна цифра помещается в круг, длинное число расширяет контейнер. Высота — 20 px.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" aria-hidden="true">${counterMarkup(12)}</div><ol class="catalog-button-anatomy__parts">${[['Контейнер','Неинтерактивный span с фоном и скруглением.'],['Value','Неотрицательное целое число; ноль отображается явно.'],['Max','Выше предела показывается число с плюсом. Точное значение остаётся доступным скринридеру.']].map(([title,text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(['Показать количество рядом с подписью или внутри другого компонента.','Компактно обозначить число результатов или уведомлений.'])}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(['Для текстового статуса используйте Badge.','Counter не заменяет кнопки увеличения и уменьшения количества.'])}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">Variant</h3>${smallList(entry.variants)}</article><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article></div><p class="catalog-callout rf-text rf-text--body-small">Beta · Web. Value и Max в Playground демонстрируют форматирование потребителя, а не скрытый JavaScript API. Skeleton сохраняет геометрию и скрывает число; загрузку сообщает внешний контейнер. Контекст и локализованные пояснения принадлежат продукту. Встроенный счётчик Segmented Control пока не заменён.</p></section>`;
const content = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Варианты числовой метки с описанием и готовым кодом.</p></header><div class="catalog-button-example-list">${cards}</div></section></section>`;
entityPage.dataset.dsName = entry.name; entityPage.dataset.dsLevel = entry.level; entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Counter</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p><div>${statusBadge(entry.status)}</div></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" aria-hidden="true">${counterMarkup()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-counter-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Counter">${tab('counter','anatomy','Anatomy',selected === 'anatomy')}${tab('counter','counter','Counter',selected === 'counter')}</div>${panel('counter','anatomy',anatomy,selected === 'anatomy')}${panel('counter','counter',content,selected === 'counter')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="counter"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-counter-output]'));
const integer = (input,min) => Math.min(999999999,Math.max(min,Math.floor(Number(input.value) || 0)));
const update = () => {
const skeleton = form.elements.state.value === 'skeleton';
output.innerHTML = counterMarkup(integer(form.elements.value,0),form.elements.variant.value,integer(form.elements.max,1),skeleton);
if (skeleton) { output.setAttribute('role','status'); output.setAttribute('aria-busy','true'); output.setAttribute('aria-label','Загрузка количества'); }
else for (const attribute of ['role','aria-busy','aria-label']) output.removeAttribute(attribute);
};
form.addEventListener('submit',event => event.preventDefault()); form.addEventListener('input',update); form.addEventListener('change',update); update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-counter-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-counter-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.counterTheme = theme; stage.style.colorScheme = theme;
for (const group of ['counter','button','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark')); themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную'); /** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.counterTheme === 'light' ? 'dark' : 'light')); applyTheme('light');
const sectionTabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-counter-tabs] > .rf-tab-list'));
const syncSection = () => requestAnimationFrame(() => { const button = /** @type {HTMLElement} */(sectionTabs.querySelector('[aria-selected="true"]')); if (!button) return; const url = new URL(location.href); url.searchParams.set('counterTab',button.id === 'counter-anatomy-tab' ? 'anatomy' : 'counter'); history.replaceState(null,'',url); });
sectionTabs.addEventListener('click',syncSection); sectionTabs.addEventListener('keydown',syncSection);
/** @type {NodeListOf<HTMLElement>} */(entityPage.querySelectorAll('[data-counter-copy]')).forEach(button => button.addEventListener('click',async () => { try { await navigator.clipboard.writeText(examples[button.dataset.counterCopy].targets[0].code); announce('Код Counter скопирован'); } catch { announce('Не удалось скопировать код. Выделите его вручную.'); } }));
}
function renderSegmentedEntity(item) {
const entry = item.registry, guidance = model.guidance.components.SegmentedControl;
const example = model.codeExamples.components.SegmentedControl.variants.singleSelect, target = example.targets[0];
const selected = new URLSearchParams(location.search).get('segmentedTab') === 'segmented-control' ? 'segmented-control' : 'anatomy';
const tab = (id, key, title, active) => `<button class="rf-tab" id="${id}-${key}-tab" type="button" role="tab" aria-selected="${active}" aria-controls="${id}-${key}-panel" tabindex="${active ? 0 : -1}">${title}</button>`;
const panel = (id, key, content, active) => `<section class="rf-tab-panel" id="${id}-${key}-panel" role="tabpanel" aria-labelledby="${id}-${key}-tab" tabindex="0"${active ? '' : ' hidden'}>${content}</section>`;
const dropdown = (name, options, value) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${value}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${options.map(([key,title]) => dropdownItem(key,title,{selected:key === value})).join('')}</span></span>`;
const parameter = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const toggle = (name, title) => `<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${name}" aria-label="${title}"><span class="rf-switch__track"></span></span></label>`;
const controls = parameter('Value','Выбранный сегмент',dropdown('value',[['active','Активные'],['archived','Архивные']],'active')) + parameter('Size','Размер компонента',dropdown('size',entry.sizes.map(size => [size,size === 'md' ? 'M' : 'S']),'md')) + parameter('Count','Счётчики внутри сегментов',toggle('count','Показать Count')) + parameter('Disabled','Сегмент «Архивные» недоступен',toggle('disabled','Отключить Архивные'));
const playgroundMarkup = target.code.replaceAll('name="listing-status"','name="segmented-playground"').replace('<fieldset','<fieldset data-playground-output');
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Переключайте сегменты в превью или выберите Value. Tab показывает фокус, стрелки меняют выбор.</p></header><div class="catalog-dimension-playground catalog-button-playground" data-playground="segmented-control"><div class="catalog-dimension-playground__stage" data-segmented-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-segmented-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button>${playgroundMarkup}</div><form class="catalog-typography-playground__controls" aria-label="Параметры Segmented Control">${controls}</form></div></section>`;
const exampleId = 'segmented-example';
const code = `<div class="catalog-button-example__code-toolbar"><span class="catalog-button-example__source"><span class="rf-badge rf-badge--sm">Core Web · HTML</span><code>${target.file}</code></span><button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--s" type="button" data-segmented-copy aria-label="Скопировать Segmented Control"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="content-copy" aria-hidden="true"></span></button></div><pre class="catalog-button-example__code"><code>${escapeHtml(target.code)}</code></pre>`;
const examples = `<section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Один выбор со счётчиками, описанием и готовым кодом.</p></header><article class="catalog-button-example" data-segmented-example><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Segmented Control — Single select</h3><code>singleSelect</code></header><div class="catalog-button-example__stage">${target.code}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Пример Segmented Control">${tab(exampleId,'description','Описание',true)}${tab(exampleId,'web','Web',false)}</div>${panel(exampleId,'description',`<p class="rf-text rf-text--body-medium">${escapeHtml(example.description)}</p>`,true)}${panel(exampleId,'web',code,false)}</div></article></section>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Segmented Control</h2><p class="rf-text rf-text--body-medium rf-text--secondary">От двух до пяти взаимоисключающих вариантов для локального режима или фильтра. Всегда выбран один доступный сегмент.</p></header><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage">${segmentedIllustration()}</div><ol class="catalog-button-anatomy__parts">${[['Group','Fieldset и legend задают доступное имя группы.'],['Segment','Label и нативный radio с общим name.'],['Selection','Выбранный сегмент выделен заливкой; стрелки меняют выбор.'],['Count','Необязательный счётчик внутри подписи, без отдельного действия.']].map(([title,text]) => `<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol></div><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div><div class="catalog-button-contract__grid"><article><h3 class="rf-text rf-text--heading-h3">State</h3>${smallList(entry.states)}</article><article><h3 class="rf-text rf-text--heading-h3">Size</h3>${smallList(entry.sizes.map(size => size === 'md' ? 'M' : 'S'))}</article></div><p class="catalog-callout rf-text rf-text--body-small">Stable Web Core. Hover и Focused проверяются настоящим наведением и клавиатурой. Для связанных панелей нужен Tabs, для перехода на другую страницу — Link. В мобильном браузере используется тот же Core.</p></section>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Segmented Control</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage">${segmentedIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-segmented-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Segmented Control">${tab('segmented','anatomy','Anatomy',selected === 'anatomy')}${tab('segmented','segmented-control','Segmented Control',selected === 'segmented-control')}</div>${panel('segmented','anatomy',anatomy,selected === 'anatomy')}${panel('segmented','segmented-control',`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8">${playground}${examples}</section>`,selected === 'segmented-control')}</div>`;
const root = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="segmented-control"]')), form = /** @type {CatalogPlaygroundForm} */(root.querySelector('form')), output = /** @type {HTMLElement} */(root.querySelector('[data-playground-output]'));
const radios = [...output.querySelectorAll('input')];
const update = () => {
output.classList.toggle('rf-segmented-control--sm',form.elements.size.value === 'sm');
radios[1].disabled = form.elements.disabled.checked;
if (radios[1].disabled && form.elements.value.value === 'archived') {
form.elements.value.value = 'active';
form.elements.value.dispatchEvent(new Event('change',{bubbles:true}));
}
radios.forEach(input => { input.checked = input.value === form.elements.value.value; });
form.querySelector('[data-value="archived"]').setAttribute('aria-disabled',String(radios[1].disabled));
/** @type {NodeListOf<HTMLElement>} */(output.querySelectorAll('.rf-segmented-control__count')).forEach(count => { count.hidden = !form.elements.count.checked; });
};
form.addEventListener('submit',event => event.preventDefault());
form.addEventListener('input',update);
form.addEventListener('change',update);
output.addEventListener('change',event => { form.elements.value.value = /** @type {HTMLInputElement} */(event.target).value; form.elements.value.dispatchEvent(new Event('change',{bubbles:true})); });
update();
const stage = /** @type {HTMLElement} */(root.querySelector('[data-segmented-theme]')), themeButton = /** @type {HTMLElement} */(root.querySelector('[data-segmented-theme-toggle]'));
const applyTheme = theme => {
stage.dataset.segmentedTheme = theme;
stage.style.colorScheme = theme;
for (const group of ['segmentedControl','button','icon']) for (const record of model.foundations.componentTokenTrace[group] || []) if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[theme].resolved));
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.','-'),String(record[theme].resolved));
stage.style.background = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas')[theme].resolved;
themeButton.setAttribute('aria-pressed',String(theme === 'dark'));
themeButton.setAttribute('aria-label',theme === 'dark' ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(themeButton.querySelector('.rf-icon')).dataset.rfIconGlyph = theme === 'dark' ? 'clear-night-01' : 'sunny';
};
themeButton.addEventListener('click',() => applyTheme(stage.dataset.segmentedTheme === 'light' ? 'dark' : 'light'));
applyTheme('light');
const sectionTabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-segmented-tabs] > .rf-tab-list'));
const syncSection = () => requestAnimationFrame(() => {
const button = /** @type {HTMLElement} */(sectionTabs.querySelector('[aria-selected="true"]')); if (!button) return;
const url = new URL(location.href); url.searchParams.set('segmentedTab',button.id === 'segmented-anatomy-tab' ? 'anatomy' : 'segmented-control'); history.replaceState(null,'',url);
});
sectionTabs.addEventListener('click',syncSection);
sectionTabs.addEventListener('keydown',syncSection);
/** @type {HTMLElement} */(entityPage.querySelector('[data-segmented-copy]')).addEventListener('click',async () => {
try { await navigator.clipboard.writeText(target.code); announce('Код Segmented Control скопирован'); }
catch { announce('Не удалось скопировать код. Выделите его вручную.'); }
});
}
function renderListingCardEntity(item) {
const source = document.getElementById('listing-card-specimen-title').closest('section');
const specimenMarkup = /** @type {HTMLElement} */(source.querySelector('[data-listing-card-specimen]')).outerHTML;
const stateControls = `<div hidden>${/** @type {HTMLElement} */(source.querySelector('[data-listing-card-state]')).parentElement.innerHTML}</div>`;
const row = (title, hint, control) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const select = (name, values) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0][0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${name}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(([value,label])=>dropdownItem(value,label,{selected:value===values[0][0]})).join('')}</span></span>`;
const combinations = [['new-owned','New + own'],['default','Default'],['owned','Own'],['responded','Responded'],['new','New'],['new-responded','New + responded']];
const states = [['default','Default'],['loading','Loading'],['error','Photo error'],['long','Long content']];
const fields = [['Price','Цена','3 500 ₽','price'],['Title','Тип объявления','Букет','type'],['Freshness','Свежесть','Свежайший','freshness'],['City','Город','Москва','place']];
const badges = [['new','Новое',true],['own','Моё',true],['response','Отклик',false],['place','Город',true]];
const badgeControls = badges.map(([key,label,checked]) => row(label,'Показать бейдж',`<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="badge-${key}" aria-label="Бейдж ${label}" ${checked?'checked':''}><span class="rf-switch__track"></span></span></label>`).replace('catalog-button-playground__parameter"','catalog-button-playground__parameter catalog-button-playground__parameter--toggle"')).join('');
const controls = row('State','Состояние карточки',select('State',states))+badgeControls+fields.map(([name,hint,value])=>row(name,hint,`<input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${name}" value="${value}">`)).join('');
const preview = document.createElement('div');
preview.className = 'catalog-button-tab-section rf-stack rf-stack--gap-8';
preview.innerHTML = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте Listing Card и проверьте результат в превью.</p></header><div class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="listing-card"><div class="catalog-dimension-playground__stage" data-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-listing-theme aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-listing-output>${specimenMarkup}${stateControls}</div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Listing Card">${controls}</form></div></section><section class="catalog-button-examples rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Examples</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Комбинации бейджей с примером разметки эталона.</p></header><div class="catalog-button-example-list">${combinations.map(([value,label])=>`<article class="catalog-button-example" data-listing-example="${value}"><header class="catalog-button-example__header"><h3 class="rf-text rf-text--heading-h3">Listing Card — ${label}</h3><code>${value}</code></header><div class="catalog-button-example__stage">${specimenMarkup}${stateControls}</div><div class="rf-tabs catalog-button-example__tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="${label}: описание и код"><button class="rf-tab" type="button" role="tab" id="listing-example-${value}-description-tab" aria-controls="listing-example-${value}-description" aria-selected="true" tabindex="0">Описание</button><button class="rf-tab" type="button" role="tab" id="listing-example-${value}-code-tab" aria-controls="listing-example-${value}-code" aria-selected="false" tabindex="-1">Web reference</button></div><section class="rf-tab-panel" role="tabpanel" id="listing-example-${value}-description" aria-labelledby="listing-example-${value}-description-tab"><p class="rf-text rf-text--body-medium">${label}. Одна карточка — одно действие открытия объявления. Данные и срок статусов задаёт продукт.</p></section><section class="rf-tab-panel catalog-button-example__code-panel" role="tabpanel" id="listing-example-${value}-code" aria-labelledby="listing-example-${value}-code-tab" hidden><p class="rf-text rf-text--body-small">Beta: Listing Card использует общий Core API rf-listing-card. Подключите публичные core-ui.css и core-ui.js.</p><pre class="catalog-button-example__code"><code data-listing-code></code></pre></section></div></article>`).join('')}</div></section>`;
const card = /** @type {HTMLElement} *//** @type {HTMLElement} */((source.querySelector('.listing-card-preview')).cloneNode(true));
card.setAttribute('inert', '');
card.setAttribute('aria-hidden', 'true');
const entry = item.registry;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
const active = new URL(location.href).searchParams.get('listingCardTab') === 'listing-card' ? 'listing-card' : 'anatomy';
const labels = {anatomy:'Anatomy','listing-card':'Listing Card'};
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><h2 class="rf-text rf-text--heading-h2">Как устроена карточка объявления</h2><ol class="catalog-button-anatomy__parts">${[['Фото','Image внутри AspectRatio; Skeleton сохраняет место при загрузке.'],['Статусы','Badge показывает новизну, своё объявление и наличие отклика.'],['Цена и описание','Text задаёт иерархию цены, типа и свежести.'],['Город','Badge с Icon показывает город поверх фотографии.'],['Действие','Вся карточка открывает объявление; вложенных кнопок нет.']].map(([title,text])=>`<li><strong>${title}</strong><span>${text}</span></li>`).join('')}</ol><div class="catalog-button-contract__grid">${[['Variants',entry.variants],['States',entry.states],['Состав',entry.dependencies]].map(([title,values])=>`<article><h3 class="rf-text rf-text--heading-h3">${title}</h3>${smallList(values)}</article>`).join('')}</div><p class="catalog-callout">${escapeHtml(model.registry.lifecycle[entry.status])} Данные, срок бейджа «Новое» и открытие объявления управляются продуктом.</p></section>`;
entityPage.innerHTML = `<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Listing Card</h1><p class="rf-text rf-text--body-large rf-text--secondary">Фотография, цена и важные детали объявления в одной компактной карточке.</p></div><div class="catalog-color-hero__media">${card.outerHTML}</div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-listing-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Listing Card">${Object.entries(labels).map(([key,label])=>`<button class="rf-tab" type="button" role="tab" id="listing-tab-${key}" aria-controls="listing-panel-${key}" aria-selected="${active===key}" tabindex="${active===key?0:-1}" data-listing-tab="${key}">${label}</button>`).join('')}</div>${Object.keys(labels).map(key=>`<section class="rf-tab-panel" role="tabpanel" id="listing-panel-${key}" aria-labelledby="listing-tab-${key}" tabindex="0" ${active===key?'':'hidden'}>${key==='anatomy'?anatomy:preview.outerHTML}</section>`).join('')}</div>`;
const playground = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="listing-card"]'));
const output = /** @type {HTMLElement} */(playground.querySelector('[data-listing-output]'));
setupListingCardSpecimen(output, true);
const form = /** @type {CatalogPlaygroundForm} */(playground.querySelector('form'));
const widthRow = document.createElement('div');
widthRow.innerHTML = row('Width','Ширина карточки', '<div class="rf-slider-field catalog-dimension-playground__range"><input class="rf-slider" type="range" name="Width" aria-label="Width" min="0" step="1"><output class="rf-text rf-text--caption" data-listing-width-value></output></div>');
form.children[0].after(widthRow.firstElementChild);
const width = /** @type {HTMLInputElement} */(form.querySelector('[name="Width"]'));
width.max = String(parseFloat(getComputedStyle(/** @type {HTMLElement} */(output.querySelector('[data-listing-card-specimen]'))).maxWidth));
width.value = '179';
const update = () => {
const data = /** @type {CatalogTextFormData} */(new FormData(form));
output.style.width = `${width.value}px`;
output.style.maxWidth = '100%';
/** @type {HTMLElement} */(output.querySelector('[data-listing-card-specimen]')).style.width = '100%';
form.querySelector('[data-listing-width-value]').textContent = `${width.value}px`;
const mode = data.get('State');
/** @type {HTMLElement} */(output.querySelector(`[data-listing-card-state="${mode}"]`)).click();
badges.forEach(([key]) => { /** @type {HTMLElement} */(output.querySelector(`.listing-card-specimen__${key}`)).hidden = mode === 'loading' || !data.has(`badge-${key}`); });
if (mode !== 'long') fields.forEach(([name,,,key]) => {output.querySelector(`[data-listing-card-${key}]`).textContent = data.get(name);});
output.querySelector('[data-listing-card-specimen]').setAttribute('aria-label', mode === 'loading' ? 'Загрузка объявления' : `Открыть объявление: ${output.querySelector('[data-listing-card-details]').textContent.trim()}, ${output.querySelector('[data-listing-card-place]').textContent}`);
};
form.addEventListener('input', update);
form.addEventListener('change', update);
form.addEventListener('submit', event => event.preventDefault());
/** @type {HTMLElement} */(playground.querySelector('[data-listing-theme]')).addEventListener('click', event => {
const button = /** @type {HTMLButtonElement} */(event.currentTarget);
const stage = button.parentElement;
const dark = stage.dataset.theme !== 'dark';
stage.dataset.theme = dark ? 'dark' : 'light';
const theme = stage.dataset.theme;
for (const record of model.foundations.colors.records.filter(record => record.layer === 'context' && record[theme])) stage.style.setProperty('--rf-' + record.name.replaceAll('.', '-'), String(record[theme].resolved));
for (const group of ['badge', 'card', 'text', 'icon']) for (const record of model.foundations.componentTokenTrace[group] || []) {
if (record.themeDependent) stage.style.setProperty('--rf-' + record.name.replace(/^component\./, '').replace(/([a-z])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase(), String(record[theme].resolved));
}
button.setAttribute('aria-pressed', String(dark));
button.setAttribute('aria-label', dark ? 'Тема превью: тёмная. Переключить на светлую' : 'Тема превью: светлая. Переключить на тёмную');
/** @type {HTMLElement} */(button.querySelector('[data-rf-icon-glyph]')).dataset.rfIconGlyph = dark ? 'clear-night-01' : 'sunny';
});
/** @type {NodeListOf<HTMLElement>} */(entityPage.querySelectorAll('[data-listing-example]')).forEach(example => {
setupListingCardSpecimen(example, true);
/** @type {HTMLElement} */(example.querySelector(`[data-listing-card-state="${example.dataset.listingExample}"]`)).click();
example.querySelector('[data-listing-code]').textContent = /** @type {HTMLElement} */(example.querySelector('[data-listing-card-specimen]')).outerHTML;
});
update();
const tabs = /** @type {HTMLElement} */(entityPage.querySelector('[data-listing-tabs]'));
const sync = () => requestAnimationFrame(() => updateQuery('listingCardTab', /** @type {HTMLElement} */(tabs.querySelector('[aria-selected="true"]')).dataset.listingTab));
tabs.addEventListener('click', sync);
tabs.addEventListener('keydown', event => {if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) sync();});
}
function renderDropdownEntity(item) {
const entry = item.registry;
const requested = new URLSearchParams(location.search).get('dropdownTab');
const selected = ['dropdown','examples'].includes(requested) ? 'dropdown' : 'anatomy';
const tabs = [['anatomy','Anatomy'],['dropdown','Dropdown']];
const tab = (key,label) => `<button class="rf-tab" id="dropdown-${key}-tab" type="button" role="tab" aria-selected="${selected===key}" aria-controls="dropdown-${key}-panel" tabindex="${selected===key?0:-1}">${label}</button>`;
const panel = (key,html) => `<section class="rf-tab-panel" id="dropdown-${key}-panel" role="tabpanel" aria-labelledby="dropdown-${key}-tab" tabindex="0"${selected===key?'':' hidden'}>${html}</section>`;
const parameter = (label,hint,html) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${label}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${html}</div>`;
const control = (name,label,hint,values) => parameter(label,hint,`<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0][0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${label}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(([value,text],i)=>dropdownItem(value,text,{selected:!i})).join('')}</span></span>`);
const controls = control('mode','Mode','Выбор значения или меню действий',[['actions','Actions'],['selection','Selection']])
+ control('variant','Variant','Способ выбора вариантов',[['single','Single'],['editable','Editable input'],['multiple','Multiple'],['searchable','Searchable'],['grouped','Grouped'],['cascading','Cascading']])
+ control('state','State','Состояние списка',[['default','Default'],['disabled','Disabled'],['invalid','Invalid'],['empty','Empty'],['loading','Loading']])
+ control('size','Size','Размер кнопки раскрытия',[['md','M'],['sm','S'],['lg','L']])
+ control('placement','Placement','Расположение раскрытого списка',[['anchored','Anchored'],['viewport','Viewport']])
+ control('trigger','Trigger','Кнопка раскрытия меню',[['button','Button'],['icon','Icon Button'],['field','Field']])
+ control('density','Density','Плотность пунктов меню',[['default','Default'],['compact','Compact']])
+ control('groups','Groups','Разделы с заголовками',[['off','Off'],['on','On']])
+ control('width','Width','Ширина панели',[['content','Content'],['trigger','Trigger'],['container','Container']])
+ control('alignment','Alignment','Выравнивание панели относительно кнопки',[['start','Start'],['center','Center'],['end','End']])
+ control('itemState','Item state','Состояние первого пункта меню',[['default','Default'],['disabled','Disabled'],['destructive','Destructive']])
+ control('itemIcon','Item icon','Иконки пунктов меню',[['on','On'],['off','Off']])
+ control('itemDescription','Description','Описание первого пункта',[['off','Off'],['on','On']])
+ control('submenu','Submenu','Вложенные действия',[['off','Off'],['on','On']])
+ parameter('Item label','Подпись первого пункта','<input class="rf-text-field catalog-typography-playground__text" name="itemLabel" aria-label="Item label" value="Добавить в отложенное">')
+ parameter('Label','Подпись кнопки раскрытия','<input class="rf-text-field catalog-typography-playground__text" name="label" aria-label="Label" value="Действия">');
const themeButton = `<button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-dropdown-theme aria-label="Тёмная тема превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button>`;
const anatomy = `<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${dropdownIllustration()}</div><ol class="catalog-button-anatomy__parts"><li>Trigger — кнопка действия или поле выбора</li><li>Label — подпись кнопки или выбранное значение</li><li>Panel — список из системных List Item</li><li>Item — подпись, иконка, описание и состояние</li><li>Submenu — вложенные команды с возвратом к родительскому меню</li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Нужно выбрать значение из списка или открыть компактное меню действий.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для нескольких постоянно видимых вариантов используйте Radio или Segmented Control.</p></section></div><div class="catalog-button-contract__grid"><article><h3>Variants</h3>${smallList(entry.variants)}</article><article><h3>States</h3>${smallList(entry.states)}</article></div><p class="catalog-callout">Стрелки перемещают выбор, Enter подтверждает, Escape закрывает список. В поиске пробел остаётся частью текста. На узком touch-экране длинные списки раскрываются с учётом доступного места.</p></section>`;
const playground = `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-playground="dropdown"><div class="catalog-dimension-playground__stage" data-dropdown-stage>${themeButton}<div data-dropdown-preview></div></div><form class="catalog-typography-playground__controls" data-dropdown-controls>${controls}</form><output class="rf-text rf-text--body-small rf-text--secondary" data-dropdown-result aria-live="polite">Значение не выбрано</output></section></section>`;
const examples = renderStateMatrix(entry).replace('State matrix','Examples').replaceAll(' data-catalog-dropdown-open','');
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Dropdown</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" inert aria-hidden="true">${dropdownIllustration()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-dropdown-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Dropdown">${tabs.map(([key,label])=>tab(key,label)).join('')}</div>${panel('anatomy',anatomy)}${panel('dropdown',`<div class="rf-stack rf-stack--gap-8">${playground}${examples}</div>`)}</div>`;
const form=/** @type {HTMLFormElement} */(entityPage.querySelector('[data-dropdown-controls]'));
const output=/** @type {HTMLElement} */(entityPage.querySelector('[data-dropdown-preview]'));
const result=entityPage.querySelector('[data-dropdown-result]');
let previousSettings='';
const update=()=>{
const data=new FormData(form),actions=data.get('mode')==='actions',state=data.get('state'),variant=data.get('variant');
const settings=JSON.stringify(['mode','variant','state','size','placement','label','trigger','alignment','itemState','itemIcon','itemDescription','submenu','itemLabel','density','groups','width'].map(name=>data.get(name)));
if(settings===previousSettings)return;previousSettings=settings;
for(const name of ['variant','state']) {
const wrapper=/** @type {HTMLElement} */(form.querySelector(`[name="${name}"]`).closest('.catalog-button-playground__parameter'));
wrapper.hidden=actions&&name==='variant';
wrapper.querySelectorAll('[data-rf-dropdown-item]').forEach(option=>{option.setAttribute('aria-disabled',String(actions&&['invalid','empty'].includes(/** @type {HTMLElement} */(option).dataset.value)));});
}
for(const name of ['trigger','alignment','itemState','itemIcon','itemDescription','submenu','itemLabel','density','groups','width'])(/** @type {HTMLElement} */(form.querySelector(`[name="${name}"]`).closest('.catalog-button-playground__parameter'))).hidden=!actions;
const options={density:data.get('density'),groups:data.get('groups')==='on',width:data.get('width'),trigger:data.get('trigger'),alignment:data.get('alignment'),itemState:data.get('itemState'),itemIcon:data.get('itemIcon')!=='off',itemDescription:data.get('itemDescription')==='on',submenu:data.get('submenu')==='on',itemLabel:String(data.get('itemLabel')||'Добавить в отложенное'),anchored:data.get('placement')==='anchored',viewport:data.get('placement')==='viewport',editable:variant==='editable',multiple:variant==='multiple',searchable:variant==='searchable',grouped:variant==='grouped',cascade:variant==='cascading',disabled:state==='disabled',error:state==='invalid',empty:state==='empty',loading:state==='loading'};
output.innerHTML=actions?actionDropdown('dropdown-playground-menu',options):customDropdown('dropdown-playground-selection',options);
const trigger=/** @type {HTMLButtonElement} */(output.querySelector('[data-rf-dropdown-trigger]'));
const label=String(data.get('label')||'Город');
const size=data.get('size');
if(actions){
trigger.setAttribute('aria-label',label);
trigger.parentElement.setAttribute('data-rf-menu-trigger-shape',String(data.get('trigger')));
const field=data.get('trigger')==='field',icon=data.get('trigger')==='icon';
trigger.className=field?'rf-dropdown__trigger'+(size==='md'?'':` rf-dropdown__trigger--${size}`):icon?'rf-icon-button rf-icon-button--secondary'+(size==='md'?'':` rf-icon-button--${size==='sm'?'s':'l'}`):'rf-button rf-button--secondary'+(size==='md'?'':` rf-button--${size==='sm'?'s':'l'}`);
trigger.innerHTML=icon?'<span class="rf-icon rf-icon--sm" data-rf-icon-glyph="more-hr-al" aria-hidden="true"></span>':`<span class="${field?'rf-dropdown__trigger-value':'rf-button__label'}">${escapeHtml(label)}</span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span>`;
}else{trigger.className='rf-dropdown__trigger'+(size==='md'?'':` rf-dropdown__trigger--${size}`);output.querySelector('.rf-text-field__label').textContent=label;}
trigger.disabled=state==='disabled';
result.textContent=actions?'Выберите действие':'Значение не выбрано';
};
form.addEventListener('submit',event=>event.preventDefault());
const modeInput=/** @type {HTMLInputElement} */(form.elements.namedItem('mode')),labelInput=/** @type {HTMLInputElement} */(form.elements.namedItem('label')),stateInput=/** @type {HTMLInputElement} */(form.elements.namedItem('state'));
form.addEventListener('change',event=>{if(event.target===modeInput&&['Город','Действия'].includes(labelInput.value))labelInput.value=modeInput.value==='actions'?'Действия':'Город';if(modeInput.value==='actions'&&['invalid','empty'].includes(stateInput.value)){stateInput.value='default';stateInput.dispatchEvent(new Event('input',{bubbles:true}));}update();});
form.querySelectorAll('input[type="text"],input:not([type])').forEach(input=>input.addEventListener('input',update));
output.addEventListener('change',event=>{const input=/** @type {HTMLInputElement} */(event.target);if(input.matches('[data-rf-dropdown-input]'))result.textContent=input.value?`Выбрано: ${output.querySelector('[data-rf-dropdown-value]').textContent}`:'Значение не выбрано';});
output.addEventListener('click',event=>{const item=/** @type {HTMLElement} */(event.target).closest('[role="menuitem"]');if(item&&!item.hasAttribute('disabled')&&!item.hasAttribute('data-rf-menu-submenu-target'))result.textContent=`Действие: ${item.textContent.trim()}`;});
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-dropdown-stage]')),theme=entityPage.querySelector('[data-dropdown-theme]');
const applyTheme=value=>{
stage.dataset.previewTheme=value;stage.style.colorScheme=value;
for(const group of ['dropdown','textField','button','listItem'])for(const record of model.foundations.componentTokenTrace[group]||[])if(record.themeDependent){
const resolved=record[value].resolved;
const css=Array.isArray(resolved)?(resolved.length?resolved.map(shadow=>`${shadow.offsetX} ${shadow.offsetY} ${shadow.blur} ${shadow.spread} ${shadow.color}`).join(', '):'none'):typeof resolved==='object'?null:String(resolved);
if(css!==null)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),css);
}
for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[value].resolved));
for(const [name,role]of Object.entries({'text-primary':'text.primary.default','text-secondary':'text.secondary.default','text-disabled':'text.primary.disabled','icon-secondary':'icon.secondary.default'}))stage.style.setProperty('--rf-'+name,`var(--rf-color-context-${role.replaceAll('.','-')})`);
stage.style.background='var(--rf-color-context-background-canvas)';theme.setAttribute('aria-pressed',String(value==='dark'));theme.setAttribute('aria-label',value==='dark'?'Светлая тема превью':'Тёмная тема превью');
};
theme.addEventListener('click',()=>applyTheme(stage.dataset.previewTheme==='dark'?'light':'dark'));
const tabRoot=entityPage.querySelector('[data-dropdown-tabs]');
const sync=event=>{if(!/** @type {HTMLElement} */(event.target).closest('#dropdown-anatomy-tab,#dropdown-dropdown-tab'))return;requestAnimationFrame(()=>{const active=tabRoot.querySelector(':scope > .rf-tab-list [aria-selected="true"]');updateQuery('dropdownTab',active.id.replace('dropdown-','').replace('-tab',''));});};
tabRoot.addEventListener('click',sync);tabRoot.addEventListener('keydown',sync);
update();applyTheme('light');
}

function listItemPreview(variant='navigation',title='Уведомления',description='Настройте сообщения Contour',leading='icon',trailing='chevron',state='default',options={}) {
const skeleton=state==='skeleton',disabled=state==='disabled'||skeleton;
const selection=variant==='selection';
const control=selection?(options.control||'checkbox'):null;
const slot=(kind)=>{
if(kind==='none')return '';
if(kind==='image')return '<img class="rf-list-item__image" src="assets/listing-card-figma-bouquet.png" alt="">';
if(kind==='text')return `<span class="rf-list-item__value">${escapeHtml(options.endLabel||'Русский')}</span>`;
if(kind==='radio')return `<span class="rf-choice rf-choice--md"><input class="rf-choice__input" type="radio" name="list-item-preview-choice" aria-label="${escapeAttribute(title)}"${disabled?' disabled':''}${options.selected?' checked':''}></span>`;
if(kind==='checkbox')return `<span class="rf-choice rf-choice--md"><span class="rf-choice__control"><input class="rf-choice__input" type="checkbox" aria-label="${escapeAttribute(title)}"${disabled?' disabled':''}${options.selected?' checked':''}><span class="rf-icon rf-icon--md" data-rf-icon-glyph="checkbox-check" data-rf-icon-style="line" aria-hidden="true"></span></span></span>`;
if(kind==='switch')return `<span class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" aria-label="${escapeAttribute(title)}"${disabled?' disabled':''}${options.selected?' checked':''}><span class="rf-switch__track"></span></span></span>`;
return `<span class="rf-icon rf-icon--md" data-rf-icon-glyph="${kind==='chevron'?'chevron-right':'bell'}" aria-hidden="true"></span>`;
};
const hasControl=control&&control!=='none';
const start=hasControl&&options.controlSide==='start'?control:leading;
const end=hasControl&&options.controlSide!=='start'?control:trailing;
const content=`${start!=='none'?`<span class="rf-list-item__leading">${slot(start)}</span>`:''}<span class="rf-list-item__content">${options.topLabel?`<span class="rf-list-item__label">${escapeHtml(options.topLabel)}</span>`:''}<span class="rf-list-item__title">${escapeHtml(title)}</span>${description?`<span class="rf-list-item__description">${escapeHtml(description)}</span>`:''}</span>${end!=='none'?`<span class="rf-list-item__trailing">${slot(end)}</span>`:''}`;
const attrs=`class="rf-list-item rf-list-item--rich${variant==='static'?'':' rf-list-item--interactive'}" data-state="${state}" data-align="${options.align||'center'}" data-description="${options.wrap||'truncate'}" data-divider="${options.divider||'full'}" data-surface="${options.surface||'plain'}"${skeleton?' inert aria-hidden="true"':''}`;
if(hasControl)return `<label ${attrs}>${content}</label>`;
if(selection)return `<button ${attrs} type="button" aria-pressed="${Boolean(options.selected)}"${disabled?' disabled':''}>${content}</button>`;
if(variant==='static')return `<div ${attrs}>${content}</div>`;
if(variant==='navigation')return `<a ${attrs} href="#components/list-item"${disabled?' aria-disabled="true" tabindex="-1"':''}>${content}</a>`;
return `<button ${attrs} type="button"${disabled?' disabled':''}>${content}</button>`;
}
function renderListItemEntity(item) {
const entry=item.registry, active=new URLSearchParams(location.search).get('listItemTab')==='list-item'?'list-item':'anatomy';
const parameter=(title,hint,control)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
const select=(name,values)=>`<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map((value,index)=>dropdownItem(value,titleCase(value),{selected:!index})).join('')}</span></span>`;
const text=(name,value)=>`<input class="rf-text-field" name="${name}" value="${value}" aria-label="${titleCase(name)}">`;
const controls=parameter('Variant','Назначение строки',select('variant',['navigation','static','action','selection']))+parameter('State','Доступность действия',select('state',['default','hover','pressed','focused','disabled','skeleton']))+parameter('Title','Основная подпись',text('title','Уведомления'))+parameter('Description','Пояснение; оставьте пустым, чтобы скрыть',text('description','Настройте сообщения Contour'))+parameter('Leading','Содержимое перед текстом',select('leading',['icon','image','none']))+parameter('Trailing','Содержимое после текста',select('trailing',['chevron','text','none']))+parameter('Surface','Фон и скругление строки',select('surface',['plain','filled']))+parameter('Align','Выравнивание содержимого',select('align',['center','top']))+parameter('Description mode','Перенос длинного пояснения',select('wrap',['truncate','wrap']))+parameter('Divider','Линия между строками',select('divider',['full','inset','none']))+parameter('Label top','Необязательная подпись над заголовком',text('topLabel',''))+parameter('Label end','Значение справа при Trailing → Text',text('endLabel','Русский'))+parameter('Control','Элемент выбора для Selection',select('control',['checkbox','radio','switch','none']))+parameter('Control side','Расположение элемента выбора',select('controlSide',['end','start']))+parameter('Value','Выбрана ли строка',select('selected',['off','on']));
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${listItemPreview()}</div><ol class="catalog-button-anatomy__parts"><li>Leading — иконка или другое содержимое перед текстом</li><li>Title — основная подпись строки</li><li>Description — необязательное пояснение</li><li>Trailing — стрелка или дополнительное содержимое</li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Настройки, переходы, действия и выбор в списке.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для самостоятельного блока с изображением и несколькими действиями используйте Card.</p></section></div><p class="catalog-callout">Beta. Hover, нажатие и фокус проверяются указателем и клавишей Tab. Selection использует системный Checkbox или Switch; выбор принадлежит форме. Static не выполняет действие. Skeleton сохраняет размеры строки и исключает её из взаимодействия. Верхняя подпись и значение справа необязательны; описание переносится по настройке.</p></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-list-item-playground><div class="catalog-dimension-playground__stage" data-list-item-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-list-item-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-text-field-preview" data-list-item-output></div></div><form class="catalog-typography-playground__controls">${controls}</form><p role="status" data-list-item-result>Нажмите строку или перейдите к ней клавишей Tab.</p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">List Item</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" inert>${listItemPreview()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-list-item-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы List Item">${[['anatomy','Anatomy'],['list-item','List Item']].map(([key,label])=>`<button class="rf-tab" type="button" id="li-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="li-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['list-item',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="li-${key}-panel" aria-labelledby="li-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-list-item-output]'),result=entityPage.querySelector('[data-list-item-result]');
const update=()=>{const data=new FormData(form),options={...Object.fromEntries(data),selected:data.get('selected')==='on'};output.innerHTML=listItemPreview(String(data.get('variant')),String(data.get('title')),String(data.get('description')),String(data.get('leading')),String(data.get('trailing')),String(data.get('state')),options);const skeleton=data.get('state')==='skeleton';output.setAttribute('aria-busy',String(skeleton));result.textContent=skeleton?'Загрузка строки…':'Нажмите строку или перейдите к ней клавишей Tab.';for(const name of ['control','controlSide','selected'])(/** @type {HTMLElement} */(form.querySelector(`[name="${name}"]`).closest('.catalog-button-playground__parameter'))).hidden=data.get('variant')!=='selection';};
form.addEventListener('input',update);form.addEventListener('change',update);update();
output.addEventListener('click',event=>{const row=event.target instanceof Element?event.target.closest('a,button'):null;if(!row)return;event.preventDefault();if(row.getAttribute('aria-disabled')==='true')return;if(row.hasAttribute('aria-pressed')){const selected=row.getAttribute('aria-pressed')!=='true';row.setAttribute('aria-pressed',String(selected));result.textContent=selected?'Строка выбрана.':'Выбор снят.';return;}result.textContent=row.tagName==='A'?'Переход выполнен в превью.':'Действие выполнено.';});
output.addEventListener('change',event=>{result.textContent=event.target instanceof HTMLInputElement&&event.target.checked?'Строка выбрана.':'Выбор снят.';});
const tabs=entityPage.querySelector('[data-list-item-tabs]>.rf-tab-list');const sync=()=>requestAnimationFrame(()=>updateQuery('listItemTab',tabs.querySelector('[aria-selected="true"]').id==='li-list-item-tab'?'list-item':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-list-item-stage]')),toggle=entityPage.querySelector('[data-list-item-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.style.colorScheme=key;for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));for(const group of ['listItem','icon','selectionControl','switch'])for(const record of model.foundations.componentTokenTrace[group]||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[key].resolved));toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function bannerPreview(title='Мои объявления',description='Активные и архивные', options = {}) {
const o = {illustration:'right',background:'filled',mode:'whole',state:'default',label:'',action:'Подробнее',size:'large',trailing:'off',...options};
const skeleton=o.state==='skeleton',tag=o.mode==='whole'?'button':'div';
const media=o.illustration==='none'?'':`<span class="rf-banner__media"><img src="../../illustrations/profile-listings-card-3d.png" alt="" aria-hidden="true"></span>`;
const text=`<span class="rf-banner__content">${o.label?`<span class="rf-banner__label rf-text rf-text--caption">${escapeHtml(o.label)}</span>`:''}<strong class="rf-banner__title rf-text ${o.size==='large'?'rf-text--title-xl':'rf-text--headline-xs'}">${escapeHtml(title)}</strong>${description?`<span class="rf-banner__description rf-text rf-text--body-s">${escapeHtml(description)}</span>`:''}${o.mode==='action'?`<button class="rf-button rf-button--ghost rf-button--s" type="button"><span class="rf-button__content"><span class="rf-button__label">${escapeHtml(o.action)}</span></span></button>`:''}</span>`;
return `<${tag} class="rf-banner rf-banner--${o.background} rf-banner--${o.size}" data-state="${o.state}"${tag==='button'?' type="button"':''}${skeleton?' inert aria-busy="true" aria-label="Загрузка баннера"':''}>${skeleton?'<span class="rf-sr-only">Загрузка баннера</span>':''}${o.illustration==='left'?media:''}${text}${o.illustration==='right'?media:''}${o.trailing==='on'&&o.mode==='whole'?'<span class="rf-banner__trailing rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right" aria-hidden="true"></span>':''}</${tag}>`;
}
function renderBannerEntity(item) {
const entry=item.registry,active=new URLSearchParams(location.search).get('bannerTab')==='banner'?'banner':'anatomy';
const parameter=(name,title,hint,value)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span><input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${title}" value="${escapeAttribute(value)}"></div>`;
const dropdown=(name,values)=>`<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value=>dropdownItem(value,titleCase(value),{selected:value===values[0]})).join('')}</span></span>`;
const choice=(name,title,hint,values)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${dropdown(name,values)}</div>`;
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${bannerPreview()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Banner</strong><span>Фон со скруглением или прозрачный контейнер.</span></li><li><strong>Title</strong><span>Название раздела; размер Default или Large.</span></li><li><strong>Description</strong><span>Необязательное пояснение, стиль Body S.</span></li><li><strong>Image</strong><span>Декоративная иллюстрация слева, справа или без неё.</span></li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Нужно выделить переход в раздел. В Mini App это «Мои объявления» в профиле.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для обычной строки настроек используйте List Item, для объявления — Listing Card.</p></section></div><p class="catalog-callout">Beta · Banner из Text, Image, Button и Icon. Фон Filled или Plain; иллюстрация Left, Right или None. В режиме Whole весь баннер — одна кнопка; Action оставляет отдельную кнопку внутри неинтерактивного контейнера. Skeleton сохраняет геометрию и отключает действия. Hover, Pressed и Focused проверяются наведением, нажатием и клавишей Tab. Длинный текст переносится целыми словами. Изображение декоративное и не повторяет название для скринридера.</p><section class="rf-stack rf-stack--gap-4"><h2>FeatureCard · aria-pressed</h2>${['light','dark'].map(theme=>`<div data-theme="${theme}" class="rf-stack rf-stack--gap-4"><h3>${theme}</h3>${[false,true].map(selected=>`<button type="button" class="rf-feature-card" aria-pressed="${selected}"><span class="rf-feature-card__content"><strong class="rf-feature-card__title">${selected?'Магазин':'Частный продавец'}</strong></span><img class="rf-feature-card__media" src="../../illustrations/profile-listings-card-3d.png" alt="" aria-hidden="true"></button>`).join('')}</div>`).join('')}</section></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage" data-banner-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-banner-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-banner-preview" data-banner-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Banner">${choice('mode','Mode','Одно действие: весь баннер или отдельная кнопка',['whole','action'])}${choice('state','State','Состояние баннера',['default','hover','pressed','focused','skeleton'])}${choice('background','Background','Фон и скругление',['filled','plain'])}${choice('illustration','Illustration','Расположение иллюстрации',['right','left','none'])}${choice('size','Size','Размер заголовка и иллюстрации',['large','default'])}${parameter('label','Label','Необязательная подпись над заголовком','')}${parameter('title','Title','Название раздела','Мои объявления')}${parameter('description','Description','Пояснение; оставьте пустым, чтобы скрыть','Активные и архивные')}${parameter('action','Action','Текст отдельной кнопки','Подробнее')}${choice('trailing','Trailing','Стрелка в режиме Whole',['off','on'])}</form><p class="rf-text rf-text--body-small rf-text--secondary" role="status" data-banner-result>Нажмите карточку или перейдите к ней клавишей Tab.</p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Banner</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-banner-preview" inert>${bannerPreview()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-banner-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Banner">${[['anatomy','Anatomy'],['banner','Banner']].map(([key,label])=>`<button class="rf-tab" type="button" id="bn-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="bn-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['banner',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="bn-${key}-panel" aria-labelledby="bn-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-banner-output]'),result=entityPage.querySelector('[data-banner-result]');
const update=()=>{const data=new FormData(form);output.innerHTML=bannerPreview(String(data.get('title')||'Мои объявления'),String(data.get('description')||''),Object.fromEntries(data));};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('input',update);form.addEventListener('change',update);update();output.addEventListener('click',()=>{result.textContent='Переход в раздел выполнен в превью.';});
const tabs=entityPage.querySelector('[data-banner-tabs]>.rf-tab-list');const sync=()=>requestAnimationFrame(()=>updateQuery('bannerTab',tabs.querySelector('[aria-selected="true"]').id==='bn-banner-tab'?'banner':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-banner-stage]')),toggle=entityPage.querySelector('[data-banner-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;for(const [alias,name] of [['--rf-text-primary','color.context.text.primary.default'],['--rf-text-secondary','color.context.text.secondary.default']])stage.style.setProperty(alias,String(model.foundations.colors.records.find(r=>r.name===name)[key].resolved));for(const record of model.foundations.componentTokenTrace.button||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[key].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function paginationPreview(page=2,pages=5) {
const previous=page>1?`<a class="rf-link" href="?page=${page-1}" data-pagination-page="${page-1}" aria-label="Предыдущая страница">Назад</a>`:'<span class="rf-text rf-text--secondary" aria-disabled="true">Назад</span>';
const next=page<pages?`<a class="rf-link" href="?page=${page+1}" data-pagination-page="${page+1}" aria-label="Следующая страница">Далее</a>`:'<span class="rf-text rf-text--secondary" aria-disabled="true">Далее</span>';
return `<nav class="rf-inline rf-inline--wrap rf-inline--gap-4" aria-label="Страницы списка">${previous}<span class="rf-text rf-text--body-small" aria-live="polite">Страница ${page} из ${pages}</span>${next}</nav>`;
}
function renderPaginationEntity(item) {
const entry=item.registry,active=new URLSearchParams(location.search).get('paginationTab')==='pagination'?'pagination':'anatomy';
const parameter=(name,title,hint,value)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span><input class="rf-text-field catalog-typography-playground__text" name="${name}" type="number" min="1" max="999" step="1" aria-label="${title}" value="${value}"></div>`;
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${paginationPreview()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Назад</strong><span>Переход к предыдущей странице. На первой странице недоступен.</span></li><li><strong>Текущая страница</strong><span>Положение в списке и общее количество страниц.</span></li><li><strong>Далее</strong><span>Переход к следующей странице. На последней странице недоступен.</span></li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Большой список разбит на страницы: пользователи, объявления и платежи в админке.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для переключения разделов используйте Navigation Bar, для вкладок содержимого — Tabs.</p></section></div><p class="catalog-callout">Experimental · Template из текста и нативных ссылок. Здесь показан Previous / Next. Номера страниц и Load more остаются кандидатами. В продукте href сохраняет фильтры списка; недоступное направление не является ссылкой. Превью демонстрирует композицию, существующая пагинация админки не изменена.</p></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage" data-pagination-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-pagination-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div data-pagination-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Pagination">${parameter('page','Page','Текущая страница',2)}${parameter('pages','Pages','Общее количество страниц',5)}</form><p class="rf-text rf-text--body-small rf-text--secondary">Переходы в превью меняют текущую страницу. Проверьте первую, последнюю и единственную страницу.</p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Pagination</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media" inert>${paginationPreview()}</div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-pagination-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Pagination">${[['anatomy','Anatomy'],['pagination','Pagination']].map(([key,label])=>`<button class="rf-tab" type="button" id="pg-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="pg-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['pagination',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="pg-${key}-panel" aria-labelledby="pg-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-pagination-output]'),pageInput=/** @type {HTMLInputElement} */(form.elements.namedItem('page')),pagesInput=/** @type {HTMLInputElement} */(form.elements.namedItem('pages'));
const update=()=>{const pages=Math.max(1,Math.min(999,Math.floor(Number(pagesInput.value)||1))),page=Math.max(1,Math.min(pages,Math.floor(Number(pageInput.value)||1)));pagesInput.value=String(pages);pageInput.max=String(pages);pageInput.value=String(page);output.innerHTML=paginationPreview(page,pages);};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('change',update);update();output.addEventListener('click',event=>{const link=event.target instanceof Element?event.target.closest('[data-pagination-page]'):null;if(!link)return;event.preventDefault();const direction=Number(link.getAttribute('data-pagination-page'))>Number(pageInput.value)?1:-1;pageInput.value=link.getAttribute('data-pagination-page');update();const target=output.querySelector(`[data-pagination-page="${Number(pageInput.value)+direction}"]`)||output.querySelector('a');if(target instanceof HTMLElement)target.focus();});
const tabs=entityPage.querySelector('[data-pagination-tabs]>.rf-tab-list'),sync=()=>requestAnimationFrame(()=>updateQuery('paginationTab',tabs.querySelector('[aria-selected="true"]').id==='pg-pagination-tab'?'pagination':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-pagination-stage]')),toggle=entityPage.querySelector('[data-pagination-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;stage.style.color=String(model.foundations.colors.records.find(r=>r.name==='color.context.text.primary.default')[key].resolved);stage.style.setProperty('--rf-text-secondary',String(model.foundations.colors.records.find(r=>r.name==='color.context.text.secondary.default')[key].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function emptyStatePreview(title='Пока нет объявлений',description='Создайте первое объявление.',action='Создать объявление',hidden=false) {
return `<div class="rf-empty-state"${hidden?' hidden':''}><div class="rf-empty-state__media"><img class="rf-image catalog-empty-state-illustration" src="../../illustrations/empty-sprout-3d.png" alt=""></div><strong class="rf-empty-state__title rf-text rf-text--headline-s">${escapeHtml(title)}</strong>${description?`<p class="rf-empty-state__description rf-text rf-text--body-s">${escapeHtml(description)}</p>`:''}${action?`<div class="rf-empty-state__actions"><button type="button" class="rf-button rf-button--primary">${escapeHtml(action)}</button></div>`:''}</div>`;
}
function renderEmptyStateEntity(item) {
const entry=item.registry,active=new URLSearchParams(location.search).get('emptyStateTab')==='empty-state'?'empty-state':'anatomy';
const parameter=(name,title,hint,value)=>`<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span><input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${title}" value="${escapeAttribute(value)}"></div>`;
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${emptyStatePreview()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Image</strong><span>Необязательная декоративная иллюстрация.</span></li><li><strong>Title</strong><span>Объясняет, каких данных пока нет.</span></li><li><strong>Description</strong><span>Причина и следующий шаг.</span></li><li><strong>Action</strong><span>Уместное действие: создать запись или изменить фильтры.</span></li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Нет объявлений, откликов или данных в отчёте. При первом входе объясните, с чего начать; при пустом поиске предложите изменить фильтры.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для загрузки используйте Skeleton, для сбоя — Error State. Не показывайте пустое состояние до завершения загрузки.</p></section></div><p class="catalog-callout">Stable · Template из Image, Text, Button и Stack. Hidden исключает блок из раскладки. В динамическом списке продукт сообщает результат через status; иллюстрация не повторяет текст для скринридера.</p></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage" data-empty-state-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-empty-state-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-empty-state-preview" data-empty-state-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Empty State">${parameter('title','Title','Краткое объяснение','Пока нет объявлений')}${parameter('description','Description','Пояснение; оставьте пустым, чтобы скрыть','Создайте первое объявление.')}${parameter('action','Action','Текст кнопки; пустое значение скрывает её','Создать объявление')}<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>State</strong><span>Видимость блока</span></span><select class="rf-text-field" name="state" aria-label="State"><option value="visible">Visible</option><option value="hidden">Hidden</option></select></div></form><p class="rf-text rf-text--body-small rf-text--secondary" role="status" data-empty-state-result>Нажмите кнопку или перейдите к ней клавишей Tab.</p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Empty State</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-empty-state-preview" inert>${emptyStatePreview()}</div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-empty-state-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Empty State">${[['anatomy','Anatomy'],['empty-state','Empty State']].map(([key,label])=>`<button class="rf-tab" type="button" id="es-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="es-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['empty-state',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="es-${key}-panel" aria-labelledby="es-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-empty-state-output]'),result=entityPage.querySelector('[data-empty-state-result]');
const update=()=>{const data=new FormData(form);output.innerHTML=emptyStatePreview(String(data.get('title')||'Пока нет объявлений'),String(data.get('description')||''),String(data.get('action')||''),data.get('state')==='hidden');};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('input',update);update();output.addEventListener('click',()=>{result.textContent='Действие выполнено в превью.';});
const tabs=entityPage.querySelector('[data-empty-state-tabs]>.rf-tab-list');const sync=()=>requestAnimationFrame(()=>updateQuery('emptyStateTab',tabs.querySelector('[aria-selected="true"]').id==='es-empty-state-tab'?'empty-state':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-empty-state-stage]')),toggle=entityPage.querySelector('[data-empty-state-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;for(const [alias,name] of [['--rf-text-primary','color.context.text.primary.default'],['--rf-text-secondary','color.context.text.secondary.default']])stage.style.setProperty(alias,String(model.foundations.colors.records.find(r=>r.name===name)[key].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function alertPreview(title='Объявление на проверке',description='Обычно проверка занимает несколько минут.',action='Подробнее',variant='neutral',showIcon=true,close=true,state='visible',iconGlyph='',iconStyle='solid') {
const tone=['neutral','brand','info','success','warning','error'].includes(variant)?variant:'neutral';
const glyph=iconGlyph||{neutral:'info-cr-fr',brand:'info-cr-fr',info:'info-cr-fr',success:'check-cr-fr',warning:'warning',error:'close-cr-fr'}[tone];
return `<div class="rf-alert rf-alert--soft rf-alert--${tone}" data-state="${state}"${state==='skeleton'?' inert aria-busy="true" aria-label="Загрузка сообщения"':''}>${showIcon?`<span class="rf-icon rf-icon--md" data-rf-icon-glyph="${escapeAttribute(glyph)}" data-rf-icon-style="${escapeAttribute(iconStyle)}" aria-hidden="true"></span>`:''}<div class="rf-alert__content">${title?`<strong class="rf-alert__title">${escapeHtml(title)}</strong>`:''}${description?`<p class="rf-alert__body rf-text rf-text--body-s">${escapeHtml(description)}</p>`:''}${action?`<div class="rf-alert__actions"><button class="rf-button rf-button--ghost" type="button">${escapeHtml(action)}</button></div>`:''}</div>${close?`<button class="rf-icon-button rf-icon-button--ghost rf-alert__close" type="button" data-rf-alert-close aria-label="Закрыть сообщение"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button>`:''}</div>`;
}
function renderAlertEntity(item) {
const entry=item.registry,active=new URLSearchParams(location.search).get('alertTab')==='alert'?'alert':'anatomy';
const meta = (title, hint) => `<span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>`;
const parameter = (title, hint, control, wrapper = 'label', attrs = '') => `<${wrapper} class="catalog-typography-playground__group catalog-button-playground__parameter" ${attrs}>${meta(title, hint)}${control}</${wrapper}>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected: value === initial})).join('')}</span></span>`;
const textControl = (name, value) => `<input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${({hint:'Description',error:'Error text'})[name] || titleCase(name)}" value="${escapeAttribute(value)}">`;
const optionalText = (title, hint, name, value, toggleName, checked = !!name) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter catalog-button-playground__parameter--${name ? 'subtitle' : 'toggle'}">${meta(title, hint)}<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${toggleName}"${checked ? ' checked' : ''} aria-label="Показать ${title}"><span class="rf-switch__track" aria-hidden="true"></span></span></label>${name ? textControl(name, value) : ''}</div>`;
const controls=parameter('Variant','Тип сообщения',dropdown('variant',entry.variants,'neutral'),'div')
+ parameter('State','Состояние сообщения',dropdown('state',['visible','skeleton'],'visible',{visible:'Default',skeleton:'Skeleton'}),'div')
+ optionalText('Title','Главное в сообщении','title','Объявление на проверке','titleEnabled',true)
+ optionalText('Description','Пояснение к сообщению','description','Обычно проверка занимает несколько минут.','descriptionEnabled',true)
+ optionalText('Icon','Рисунок и стиль иконки',null,null,'iconEnabled',true).replace('</div>',`${iconGlyphControl('alertIcon','info-cr-fr').replaceAll('End icon:', 'Icon:')}</div>`)
+ optionalText('Action','Кнопка следующего действия','action','Подробнее','actionEnabled',true)
+ optionalText('Close','Кнопка закрытия',null,null,'closeEnabled',true);
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${alertPreview()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Icon</strong><span>Помогает распознать сообщение.</span></li><li><strong>Title</strong><span>Кратко сообщает главное.</span></li><li><strong>Description</strong><span>Объясняет ситуацию и следующий шаг.</span></li><li><strong>Action</strong><span>Необязательное текстовое действие.</span></li><li><strong>Close</strong><span>Закрытие необязательного сообщения.</span></li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Важное сообщение должно оставаться внутри страницы: информация, успех, предупреждение или ошибка.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для краткого подтверждения используйте Toast, для ошибки отдельного поля — Text Field, для пустого списка — Empty State.</p></section></div><p class="catalog-callout">Soft: мягкий фон, нейтральный текст и смысловая иконка. Skeleton сохраняет раскладку и исключает действия из взаимодействия. Сообщение не исчезает автоматически. Статический Alert не требует live role. Для динамического сообщения используйте status; alert — только для срочной ошибки. Смысл должен быть понятен по тексту, независимо от цвета.</p></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage" data-alert-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-alert-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-alert-preview" data-alert-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Alert">${controls}</form><p class="rf-text rf-text--body-small rf-text--secondary" role="status" data-alert-result hidden></p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Alert</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" inert><div class="catalog-alert-preview">${alertPreview()}</div></div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-alert-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Alert">${[['anatomy','Anatomy'],['alert','Alert']].map(([key,label])=>`<button class="rf-tab" type="button" id="al-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="al-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['alert',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="al-${key}-panel" aria-labelledby="al-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-alert-output]'),result=/** @type {HTMLElement} */(entityPage.querySelector('[data-alert-result]'));
const update=()=>{const data=new FormData(form);output.innerHTML=alertPreview(data.has('titleEnabled')?String((/** @type {HTMLInputElement} */(form.elements.namedItem('title'))).value):'',data.has('descriptionEnabled')?String((/** @type {HTMLInputElement} */(form.elements.namedItem('description'))).value):'',data.has('actionEnabled')?String((/** @type {HTMLInputElement} */(form.elements.namedItem('action'))).value):'',String(data.get('variant')||'neutral'),data.has('iconEnabled'),data.has('closeEnabled'),String(data.get('state')||'visible'),String(data.get('alertIconGlyph')||'info-cr-fr'),String(data.get('alertIconStyle')||'line'));for(const trigger of form.querySelectorAll('[data-icon-slot-control] [data-rf-dropdown-trigger]'))(/** @type {HTMLButtonElement} */(trigger)).disabled=!data.has('iconEnabled');for(const name of ['title','description','action'])(/** @type {HTMLInputElement} */(form.elements.namedItem(name))).disabled=!data.has(name+'Enabled');result.hidden=true;};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('input',update);form.addEventListener('change',event=>{if(event.target instanceof HTMLInputElement&&event.target.type==='hidden')update();});update();loadIconGlyphControls(form);output.addEventListener('click',event=>{if(!(event.target instanceof Element)||!event.target.closest('button'))return;if(event.target.closest('[data-rf-alert-close]'))return;result.hidden=false;result.textContent='Действие выполнено в превью.';});
output.addEventListener('rf:alert-dismiss',event=>requestAnimationFrame(()=>{if(event.defaultPrevented)return;result.hidden=false;result.textContent='Сообщение закрыто. Измените любой параметр, чтобы показать его снова.';(/** @type {HTMLElement} */(form.querySelector('[data-rf-dropdown-trigger]'))).focus();}));
const tabs=entityPage.querySelector('[data-alert-tabs]>.rf-tab-list');const sync=()=>requestAnimationFrame(()=>updateQuery('alertTab',tabs.querySelector('[aria-selected="true"]').id==='al-alert-tab'?'alert':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-alert-stage]')),toggle=entityPage.querySelector('[data-alert-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;for(const [alias,name] of [['--rf-text-primary','color.context.text.primary.default'],['--rf-text-secondary','color.context.text.secondary.default']])stage.style.setProperty(alias,String(model.foundations.colors.records.find(r=>r.name===name)[key].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));for(const group of ['button','icon'])for(const record of model.foundations.componentTokenTrace[group]||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function toastPreview(message='Изменения сохранены',showIcon=true,close=true,glyph='check-cr-fr',iconStyle='solid',id='') {
return `<div class="rf-toast" data-variant="success"${id?` id="${id}"`:''}>${showIcon?`<span class="rf-icon rf-icon--md" data-rf-icon-glyph="${escapeAttribute(glyph)}" data-rf-icon-style="${escapeAttribute(iconStyle)}" aria-hidden="true"></span>`:''}<span class="rf-toast__content">${escapeHtml(message)}</span>${close?`<button class="rf-toast__close" type="button" data-rf-toast-close aria-label="Закрыть сообщение"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button>`:''}</div>`;
}
function renderToastEntity(item) {
const entry=item.registry,active=new URLSearchParams(location.search).get('toastTab')==='toast'?'toast':'anatomy';
const meta = (title, hint) => `<span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>`;
const parameter = (title, hint, control, wrapper = 'label', attrs = '') => `<${wrapper} class="catalog-typography-playground__group catalog-button-playground__parameter" ${attrs}>${meta(title, hint)}${control}</${wrapper}>`;
const dropdown = (name, values, initial, labels = {}) => `<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${initial}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${titleCase(name)}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(value => dropdownItem(value, labels[value] || titleCase(value), {selected: value === initial})).join('')}</span></span>`;
const textControl = (name, value) => `<input class="rf-text-field catalog-typography-playground__text" name="${name}" aria-label="${({hint:'Description',error:'Error text'})[name] || titleCase(name)}" value="${escapeAttribute(value)}">`;
const optionalText = (title, hint, name, value, toggleName, checked = !!name) => `<div class="catalog-typography-playground__group catalog-button-playground__parameter catalog-button-playground__parameter--${name ? 'subtitle' : 'toggle'}">${meta(title, hint)}<label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${toggleName}"${checked ? ' checked' : ''} aria-label="Показать ${title}"><span class="rf-switch__track" aria-hidden="true"></span></span></label>${name ? textControl(name, value) : ''}</div>`;
const controls=parameter('Variant','Тип сообщения',dropdown('variant',entry.variants,'success'),'div')
+ parameter('Width','Ширина сообщения',dropdown('width',['compact','content'],'content'),'div')
+ parameter('Message','Краткое сообщение о результате',textControl('message','Изменения сохранены'))
+ optionalText('Icon','Рисунок и стиль иконки',null,null,'iconEnabled',true).replace('</div>',`${iconGlyphControl('toastIcon','check-cr-fr').replaceAll('End icon:', 'Icon:')}</div>`)
+ optionalText('Close','Кнопка закрытия',null,null,'closeEnabled',true);
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage" inert>${toastPreview()}</div><ol class="catalog-button-anatomy__parts"><li><strong>Icon</strong><span>Уточняет смысл сообщения.</span></li><li><strong>Message</strong><span>Краткий результат действия.</span></li><li><strong>Close</strong><span>Позволяет закрыть сообщение.</span></li></ol></div><div class="catalog-do-dont"><section class="catalog-do"><h2>Use when</h2><p>Нужно подтвердить сохранение или завершение фонового действия, не прерывая работу.</p></section><section class="catalog-dont"><h2>Don’t use when</h2><p>Для постоянного важного сообщения используйте Alert, для ошибки поля — Text Field.</p></section></div><p class="catalog-callout">Toast остаётся Beta: общий Core поддерживает показ и закрытие. Core управляет таймером: 5 секунд по умолчанию, ошибки — до закрытия. Повторное сообщение не перезапускает таймер. Таймер приостанавливается при наведении, фокусе и скрытой вкладке. Очередь и анимация переходов пока не реализованы. Динамические сообщения объявляйте через aria-live="polite", не переводя фокус. В Playground Toast виден постоянно; после закрытия превью возвращается через 1 секунду.</p></section>`;
const playground=`<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4"><div class="catalog-dimension-playground__stage" data-toast-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-toast-theme aria-label="Переключить тему превью" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-toast-preview rf-toast-region rf-toast-region--content" data-toast-output></div></div><form class="catalog-typography-playground__controls" aria-label="Параметры Toast">${controls}</form><p class="rf-text rf-text--body-small rf-text--secondary" role="status" data-toast-result hidden></p></section></section>`;
entityPage.dataset.dsName=entry.name;entityPage.dataset.dsLevel=entry.level;entityPage.dataset.dsStatus=entry.status;
entityPage.innerHTML=`<header class="catalog-color-hero catalog-button-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Toast</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(entry.summary)}</p></div><div class="catalog-color-hero__media"><div class="catalog-button-anatomy__stage" inert><div class="catalog-toast-preview">${toastPreview()}</div></div></div></header><div class="rf-tabs catalog-button-tabs" data-rf-tabs data-toast-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Toast">${[['anatomy','Anatomy'],['toast','Toast']].map(([key,label])=>`<button class="rf-tab" type="button" id="to-${key}-tab" role="tab" aria-selected="${active===key}" aria-controls="to-${key}-panel" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['toast',playground]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="to-${key}-panel" aria-labelledby="to-${key}-tab" tabindex="0"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
const form=entityPage.querySelector('form'),output=entityPage.querySelector('[data-toast-output]'),result=/** @type {HTMLElement} */(entityPage.querySelector('[data-toast-result]'));
const iconStyleInput=/** @type {HTMLInputElement | null} */(form.querySelector('[name=toastIconStyle]'));if(iconStyleInput)iconStyleInput.value='solid';
const update=()=>{const data=new FormData(form);output.classList.toggle('rf-toast-region--content',data.get('width')==='content');const previous=output.querySelector('.rf-toast');if(previous)window.ReflowerUI.dismissToast(/** @type {HTMLElement} */(previous),'replace');output.innerHTML=toastPreview(String(data.get('message')||''),data.has('iconEnabled'),data.has('closeEnabled'),String(data.get('toastIconGlyph')||'check-cr-fr'),String(data.get('toastIconStyle')||'solid'),'catalog-toast-live');const host=output.querySelector('.rf-toast');host.setAttribute('data-variant',String(data.get('variant')));host.setAttribute('data-rf-toast-duration',String(data.get('duration')));host.setAttribute('data-rf-toast-persistent',String(!data.has('closeEnabled')||data.get('duration')==='0'||data.get('variant')==='error'));for(const trigger of form.querySelectorAll('[data-icon-slot-control] [data-rf-dropdown-trigger]'))(/** @type {HTMLButtonElement} */(trigger)).disabled=!data.has('iconEnabled');result.hidden=true;};
form.addEventListener('submit',event=>event.preventDefault());form.addEventListener('input',event=>{if(event.target instanceof HTMLInputElement&&event.target.name==='variant'){const glyph=({info:'info-cr-fr',success:'check-cr-fr',warning:'warning',error:'close-cr-fr'})[event.target.value];const input=/** @type {HTMLInputElement} */(form.elements.namedItem('toastIconGlyph'));input.value=glyph;input.dispatchEvent(new Event('input',{bubbles:true}));}update();});form.addEventListener('change',event=>{if(event.target instanceof HTMLInputElement&&event.target.type==='hidden')update();});update();loadIconGlyphControls(form);
output.addEventListener('rf:toast-dismiss',event=>{if(!(event instanceof CustomEvent)||event.detail.reason!=='manual'||!(event.target instanceof HTMLElement))return;const host=event.target;if(host.contains(document.activeElement))(/** @type {HTMLElement} */(entityPage.querySelector('#to-toast-panel'))).focus();window.setTimeout(()=>{if(host.isConnected&&host.hidden)host.hidden=false;},1000);});
const tabs=entityPage.querySelector('[data-toast-tabs]>.rf-tab-list');const sync=()=>requestAnimationFrame(()=>updateQuery('toastTab',tabs.querySelector('[aria-selected="true"]').id==='to-toast-tab'?'toast':''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
const stage=/** @type {HTMLElement} */(entityPage.querySelector('[data-toast-stage]')),toggle=entityPage.querySelector('[data-toast-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;for(const [alias,name] of [['--rf-text-primary','color.context.text.primary.default'],['--rf-text-secondary','color.context.text.secondary.default']])stage.style.setProperty(alias,String(model.foundations.colors.records.find(r=>r.name===name)[key].resolved));for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));for(const group of ['button','icon','toast'])for(const record of model.foundations.componentTokenTrace[group]||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}

function primitiveControl(name,title,hint,values) {
const control=Array.isArray(values)?`<span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" value="${values[0]}" data-rf-dropdown-input><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${title}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel hidden>${values.map(v=>dropdownItem(v,name==='size'?({xs:'XS',sm:'S',md:'M',lg:'L',xl:'XL'}[v]||titleCase(v)):titleCase(v),{selected:v===values[0]})).join('')}</span></span>`:`<input class="rf-text-field" name="${name}" aria-label="${title}" value="${escapeAttribute(values)}">`;
return `<div class="catalog-typography-playground__group catalog-button-playground__parameter"><span class="catalog-typography-playground__meta"><strong>${title}</strong><span class="rf-text rf-text--caption rf-text--secondary">${hint}</span></span>${control}</div>`;
}
function primitivePreview(name, options = {}) {
const o={align:'stretch',justify:'start',gap:'4',grow:'false',wrap:'wrap',mobile:'none',text:'Пример текста Contour',style:'body-m',color:'primary',ratio:'square',count:'4',size:'md',state:'active',appearance:'inherit',showLabel:'visible',label:'Загрузка…',layout:'default',item:'1',itemSize:'inherit',itemAlign:'inherit',span:'1',mode:'single',months:'1',locale:'ru',bounds:'none',weekdays:'false',...options};
const blocks=Array.from({length:Number(o.count)},(_,i)=>`<span class="catalog-layout-sample rf-text rf-text--body-m"${i===Number(o.item)-1?(name==='Grid'?` data-rf-grid-span="${o.span}"`:` data-rf-item-size="${o.itemSize}" data-rf-item-align="${o.itemAlign}"`):''}>${i+1}${i===1?' · Более длинный текст':''}</span>`).join('');
if(name==='Calendar')return `<div data-rf-calendar data-mode="${o.mode}" data-months="${o.months}" data-locale="${o.locale}" data-state="${o.state}" data-month="2026-09" data-value="2026-09-15" data-start="2026-09-10" data-end="2026-09-18" data-weekdays="${o.weekdays}"${o.bounds==='limited'?' data-min="2026-09-05" data-max="2026-10-20"':''}></div>`;
if(name==='Spinner')return `<div class="rf-inline rf-inline--gap-3 catalog-spinner-preview" data-justify="center" aria-busy="true" data-spinner-state="${o.state}" data-spinner-appearance="${o.appearance}"><span class="rf-spinner rf-spinner--${o.size}${o.appearance==='inverse'?' rf-spinner--inverse':''}" aria-hidden="true"></span><span class="rf-sr-only">Загрузка…</span></div>`;
if(name==='Stack'||name==='Inline')return `<div class="rf-${name.toLowerCase()} rf-${name.toLowerCase()}--gap-${o.gap} catalog-layout-demo" data-align="${o.align}" data-justify="${o.justify}" data-grow="${o.grow}" data-wrap="${o.wrap}"${o.mobile==='none'?'':` data-rf-layout-mobile="${o.mobile}"`}>${blocks}</div>`;
if(name==='Grid')return `<div class="rf-layout-grid rf-layout-grid--${o.layout} catalog-layout-demo">${blocks}</div>`;
if(name==='Text')return `<p class="rf-text rf-text--${escapeAttribute(o.style)} rf-text--${escapeAttribute(o.color)}">${escapeHtml(o.text)}</p>`;
if(name==='AspectRatio')return `<div class="rf-aspect-ratio rf-aspect-ratio--${o.ratio} catalog-ratio-demo"><img class="rf-image" src="../../illustrations/profile-listings-card-3d.png" alt="Букет"></div>`;
if(name==='SafeArea')return '<div class="catalog-safe-area-demo"><div class="rf-safe-area"><p class="rf-text rf-text--body-m">Содержимое внутри безопасной области</p></div></div>';
return `<button class="rf-icon-button rf-icon-button--secondary" type="button"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span><span class="rf-sr-only">${escapeHtml(o.text)}</span></button>`;
}
function primitivePlayground(name) {
const layout=['Stack','Inline'].includes(name);
const controls=name==='Calendar'?primitiveControl('mode','Mode','Выбор даты или периода',['single','range'])+primitiveControl('months','Months','Количество месяцев',['1','2'])+primitiveControl('state','State','Состояние календаря',['default','disabled','skeleton'])+primitiveControl('locale','Language','Язык календаря',['ru','en','ky','uz'])+primitiveControl('bounds','Bounds','Ограничение дат',['none','limited'])+primitiveControl('weekdays','Weekdays only','Выбор только рабочих дней',['false','true']):name==='Spinner'?primitiveControl('size','Size','Размер индикатора',['md','sm','lg'])+primitiveControl('state','State','Active — вращение; Reduced motion — превью без движения',['active','reduced-motion'])+primitiveControl('appearance','Appearance','Цвет индикатора',['inherit','inverse']):layout ? primitiveControl('align','Align','Выравнивание поперёк направления',['stretch','start','center','end'])+primitiveControl('justify','Justify','Распределение вдоль направления',['start','center','end','between'])+primitiveControl('gap','Gap','Системный промежуток',['4','1','3'])+primitiveControl('grow','Grow','Элементы делят свободное место',['false','true'])+primitiveControl('wrap','Wrap','Перенос при нехватке места',['wrap','nowrap'])+primitiveControl('mobile','Mobile direction','Направление при ширине до breakpoint.sm',['none','column','row'])+primitiveControl('item','Item','Элемент, к которому применяются настройки',['1','2','3','4'])+primitiveControl('itemSize','Item size','Inherit — как у контейнера; Grow — свободное место; Content — по содержимому; Fixed — без сжатия',['inherit','grow','content','fixed'])+primitiveControl('itemAlign','Item align','Выравнивание выбранного элемента',['inherit','start','center','end','stretch']) : name==='Grid'?primitiveControl('layout','Layout','Минимальная ширина: Default 280, Compact 160, Wide 376',['default','compact','wide'])+primitiveControl('count','Items','Проверьте одиночную карточку и неполный ряд',['4','1','2','5','7'])+primitiveControl('span','First item span','Колонки первого блока; All — весь ряд. На узком экране число колонок ограничивается доступным.',['1','2','3','all']):name==='Text'?primitiveControl('text','Text','Текст и перенос длинных строк','Пример текста Contour')+primitiveControl('style','Style','Публичные стили Typography',['body-m','body-s','title-m','headline-xs'])+primitiveControl('color','Color','Семантическая роль цвета',['primary','secondary','brand']):name==='AspectRatio'?primitiveControl('ratio','Ratio','Пропорции зарезервированной области',['square','portrait','landscape','product']):name==='VisuallyHidden'?primitiveControl('text','Accessible label','Невидимая подпись кнопки для скринридера','Поиск объявлений'):'';
return `<section class="catalog-button-playground-section rf-stack rf-stack--gap-4"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Playground</h2></header><section class="catalog-dimension-playground catalog-button-playground rf-stack rf-stack--gap-4" data-primitive-playground="${name}"><div class="catalog-dimension-playground__stage" data-primitive-stage><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" aria-label="Переключить тему превью" aria-pressed="false" data-primitive-theme><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" aria-hidden="true"></span></button><div class="catalog-primitive-output" data-primitive-output>${primitivePreview(name)}</div></div>${controls?`<form class="catalog-typography-playground__controls" aria-label="Параметры ${name}">${controls}</form>`:''}${['Spinner','Calendar'].includes(name)?'':`<p class="rf-text rf-text--body-small rf-text--secondary" data-primitive-note>${name==='Spinner'?'Spinner сообщает об ожидании. Reduced motion учитывает настройки устройства.':name==='SafeArea'?'Использует реальные safe-area-inset устройства. В обычном браузере они могут быть равны нулю.':name==='VisuallyHidden'?'Видна только иконка, но кнопка получает доступное имя из скрытого текста.':'Измените ширину окна: адаптив использует Foundation и сохраняет порядок элементов.'}</p>`}</section></section>`;
}
function bindPrimitivePlayground(root,name) {
const form=root.querySelector('form'),output=root.querySelector('[data-primitive-output]');
if(form){const update=()=>{output.innerHTML=primitivePreview(name,Object.fromEntries(new FormData(form)));};form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('input',update);form.addEventListener('change',update);}
const stage=root.querySelector('[data-primitive-stage]'),toggle=root.querySelector('[data-primitive-theme]');let dark=false;
const theme=()=>{const key=dark?'dark':'light';stage.dataset.previewTheme=key;stage.style.colorScheme=key;for(const record of model.foundations.colors.records.filter(r=>r.layer==='context'&&r[key]))stage.style.setProperty('--rf-'+record.name.replaceAll('.','-'),String(record[key].resolved));for(const [alias,name]of[['--rf-text-primary','color.context.text.primary.default'],['--rf-text-secondary','color.context.text.secondary.default']])stage.style.setProperty(alias,String(model.foundations.colors.records.find(r=>r.name===name)[key].resolved));for(const record of model.foundations.componentTokenTrace.button||[])if(record.themeDependent)stage.style.setProperty('--rf-'+record.name.replace(/^component\./,'').replace(/([a-z])([A-Z])/g,'$1-$2').replaceAll('.','-').toLowerCase(),String(record[key].resolved));stage.style.background=String(model.foundations.colors.records.find(r=>r.name==='color.context.background.canvas')[key].resolved);toggle.setAttribute('aria-pressed',String(dark));};toggle.addEventListener('click',()=>{dark=!dark;theme();});theme();
}
function renderPrimitiveEntity(item) {
const e=item.registry,name=e.name,queryKey=name==='Calendar'?'calendarTab':name==='Spinner'?'spinnerTab':'primitiveTab',queryValue=name==='Calendar'?'calendar':name==='Spinner'?'spinner':'playground',active=new URLSearchParams(location.search).get(queryKey)===queryValue?'playground':'anatomy';
const descriptions={Calendar:['Месяц и год с кнопками переключения','Сетка из семи столбцов: неделя начинается с понедельника','Выбранная дата, диапазон и отметка сегодняшнего дня','Стрелки — дни; Home/End — неделя; Page Up/Down — месяц; Shift — год'],Spinner:['Индикатор: декоративное кольцо, скрытое от скринридера','Size: S — 12, M — 16, L — 24','Сообщение о загрузке и aria-busy у области','Уважение системной настройки уменьшения движения'],Grid:['Колонки с минимальной шириной из Foundation','Системный промежуток между блоками','Span: одна, несколько колонок или весь ряд','Неполный ряд сохраняет ширину карточек; адаптив не меняет порядок DOM'],Stack:['Вертикальное направление','Gap между элементами','Align и Justify','Адаптив без перестановки DOM'],Inline:['Горизонтальное направление','Gap и перенос','Выравнивание и растягивание','Направление на телефоне'],Text:['Семантический HTML-тег','Стиль из Typography','Семантический цвет','Перенос длинного текста'],AspectRatio:['Контейнер с пропорциями','Изображение внутри области','Место зарезервировано до загрузки'],SafeArea:['Отступы env(safe-area-inset-*)','Содержимое внутри безопасных границ','Отступы определяются устройством'],VisuallyHidden:['Текст остаётся в дереве доступности','Визуально скрытая область','Доступное имя элемента управления']};
const anatomy=`<section class="catalog-button-tab-section rf-stack rf-stack--gap-8"><div class="catalog-button-anatomy__layout"><div class="catalog-button-anatomy__stage"><div class="catalog-primitive-output">${primitivePreview(name)}</div></div><ol class="catalog-button-anatomy__parts">${descriptions[name].map(t=>`<li>${t}</li>`).join('')}</ol></div><p class="catalog-callout">${escapeHtml(e.purpose)} ${name==='Grid'?'<a class="rf-link" href="#foundations/grid">Правила, брейкпоинты и поля в Foundation Grid</a>':''} ${['Stack','Inline'].includes(name)?'Выравнивание не меняет порядок чтения и клавиатурного перехода. Цвет, отступы и брейкпоинты принадлежат Foundation.':''}</p></section>`;
entityPage.dataset.dsName=name;entityPage.dataset.dsLevel=e.level;entityPage.dataset.dsStatus=e.status;
entityPage.innerHTML=`<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">${name}</h1><p class="rf-text rf-text--body-large rf-text--secondary">${escapeHtml(e.summary)}</p></div><div class="catalog-color-hero__media"><div${['Spinner','Calendar'].includes(name)?' class="catalog-button-anatomy__stage"':''} inert aria-hidden="true"><div class="catalog-primitive-output">${primitivePreview(name)}</div></div></div></header><div class="rf-tabs" data-rf-tabs data-primitive-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы ${name}">${[['anatomy','Anatomy'],['playground',name]].map(([key,label])=>`<button class="rf-tab" role="tab" type="button" id="pr-${key}-tab" aria-controls="pr-${key}-panel" aria-selected="${active===key}" tabindex="${active===key?0:-1}">${label}</button>`).join('')}</div>${[['anatomy',anatomy],['playground',primitivePlayground(name)]].map(([key,content])=>`<section class="rf-tab-panel" role="tabpanel" id="pr-${key}-panel" aria-labelledby="pr-${key}-tab"${active===key?'':' hidden'}>${content}</section>`).join('')}</div>`;
bindPrimitivePlayground(entityPage.querySelector('[data-primitive-playground]'),name);
const tabs=entityPage.querySelector('[data-primitive-tabs]');const sync=()=>requestAnimationFrame(()=>updateQuery(queryKey,tabs.querySelector('[role="tab"][aria-selected="true"]').id==='pr-playground-tab'?queryValue:''));tabs.addEventListener('click',sync);tabs.addEventListener('keydown',sync);
}
function renderEntity(item) {
if(['Spinner','Calendar'].includes(item.registry.name)){renderPrimitiveEntity(item);return;}
if (item.registry.name === 'Toast') {renderToastEntity(item);return;}
if (item.registry.name === 'Alert') {renderAlertEntity(item);return;}
if (item.registry.name === 'EmptyState') {renderEmptyStateEntity(item);return;}
if (item.registry.name === 'Pagination') {renderPaginationEntity(item);return;}
if (item.registry.name === 'Banner') {renderBannerEntity(item);return;}
if (item.registry.name === 'ListItem') {renderListItemEntity(item);return;}
if (item.registry.name === 'Dropdown') {renderDropdownEntity(item);return;}
if (item.registry.name === 'ListingCard') {renderListingCardEntity(item);return;}
const entry = item.registry;
if(entry.level==='primitive' && entry.status!=='deprecated'){renderPrimitiveEntity(item);return;}
if (entry.name === 'Image') {
renderImageEntity(item);
return;
}
if (entry.name === 'Breadcrumbs') {
renderBreadcrumbsEntity(item);
return;
}
if (entry.name === 'Slider') {
renderSliderEntity(item);
return;
}
if (entry.name === 'NavigationBar') { renderTabBarEntity(item); return; }
if (entry.name === 'TabBar') { renderTabBarEntity(item); return; }
if (entry.name === 'Counter') {
renderCounterEntity(item);
return;
}
if (entry.name === 'SegmentedControl') {
renderSegmentedEntity(item);
return;
}
if (entry.name === 'Chip') {
renderChipEntity(item);
return;
}
if (entry.name === 'Radio') {
renderRadioEntity(item);
return;
}
if (entry.name === 'Checkbox') {
renderCheckboxEntity(item);
return;
}
if (entry.name === 'Avatar') {
renderAvatarEntity(item);
return;
}
if (entry.name === 'Tabs') {
renderTabsEntity(item);
return;
}
if (entry.name === 'Badge') {
renderBadgeEntity(item);
return;
}
if (entry.name === 'Switch') {
renderSwitchEntity(item);
return;
}
if (entry.name === 'Icon') {
renderIconEntity(item).then(() => applySectionVersion(entityPage, item.route)).catch(() => {
  if (location.hash === '#components/icon') entityPage.innerHTML = '<p role="alert">Не удалось загрузить Icon. Обновите страницу.</p>';
});
return;
}
if (entry.name === 'TextField') {
renderTextFieldEntity(item);
return;
}
if (entry.name === 'Button') {
renderButtonEntity(item);
return;
}
const entitySectionVersion = sectionVersion(item.route);
const guidance = model.guidance.components[entry.name] || defaultGuidance(entry);
const canonicalPlatforms = new Set(entry.implementation.canonical.map(record => record.platform));
const targetPlatforms = new Set(entry.platforms);
const related = entries.filter(candidate => candidate.registry.status !== 'deprecated' && candidate.registry.name !== entry.name && (entry.dependencies.includes(candidate.registry.name) || candidate.registry.dependencies.includes(entry.name) || candidate.registry.category === entry.category)).slice(0, 8);
const tokenGroupName = entry.name.charAt(0).toLowerCase() + entry.name.slice(1);
const tokenTrace = model.foundations.componentTokenTrace[tokenGroupName];
const lifecycleWarning = entry.status === 'stable' ? '' : `<p class="catalog-callout ${entry.status === 'deprecated' || entry.status === 'experimental' ? 'catalog-callout--warning' : ''} rf-text rf-text--body-small">${entry.status === 'deprecated' ? `Deprecated: не использовать в новых features. Replacement — ${escapeHtml(entry.replacement)}.` : entry.status === 'experimental' ? 'Experimental: API и platform behavior могут измениться.' : 'Beta: contract используется, но ещё набирает lifecycle evidence.'}</p>`;
entityPage.dataset.dsName = entry.name;
entityPage.dataset.dsLevel = entry.level;
entityPage.dataset.dsStatus = entry.status;
entityPage.innerHTML = pageHeader(`${LEVEL_LABELS[entry.level]} · ${CATEGORY_LABELS[entry.category] || titleCase(entry.category)}`, entry.name, entry.purpose,
`${statusBadge(entry.status)}<button class="rf-button rf-button--secondary" id="catalog-copy-name" type="button">Copy name</button>`) + lifecycleWarning + `
<section class="catalog-section rf-stack rf-stack--gap-6" aria-labelledby="entity-contract-title"><h2 class="rf-text rf-text--heading-h2" id="entity-contract-title">Contract</h2><ul class="catalog-meta-list"><li class="catalog-meta-list__item"><strong>Level</strong><span>${escapeHtml(entry.level)}</span></li><li class="catalog-meta-list__item"><strong>Category</strong><span>${escapeHtml(entry.category)}</span></li><li class="catalog-meta-list__item"><strong>Aliases for discovery</strong><span>${entry.synonyms.length ? entry.synonyms.map(escapeHtml).join(', ') : 'Нет'}</span></li><li class="catalog-meta-list__item"><strong>Section version</strong><span>${escapeHtml(entitySectionVersion)}</span></li></ul></section>
<section class="catalog-section"><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Use when</span>${smallList(guidance.useWhen)}</div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Don’t use when</span>${smallList(guidance.dontUseWhen)}</div></div></section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-anatomy-title"><h2 class="rf-text rf-text--heading-h2" id="entity-anatomy-title">Anatomy</h2><pre class="catalog-anatomy">${escapeHtml([entry.name, ...guidance.anatomy.map(part => `├── ${part}`)].join('\n'))}</pre></section>
${renderPlayground(entry)}
${renderStateMatrix(entry)}
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-api-title"><h2 class="rf-text rf-text--heading-h2" id="entity-api-title">API</h2><div class="catalog-grid"><div class="rf-surface rf-surface--secondary rf-surface--rounded rf-surface--padding-md rf-stack rf-stack--gap-2"><strong>Variants</strong>${smallList(entry.variants)}</div><div class="rf-surface rf-surface--secondary rf-surface--rounded rf-surface--padding-md rf-stack rf-stack--gap-2"><strong>Sizes</strong>${smallList(entry.sizes)}</div><div class="rf-surface rf-surface--secondary rf-surface--rounded rf-surface--padding-md rf-stack rf-stack--gap-2"><strong>States</strong>${smallList(entry.states)}</div></div><h3 class="rf-text rf-text--heading-h3">Canonical symbols</h3>${smallList(entry.implementation.canonical.flatMap(record => record.symbols.map(symbol => `${record.platform}: ${symbol}`)))}</section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-a11y-title"><h2 class="rf-text rf-text--heading-h2" id="entity-a11y-title">Accessibility contract</h2>${smallList(entry.accessibility)}<p class="catalog-callout rf-text rf-text--body-small">Документированный contract и automated tests не являются заявлением о полной accessibility compliance.</p></section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-token-title"><h2 class="rf-text rf-text--heading-h2" id="entity-token-title">Foundation traceability</h2>${tokenTrace ? renderComponentTokenTrace(tokenGroupName, tokenTrace) : '<p class="catalog-callout catalog-callout--warning rf-text rf-text--body-small">Machine token mapping для этого entity пока отсутствует. Catalog не подставляет ручной список и фиксирует это как Design System gap.</p>'}</section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-platform-title"><h2 class="rf-text rf-text--heading-h2" id="entity-platform-title">Platforms</h2><div class="catalog-table-wrap"><table class="catalog-table"><thead><tr><th>Platform</th><th>Target</th><th>Canonical implementation</th><th>Difference / direction</th></tr></thead><tbody>${model.registry.platformCatalog.map(platform => `<tr><td>${escapeHtml(platform)}</td><td>${targetPlatforms.has(platform) ? 'Target' : 'Нет'}</td><td>${canonicalPlatforms.has(platform) ? 'Supported by canonical file' : 'Не подтверждено'}</td><td>${escapeHtml(entry.platformDifferences[platform] || 'Не заявлено')}</td></tr>`).join('')}</tbody></table></div></section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-composition-title"><h2 class="rf-text rf-text--heading-h2" id="entity-composition-title">Composition &amp; related</h2><p class="rf-text rf-text--body-small"><strong>Dependencies:</strong> ${entry.dependencies.length ? entry.dependencies.map(name => `<a class="rf-link" href="#${escapeAttribute(entryByName.get(name)?.route || 'components')}">${escapeHtml(name)}</a>`).join(', ') : 'Нет Registry dependencies.'}</p><div class="rf-inline rf-inline--gap-2">${related.map(candidate => `<a class="rf-chip" href="#${escapeAttribute(candidate.route)}">${escapeHtml(candidate.registry.name)}</a>`).join('') || '<span class="rf-text rf-text--body-small rf-text--secondary">Related entities не найдены.</span>'}</div></section>
<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-lifecycle-title"><h2 class="rf-text rf-text--heading-h2" id="entity-lifecycle-title">Lifecycle &amp; changelog</h2><div class="rf-inline rf-inline--gap-2">${statusBadge(entry.status)}${entry.replacement ? `<a class="rf-badge rf-badge--success" href="#${escapeAttribute(entryByName.get(entry.replacement)?.route || 'components')}">Replacement: ${escapeHtml(entry.replacement)}</a>` : ''}</div><p class="rf-text rf-text--body-small rf-text--secondary">Catalog отражает версию раздела ${escapeHtml(entitySectionVersion)}. Историю можно проследить по независимым версиям разделов и изменениям Registry в Git.</p></section>`;
document.getElementById('catalog-copy-name')?.addEventListener('click', async () => {
await navigator.clipboard.writeText(entry.name);
announce(`Canonical name ${entry.name} скопирован`);
});
wirePlayground(entry);
wirePreviewControls(entityPage);

setTimeout(() => /** @type {NodeListOf<HTMLButtonElement>} */(entityPage.querySelectorAll('[data-catalog-dropdown-open] [data-rf-dropdown-trigger]')).forEach(trigger => trigger.click()), 0);
}
function foundationTraceHref(foundation) {
if (!foundation.route) return '';
const url = new URL(window.location.href);
url.hash = foundation.route;
if (foundation.token) url.searchParams.set('token', foundation.token); else url.searchParams.delete('token');
return `${url.pathname}${url.search}${url.hash}`;
}
function traceChain(name, trace) {
return [name, ...trace].map(part => `<code>${escapeHtml(part)}</code>`).join('<span aria-hidden="true">→</span>');
}
function traceBranches(branches) {
if (!branches?.length) return '';
return `<details class="catalog-token-branches"><summary>Composite branches · ${branches.length}</summary><ul>${branches.map(branch => `<li><code>${escapeHtml(branch.property)}</code><span aria-hidden="true">→</span>${branch.trace.map(part => `<code>${escapeHtml(part)}</code>`).join('<span aria-hidden="true">→</span>')}</li>`).join('')}</ul></details>`;
}
function traceState(name, state, label = '') {
const badge = label ? `<span class="rf-badge rf-badge--sm">${escapeHtml(label)}</span>` : '';
return `<div class="catalog-token-chain">${badge}<span>${traceChain(name, state.trace)}</span>${traceBranches(state.branches)}</div>`;
}
function resolvedState(record) {
if (!record.themeDependent) return `<code>${escapeHtml(formatValue(record.resolved))}</code>`;
return `<div class="catalog-token-resolved"><span><span class="rf-badge rf-badge--sm">Light</span><code>${escapeHtml(formatValue(record.light.resolved))}</code></span><span><span class="rf-badge rf-badge--sm">Dark</span><code>${escapeHtml(formatValue(record.dark.resolved))}</code></span></div>`;
}
function renderComponentTokenTrace(group, records) {
return `<p class="rf-text rf-text--body-small rf-text--secondary">Все ${records.length} DTCG tokens группы <strong>${escapeHtml(group)}</strong>. Source chain строится из canonical JSON и не дублируется вручную.</p><div class="catalog-table-wrap"><table class="catalog-table catalog-component-trace-table"><caption class="rf-sr-only">Complete Component to Foundation token trace</caption><thead><tr><th scope="col">Component token</th><th scope="col">Foundation source</th><th scope="col">Full alias chain</th><th scope="col">Resolved</th></tr></thead><tbody>${records.map(record => { const foundation = record.foundation; const foundationControl = foundation.route ? `<a class="rf-link" href="${escapeAttribute(foundationTraceHref(foundation))}">${escapeHtml(foundation.label)} · <code>${escapeHtml(foundation.token)}</code></a>` : '<span class="rf-badge rf-badge--warning">Component-specific constraint</span>'; const chain = record.themeDependent ? `${traceState(record.name, record.light, 'Light')}${traceState(record.name, record.dark, 'Dark')}` : traceState(record.name, record); return `<tr data-component-token-name="${escapeAttribute(record.name)}" data-component-token-source="${escapeAttribute(formatValue(record.source))}" data-component-token-foundation="${escapeAttribute(foundation.route || 'component-specific')}"><th scope="row"><code>${escapeHtml(record.name)}</code><span class="rf-text rf-text--caption rf-text--secondary">${record.themeDependent ? 'Theme-aware' : 'Shared'}</span></th><td><code>${escapeHtml(formatValue(record.source))}</code>${foundationControl}</td><td>${chain}</td><td>${resolvedState(record)}</td></tr>`; }).join('')}</tbody></table></div>`;
}
function renderPlayground(entry) {
if (entry.name === 'Slider') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><p class="rf-text rf-text--body-small rf-text--secondary">Slider — самостоятельный компонент для приблизительного выбора. Точное число вводится через Number TextField.</p><div class="catalog-playground" data-playground="slider"><form class="catalog-playground__controls rf-stack rf-stack--gap-3"><label class="rf-text-field-group"><span class="rf-text-field__label">Min</span><input class="rf-text-field" name="min" type="number" value="0"></label><label class="rf-text-field-group"><span class="rf-text-field__label">Max</span><input class="rf-text-field" name="max" type="number" value="100"></label><label class="rf-text-field-group"><span class="rf-text-field__label">Step</span><input class="rf-text-field" name="step" type="number" min="0.01" value="1"></label><label class="rf-text-field-group"><span class="rf-text-field__label">Value</span><input class="rf-text-field" name="value" type="number" value="50"></label><label class="rf-choice"><input class="rf-choice__input" name="showValue" type="checkbox" checked><span class="rf-choice__label">Show current value</span></label><label class="rf-choice"><input class="rf-choice__input" name="disabled" type="checkbox"><span class="rf-choice__label">Disabled</span></label></form><div class="catalog-playground__stage">${sliderField('playground-slider', 'Количество цветов', {value: 50, hint: 'Выберите приблизительное количество', limits: true, output: true, outputRoot: true})}</div></div></section>`;
if (entry.name === 'Button') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><div class="catalog-playground" data-playground="button"><form class="catalog-playground__controls rf-stack rf-stack--gap-3"><label class="rf-text-field-group"><span class="rf-text-field__label">Variant</span><select class="rf-select" name="variant">${entry.variants.filter(value => value !== 'iconOnly').map(value => `<option>${escapeHtml(value)}</option>`).join('')}</select></label><label class="rf-text-field-group"><span class="rf-text-field__label">Size</span><select class="rf-select" name="size">${entry.sizes.map(value => `<option>${escapeHtml(value)}</option>`).join('')}</select></label><label class="rf-text-field-group"><span class="rf-text-field__label">Label</span><input class="rf-text-field" name="label" value="Сохранить"></label><label class="rf-choice"><input class="rf-choice__input" name="disabled" type="checkbox"><span class="rf-choice__label">Disabled</span></label><label class="rf-choice"><input class="rf-choice__input" name="loading" type="checkbox"><span class="rf-choice__label">Loading</span></label></form><div class="catalog-playground__stage"><button class="rf-button rf-button--primary" type="button" data-playground-output>Сохранить</button></div></div></section>`;
if (entry.name === 'FilterBar') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><div class="catalog-playground" data-playground="filter-bar"><form class="catalog-playground__controls rf-stack rf-stack--gap-3"><label class="rf-text-field-group"><span class="rf-text-field__label">Variant</span><select class="rf-select" name="variant">${entry.variants.map(value => `<option>${escapeHtml(value)}</option>`).join('')}</select></label><label class="rf-choice"><input class="rf-choice__input" name="filtered" type="checkbox"><span class="rf-choice__label">Active filters</span></label><label class="rf-choice"><input class="rf-choice__input" name="loading" type="checkbox"><span class="rf-choice__label">Loading</span></label><label class="rf-choice"><input class="rf-choice__input" name="disabled" type="checkbox"><span class="rf-choice__label">Disabled</span></label></form><div class="catalog-playground__stage"><section class="rf-filter-bar rf-filter-bar--inline" aria-labelledby="catalog-filter-playground-title" data-playground-output><h3 class="rf-sr-only" id="catalog-filter-playground-title">Фильтры объявлений</h3><div class="rf-filter-bar__controls"><div class="rf-filter-bar__group"><button class="rf-chip" type="button" aria-pressed="true">Все типы</button><button class="rf-chip" type="button" aria-pressed="false">Букет</button><button class="rf-chip" type="button" aria-pressed="false">Растение</button></div></div><div class="rf-filter-bar__active" hidden><span class="rf-badge rf-badge--brand">Букет</span><button class="rf-button rf-button--tertiary rf-button--s rf-filter-bar__clear" type="button">Сбросить</button></div><div class="rf-filter-bar__meta"><p class="rf-filter-bar__status" aria-live="polite">12 объявлений</p></div></section></div></div></section>`;
if (entry.name === 'Thumbnail') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><div class="catalog-playground__stage"><span class="rf-thumbnail rf-thumbnail--product catalog-thumbnail-preview" data-state="loaded"><img class="rf-image" src="../../illustrations/profile-listings-card-3d.png" alt="Декоративная композиция букета"></span></div></section>`;
if (entry.name === 'CardList') {
const specimen=document.querySelector('[data-listing-card-specimen]').outerHTML;
return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><div class="rf-card-list-container"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><p class="rf-text rf-text--body-small rf-text--secondary">Adaptive grid: 2–4 колонки, предел 1040 px. Меняйте ширину окна и тему в шапке.</p></div><ul class="rf-card-list rf-card-list--adaptive-grid">${Array.from({length:7},()=>`<li class="rf-card-list__item">${specimen}</li>`).join('')}</ul></section>`;
}
if (entry.name === 'ConfirmationDialog') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-playground-title"><h2 class="rf-text rf-text--heading-h2" id="entity-playground-title">Playground</h2><div class="catalog-playground__stage"><div class="rf-dialog rf-confirmation-dialog" role="dialog" aria-labelledby="confirmation-preview-title" aria-describedby="confirmation-preview-message"><header class="rf-dialog__header"><h3 id="confirmation-preview-title">Удалить объявление?</h3></header><div class="rf-dialog__body"><p class="rf-confirmation-dialog__message" id="confirmation-preview-message">Объявление и связанные отклики нельзя будет восстановить.</p></div><footer class="rf-dialog__footer"><button class="rf-button rf-button--secondary" type="button">Отмена</button><button class="rf-button rf-button--danger" type="button">Удалить</button></footer></div></div></section>`;
return `<section class="catalog-section rf-stack rf-stack--gap-3"><h2 class="rf-text rf-text--heading-h2">Playground</h2><p class="rf-text rf-text--body-small rf-text--secondary">Для этого entity отдельный interactive control пока не нужен. Реальные states показаны ниже или в Specimen Lab.</p><a class="rf-button rf-button--secondary" href="#guidelines/specimens">Открыть Specimen Lab</a></section>`;
}
function fieldState(title, content) {
return `<div class="catalog-state-cell"><span>${title}</span>${content}</div>`;
}
function sliderField(id, label, options = {}) {
const min = options.min ?? 0, max = options.max ?? 100, step = options.step ?? 1, value = options.value ?? 50;
const output = options.output ? `<output class="rf-slider-field__value" for="${id}" data-rf-slider-output>${value}</output>` : '';
const limits = options.limits ? `<span class="rf-slider-field__limits" aria-hidden="true"><span data-rf-slider-min>${min}</span><span data-rf-slider-max>${max}</span></span>` : '';
const hint = options.hint ? `<span class="rf-text-field__hint" id="${id}-hint">${escapeHtml(options.hint)}</span>` : '';
return `<div class="rf-text-field-group rf-slider-field" data-rf-slider${options.outputRoot ? ' data-playground-output' : ''}><span class="rf-slider-field__header"><label class="rf-text-field__label" for="${id}">${escapeHtml(label)}</label>${output}</span><input class="rf-slider" id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"${options.disabled ? ' disabled' : ''}${hint ? ` aria-describedby="${id}-hint"` : ''}>${limits}${hint}</div>`;
}
function floatingInput(id, label, attributes = '', error = '') {
const message = error ? `<span class="rf-text-field__error" id="${id}-message">${error}</span>` : '';
return `<div class="rf-text-field-group"><span class="rf-text-field__control"><input class="rf-text-field" id="${id}" ${attributes}><label class="rf-text-field__label" for="${id}">${label}</label></span>${message}</div>`;
}
function passwordInput(id, autocomplete, disabled = false) {
return `<div class="rf-text-field-group"><span class="rf-text-field__control"><input class="rf-text-field rf-text-field--with-action" id="${id}" type="password" name="password" autocomplete="${autocomplete}" ${disabled ? 'disabled' : ''}><label class="rf-text-field__label" for="${id}">Пароль</label><span class="rf-text-field__action"><button class="rf-text-field__action-trigger" type="button" data-rf-password-toggle data-rf-password-show-label="Показать пароль" data-rf-password-hide-label="Скрыть пароль" aria-label="Показать пароль"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="eye" aria-hidden="true"></span></button></span></span></div>`;
}
function datePicker(id, attributes = '', error = '') {
const message = error ? `<span class="rf-text-field__error" id="${id}-message">${error}</span>` : '';
return `<div class="rf-text-field-group"><span class="rf-text-field__control"><input class="rf-text-field rf-text-field--lg rf-text-field--with-action rf-date-picker" id="${id}" type="date" ${attributes}><label class="rf-text-field__label" for="${id}">Дата</label><span class="rf-text-field__action"><button class="rf-text-field__action-trigger" type="button" data-rf-date-trigger aria-label="Открыть календарь"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="calendar" aria-hidden="true"></span></button></span></span>${message}</div>`;
}
function dropdownItem(value, label, options = {}) {
const description = options.description ? `<span class="rf-dropdown__item-description">${options.description}</span>` : '';
const indicator = options.multiple ? '<span class="rf-dropdown__item-indicator"><span class="rf-icon rf-icon--xs" data-rf-icon-glyph="checkmark" aria-hidden="true"></span></span>' : '';
const icon = options.icon ? `<span class="rf-list-item__leading rf-icon rf-icon--sm" data-rf-icon-glyph="${options.icon}" aria-hidden="true"></span>` : '';
const meta = options.meta ? `<span class="rf-list-item__trailing rf-dropdown__item-meta">${options.meta}${options.submenu ? '<span class="rf-icon rf-icon--xs" data-rf-icon-glyph="chevron-right" aria-hidden="true"></span>' : ''}</span>` : '';
const submenu = options.submenu ? ` data-rf-dropdown-submenu-target="${options.submenu}" aria-haspopup="listbox" aria-expanded="false"` : '';
const check = options.multiple || options.submenu ? '' : '<span class="rf-list-item__trailing rf-icon rf-icon--sm rf-dropdown__item-check" data-rf-icon-glyph="checkmark" aria-hidden="true"></span>';
return `<div class="rf-list-item rf-list-item--interactive rf-dropdown__item${options.destructive ? ' rf-dropdown__item--destructive' : ''}" role="option" data-rf-dropdown-item data-value="${value}" aria-selected="${options.selected ? 'true' : 'false'}"${options.disabled ? ' aria-disabled="true"' : ''}${submenu}>${indicator}${icon}<span class="rf-list-item__content rf-dropdown__item-content"><span class="rf-dropdown__item-label" data-rf-dropdown-label>${label}</span>${description}</span>${meta}${check}</div>`;
}
function customDropdown(id, options = {}) {
if (options.editable) {
const value = options.selected === 'moscow' ? 'Москва' : '';
const list = options.empty ? '<p class="rf-dropdown__state" role="status">Ничего не найдено</p>' : options.loading ? '<p class="rf-dropdown__state" role="status">Загружаем варианты…</p>' : ['Москва','Бишкек','Ташкент'].map((label,index) => dropdownItem(['moscow','bishkek','tashkent'][index],label,{icon:'location',selected:options.selected===['moscow','bishkek','tashkent'][index]})).join('');
return `<div class="rf-text-field-group rf-dropdown rf-dropdown--anchored" data-rf-dropdown data-rf-dropdown-mode="selection" data-rf-dropdown-editable><span class="rf-text-field__control"><label class="rf-text-field__label" for="${id}">Город</label><input class="rf-text-field rf-text-field--lg" id="${id}" type="text" value="${value}" placeholder=" " aria-label="Город" data-rf-dropdown-trigger autocomplete="off" data-rf-autofill="off"${options.disabled?' disabled':''}${options.error?' aria-invalid="true"':''}></span><div class="rf-dropdown__panel" data-rf-dropdown-panel role="listbox" aria-label="Города" hidden>${list}<p class="rf-dropdown__state" data-rf-dropdown-empty hidden>Ничего не найдено</p></div><input type="hidden" data-rf-dropdown-input value="${options.selected||''}"></div>`;
}
const selectedValues = Array.isArray(options.selected) ? options.selected : options.selected ? [options.selected] : [];
const selected = selectedValues.join(',');
const disabled = options.disabled ? ' disabled' : '';
const invalid = options.error ? ' aria-invalid="true" aria-describedby="' + id + '-message"' : '';
const message = options.error ? `<span class="rf-text-field__error" id="${id}-message">Выберите город</span>` : '';
const option = (value, label, config = {}) => dropdownItem(value, label, { ...config, multiple: options.multiple, selected: selectedValues.includes(value) });
let list = [
option('moscow', 'Москва', { description: 'Россия · UTC+3', icon: 'location' }),
option('bishkek', 'Бишкек', { description: 'Кыргызстан · UTC+6', icon: 'location' }),
option('tashkent', 'Ташкент', { description: 'Узбекистан · UTC+5', icon: 'location' }),
option('disabled', 'Недоступный вариант', { disabled: true }),
].join('');
if (options.grouped) list = `<div class="rf-dropdown__group" data-rf-dropdown-group role="group" aria-label="Россия"><span class="rf-dropdown__group-label">Россия</span>${option('moscow', 'Москва', { icon: 'location' })}${option('kazan', 'Казань', { icon: 'location' })}</div><div class="rf-dropdown__group" data-rf-dropdown-group role="group" aria-label="Центральная Азия"><span class="rf-dropdown__group-label">Центральная Азия</span>${option('bishkek', 'Бишкек', { icon: 'location' })}${option('tashkent', 'Ташкент', { icon: 'location' })}${option('disabled', 'Недоступный вариант', { disabled: true })}</div>`;
if (options.empty) list = '<p class="rf-dropdown__state" data-rf-dropdown-empty>Ничего не найдено</p>';
if (options.loading) list = '<p class="rf-dropdown__state" role="status"><span class="rf-spinner rf-spinner--sm" aria-hidden="true"></span><span>Загружаем варианты…</span></p>';
const search = options.searchable ? '<label class="rf-dropdown__search"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span><input class="rf-dropdown__search-input" type="search" data-rf-dropdown-search placeholder="Поиск" aria-label="Поиск города" autocomplete="off" data-rf-autofill="off"></label><span class="rf-sr-only" data-rf-dropdown-status aria-live="polite"></span>' : '';
const rootAttributes = `${options.multiple ? ' data-rf-dropdown-multiple' : ''}${options.open ? ' data-catalog-dropdown-specimen' : ''}${options.autoOpen ? ' data-catalog-dropdown-open' : ''}`;
const primaryList = `<div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="Города" hidden><p class="rf-dropdown__description">${options.multiple ? 'Можно выбрать несколько вариантов' : 'Выберите город доставки'}</p>${search}${list}${options.searchable ? '<p class="rf-dropdown__state" data-rf-dropdown-empty role="status" hidden>Ничего не найдено</p>' : ''}</div>`;
let popup = primaryList;
if (options.cascade) {
const submenuId = `${id}-submenu`;
const cascadeList = `${option('russia', 'Россия', { meta: '2 города', submenu: submenuId })}${option('kg', 'Кыргызстан', { meta: '1 город', submenu: submenuId + '-kg' })}${option('disabled', 'Недоступно', { disabled: true, meta: '0 городов' })}`;
popup = `<div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="Страны" hidden><p class="rf-dropdown__description">Сначала выберите страну</p>${cascadeList}</div><div class="rf-dropdown__panel rf-dropdown__submenu" id="${submenuId}" role="listbox" data-rf-dropdown-submenu aria-label="Города России" hidden><button class="rf-dropdown__submenu-back" type="button" data-rf-dropdown-submenu-back><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-left" aria-hidden="true"></span>Страны</button><p class="rf-dropdown__group-label">Россия</p>${option('moscow', 'Москва')}${option('kazan', 'Казань')}</div><div class="rf-dropdown__panel rf-dropdown__submenu" id="${submenuId}-kg" role="listbox" data-rf-dropdown-submenu aria-label="Города Кыргызстана" hidden><button class="rf-dropdown__submenu-back" type="button" data-rf-dropdown-submenu-back><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-left" aria-hidden="true"></span>Страны</button><p class="rf-dropdown__group-label">Кыргызстан</p>${option('bishkek', 'Бишкек')}</div>`;
}
return `<div class="rf-text-field-group"><label class="rf-text-field__label" for="${id}">Город</label><div class="rf-dropdown${options.cascade ? ' rf-dropdown--cascade' : ''}${options.anchored ? ' rf-dropdown--anchored' : ''}" data-rf-dropdown data-rf-dropdown-mode="selection"${rootAttributes}><input type="hidden" name="city" data-rf-dropdown-input value="${selected}"><button class="rf-dropdown__trigger rf-dropdown__trigger--lg" id="${id}" type="button" data-rf-dropdown-trigger data-rf-dropdown-placeholder="Выберите город"${disabled}${invalid}><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button>${popup}</div>${message}</div>`;
}
function actionDropdown(id, options = {}) {
const item = (label, icon, config = {}) => `<button class="rf-list-item rf-list-item--interactive rf-dropdown__item${config.destructive ? ' rf-dropdown__item--destructive' : ''}" type="button" role="menuitem" data-rf-dropdown-item${config.submenu ? ` data-rf-menu-submenu-target="${id}-nested" aria-haspopup="menu" aria-expanded="false"` : ''}${config.disabled ? ' disabled aria-disabled="true"' : ''}>${options.itemIcon===false?'':`<span class="rf-list-item__leading rf-icon rf-icon--sm" data-rf-icon-glyph="${icon}" aria-hidden="true"></span>`}<span class="rf-list-item__content rf-dropdown__item-content"><span class="rf-dropdown__item-label">${escapeHtml(label)}</span>${config.description?'<span class="rf-dropdown__item-description">Вернуться к объявлению позже</span>':''}</span>${config.submenu?'<span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right" aria-hidden="true"></span>':''}</button>`;
const body = options.loading ? '<p class="rf-dropdown__state" role="status"><span class="rf-spinner rf-spinner--sm" aria-hidden="true"></span><span>Загружаем действия…</span></p>' : `${options.groups?'<div role="group" aria-labelledby="'+id+'-listing"><span class="rf-dropdown__group-label" id="'+id+'-listing">Объявление</span>':''}${item(options.itemLabel||'Добавить в отложенное', 'heart',{disabled:options.itemState==='disabled',destructive:options.itemState==='destructive',description:options.itemDescription})}${item('Поделиться', 'send')}${item('Найти похожее', 'search')}${options.submenu?item('Ещё действия','more-hr-al',{submenu:true}):''}${item('Написать в поддержку', 'circle-help', { disabled: true })}${options.groups?'</div><hr class="rf-dropdown__divider"><div role="group" aria-labelledby="'+id+'-manage"><span class="rf-dropdown__group-label" id="'+id+'-manage">Управление</span>':'<hr class="rf-dropdown__divider">'}${item('Скрыть', 'eye-off', { destructive: true })}${options.groups?'</div>':''}`;
return `<div class="rf-dropdown${options.viewport ? ' rf-dropdown--viewport' : options.anchored ? ' rf-dropdown--anchored' : ''}" data-rf-dropdown data-rf-dropdown-mode="actions" data-rf-menu-density="${options.density||'default'}"${options.width?` data-rf-menu-width="${options.width}"`: ''}${options.alignment?` data-rf-menu-align="${options.alignment}"`:''}${options.autoOpen ? ' data-catalog-dropdown-open' : ''}><button class="rf-button rf-button--secondary" type="button" data-rf-dropdown-trigger aria-label="Открыть меню действий">Действия<span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></button><div class="rf-dropdown__panel" id="${id}" role="menu" aria-label="Действия" aria-busy="${!!options.loading}" tabindex="-1" data-rf-dropdown-panel hidden>${body}</div>${options.submenu&&!options.loading?`<div class="rf-dropdown__panel rf-dropdown__action-submenu" id="${id}-nested" role="menu" aria-label="Ещё действия" hidden><button class="rf-dropdown__submenu-back" type="button" data-rf-menu-back><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-left" aria-hidden="true"></span>Назад</button>${item('Скопировать ссылку','content-copy')}${item('Пожаловаться','exclamation-mark-cr-fr',{destructive:true})}</div>`:''}</div>`;
}
function renderStateMatrix(entry) {
if (entry.name === 'Text') return `<section class="catalog-section rf-stack rf-stack--gap-4"><h2>Colors</h2><div class="catalog-state-grid">${['primary','secondary','tertiary','brand','inverse'].map(role=>fieldState(titleCase(role),`<span class="rf-text rf-text--title-s${role==='primary'?'':` rf-text--${role}`}">3 500 ₽</span>`)).join('')}</div></section>`;

if (entry.name === 'TextField') {
const states = [
fieldState('Text / username autofill', floatingInput('state-empty-label', 'Логин', 'type="text" name="username" autocomplete="username" required')),
fieldState('Email / value + label', floatingInput('state-value-label', 'Email', 'type="email" name="email" autocomplete="email" value="flora@example.com"')),
fieldState('Tel / native attributes', floatingInput('state-tel-label', 'Телефон', 'type="tel" name="phone" autocomplete="tel" inputmode="tel" required')),
fieldState('Number / native attributes', floatingInput('state-number-label', 'Количество', 'type="number" name="quantity" inputmode="decimal" min="1" step="1"')),
fieldState('Placeholder without label', '<input class="rf-text-field" type="text" placeholder="Введите название" aria-label="Название без видимой подписи">'),
fieldState('Value without label', '<input class="rf-text-field" type="text" value="Букет пионов" aria-label="Название без видимой подписи">'),
fieldState('Disabled + value', floatingInput('state-disabled-label', 'Название', 'value="Изменить нельзя" disabled')),
fieldState('Readonly + value', floatingInput('state-readonly-label', 'Название', 'value="Только чтение" readonly')),
fieldState('Error / error + focus', floatingInput('state-error-label', 'Название', 'aria-invalid="true" aria-describedby="state-error-label-message"', 'Проверьте значение')),
fieldState('Leading + clear / focus + value', '<div class="rf-text-field-group"><span class="rf-text-field__control"><span class="rf-text-field__icon rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span><input class="rf-text-field rf-text-field--with-icon rf-text-field--with-action" id="state-leading-clear" type="search" value="пионы" autocomplete="off" data-rf-autofill="off"><label class="rf-text-field__label" for="state-leading-clear">Поиск</label><span class="rf-text-field__action"><button class="rf-text-field__action-trigger" type="button" data-rf-input-clear aria-label="Очистить поиск"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span></button></span></span></div>'),
fieldState('No trailing element', '<div class="rf-text-field-group"><span class="rf-text-field__control"><input class="rf-text-field" id="state-no-trailing" type="text" value="@flora"><label class="rf-text-field__label" for="state-no-trailing">Логин</label></span></div>'),
fieldState('Password / current-password', passwordInput('state-current-password', 'current-password')),
fieldState('Password disabled / new-password', passwordInput('state-new-password', 'new-password', true)),
fieldState('Long label', floatingInput('state-long-label', 'Очень длинная подпись поля, которая не должна ломать раскладку')),
fieldState('Long value', floatingInput('state-long-value', 'Название', 'value="Очень длинное значение букета, которое остаётся внутри нативного однострочного поля"')),
fieldState('Long placeholder', '<input class="rf-text-field" type="text" placeholder="Очень длинная подсказка, которая не должна расширять контейнер" aria-label="Поле с длинной подсказкой">'),
fieldState('Multiline', textFieldSource('multiline', 'state-text-area')),
fieldState('Focus / native picker', datePicker('date-focus', 'min="1990-01-01" max="2030-12-31"')),
fieldState('Date / disabled', datePicker('date-disabled', 'disabled')),
fieldState('Date / error', datePicker('date-error', 'aria-invalid="true" aria-describedby="date-error-message"', 'Введите допустимую дату')),
].join('');
return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><p class="rf-text rf-text--body-small rf-text--secondary">Hover/focus проверяются интерактивно. Clear виден только при focus непустого «Поиска».</p><div class="catalog-state-grid">${states}</div></section>`;
}
if (entry.name === 'Dropdown') {
const states = [
fieldState('Selection / anchored / content-fit', customDropdown('dropdown-single', { selected: 'moscow', anchored: true, open: true, autoOpen: true })),
fieldState('Actions / ListItem / open', actionDropdown('dropdown-actions', { autoOpen: true })),
fieldState('Actions / viewport / tablet compact', actionDropdown('dropdown-actions-viewport', { autoOpen: true, viewport: true })),
fieldState('Selection / grouped', customDropdown('dropdown-grouped', { grouped: true, open: true })),
fieldState('Selection / multiple', customDropdown('dropdown-multiple', { multiple: true, selected: ['moscow', 'bishkek'], open: true })),
...['default','disabled','invalid','empty','loading'].map(state => fieldState('Editable input / '+state, customDropdown('dropdown-editable-'+state, {editable:true,disabled:state==='disabled',error:state==='invalid',empty:state==='empty',loading:state==='loading'}))),
fieldState('Selection / searchable', customDropdown('dropdown-searchable', { searchable: true, open: true })),
`<div class="catalog-state-cell catalog-state-cell--wide"><span>Selection / cascade / nested submenu</span>${customDropdown('dropdown-cascade', { cascade: true, open: true })}</div>`,
fieldState('Selection / empty', customDropdown('dropdown-zero', { empty: true, open: true })),
fieldState('Selection / loading', customDropdown('dropdown-loading', { loading: true, open: true })),
fieldState('Selection / disabled', customDropdown('dropdown-disabled', { selected: 'moscow', disabled: true })),
fieldState('Selection / invalid', customDropdown('dropdown-error', { error: true })),
].join('');
return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><p class="rf-text rf-text--body-small rf-text--secondary">Системный ListItem; selection — listbox, actions — menu. Browser dropdown не используется. Coarse pointer сохраняет mobile sheet только ниже breakpoint.md; на планшете panel остаётся компактной рядом с trigger.</p><div class="catalog-state-grid catalog-dropdown-state-grid">${states}</div></section>`;
}
if (entry.name === 'FilterBar') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><div class="catalog-state-grid"><div class="catalog-state-cell"><span class="rf-text rf-text--label-small">Inline / filtered</span><section class="rf-filter-bar rf-filter-bar--inline" aria-labelledby="filter-inline-title"><h3 class="rf-sr-only" id="filter-inline-title">Фильтры пользователей</h3><div class="rf-filter-bar__controls"><div class="rf-filter-bar__group"><a class="rf-chip" href="?status=all" aria-current="page">Все</a><a class="rf-chip" href="?status=active">Активные</a></div></div><div class="rf-filter-bar__active"><span class="rf-badge rf-badge--brand">Москва</span><button class="rf-button rf-button--tertiary rf-button--s rf-filter-bar__clear" type="button">Сбросить</button></div><div class="rf-filter-bar__meta"><p class="rf-filter-bar__status" aria-live="polite">24 результата</p></div></section></div><div class="catalog-state-cell"><span class="rf-text rf-text--label-small">Stacked / loading</span><section class="rf-filter-bar rf-filter-bar--stacked" aria-labelledby="filter-stacked-title" aria-busy="true"><h3 class="rf-sr-only" id="filter-stacked-title">Фильтры каталога</h3><div class="rf-filter-bar__controls"><div class="rf-filter-bar__group"><button class="rf-chip" type="button" aria-pressed="true" disabled>Все типы</button><button class="rf-chip" type="button" aria-pressed="false" disabled>Букет</button></div></div><div class="rf-filter-bar__meta"><p class="rf-filter-bar__status" aria-live="polite">Обновляем результаты…</p></div></section></div><div class="catalog-state-cell"><span class="rf-text rf-text--label-small">Collapsible</span><details class="rf-filter-bar rf-filter-bar--collapsible"><summary><span class="rf-text rf-text--label-medium">Фильтры</span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-down" aria-hidden="true"></span></summary><div class="rf-filter-bar__body"><div class="rf-filter-bar__controls"><div class="rf-filter-bar__group"><button class="rf-chip" type="button" aria-pressed="false">Сегодня</button><button class="rf-chip" type="button" aria-pressed="false">Неделя</button></div></div></div></details></div></div></section>`;
if (entry.name === 'Thumbnail') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><div class="catalog-state-grid"><div class="catalog-state-cell"><span>Loading</span><span class="rf-thumbnail rf-thumbnail--square catalog-thumbnail-preview" data-state="loading"></span></div><div class="catalog-state-cell"><span>Error</span><span class="rf-thumbnail rf-thumbnail--square catalog-thumbnail-preview" data-state="error"><span class="rf-icon" data-rf-icon-glyph="image-off" aria-hidden="true"></span></span></div></div></section>`;
if (entry.name === 'CardList') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><div class="catalog-state-grid"><div class="catalog-state-cell"><span>Preview / ready</span><div class="rf-card-list rf-card-list--preview"><div class="rf-card">Card</div></div></div><div class="catalog-state-cell"><span>Empty</span><ul class="rf-card-list rf-card-list--grid"><li class="rf-empty-state rf-card-list__state"><strong class="rf-empty-state__title">Ничего не найдено</strong><span class="rf-empty-state__description">Измените условия фильтра.</span></li></ul></div></div></section>`;
if (entry.name === 'ConfirmationDialog') return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">State matrix</h2><div class="catalog-state-grid"><div class="catalog-state-cell"><span>Danger / open</span><div class="rf-dialog rf-confirmation-dialog" role="dialog" aria-label="Подтверждение удаления"><div class="rf-dialog__body"><p class="rf-confirmation-dialog__message">Удалить без возможности восстановления?</p></div><footer class="rf-dialog__footer"><button class="rf-button rf-button--secondary" type="button">Отмена</button><button class="rf-button rf-button--danger" type="button">Удалить</button></footer></div></div><div class="catalog-state-cell"><span>Confirming</span><div class="rf-dialog rf-confirmation-dialog" data-state="confirming" role="dialog" aria-busy="true" aria-label="Удаление"><div class="rf-dialog__body"><p class="rf-confirmation-dialog__message">Удаляем объявление…</p></div></div></div></div></section>`;
return `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="entity-states-title"><h2 class="rf-text rf-text--heading-h2" id="entity-states-title">States</h2><div class="rf-inline rf-inline--gap-2">${entry.states.map(state => `<span class="rf-badge">${escapeHtml(state)}</span>`).join('') || '<span class="rf-text rf-text--body-small rf-text--secondary">Отдельные states не заявлены.</span>'}</div></section>`;
}
function wirePlayground(entry) {
const playground = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground]'));
if (!playground) return;
const form = /** @type {CatalogPlaygroundForm} */(playground.querySelector('form'));
const output = /** @type {HTMLElement} */(playground.querySelector('[data-playground-output]'));
const update = event => {
const data = /** @type {CatalogTextFormData} */(new FormData(form));
if (entry.name === 'Button') {
const width = Number(data.get('width'));
/** @type {HTMLElement} */(playground.querySelector('[data-button-width-preview]')).style.setProperty('--catalog-button-width', `${width}px`);
playground.querySelector('[data-button-width-value]').textContent = `${width}px`;
if (event?.target === form.elements.width) return;
}
const pick = name => data.get(name) || /** @type {HTMLInputElement} */(form.querySelector(`[name=${name}]~.rf-dropdown__panel [aria-selected=true]`))?.dataset.value;
if (entry.name === 'Slider') {
const input = /** @type {HTMLInputElement} */(output.querySelector('.rf-slider'));
const valueOutput = /** @type {HTMLElement} */(output.querySelector('[data-rf-slider-output]'));
const minLabel = /** @type {HTMLElement} */(output.querySelector('[data-rf-slider-min]'));
const maxLabel = /** @type {HTMLElement} */(output.querySelector('[data-rf-slider-max]'));
const min = Number(data.get('min')), max = Number(data.get('max')), step = Number(data.get('step')), requested = Number(data.get('value'));
input.min = Number.isFinite(min) ? String(min) : '0';
input.max = Number.isFinite(max) && max > min ? String(max) : String(min + 1);
input.step = Number.isFinite(step) && step > 0 ? String(step) : '1';
input.value = String(Math.min(Number(input.max), Math.max(Number(input.min), Number.isFinite(requested) ? requested : Number(input.min))));
input.disabled = data.has('disabled');
valueOutput.hidden = !data.has('showValue');
if (minLabel) minLabel.textContent = input.min;
if (maxLabel) maxLabel.textContent = input.max;
input.dispatchEvent(new Event('input', {bubbles: true}));
} else if (entry.name === 'Icon') {
output.className = `rf-icon rf-icon--${data.get('size')}`;
output.dataset.rfIconGlyph = data.get('name');
} else if (entry.name === 'Button') {
const state = pick('state') || 'default', size = pick('size');
output.className = `rf-button rf-button--${pick('variant')}${size === 'm' ? '' : ` rf-button--${size}`}`;
const label = /** @type {HTMLElement} */(output.querySelector('.rf-button__label')), subtitle = /** @type {HTMLElement} */(output.querySelector('.rf-button__subtitle'));
label.textContent = data.get('label') || 'Action';
subtitle.textContent = data.get('subtitle') || '';
subtitle.hidden = !data.has('subtitleEnabled');
/** @type {HTMLElement} */(output.querySelector('[data-playground-start-icon]')).hidden = !data.has('startIcon');
/** @type {HTMLElement} */(output.querySelector('[data-playground-end-icon]')).hidden = !data.has('endIcon');
for (const name of ['startIcon', 'endIcon']) {
const slot = name === 'startIcon' ? 'start' : 'end';
/** @type {HTMLElement} */(output.querySelector(`[data-playground-${slot}-icon]`)).dataset.rfIconGlyph = data.get(name + 'Glyph');
/** @type {HTMLElement} */(output.querySelector(`[data-playground-${slot}-icon]`)).dataset.rfIconStyle = data.get(name + 'Style');
/** @type {NodeListOf<HTMLButtonElement>} */(form.querySelectorAll(`[data-icon-slot-control="${name}"] [data-rf-dropdown-trigger]`)).forEach(trigger => { trigger.disabled = !data.has(name); });
}
window.ReflowerUI.setButtonState(output, {disabled: state === 'disabled', loading: state === 'loading', skeleton: state === 'skeleton'});
delete output.dataset.previewState;
if (['hover', 'pressed', 'focused'].includes(state)) output.dataset.previewState = state;
} else if (entry.name === 'FilterBar') {
output.className = `rf-filter-bar rf-filter-bar--${data.get('variant')}`;
output.setAttribute('aria-busy', String(data.has('loading')));
/** @type {HTMLElement} */(output.querySelector('.rf-filter-bar__active')).hidden = !data.has('filtered');
output.querySelectorAll('button').forEach(button => { button.disabled = data.has('disabled'); });
output.querySelector('.rf-filter-bar__status').textContent = data.has('loading') ? 'Обновляем результаты…' : (data.has('filtered') ? '4 объявления' : '12 объявлений');
}
};
form.addEventListener('input', update);
form.addEventListener('change', update);
update();
if (entry.name === 'Button') {
const stage = /** @type {HTMLElement} */(playground.querySelector('[data-button-playground-theme]'));
const toggle = /** @type {HTMLElement} */(playground.querySelector('[data-button-playground-theme-toggle]'));
const tokens = model.foundations.componentTokenTrace.button.filter(record => record.themeDependent);
const canvas = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas');
const renderTheme = () => {
const theme = stage.dataset.buttonPlaygroundTheme === 'dark' ? 'dark' : 'light', dark = theme === 'dark';
tokens.forEach(record => stage.style.setProperty(`--rf-${record.name.replace('component.', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase()}`, record[theme].resolved));
stage.style.background = canvas[theme].resolved;
stage.style.colorScheme = theme;
toggle.setAttribute('aria-pressed', String(dark));
toggle.setAttribute('aria-label', `Тема превью: ${dark ? 'тёмная. Переключить на светлую' : 'светлая. Переключить на тёмную'}`);
/** @type {HTMLElement} */(toggle.querySelector('[data-button-playground-theme-icon="light"]')).hidden = dark;
/** @type {HTMLElement} */(toggle.querySelector('[data-button-playground-theme-icon="dark"]')).hidden = !dark;
};
toggle.addEventListener('click', () => { stage.dataset.buttonPlaygroundTheme = stage.dataset.buttonPlaygroundTheme === 'dark' ? 'light' : 'dark'; renderTheme(); });
renderTheme();
}
}
function wireIconButtonPlayground(entry) {
const playground = /** @type {HTMLElement} */(entityPage.querySelector('[data-playground="icon-button"]'));
if (!playground) return;
const form = /** @type {CatalogPlaygroundForm} */(playground.querySelector('form'));
const output = /** @type {HTMLElement} */(playground.querySelector('[data-icon-button-playground-output]'));
const icon = /** @type {HTMLElement} */(output.querySelector('[data-icon-button-playground-icon]'));
const pick = name => /** @type {CatalogTextFormData} */(new FormData(form)).get(name) || /** @type {HTMLInputElement} */(form.querySelector(`[name=${name}]~.rf-dropdown__panel [aria-selected=true]`))?.dataset.value;
const update = () => {
const data = /** @type {CatalogTextFormData} */(new FormData(form)), state = pick('state') || 'default', size = pick('size') || 'm';
output.className = `rf-icon-button rf-icon-button--${pick('variant') || 'primary'}${size === 'm' ? '' : ` rf-icon-button--${size}`}`;
output.setAttribute('aria-label', data.get('label') || 'Action');
icon.dataset.rfIconGlyph = pick('icon') || 'checkmark';
icon.dataset.rfIconStyle = pick('iconStyle') || 'line';
window.ReflowerUI.setButtonState(output, {disabled: state === 'disabled', loading: state === 'loading', skeleton: state === 'skeleton'});
delete output.dataset.previewState;
if (['hover', 'pressed', 'focused'].includes(state)) output.dataset.previewState = state;
};
form.addEventListener('input', update);
form.addEventListener('change', update);
update();
const stage = /** @type {HTMLElement} */(playground.querySelector('[data-icon-button-playground-theme]'));
const toggle = /** @type {HTMLElement} */(playground.querySelector('[data-icon-button-playground-theme-toggle]'));
const buttonTokens = model.foundations.componentTokenTrace.button.filter(record => record.themeDependent);
const colorTokens = model.foundations.colors.records.filter(record => record.light && record.dark);
const canvas = model.foundations.colors.records.find(record => record.name === 'color.context.background.canvas');
const renderTheme = () => {
const theme = stage.dataset.iconButtonPlaygroundTheme === 'dark' ? 'dark' : 'light', dark = theme === 'dark';
buttonTokens.forEach(record => stage.style.setProperty(`--rf-${record.name.replace('component.', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase()}`, record[theme].resolved));
colorTokens.forEach(record => stage.style.setProperty(`--rf-${record.name.replaceAll('.', '-')}`, record[theme].resolved));
stage.style.background = canvas[theme].resolved;
stage.style.colorScheme = theme;
toggle.setAttribute('aria-pressed', String(dark));
toggle.setAttribute('aria-label', `Тема превью: ${dark ? 'тёмная. Переключить на светлую' : 'светлая. Переключить на тёмную'}`);
/** @type {HTMLElement} */(toggle.querySelector('[data-icon-button-playground-theme-icon="light"]')).hidden = dark;
/** @type {HTMLElement} */(toggle.querySelector('[data-icon-button-playground-theme-icon="dark"]')).hidden = !dark;
};
toggle.addEventListener('click', () => { stage.dataset.iconButtonPlaygroundTheme = stage.dataset.iconButtonPlaygroundTheme === 'dark' ? 'light' : 'dark'; renderTheme(); });
renderTheme();
}
function foundationHeader(key, description) {
return pageHeader('Foundations', FOUNDATION_LABELS[key], description, '<a class="rf-button rf-button--secondary" href="../FOUNDATIONS.md">Foundation contract</a>');
}
function renderFoundation(key) {
foundationPage.dataset.foundation = key;
const foundation = model.foundations;
if (key === 'colors') renderColors(foundation); else if (key === 'dimensions') renderDimensions(foundation); else if (key === 'typography') renderTypography(foundation);
else if (key === 'elevation') renderElevation(foundation);
else if (key === 'motion') renderMotion(foundation); else if (key === 'grid') renderGrid(foundation);
else if (key === 'icons') renderIcons(foundation); else renderMedia(foundation);

}
function renderFoundationsOverview() {
const page = byId('foundations');
if (page.dataset.rendered === 'true') return;
const sourceGrid = /** @type {HTMLTemplateElement} */(byId('catalog-foundation-cards-template')).content.firstElementChild;
page.innerHTML = `<header class="catalog-home-hero"><div class="catalog-home-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Foundations</h1><p class="rf-text rf-text--body-large rf-text--secondary">Визуальная основа, на которой строится каждый интерфейс Contour.</p></div><div class="catalog-home-hero__media"><img class="rf-image catalog-home-hero__image" src="assets/catalog-foundations-hero.png" alt="Системная композиция из сетки, шкал, слоёв и базовых элементов Contour" width="1402" height="1122"></div></header><section class="catalog-home-section rf-stack rf-stack--gap-6" aria-labelledby="foundations-overview-title"><div class="catalog-home-section__heading rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="foundations-overview-title">Разделы Foundations</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Выберите базовый визуальный или поведенческий контракт.</p></div></section>`;
const foundationGrid = /** @type {HTMLElement} */(sourceGrid.cloneNode(true));
/** @type {NodeListOf<HTMLElement>} */(foundationGrid.querySelectorAll('.catalog-foundation-card-template')).forEach(card => {
  card.classList.add('catalog-home-card');
  card.classList.remove('catalog-foundation-card-template');
});
page.querySelector('.catalog-home-section').append(foundationGrid);
page.dataset.rendered = 'true';
}
function renderColors(foundation) {
const records = foundation.colors.records;
const ramp = foundation.colors.ramp;
const byLayer = layer => records.filter(record => record.layer === layer);
const groupBySegment = (values, segment) => values.reduce((groups, record) => {
const key = record.name.split('.')[segment];
if (!groups.has(key)) groups.set(key, []);
groups.get(key).push(record);
return groups;
}, new Map());
const primitive = byLayer('primitive');
const aliasColors = byLayer('alias');
const context = byLayer('context');
const staticColors = byLayer('static');
const contextFamilyById = new Map(foundation.colors.contextFamilies.map(item => [item.id, item]));
const primitiveGroups = groupBySegment(primitive, 2);
const aliasGroups = groupBySegment(aliasColors, 2);
const contextGroups = groupBySegment(context, 2);
const contextByName = new Map(context.map(record => [record.name, record]));
const colorPolicy = foundation.colors.policy;
const colorMigrations = foundation.colors.migrations;
const deepLinkMigrations = new Map(colorMigrations.filter(group => group.channels.includes('catalog-deep-link')).flatMap(group => group.entries.map(entry => [entry.from, {...entry,group}])));
const primitiveRampOrder = ['coral', 'gray', 'green', 'red', 'blue', 'yellow', 'orange'];
const aliasRampOrder = ['brand', 'neutral', 'success', 'error', 'warning', 'info'];
const colorState = name => { const parts = name.split('.'); const leaf = parts.at(-1); if (parts.includes('skeleton') || leaf === 'skeletonBase' || leaf === 'skeletonHighlight') return 'skeleton'; return ({hover: 'hover', strongHover: 'hover', active: 'active', strongActive: 'active', selected: 'selected', disabled: 'disabled'}[leaf] || 'default'); };
const colorStateOrder = ['default', 'hover', 'active', 'selected', 'disabled', 'skeleton'];
const colorStateLabel = state => state === 'skeleton' ? titleCase(state) : ({default: 'Base', hover: 'Hover', active: 'Active', selected: 'Selected', disabled: 'Disabled'}[state]);
const layerSummary = [
['primitive', 'Primitive', 'Internal · исходные семейства для авторов темы.'],
['alias', 'Alias', 'Internal · Light и Dark mapping для сборки системы.'],
['context', 'Context', 'Public API · единственные цветовые роли для продуктовой разработки.'],
['component', 'Component', 'Internal · Core связывает Context с анатомией компонента.'],
];
const contextOrder = ['background', 'text', 'icon', 'border', 'overlay'];
const colorDisplayName = name => { const parts = name.split('.').slice(2); if (name.startsWith('color.context.') && parts.at(-1) === 'default') parts.pop(); return parts.join('.'); };
const backgroundBaseStatusOrder = ['error', 'info', 'success', 'warning'];
const backgroundBaseStatusRole = record => { const parts = record.name.split('.'); return parts[2] === 'background' && backgroundBaseStatusOrder.includes(parts[3]) && colorState(record.name) === 'default' ? parts[3] : null; };
const backgroundBaseStatusDisplayName = record => record.name.split('.')[4];
const contextRoleOrder = ['brand', 'base', 'primary', 'secondary', 'tertiary', 'canvas', 'inverse', 'success', 'error', 'warning', 'info', 'focus', 'skeleton'];
const contextRoleRank = record => { const index = contextRoleOrder.indexOf(record.name.split('.')[3]); return index < 0 ? contextRoleOrder.length : index; };
const colorVariableName = name => name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replaceAll('.', '-').toLowerCase();
const colorTokenName = (record, className, theme = '', displayName = colorDisplayName(record.name)) => { const full = escapeAttribute(record.name); return `<button class="rf-button rf-button--tertiary rf-button--s catalog-color-token-copy" type="button" data-copy-color-token="${full}" title="${full}" aria-label="${theme ? `${theme}: ` : ''}Скопировать ${full}"><code class="${className} rf-text rf-text--caption">${escapeHtml(displayName).replaceAll('.', '.<wbr>')}</code></button>`; };
const themedPaletteItem = (record, layer, displayName = colorDisplayName(record.name)) => { const source = record.value.slice(1, -1), value = `var(--rf-${colorVariableName(record.name)})`; return `<article class="catalog-color-palette__item" data-token-layer="${layer}" data-token-name="${escapeAttribute(record.name)}" data-token-display-name="${escapeAttribute(displayName)}" data-token-source="${escapeAttribute(record.value)}"><span class="catalog-color-palette__swatch" data-token-color="${escapeAttribute(value)}"><span class="rf-sr-only">${escapeHtml(record.name)} · current theme · ${escapeHtml(source)}</span></span>${colorTokenName(record, 'catalog-color-palette__name', '', displayName)}<code class="rf-text rf-text--caption rf-text--secondary" data-context-source title="${escapeAttribute(source)}">${escapeHtml(colorDisplayName(source)).replaceAll('.', '.<wbr>')}</code></article>`; };
const colorSourceName = value => String(value).startsWith('{color.primitive.') ? String(value).replace('{color.primitive.', '').replace('}', '') : `direct · ${formatValue(value)}`;
const aliasCanvas = aliasColors.find(record => record.name.endsWith('neutral.canvas'));
const colorChannels = value => [1, 3, 5].map(i => parseInt(colorCss(value).slice(i, i + 2), 16));
const colorPreview = (value, theme) => { const c = colorCss(value); if (c.length !== 9) return c; const a = parseInt(c.slice(7), 16) / 255, b = colorChannels(aliasCanvas[theme].resolved); return `#${colorChannels(c).map((v, i) => Math.round(v * a + b[i] * (1 - a)).toString(16).padStart(2, '0')).join('')}`; };
const colorLuminance = value => { const [r, g, b] = colorChannels(value).map(c => { c /= 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }); return r * .2126 + g * .7152 + b * .0722; };
const aliasThemeCell = (record, theme) => { const value = record[theme], preview = colorPreview(value.resolved, theme), source = colorSourceName(value.value), foreground = staticColors.find(({name})=>name.endsWith(colorLuminance(preview)>.179?'.black':'.white')).value; return `<div class="catalog-color-alias__cell" data-alias-theme="${theme}" data-token-source="${escapeAttribute(value.value)}" data-token-color="${escapeAttribute(colorCss(value.resolved))}" data-token-preview-color="${escapeAttribute(preview)}" data-token-foreground="${escapeAttribute(foreground)}">${colorTokenName(record, 'catalog-color-alias__name', titleCase(theme))}<code class="catalog-color-alias__source rf-text rf-text--caption" data-alias-source title="${escapeAttribute(value.value)}">${escapeHtml(source).replaceAll('.', '.<wbr>')}</code><span class="rf-sr-only">${escapeHtml(record.name)} · ${escapeHtml(titleCase(theme))} · ${escapeHtml(value.resolved)} · source ${escapeHtml(value.value)}</span></div>`; };
const aliasPalettes = [...aliasRampOrder, 'overlay'].filter(group => aliasGroups.has(group)).map(group => { const values = [...aliasGroups.get(group)].sort((a, b) => group === 'neutral' ? Number(b.name.endsWith('.canvas')) - Number(a.name.endsWith('.canvas')) : 0); return `<section class="catalog-color-palette__family catalog-color-alias rf-stack rf-stack--gap-3" data-alias-family="${escapeAttribute(group)}" aria-labelledby="color-alias-${group}-title"><h3 class="rf-text rf-text--heading-h3" id="color-alias-${group}-title">${escapeHtml(titleCase(group))}</h3><div class="catalog-color-alias__headings" aria-hidden="true"><h4 class="rf-text rf-text--label-large">Light theme</h4><h4 class="rf-text rf-text--label-large">Dark theme</h4></div><div class="catalog-color-alias__items">${values.map(record => `<article class="catalog-color-alias__item" data-token-layer="alias" data-token-name="${escapeAttribute(record.name)}" data-token-display-name="${escapeAttribute(colorDisplayName(record.name))}" data-token-source="${escapeAttribute(record.light.value)}">${aliasThemeCell(record, 'light')}${aliasThemeCell(record, 'dark')}</article>`).join('')}</div></section>`; }).join('');
const contextStateContent = (group, state, records) => { if (group !== 'background' || state !== 'default') return `<div class="catalog-color-palette__grid catalog-color-palette__grid--split">${records.map(record => themedPaletteItem(record, 'context')).join('')}</div>`; const baseRecords = records.filter(record => !backgroundBaseStatusRole(record)); const statusGroups = backgroundBaseStatusOrder.map(role => [role, records.filter(record => backgroundBaseStatusRole(record) === role).sort((a, b) => backgroundBaseStatusDisplayName(a).localeCompare(backgroundBaseStatusDisplayName(b)))]).filter(([, values]) => values.length); return `<div class="catalog-color-palette__grid catalog-color-palette__grid--split">${baseRecords.map(record => themedPaletteItem(record, 'context')).join('')}</div><div class="catalog-color-palette__role-groups rf-stack rf-stack--gap-4">${statusGroups.map(([role, values]) => `<section class="catalog-color-palette__role-group rf-stack rf-stack--gap-3" data-context-role-group="${escapeAttribute(role)}" aria-labelledby="color-context-background-default-${role}-title"><h5 class="rf-text rf-text--label-large" id="color-context-background-default-${role}-title">${escapeHtml(titleCase(role))}</h5><div class="catalog-color-palette__grid catalog-color-palette__grid--split">${values.map(record => themedPaletteItem(record, 'context', backgroundBaseStatusDisplayName(record))).join('')}</div></section>`).join('')}</div>`; };
const contextPalettes = contextOrder.filter(group => contextGroups.has(group)).map(group => { const values = [...contextGroups.get(group)].sort((a, b) => contextRoleRank(a) - contextRoleRank(b) || colorDisplayName(a.name).localeCompare(colorDisplayName(b.name))); const byState = values.reduce((groups, record) => { const state = colorState(record.name); if (!groups.has(state)) groups.set(state, []); groups.get(state).push(record); return groups; }, new Map()), guidance = contextFamilyById.get(group), descriptionId = `color-context-${group}-surfaces`; return `<section class="catalog-color-palette__family rf-stack rf-stack--gap-4" data-context-surface="${escapeAttribute(group)}" aria-labelledby="color-context-${group}-title" aria-describedby="${descriptionId}"><header class="catalog-color-palette__heading rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3" id="color-context-${group}-title">${escapeHtml(guidance.title)}</h3><p class="rf-text rf-text--body-medium rf-text--secondary" id="${descriptionId}" data-context-allowed-surfaces="${escapeAttribute(group)}">${escapeHtml(guidance.allowedSurfaces)}</p></header>${colorStateOrder.filter(state => byState.has(state)).map(state => `<section class="catalog-color-palette__state rf-stack rf-stack--gap-3" data-context-state-group="${state}" aria-labelledby="color-context-${group}-${state}-title"><h4 class="rf-text rf-text--headline-xxs" id="color-context-${group}-${state}-title">${escapeHtml(colorStateLabel(state))}</h4>${contextStateContent(group, state, byState.get(state))}</section>`).join('')}</section>`; }).join('');
const requestedRaw = new URL(window.location.href).searchParams.get('token');
const requestedMigration = deepLinkMigrations.get(requestedRaw);
const migrated = requestedMigration?.to || requestedRaw;
const requested = records.find(record => colorDisplayName(record.name) === migrated)?.name || migrated;
if (requested && requested !== requestedRaw) { const url = new URL(window.location.href); url.searchParams.set('token', requested); window.history.replaceState(null, '', url); }
const requestedRecord = records.find(record => record.name === requested);
const requestedTab = requestedRecord?.layer === 'static' ? 'primitive' : requestedRecord?.layer;
const rawUrlTab = new URL(window.location.href).searchParams.get('colorTab');
const urlTab = rawUrlTab;
const tabNames = ['anatomy', 'primitive', 'alias', 'context'];
const selectedTab = tabNames.includes(urlTab) ? urlTab : (tabNames.includes(requestedTab) ? requestedTab : 'anatomy');
const tabLabels = {anatomy: 'Color anatomy', primitive: 'Primitive', alias: 'Alias', context: 'Context'};
const tabButton = name => `<button class="rf-tab" id="color-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="color-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-color-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="color-panel-${name}" role="tabpanel" aria-labelledby="color-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const anatomySwatch = (name, value) => `<span class="catalog-color-anatomy__swatch" data-token-color="${escapeAttribute(value)}" title="${escapeAttribute(`${name} · ${value}`)}"><span class="rf-sr-only">${escapeHtml(name)} · ${escapeHtml(value)}</span></span>`;
const saturatedRampNames = ['coral', 'green', 'red', 'blue', 'yellow', 'orange'];
const saturatedRamps = `<ul class="catalog-color-anatomy__ramps catalog-color-anatomy__ramps--saturated" aria-label="Primitive цветовые шкалы Contour">${saturatedRampNames.filter(name => primitiveGroups.has(name)).map(name => `<li class="catalog-color-anatomy__ramp" data-anatomy-ramp="${escapeAttribute(name)}"><span class="rf-text rf-text--label-small">${escapeHtml(titleCase(name))}</span><span class="catalog-color-anatomy__scale">${primitiveGroups.get(name).map(record => anatomySwatch(record.name, record.value)).join('')}</span></li>`).join('')}</ul>`;
const neutralValues = (aliasGroups.get('neutral') || []).filter(record => /\.\d+$/.test(record.name));
const neutralRamps = `<div class="catalog-color-anatomy__themes" aria-label="Нейтральная шкала в Light и Dark темах">${['light', 'dark'].map(theme => `<section class="catalog-color-anatomy__theme" data-anatomy-theme="${theme}" aria-labelledby="color-anatomy-neutral-${theme}"><h4 class="rf-text rf-text--label-medium" id="color-anatomy-neutral-${theme}">${titleCase(theme)} theme</h4><span class="catalog-color-anatomy__scale">${neutralValues.map(record => anatomySwatch(`${record.name} · ${titleCase(theme)}`, record[theme].resolved)).join('')}</span></section>`).join('')}</div>`;
const alphaRoles = ['hover', 'active', 'selected', 'disabled', 'scrim', 'backdrop'];
const overlayValues = aliasGroups.get('overlay') || [];
const alphaRoleRecord = role => overlayValues.find(record => record.name.endsWith(`.${role}`));
const alphaBase = theme => neutralValues[0]?.[theme]?.resolved || staticColors.find(record => record.name.endsWith('.white'))?.value;
const alphaThemes = `<div class="catalog-color-anatomy__themes catalog-color-anatomy__themes--alpha" aria-label="Alpha-цвета на Light и Dark поверхностях">${['light', 'dark'].map(theme => `<section class="catalog-color-anatomy__theme" data-anatomy-alpha-theme="${theme}" aria-labelledby="color-anatomy-alpha-${theme}"><h4 class="rf-text rf-text--label-medium" id="color-anatomy-alpha-${theme}">${titleCase(theme)} surface</h4><ul class="catalog-color-anatomy__alpha-list">${alphaRoles.map(role => { const record = alphaRoleRecord(role); if (!record) return ''; return `<li><span class="rf-text rf-text--caption rf-text--secondary">${escapeHtml(titleCase(role))}</span><span class="catalog-color-anatomy__alpha-sample" data-token-color="${escapeAttribute(alphaBase(theme))}"><span class="catalog-color-anatomy__alpha-overlay" data-token-color="${escapeAttribute(record[theme].resolved)}"><span class="rf-sr-only">${escapeHtml(record.name)} · ${escapeHtml(titleCase(theme))} · ${escapeHtml(record[theme].resolved)}</span></span></span></li>`; }).join('')}</ul></section>`).join('')}</div>`;
const anatomyChapters = [
{id: 'saturated', title: 'Насыщенные цвета', description: 'Насыщенные семейства создают акцент и помогают передавать состояние. Coral формирует фирменный акцент, а green, blue, yellow и другие семейства получают тему только после перехода в Alias.', visual: saturatedRamps, caption: 'Это реальные Primitive-значения Contour — от самого светлого шага до самого плотного. В интерфейсе они напрямую не используются.'},
{id: 'neutral', title: 'Нейтральные цвета', description: 'Нейтрали формируют большинство фонов, текста, границ и неактивных состояний. Отдельное сопоставление для Light и Dark сохраняет правильную иерархию и контраст в обеих темах.', visual: neutralRamps, caption: 'Один Alias автоматически получает подходящий Primitive-шаг: шкала Light движется от светлого к тёмному, а Dark — навстречу ей.'},
{id: 'alpha', title: 'Прозрачные цвета', description: 'Alpha-цвета сохраняют часть фоновой поверхности и поэтому подходят для overlay, backdrop и мягких состояний. Их эффект всегда проверяется на реальном фоне и в обеих темах.', visual: alphaThemes, caption: 'Каждый образец показывает реальный Alias alpha-цвет поверх соответствующей Light или Dark поверхности.'},
];
const anatomyChapter = chapter => `<section class="catalog-color-anatomy__chapter" aria-labelledby="color-anatomy-${chapter.id}-title"><div class="catalog-color-anatomy__copy rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3" id="color-anatomy-${chapter.id}-title">${escapeHtml(chapter.title)}</h3><p class="rf-text rf-text--body-medium rf-text--secondary">${escapeHtml(chapter.description)}</p></div><figure class="catalog-color-anatomy__figure rf-stack rf-stack--gap-2"><div class="catalog-color-anatomy__visual">${chapter.visual}</div><figcaption class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(chapter.caption)}</figcaption></figure></section>`;
const playgroundRoles = [['background', 'Background'], ['border', 'Border'], ['text', 'Text color'], ['icon', 'Icon'], ['overlay', 'Overlay']];
const playgroundDefaults = {background: 'color.context.background.base.default', border: 'color.context.border.primary.default', text: 'color.context.text.primary.default', icon: 'color.context.icon.brand.default', overlay: 'color.context.overlay.hover'};
const playgroundState = colorState;
const playgroundStateOrder = colorStateOrder;
const playgroundStateLabel = colorStateLabel;
const playgroundParameter = ([role, label]) => {
const selected = playgroundDefaults[role];
const values = [...(contextGroups.get(role) || [])].sort((a, b) => contextRoleRank(a) - contextRoleRank(b) || colorDisplayName(a.name).localeCompare(colorDisplayName(b.name)));
const initial = values.find(record => record.name === selected);
const selectedState = playgroundState(selected);
const availableStates = new Set(values.map(record => playgroundState(record.name)));
const states = playgroundStateOrder.filter(state => availableStates.has(state));
const stateOptions = states.map(state => dropdownItem(state, playgroundStateLabel(state), {selected: state === selectedState})).join('');
const tokenOptions = values.map(record => { const state = playgroundState(record.name); return dropdownItem(escapeAttribute(record.name), escapeHtml(colorDisplayName(record.name)), {selected: record.name === selected, description: escapeHtml(colorDisplayName(record.value.slice(1, -1)))}).replace(' role="option"', ` role="option" data-color-playground-option-state="${state}"${state === selectedState ? '' : ' hidden'}`); }).join('');
const enabled = role !== 'overlay';
return `<div class="catalog-color-playground__parameter" data-color-playground-role="${role}" data-color-playground-enabled="${enabled}"><span class="catalog-color-playground__swatch" data-color-playground-swatch aria-hidden="true"></span><span class="catalog-color-playground__meta"><strong id="color-playground-${role}-label">${label}</strong><code class="rf-text rf-text--caption rf-text--secondary" data-color-playground-value>${escapeHtml(initial?.light.resolved || '')}</code></span><label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="${role}Enabled" data-color-playground-toggle${enabled ? ' checked' : ''}><span class="rf-switch__track"></span></span><span class="rf-sr-only">Включить ${label}</span></label><div class="rf-dropdown catalog-color-playground__dropdown catalog-color-playground__dropdown--state" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${role}State" data-rf-dropdown-input data-color-playground-state-input value="${selectedState}"><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger data-color-playground-state-trigger aria-label="${label}: состояние"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button><div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="${label}: состояния" hidden>${stateOptions}</div></div><div class="rf-dropdown catalog-color-playground__dropdown catalog-color-playground__dropdown--token" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${role}Token" data-rf-dropdown-input data-color-playground-input value="${selected}"><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger data-color-playground-token-trigger data-rf-dropdown-placeholder="Выберите Context token" aria-label="${label}: Context token"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button><div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="${label} Context tokens" hidden>${tokenOptions}</div></div></div>`;
};
const colorPlayground = `<section class="catalog-color-playground rf-stack rf-stack--gap-4" data-color-playground aria-label="Context color playground"><div class="catalog-color-playground__stage" data-color-playground-stage data-color-playground-theme="light"><button class="rf-icon-button rf-icon-button--secondary catalog-color-playground__theme-toggle" type="button" data-color-playground-theme-toggle aria-label="Тема превью: светлая. Переключить на тёмную" aria-pressed="false"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="sunny" data-color-playground-theme-icon="light" aria-hidden="true"></span><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="clear-night-01" data-color-playground-theme-icon="dark" aria-hidden="true" hidden></span></button><article class="catalog-color-playground__specimen" data-color-playground-specimen><span class="catalog-color-playground__overlay" data-color-playground-overlay aria-hidden="true"></span><span class="catalog-color-playground__icon" data-color-playground-icon><span class="rf-icon rf-icon--md" data-rf-icon-glyph="ai-02" aria-hidden="true"></span></span><span class="catalog-color-playground__copy" data-color-playground-text><strong class="rf-text rf-text--headline-xxs">Context в действии</strong><span class="rf-text rf-text--body-small">Один элемент, пять независимых цветовых ролей.</span></span></article></div><form class="catalog-color-playground__controls" data-color-playground-controls>${playgroundRoles.map(playgroundParameter).join('')}</form><span class="rf-sr-only" data-color-playground-status aria-live="polite"></span></section>`;
const architecture = `<section class="catalog-color-tab-section catalog-color-anatomy rf-stack rf-stack--gap-8" aria-labelledby="color-anatomy-title"><div class="catalog-color-anatomy__copy rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="color-anatomy-title">Как устроен цвет Contour</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Цветовая система разделяет исходную палитру, тему и место применения. Это делает интерфейсы узнаваемыми и автоматически поддерживает Light и Dark темы.</p></div>${colorPlayground}${anatomyChapters.map(anatomyChapter).join('')}<section class="catalog-color-anatomy__chapter catalog-color-application" aria-labelledby="color-architecture-title"><div class="catalog-color-anatomy__copy rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3" id="color-architecture-title">Как применять цветовые токены</h3><p class="rf-text rf-text--body-medium rf-text--secondary">Продукт выбирает Context-роль по свойству, смыслу и состоянию. Один путь работает в обеих темах; Alias и Primitive остаются внутренней реализацией системы.</p></div><div class="catalog-callout rf-stack rf-stack--gap-2" data-color-public-api data-public-color-layers="${escapeAttribute(colorPolicy.publicApiLayers.join(','))}"><span class="rf-badge rf-badge--success">Public API</span><strong>Только <code>color.context.*</code> используется в продуктовом коде.</strong><span>Core-компоненты могут связывать Context с собственной анатомией; Primitive, Alias, Static и цветовые Component tokens доступны только авторам системы.</span></div><ol class="catalog-color-architecture">${layerSummary.map(([layer, label, description], index) => { const count = layer === 'primitive' ? primitive.length + staticColors.length : layer === 'alias' ? aliasColors.length : layer === 'context' ? context.length : null; return `<li data-color-anatomy-layer="${layer}" data-color-api="${layer === 'context' ? 'public' : 'internal'}"><span class="rf-badge">${index + 1}</span><strong>${label}${count === null ? '' : ` · ${count}`}</strong><span class="rf-text rf-text--body-small rf-text--secondary">${description}</span></li>`; }).join('')}</ol><section class="rf-stack rf-stack--gap-3" aria-labelledby="color-token-anatomy-title"><h4 class="rf-text rf-text--headline-xxs" id="color-token-anatomy-title">Анатомия имени</h4><div class="catalog-color-token-anatomy"><code class="catalog-color-token-anatomy__path"><span data-token-part="property">background</span>.<span data-token-part="role">brand</span>.<span data-token-part="state">hover</span></code><span class="rf-text rf-text--body-small rf-text--secondary">свойство → смысл → состояние</span><code>color.context.background.brand.hover</code></div></section><section class="rf-stack rf-stack--gap-3" aria-labelledby="color-selection-title"><h4 class="rf-text rf-text--headline-xxs" id="color-selection-title">Выберите роль за три шага</h4><ol class="catalog-color-application__steps"><li><strong>Свойство</strong><span>Background, Text, Icon, Border или Overlay.</span></li><li><strong>Смысл</strong><span>Base, Primary, Brand, Error, Success и другие роли.</span></li><li><strong>Состояние</strong><span>Default, Hover, Active, Selected или Disabled.</span></li></ol></section><div class="catalog-do-dont"><div class="catalog-do rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--success">Используйте</span><ul class="catalog-decision-list"><li>Выбирайте роль по назначению, а не по похожему оттенку.</li><li>Сохраняйте один Context path для Light и Dark.</li><li>На strong-поверхности используйте inverse foreground.</li></ul></div><div class="catalog-dont rf-stack rf-stack--gap-3"><span class="rf-badge rf-badge--error">Не используйте</span><ul class="catalog-decision-list"><li>Не подключайте Primitive или Alias в продуктовый код.</li><li>Не кодируйте смысл или состояние только цветом.</li><li>Не подменяйте системную роль локальным HEX.</li></ul></div></div></section></section>`;
const primitiveSample = (record, layer) => `<article class="catalog-color-primitive__item" data-token-layer="${layer}" data-token-name="${escapeAttribute(record.name)}" data-token-display-name="${escapeAttribute(colorDisplayName(record.name))}" data-token-source="${escapeAttribute(record.value)}"><span class="catalog-color-primitive__swatch" data-token-color="${escapeAttribute(record.value)}"><span class="rf-sr-only">${escapeHtml(record.name)} · ${escapeHtml(record.value)}</span></span>${colorTokenName(record, 'catalog-color-primitive__name')}<code class="rf-text rf-text--caption rf-text--secondary">${escapeHtml(record.value)}</code></article>`;
const primitiveContent = `<section class="catalog-color-tab-section rf-stack rf-stack--gap-6" aria-label="Primitive">${primitiveRampOrder.filter(group => primitiveGroups.has(group)).map(group => { const values = primitiveGroups.get(group); return `<section class="catalog-color-primitive__family rf-stack rf-stack--gap-3" data-primitive-family="${group}" aria-labelledby="color-primitive-${group}-title"><h3 class="rf-text rf-text--heading-h3" id="color-primitive-${group}-title">${escapeHtml(titleCase(group))}</h3><div class="catalog-color-primitive__grid">${values.map(record => primitiveSample(record, 'primitive')).join('')}</div></section>`; }).join('')}<section class="rf-stack rf-stack--gap-3" aria-labelledby="color-static-title"><div class="rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3" id="color-static-title">Static constants</h3><p class="rf-text rf-text--body-small rf-text--secondary">Абсолютные black и white не меняются между темами и применяются только там, где это явно требует контракт.</p></div><div class="catalog-color-primitive__grid">${staticColors.map(record => primitiveSample(record, 'static')).join('')}</div></section></section>`;
const aliasContent = `<section class="catalog-color-tab-section rf-stack rf-stack--gap-6" aria-label="Alias colors">${aliasPalettes}</section>`;
const contextContent = `<section class="catalog-color-tab-section rf-stack rf-stack--gap-8" aria-label="Context colors">${contextPalettes}</section>`;
const migrationNotice = requestedMigration ? `<div class="catalog-callout rf-stack rf-stack--gap-2" data-color-migration-notice><span class="rf-badge rf-badge--warning">Deprecated</span><strong><code>${escapeHtml(requestedMigration.from)}</code> переименован.</strong><span>Используйте <code>${escapeHtml(requestedMigration.to)}</code>. Совместимость действует с ${escapeHtml(requestedMigration.group.deprecatedIn)} до ${escapeHtml(requestedMigration.group.removeIn)}.</span></div>` : '';
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Colors</h1><p class="rf-text rf-text--body-large rf-text--secondary">Цвет отличает Contour и помогает одинаково ясно передавать смысл во всех интерфейсах и темах.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-colors.png" alt="Цветовые образцы Contour" width="1536" height="1024"></div></header>${migrationNotice}<div class="rf-tabs catalog-colors-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Colors">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', architecture)}${tabPanel('primitive', primitiveContent)}${tabPanel('alias', aliasContent)}${tabPanel('context', contextContent)}</div>`;
applyDynamicTokenStyles(foundationPage);
const playground = /** @type {HTMLElement} */(foundationPage.querySelector('[data-color-playground]'));
const playgroundForm = /** @type {CatalogPlaygroundForm} */(playground.querySelector('[data-color-playground-controls]'));
const playgroundStage = /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-stage]'));
const playgroundSpecimen = /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-specimen]'));
const playgroundThemeToggle = /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-theme-toggle]'));
const playgroundContext = contextByName;
const playgroundResolved = (name, theme) => playgroundContext.get(name)?.[theme]?.resolved || 'transparent';
const renderColorPlayground = () => {
const theme = playgroundStage.dataset.colorPlaygroundTheme === 'dark' ? 'dark' : 'light';
const active = [];
playgroundStage.dataset.colorPlaygroundTheme = theme;
const darkTheme = theme === 'dark';
playgroundThemeToggle.setAttribute('aria-pressed', String(darkTheme));
playgroundThemeToggle.setAttribute('aria-label', `Тема превью: ${darkTheme ? 'тёмная. Переключить на светлую' : 'светлая. Переключить на тёмную'}`);
playgroundThemeToggle.title = darkTheme ? 'Тёмная тема' : 'Светлая тема';
/** @type {HTMLElement} */(playgroundThemeToggle.querySelector('[data-color-playground-theme-icon="light"]')).hidden = darkTheme;
/** @type {HTMLElement} */(playgroundThemeToggle.querySelector('[data-color-playground-theme-icon="dark"]')).hidden = !darkTheme;
playgroundStage.style.setProperty('--catalog-color-playground-canvas', playgroundResolved('color.context.background.canvas', theme));
playgroundRoles.forEach(([role, label]) => {
const row = /** @type {HTMLElement} */(playgroundForm.querySelector(`[data-color-playground-role="${role}"]`));
const toggle = /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-toggle]'));
const stateInput = /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-state-input]'));
const input = /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-input]'));
const values = contextGroups.get(role) || [];
const availableStates = new Set(values.map(item => playgroundState(item.name)));
const states = playgroundStateOrder.filter(item => availableStates.has(item));
let state = states.includes(stateInput.value) ? stateInput.value : playgroundState(playgroundDefaults[role]);
let record = playgroundContext.get(input.value);
if (!record || record.name.split('.')[2] !== role || playgroundState(record.name) !== state) { const family = record?.name.split('.').slice(0, -1).join('.'); record = values.find(item => playgroundState(item.name) === state && item.name.startsWith(`${family}.`)) || values.find(item => playgroundState(item.name) === state); input.value = record.name; input.dispatchEvent(new Event('input', {bubbles: true})); }
stateInput.value = state;
row.dataset.colorPlaygroundState = state;
/** @type {NodeListOf<HTMLElement>} */(row.querySelectorAll('[data-color-playground-option-state]')).forEach(option => { option.hidden = option.dataset.colorPlaygroundOptionState !== state; });
const enabled = toggle.checked;
const value = record[theme].resolved;
row.dataset.colorPlaygroundEnabled = String(enabled);
row.dataset.colorPlaygroundToken = record.name;
row.querySelector('[data-color-playground-value]').textContent = value;
/** @type {HTMLElement} */(row.querySelector('[data-color-playground-swatch]')).style.setProperty('--catalog-token-value', value);
/** @type {NodeListOf<HTMLButtonElement>} */(row.querySelectorAll('[data-rf-dropdown-trigger]')).forEach(trigger => { trigger.disabled = !enabled; });
playgroundSpecimen.dataset[`${role}Enabled`] = String(enabled);
playgroundSpecimen.style.setProperty(`--catalog-color-playground-${role}`, value);
if (role === 'text') /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-text]')).hidden = !enabled;
if (role === 'icon') /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-icon]')).hidden = !enabled;
if (role === 'overlay') /** @type {HTMLElement} */(playground.querySelector('[data-color-playground-overlay]')).hidden = !enabled;
if (enabled) active.push(label);
});
playground.querySelector('[data-color-playground-status]').textContent = `${theme === 'light' ? 'Светлая' : 'Тёмная'} тема. Активны: ${active.join(', ') || 'нет активных ролей'}.`;
};
playgroundRoles.forEach(([role]) => { const row = /** @type {HTMLElement} */(playgroundForm.querySelector(`[data-color-playground-role="${role}"]`)); /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-toggle]')).checked = role !== 'overlay'; /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-state-input]')).value = playgroundState(playgroundDefaults[role]); /** @type {HTMLInputElement} */(row.querySelector('[data-color-playground-input]')).value = playgroundDefaults[role]; });
playground.addEventListener('change', renderColorPlayground);
playgroundThemeToggle.addEventListener('click', () => { playgroundStage.dataset.colorPlaygroundTheme = playgroundStage.dataset.colorPlaygroundTheme === 'dark' ? 'light' : 'dark'; renderColorPlayground(); });
renderColorPlayground();
const requestedToken = [.../** @type {NodeListOf<HTMLElement>} */(foundationPage.querySelectorAll('[data-token-name]'))].find(element => element.dataset.tokenName === requested);
if (requestedToken) {
requestedToken.closest('details')?.setAttribute('open', '');
requestedToken.dataset.tokenRequested = 'true';
window.requestAnimationFrame(() => requestedToken.scrollIntoView({block: 'center', behavior: 'auto'}));
}
const colorTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-colors-tabs'));
const syncColorTabQuery = () => {
const activeTab = /** @type {HTMLButtonElement} */(colorTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.colorTab || 'anatomy';
updateQuery('colorTab', activeTab === 'anatomy' ? '' : activeTab);
};
colorTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncColorTabQuery); });
colorTabs.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) window.requestAnimationFrame(syncColorTabQuery); });
/** @type {NodeListOf<HTMLElement>} */(foundationPage.querySelectorAll('[data-copy-color-token]')).forEach(button => button.addEventListener('click', async () => { await navigator.clipboard.writeText(button.dataset.copyColorToken); announce(`Token ${button.dataset.copyColorToken} скопирован`); }));
}
const foundationTokenSource = record => record.alias || record.value;
const foundationTokenResolved = record => record.resolved ?? record.value;
const foundationRecords = (foundation, group) => foundation.dimensions.records.filter(record => !group || record.group === group);
const foundationTokenSpecimen = record => {
const value = foundationTokenResolved(record);
if (record.group === 'radius') return `<span class="catalog-radius-token-sample" data-radius-value="${escapeAttribute(value)}" aria-hidden="true"></span>`;
if (record.group === 'border.width') return `<span class="catalog-border-token-sample" data-border-value="${escapeAttribute(value)}" aria-hidden="true"></span>`;
if (record.group === 'opacity') return `<span class="catalog-opacity-token-sample" data-opacity-value="${escapeAttribute(value)}" aria-hidden="true"></span>`;
return `<span class="catalog-dimension-token-sample" data-dimension-value="${escapeAttribute(value)}" aria-hidden="true"></span>`;
};
const foundationTokenTable = (records,caption,r=1) => `<div class="catalog-table-wrap"><table class="catalog-table catalog-foundation-token-table"><caption class="rf-sr-only">${escapeHtml(caption)}</caption><thead><tr><th scope="col">Token</th><th scope="col">Value</th>${r ? '<th scope="col">Resolved</th>' : ''}<th scope="col">Specimen</th></tr></thead><tbody>${records.map(record => { const source = foundationTokenSource(record); return `<tr data-foundation-token-layer="${escapeAttribute(record.layer)}" data-foundation-token-name="${escapeAttribute(record.name)}" data-foundation-token-source="${escapeAttribute(source)}" data-foundation-token-type="${escapeAttribute(record.type)}"><th scope="row"><code>${escapeHtml(record.name)}</code></th><td><code>${escapeHtml(source)}</code></td>${r ? `<td><code>${escapeHtml(foundationTokenResolved(record))}</code></td>` : ''}<td>${foundationTokenSpecimen(record)}</td></tr>`; }).join('')}</tbody></table></div>`;
const highlightRequestedFoundationToken = root => {
const requested = new URL(window.location.href).searchParams.get('token');
const target = [.../** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-foundation-token-name], [data-foundation-support-token-name], [data-component-token-name]'))].find(element => (element.dataset.foundationTokenName || element.dataset.foundationSupportTokenName || element.dataset.componentTokenName) === requested);
if (!target) return;
target.closest('details')?.setAttribute('open', '');
target.dataset.tokenRequested = 'true';
window.requestAnimationFrame(() => target.scrollIntoView({block: 'center', behavior: 'auto'}));
};
function renderDimensions(foundation) {
const dimensions = foundation.dimensions;
const primitives = foundationRecords(foundation, 'dimension');
const opacity = foundationRecords(foundation, 'opacity');
const dimensionGroups = [
['spacing', 'Spacing', 'Интент отступа вместо номера шага.'],
['radius', 'Radius', 'Скругление по смыслу поверхности.'],
['border.width', 'Border Width', 'Толщина структуры, selected и focus.'],
];
const groupTable = group => { const [, label, description] = dimensionGroups.find(item => item[0] === group); const records = foundationRecords(foundation, group); return `<section class="catalog-token-group" data-foundation-group="${escapeAttribute(group)}"><h2 class="rf-text rf-text--heading-h2">${escapeHtml(label)}</h2><p class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(description)}</p>${foundationTokenTable(records, `${label} parameter tokens`)}</section>`; };
const borderStyle = `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="border-style-title"><h2 class="rf-text rf-text--heading-h2" id="border-style-title">Border Style</h2><p class="rf-text rf-text--body-small rf-text--secondary">Стиль линии хранится рядом с размерными ролями; Border Width остаётся единственной шкалой толщины.</p><div class="catalog-table-wrap"><table class="catalog-table"><caption class="rf-sr-only">Border style tokens</caption><thead><tr><th scope="col">Token</th><th scope="col">Type</th><th scope="col">Value</th></tr></thead><tbody>${Object.entries(foundation.borderStyles).map(([name, value]) => { const tokenName = `border.style.${name}`; return `<tr data-foundation-support-token-name="${escapeAttribute(tokenName)}" data-foundation-support-token-source="${escapeAttribute(value)}"><th scope="row"><code>${escapeHtml(tokenName)}</code></th><td><code>string</code></td><td><code>${escapeHtml(value)}</code></td></tr>`; }).join('')}</tbody></table></div></section>`;
const recordByName = new Map(dimensions.records.map(record => [record.name, record]));
const playgroundParameters = [
['padding-inline', 'Horizontal padding', 'spacing', 'spacing.24'],
['padding-block', 'Vertical padding', 'spacing', 'spacing.16'],
['gap', 'Gap', 'spacing', 'spacing.16'],
['radius', 'Radius', 'radius', 'radius.lg'],
['border', 'Border', 'border.width', 'border.width.thin'],
['width', 'Width', 'range', '560'],
['opacity', 'Opacity', 'opacity', 'opacity.100'],
];
const playgroundParameter = ([role, label, group, selected]) => {
if (group === 'range') {
const initial = recordByName.get(`spacing.${selected}`);
return `<div class="catalog-dimension-playground__parameter" data-dimension-playground-role="${role}"><span class="catalog-dimension-playground__sample" aria-hidden="true">${foundationTokenSpecimen(initial)}</span><span class="catalog-dimension-playground__meta"><strong id="dimension-playground-${role}-label">${label}</strong><output class="rf-text rf-text--caption rf-text--secondary" for="dimension-playground-${role}" data-dimension-playground-value>${escapeHtml(selected)}px</output></span><div class="rf-slider-field catalog-dimension-playground__range"><input class="rf-slider" id="dimension-playground-${role}" name="${role}" type="range" min="0" max="1600" step="1" value="${escapeAttribute(selected)}" aria-labelledby="dimension-playground-${role}-label" data-dimension-playground-input><span class="rf-slider-field__limits" aria-hidden="true"><span>0px</span><span>1600px</span></span></div></div>`;
}
const records = foundationRecords(foundation, group), initial = recordByName.get(selected);
return `<div class="catalog-dimension-playground__parameter" data-dimension-playground-role="${role}"><span class="catalog-dimension-playground__sample" aria-hidden="true">${foundationTokenSpecimen(initial)}</span><span class="catalog-dimension-playground__meta"><strong>${label}</strong><code class="rf-text rf-text--caption rf-text--secondary" data-dimension-playground-value>${escapeHtml(foundationTokenResolved(initial))}</code></span><div class="rf-dropdown catalog-dimension-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${role}Token" data-rf-dropdown-input data-dimension-playground-input value="${selected}"><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger data-rf-dropdown-placeholder="Выберите ${label}" aria-label="${label}: token"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button><div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="${label} tokens" hidden>${records.map(record => dropdownItem(escapeAttribute(record.name), escapeHtml(record.name), {selected: record.name === selected, description: escapeHtml(foundationTokenResolved(record))})).join('')}</div></div></div>`;
};
const anatomy = `<section class="catalog-dimension-tab-section catalog-dimension-anatomy rf-stack rf-stack--gap-4" aria-labelledby="dimension-anatomy-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="dimension-anatomy-title">Как устроены Metrics</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте параметры одного элемента.</p></header><section class="catalog-dimension-playground rf-stack rf-stack--gap-4" data-dimension-playground aria-label="Metrics"><div class="catalog-dimension-playground__stage" data-dimension-playground-stage><article class="catalog-dimension-playground__specimen" data-dimension-playground-specimen><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="pin-code" aria-hidden="true"></span><span class="catalog-dimension-playground__copy"><strong class="rf-text rf-text--headline-xxs">Metrics в действии</strong><span class="rf-text rf-text--body-medium">Семь независимых параметров.</span></span></article></div><form class="catalog-dimension-playground__controls" data-dimension-playground-controls>${playgroundParameters.map(playgroundParameter).join('')}</form></section></section>`;
const dimensionContent = `<section class="catalog-dimension-tab-section rf-stack rf-stack--gap-8" aria-labelledby="dimension-values-title"><section class="catalog-section rf-stack rf-stack--gap-4"><h2 class="rf-text rf-text--heading-h2" id="dimension-values-title">Dimension values</h2><p class="rf-text rf-text--body-small rf-text--secondary">Целочисленные значения идут по возрастанию и не несут UI-роли.</p>${foundationTokenTable(primitives, 'Full ascending Dimension scale', 0)}</section></section>`;
const propertyContent = (id, groups, extra='') => `<section class="catalog-dimension-tab-section rf-stack rf-stack--gap-8" aria-label="${escapeAttribute(titleCase(id))} parameters">${groups.map(groupTable).join('')}${extra}</section>`;
const opacityContent = `<section class="catalog-dimension-tab-section rf-stack rf-stack--gap-8" aria-labelledby="dimension-opacity-title"><section class="catalog-token-group"><h2 class="rf-text rf-text--heading-h2" id="dimension-opacity-title">Opacity</h2><p class="rf-text rf-text--body-small rf-text--secondary">Числовая шкала прозрачности. Theme-aware scrim и backdrop остаются цветовыми ролями в Colors.</p>${foundationTokenTable(opacity, 'Opacity values', 0)}</section></section>`;
const requested = new URL(window.location.href).searchParams.get('token');
const requestedRecord = dimensions.records.find(record => record.name === requested);
const groupTabs = {'dimension':'dimension','spacing':'spacing','radius':'radius','border.width':'border','opacity':'opacity'};
const requestedTab = requested?.startsWith('border.style.') ? 'border' : requestedRecord ? groupTabs[requestedRecord.group] : '';
const tabNames = ['anatomy', 'dimension', 'spacing', 'radius', 'border', 'opacity'];
const rawTab = new URL(window.location.href).searchParams.get('dimensionTab');
const legacyTabs = {dimensions: 'dimension', 'primitive-values': 'dimension', 'foundation-aliases': 'spacing', sizing: 'spacing'};
const selectedTab = tabNames.includes(rawTab) ? rawTab : legacyTabs[rawTab] || requestedTab || 'anatomy';
const tabLabels = {anatomy: 'Anatomy', dimension: 'Dimension', spacing: 'Spacing', radius: 'Radius', border: 'Border', opacity: 'Opacity'};
const tabButton = name => `<button class="rf-tab" id="dimension-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="dimension-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-dimension-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="dimension-panel-${name}" role="tabpanel" aria-labelledby="dimension-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Metrics</h1><p class="rf-text rf-text--body-large rf-text--secondary">Размеры, отступы, скругления, границы и прозрачность интерфейсов Contour.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-dimensions.png" alt="Параметры Metrics Contour" width="1536" height="1024"></div></header><div class="rf-tabs catalog-dimensions-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Параметры Metrics">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', anatomy)}${tabPanel('dimension', dimensionContent)}${tabPanel('spacing', propertyContent('spacing',['spacing']))}${tabPanel('radius', propertyContent('radius',['radius']))}${tabPanel('border', propertyContent('border',['border.width'],borderStyle))}${tabPanel('opacity', opacityContent)}</div>`;
applyDynamicTokenStyles(foundationPage);
highlightRequestedFoundationToken(foundationPage);
const dimensionTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-dimensions-tabs'));
const syncDimensionTabQuery = () => { const activeTab = /** @type {HTMLButtonElement} */(dimensionTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.dimensionTab || 'anatomy'; updateQuery('dimensionTab', activeTab === 'anatomy' ? '' : activeTab); };
dimensionTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncDimensionTabQuery); });
dimensionTabs.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) window.requestAnimationFrame(syncDimensionTabQuery); });
if (rawTab === 'sizing') updateQuery('dimensionTab', 'spacing');
const dimensionPlayground = /** @type {HTMLElement} */(foundationPage.querySelector('[data-dimension-playground]'));
const syncDimensionPlayground = () => { const specimen = /** @type {HTMLElement} */(dimensionPlayground.querySelector('[data-dimension-playground-specimen]')); /** @type {NodeListOf<HTMLElement>} */(dimensionPlayground.querySelectorAll('[data-dimension-playground-role]')).forEach(row => { const input = /** @type {HTMLInputElement} */(row.querySelector('[data-dimension-playground-input]')), role = row.dataset.dimensionPlaygroundRole, record = recordByName.get(input.value), value = role === 'width' ? `${input.value}px` : foundationTokenResolved(record); row.querySelector('[data-dimension-playground-value]').textContent = value; specimen.style.setProperty(`--catalog-dimension-playground-${role}`, value); if (['padding-inline','padding-block','gap'].includes(role)) specimen.style.setProperty(role, value); }); };
/** @type {NodeListOf<HTMLElement>} */(dimensionPlayground.querySelectorAll('[data-dimension-playground-input]')).forEach(input => { input.addEventListener('input', syncDimensionPlayground); input.addEventListener('change', syncDimensionPlayground); });
syncDimensionPlayground();
}
function renderTypography(foundation) {
const typography = foundation.typography;
const layers = typography.layers;
const typographyClass = record => {
let target = record.name;
if (record.alias?.startsWith('{typography.style.')) target = record.alias.slice(1, -1);
const parts = target.split('.');
const role = parts[2];
const size = parts[3];
return `rf-text--${role}-${size}`;
};
const styleGroups = [
{key: 'display', sizes: ['xl','l','m','s'], sample: 'Второе цветение', description: 'Крупные промо-заголовки и hero-композиции.'},
{key: 'title', sizes: ['xl','l','m','s'], sample: 'Новая коллекция', description: 'Названия страниц и крупных самостоятельных разделов.'},
{key: 'headline', sizes: ['xl','l','m','s','xs','xxs'], sample: 'Свежие объявления рядом', description: 'Заголовки секций, карточек и плотных контентных блоков.'},
{key: 'body', sizes: ['xl','l','m','s','xs','xxs'], sample: 'Contour помогает находить цветы рядом.', description: 'Абзацы, описания и основной текст интерфейса.'},
];
const styleGroupByKey = new Map(styleGroups.map((group, index) => [group.key, {...group, index}]));
const textStyles = [...layers.textStyle].filter(record => {
const [, , group, size] = record.name.split('.');
return styleGroupByKey.get(group)?.sizes.includes(size);
}).sort((left, right) => {
const leftParts = left.name.split('.'), rightParts = right.name.split('.');
const leftGroup = styleGroupByKey.get(leftParts[2]), rightGroup = styleGroupByKey.get(rightParts[2]);
return leftGroup.index - rightGroup.index || leftGroup.sizes.indexOf(leftParts[3]) - rightGroup.sizes.indexOf(rightParts[3]);
});
const styleByName = new Map(textStyles.map(record => [record.name, record]));
const typographySizeAndLineHeight = record => {
const resolved = record?.resolved || {};
const fontSize = resolved.fontSize;
const sizeValue = fontSize && typeof fontSize === 'object' ? fontSize.value : fontSize;
const sizeUnit = fontSize && typeof fontSize === 'object' ? fontSize.unit || '' : '';
const lineHeight = typeof resolved.lineHeight === 'number' && typeof sizeValue === 'number' ? `${Math.round(sizeValue * resolved.lineHeight * 100) / 100}${sizeUnit}` : formatValue(resolved.lineHeight);
return `${formatValue(fontSize)} / ${lineHeight}`;
};
const typographyRole = record => record.name.split('.')[2];
const typographySample = record => styleGroupByKey.get(typographyRole(record))?.sample || 'Второе цветение';
const typographyMetrics = record => `${typographySizeAndLineHeight(record)} · ${formatValue(record?.resolved?.fontWeight)}`;
const primitiveGroups = [
{key: 'family', label: 'Family', names: ['title', 'headline', 'body']},
{key: 'weight', label: 'Weight', names: ['regular', 'medium', 'bold']},
{key: 'size', label: 'Size', names: ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl']},
{key: 'lineHeight', label: 'Line-height', names: ['4xs', '3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl']},
];
const primitiveByName = new Map(layers.primitive.map(record => [record.name, record]));
const primitiveGroupRecords = Object.fromEntries(primitiveGroups.map(group => [group.key, group.names.map(name => primitiveByName.get(`font.${group.key}.${name}`)).filter(Boolean)]));
const primitiveName = (record, group) => {
const name = record.name.split('.').at(-1);
if (group === 'size' || group === 'lineHeight') return name.toUpperCase();
return titleCase(name.replaceAll('-', ' '));
};
const primitiveValue = record => {
const value = record.resolved ?? record.value;
if (record.name.startsWith('font.family.') && Array.isArray(value)) return formatValue(value[0]);
return formatValue(value);
};
const requested = new URL(window.location.href).searchParams.get('token');
const primitiveTables = primitiveGroups.map(group => {
const records = primitiveGroupRecords[group.key];
return `<section class="catalog-token-group" data-typography-primitive-group="${escapeAttribute(group.key)}"><h2 class="rf-text rf-text--heading-h2">${escapeHtml(group.label)}</h2><div class="catalog-table-wrap" data-typography-primitive-table-wrap="${escapeAttribute(group.key)}"><table class="catalog-table" data-typography-primitive-table="${escapeAttribute(group.key)}"><caption class="rf-sr-only">${escapeHtml(group.label)} Primitive values</caption><thead><tr><th scope="col">Name</th><th scope="col">Value</th></tr></thead><tbody>${records.map(record => `<tr data-foundation-token-layer="primitive" data-foundation-token-name="${escapeAttribute(record.name)}" data-foundation-token-source="${escapeAttribute(formatValue(record.value))}"><th scope="row">${escapeHtml(primitiveName(record, group.key))}</th><td>${escapeHtml(primitiveValue(record))}</td></tr>`).join('')}</tbody></table></div></section>`;
}).join('');
const styleGroupTable = group => {
const records = group.sizes.map(size => styleByName.get(`typography.style.${group.key}.${size}`)).filter(Boolean);
const rows = records.map(record => {
const source = record.branches.map(branch => branch.alias).join(' ');
const size = record.name.split('.').at(-1).toUpperCase();
return `<tr data-foundation-token-layer="textStyle" data-foundation-token-name="${escapeAttribute(record.name)}" data-foundation-token-source="${escapeAttribute(source)}"><th scope="row"><span class="catalog-typography-style-size">${escapeHtml(size)}</span><span class="catalog-typography-style-specimen rf-text ${escapeAttribute(typographyClass(record))}">${escapeHtml(typographySample(record))}</span></th><td><code>${escapeHtml(record.name)}</code></td><td><code>${escapeHtml(typographySizeAndLineHeight(record))}</code></td><td><code>${escapeHtml(formatValue(record.resolved?.fontWeight))}</code></td></tr>`;
}).join('');
const label = titleCase(group.key);
return `<section class="catalog-token-group catalog-typography-style-group rf-stack rf-stack--gap-3" data-typography-style-group="${escapeAttribute(group.key)}" aria-labelledby="typography-style-${escapeAttribute(group.key)}-title"><header class="rf-stack rf-stack--gap-1"><h3 class="rf-text rf-text--heading-h3" id="typography-style-${escapeAttribute(group.key)}-title">${escapeHtml(label)}</h3><p class="rf-text rf-text--body-small rf-text--secondary">${escapeHtml(group.description)}</p></header><div class="catalog-table-wrap"><table class="catalog-table catalog-typography-style-table"><caption class="rf-sr-only">${escapeHtml(label)} Styles</caption><thead><tr><th scope="col">Size & specimen</th><th scope="col">Token</th><th scope="col">Size / line-height</th><th scope="col">Weight</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
};
const systemStyleTables = styleGroups.map(styleGroupTable).join('');
const anatomyStyleGroups = styleGroups;
const anatomyDefaults = {display: 'm', title: 'm', headline: 'm', body: 'm'};
const anatomyStyleOptions = group => group.sizes.map(size => {
const record = styleByName.get(`typography.style.${group.key}.${size}`);
return record ? dropdownItem(record.name, size.toUpperCase(), {selected: size === anatomyDefaults[group.key], description: typographySizeAndLineHeight(record)}) : '';
}).join('');
const anatomyControls = anatomyStyleGroups.map(group => {
const initial = styleByName.get(`typography.style.${group.key}.${anatomyDefaults[group.key]}`);
const label = titleCase(group.key);
return `<section class="catalog-typography-playground__group" data-typography-playground-group="${escapeAttribute(group.key)}" data-typography-playground-enabled="true" aria-labelledby="typography-playground-${escapeAttribute(group.key)}-title"><span class="catalog-typography-playground__meta"><strong id="typography-playground-${escapeAttribute(group.key)}-title">${escapeHtml(label)}</strong><code class="rf-text rf-text--caption rf-text--secondary" data-typography-playground-value>${escapeHtml(initial.name)}</code></span><label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" name="typography-${escapeAttribute(group.key)}-enabled" data-typography-playground-toggle checked><span class="rf-switch__track"></span></span><span class="rf-sr-only">Включить ${escapeHtml(label)}</span></label><input class="rf-text-field catalog-typography-playground__text" type="text" value="${escapeAttribute(typographySample(initial))}" data-typography-playground-text aria-label="${escapeAttribute(label)}: текст"><span class="rf-dropdown catalog-typography-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="typography-${escapeAttribute(group.key)}-style" value="${escapeAttribute(initial.name)}" data-rf-dropdown-input data-typography-playground-style><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger aria-label="${escapeAttribute(label)}: Style"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button><span class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="${escapeAttribute(label)} Styles" hidden>${anatomyStyleOptions(group)}</span></span></section>`;
}).join('');
const anatomyPreviews = anatomyStyleGroups.map(group => {
const record = styleByName.get(`typography.style.${group.key}.${anatomyDefaults[group.key]}`);
return `<span class="catalog-typography-playground__preview" data-typography-playground-preview="${escapeAttribute(group.key)}"><span class="catalog-typography-playground__sample" data-typography-playground-sample>${escapeHtml(typographySample(record))}</span></span>`;
}).join('');
const anatomy = `<section class="catalog-typography-tab-section catalog-typography-anatomy rf-stack rf-stack--gap-4" aria-labelledby="typography-anatomy-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="typography-anatomy-title">Как устроена Typography</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Включайте Styles по отдельности, вводите текст и выбирайте размер.</p></header><section class="catalog-dimension-playground catalog-typography-playground rf-stack rf-stack--gap-4" data-typography-playground aria-label="Typography"><div class="catalog-dimension-playground__stage"><article class="catalog-typography-playground__specimen" data-typography-playground-specimen><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="ai-02" aria-hidden="true"></span><span class="catalog-typography-playground__copy">${anatomyPreviews}<span class="rf-text rf-text--body-medium rf-text--secondary" data-typography-playground-empty hidden>Включите хотя бы один Style.</span></span></article></div><form class="catalog-typography-playground__controls" data-typography-playground-controls>${anatomyControls}</form></section><div class="catalog-callout rf-stack rf-stack--gap-2" data-typography-public-api><span class="rf-badge rf-badge--success">Public API</span><strong>В продуктовом коде используйте только <code>typography.style.*</code>.</strong><span>Display, Title, Headline и Body — единая базовая шкала для текста и компонентов.</span></div></section>`;
const stylesContent = `<section class="catalog-typography-tab-section catalog-typography-style-catalog rf-stack rf-stack--gap-8" aria-label="Typography Styles"><section class="catalog-typography-style-section rf-stack rf-stack--gap-6" aria-label="Базовые стили">${systemStyleTables}</section></section>`;
const primitiveContent = `<section class="catalog-typography-tab-section rf-stack rf-stack--gap-8" data-typography-primitives aria-label="Typography Primitive">${primitiveTables}</section>`;
const requestedTab = requested?.startsWith('font.') ? 'primitive' : requested?.startsWith('typography.') ? 'styles' : '';
const tabNames = ['anatomy','primitive','styles'];
const rawTab = new URL(window.location.href).searchParams.get('typographyTab');
const legacyTabs = {semantic: 'styles', alias: 'styles', 'text-styles': 'styles', components: 'styles', 'component-styles': 'styles'};
const selectedTab = tabNames.includes(rawTab) ? rawTab : legacyTabs[rawTab] || requestedTab || 'anatomy';
const tabLabels = {anatomy: 'Anatomy', styles: 'Styles', primitive: 'Primitive'};
const tabButton = name => `<button class="rf-tab" id="typography-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="typography-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-typography-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="typography-panel-${name}" role="tabpanel" aria-labelledby="typography-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const linkGuidance = `<section class="catalog-section rf-stack rf-stack--gap-4" aria-labelledby="typography-links-title"><h2 class="rf-text rf-text--heading-h2" id="typography-links-title">Ссылки</h2><p class="rf-text rf-text--body-medium">Текстовая ссылка — правило Typography. Используйте настоящий a с href и публичный класс rf-link: размер наследуется от текста, цвет и подчёркивание задаёт Foundation. Наведение меняет цвет, клавиша Tab показывает фокус. Посещённая ссылка сохраняет оформление.</p><div class="rf-inline rf-inline--gap-4"><a class="rf-link" href="#components">Открыть компоненты</a><span class="rf-link" aria-disabled="true">Раздел недоступен</span></div><p class="rf-text rf-text--body-small rf-text--secondary">Для перехода сохраняйте href: работают клавиатура, копирование адреса и новая вкладка. Недоступный адрес показывайте текстом без href, а действие выполняйте через Button.</p><pre class="catalog-button-example__code"><code>&lt;a class="rf-link" href="/catalog"&gt;Открыть каталог&lt;/a&gt;</code></pre></section>`;
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Typography</h1><p class="rf-text rf-text--body-large rf-text--secondary">Шрифтовая шкала и роли текста помогают ясно выстраивать иерархию во всех интерфейсах Contour.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-typography.png" alt="Типографическая композиция Contour" width="1536" height="1024"></div></header><div class="rf-tabs catalog-typography-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Typography">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', anatomy + linkGuidance)}${tabPanel('primitive', primitiveContent)}${tabPanel('styles', stylesContent)}</div>`;
applyDynamicTokenStyles(foundationPage);
highlightRequestedFoundationToken(foundationPage);
const typographyTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-typography-tabs'));
const syncTypographyTabQuery = () => { const activeTab = /** @type {HTMLButtonElement} */(typographyTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.typographyTab || 'anatomy'; updateQuery('typographyTab', activeTab === 'anatomy' ? '' : activeTab); };
typographyTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncTypographyTabQuery); });
typographyTabs.addEventListener('keydown', event => { if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) window.requestAnimationFrame(syncTypographyTabQuery); });
const typographyPlayground = /** @type {HTMLElement} */(foundationPage.querySelector('[data-typography-playground]'));
const typographyCssValue = record => {
const isResolvedToken = record && typeof record === 'object' && !Array.isArray(record) && (Object.hasOwn(record, 'resolved') || (Object.hasOwn(record, 'value') && !Object.hasOwn(record, 'unit')));
const value = isResolvedToken ? record.resolved ?? record.value : record;
if (Array.isArray(value)) return value.map(item => item.includes(' ') ? `"${item}"` : item).join(', ');
if (value && typeof value === 'object' && 'value' in value) return `${value.value}${value.unit || ''}`;
return `${value ?? ''}`;
};
const syncTypographyPlayground = () => {
let enabledCount = 0;
/** @type {NodeListOf<HTMLElement>} */(typographyPlayground.querySelectorAll('[data-typography-playground-group]')).forEach(group => {
const toggle = /** @type {HTMLInputElement} */(group.querySelector('[data-typography-playground-toggle]'));
const enabled = toggle.checked;
group.dataset.typographyPlaygroundEnabled = `${enabled}`;
/** @type {HTMLInputElement} */(group.querySelector('[data-typography-playground-text]')).disabled = !enabled;
/** @type {HTMLButtonElement} */(group.querySelector('[data-rf-dropdown-trigger]')).disabled = !enabled;
const styleName = /** @type {HTMLInputElement} */(group.querySelector('[data-typography-playground-style]')).value;
group.querySelector('[data-typography-playground-value]').textContent = styleName;
const record = styleByName.get(styleName);
if (!record) return;
const preview = /** @type {HTMLElement} */(typographyPlayground.querySelector(`[data-typography-playground-preview="${group.dataset.typographyPlaygroundGroup}"]`));
preview.hidden = !enabled;
if (!enabled) return;
enabledCount += 1;
const sample = /** @type {HTMLElement} */(preview.querySelector('[data-typography-playground-sample]'));
sample.textContent = /** @type {HTMLInputElement} */(group.querySelector('[data-typography-playground-text]')).value;
sample.style.fontFamily = typographyCssValue(record.resolved?.fontFamily);
sample.style.fontSize = typographyCssValue(record.resolved?.fontSize);
sample.style.fontWeight = typographyCssValue(record.resolved?.fontWeight);
sample.style.lineHeight = typographyCssValue(record.resolved?.lineHeight);
sample.style.letterSpacing = typographyCssValue(record.resolved?.letterSpacing);
});
/** @type {HTMLElement} */(typographyPlayground.querySelector('[data-typography-playground-empty]')).hidden = enabledCount > 0;
};
typographyPlayground.addEventListener('input', syncTypographyPlayground);
typographyPlayground.addEventListener('change', syncTypographyPlayground);
syncTypographyPlayground();
}
function renderElevation(foundation) {
const order = ['none', 'sm', 'md', 'lg', 'overlay'];
const levelMeta = {
none: {label: 'Flat', description: 'Базовая поверхность без отделения по глубине.', consumers: 'Обычный контент и плоские поверхности.'},
sm: {label: 'Subtle raised', description: 'Мягко отделяет локальный блок от соседней поверхности.', consumers: 'Card.'},
md: {label: 'Raised', description: 'Поднятая или плавающая поверхность внутри текущего контекста.', consumers: 'Dropdown, Menu, legacy elevated Surface (deprecated) и hover интерактивной Card.'},
lg: {label: 'High raised', description: 'Высокий уровень для редкой плавающей поверхности.', consumers: 'Зарезервирован; стабильного потребителя пока нет.'},
overlay: {label: 'Overlay', description: 'Верхний визуальный слой над основным интерфейсом.', consumers: 'Dialog и Toast.'},
};
const shadowSummary = value => {
if (!Array.isArray(value) || !value.length) return 'none';
const shadow = value[0], color = shadow.color || {}, alpha = color.alpha === undefined ? '' : ` / ${Math.round(color.alpha * 100)}%`;
return `${formatValue(shadow.offsetX)} ${formatValue(shadow.offsetY)} ${formatValue(shadow.blur)} ${formatValue(shadow.spread)} · ${color.hex || formatValue(color)}${alpha}`;
};
const requested = new URL(window.location.href).searchParams.get('token');
const tabNames = ['anatomy', 'levels'];
const requestedTab = requested?.startsWith('elevation.') ? 'levels' : '';
const urlTab = new URL(window.location.href).searchParams.get('elevationTab');
const selectedTab = requestedTab || (tabNames.includes(urlTab) ? urlTab : 'anatomy');
const tabLabels = {anatomy: 'Anatomy', levels: 'Levels'};
const tabButton = name => `<button class="rf-tab" id="elevation-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="elevation-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-elevation-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="elevation-panel-${name}" role="tabpanel" aria-labelledby="elevation-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const elevationContextProperties = [
'--rf-color-context-background-base-default',
'--rf-color-context-background-canvas',
'--rf-color-context-background-primary-default',
'--rf-color-context-border-primary-default',
'--rf-color-context-border-secondary-default',
'--rf-color-context-text-primary-default',
'--rf-color-context-text-secondary-default',
];
const rootElement = document.documentElement;
const originalTheme = rootElement.getAttribute('data-theme');
const elevationThemeStyles = Object.fromEntries(['light', 'dark'].map(theme => {
rootElement.setAttribute('data-theme', theme);
const computed = getComputedStyle(rootElement);
const declarations = Object.fromEntries(elevationContextProperties.map(property => [property, computed.getPropertyValue(property).trim()]));
return [theme, declarations];
}));
if (originalTheme === null) rootElement.removeAttribute('data-theme');
else rootElement.setAttribute('data-theme', originalTheme);
const elevationThemeAttribute = theme => `data-theme="${theme}" data-elevation-theme-context="${theme}"`;
const anatomyScene = theme => `<figure class="catalog-elevation-anatomy__theme rf-stack rf-stack--gap-2" ${elevationThemeAttribute(theme)}><h3 class="rf-text rf-text--headline-xxs">${titleCase(theme)} theme</h3><div class="catalog-elevation-scene"><div class="catalog-elevation-scene__surface catalog-elevation-scene__surface--base"><span class="rf-text rf-text--label-medium">Surface</span></div><div class="catalog-elevation-scene__surface catalog-elevation-scene__surface--raised" data-elevation-token="md"><span class="rf-text rf-text--label-medium">Raised</span></div><div class="catalog-elevation-scene__surface catalog-elevation-scene__surface--overlay" data-elevation-token="overlay"><span class="rf-text rf-text--label-medium">Overlay</span></div></div><figcaption class="rf-text rf-text--body-small rf-text--secondary">${theme === 'dark' ? 'Surface и border сохраняют иерархию, даже когда md не рисует тень.' : 'Surface, border и shadow вместе передают расстояние между слоями.'}</figcaption></figure>`;
const usageContent = `<section class="catalog-elevation-usage rf-stack rf-stack--gap-6" aria-labelledby="elevation-usage-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="elevation-usage-title">Как применять Elevation</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Начинайте с плоской композиции и поднимайте только поверхность, которая действительно должна оказаться ближе к пользователю.</p></header><div class="catalog-do-dont"><section class="catalog-do rf-stack rf-stack--gap-3"><h3 class="rf-text rf-text--heading-h3">Используйте</h3><ul><li>Border или свободное пространство для обычного разделения контента.</li><li>Системную пару Context surface + Elevation token.</li><li><code>overlay</code> для Dialog, Toast и других верхних слоёв.</li><li>Отдельный stacking contract для поведения наложения.</li></ul></section><section class="catalog-dont rf-stack rf-stack--gap-3"><h3 class="rf-text rf-text--heading-h3">Не используйте</h3><ul><li>Тень на каждой карточке только ради декоративного эффекта.</li><li>Локальный <code>box-shadow</code> вместо системного component contract.</li><li>Тень как единственный признак focus, статуса или доступной границы.</li><li>Название уровня Elevation как значение <code>z-index</code>.</li></ul></section></div><section class="rf-stack rf-stack--gap-3" aria-labelledby="elevation-component-map-title"><h3 class="rf-text rf-text--heading-h3" id="elevation-component-map-title">Текущие потребители</h3><ul class="catalog-elevation-usage__list"><li><code>elevation.sm</code><span>Card</span></li><li><code>elevation.md</code><span>Dropdown, Menu, legacy Select, legacy elevated Surface (deprecated) и интерактивная Card в hover</span></li><li><code>elevation.lg</code><span>Резерв высокого уровня без стабильного потребителя</span></li><li><code>elevation.overlay</code><span>Dialog и Toast</span></li></ul></section><div class="catalog-callout"><strong>Публичный API живёт в компоненте.</strong><p class="rf-text rf-text--body-medium">Продуктовый CSS использует готовый Core component. Foundation-токены Elevation остаются внутренним входом для авторов компонентов.</p></div></section>`;
const anatomy = `<section class="catalog-color-tab-section catalog-elevation-anatomy rf-stack rf-stack--gap-6"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2">Как устроен Elevation</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Elevation — это не декоративная тень, а совместная работа поверхности, границы и глубины. Порядок наложения задаётся отдельно.</p></header><div class="catalog-elevation-anatomy__themes">${anatomyScene('light')}${anatomyScene('dark')}</div><ul class="catalog-elevation-anatomy__parts"><li><strong>Surface</strong><span>Context background задаёт материал и сохраняет различие слоёв в Light и Dark.</span></li><li><strong>Boundary</strong><span>Border или свободное пространство отделяют поверхность до добавления тени.</span></li><li><strong>Shadow</strong><span>Elevation token добавляет воспринимаемую высоту только там, где она нужна.</span></li><li><strong>Stacking order</strong><span><code>z-index</code> управляет наложением и не вычисляется из визуального уровня Elevation.</span></li></ul><div class="catalog-callout"><strong>Dark theme опирается на поверхность.</strong><p class="rf-text rf-text--body-medium">Уровни <code>sm</code>, <code>md</code> и <code>lg</code> намеренно могут быть без тени. Не возвращайте локальную чёрную тень: используйте системный background и border.</p></div>${usageContent}</section>`;
const levelCard = name => { const meta = levelMeta[name]; return `<article class="catalog-elevation-level rf-stack rf-stack--gap-4" data-foundation-token-layer="elevation" data-foundation-token-name="elevation.${name}"><header class="rf-stack rf-stack--gap-1"><div class="catalog-elevation-level__title"><h3 class="rf-text rf-text--heading-h3">${meta.label}</h3><code>elevation.${name}</code></div><p class="rf-text rf-text--body-medium rf-text--secondary">${meta.description}</p><p class="rf-text rf-text--body-small"><strong>Сейчас:</strong> ${meta.consumers}</p></header><div class="catalog-elevation-level__themes">${['light','dark'].map(theme => `<figure class="catalog-elevation-level__theme rf-stack rf-stack--gap-2" ${elevationThemeAttribute(theme)}><h4 class="rf-text rf-text--label-large">${titleCase(theme)} theme</h4><div class="catalog-elevation-level__stage"><div class="catalog-elevation-sample" data-elevation-token="${name}"><code>elevation.${name}</code><span class="rf-text rf-text--label-medium">${titleCase(theme)}</span></div></div><figcaption class="catalog-elevation-level__value rf-text rf-text--caption rf-text--secondary"><code>${escapeHtml(shadowSummary(foundation.elevation[theme][name]))}</code></figcaption></figure>`).join('')}</div></article>`; };
const levels = `<section class="catalog-color-tab-section"><div class="catalog-elevation-levels__grid">${order.map(levelCard).join('')}</div></section>`;
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Elevation</h1><p class="rf-text rf-text--body-large rf-text--secondary">Глубина помогает понять иерархию поверхностей, не превращая каждую карточку в отдельный слой.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-elevation.png" alt="Композиция из приподнятых поверхностей Contour" width="1536" height="1024"></div></header><div class="rf-tabs catalog-elevation-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Elevation">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', anatomy)}${tabPanel('levels', levels)}</div>`;
/** @type {NodeListOf<HTMLElement>} */(foundationPage.querySelectorAll('[data-elevation-theme-context]')).forEach(element => {
Object.entries(elevationThemeStyles[element.dataset.elevationThemeContext]).forEach(([property, value]) => element.style.setProperty(property, value));
});
applyDynamicTokenStyles(foundationPage);
highlightRequestedFoundationToken(foundationPage);
const elevationTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-elevation-tabs'));
const syncElevationTabQuery = () => { const activeTab = /** @type {HTMLButtonElement} */(elevationTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.elevationTab || 'anatomy'; updateQuery('elevationTab', activeTab === 'anatomy' ? '' : activeTab); };
elevationTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncElevationTabQuery); });
elevationTabs.addEventListener('keydown', event => { if (['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) window.requestAnimationFrame(syncElevationTabQuery); });
}
function renderMotion(foundation) {
const motion = foundation.motion;
const durationOrder = ['fast', 'normal', 'slow', 'ambient', 'reduced'];
const easingOrder = ['standard', 'enter', 'exit'];
const durationMeta = {
fast: {label: 'Fast', description: 'Мгновенный отклик небольшого интерактивного элемента.', use: 'Hover, pressed и компактные controls.'},
normal: {label: 'Normal', description: 'Основная длительность системного перехода.', use: 'Большинство feedback и state transitions.'},
slow: {label: 'Slow', description: 'Переход поверхности, которому нужно показать направление.', use: 'Enter, reposition и крупные изменения состояния.'},
ambient: {label: 'Ambient', description: 'Непрерывное спокойное движение без пользовательского действия.', use: 'Только Spinner, Skeleton и системный loading.'},
reduced: {label: 'Reduced', description: 'Почти мгновенная доступная альтернатива движению.', use: 'Fallback при prefers-reduced-motion.'},
};
const easingMeta = {
standard: {label: 'Standard', description: 'Равномерный системный переход между состояниями.', intent: 'Изменение состояния и reposition.'},
enter: {label: 'Enter', description: 'Быстро начинается и мягко останавливается у цели.', intent: 'Появление и приближение к пользователю.'},
exit: {label: 'Exit', description: 'Мягко начинается и быстро освобождает интерфейс.', intent: 'Исчезновение и удаление поверхности.'},
};
const propertyOptions = [
['slide', 'Position', 'transform + opacity'],
['fade', 'Opacity', 'opacity'],
['scale', 'Scale', 'transform + opacity'],
['color', 'Color', 'color + background-color'],
];
const patterns = [
{key: 'interaction', title: 'Interaction', duration: 'fast', easing: 'standard', properties: 'color, opacity или transform', consumers: 'Button, Chip, Card, ListItem и другие компактные controls.'},
{key: 'enter', title: 'Enter', duration: 'slow', easing: 'enter', properties: 'transform + opacity', consumers: 'Dropdown, Menu, Dialog, Toast и появляющиеся поверхности.'},
{key: 'exit', title: 'Exit', duration: 'normal', easing: 'exit', properties: 'transform + opacity', consumers: 'Закрытие и удаление поверхностей; короче соответствующего enter.'},
{key: 'reposition', title: 'Reposition', duration: 'slow', easing: 'standard', properties: 'transform', consumers: 'Элемент меняет положение, сохраняя связь с источником действия.'},
{key: 'ambient', title: 'Ambient', duration: 'ambient', easing: 'standard', properties: 'transform или opacity', consumers: 'Только Spinner, Skeleton и подтверждённый loading contract.'},
];
const durationValue = name => formatValue(motion.duration[name]);
const easingValue = name => `cubic-bezier(${motion.easing[name].join(', ')})`;
const requested = new URL(window.location.href).searchParams.get('token');
const tabNames = ['anatomy', 'duration', 'easing', 'patterns'];
const requestedTab = requested?.startsWith('motion.duration.') ? 'duration' : requested?.startsWith('motion.easing.') ? 'easing' : '';
const rawTab = new URL(window.location.href).searchParams.get('motionTab');
const selectedTab = requestedTab || (tabNames.includes(rawTab) ? rawTab : 'anatomy');
const tabLabels = {anatomy: 'Anatomy', duration: 'Duration', easing: 'Easing', patterns: 'Patterns'};
const tabButton = name => `<button class="rf-tab" id="motion-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="motion-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-motion-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="motion-panel-${name}" role="tabpanel" aria-labelledby="motion-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const motionDropdown = ({name, label, selected, items, attribute}) => `<div class="catalog-motion-playground__parameter"><span class="catalog-motion-playground__sample" aria-hidden="true"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="${name === 'duration' ? 'timer' : name === 'easing' ? 'waypoints' : 'move'}"></span></span><span class="catalog-motion-playground__meta"><strong>${label}</strong><output class="rf-text rf-text--caption rf-text--secondary" data-motion-playground-${name}-value></output></span><div class="rf-dropdown catalog-motion-playground__dropdown" data-rf-dropdown data-rf-dropdown-mode="selection"><input type="hidden" name="${name}" data-rf-dropdown-input ${attribute} value="${escapeAttribute(selected)}"><button class="rf-dropdown__trigger" type="button" data-rf-dropdown-trigger data-rf-dropdown-placeholder="Выберите ${label}" aria-label="${label}"><span data-rf-dropdown-value></span><span class="rf-icon rf-icon--sm rf-dropdown__chevron" data-rf-icon-glyph="chevron-down" data-rf-dropdown-chevron aria-hidden="true"></span></button><div class="rf-dropdown__panel" role="listbox" data-rf-dropdown-panel aria-label="${label}" hidden>${items.map(item => dropdownItem(escapeAttribute(item.value), escapeHtml(item.label), {selected: item.value === selected, description: escapeHtml(item.description)})).join('')}</div></div></div>`;
const durationItems = durationOrder.map(name => ({value: name, label: durationMeta[name].label, description: `${durationValue(name)} · ${durationMeta[name].use}`}));
const easingItems = easingOrder.map(name => ({value: name, label: easingMeta[name].label, description: easingValue(name)}));
const propertyItems = propertyOptions.map(([value, label, description]) => ({value, label, description}));
const anatomy = `<section class="catalog-motion-tab-section catalog-motion-anatomy rf-stack rf-stack--gap-4" aria-labelledby="motion-anatomy-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="motion-anatomy-title">Как устроен Motion</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Настройте duration, easing и анимируемое свойство одного перехода.</p></header><section class="catalog-motion-playground rf-stack rf-stack--gap-4" data-motion-playground data-motion-reduced="false" aria-label="Motion playground"><div class="catalog-motion-playground__stage"><button class="rf-icon-button rf-icon-button--tertiary catalog-motion-playground__replay" type="button" data-motion-playground-replay aria-label="Повторить движение"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="refresh-cw" aria-hidden="true"></span></button><article class="catalog-motion-playground__specimen" data-motion-playground-specimen data-motion-active="true" data-motion-reduced="false" data-motion-property="slide"><span class="catalog-motion-playground__sample" aria-hidden="true"><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="ai-02"></span></span><span class="catalog-motion-playground__copy"><strong class="rf-text rf-text--headline-xxs">Motion в действии</strong><span class="rf-text rf-text--body-medium">Duration, easing и property работают вместе.</span></span></article></div><form class="catalog-motion-playground__controls" data-motion-playground-controls>${motionDropdown({name: 'duration', label: 'Duration', selected: 'normal', items: durationItems, attribute: 'data-motion-playground-duration'})}${motionDropdown({name: 'easing', label: 'Easing', selected: 'standard', items: easingItems, attribute: 'data-motion-playground-easing'})}${motionDropdown({name: 'property', label: 'Property', selected: 'slide', items: propertyItems, attribute: 'data-motion-playground-property'})}<div class="catalog-motion-playground__parameter"><span class="catalog-motion-playground__sample" aria-hidden="true"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="user"></span></span><span class="catalog-motion-playground__meta"><strong id="motion-playground-reduced-label">Reduced motion</strong><span class="rf-text rf-text--caption rf-text--secondary">Почти мгновенный переход</span></span><label class="rf-switch"><span class="rf-switch__control"><input class="rf-switch__input" type="checkbox" role="switch" aria-labelledby="motion-playground-reduced-label" data-motion-playground-reduced><span class="rf-switch__track" aria-hidden="true"></span></span><span class="rf-sr-only">Включить Reduced motion</span></label></div></form></section><section class="catalog-motion-guidance rf-stack rf-stack--gap-4" aria-labelledby="motion-guidance-title"><h3 class="rf-text rf-text--heading-h3" id="motion-guidance-title">Контракт перехода</h3><div class="catalog-motion-guidance__grid"><article><strong>Duration</strong><span>Сколько длится переход. Выбирайте системный шаг по масштабу изменения.</span></article><article><strong>Easing</strong><span>Как меняется скорость. Enter и exit намеренно асимметричны.</span></article><article><strong>Property</strong><span>Что меняется. Используйте не больше двух свойств одновременно.</span></article></div><div class="catalog-callout"><strong>Доступность — часть контракта.</strong><p class="rf-text rf-text--body-medium">При <code>prefers-reduced-motion: reduce</code> интерфейс остаётся полностью рабочим: движение становится мгновенным или заменяется коротким fade, а feedback, focus и ARIA-сообщения появляются в начале действия.</p></div></section></section>`;
const durationRows = durationOrder.map(name => `<tr data-foundation-token-layer="duration" data-foundation-token-name="motion.duration.${escapeAttribute(name)}"><th scope="row"><code>motion.duration.${escapeHtml(name)}</code></th><td><code>${escapeHtml(durationValue(name))}</code></td><td>${escapeHtml(durationMeta[name].use)}</td><td><button class="catalog-motion-token-sample" type="button" data-motion-token-preview data-motion-duration="${escapeAttribute(name)}" data-motion-easing="standard" aria-label="Воспроизвести motion.duration.${escapeAttribute(name)}"><span class="catalog-motion-token-sample__dot" aria-hidden="true"></span></button></td></tr>`).join('');
const durationContent = `<section class="catalog-motion-tab-section rf-stack rf-stack--gap-4" aria-labelledby="motion-duration-title"><h2 class="rf-text rf-text--heading-h2" id="motion-duration-title">Duration</h2><p class="rf-text rf-text--body-small rf-text--secondary">Пять длительностей покрывают быстрый feedback, переходы поверхностей, ambient loading и reduced motion.</p><div class="catalog-table-wrap"><table class="catalog-table catalog-foundation-token-table"><caption class="rf-sr-only">Motion duration tokens</caption><thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Use</th><th scope="col">Specimen</th></tr></thead><tbody>${durationRows}</tbody></table></div></section>`;
const easingRows = easingOrder.map(name => `<tr data-foundation-token-layer="easing" data-foundation-token-name="motion.easing.${escapeAttribute(name)}"><th scope="row"><code>motion.easing.${escapeHtml(name)}</code></th><td><code>${escapeHtml(easingValue(name))}</code></td><td>${escapeHtml(easingMeta[name].intent)}</td><td><button class="catalog-motion-token-sample" type="button" data-motion-token-preview data-motion-duration="slow" data-motion-easing="${escapeAttribute(name)}" aria-label="Воспроизвести motion.easing.${escapeAttribute(name)}"><span class="catalog-motion-token-sample__dot" aria-hidden="true"></span></button></td></tr>`).join('');
const easingContent = `<section class="catalog-motion-tab-section rf-stack rf-stack--gap-4" aria-labelledby="motion-easing-title"><h2 class="rf-text rf-text--heading-h2" id="motion-easing-title">Easing</h2><p class="rf-text rf-text--body-small rf-text--secondary">Кривая объясняет направление: появление мягко замедляется у цели, исчезновение быстрее освобождает интерфейс.</p><div class="catalog-table-wrap"><table class="catalog-table catalog-foundation-token-table"><caption class="rf-sr-only">Motion easing tokens</caption><thead><tr><th scope="col">Token</th><th scope="col">Curve</th><th scope="col">Intent</th><th scope="col">Specimen</th></tr></thead><tbody>${easingRows}</tbody></table></div></section>`;
const patternCards = patterns.map(pattern => `<article class="catalog-motion-pattern rf-stack rf-stack--gap-3" data-motion-pattern="${escapeAttribute(pattern.key)}"><header class="catalog-motion-pattern__heading"><h3 class="rf-text rf-text--heading-h3">${escapeHtml(pattern.title)}</h3><code>motion.duration.${escapeHtml(pattern.duration)} + motion.easing.${escapeHtml(pattern.easing)}</code></header><div class="catalog-motion-pattern__contract"><span><strong>Duration</strong><code>${escapeHtml(durationValue(pattern.duration))}</code></span><span><strong>Easing</strong><code>${escapeHtml(easingValue(pattern.easing))}</code></span><span><strong>Properties</strong>${escapeHtml(pattern.properties)}</span></div><p class="catalog-motion-pattern__consumers rf-text rf-text--body-medium"><strong>Применяйте:</strong> ${escapeHtml(pattern.consumers)}</p><button class="catalog-motion-token-sample" type="button" data-motion-token-preview data-motion-duration="${escapeAttribute(pattern.duration)}" data-motion-easing="${escapeAttribute(pattern.easing)}" aria-label="Воспроизвести паттерн ${escapeAttribute(pattern.title)}"><span class="catalog-motion-token-sample__dot" aria-hidden="true"></span></button></article>`).join('');
const patternsContent = `<section class="catalog-motion-tab-section rf-stack rf-stack--gap-6" aria-labelledby="motion-patterns-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="motion-patterns-title">Motion patterns</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Готовые сочетания для авторов Core components. Продукт использует поведение компонента, а не собирает движение из raw-токенов.</p></header><div class="catalog-motion-patterns">${patternCards}</div><div class="catalog-do-dont"><section class="catalog-do rf-stack rf-stack--gap-3"><h3 class="rf-text rf-text--heading-h3">Используйте</h3><ul><li><code>transform</code>, <code>opacity</code> и цветовые свойства.</li><li>Один источник движения и одинаковый паттерн у одинаковых компонентов.</li><li>Не больше одного-двух изменяемых свойств.</li><li>Feedback, focus и ARIA-сообщение в начале действия.</li></ul></section><section class="catalog-dont rf-stack rf-stack--gap-3"><h3 class="rf-text rf-text--heading-h3">Не используйте</h3><ul><li>Анимацию <code>width</code>, <code>height</code>, <code>top</code> и других layout-свойств.</li><li>Ambient motion для декора или привлечения внимания.</li><li>Одинаковую длительность для появления и исчезновения поверхности.</li><li>Движение как единственный способ сообщить состояние.</li></ul></section></div></section>`;
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Motion</h1><p class="rf-text rf-text--body-large rf-text--secondary">Движение объясняет связь между состояниями, сохраняет контекст и не мешает доступности.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-motion.png" alt="Системные переходы и состояния Motion Contour" width="1536" height="1024"></div></header><div class="rf-tabs catalog-motion-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Motion">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', anatomy)}${tabPanel('duration', durationContent)}${tabPanel('easing', easingContent)}${tabPanel('patterns', patternsContent)}</div>`;
highlightRequestedFoundationToken(foundationPage);
const motionTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-motion-tabs'));
const syncMotionTabQuery = () => { const activeTab = /** @type {HTMLButtonElement} */(motionTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.motionTab || 'anatomy'; updateQuery('motionTab', activeTab === 'anatomy' ? '' : activeTab); };
motionTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncMotionTabQuery); });
motionTabs.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) window.requestAnimationFrame(syncMotionTabQuery); });
const playground = /** @type {HTMLElement} */(foundationPage.querySelector('[data-motion-playground]'));
const specimen = /** @type {HTMLElement} */(playground.querySelector('[data-motion-playground-specimen]'));
const durationInput = /** @type {HTMLInputElement} */(playground.querySelector('[data-motion-playground-duration]'));
const easingInput = /** @type {HTMLInputElement} */(playground.querySelector('[data-motion-playground-easing]'));
const propertyInput = /** @type {HTMLInputElement} */(playground.querySelector('[data-motion-playground-property]'));
const reducedInput = /** @type {HTMLInputElement} */(playground.querySelector('[data-motion-playground-reduced]'));
const replaySpecimen = () => { specimen.dataset.motionActive = 'false'; void specimen.offsetWidth; window.requestAnimationFrame(() => { specimen.dataset.motionActive = 'true'; }); };
const syncPlayground = () => {
const reduced = reducedInput.checked;
const duration = reduced ? durationValue('reduced') : durationValue(durationInput.value);
const easing = easingValue(easingInput.value);
playground.dataset.motionReduced = String(reduced);
specimen.dataset.motionReduced = String(reduced);
specimen.dataset.motionProperty = propertyInput.value;
specimen.style.setProperty('--catalog-motion-duration', duration);
specimen.style.setProperty('--catalog-motion-easing', easing);
playground.querySelector('[data-motion-playground-duration-value]').textContent = `${durationMeta[durationInput.value].label} · ${durationValue(durationInput.value)}`;
playground.querySelector('[data-motion-playground-easing-value]').textContent = easingMeta[easingInput.value].label;
playground.querySelector('[data-motion-playground-property-value]').textContent = propertyItems.find(item => item.value === propertyInput.value)?.description || propertyInput.value;
};
/** @type {HTMLElement} */(playground.querySelector('[data-motion-playground-replay]')).addEventListener('click', replaySpecimen);
[durationInput, easingInput, propertyInput, reducedInput].forEach(input => { input.addEventListener('input', () => { syncPlayground(); replaySpecimen(); }); input.addEventListener('change', () => { syncPlayground(); replaySpecimen(); }); });
syncPlayground();
/** @type {NodeListOf<HTMLElement>} */(foundationPage.querySelectorAll('[data-motion-token-preview]')).forEach(preview => {
preview.style.setProperty('--catalog-motion-duration', durationValue(preview.dataset.motionDuration));
preview.style.setProperty('--catalog-motion-easing', easingValue(preview.dataset.motionEasing));
const replay = () => { preview.dataset.active = 'false'; void preview.offsetWidth; window.requestAnimationFrame(() => { preview.dataset.active = 'true'; }); };
preview.addEventListener('click', replay);
});
}
function renderGrid(foundation) {
const breakpoints = foundation.breakpoints;
const rawValue = name => Number.parseInt(formatValue(breakpoints[name]), 10);
const rows = [
{key: 'base', range: `320–${rawValue('sm') - 1}px`, min: 320, columns: 2, gutter: 'spacing.12', margins: 'spacing.16', layout: 'Fluid'},
{key: 'sm', range: `${rawValue('sm')}–${rawValue('md') - 1}px`, min: rawValue('sm'), columns: 6, gutter: 'spacing.12', margins: 'spacing.16', layout: 'Fluid'},
{key: 'md', range: `${rawValue('md')}–${rawValue('lg') - 1}px`, min: rawValue('md'), columns: 6, gutter: 'spacing.12', margins: 'spacing.16', layout: 'Fluid'},
{key: 'lg', range: `${rawValue('lg')}–${rawValue('xl') - 1}px`, min: rawValue('lg'), columns: 12, gutter: 'spacing.16', margins: 'spacing.32', layout: 'Fluid'},
{key: 'xl', range: `${rawValue('xl')}–${rawValue('2xl') - 1}px`, min: rawValue('xl'), columns: 12, gutter: 'spacing.16', margins: 'spacing.32', layout: 'Fixed wide'},
{key: '2xl', range: `${rawValue('2xl')}px и больше`, min: rawValue('2xl'), columns: 12, gutter: 'spacing.16', margins: 'spacing.32', layout: 'Fixed wide'},
];
const tabNames = ['anatomy', 'layouts', 'breakpoints'];
const rawTab = new URL(window.location.href).searchParams.get('gridTab');
const selectedTab = tabNames.includes(rawTab) ? rawTab : 'anatomy';
const tabLabels = {anatomy: 'Anatomy', layouts: 'Layouts', breakpoints: 'Breakpoints'};
const tabButton = name => `<button class="rf-tab" id="grid-tab-${name}" type="button" role="tab" aria-selected="${name === selectedTab}" aria-controls="grid-panel-${name}" tabindex="${name === selectedTab ? '0' : '-1'}" data-grid-tab="${name}">${tabLabels[name]}</button>`;
const tabPanel = (name, content) => `<section class="rf-tab-panel" id="grid-panel-${name}" role="tabpanel" aria-labelledby="grid-tab-${name}" tabindex="0" ${name === selectedTab ? '' : 'hidden'}>${content}</section>`;
const containerGuidance = `<section class="rf-stack rf-stack--gap-4" data-grid-container-contract><h2 class="rf-text rf-text--heading-h2">Container — правило Grid</h2><p>Ширина и поля — Grid; центрирование — <code>margin-inline: auto</code>.</p><p>Прежний <code>.rf-container</code>: до <code>spacing.1600</code>, padding <code>spacing.16</code>. Размеры Mini App и Landing сохранены.</p></section>`;
const anatomy = `<section class="catalog-grid-tab-section catalog-grid-anatomy rf-stack rf-stack--gap-6" aria-labelledby="grid-anatomy-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="grid-anatomy-title">Как устроен Grid</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Меняйте viewport, span и тип контейнера.</p></header><section class="catalog-grid-playground rf-stack rf-stack--gap-4" data-grid-playground aria-label="Grid playground"><div class="catalog-grid-playground__stage"><div class="catalog-grid-playground__viewport" data-grid-viewport><div class="catalog-grid-playground__grid" data-grid-guide><span class="catalog-grid-playground__column" aria-hidden="true"></span><article class="catalog-grid-playground__content" data-grid-content><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="grid-four-01" aria-hidden="true"></span><span><strong class="rf-text rf-text--headline-xxs">Grid в действии</strong><small class="rf-text rf-text--body-small rf-text--secondary" data-grid-summary></small></span></article></div></div></div><form class="catalog-grid-playground__controls" data-grid-controls>${sliderField('catalog-grid-width', 'Viewport width', {min: 320, max: 1600, step: 1, value: 1024, output: true, limits: true})}${sliderField('catalog-grid-span', 'Content span', {min: 1, max: 12, step: 1, value: 8, output: true, limits: true})}<div class="catalog-grid-playground__parameter"><span class="catalog-grid-playground__sample" aria-hidden="true"><span class="rf-icon rf-icon--sm" data-rf-icon-glyph="grid-two-hr-al"></span></span><span class="catalog-grid-playground__meta"><strong id="catalog-grid-layout-label">Layout</strong><span class="rf-text rf-text--caption rf-text--secondary">Ширина контейнера</span></span><fieldset class="rf-segmented-control catalog-grid-playground__mode" aria-labelledby="catalog-grid-layout-label"><legend class="rf-sr-only">Layout</legend><label class="rf-segmented-control__item"><input class="rf-segmented-control__input" type="radio" name="catalog-grid-mode" value="wide" checked><span class="rf-segmented-control__label">Wide</span></label><label class="rf-segmented-control__item"><input class="rf-segmented-control__input" type="radio" name="catalog-grid-mode" value="narrow"><span class="rf-segmented-control__label">Narrow</span></label><label class="rf-segmented-control__item"><input class="rf-segmented-control__input" type="radio" name="catalog-grid-mode" value="fluid"><span class="rf-segmented-control__label">Fluid</span></label></fieldset></div></form></section><section class="catalog-grid-anatomy__parts rf-stack rf-stack--gap-4" aria-labelledby="grid-parts-title"><h3 class="rf-text rf-text--heading-h3" id="grid-parts-title">Анатомия</h3><div class="catalog-grid-guidance__grid"><article><strong>Columns</strong><span>Вертикальные области, по которым выравниваются крупные контейнеры страницы.</span></article><article><strong>Gutters</strong><span>Промежутки между колонками. Контент никогда не занимает gutter.</span></article><article><strong>Margins</strong><span>Безопасное пространство между сеткой и краями viewport.</span></article><article><strong>Container</strong><span>Wide, Narrow или Fluid определяет ширину основной композиции.</span></article></div></section><section class="catalog-grid-guidance rf-stack rf-stack--gap-4" aria-labelledby="grid-guidance-title"><h3 class="rf-text rf-text--heading-h3" id="grid-guidance-title">Как применять</h3><div class="catalog-do-dont"><section class="catalog-do rf-stack rf-stack--gap-3"><h4 class="rf-text rf-text--heading-h3">Используйте</h4><ul><li>Grid для основных контейнеров страницы и крупных областей.</li><li><code>spacing.*</code> внутри Card, Dialog и других компонентов.</li><li>Wide для стандартных страниц, Narrow для чтения, Fluid для таблиц и рабочих областей.</li><li>Одинаковый DOM-порядок для визуального и keyboard flow.</li></ul></section><section class="catalog-dont rf-stack rf-stack--gap-3"><h4 class="rf-text rf-text--heading-h3">Не используйте</h4><ul><li>Grid для выравнивания маленьких controls внутри компонента.</li><li>Dropdown, Toast и Dialog как часть page grid.</li><li>Абсолютное позиционирование для адаптивной композиции.</li><li>Raw <code>breakpoint.*</code> как продуктовый layout API.</li></ul></section></div><div class="catalog-callout"><strong>Проверяйте reflow, а не только точки переключения.</strong><p class="rf-text rf-text--body-medium">Проверяйте 320 CSS px, 400% zoom, 200% text, breakpoint ±1 px, обе ориентации и длинные переводы: горизонтальный scroll недопустим.</p></div></section></section>`;
const layoutCards = [
{key: 'wide', title: 'Fixed wide', icon: 'panel-top', summary: 'Стандартные продуктовые страницы', detail: 'Центрированный контейнер до spacing.1600 с полной 12-колоночной композицией.'},
{key: 'narrow', title: 'Fixed narrow', icon: 'columns-2', summary: 'Статьи, формы и длинный текст', detail: 'Узкий центрированный контейнер сохраняет комфортную длину строки и иерархию.'},
{key: 'fluid', title: 'Fluid', icon: 'move-horizontal', summary: 'Таблицы, медиа и рабочие области', detail: 'Контейнер занимает доступную ширину, сохраняя системные margins и gutters.'},
];
const layouts = `<section class="catalog-grid-tab-section rf-stack rf-stack--gap-6" aria-labelledby="grid-layouts-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="grid-layouts-title">Layouts</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Режим определяется содержимым.</p></header><div class="catalog-grid-layouts">${layoutCards.map(layout => `<article class="catalog-grid-layout catalog-grid-layout--${layout.key}"><div class="catalog-grid-layout__visual" aria-hidden="true"><span class="rf-icon rf-icon--lg" data-rf-icon-glyph="${layout.icon}"></span><span class="catalog-grid-layout__canvas"><i></i></span></div><div class="catalog-grid-layout__copy"><h3 class="rf-text rf-text--heading-h3">${layout.title}</h3><strong>${layout.summary}</strong><p class="rf-text rf-text--body-medium rf-text--secondary">${layout.detail}</p></div></article>`).join('')}</div><div class="catalog-callout"><strong>Grid принадлежит странице.</strong><p class="rf-text rf-text--body-medium">Компоненты не знают количество колонок viewport. Они заполняют назначенный им span и используют свои публичные Spacing, Radius и Color contracts внутри.</p></div></section>`;
const breakpointRows = rows.map(row => `<tr data-grid-breakpoint="${row.key}"><th scope="row"><code>${row.key === 'base' ? 'Base' : `breakpoint.${row.key}`}</code></th><td>${row.range}</td><td>${row.columns}</td><td><code>${row.gutter}</code></td><td><code>${row.margins}</code></td><td>${row.layout}</td></tr>`).join('');
const breakpointContent = `<section class="catalog-grid-tab-section rf-stack rf-stack--gap-4" aria-labelledby="grid-breakpoints-title"><header class="rf-stack rf-stack--gap-1"><h2 class="rf-text rf-text--heading-h2" id="grid-breakpoints-title">Breakpoints</h2><p class="rf-text rf-text--body-medium rf-text--secondary">Viewport меняет колонки и поля; компоненты зависят от своего контейнера.</p></header><div class="catalog-table-wrap"><table class="catalog-table catalog-foundation-token-table"><caption class="rf-sr-only">Grid breakpoint matrix</caption><thead><tr><th scope="col">Range</th><th scope="col">Viewport</th><th scope="col">Columns</th><th scope="col">Gutter</th><th scope="col">Margins</th><th scope="col">Layout</th></tr></thead><tbody>${breakpointRows}</tbody></table></div><p><code>breakpoint.*</code> — внутренние пороги. Layout следует Foundation Grid и <code>spacing.*</code>.</p></section>`;
foundationPage.innerHTML = `<header class="catalog-color-hero"><div class="catalog-color-hero__copy rf-stack rf-stack--gap-4"><h1 class="rf-text rf-text--display-medium">Grid</h1><p class="rf-text rf-text--body-large rf-text--secondary">Колонки, gutters, margins и контейнеры создают устойчивую адаптивную композицию Contour.</p></div><div class="catalog-color-hero__media"><img class="rf-image catalog-color-hero__image" src="assets/catalog-home/foundations-breakpoints.png" alt="Адаптивная сетка и контейнеры интерфейсов Contour" width="1536" height="1024"></div></header><div class="rf-tabs catalog-grid-tabs" data-rf-tabs><div class="rf-tab-list" role="tablist" aria-label="Разделы Grid">${tabNames.map(tabButton).join('')}</div>${tabPanel('anatomy', '<p class="catalog-callout">Настройки рабочей сетки и span находятся в <a class="rf-link" href="?primitiveTab=playground#primitives/grid">Primitives → Grid</a>.</p>' + containerGuidance + anatomy)}${tabPanel('layouts', layouts)}${tabPanel('breakpoints', breakpointContent)}</div>`;

const gridTabs = /** @type {HTMLElement} */(foundationPage.querySelector('.catalog-grid-tabs'));
const syncGridTabQuery = () => { const activeTab = /** @type {HTMLButtonElement} */(gridTabs.querySelector('[role="tab"][aria-selected="true"]'))?.dataset.gridTab || 'anatomy'; updateQuery('gridTab', activeTab === 'anatomy' ? '' : activeTab); };
gridTabs.addEventListener('click', event => { if (/** @type {HTMLElement} */(event.target).closest('[role="tab"]')) window.requestAnimationFrame(syncGridTabQuery); });
gridTabs.addEventListener('keydown', event => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) window.requestAnimationFrame(syncGridTabQuery); });
const playground = /** @type {HTMLElement} */(foundationPage.querySelector('[data-grid-playground]'));
const widthInput = /** @type {HTMLInputElement} */(playground.querySelector('#catalog-grid-width'));
const spanInput = /** @type {HTMLInputElement} */(playground.querySelector('#catalog-grid-span'));
const viewport = /** @type {HTMLElement} */(playground.querySelector('[data-grid-viewport]'));
const guide = /** @type {HTMLElement} */(playground.querySelector('[data-grid-guide]'));
const content = /** @type {HTMLElement} */(playground.querySelector('[data-grid-content]'));
const summary = /** @type {HTMLElement} */(playground.querySelector('[data-grid-summary]'));
const configForWidth = width => [...rows].reverse().find(row => width >= row.min) || rows[0];
const syncSliderBounds = (input, value, maximum) => {
const root = input.closest('[data-rf-slider]');
const minimum = Number(input.min || 0);
input.max = String(maximum);
input.value = String(value);
const progress = maximum > minimum ? (value - minimum) / (maximum - minimum) * 100 : 0;
input.style.setProperty('--rf-slider-progress', `${Math.min(100, Math.max(0, progress))}%`);
/** @type {HTMLElement} */(root?.querySelector('[data-rf-slider-max]'))?.replaceChildren(String(maximum));
input.setAttribute('aria-valuetext', `${value} из ${maximum} колонок`);
};
const syncGrid = () => {
const width = Number(widthInput.value);
const config = configForWidth(width);
const mode = /** @type {HTMLInputElement} */(playground.querySelector('[name="catalog-grid-mode"]:checked'))?.value || 'wide';
const span = Math.min(Number(spanInput.value), config.columns);
syncSliderBounds(spanInput, span, config.columns);
const syncSliderOutputs = () => {
/** @type {HTMLElement} */(widthInput.closest('[data-rf-slider]')?.querySelector('[data-rf-slider-output]'))?.replaceChildren(`${width}px`);
/** @type {HTMLElement} */(spanInput.closest('[data-rf-slider]')?.querySelector('[data-rf-slider-output]'))?.replaceChildren(`${span} / ${config.columns}`);
};
syncSliderOutputs();
window.queueMicrotask(syncSliderOutputs);
viewport.style.setProperty('--catalog-grid-preview-width', `${Math.max(24, width / 1600 * 100)}%`);
guide.style.setProperty('--catalog-grid-columns', String(config.columns));
guide.style.setProperty('--catalog-grid-gutter', `var(--rf-${config.gutter.replace('.', '-')})`);
guide.style.setProperty('--catalog-grid-margin', `var(--rf-${config.margins.replace('.', '-')})`);
guide.dataset.gridMode = mode;
/** @type {NodeListOf<HTMLElement>} */(guide.querySelectorAll(':scope > .catalog-grid-playground__column')).forEach(column => column.remove());
Array.from({length: config.columns}, (_, index) => {
const column = document.createElement('span');
column.className = 'catalog-grid-playground__column';
column.setAttribute('aria-hidden', 'true');
column.style.gridColumn = String(index + 1);
guide.insertBefore(column, content);
});
content.style.setProperty('--catalog-grid-span', String(span));
summary.textContent = `${width}px · ${config.columns} columns · span ${span}`;
};
[widthInput, spanInput, .../** @type {NodeListOf<HTMLInputElement>} */(playground.querySelectorAll('[name="catalog-grid-mode"]'))].forEach(input => { input.addEventListener('input', syncGrid); input.addEventListener('change', syncGrid); });
syncGrid();
}
function renderIcons(foundation) {
foundationPage.innerHTML = '<p role="status" data-iconography-loading>Загружаем Iconography…</p>';
const marker = foundationPage.firstElementChild;
loadIconography().then(library => {
  if (foundationPage.contains(marker)) return library.mount(foundationPage, {announce, updateQuery, model});
}).catch(() => {
  if (foundationPage.contains(marker)) marker.textContent = 'Не удалось загрузить Iconography. Обновите страницу.';
});
}
function renderMedia(foundation) {
const ratioClass = { product: '', square: 'rf-aspect-ratio--square', portrait: 'rf-aspect-ratio--portrait', landscape: 'rf-aspect-ratio--landscape' };
const image = 'assets/listing-card-white-roses.png';
const ratios = Object.entries(foundation.media.aspectRatio).map(([name, value]) => `<article><div class="rf-aspect-ratio ${ratioClass[name]}"><img class="rf-image" src="${image}" alt="${name}"></div><b>${name}</b><small>${value}</small></article>`).join('');
const fits = ['cover', 'contain'].map(fit => `<article><div class="rf-aspect-ratio rf-aspect-ratio--landscape"><img class="rf-image ${fit === 'contain' ? 'rf-image--contain' : ''}" src="${image}" alt="${fit}"></div><b>${fit}</b></article>`).join('');
foundationPage.innerHTML = foundationHeader('media', 'AspectRatio + Image.') + `<section class="catalog-section"><h2>Ratios</h2><div class="catalog-grid">${ratios}</div><h2>Fit</h2><div class="catalog-grid">${fits}</div></section>`;
}
function applyDynamicTokenStyles(root) {
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-token-color]')).forEach(el => { el.style.setProperty('--catalog-token-value', el.dataset.tokenColor); if (el.dataset.tokenPreviewColor) el.style.setProperty('--catalog-token-preview-value', el.dataset.tokenPreviewColor); if (el.dataset.tokenForeground) el.style.setProperty('--catalog-token-foreground', el.dataset.tokenForeground); });
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-dimension-value]')).forEach(element => element.style.setProperty('--catalog-dimension-value', element.dataset.dimensionValue));
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-radius-value]')).forEach(element => element.style.setProperty('--catalog-radius-value', element.dataset.radiusValue));
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-border-value]')).forEach(element => element.style.setProperty('--catalog-border-value', element.dataset.borderValue));
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-opacity-value]')).forEach(element => element.style.setProperty('--catalog-opacity-value', element.dataset.opacityValue));
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-radius-token]')).forEach(element => element.style.setProperty('--catalog-radius-value', `var(--rf-radius-${element.dataset.radiusToken})`));
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-elevation-token]')).forEach(element => element.style.setProperty('--catalog-elevation-value', `var(--rf-elevation-${element.dataset.elevationToken})`));
}
/** @param {Document | HTMLElement} root */
function wirePreviewControls(root = document) {
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-preview-control]')).forEach(button => button.addEventListener('click', () => {
const preview = /** @type {HTMLElement} */(button.closest('.catalog-section')?.querySelector('.catalog-preview')) || document.getElementById('catalog-responsive-preview');
if (!preview) return;
preview.dataset.previewSize = button.dataset.previewControl;
/** @type {NodeListOf<HTMLElement>} */(root.querySelectorAll('[data-preview-control]')).forEach(control => control.setAttribute('aria-pressed', String(control === button)));
}));
}
function showRoute(element, route) {
/** @type {NodeListOf<HTMLElement>} */(document.querySelectorAll('[data-catalog-route]')).forEach(page => { page.hidden = page !== element; });
if (element === foundationPage || element === indexPage || element === entityPage) element.dataset.route = route;
/** @type {HTMLElement | null} */
let currentNavigationLink = null;
/** @type {NodeListOf<HTMLElement>} */(document.querySelectorAll('.catalog-nav-link[href^="#"]')).forEach(link => {
const target = link.getAttribute('href').slice(1).split('?')[0];
if (target === route) {
link.setAttribute('aria-current', 'page');
currentNavigationLink = link;
} else {
link.removeAttribute('aria-current');
}
});
currentNavigationLink?.closest('details')?.setAttribute('open', '');
const primarySection = route === 'overview'
? 'home'
: route === 'foundations' || route.startsWith('foundations/')
? 'foundation'
: route === 'primitives' || route.startsWith('primitives/')
? 'primitives'
: route === 'patterns' || route.startsWith('patterns/')
? 'template'
: route.startsWith('guidelines/')
? null
: 'components';
/** @type {NodeListOf<HTMLElement>} */(document.querySelectorAll('[data-catalog-section]')).forEach(link => {
if (link.dataset.catalogSection === primarySection) link.setAttribute('aria-current', 'page');
else link.removeAttribute('aria-current');
});
applySectionVersion(element, route);
window.dispatchEvent(new CustomEvent('catalog:route', {detail: {route}}));
document.title = `${/** @type {HTMLElement} */(element.querySelector('h1'))?.textContent || 'Catalog'} · Contour Design System`;
content.focus({preventScroll: true});
window.scrollTo({top: 0, behavior: 'auto'});
}
function routeFromLocation() {
const route = decodeURIComponent(window.location.hash.slice(1) || 'overview').split('?')[0];
return route === 'components/tooltip' ? 'components' : route === 'components/empty-state' ? 'patterns/empty-state' : route === 'components/attribute-card' ? 'components/list-item' : route === 'components/card' ? 'components' : route === 'components/pagination' ? 'patterns/pagination' : route === 'components/link' ? 'foundations/typography' : ['components/feature-card','patterns/feature-card'].includes(route) ? 'components/banner' : route === 'components/date-picker' ? 'components/text-field' : route === 'components/option-list' ? 'components/list-item' : route;
}
function route() {
if (!model) return;
let selectedRoute = routeFromLocation();
if(selectedRoute==='foundations/grid' && new URLSearchParams(location.search).get('gridTab')==='playground'){
const url=new URL(location.href);url.searchParams.delete('gridTab');url.searchParams.set('primitiveTab','playground');url.hash='primitives/grid';history.replaceState(null,'',url);selectedRoute='primitives/grid';
}
if (LEGACY_COMPONENT_ROUTES.has(selectedRoute)) {
selectedRoute = LEGACY_COMPONENT_ROUTES.get(selectedRoute);
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${selectedRoute}`);
}
if (selectedRoute === 'components/radio-group') {
selectedRoute = 'components/radio';
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${selectedRoute}`);
}
if (['components/input', 'components/search-field', 'components/field', 'components/text-area'].includes(selectedRoute)) {
selectedRoute = 'components/text-field';
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${selectedRoute}`);
}
if (selectedRoute === 'primitives/icon') {
selectedRoute = 'components/icon';
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${selectedRoute}`);
}
if (LEGACY_FOUNDATION_ROUTES.has(selectedRoute)) {
const canonicalRoute = LEGACY_FOUNDATION_ROUTES.get(selectedRoute);
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${canonicalRoute}`);
renderFoundation(canonicalRoute.split('/')[1]);
showRoute(foundationPage, canonicalRoute);
return;
}
if (LEGACY_DIMENSION_ROUTES.has(selectedRoute)) {
window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#foundations/dimensions`);
renderFoundation('dimensions');
showRoute(foundationPage, 'foundations/dimensions');
return;
}
if (selectedRoute === 'foundations') renderFoundationsOverview();
const staticPage = STATIC_ROUTES.has(selectedRoute) ? document.getElementById(selectedRoute) : null;
if (staticPage) { showRoute(staticPage, selectedRoute); return; }
if (FOUNDATION_ROUTES.has(selectedRoute)) { renderFoundation(selectedRoute.split('/')[1]); showRoute(foundationPage, selectedRoute); return; }
if (LEVEL_ROUTES.has(selectedRoute)) {
const url = new URL(window.location.href);
renderIndex(selectedRoute, url.searchParams.get('status') || '');
showRoute(indexPage, selectedRoute); return;
}
const item = entryByRoute.get(selectedRoute);
if (item?.registry.name === 'Tab') {
const tabsItem = entryByName.get('Tabs');
const url = new URL(window.location.href);
url.searchParams.set('tabsTab', 'items');
url.hash = tabsItem.route;
window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
renderEntity(tabsItem);
showRoute(entityPage, tabsItem.route);
return;
}
if (selectedRoute === 'components/icon-button' || item?.registry.name === 'IconButton') {
const buttonItem = entryByName.get('Button');
const url = new URL(window.location.href);
url.searchParams.set('buttonTab', 'icon-button');
url.hash = buttonItem.route;
window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
renderEntity(buttonItem);
showRoute(entityPage, buttonItem.route);
return;
}
if (item) { renderEntity(item); showRoute(entityPage, selectedRoute); return; }
indexPage.innerHTML = pageHeader('Catalog', 'Страница не найдена', `Route “${selectedRoute}” отсутствует в текущем Registry.`, '<a class="rf-button rf-button--primary" href="#overview">Вернуться в Overview</a>');
showRoute(indexPage, selectedRoute);
}
function wireStaticInteractions() {
window.addEventListener('hashchange', route);
const indeterminate = /** @type {HTMLInputElement} */(document.getElementById('visual-checkbox-indeterminate'));
if (indeterminate) indeterminate.indeterminate = true;
wirePreviewControls();
setupListingCardSpecimen();
document.getElementById('catalog-stress-apply')?.addEventListener('click', applyStressFixture);
}
function applyStressFixture() {
const fixture = /** @type {HTMLSelectElement} */(document.getElementById('catalog-stress-select')).value;
const data = model.stressFixtures;
const title = document.getElementById('visual-card-title');
const description = document.getElementById('visual-card-description');
const price = document.getElementById('visual-card-price');
const image = /** @type {HTMLImageElement} */(document.getElementById('visual-card-image'));
const baseImage = '../../illustrations/category-icons-3d/bouquet.png';
const mapping = {
short: [data.text.short, data.text.short], long: [data.text.long, data.text.long],
longUnbroken: [data.text.longUnbroken, data.text.long], longTitle: [data.text.longTitle, data.text.long],
multilineDescription: [data.text.short, data.text.multilineDescription], ky: [data.text.localized.ky, data.text.long],
uz: [data.text.localized.uz, data.text.long], failedImage: [data.text.longTitle, data.text.multilineDescription],
};
[title.textContent, description.textContent] = mapping[fixture] || mapping.short;
price.textContent = data.number.large;
image.src = fixture === 'failedImage' ? data.image.failed : baseImage;
announce(`Stress fixture ${fixture} применён`);
}
async function start() {
wireStaticInteractions();
try {
const response = await fetch(MODEL_URL, {cache: 'no-store'});
if (!response.ok) throw new Error(`Catalog model: ${response.status}`);
model = await response.json();
if (model.schemaVersion !== 1) throw new Error('Unsupported Catalog model');
entries = model.registry.entries;
entryByRoute = new Map(entries.map(item => [item.route, item]));
entryByName = new Map(entries.map(item => [item.registry.name, item]));
renderGuidance();
route();
} catch (error) {
document.getElementById('catalog-load-error-detail').textContent = error instanceof Error ? error.message : String(error);
loadError.hidden = false;
console.error(error);
}
}
start();
})();
