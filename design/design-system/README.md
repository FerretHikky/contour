# Design System Contour

Design System Contour — единый источник визуальных и интерфейсных правил продукта.
Она нужна, чтобы Admin, Mini App, Landing, будущие Web- и мобильные интерфейсы
говорили на одном визуальном языке, а новые функции собирались из готовых частей.

После foundations система получила Core UI v1: machine-readable component registry,
каноническую терминологию, Web/WebView adapter, Mobile strategy, эталонный каталог и
автоматические проверки lifecycle. Это по-прежнему не массовая перерисовка legacy.

## Архитектура

```text
Tokens -> Foundations -> Primitives -> Components -> Patterns -> Features
```

- **Tokens** — машинные значения и смысловые роли: цвет, типографика, единая
  числовая шкала размеров, параметры spacing/radius/border/opacity, elevation и
  motion. Размеры controls, иконок и layout не образуют отдельные шкалы: их
  Component-контракты ссылаются на эти параметры.
- **Foundations** — общие правила использования токенов, тем, текста, изображений,
  доступности и адаптивности. Они не зависят от React, SwiftUI или Compose.
- **Primitives** — минимальные строительные блоки без продуктового смысла: Text,
  Icon, Box, Stack, Inline, Divider, Surface и media helpers.
- **Components** — законченные элементы с понятным API, состояниями, lifecycle и
  accessibility-контрактом. Stable Core UI v1: Button/IconButton, TextField,
  Card, Badge, Alert, SegmentedControl, Skeleton и EmptyState.
- **Patterns** — повторяемые композиции компонентов: форма, поиск, фильтры, empty
  state, navigation, confirmation dialog и другие пользовательские сценарии.
- **Features** — функции продукта. Они используют patterns и components, но не
  создают внутри себя параллельную библиотеку Button/TextField/Card.

Это логические слои, а не обязательный набор папок. В Contour сейчас нет смысла
заранее создавать пустые каталоги для сотен будущих компонентов и платформ.

## Единственный источник правды

Канонические токены находятся только в [`tokens/`](tokens/):

- [`color-primitives.json`](tokens/color-primitives.json) — seeds шага `5` для
  семи продуктовых цветовых ramps, якоря Gray и правило генерации шагов `0…10`;
- [`foundations.json`](tokens/foundations.json) — единая Primitive-шкала
  dimension, Primitive opacity и Foundation parameters
  spacing/radius/border без raw shortcuts; spacing служит общей шкалой также для
  width/height, min/max constraints и размеров иконок; здесь же находятся точные
  compatibility aliases старого `space.*`/border API;
- [`primitives.json`](tokens/primitives.json) — остальные нецветовые foundations и
  platform-neutral border styles, font, motion, breakpoints, media и z-index;
- [`static.json`](tokens/static.json) — абсолютные black/white;
- [`typography.json`](tokens/typography.json) — 33 публичных Styles, напрямую
  собранных из Primitive `font.*`: Display, Title, Headline, Body, Button, Input и
  Chip;
- [`typography-mobile.json`](tokens/typography-mobile.json) — Mobile overrides
  того же публичного Typography path contract;
- [`themes/light.json`](tokens/themes/light.json) и
  [`themes/dark.json`](tokens/themes/dark.json) — одинаковый числовой Alias
  contract двух тем и прямые theme-specific Overlay;
- [`context.json`](tokens/context.json) — общий application contract для background,
  text, icon, border и overlay;
- [`components.json`](tokens/components.json) — решения компонентов через Context и
  property-specific foundation parameters.

Формат основан на DTCG 2025.10: `$schema`, `$type`, `$value` и ссылки вида
`{color.context.text.primary.default}`. Он не зависит от платформы. Сейчас из него создаются CSS,
TypeScript и resolved JSON; позже без изменения исходных токенов можно добавить
генераторы для Swift/SwiftUI и Kotlin/Compose.

Dimensions 2.0 публикует 72 foundation records: 34 исходных Primitive
(`dimension.*` и `opacity.*`) и 38 property parameters. Продукт не вызывает
Primitive напрямую: Component dimension tokens ссылаются на `spacing.*`,
`radius.*`, `border.width.*` или `opacity.*`. `spacing.*` является единой
размерной шкалой и для отступов, и для width/height, min/max constraints, hit area
и размера иконки. Прежние отдельные namespaces `sizing.*`, `layout.*`,
`control.*`, `touchTarget.*` и `icon.size.*` удалены без compatibility aliases.

Продуктовый color styling использует только Context tokens. Например, feature
выбирает `color.context.background.brand.default`, а не числовой Alias,
конкретный Primitive или внутренний Component token. Primitive и Alias остаются
theme-authoring слоями, а Component color tokens — внутренней реализацией Core;
Context отвечает на вопрос, где и в каком состоянии применяется цвет.
Для нейтральных фонов `color.context.background.canvas` задаёт самый нижний
холст приложения: `#FFFFFF` в светлой теме и `#18181B` в тёмной. Именованная роль
`color.alias.neutral.canvas` разрешается через `color.primitive.gray.0` и
`color.primitive.gray.11`; отдельной Primitive Canvas-шкалы нет. Dark Basic остаётся
на `gray.10 = #34343A`, поэтому корневой Canvas сохраняет отдельный уровень глубины.
`color.context.background.primary.default` задаёт следующий уровень поверхности
(`alias.neutral.1`). Следующие уровни не дублируют его:
`background.secondary.default` использует `alias.neutral.2`, а
`background.tertiary.default` — `alias.neutral.3`. Для `hover` роли также
последовательно сдвигаются по нейтральной шкале. `active` разводится до безопасного
для контраста предела: tertiary остаётся на `neutral.3`; общими также намеренно
остаются унифицированные состояния `disabled` и `selected`.
В Catalog Context-роли сначала разделены по типу поверхности, а внутри таблицы —
по состояниям Main, Hover, Active, Selected, Disabled, Focus, status/error и
служебным вариантам; канонический путь токена при этом остаётся неизменным.

Канонический Web-слой находится в [`web/`](web/):

- [`primitives.css`](web/primitives.css) — классы `rf-box`, `rf-stack`, `rf-inline`,
  `rf-text`, `rf-icon`, `rf-divider`, `rf-surface` и media helpers;
- [`components.css`](web/components.css) — стабильная точка входа, которая собирает
  тематические модули из [`web/components/`](web/components/);
- [`core-ui.js`](web/core-ui.js) — независимое от фреймворка поведение составных
  компонентов: tabs, dialog, toast и toggle;
- [`component-registry.json`](component-registry.json) — машиночитаемый статус,
  платформы и каноническая реализация каждого primitive/component/pattern;
- [`catalog.html`](web/catalog.html) — рабочий интерфейс Design System: поиск,
  architecture navigation, Registry-driven pages, Foundations, guides, playgrounds,
  stress/responsive examples и настоящие Light/Dark themes;
- [`generated/catalog-model.json`](generated/catalog-model.json) — сгенерированная
  модель Catalog из Registry, DTCG tokens, master icons, shared fixtures и
  source-backed code examples. Вручную не редактируется;
- [`adapters/react/`](adapters/react/) — реальный React Web adapter
  `@reflower/core-ui-react`: типизированная React-анатомия поверх того же публичного
  Core CSS, а не отдельная визуальная реализация Button и IconButton;
- [`code-examples.json`](code-examples.json) — manifest платформ, адаптеров, языков и
  исходных файлов, которые Catalog показывает рядом с описанием component variant.
  Один Core HTML target может явно обслуживать Web и Mini App, а React остаётся
  отдельным TSX target. Сам код хранится в компилируемых или напрямую исполняемых
  source-файлах, а не строками в `catalog.js`.

Иконки по-прежнему имеют отдельный мастер-реестр в `design/icons/icons.js`.
Шрифты, логотипы и иллюстрации остаются мастер-ассетами в соответствующих каталогах
`design/`; генератор токенов их не изменяет.

## Структура системы

```text
design/design-system/
  adapters/
    react/                        # @reflower/core-ui-react, React Web adapter
      src/                        # типизированные Button/Icon и public exports
      examples/button/            # проверяемые TSX examples для Catalog
      styles.css                  # generated exact copy Core UI CSS
      icons-runtime.js            # generated exact copy icon runtime
  examples/button/                # исполняемые Web/Mini App HTML examples
  tokens/                         # канонические DTCG JSON
    color-primitives.json         # seeds и правило ramps 0…10
    foundations.json              # Dimension/Opacity primitives → spacing/radius/border parameters
    primitives.json
    static.json
    typography.json
    typography-mobile.json
    context.json
    components.json
    themes/
      light.json
      dark.json
  generated/                      # результат генерации, не редактировать
    catalog-model.json            # Registry/Foundation/Icon model для Catalog
    color-tokens.json             # полный Primitive/Alias/Context/Static/Component graph
    foundation-tokens.json        # Dimension/Opacity + property-parameter alias graph
    typography-tokens.json        # Primitive/public Style graph
    tokens.resolved.json
    web/
      core-ui.css                 # bundle, собранный из canonical Web CSS
      tokens.css
      tokens.ts
  scripts/
    build_catalog.py              # валидация и генерация Catalog model
    build_tokens.py               # валидация и генерация токенов
    validate_component_registry.py # naming/lifecycle/dependencies/implementations
    lint_ui_values.py             # строгая проверка нового слоя + legacy ratchet
    visual_regression.py          # high-value Chromium screenshot matrix
  web/
    primitives.css                # канонические Web-primitives
    components.css                # стабильная точка входа Web-components
    components/                   # action/form/content/navigation и другие модули
    core-ui.js                    # поведение составных компонентов
    catalog.html                  # semantic shell и static guide pages
    catalog.css                   # documentation-tool layout на DS tokens/Core
    catalog.js                    # поиск, routes, entity/foundation pages, lab
  site/
    public/                       # детерминированный bundle Catalog для OpenAI Sites
  catalog-guidance.json           # только curated fields, отсутствующие в Registry
  code-examples.json              # source paths и metadata Code tabs
  component-registry.json         # реестр зрелости и платформ
  legacy-baseline.json            # зафиксированный, но не разрешённый к росту долг
  lint-exceptions.json            # точечные reviewed исключения static lint
  stress-fixtures.json            # reusable content/media stress cases
  stress-fixtures.schema.json     # contract stress fixtures
  visual-baseline.json            # reviewed visual fingerprints
  DESIGN_SYSTEM_AUDIT.md
  FOUNDATIONS.md
  COMPONENTS.md
  DESIGN_SYSTEM_CONTRIBUTING.md
  README.md
```

Features продолжают жить в `services/`. Empty/Error/Loading states уже имеют
reference-композиции; сложные product patterns остаются в feature до подтверждённого
повторения. Отдельные native adapters появятся только вместе с реальным iOS- или
Android-клиентом, но Mobile strategy обязательна для каждого stable registry entry.

## Сборка и проверки

Все команды запускаются из корня репозитория.

После изменения canonical `tokens/`, Web CSS или `core-ui.js` пересоберите
результаты:

```bash
python3 design/design-system/scripts/build_tokens.py
```

Генератор одновременно проверяет формат и типы, интерполяцию/opacity цветовых
Primitive ramps, exact Dimension/Opacity sets, Typography branches,
aliases и циклы, точную инверсию Alias Light/Dark, прямой RGBA Overlay и границы
Primitive → Alias → Context → Component.

Основная локальная команда, пригодная также для CI и Codex:

```bash
python3 scripts/design_system_check.py --static
```

Она ничего не генерирует и последовательно проверяет актуальность всех outputs/service
copies, registry/lifecycle, static lint и ratchet, component contracts,
accessibility/static visual fixtures и build smoke. Строгий Chromium-вариант:

```bash
RUN_BROWSER_E2E=1 python3 scripts/design_system_check.py
```

Он запрещает browser-suite `skip` и используется release gate. Отдельные scripts
остаются доступны для диагностики, но не заменяют единый check.

После любого значимого изменения продукта обязателен полный release gate:

```bash
./scripts/verify-release.sh
```

Успешная локальная проверка каталога не заменяет release gate. Если меняется
видимый интерфейс, дополнительно проверьте клавиатуру, focus, светлую и тёмную темы,
узкий экран, reduced motion и все состояния изменённого компонента.

## Удалённый Catalog

Планируемый постоянный адрес — `https://design.reflower.app`. Catalog публикуется
через OpenAI Sites отдельно от production-сервисов Amvera и не подключается к
PostgreSQL. По умолчанию доступ остаётся только у владельца; общий или публичный
доступ включается только отдельным решением.

Sites получает не рабочие файлы напрямую, а детерминированный bundle из
`site/public/`. Он собирается из канонических tokens, Registry, Catalog и нужных
ассетов. Файлы внутри `site/public/` вручную не редактируются: одинаковая ревизия
репозитория должна всегда давать одинаковый результат сборки.

Привязка собственного домена ещё не завершена. Пока DNS для
`design.reflower.app` не настроен и Sites не подтвердил HTTPS, этот адрес нельзя
считать рабочим. До каждой публикации точный commit сначала отправляется в
`origin/master`, а workflow `verify.yml` должен завершиться `Success` именно для
полного SHA этого commit. Локальные проверки не заменяют этот барьер.

## Generated-файлы и копии сервисов

`build_tokens.py` создаёт:

- `generated/web/tokens.css` — CSS variables с префиксом `--rf-`;
- `generated/web/tokens.ts` — типизированное представление для Web-кода;
- `generated/web/core-ui.css` — единый Web bundle из canonical primitives и
  component modules в порядке `web/components.css`, без runtime `@import`;
- `generated/color-tokens.json` — полный machine-readable список цветовых токенов с
  типом и исходным value либо alias, включая обе Alias-темы, public/internal
  policy и lifecycle migrations из `token-migrations.json`;
- `generated/foundation-tokens.json` — полный список Primitive dimension/opacity
  и property-specific spacing/radius/border parameters;
- `generated/typography-tokens.json` — полный список Primitive font properties и
  33 публичных Styles с resolved metrics для явных Desktop/Mobile modes; каждый
  Style ссылается на Primitive напрямую, а component tokens — прямо на Styles;
- `generated/tokens.resolved.json` — значения без aliases для тестов и будущих
  adapters;
- compatibility-файлы в `design/brand/colors/`, `design/brand/foundations/` и
  `design/brand/typography/`;
- точные копии compatibility CSS в `services/admin/static/brand/`,
  `services/miniapp/static/brand/` и `services/landing/static/brand/`;
- точные service adapters `static/design-system/core-ui.css` и `core-ui.js` для
  Admin, Mini App и Landing.

Копии внутри сервисов нужны: Admin, Mini App и Landing разворачиваются независимыми
`git subtree`, где общий каталог `design/` недоступен. Это управляемый результат
сборки, а не второй источник правды.

Generated-файлы и service-копии нельзя исправлять вручную. Правка делается в
`tokens/`, `web/primitives.css`, `web/components/*.css` или `web/core-ui.js`, затем
запускается генератор. `--check` сверяет все output-файлы и останавливает сборку, если
bundle или хотя бы одна service-копия отсутствует либо отличается. Service adapter —
транспорт canonical API в независимый subtree, а не место для продуктового CSS.

## Как использовать компоненты

Эталон порядка подключения показан в [`web/catalog.html`](web/catalog.html): сначала
сгенерированные токены, затем типографика, primitives и components. В production-
сервисе последние два слоя подключаются одним локальным
`static/design-system/core-ui.css`; compound behavior — соседним `core-ui.js`.
Тёмная тема включается атрибутом `data-theme="dark"` на корневом HTML-элементе;
компонентный код при этом не меняется.

Пример Button:

```html
<button class="rf-button rf-button--primary" type="button">
  <span class="rf-button__content" data-i18n="common.continue">Продолжить</span>
</button>
```

React-приложение использует тот же контракт через отдельный Web adapter:

```tsx
import { Button } from '@reflower/core-ui-react';
import '@reflower/core-ui-react/typography.css';
import '@reflower/core-ui-react/tokens.css';
import '@reflower/core-ui-react/styles.css';

export function SaveAction({ label, onSave }) {
  return <Button variant="primary" size="m" onClick={onSave}>{label}</Button>;
}
```

Три stylesheet import обязательны для standalone React-приложения: Typography
подключает Onest, Tokens определяет canonical CSS variables, Styles — presentation
Core UI. Все три генерируются из тех же master-источников и не редактируются внутри
adapter. `@reflower/core-ui-react` не создаёт новую палитру, размеры или состояния: его
`variant`, `size`, loading/anatomy и accessibility отображаются в канонические
`rf-button*` classes и Core semantics. Видимый текст по-прежнему приходит из слоя
локализации приложения. Пакет является React **Web** adapter; React Native, SwiftUI
и Android Compose в репозитории пока не реализованы и не показываются как готовый
код. Для каждой такой платформы сначала понадобится настоящий adapter и его
проверяемый source.

Пример доступного TextField:

```html
<div class="rf-text-field-group">
  <span class="rf-text-field__control">
    <input class="rf-text-field" id="title" aria-describedby="title-hint">
    <label class="rf-text-field__label" for="title">Название</label>
  </span>
  <span class="rf-text-field__hint" id="title-hint">Короткое понятное название</span>
</div>
```

В этой анатомии label автоматически становится компактным при фокусе, введённом
значении или autofill. Внешний label из прежнего контракта остаётся поддержан для
обратной совместимости; ручные props состояния полю не требуются.

Сначала выбирается готовый component, затем pattern и primitives. Небольшая
визуальная разница обычно решается существующим variant или композицией. Новый
reusable component создаётся только для отдельной повторяемой семантики или
поведения. Полный процесс описан в
[`DESIGN_SYSTEM_CONTRIBUTING.md`](DESIGN_SYSTEM_CONTRIBUTING.md).

В компоненты не встраиваются продуктовые фразы. Текст передаёт feature через свой
слой локализации. Для Bot и Mini App любой новый видимый текст сразу добавляется на
RU, EN, KY и UZ с одинаковыми плейсхолдерами.

## Пилотное использование в продукте

Первая вертикальная миграция проверяет Core UI на четырёх реальных поверхностях:

| Экран | Core UI | Остаётся feature / platform adapter |
| --- | --- | --- |
| Admin `/login` | Card, TextField, IconButton, Button, Alert и primitives | LoginLayout, BrandLockup, PasswordField composition, CSRF/authentication |
| Mini App `ProfileSettingsFlow` | Button/IconButton, TextField, Radio; beta SafeArea, ListItem; page layout по Foundation Grid | Fullscreen controller, LanguageOption, geocoder, validation/save и localized Toast |
| Mini App каталог | Card, Badge, Skeleton, EmptyState, Button; production adapter experimental ListingCard; beta ErrorState и primitives | CatalogFilters, CatalogGrid, listing data/timers, cursor pagination и photo lifecycle |
| Mini App `ListingDetailSheet` | Actions, List/ListItem и primitives; experimental BottomSheet presentation | Focus/inert/overlay controller; Back Button/nested overlay/viewport/keyboard/gesture gaps; product actions и photo lifecycle |

Пилот не меняет lifecycle: beta и experimental entries не становятся stable по
одному экрану. `ListingCard` зарегистрирован как experimental product component,
но его бизнес-логика остаётся feature-owned; `CardList` остаётся experimental
pattern, `FilterBar` после независимого применения в Admin management routes имеет
статус beta, а BottomSheet — experimental presentation. Route status filters
остаются Link внутри FilterBar с `href`/query и `aria-current`; SegmentedControl
предназначен только для in-place mode/filter.

Service-файлы, подключённые этими экранами, являются generated adapters. Они не
указываются как canonical implementation и не редактируются отдельно от мастер-кода
в `web/`. Полная decomposition, состояния, gaps и acceptance-проверки собраны в
[`PILOT_MIGRATION.md`](../../docs/design-system/PILOT_MIGRATION.md).

## Граница legacy

Кроме перечисленных пилотных поверхностей, Admin, Mini App и Landing всё ещё содержат
старые локальные стили, повторяющиеся компоненты и визуальные literals. Это известный
долг, зафиксированный в `legacy-baseline.json`. Линтер разрешает долгу уменьшаться,
но останавливает его рост. Повышать baseline ради зелёной проверки нельзя.

Миграция выполняется постепенно:

1. новая или изменяемая область использует публичные Context color tokens и
   утверждённый Core API;
2. старый `product-theme.css` остаётся платформенным и compatibility adapter;
3. общая замена legacy Button/TextField/Card выполняется отдельными небольшими шагами;
4. обязательный пользовательский сценарий должен оставаться рабочим после каждого
   шага.

Telegram Bot не получает Web CSS: для него общими становятся язык действий,
паттерны подтверждений, ошибок, пустых состояний, локализация и брендовые ассеты.
Нативных приложений в репозитории пока нет, поэтому Swift/Kotlin outputs в первую
фазу не создаются.

Нельзя сейчас массово переписывать все экраны, удалять compatibility variables,
ломать Telegram host variables/safe area, заменять авторские иллюстрации на иконки
или объявлять любой локальный продуктовый блок общим компонентом.

## Документы

- [`DESIGN_SYSTEM_AUDIT.md`](DESIGN_SYSTEM_AUDIT.md) — исходное состояние,
  количественные сигналы, дефекты, риски и карта миграции;
- [`FOUNDATIONS.md`](FOUNDATIONS.md) — токены, темы, типографика, spacing, media,
  motion и accessibility;
- [`COMPONENTS.md`](COMPONENTS.md) — публичный API primitives и компонентов первой
  фазы;
- [`DESIGN_SYSTEM_CONTRIBUTING.md`](DESIGN_SYSTEM_CONTRIBUTING.md) — обязательный
  процесс расширения для человека и AI agent;
- [`PILOT_MIGRATION.md`](../../docs/design-system/PILOT_MIGRATION.md) — реальные
  пилотные экраны, граница Core/feature, states, gaps и acceptance-контракт;
- [`QUALITY_GATES.md`](../../docs/design-system/QUALITY_GATES.md) — автоматические
  guards, contract/a11y/visual coverage, baseline и оставшиеся риски;
- [`BOTTOM_SHEET_CONTRACT.md`](../../docs/design-system/BOTTOM_SHEET_CONTRACT.md) —
  experimental semantics, focus, scroll, Web/Mobile/Telegram review;
- [`CATALOG.md`](../../docs/design-system/CATALOG.md) — устройство рабочего Catalog,
  coverage, проверки, найденные gaps и дальнейшие границы;
- [`CATALOG_AUDIT.md`](../../docs/design-system/CATALOG_AUDIT.md) — аудит исходной
  витрины с P0/P1/P2 findings и снимками до перестройки;
- [`web/catalog.html`](web/catalog.html) — рабочий Catalog и deep links;
- [`../../docs/design.md`](../../docs/design.md) и
  [`../../docs/color-system.md`](../../docs/color-system.md) — общая продуктовая
  навигация и история цветовой системы.

Compatibility FeatureCard: `button.rf-feature-card[aria-pressed]` позволяет
собрать выбор больших иллюстрированных блоков с отдельным подтверждением.
`true` использует существующую Context-роль `background.brand.selected`, как
rich ListItem. Значение и взаимоисключение принадлежат форме. Каталог Banner
показывает оба состояния в Light/Dark; это совместимый API, lifecycle Banner
остаётся beta.

Badge и Chip поддерживают `data-label-wrap="nowrap"`: подпись остаётся одной строкой, родительская группа переносит элементы целиком. Без атрибута сохраняется перенос длинного текста. Вариант показан в примерах Neutral Badge и Secondary Chip каталога; цвета, состояния и темы остаются общими.

CardList `rf-card-list--preview` показывает одну карточку по центру в ширину одной колонки compactGrid; не совмещается с другими grid-вариантами. Проверяется в state matrix каталога, в обеих темах. Продукт владеет содержимым и открытием карточки.
