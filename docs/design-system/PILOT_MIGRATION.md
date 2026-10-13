# Пилотная миграция реальных экранов на Core UI

Пилот проверяет не количество компонентов, а способность существующего Core UI
собирать реальные интерфейсы без второго набора Button, TextField, Card, цветов и
размеров внутри feature. Продуктовая логика, API, география, CSRF, пагинация,
авторизованная загрузка фото и локализация не меняются.

## Выбранные экраны

| Сложность | Экран | Платформа | Почему выбран |
| --- | --- | --- | --- |
| Простой | Admin `/login` | Web | Изолированная настоящая форма: два TextField, password composition, Alert и Button без зависимости от большого legacy AppShell |
| Средний | Mini App `ProfileSettingsFlow` — имя и язык | Mobile Web | Реальная форма с validation, loading, error, native radio selection, длинными локализованными подписями, safe area и полноэкранным overlay |
| State-rich | Mini App каталог → карточка → `ListingDetailSheet` | Mobile Web | Card list, filter context, initial/load-more loading, empty, error, missing/slow photo, Badge, действия и BottomSheet |

Landing `/` и Admin `/listings` рассматривались, но не вошли в первый срез. Landing
визуально прост, однако его полная очистка затрагивает все marketing patterns сразу.
Admin `/listings` наследует крупный legacy shell, permissions, server-route filters,
table-to-card responsive contract и experimental ActionMenu/Pagination. Он остаётся
следующей Web-волной; route links нельзя ошибочно заменить SegmentedControl.

## Delivery layer

Production-сервисы разворачиваются отдельными `git subtree` и не видят корневой
`design/`. Поэтому миграция началась с управляемой доставки, а не с ручного
копирования CSS:

```text
web/primitives.css + web/components/*.css
                    │
                    ▼ build_tokens.py
generated/web/core-ui.css + web/core-ui.js
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Admin     Mini App   Landing
  static/design-system/core-ui.{css,js}
```

Порядок component modules читается из `web/components.css`. Bundle не содержит
runtime `@import`; все service-копии побайтно проверяются, а `--check` контролирует
23 generated outputs. Канонический и service-generated код вручную не редактируется.

## UI decomposition

### AdminLoginScreen

```text
AdminLoginScreen                                      Feature
├── LoginLayout                                       Feature composition
│   ├── BrandScene                                    Feature composition + assets
│   ├── BrandLockup                                   Feature asset
│   └── Stack / Text                                  Primitives
└── LoginForm                                         Feature composition
    ├── TextField                             Core stable
    ├── PasswordField                                 Composition, not a new Core
    │   ├── TextField
    │   └── IconButton → Icon
    ├── Button / primary / block                      Core stable
    └── Alert / error                                 Core stable

Tokens: surface, text, action, form, border, focus, typography, spacing, radius,
elevation, control height.
```

На desktop и tablet `BrandScene` показывает отдельную органическую Brand-фигуру и
полностью вписанную 3D-флористку. Ниже системного breakpoint `md` (`768px`) сцена
скрывается, а raster флористки не добавляется в DOM и не загружается: остаётся
одноколоночная форма.

### ProfileSettingsScreen

```text
ProfileSettingsScreen                                Feature
├── FullScreenSettingsOverlay                        Feature controller
│   ├── SafeArea → Container → Stack                 Primitives beta
│   └── ScreenHeader                                 Feature composition
│       ├── BrandLockup                              Feature asset
│       └── IconButton / tertiary / close            Core stable
├── SettingsIntro
│   └── Text / heading, body, label                  Primitive beta
├── ProfileSettingForm                               Feature composition
│   ├── Name mode
│   │   └── TextField → error           Core stable
│   └── Language mode
│       └── Radio                                    Core stable Web, native-first
│           └── LanguageOption                       Feature composition
│               ├── native radio                    Platform control
│               ├── flag Image                      Feature asset
│               └── Text
└── Button / primary / block / loading               Core stable

Cross-cutting: localized Toast remains beta.
Tokens: safe area, surface, text, form, action, focus, spacing, typography,
touch target, motion.
```

Location mode shares the migrated shell, TextField and Button presentation, but its
canonical geocoder contract and save logic are intentionally unchanged. A
`LanguageOption` component was not added: native radio + feature row solves one
product-specific presentation.

### CatalogListingsScreen → ListingDetailSheet

```text
CatalogListingsScreen                                Feature
├── CatalogFilters                                   Feature FilterBar
├── CatalogResults                                   Feature region
│   │   └── Card + Skeleton(media/text)              Core stable
│   ├── EmptyState                                   Core stable
│   ├── ErrorState                                   Pattern beta
│   │   └── Icon + Text                              Primitives
│   └── CatalogGrid                                  CardList candidate
│       └── ListingCard                              Feature component
│           ├── Card / interactive                   Core stable
│           ├── AspectRatio → Image/fallback Icon    Primitives beta
│           ├── Badge                                Core stable
│           └── Stack / Inline / Text / Icon         Primitives beta
├── Button / secondary / loading                     Core stable
└── ListingDetailSheet                               Feature overlay
    ├── BottomSheet presentation                     Core experimental
    ├── IconButton / close                           Core stable
    ├── AspectRatio → Image/fallback Icon            Primitives beta
    ├── List → ListItem                              Core beta
    ├── Text / Stack                                 Primitives beta
    └── Button primary/destructive                   Core stable

Tokens: card, badge, surface, text, icon, action, skeleton, overlay, focus,
spacing, radius, elevation, motion, z-index, safe area.
```

`ListingCard` показан как **Listing Card** в Templates и имеет статус **beta**.
Визуальная anatomy принадлежит общему Core API `.rf-listing-card` в
`design/design-system/web/components/patterns.css`. Catalog и Mini App используют
эти же публичные классы; локальные `.catalog-card*`/`.listing-card-specimen*`
остаются hooks данных и демонстрации, без дублирования presentation.

Фотография обрезается внешним контуром Card; media имеет нулевой радиус.
Текстовая панель перекрывает фото на 16 px, использует padding 12 px и radius.xl.
Цена, тип и свежесть однострочные, длинный текст затухает. Город и независимые
статусы размещаются поверх фото. Loading/error используют Core Image/Skeleton.
Данные, локализация, таймер «Новое», authorized photo lifecycle и переходы
остаются в Mini App. Общий CSS API не объявляет React/native adapters стабильными.

`CardList` остаётся experimental pattern. Существующий sheet controller сохранён
как platform/feature behavior: BottomSheet ещё не имеет стабильного Telegram
Back Button, nested overlay, gesture и keyboard contract. Presentation sheet
принадлежит canonical Core CSS.

## Gap analysis

| Need | Existing solution | Gap type | Proposed solution | Level |
| --- | --- | --- | --- | --- |
| Доставка Core UI в независимые сервисы | Только token compatibility copies | Infrastructure | Generated bundle + byte-equal CSS/JS service adapters + `--check` | Build layer, реализовано |
| Видимый focus у stable actions/fields/cards | Состояние обещано registry, но CSS его явно не рисовал | API defect | Общий semantic `:focus-visible` в canonical Button/IconButton/Link, TextField и interactive Card/ListItem | Existing Core, исправлено |
| Вертикальное положение trailing field action | TextField slot был absolute без block alignment | API defect | Canonical slot занимает block inset и центрирует действие | Existing Core, исправлено |
| Узкая ширина standalone form | Container слишком широк, отдельного повторяемого component contract нет | Component token/API gap | До второго form использовать подходящий `spacing.*` в product composition; при повторении закрепить прямой Component alias на `spacing.*` | Component candidate |
| Label в single-question fullscreen flow | TextField требует видимый label, экран уже имеет heading | Composition | Связанный localized label/legend; не создавать label-less TextField variant | Feature composition |
| Язык как большая строка выбора | Radio stable Web | Composition | Native radios внутри feature LanguageOption row | Feature component |
| Card с product media и badges | Card имеет общий content padding, нет Listing anatomy | Composition/API friction | ListingCard управляет media layout; оценить повторение full-bleed media slot перед variant | Feature component |
| Loading action требовал синхронных `disabled`, `data-loading`, `aria-busy` | Feature управлял несколькими производными states | API ergonomics | Feature задаёт только `data-loading=true`; canonical Core выводит semantics, Spinner и interaction guard | Existing Core, исправлено |
| Локализованный EmptyState содержит `<br>` | EmptyState даёт title/description slots | Content-model gap | Безопасно разделять существующую строку; в следующей i18n-волне разделить title/body keys на всех языках | Feature/i18n |
| Missing/slow/failed photo | Image + AspectRatio дают presentation, но не lifecycle | Composition | Сохранить авторизованный blob controller; fallback — системный Icon | Feature component |
| Bottom sheet lifecycle | Experimental BottomSheet CSS владеет backdrop и presentation | Behavior gap | Сохранить product controller; отдельно спроектировать Back Button, inert, scroll lock, nested overlays, gestures | Experimental Core candidate |
| Catalog grid/filter semantics | Stack/Inline и Card не образуют результат выдачи | Pattern candidate | Подтвердить CardList/FilterBar вторым экраном до registry promotion | Pattern |
| Telegram safe area + feature padding | SafeArea покрывает CSS env, product shell добавляет content padding | API clarity | Не складывать оба контракта на одном DOM layer; SafeArea снаружи, Container/Stack внутри | Composition rule |

Ни один новый Core component автоматически не создан. Статусы RadioGroup, ListItem,
ErrorState и Toast не повышаются по одному пилоту; BottomSheet остаётся
experimental.
Radio отдельно утверждён владельцем как Stable Web после обновления каталога
и проверок Value/State/Error, тем и клавиатуры; это не повышение по одному пилоту.

## Проверяемые состояния и адаптивность

| Поверхность | Проверки пилота | Не применяется / остаётся продуктовым |
| --- | --- | --- |
| Admin Login | floating label для username/current-password, browser autofill, default, generic auth error, native validation, disabled control, короткий и длинный flash; 320/390/768/1440 px; Light/Dark; keyboard order, Enter, focus-visible, 44 px password action с системными `eye`/`eye-off`, сохранение value/focus/caret, 200% zoom и reduced motion | loading/offline не имитируются: POST синхронный, а сетевую ошибку обрабатывает браузер |
| Profile Settings | name default/validation/loading/error; language selection и длинные RU/EN/KY/UZ labels; small/large viewport, safe area, virtual keyboard, inert background, close/focus return, touch targets, Light/Dark | location API, geocoder response и offline policy не меняются; это отдельный integration contract |
| Catalog | initial loading, load-more loading, empty all/filtered, request error, disabled/busy action, zero/one/many cards, short/long copy; small/large viewport, Light/Dark, focus-visible и reduced motion | browser offline сводится к тому же localized ErrorState; фильтры и пагинация остаются product controller |
| Listing detail | default, missing/slow/failed authorized photo, own/foreign listing actions, destructive action, long metadata; small/large viewport, safe area, scroll lock, Escape/close/focus return, touch targets | Telegram BackButton и gesture dismissal ещё не являются stable Core contract |

Контраст проверяется semantic-token тестами и browser computed styles. Feature-код
не содержит theme-specific значений: Light/Dark переключают только semantic tokens.
Skeleton скрыт от accessibility tree, busy объявляется один раз на results/action
container, form error связан с control, а icon-only actions имеют доступные имена.

## Migrated screens

1. **Admin Login** — standalone Web form полностью собран из generated Core UI.
2. **Mini App Profile Settings** — общий fullscreen shell, name/location TextField и
   language RadioGroup presentation перенесены на Core; географический контракт не
   менялся.
3. **Mini App Catalog → Listing detail** — карточки, loading/empty/error, изображения,
   badges, действия и sheet content используют Core presentation при сохранённом
   продуктовом controller.
4. **Mini App Create/Edit Wizard** — ListItem, Radio, TextField, ListItem, Badge,
   Card, Image, Surface и Button образуют все семь шагов; геокодер, photo lifecycle и
   публикация остаются feature-owned.

Изначально это были вертикальные срезы. После следующего migration pass все видимые
поля Admin переведены на `TextField` (включая Variant Multiline), `Select` и `Choice`, а поля
города и цены в Mini App create/edit wizard — на общий `TextField` с системной
ошибкой. Служебные hidden/file controls и product orchestration остаются feature-owned.

## Component usage

| Уровень | Использовано в пилоте |
| --- | --- |
| Core stable | Button, IconButton, TextField, Icon, Radio, Card, Badge, Alert, Skeleton, EmptyState |
| Core beta / primitives | ListItem, Container, SafeArea, Stack, Inline, Text, Image, AspectRatio, Surface |
| Patterns beta | ErrorState |
| Experimental presentation | BottomSheet; только CSS/anatomy, product lifecycle сохранён |

Beta/experimental использование не меняет lifecycle обещание. Оно даёт evidence для
следующего design review, а не автоматически делает API stable.

## Design System gaps

- Повторяемый narrow form max-width пока не имеет собственной semantic layout role.
- Card не имеет доказанного full-bleed media slot для product listing anatomy.
- BottomSheet не задаёт полный Telegram BackButton, gesture, nested overlay и keyboard
  contract.
- EmptyState i18n в старом каталоге объединяет title/body через HTML break в одной
  строке; Core slots выявили необходимость разделить content keys.
- Image/AspectRatio намеренно не управляют авторизацией, blob URL, retry и lifecycle.

Подробные решения и уровень каждого gap приведены в таблице выше.

## API problems

- Stable interactive controls обещали focus state, но canonical CSS не рисовал его
  явно. Исправлено единым semantic `:focus-visible`, без feature override.
- Trailing action у TextField имел slot, но не имел надёжного вертикального выравнивания.
  Исправлено в canonical implementation.
- Button loading теперь принимает один intent `data-loading=true`. Core сам выводит
  `disabled`, `aria-disabled`, `aria-busy`, Spinner и interaction guard, сохраняя
  layout и исходные states; feature helper больше не синхронизирует производные
  флаги.
- SafeArea и content padding легко ошибочно сложить на одном узле. В пилоте контракт
  разделён на внешний SafeArea и внутренний Container/Stack.
- BottomSheet CSS полностью владеет presentation, backdrop и visibility; behavior
  API ещё недостаточен для общего stable component.

Названия Button, TextField, Card, Badge и EmptyState на реальном коде остались
понятными; новых variants ради одного экрана не потребовалось.

## New patterns identified

- **FilterBar** — композиция route links/chips с сохранением URL и `aria-current`;
  это не SegmentedControl.
- **CardList** — results region с busy/empty/error и повторяемыми interactive cards.
- **StandaloneFormLayout** — бренд, narrow Container, Card и form stack; нужен второй
  независимый экран до регистрации.
- **FullscreenSettingsFlow** — SafeArea, header, localized form и sticky action;
  остаётся product pattern до повторения вне profile settings.

ErrorState уже существует как beta pattern и получает production
evidence; дублирующие имена не создаются.

## Feature components identified

- `LoginForm` и password composition;
- `ProfileSettingsFlow`, `LanguageOption` и canonical geocoder adapter;
- `CatalogFilters`, `ListingCard` и авторизованный photo lifecycle;
- временной статус ListingCard «Новое»: первые 60 минут от серверного `created_at`,
  без продления при платном `bumped_at`;
- `ListingDetailSheet` controller и его seller/buyer actions;
- Telegram auth, haptic, MainButton/BackButton orchestration.

Эти сущности содержат Contour business meaning или platform lifecycle и поэтому не
переносятся в Core UI.

## Technical violations removed

- локальные версии Button, Input, Card, Badge, Skeleton и EmptyState на пилотных DOM;
- raw HEX/RGB, локальные palette/gradient/shadow, произвольные radius/spacing/type
  values в standalone Login;
- emoji photo placeholders и pilot inline presentation;
- ручное копирование Core CSS/JS между тремя subtree;
- недоступный 36 px password action;
- generic auth error без `role=alert`;
- поздние feature styles, которые могли незаметно переопределять Core states.

После полного среза Mini App удалены все его записи из visual-literal baseline и
все `services/miniapp/*` из `legacyReferences` реестра. Локальная product theme,
compatibility-навигация и presentation BottomSheet удалены; feature CSS хранит
только бизнес-композиции на публичных tokens/components. Новых разрешений baseline
не получил. Это означает 100% потребление Design System в Mini App, но не повышает
beta/experimental компоненты до stable без их собственных exit criteria.

## Recommended changes to Core UI

1. Сохранить уже внесённые canonical fixes для focus-visible и TextField trailing action.
2. Сохранять contract tests для единого Button loading intent и
   SafeArea/Container composition; не расширять API независимыми boolean-флагами.
3. Довести BottomSheet behavior отдельно: dialog semantics, focus/inert,
   scroll lock, Telegram BackButton, viewport/keyboard, nested overlays и gestures.
4. Проверить повторение full-bleed media Card на Admin listings до добавления slot или
   variant.
5. После второго standalone form оценить Component max-width token с прямым alias
   на подходящий `spacing.*`.
6. Разделить title/description keys EmptyState на всех четырёх языках в отдельной
   i18n-миграции.
7. Не повышать RadioGroup, ListItem, ErrorState или BottomSheet только
   на основании этого пилота.

## Migration plan

Миграция Mini App завершена. Следующие срезы относятся к остальным продуктовым
поверхностям:

1. Admin `/listings`, `/users`, `/bookings`, `/payments`: route filters перенесены
   на Link/FilterBar с `href`/query/`aria-current`, TextField — Search composition и Meta;
   route navigation не превращена в SegmentedControl.
2. Admin `/users/<id>` использует Core Tabs для связанных tabpanel, а локальный
   выбор метрики Dashboard — native-radio SegmentedControl.
3. Mini App `My listings` завершён как отдельный срез: полноэкранная композиция
   использует SafeArea/Container/Stack/Inline, native-radio SegmentedControl остаётся
   in-place filter, а список — семантический CardList с Card + Thumbnail. Загрузка
   сохраняет геометрию тремя Skeleton-карточками и объявляется через `aria-busy`;
   пустой результат и ошибка используют EmptyState/ErrorState, у ошибки есть
   системная кнопка повтора. CardList, Thumbnail и ErrorState остаются pilot API и
   этим внедрением не переводятся из experimental/beta в stable. Product-композиция
   сохраняет компактную горизонтальную строку с Thumbnail 128 px слева; её selector
   обязан быть специфичнее позднего `Card.interactive { display:block }` из Core.
4. Mini App deal screen завершён как отдельный срез: role filter остаётся
   native-radio SegmentedControl; компактные строки собраны из Card + Thumbnail +
   Badge внутри семантического CardList. Загрузка использует три Skeleton-карточки и
   `aria-busy`, пустой результат — EmptyState, ошибка — illustrated ErrorState с
   retry. Role-specific actions остаются внутри detail sheet, а Toast policy не
   менялась. CardList, Thumbnail и ErrorState этим внедрением не повышаются в lifecycle.
5. Mini App create/edit wizard завершён как feature-композиция: illustrated
   List Item / Selection используется для выбора категории, native Radio — для размера и свежести,
   TextField + ListItem — для города, TextField с currency suffix — для цены, Card +
   AspectRatio + Image — для выбора фото и предпросмотра, Badge — для прогресса,
   Surface + Button — для sticky actions. Validation связана с полями через
   `aria-describedby` и `aria-invalid`; geography identity, загрузка фото и публикация
   не менялись. Отдельные Core `FormWizard` и `PhotoPicker` не создавались: пока это
   одна продуктовая композиция без независимого evidence.
6. Admin access management: RadioGroup, Alert, Dialog confirmation и permissions.
7. Landing `/`: Button-on-Link, Card, Badge и marketing patterns с semantic lists.
8. Admin broadcast form: TextField — Multiline с Placeholder, Alert и ConfirmationDialog.

После каждого среза: decomposition → reuse → gap analysis → composition → variant
только при доказанной необходимости → новый component последним; затем static lint,
browser states и обязательный связный release gate.
