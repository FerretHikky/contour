# Core UI v1: инвентарь компонентов Contour

Этот документ фиксирует единые названия и границы Core UI v1 по реально работающим
интерфейсам Contour. Mini App полностью потребляет Core UI и системные токены без
записей в visual-literal baseline и `legacyReferences`; Admin и Landing продолжают
постепенную legacy-миграцию, а Telegram Bot рисуется самим Telegram. Lifecycle
beta/experimental компонентов при этом не меняется автоматически. Состав, состояния
и ограничения первого пилота описаны в
[`PILOT_MIGRATION.md`](PILOT_MIGRATION.md).

Инвентарь сделан по:

- каноническому Web reference в **design/design-system/web/**;
- 17 Jinja-шаблонам Admin;
- **services/miniapp/static/index.html**, **style.css** и **app.js**;
- трём страницам Landing;
- **services/bot/app.py** и четырём каталогам локализации Bot.

Нативного iOS- или Android-кода в репозитории нет. В таблицах ниже:

- **Web** — Admin и Landing;
- **Mobile Web** — Telegram Mini App и узкие Web-экраны;
- **Bot** — сообщения и клавиатуры Telegram;
- **native** намеренно не проектируется до появления реального клиента.

## Ключевые числа текущего состояния

| Поверхность | Найденный UI |
| --- | --- |
| Design System reference | 12 beta primitives; stable reference для восьми Core UI families; beta/experimental examples отделены lifecycle-статусом |
| Admin | 17 шаблонов; 284 статически извлечённых class names; 56 button, 57 input, 3 select, 1 textarea, 16 table, 1 dialog |
| Mini App | 320 строк HTML, 914 CSS, 2 305 JS; 22 статические и 27 создаваемых JS-кнопок; 6 dialog surfaces, из них 4 fullscreen flow и 2 bottom sheet; 4 начальных skeleton cards; 1 toast live region |
| Landing | 3 независимые страницы, 1 267 строк; 79 class names; 20 ссылок, из них 9 CTA presentations; 11 card/fact-card и 11 step/step-row |
| Telegram Bot | 48 InlineKeyboardButton, 21 InlineKeyboardMarkup, 5 ReplyKeyboardMarkup, 51 KeyboardButton; 240 ключей на каждом из RU, EN, KY и UZ |

Эти числа не являются API. Они показывают, какие повторения нужно свести к
каноническим компонентам в первую очередь.

## Каноническая терминология

TextField: встроенные clear/password/calendar actions — native button с
`rf-text-field__action-trigger`, без вариантов самостоятельного IconButton.
Иконка 24 px, без фона/обводки, с доступным именем и keyboard focus indicator.
Обнаруженный integration gap (tertiary вместо иконки) закрыт в canonical forms,
Catalog/examples, Admin и фабрике полей Mini App. Нового публичного компонента
или набора токенов для этого не создаётся.

| Каноническое имя | Что означает | Что больше не использовать как синоним |
| --- | --- | --- |
| Surface (deprecated) | Старое оформление; компоненты по назначению или Context-цвет для фона | panel, box, tile |
| Section | Смысловой раздел страницы | card только потому, что есть фон |
| Button | Запускает действие | ссылка без href, кликабельный div |
| Link | Переходит к другому адресу или ресурсу | button для обычной навигации |
| IconButton | Icon-only presentation общего Button contract | icon action, round button, close button как разные компоненты |
| TextField | Поле с подписью, Description, ошибкой и иконками; Web использует нативный input | Input как публичное имя, search/password как новые базовые components |
| Badge | Неинтерактивный статус или короткая метка | pill, tag, chip для статуса |
| Chip | Интерактивный компактный выбор; filter/removable задаются variants | FilterChip, ChoiceChip, tag или badge как отдельные базовые компоненты |
| Tab | Один элемент Tabs: Label, Value, State, Start/End Icon | отдельная реализация вкладки внутри группы |
| Tabs | Группа Tab: выбор, клавиатура и локальные tab panels | серверный фильтр или нижняя навигация |
| SegmentedControl | Переключает один режим, роль или фильтр **на месте**, без перехода по URL | tabs для локального mode/filter; route links с href/query сюда не входят |
| Slider | Приблизительно выбирает число внутри диапазона | вариант Input/TextField; точное число вводится через Number TextField |
| ActionMenu | Deprecated compatibility name | Новый actions API — `Dropdown mode=actions` |
| Select | Deprecated compatibility name | Новый выбор — `Dropdown mode=selection` |
| Dialog | Модальная задача с focus management | modal как имя каждого overlay |
| BottomSheet | Мобильная presentation Dialog или списка действий | отдельная бизнес-сущность sheet |
| Alert | Сообщение, остающееся в потоке страницы | toast/snackbar для постоянной ошибки |
| Toast | Короткое неперехватывающее уведомление | alert для исчезающего сообщения |
| EmptyState | Пусто, ничего не найдено или нет доступа | empty как произвольный CSS-класс |
| Skeleton | Placeholder, сохраняющий будущую геометрию | spinner для целой карточной выдачи |
| BotAction | Кнопка, которую рисует Telegram | Web Button в Python-коде Bot |
| BotKeyboard | Разметка host-клавиатуры Telegram | Web navigation или CSS grid |

## Уровни и статусы

- **Primitive** — один строительный приём без продуктового смысла.
- **Component** — законченный control или блок с состояниями и accessibility API.
- **Pattern** — композиция компонентов для повторяемой задачи.
- **Platform adapter** — тот же смысл, но UI и ограничения задаёт host-платформа.
- **Feature** — продуктовая функция; не становится общей только из-за сложной вёрстки.

Канонический lifecycle хранится только в
[`component-registry.json`](../../design/design-system/component-registry.json):

- **stable** — общий API реализован, документирован и проверяется автоматически;
- **beta** — canonical reference существует, но production-миграция ещё не доказала API;
- **experimental** — контракт исследуется и может измениться;
- **deprecated** — новое использование запрещено, указан replacement.

Пометки readiness в аудитных таблицах ниже объясняют происхождение и scope, но не
заменяют lifecycle. При расхождении machine-readable registry всегда является
источником правды.

## Пилотные экраны: Core и feature

Generated-копии `static/design-system/core-ui.{css,js}` только доставляют
канонический Web API в независимые сервисы. Каноническая реализация по-прежнему
живёт в `design/design-system/web/`; продуктовая логика и layout конкретного экрана —
в `services/`.

| Пилот | Использует Core UI | Остаётся feature / platform adapter |
| --- | --- | --- |
| Admin `/login` | TextField, IconButton, Button, Alert; Stack/Text primitives | LoginLayout, BrandScene, BrandLockup, PasswordField composition, CSRF и authentication flow |
| Mini App `ProfileSettingsFlow` | Button/IconButton, TextField, Radio; beta SafeArea, Container и ListItem | Fullscreen controller, LanguageOption row, geocoder, validation/save orchestration и localized Toast |
| Mini App каталог | Card, Badge, Skeleton, EmptyState, Button; experimental ListingCard; beta ErrorState и media/layout primitives | CatalogFilters, CatalogGrid, listing data/timers, cursor pagination и авторизованный photo lifecycle |
| Mini App `ListingDetailSheet` + `PromotionSheet` | Button/IconButton; beta List/ListItem и media/layout primitives; experimental BottomSheet presentation с общей анатомией grip/header/title/scroll/body/footer | Focus trap/return, inert background и overlay dismissal controller; Back Button/viewport/keyboard/gesture gaps; product actions, данные объявления, оплата и photo lifecycle |

Пилот не повышает lifecycle до stable. `ListingCard` зарегистрирован как
experimental Template (уровень `pattern`), а его бизнес-логика остаётся feature-owned;
`CardList` остаётся experimental pattern, `FilterBar` после независимого применения
в Admin management routes имеет статус beta, а BottomSheet —
experimental presentation. Полный gap analysis и acceptance-контракт — в
[`PILOT_MIGRATION.md`](PILOT_MIGRATION.md).

## Core UI v1: primitives

| Canonical | Purpose / level | Web | Mobile Web | Bot / platform difference | Variants, sizes, states | Dependencies | Accessibility | Audit readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SafeArea | Защита от системных inset-зон; Primitive | rf-safe-area | Telegram/device safe area | Host сам управляет inset | all; default | Spacing | Controls не перекрываются системным UI | registry beta |
| Grid | Адаптивная сетка; Primitive | rf-layout-grid | После утверждения Core | Не применяется | default/compact/wide; span 1/2/3/all | Foundation Grid, Spacing | DOM-порядок сохранён, span ограничен числом колонок | beta; отдельный Playground |
| Stack | Вертикальный ритм; Primitive | rf-stack | Тот же, чаще плотный | Telegram сам раскладывает rows | gap 1/2/3/4/6/8 | Spacing | DOM-порядок равен visual order | v1 reference |
| Inline | Горизонтальная группа; Primitive | rf-inline | Wrap и touch gaps | Bot keyboard row — adapter | gap, between, nowrap; wrap/default | Spacing | Не менять логический порядок CSS-ом | v1 reference |
| Text | Смысловая типографика; Primitive | rf-text и роли display/heading/body/label/caption | Та же шкала, без hover-only смысла | Bot использует локализованный plain/HTML text | Semantic roles; primary/secondary/tertiary/inverse | Typography, color | Правильный HTML heading/label важнее класса | v1 reference |
| AspectRatio | Стабильное media-место; Primitive | rf-aspect-ratio | Критично против layout shift; прямой Image заполняет slot без intrinsic-size зазоров | Telegram media задаёт host | product, square, portrait, landscape | Media ratio tokens | Не несёт роли | v1 reference |
| VisuallyHidden | Текст только для assistive technology; Primitive | rf-sr-only | Тот же | Обычно не нужен | Один контракт | Focus/accessibility foundations | Нельзя скрывать focusable controls | v1 reference |

Удалённые `Box`, `Divider` и `Spacer` не являются отдельными сущностями Core:
защита от overflow принадлежит конкретным layout primitives, смысловой разделитель
задаётся нативным `hr`, а расстояние — системным `gap` у `Stack`/`Inline`.

## Выбранный стабильный Core UI v1

В стабильное ядро v1 входят восемь component families:

| Component family | Почему сейчас |
| --- | --- |
| Button и IconButton presentation | Самое частое действие на всех Web-поверхностях; reference уже есть |
| TextField / TextField | Основа 61 Admin controls и динамических Mini App forms; reference уже есть |
| Badge | 20 badges и 5 pills в Admin плюс Mini App status/tag |
| Alert | Flash/banner/warning/inline error и Bot status vocabulary |
| SegmentedControl | Две Mini App in-place segmented groups; Admin route status filters используют Link/FilterBar |
| Skeleton | Четыре стартовые Mini App cards и будущие list/table loading states |
| EmptyState | 15 Admin empty states плюс Mini App empty/no-results |

TextField — Search и PasswordField считаются compositions TextField, а IconButton —
presentation Button. Они не увеличивают число базовых component families.

## Полный component registry

Описания всех карточек каталога берутся из `summary` в Registry: короткая фраза
о назначении, без технических подробностей, до 100 символов и без переносов.
Правило действует также для Primitives, Patterns и отфильтрованных списков.
Подробный `purpose` сохраняется для документации и страницы сущности;
обрезка текста и многоточие не заменяют короткое описание.

Ниже перечислена каждая запись уровня `component` из machine-readable registry,
включая deprecated aliases. PasswordField остаётся composition TextField +
IconButton и отдельной registry entry не является.

| Canonical | Purpose / level | Web | Mobile Web | Bot / platform difference | Variants, sizes, states | Dependencies | Accessibility | Audit readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Icon | Общий набор Figma; Component (`#components/icon`) | rf-icon + data-rf-icon-glyph через публичный Core; React Icon | Тот же Core; прямые Glyph и data-lucide запрещены | Telegram-native действия не используют SVG Icon | 12/16/24/32; Line/Solid/Duotone — по 904 одинаковых Glyph; default/disabled/skeleton | Iconography, Component/Spacing contract | Decorative aria-hidden; смысловой icon требует имени; Icon не кликабелен | stable; миграция Admin/Mini App/Landing, единый renderer и проверка всех Glyph |
| Breadcrumbs | Положение текущей страницы в иерархии; Component | `nav.rf-breadcrumbs` с ordered list, родительскими ссылками и текущим текстом | Обычно compact Back; полная цепочка только в подходящем wide layout | Bot использует явное Back-действие | default/supporting; sm/md; default/hover/pressed/focused/current; explicit collapsed item | Link, Icon, Text | Именованный nav; ordered list; `aria-current=page` на текущем тексте; separator decorative | registry beta; Web reference и Catalog playground |
| Button | Запуск действия; Component | `rf-button`; `@reflower/core-ui-react` для React Web; legacy btn families мигрируют сюда | Touch target не меньше 44; haptic остаётся adapter | Отображается как BotAction | primary/secondary/tertiary/ghost/danger/success; s/m/l = 32/40/48 px; default/hover/pressed/focused/disabled/loading/skeleton; optional Subtitle/Start icon/End icon | Text, Icon 24 px, action tokens, Spinner | Нативный button и type; visible focus; loading сообщает busy/disabled и блокирует повтор; icon-only вынесен в IconButton | v1 stable reference; React Web adapter, не React Native |
| IconButton | Icon-only presentation Button; Component | rf-icon-button | Системный touch target и native icon action | BotAction всегда имеет текстовую подпись | те же primary/secondary/tertiary/ghost/danger/success; s/m/l; default/hover/pressed/focused/disabled/loading/skeleton | Button, Icon | Обязательное accessible name; icon decorative | v1 stable reference |
| TextField | Единый native input; Component | rf-text-field; password через trailing action | inputmode, enterkeyhint, без touch focus zoom | Свободный ответ пользователя в BotPrompt | text/email/tel/number/password и другие native types; sm/md/lg; default/hover/focus/filled/disabled/read-only/error | TextField, typography, control tokens; IconButton для password | native attrs; autocomplete совпадает с назначением; Core не ставит initial focus; eye/eye-off сохраняет value, focus и caret | v1 reference |
| Dropdown | Собственная раскрывающаяся поверхность выбора или действий; Component | Admin forms/dashboard используют selection; profile/row menus — actions | Mini App location filter использует viewport-safe custom listbox без browser popup | BotChoicePrompt остаётся platform adapter | selection/actions; single/multiple/grouped/searchable/cascading; sm/md/lg; open/selected/disabled/destructive/invalid/empty/loading | TextField, Button, ListItem, Icon | Явный mode; один trailing chevron; listbox/option не смешивается с menu/menuitem; dynamic options/form bridge; keyboard, Escape, focus return | registry stable; production evidence Admin + Mini App |
| Select | Deprecated compatibility alias; Component | Старые rf-select/native и custom references | Нового Mobile API нет | Не применяется | legacyNative/legacyCustom | Dropdown | Accessibility задаёт replacement Dropdown | deprecated → Dropdown |
| Checkbox | Независимый yes/no выбор; Component | Broadcast option, geo alias — legacy; новый контракт в Catalog | Web Core, touch target 44×44 px | BotChoicePrompt yes/no | M 24 px, radius 8; unchecked/checked/indeterminate; default/hover/pressed/focused/disabled/skeleton | TextField, Icon | Native input; accessible name без встроенного Label; focus-visible | Stable Web; визуально утверждён, legacy-миграция отдельно |
| Radio | Один выбор из небольшого набора; Component | Admin role choice | Mini App language choice | Inline choice rows | default; md; unchecked/checked; default/hover/pressed/focused/disabled/skeleton + Error | TextField | именованная группа native radio; Space и стрелки | registry stable (Web) |
| Counter | Числовая метка без действия; Component | После утверждения | После утверждения | Отдельное превью Catalog | brand/neutral; md 20 px; default/skeleton | Text | Точное число при Max+; нет tab stop; loading у контейнера | registry beta; SegmentedControl ещё не мигрирован |
| Switch | Немедленный boolean setting; Component | rf-switch native-checkbox Core; копии Admin/Mini App/Landing синхронизированы | Тот же Web Core; native adapter пока нет | BotChoicePrompt yes/no | default; lg/md/sm = 32/24/16 px; Value off/on; State default/hover/pressed/focused/disabled/skeleton | Selection tokens | Нет встроенного Label; aria-label/aria-labelledby обязательны; hit area ≥44×44; Tab/Space | stable; пока без продуктовых потребителей |
| Slider | Приблизительный числовой выбор; отдельный Component, не Input | rf-slider поверх internal native input type=range | Будущий native Slider adapter | В Bot заменяется вариантами выбора или текстовым вводом | default/withValue; md; default/hover/focused/active/disabled | TextField, Text | visible label; min/max/step/value; keyboard; disabled reason | registry beta; Web reference |
| Banner | Переход в раздел с title, subtitle и иллюстрацией; component | rf-banner; title использует публичный Title XL, subtitle — Body S | Profile navigation card без локальной типографики | Media action composition | illustrated; default; default/hover/pressed/focus/longContent | Text, Image, Button, Icon, Skeleton | Корень link/button; декоративное изображение с пустым alt; локализованные слова не дробятся при переносе | registry beta; Catalog playground + long-content evidence |
| ListItem | Повторяемая строка списка; Component | rf-list/rf-list-item; title = публичный Headline XS, description = Body S; leading/trailing slots центрируют содержимое внутри назначенного контейнера | Mini App Profile/ListingDetailSheet используют тот же title/description contract | Native list-row conventions | static/navigation/action/selection; sm/md/lg; default/hover/pressed/focus/selected/disabled | Surface, Inline, Stack, Text, Icon | Семантический list; одно primary action; accessible name; длинный title переносится целыми словами, description визуально сокращается без потери accessible text | registry beta |
| Badge | Короткий неинтерактивный статус; Component | rf-badge в Admin и Landing | rf-badge в карточках Mini App | Текстовый статус сообщения | brand/neutral/success/warning/error/info; sm/md = 20/24 px, текст 12/14 px; default/skeleton | Text, status colors, необязательные Start/End Icon 12 px | Статус читается текстом, не одним цветом; Skeleton сообщает busy; иконки декоративны | stable; обновлённые Core-копии синхронизированы локально во всех трёх Web-сервисах |
| Chip | Выбор или снятие фильтра; Component | users-filter-chip | Type/location filters | Inline scope action | primary/secondary/tertiary; sm/md/lg; default/hover/pressed/focused/disabled/skeleton | Button, Icon, Badge vocabulary | Button semantics; selected via aria-pressed when appropriate | registry stable |
| Avatar | Идентичность пользователя; Component | Header/user profile | Mini App Profile использует production-пилот XL для фото и буквенного fallback; смена фото остаётся feature-логикой | Telegram account avatar не контролируется Bot | image/initial/fallback; sm/md/lg/xl; loading/error | Image, Surface | Meaningful accessible name only where context needs it | registry beta; production pilot Mini App Profile |
| Image | Изображение с единым lifecycle состояний; Component | Большие media-slot и компактные preview | Все фото-поверхности Mini App: каталог, детали, свои объявления, отклики и preview | Telegram message использует текстовый fallback | cover/contain/compact; loading/loaded/error/empty | AspectRatio, Skeleton, Icon, Text | Содержательный alt; локализованный fallback; стабильная геометрия | registry beta; MediaFallback deprecated и остаётся внутренней совместимой частью |
| MediaFallback | Deprecated внутренняя presentation Image; Component | Только совместимость существующей разметки | Временно используется внутри текущего photo lifecycle Mini App | Не применяется | default/compact; error/empty/hidden | Image, Icon, Text, AspectRatio | Локализованный accessible name; смысл не только цветом | deprecated; replacement Image; новое прямое использование запрещено |
| Thumbnail | Компактное media preview; Component | Listing rows/details | Catalog/mine/deal cards | Telegram photo thumbnail host-rendered | square/product; sm/md/lg; loaded/fallback/error | Image, AspectRatio | Duplicate decorative image gets empty alt | experimental; сначала composition Image + AspectRatio |
| Calendar | Дата или диапазон; Component | Dashboard filter (будущая миграция) | Выбор даты | — | single/range; 1/2 months; disabled/skeleton | Icon, IconButton, Text | Grid keyboard, ISO labels, today | registry beta |
| Spinner | Короткая неопределённая работа; Component | Button/loading block | API action/loading | Telegram typing/progress where available | sm/md/lg; neutral/inverse; active/complete | Motion, Icon size | role status or hidden spinner plus visible loading text | registry beta |
| Skeleton | Placeholder будущей геометрии; Component | Table/card loading when needed | Уже 4 catalog skeleton cards; fill занимает весь media-slot | Не переносится в Bot | block/text/media/fill/avatar; loading/reduced-motion | Surface, motion | aria-hidden skeleton; container announces loading once | v1 stable target |
| Alert | Сохраняющееся сообщение; Component | flash, viewer banner, warning blocks | Inline errors/status | Bot message or show_alert adapter | info/success/warning/error; inline/banner; dismissible; loading/resolved | Text, Icon, Button | role status for polite, alert only for urgent; focus only when needed | v1 stable target |
| Tab | Элемент Tabs; Component | Core rf-tab, canonical пример tab/line.html | Тот же Core Web | Нет | Line/M; Value default/selected; State default/hover/pressed/focused/disabled/skeleton; Label; Start/End icon 16 px | Text, Icon | role=tab, aria-selected, disabled, skeleton announcement через контейнер | registry stable; страница внутри Tabs |
| Tabs | Группа Tab и локальные panels; Component | user-profile tabs; Catalog | Только локальные panels | Inline actions imitate choice, но не Tabs | Line/M; группа использует API Tab, владеет активным элементом и панелями | Inline, Tab | tablist/tab/tabpanel, controls, roving tabindex, arrow keys | registry stable; Admin User Profile + опубликованный Catalog |
| SegmentedControl | Exclusive in-place mode/filter; Component | Локальные mode/filter controls; не Admin route navigation | mine status and deal role | One-row inline choice | 2–5 options; compact/default; selected/focus/disabled | Button, Badge count | Radio or pressed semantics; не выдавать за Tabs или URL navigation | v1 stable target |
| ActionMenu | Deprecated compatibility alias; Component | Старые rf-menu references | Нового Mobile API нет | Не применяется | legacyMenu | Dropdown | Accessibility задаёт replacement Dropdown | deprecated → Dropdown |
| Dialog | Модальная задача; Component | access confirmation | Telegram showConfirm when available; fallback Web dialog | ConfirmationPrompt/show_alert | info/confirm/form/destructive; sm/md/lg/full; closed/open/loading/error | Surface, Button, TextField, focus manager | Label/description; focus trap; inert background; Escape; focus return | experimental |
| BottomSheet | Mobile presentation modal/actions; Component | Не базовая desktop presentation | ListingDetailSheet и PromotionSheet используют grip/header/title/scroll/body/footer; safe-area required | Inline keyboard replaces it | action/detail/confirm; compact/full; closed/open/loading/error | Dialog contract, Surface, StickyActionBar | Те же modal rules; visible close; no focus leak; drag handle не единственный close | experimental |
| Modal | Deprecated неоднозначный alias; Component | Нового API нет | Разделяется на Dialog/ActionSheet | Не применяется | — | Dialog | Accessibility задаёт replacement | deprecated → Dialog |
| Drawer | Боковая временная поверхность; Component | Side navigation/task candidate | Обычно native sheet/navigation | Не применяется | start/end; sm/md/lg; closed/opening/open/closing | Surface, Stack, Button, VisuallyHidden | Focus management; Escape; focus return; inert when modal | experimental |
| Toast | Короткое уведомление; Component/controller | Нужен для copy/save feedback | 1 live region, four variants | query.answer without show_alert | info/success/warning/error; transient/persistent; queued/show/hide | Alert semantics, Icon, motion | Polite live region; error не исчезает до возможности прочитать | registry beta |
| Progress | Измеримый прогресс процесса; Component | Native progress/rf-progress | Native progress presentation | Step text “n из m” | determinate/indeterminate; md; active/complete/error | — | Native progress; accessible name/value; long-operation status text | registry beta |
| Accordion | Независимые disclosure sections; Component | native details/summary reference | Native disclosure group | Сообщения остаются развёрнутыми | single/multiple; collapsed/expanded/focus/disabled | Text, Icon | Native details/summary; keyboard; heading order | registry beta |

| TabBar | Нижняя навигация приложения; Component | Core mobile ≤640 px | Core bottom + safe areas | Не применяется | bottom; default/focus/selected/disabled | Icon, Text, Counter | nav label; current; touch target | registry stable |
| NavigationBar | Текстовая навигация Web; Component | Core top; mobile → TabBar | Web shell → TabBar | Не применяется | top | Text | nav label; current; keyboard | registry stable |

## Product and platform pattern registry

| Canonical | Purpose / level | Web | Mobile Web | Bot / platform difference | Variants / states | Dependencies | Accessibility | Audit readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EmptyState | Пустая область с объяснением; Template (pattern) | 15 empty-state occurrences in Admin | mine-empty/catalog/deals | Localized empty message + optional action | firstUse/noResults/noAccess; visible/hidden; compact/full composition | Text, Image/Icon, Button | Heading/message/action; no decorative alt noise; native hidden исключает state из layout | v1 stable target |
| Pagination | Переход между страницами/records; Template (pattern) | _pagination and table pages | Load more or compact prev/next | BotPager edits current message | pages/prev-next/load-more; compact/full; current/disabled/loading/end | Link/Button, Icon | nav label; aria-current; disabled controls не кликаются | experimental; canonical rf-* ещё нет |
| ListingCard | Карточка объявления; Template (pattern) | Experimental storefront reference | Production Catalog adapter использует storefront anatomy; данные, таймеры и photo lifecycle остаются feature logic | ListingMessage | default/responded/new/newResponded; storefront; default/loading/photoError/longContent | Card, AspectRatio, Image, Badge, Skeleton, Text, Icon | Вся карточка — одно primary action без вложенной кнопки; accessible name; текстовые статусы; стабильная loading-геометрия | registry experimental |
| AppShell | Общий каркас страницы; Product pattern | Admin shell | Mini App fullscreen root | Telegram host является shell | desktop/mobile; active/collapsed/hidden | NavigationBar, Surface, Container | Skip path; logical landmarks; usable zoom | local product candidate |
| PageHeader | Заголовок, описание, primary actions; Pattern | Management/detail pages | Fullscreen flow heads | Message heading + actions below | standard/compact; loading/read-only | Text, Button, Breadcrumb/Back action | Один ясный h1; actions after title | v1 pattern |
| FilterBar | Поиск, filters, count и view switch; Pattern | Management route status: Link с href/query и aria-current | Catalog type/location feature filters | Scope choice keyboard | compact/wrap/sticky; empty/filtered/loading | Link, TextField — Search, Dropdown(selection), Chip; SegmentedControl только для in-place mode/filter | Landmark/label; current route announced; predictable tab order | registry beta после Admin pattern review |
| ErrorState | Восстановимое состояние ошибки; Pattern | Section/page error | Localized retry state | Localized error + BotAction | inline/page/recoverable/blocking; hidden/visible/retrying | Stack, Text, Icon, Button | Announce error; retry; focus only when blocking; native hidden исключает state из layout | registry beta |
| DataTable | Плотные управленческие данные; Pattern | 16 current tables | На narrow screen становится list/card | Не применяется | standard/compact; loading/empty/error; row actions | Table semantics, Badge, Thumbnail, Dropdown(actions), Pagination | th/scope, caption when needed; responsive labels preserve reading order | v1 pattern |
| CardList | Повторяемая выдача карточек; Pattern | Responsive card collection | Catalog/list feed | BotPager — adapter, не CardList | grid/list; loading/empty/error | Card, Stack, EmptyState, Skeleton | Semantic list; stable reading order | registry experimental |
| StatCard | Один KPI с label/icon/value; Pattern | listings/users/responses/payments/profile | Compact metric row only when useful | Summary text | neutral/positive/warning/negative; loading | Card, Text, Icon | Полный текстовый label; trend не только цветом | v1 pattern |
| DealCard | Отклик/сделка и доступные действия; Pattern | bookings and profile activity | deal-card seller/buyer | DealNotification | buyer/seller; pending/completed/not-completed/cancelled; loading | Card, Badge, Avatar, Dropdown(actions) | Role and outcome explicit; dangerous action confirms | v1 pattern |
| FormWizard | Последовательный сложный ввод; Product pattern | Позже для сложных Admin forms | Listing create/edit, 7 steps | Bot create/edit conversation | create/edit; current/back/validating/error/submitting/complete | TextField controls, Progress, StickyActionBar | Announce step/title/errors; focus first invalid; Back preserves data | local product candidate |
| PhotoPicker | Выбор и preview изображения; Product pattern | Broadcast/listing admin only if needed | Profile/listing file input and drop area | User sends Telegram photo | avatar/listing; empty/preview/uploading/error/moderation-rejected | TextField, Image, Button, Spinner | Label, accepted formats, progress/error text; keyboard activation | feature-local candidate; не registry entry |
| LocationPicker | Canonical locality selection; Product pattern | Dashboard filters/reviews | Current dropdown, text suggestions, geolocation | request_location + exact suggestions | filter/profile/listing; idle/searching/results/no-results/permission/error | TextField, Dropdown(selection), Combobox when free query is required, Button, Alert | Permission rationale; selected canonical label; keyboard results | feature-local candidate; не registry entry |
| ActionSheet | Мобильный список контекстных действий; Pattern | Обычно Dropdown(actions)/Dialog | Native sheet presentation | Inline action rows | actions/destructive/mixed; closed/open | BottomSheet, ListItem, Button | Modal focus; destructive semantics; dismiss path | registry experimental |
| ConfirmationDialog | Подтверждение последствия; Pattern | Dialog composition | Native confirmation or host showConfirm | BotConfirmationPrompt | standard/destructive; closed/open/pending/error | Dialog, Button, Text | Consequence before action; initial/final focus | registry experimental |
| StickyActionBar | Контекстные primary/secondary actions; Pattern | Optional on long forms | Listing detail/create footer + safe area | Inline keyboard rows | one/two actions; hidden/loading/disabled/error | Button, Surface | Не закрывает content; keyboard reachability | v1 pattern |
| AuthGate | Нет доверенного Telegram session; Feature pattern | Admin login remains separate feature | Existing auth-gate with write-access request | Bot already authenticated by Telegram | loading/permission/denied/retry/ready | Alert, Button, Illustration | Clear reason and retry; no spinner-only dead end | v1 pattern |
| MarketingHeader | Brand + anchor navigation + CTA; Marketing pattern | Three Landing headers converge here | Collapsed narrow header | Не применяется | transparent/solid; desktop/mobile | Logo, Link, Button, Surface | nav landmark, skip path, usable zoom | v1 terminology; local implementation |
| HeroSection | Main promise, art and CTA; Marketing pattern | Three current hero variants | Stacks copy/art/CTA | Не применяется | consumer/florist/editorial; light/dark | Text, Image/Illustration, Button | One h1; art alt by meaning; CTA purpose clear | v1 terminology; local implementation |
| FeatureGrid | Повторяемые benefits; Marketing pattern | card/fact-card grids | One-column cards | Не применяется | icon/card/editorial; loading not needed | Card, Text, Icon/Illustration | Semantic list/headings | v1 terminology; local implementation |
| ProcessSteps | Как работает продукт; Marketing pattern | step and step-row families | Vertical ordered list | Bot onboarding messages | numbered/card; current only when interactive | Text, Icon/Illustration | ol semantics; numbers not only decoration | v1 terminology; local implementation |
| CTASection | Финальное целевое действие; Marketing pattern | final/hero CTA blocks | Full-width CTA | Deep link action in Bot not needed | primary/secondary; default/focus | Button/Link, Text, Surface | Destination and external context clear | v1 terminology; local implementation |
| MarketingFooter | Brand, legal/navigation links; Marketing pattern | Three current footers | Stacked columns | Не применяется | simple/multi-column | Logo, Link | footer landmark; descriptive links | v1 terminology; local implementation |
| BotNavigationKeyboard | Persistent top-level navigation; Platform adapter | Web maps to NavigationBar | Mini App maps to tabbar | main_keyboard/profile_keyboard | main/profile/location; current/updated/removed | Localized BotAction labels | Order stable; labels short; no color dependency | Bot adapter |
| BotChoicePrompt | Prompt + finite options/back; Platform adapter | TextField + Radio/Select | TextField + Radio/Select | options_keyboard, language/locality choices | single choice; active/stale/error/back | Message text, BotKeyboard, localization | Prompt contains context; callback stale state answered | Bot adapter |
| BotListingMessage | Photo/caption/actions; Platform pattern | ListingCard/detail | ListingCard/detail | browse/manage/archive/group post | active/archived/expired/manage; loading/stale | Localized text, Telegram media, BotAction | Caption order readable without photo; actions reflect current state | Bot adapter |
| BotPager | Изменяет текущую карточку; Platform adapter | Pagination | Load more/prev-next | browse/archive prev-next | previous/next/scope; start/end/stale | BotListingMessage, BotAction | Clear previous/next labels; stale callback explains recovery | Bot adapter |
| BotConfirmationPrompt | Подтверждение действия; Platform adapter | ConfirmationDialog | Dialog/showConfirm | publish/edit, destructive outcome prompts | confirm/cancel/edit; pending/stale/success/error | Localized message, BotKeyboard | Consequence stated before destructive action | Bot adapter |
| BotDealNotification | Уведомление и действия сделки; Platform pattern | DealCard/Alert | DealCard/Toast | booking response keyboard | buyer/seller; pending/outcome/cancelled/unavailable | Message, BotAction, localization | Role, listing and outcome explicit; no ambiguous emoji-only labels | Bot adapter |
| BotInvoice | Telegram Stars payment; Platform adapter | Separate checkout if ever built | Telegram invoice host UI | send_invoice/pre-checkout/success | bump/extend; pending/approved/rejected/success/support | Telegram Payments, localized receipt | Price/service explicit; failure and support paths preserved | Bot adapter |

## Отложено в Core UI v2

V2 не означает «никогда». Эти компоненты остаются локальными или legacy до второго
повторного сценария и отдельного accessibility design.

| Candidate | Purpose / level | Web / Mobile Web / Bot difference | Variants, sizes, states | Dependencies / accessibility | Почему v2 |
| --- | --- | --- | --- | --- | --- |
| Combobox / Autocomplete | Searchable value picker; Component | Admin/Mini App custom; Bot shows finite results | sm/md/lg; idle/querying/results/no-results/selected/error | TextField, Popover, Listbox; full keyboard and active-descendant contract | Сейчас нужен в основном location flow; сначала стабилизировать LocationPicker |
| DateRangePicker | Диапазон дат; Component | Legacy Admin dashboard only; mobile presentation differs; Bot text/date prompt | range/presets; open/selected/error/disabled | Dialog/Popover, calendar grid keyboard, locale/timezone | Single-date закрывает вариант Date в Text Field; диапазон остаётся отдельной сложной задачей |
| Switch | Немедленный boolean setting; Component | Web/Mobile Web; Bot yes/no action | lg/md/sm; Value on/off; State default/hover/pressed/focused/disabled/skeleton | Native checkbox; switch semantics; внешнее доступное имя | Текущие checkbox действия не требуют switch |
| Generic Popover | Non-modal floating content; Component | Desktop anchored; mobile often BottomSheet; Bot none | info/open/closing | Positioning, focus, Escape, outside click | Dropdown закрывает selection/actions; отдельный generic popover нужен только для произвольного содержимого |
| Drawer | Side modal/navigation; Component | Desktop side; mobile fullscreen/sheet; Bot none | left/right; open/closing | Dialog focus/inert contract | Текущие fullscreen flows уже покрыты AppShell/Dialog |
| Accordion | Disclosure sections; Component | Landing/help likely; mobile same; Bot messages | single/multiple; open/closed/disabled | Button expanded/controls, heading semantics | Landing сейчас статичен |
| Generic FileUploader | Любой file type; Component | Web/Mobile; Bot attachment host | single/multiple; idle/uploading/error/success | TextField, progress, accepted types | Реальная нужда пока только PhotoPicker |
| Carousel | Horizontal media/content; Pattern | Landing/Mobile possible; BotPager is not Carousel | single/multi; start/end/loading | Buttons, live announcements, reduced motion | В текущем UI нет Web carousel |
| Advanced DataGrid | Sort/filter/select/resize/virtualize; Pattern | Admin desktop; mobile list; Bot none | density, selection, sort, loading/error | Table, Checkbox, keyboard grid | Текущие server tables не требуют grid complexity |
| Chart | Data visualization system; Pattern | Admin canvas only; mobile may simplify; Bot text summary | line/donut/bar; loading/empty/error | Color scale, legend, data table alternative | Один dashboard; сначала сохранить как feature |
| MultiSelect / TagInput | Несколько выбранных значений; Component | Web/Mobile; Bot repeated choices | sm/md/lg; query/selected/error | Combobox, Chip, TextField | Нет текущего повторного случая |
| RichTextEditor | Форматированный content; Component | Admin broadcast only if policy changes; mobile/Bot host text | toolbar/preview/error | TextField, sanitization, keyboard | Сейчас broadcast — plain author content |
| Rating | Оценка; Component | Web/Mobile/Bot adapter | 1–5; hover/selected/disabled | Radio semantics and labels | В продукте нет рейтингов |
| CommandPalette | Быстрые команды; Pattern | Admin power-user only; mobile/Bot none | open/query/results/no-results | Dialog, Combobox, Dropdown(actions) | Нет задачи и аудитории |

## Current → canonical migration map

Миграция выполняется небольшими вертикальными срезами. «Заменить» ниже означает:
сначала добавить canonical implementation и тесты, затем перенести конкретный экран.
Этот порядок глобален для всех интерфейсов: продуктовый use case может обнаружить
пробел, но source of truth меняется в Design System, показывается и утверждается в
Catalog, проходит генерацию и проверки, и только затем подключается продуктом через
публичный Core API. Локальная product-реализация не становится мастер-источником.

### Admin

| Current component / classes | Canonical | Action |
| --- | --- | --- |
| btn-primary, btn, btn-ghost, btn-ok, btn-danger | Button | Свести к четырём variants; сохранить native button/link semantics |
| icon-label | Button composition | Icon остаётся decorative, текст — accessible name |
| profile-button, row-menu-btn, calendar arrows | IconButton | Один size/aria-label/focus contract |
| field, access-field, password-field, secret-field | TextField | Общие label/hint/error spacing и ARIA |
| Обычные text/password inputs | TextField | Перенести states и autocomplete; PasswordField собирать отдельно |
| broadcast textarea | TextField — Multiline | Только Placeholder и доступное имя; native maxlength/required и восстановление черновика сохранены |
| Три native select и dashboard select-menu | Dropdown(selection) | Мигрировано: hidden form/model bridge, Core listbox и product-owned URL/submit |
| Broadcast/geo checkboxes | Checkbox | Убрать зависимость от локальных label styles |
| access-role-option radio cards | Radio | Сохранить fieldset/legend и весь row target |
| management-search и listings/users/responses/payments-search | TextField — Search | Один form/search/clear/submit API |
| panel, access-card, password-card, secret-card | Card или Section | Card только для самостоятельного блока; layout section не переименовывать механически |
| user-profile-card, dashboard-panel | Card | Собрать header/body/actions primitives |
| listings/users/responses/payments stat и user-profile-kpi | StatCard | Один status/icon/value layout |
| badge active/blocked/archived, pill | Badge | Назвать variants по смыслу: success/error/neutral/warning |
| users-filter-chip | Chip(filter) | Selected/removable action с accessible name |
| listings/users/responses/payments status links | Link + FilterBar | Сохранить `href`/query и `aria-current`; это server-route navigation, не SegmentedControl |
| user-profile-tabs | Tabs | Мигрировано на Core Tabs с roving focus и связанными tabpanel |
| dashboard activity selector | SegmentedControl | Мигрировано на native radio anatomy Core; это локальный выбор метрики, не Tabs |
| row-menu/profile-menu | Dropdown(actions) | Мигрировано: общий trigger/open/Escape/focus-return/destructive item и viewport positioning |
| access-confirm-dialog и window.confirm calls | Dialog / ConfirmationDialog | Native dialog first; унифицировать destructive copy |
| _pagination и panel-bar pagination | Pagination | Убрать inline layout styles |
| listings/users/responses/payments tables, user-profile-table | DataTable | Один responsive row contract и EmptyState |
| thumb, user-profile-avatar | Thumbnail / Avatar | Разделить object preview и identity |
| empty-state, user-profile-empty, dashboard-empty | EmptyState | Свести к firstUse/noResults/noAccess compositions |
| flash, viewer-banner, secret-warning | Alert | Общие status roles и dismiss policy |
| header/sidebar/mobile-nav | AppShell / NavigationBar | Одна карта разделов, разные responsive presentations |
| dashboard period/calendar | DateRangePicker | Оставить legacy до v2; не копировать на новые экраны |
| dashboard canvas charts | Chart feature | Оставить feature-local до v2 и давать текстовую альтернативу |

### Mini App

| Current component / classes | Canonical | Action |
| --- | --- | --- |
| btn primary/secondary/cancel/big и auth/create actions | Button | Свести variants/sizes; сохранить Telegram touch и haptic adapter |
| Четыре close button implementations | IconButton | Один размер, focus и aria-label contract |
| wiz-input, profile-settings-input | TextField | Один control API, platform inputmode и ошибки |
| profile-language-option/radio | Radio | Общий selected/focus/disabled contract |
| location-btn/dropdown и wiz suggestions/geo | LocationPicker | Сохранить canonical locality identity; beta до Combobox v2 |
| filterbar/typegroup/typecard | FilterBar + product type choices | FilterBar задаёт именованную область и layout; type card остаётся product presentation выбора |
| card, mine-card, deal-card, wiz-preview-card | Card + ListingCard/DealCard | `mine-card` и `deal-card` переведены на компактные Card внутри семантического CardList; не делать четыре базовых Card |
| tag, deal-status | Badge | `deal-status` использует системные success/error/info/warning Badge; один status vocabulary |
| avatar/profile photo | Avatar + PhotoPicker | Разделить display и upload behavior |
| catalog/mine/deal photos | Thumbnail/Image | Core presentation подключена; авторизованный loading/release остаётся feature contract |
| mine-segments и deal-segments | SegmentedControl | Оба используют native radio anatomy Core; не называть Tabs: они меняют фильтр/роль |
| tabbar/tab | NavigationBar | Current item и hidden deals item остаются adapter states |
| mine-loading и четыре sk cards | Skeleton | Mine и Deals используют по три системные Skeleton-карточки с `aria-busy`; остальные поверхности сохраняют единую geometry и reduced-motion |
| mine-empty и пустые выдачи | EmptyState / ErrorState | Mine и Deals используют системные состояния; recoverable error получает retry-action, localized orchestration остаётся в feature |
| toast | Toast controller | Core presentation подключена; очередь, duration и persistent error остаются controller policy |
| promotion-sheet и sheet | BottomSheet | Общий focus trap, inert background, focus return, safe area |
| my-listings/profile-settings/create flows | Dialog fullscreen / AppShell flow | Один modal lifecycle; не отдельный base component на flow |
| listing-detail flow | SafeArea + Container + Stack + Surface + Core content/actions | Мигрирован композицией; feature владеет только modal lifecycle и данными |
| confirmDialog с Telegram showConfirm/fallback | ConfirmationDialog adapter | Native host first и канонический доступный Web fallback подключены |
| wizard/wiz-* | FormWizard | 7 шагов, validation/focus/progress/back preservation |
| sheet-footer/wiz-nav | StickyActionBar | Safe-area и disabled/loading states; listing-detail footer уже мигрирован композицией |
| auth-gate | AuthGate feature pattern | Оставить feature copy/localization; переиспользовать Button/Alert |

### Landing

| Current component / classes | Canonical | Action |
| --- | --- | --- |
| btn, btn-primary, btn-solid, btn-outline, pill-btn | Button presentation on Link | Свести CTA visual variants, но сохранить href |
| card и fact-card | Card / FeatureGrid | Базовая поверхность общая, editorial composition локальная |
| badge и pill-tag | Badge | Разделить status/marketing label; не делать generic Pill |
| Три nav/header implementations | MarketingHeader | Общие logo/link/CTA/focus; layout может отличаться |
| Три hero | HeroSection | Оставить consumer/florist/editorial variants как patterns |
| step и step-row | ProcessSteps | Семантический ordered list и responsive presentations |
| stat-band | StatCard group | Не добавлять новый base component |
| final и hero-cta blocks | CTASection | Общий headline/copy/CTA contract |
| Три footer | MarketingFooter | Общие brand/legal/link foundations |
| petals, blobs, botanic, marquee, hero-deco | Feature-local decoration | Не переносить в Core UI |

### Telegram Bot

| Current component / builder | Canonical | Action |
| --- | --- | --- |
| InlineKeyboardButton callback | BotAction | Общие verb labels, destructive confirmation и stale handling |
| InlineKeyboardButton url/web_app | BotAction link/webapp | Не стилизовать как Web Button; host owns presentation |
| main_keyboard/profile_keyboard | BotNavigationKeyboard | Зафиксировать порядок и short localized labels |
| location/data/city_step keyboards | BotChoicePrompt + permission action | Сохранять request_location platform behavior |
| options_keyboard/back_keyboard/language_menu | BotChoicePrompt | Один back/done vocabulary на RU/EN/KY/UZ |
| create prompts, step_text, edit flow | FormWizard Bot adapter | Те же step names/validation outcomes, но conversation UI |
| preview photo + publish/edit | BotConfirmationPrompt | Подтверждение перед publication |
| listing_body + browse_keyboard | BotListingMessage + BotPager | Один caption order, scope and prev/next states |
| _send_manage_card и archive cards | BotListingMessage manage/archive | Общие action order и destructive confirmation |
| booking response keyboard | BotDealNotification | Role/outcome/contact actions из canonical deal vocabulary |
| callback query answer/show_alert | Toast / Alert Bot adapter | Nonmodal result против blocking alert выбирается по важности |
| send_invoice/precheckout/successful_payment | BotInvoice | Telegram host flow остаётся platform-specific |
| Group listing posts | Public ListingMessage variant | Русский author/public policy сохраняется отдельно от user locale |

## Что намеренно не создаётся

- Отдельные MobileButton, AdminButton, LandingButton и BotButton.
- Web CSS для Telegram keyboard или попытка управлять его цветом и размером.
- SwiftUI/Compose components и native token outputs без native-кода.
- Generic Panel, Tile, Pill, BoxCard и другие синонимы Surface/Card/Badge.
- Отдельный компонент для каждой ListingCard, DealCard, StatCard presentation:
  это patterns поверх Card.
- Отдельные компоненты для каждого fullscreen Mini App flow.
- Dark variants компонентов: тема меняет semantic tokens, а не component name.
- Компоненты для petals, blobs, 3D category art, marquee и другой брендовой
  иллюстрации.
- Generic Carousel: BotPager и Load More не являются carousel.
- Tooltip для обязательной информации.
- Rich Text, Rating, CommandPalette и Advanced DataGrid без продуктовой задачи.
- Строки интерфейса внутри Design System. Copy остаётся в локализации feature; для
  Bot и Mini App — одновременно RU, EN, KY и UZ.

## Граница Core UI v1

Reference-слой Core UI v1 содержит 12 beta primitives. Стабильное component-ядро
выбирает восемь families: Button, TextField, Card, Badge, Alert,
SegmentedControl, Skeleton и EmptyState. Reference-код покрывает все восемь stable
families; beta/experimental компоненты показаны отдельно и не обещают production API.
Полный registry
выше шире стабильного ядра: beta/experimental записи фиксируют найденный спрос, но
не обещают готовый общий API.

Первая миграционная волна использовала эти восемь семейств на экранах из
[`PILOT_MIGRATION.md`](PILOT_MIGRATION.md); TextField — Search собирается как
TextField composition, а IconButton — как presentation общего Button contract.
Dropdown stable по независимым Admin и Mini App сценариям; Dialog и BottomSheet
остаются experimental, Toast — registry beta.
LocationPicker и PhotoPicker остаются feature-local candidates и не становятся
registry entries, пока не пройдут keyboard, focus, screen reader, Telegram WebView,
safe-area и reduced-motion проверки и не подтвердят повторяемый общий API.

Legacy считается мигрированным только после переноса конкретной поверхности,
визуальной проверки и полного release gate. Само наличие canonical имени в этом
инвентаре не означает, что текущий класс уже можно удалить.

### Surface: прекращение нового использования

Surface переведён в deprecated и скрыт из основного списка Primitives. Старая
страница остаётся доступной для миграции. Card — замена только для самостоятельного
содержимого; обычный фон использует Context background/text, layout — Container,
Stack и Inline. Реестр больше не требует Surface как зависимость компонентов.
CSS и текущие применения Mini App сохранены до согласования и переноса. Исторические
строки inventory с Surface описывают прежнюю композицию, а актуальные зависимости
задаются component-registry.json.

### Container: Foundation Grid

Container исключён из реестра компонентов и списка Primitives. Правила ширины,
центрирования, внешних полей и адаптивности находятся в Foundation → Grid. Старый
маршрут каталога перенаправляет туда. CSS `.rf-container` сохранён как совместимый
слой для Mini App и Landing без изменения размеров и поведения. В актуальных
рекомендациях по замене Surface ширина страницы также относится к Foundation Grid.

## Проверка дублирования UI Primitives перед удалением

Владелец уточнил цель: удалить дублирующие сущности и реализации, а не переносить
их в Foundation/Components под тем же или новым названием. Автоматическая
переклассификация оставшихся primitives отменена; ранее согласованные изменения
Container и deprecation Surface сохранены. Наличие токена ещё не означает наличие
заменяющей реализации: Foundation задаёт значения, CSS применяет их.

| Сущность | Результат проверки | Условие удаления реализации |
| --- | --- | --- |
| Surface | Частично дублирует фон, границы, радиусы и тени Card, NavigationBar, BottomSheet | Заменять по конкретному месту: значения различаются. Удаление класса с BottomSheet может изменить canvas, radius и elevation; сначала сравнить обе темы. |
| Container | Минимальный layout helper; общий Grid уже описывает ширину и поля | Проверить потребителей: прежний padding 16 на всех ширинах не равен адаптивным margins Grid. |
| Stack / Inline | Применяют flex, направление, gap, wrap и min-width; spacing-токены не выполняют эти операции | Снимать там, где родительский компонент уже полностью задаёт тот же layout; общего заменяющего компонента нет. |
| Text | Применяет typography.style.*, Context color, перенос и сброс margin | Не удалять общий CSS только из-за наличия Typography: без него семантические роли и переносы теряются. |
| AspectRatio | Задаёт ratio, резервирование области, crop, фон и радиус | Image управляет loading/loaded/error, но rf-image-frame сам не задаёт aspect-ratio. Полной замены в Image пока нет. |
| SafeArea | Учитывает platform insets на всех сторонах | NavigationBar bottom и BottomSheet footer покрывают нижний inset своих областей, но не полноэкранные Mini App flows. |
| VisuallyHidden | Единственная общая реализация rf-sr-only для доступного скрытого текста | Foundation и готовые компоненты не заменяют этот utility; удаление может показать служебные подписи или повредить доступность. |

Источники проверки: `web/primitives.css`, `web/components/content.css`,
`web/components/navigation.css`, `web/components/overlays.css` в canonical Design
System и полноэкранные flow в `services/miniapp/static/index.html`. Массовое удаление
CSS как доказанных дублей не обосновано. Следующий пакет должен удалять только
подтверждённые избыточные применения, сохраняя ещё нужное поведение.

### Удаление подтверждённых дублей Surface в нижних панелях

В `services/miniapp/static/index.html` удалены `rf-surface--elevated` у
`sheet`, `promotionSheet`, `profilePhotoSheet` и `rf-surface--rounded` у `sheet`.
Фон, тень и все четыре радиуса уже полностью задаёт canonical BottomSheet, который
подключается позже Surface в Core CSS. Нового CSS и вариантов не добавлено.
Базовый `rf-surface` сохранён: min-width и цвет текста требуют отдельной проверки,
как и остальные применения Surface в шапке, формах и подсказках.

Browser regression сравнивает все computed styles и геометрию с прежними классами,
используя точные stylesheet-ссылки и порядок из Mini App HTML, включая токены.
Покрыты три панели, Light/Dark, 390/1440 px и open/closed (24 сочетания); совпадение
полное. Тест дополнительно проверяет загрузку фона и ожидаемый display.

### Оставшиеся потребители Surface: повторная проверка

Базовый `.rf-surface` также удалён у `sheet`, `promotionSheet`, `profilePhotoSheet`.
Браузерное сравнение всей итоговой таблицы CSS и геометрии с прежним полным набором
Surface-классов прошло в 24 сочетаниях (Light/Dark, 390/1440, open/closed, три панели).
Дополнительно проверена настоящая HTML-структура Mini App с исходным порядком
stylesheet-ссылок и без выполнения product JS: расхождений панелей не обнаружено.
Точное совпадение в браузере уточняет прежнее предположение о необходимости базового
Surface на этих панелях; оно не переносится автоматически на другие потребители.

Осталось семь вхождений в Mini App, шесть типов потребителей:

| Место | Что ещё обеспечивает Surface | Следующий шаг |
| --- | --- | --- |
| Шапка | Непрозрачный фон и min-width:0 | Для фона оболочки использовать Context background.base.default, сохранить ограничение сжатия; не заменять шапку на Card. |
| Нижняя панель объявления | Непрозрачный фон поверх прокручиваемого содержимого | Context background.base.default; проверить наложение, safe area и обе темы. |
| Плитка типа объявления | Рамка, min-width и цвет; фон уже задаёт typecard | Согласовать canonical оформление выбора типа. Card не является точной заменой: отличается padding, тень и семантика. |
| Текущий город | Нейтральный фон, радиус, внутренний отступ | Решить, нужен ли отдельный декоративный блок: обычный текст/существующий ListItem изменят вид. Alert ошибочно придаст статус сообщения. |
| Подсказки города | Фон, внешняя рамка и радиус списка | rf-list управляет layout, а ListItem — строками; точного варианта оболочки списка сейчас нет. Требуется решение для canonical списка подсказок, без feature override. |
| Навигация мастера (два места) | Непрозрачный фон и тень | Проверить общий контракт панели действий. StickyActionBar упоминался как кандидат в inventory, но готового API в Registry нет. BottomSheet footer не следует применять вне BottomSheet ради оформления. |

На этом шаге новое оформление этих шести типов не вводилось. Шапка и нижняя панель
в браузере теряют фон при простом снятии Surface (Light — белый, Dark — base),
поэтому считать их оставшиеся классы дублями нельзя.

### Шапка и нижняя панель: Context вместо Surface

У `.miniapp-header` и `.listing-detail-footer` удалён `rf-surface`. Product shell
использует существующие публичные `color.context.background.base.default` и
`color.context.text.primary.default`, а ограничение сжатия — `spacing.0`.
Это оформление оболочки страницы, не override готового Core-компонента. Новые
токены, компоненты и визуальные варианты не вводились.

Browser regression сравнивает реальную HTML-разметку без product JS с прежним
Surface и прежними CSS-правилами (новые declarations удаляются из baseline).
Все computed styles и размеры совпали при 320/390/1440 px, Light/Dark; фон остаётся
непрозрачным. После замены в Mini App осталось пять вхождений Surface: плитка типа,
текущий город, список подсказок и две панели навигации мастера.

## Tab Bar — компонент навигации

NavigationBar переименован в TabBar (на странице — Tab Bar) и перенесён из Templates
в Components → Navigation. Stable contract, варианты top/bottom/sidebar и CSS
`.rf-navigation-bar*` / `.rf-bottom-navigation*` сохранены; продуктовые сервисы не
переключались на новый CSS API. Старое имя NavigationBar — поисковый синоним;
`#patterns/navigation-bar` и `#components/navigation-bar` ведут в `#components/tab-bar`.

Страница следует структуре Button: hero, Anatomy / Tab / Tab Bar, интерактивный Playground
с вариантами, current item, disabled/hidden, независимой темой превью и keyboard
focus, затем три примера с вкладками «Описание» / «Web + Mini App» и копированием
реального исходника из `examples/tab-bar/`. React adapter не заявлен.
Tab Bar означает навигацию главных разделов с nav и aria-current=page; Tabs остаётся
переключением локальных панелей с tablist/tab/tabpanel. В демонстрации переходы
перехватываются только для смены текущего пункта; в продукте URL/controller и
локализованные подписи задаёт потребитель. Недоступная ссылка в preview лишена href
и исключена из Tab-порядка. Hidden пункт отсутствует в layout.

Вкладка Tab показывает отдельный навигационный пункт (не role=tab): variant,
state, подпись, Icon, независимая Light/Dark тема и копирование текущей разметки.
Вкладка Tab Bar показывает композицию пунктов и полные source-backed examples.


## Navigation Bar и Tab Bar: раздельные компоненты

NavigationBar — верхняя текстовая навигация Web (top), TabBar — нижняя панель
приложения с обязательным Icon и опциональными подписью/Counter (только bottom).
Оба находятся в Components. Старый patterns/navigation-bar ведёт в
components/navigation-bar; components/tab-bar остаётся самостоятельной страницей.
CSS-имена rf-navigation-bar сохранены как совместимый API: top принадлежит
NavigationBar, bottom — TabBar. Это не три варианта одного компонента.

Каталог и Admin используют NavigationBar на ширине >640 px и TabBar на ширине
≤640 px (breakpoint.sm). Маршруты, порядок и текущий раздел сохраняются. В каталоге
переключается представление одной области nav, поэтому ссылки и фокус не дублируются.
На телефоне панель закреплена снизу, учитывает safe area; контент имеет нижний запас.
Admin сохраняет свой порог и маршруты; его mobile-nav теперь использует Core bottom
вместо локального оформления ссылок. В Mini App нижний TabBar остаётся основным.

NavigationBar: Sidebar удалён как неиспользуемый вариант. Страница использует общий
шаблон Anatomy / Tab / Navigation Bar, отдельные playground пункта и панели с темами,
настройками и вкладками «Описание» / «Web» у source-backed примера.

### Общий Listing Card в Core

Catalog и Mini App используют один декларативный CSS API: `rf-listing-card` и слоты
`__media`, `__statuses`, `__place`, `__content`, `__details`, `__description`,
`__line`, `__price`, `__content-skeleton` и `__skeleton-line`. Каноническая
реализация — `design/design-system/web/components/patterns.css`; потребители
подключают публичный Core. Локальные классы служат только hooks для сценария.
Собственные presentation-правила `.catalog-card*` и `.catalog-skeleton*` удалены
из Mini App; каталог оставляет только ограничение ширины демонстрации.

Композиция сохраняет Card, Image, Badge, Skeleton, Text и Icon. Данные, перевод,
срок бейджа «Новое», обработка фото и открытие объявления остаются в приложении.
Одинаковые правила контролируют пропорции фото, перекрытие панели 16 px, отступ
12 px, скругления, цвета, обрезку длинного текста и загрузочные заглушки.
Listing Card имеет статус Beta; React/native adapter пока не реализован.

Listing Card отображается с пробелом в названии, находится в Templates и имеет статус Beta. Внутренний ключ ListingCard и маршрут patterns/listing-card сохраняются.

Link удалён из component registry: это правило Foundation → Typography для
нативного `a[href]`. Публичный `rf-link` сохранён как typography utility, поэтому
ссылки Bloom и skip-link не требуют замены разметки. Размер наследуется от текста;
подчёркивание, hover и focus-visible принадлежат Foundation.

### Удаление отдельного Card (2026-09-06)

Card удалён из registry и каталога. Listing Card и Feature Card самостоятельно задают поверхность и взаимодействие через Foundation tokens; им больше не нужны классы rf-card. CardList отвечает только за раскладку списка. Старый адрес components/card открывает Components.

Классы rf-card и component.card tokens пока сохранены как совместимость для старых экранов Admin, Landing и отдельных сценариев Mini App. Это не новый публичный компонент и не рекомендация для новых композиций. Эти экраны требуют отдельной миграции на соответствующие предметные patterns; механическое удаление классов изменит их оформление. Исторические таблицы ниже/выше описывают прежний контракт.

### Характеристики через List Item (2026-09-06)

AttributeCard удалён из registry, CSS и tokens. В Mini App характеристики объявления и участника сделки — вертикальный список статических List Item: rich, data-surface=filled, data-divider=none, data-description=wrap. Это тот же фон и радиус, что в выборе типа объявления. Иконка слева, локализованная подпись и значение в content; строки не являются кнопками. Адрес и длинные значения переносятся. Старый маршрут attribute-card открывает List Item.

### Empty State в Templates (2026-09-06)

EmptyState перенесён из Components в Templates со статусом Stable. Использования Mini App и Admin и публичные CSS-классы не изменены. Старый URL components/empty-state открывает patterns/empty-state. Страница следует общему формату: hero, Anatomy / Empty State, редактирование Title, Description, Action и состояния Visible/Hidden, локальная тема. Пустые description/action скрывают соответствующие части.

Tooltip удалён из registry и каталога: продуктовых потребителей и canonical implementation не было. Важные пояснения показываются обычным текстом рядом с элементом.

## Calendar (Beta)

Самостоятельная сетка выбора даты/диапазона, 1–2 месяца; IconButton навигация,
ограничения min/max и отдельных дней, клавиатура, ru/en/ky/uz. Canonical Web:
`web/components/calendar.css`, `web/runtime/core-ui.ts`. Страница каталога:
`#components/calendar`. В админке пока остаётся прежний dashboard calendar;
миграция после визуального утверждения владельца.


### Editable Dropdown для геоподсказок (утверждён 4 октября 2026)

Gap: searchable Dropdown открывает собственный search input внутри panel. Для
формы адреса это создаёт второй ввод. Кандидат `data-rf-dropdown-editable` собирает
существующий TextField input (trigger с role=combobox) и Dropdown panel из ListItem.
Panel не содержит search input. Текст остаётся в исходном поле, Enter/стрелки
выбирают, Escape сохраняет текст и закрывает panel, Tab не перехватывается.
Ввод сбрасывает выбранный hidden value; external filtering оставляет поиск API.
Catalog показывает default/disabled/invalid/empty/loading и обе темы. Владелец
утвердил визуальный результат; геополя Mini App используют этот публичный API.

Браузерный тест матрицы закрывает каждую проверенную panel через Escape перед
переходом к соседнему примеру: multiple намеренно остаётся раскрытым после выбора
и иначе может перекрыть trigger следующей ячейки после изменения состава матрицы.
