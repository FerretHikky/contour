# Foundations Design System Contour

Foundations — это общие правила внешнего вида и поведения Contour. Они не зависят
от Flask, конкретного JavaScript-фреймворка, Telegram WebView, iOS или Android.
Любой продукт получает из них одинаковые названия ролей, а платформенный слой уже
переводит эти роли в CSS, TypeScript или нативные значения.

Главная цветовая цепочка системы:

```text
Primitive -> Alias Light/Dark -> Context -> Component -> UI
Static black/white -------------------------------------> technical consumers
```

Новый продуктовый интерфейс использует только Context color tokens. Primitive,
Alias и Static нужны для построения тем и не должны появляться непосредственно
в продукте; color Component tokens остаются внутренним слоем реализации Core.

## Единственный источник правды

Канонические токены хранятся только в `design/design-system/tokens/` и используют
формат [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/):

- `color-primitives.json` — seeds шага `5`, якоря Gray v2 и правила генерации
  непрозрачных ramps `0…10`;
- `foundations.json` — канонические Primitive `dimension` и `opacity`, Foundation
  `spacing`/`radius`/`border.width` parameters и
  ограниченные compatibility aliases старых `space`/border names;
- `primitives.json` — остальные независимые foundations: базовая типографика,
  motion, breakpoints, layout, controls, aspect ratios и слои;
- `static.json` — абсолютные black/white, одинаковые в обеих темах;
- `typography.json` — 20 базовых публичных Styles для Display, Title, Headline и
  Body, напрямую собранных из Primitive `font.*`;
- `typography-mobile.json` — только проверяемые Mobile overrides того же публичного
  Typography path contract;
- `themes/light.json` — числовые Alias colors, Overlay и elevation светлой темы;
- `themes/dark.json` — тот же Alias contract с инверсией числовых ramps;
- `context.json` — единые роли применения background/text/icon/border/overlay;
- `components.json` — решения для Button, TextField, Card, Surface, Navigation и других
  компонентов, выраженные через Context и foundation aliases.

Каждый source-файл содержит точный `$schema`. Значение задаётся через `$value`, тип
через `$type`, а ссылка на другой токен записывается как
`{color.context.text.primary.default}`. Light и Dark обязаны содержать одинаковый набор
Alias-имён. Alias может ссылаться только на Primitive своей рампы, Context —
только на Alias, а цветовой Component — только на Context. Это проверяет
генератор.

Alias token задаёт theme-aware числовую ступень, а Context отвечает на вопрос
«где и в каком состоянии применяется цвет»: например,
`color.context.text.secondary.default` или
`color.context.background.brand.hover`. Поэтому компонент не знает, включена
светлая или тёмная тема, и не содержит условий по цвету.

## Generated-файлы не редактируются

Следующие файлы являются результатом сборки и не служат источниками:

- `design/design-system/generated/web/tokens.css`;
- `design/design-system/generated/web/tokens.ts`;
- `design/design-system/generated/color-tokens.json` — полный список цветовых
  записей с типом, прямым значением либо полным alias path;
- `design/design-system/generated/foundation-tokens.json` — полный список Primitive
  Dimension и Opacity, а также Foundation alias records без потери alias graph;
- `design/design-system/generated/typography-tokens.json` — переносимый graph
  Primitive → public Style с resolved metrics;
- `design/design-system/generated/tokens.resolved.json`;
- compatibility CSS и JSON в `design/brand/colors/`, `design/brand/foundations/` и
  `design/brand/typography/`;
- копии compatibility CSS внутри `services/admin/`, `services/miniapp/` и
  `services/landing/`.

Их нельзя исправлять вручную: следующая сборка перезапишет такую правку. Меняется
только нужный JSON в `tokens/`, после чего запускается:

```bash
python3 design/design-system/scripts/build_tokens.py
```

`build_tokens.py` проверяет DTCG-типы, aliases, циклы, полноту цветовых ramps,
непрозрачность Primitive colors, точную инверсию Light/Dark, exact
Dimension/Opacity path sets, Typography branches и границы всех alias-слоёв. Затем
он детерминированно создаёт Web CSS, TypeScript, полностью resolved JSON, старые
совместимые имена CSS-переменных и точные service-копии для независимого
`git subtree`-деплоя. Проверить актуальность, ничего не меняя, можно так:

```bash
python3 design/design-system/scripts/build_tokens.py --check
```

## Цвет

### Primitive ramps

`coral`, `green`, `red`, `blue`, `yellow` и `orange` содержат по 11 шагов
`0…10`; `gray` дополнительно содержит специальный шаг `11`. Для шести обычных
рамп в `color-primitives.json` вручную задаётся
только seed шага `5`; остальные значения строятся по общей shape/mix-кривой к
белому или чёрному. В направлении «Воздушное цветение» светлые коэффициенты
сохранены (`96/82/64/44/28%` к белому), а тёмные `6…10` ограничены
`10/22/33/45/56%` к чёрному: шкалы визуально легче, но всё ещё дают ступени для
проверяемых контрастных ролей.

Gray использует рецепт v2 с точными якорями `0 = #FFFFFF`, `1 = #F6F6F9`,
`5 = #8F8F8F`, `10 = #34343A`, `11 = #18181B`. Промежуточные значения `0…10`
вычисляются в sRGB по той
же форме кривой, нормализованной внутри каждого anchor-сегмента. Все Primitive
непрозрачны и имеют строго убывающую яркость. Gray холодно-нейтрален: лёгкий
холодный подтон присутствует в светлой части, а конец шкалы остаётся графитовым;
`color.static.black|white` существуют отдельно.

Primitive-группы обозначают только цветовые семейства. Семантическая карта задаётся
в темах отдельно: `brand → coral`, `neutral → gray`,
`success → green`, `error → red`, `warning → orange`, `info → blue`. `yellow`
остаётся доступной цветовой рампой без назначенной UI-роли. Старые многозначные
шаги Petal/Warm и status-палитр остаются compatibility aliases; новый код
использует только канонические шаги `0…10`.

Primitive-имя `coral` описывает само цветовое семейство и не закрепляет за ним
продуктовое назначение. Alias-роль называется
`color.alias.brand.*`, но в обеих темах ссылается на
`color.primitive.coral.*` (в прямом порядке в Light и в обратном в Dark). Прежнего
публичного Primitive path `color.primitive.brand.*` нет; Context и Component
Brand-роли сохраняют свои имена и API.

Для безопасного перехода generated CSS в объявленном окне `1.12.0→2.0.0` сохраняет
compatibility custom properties `--rf-color-primitive-brand-0…10` и
`--primitive-brand-0…10`, каждая из которых ссылается на соответствующий Coral-шаг.
Это не DTCG tokens и не записи Catalog model: новые исходники используют только
`color.primitive.coral.*`, а bridge удаляется в `2.0.0`.
TypeScript/JSON consumers мигрируют на Coral сразу; CSS bridge сохраняет чтение
старых переменных, но не делает внешнее переопределение Brand источником Coral.

Отдельной Primitive-шкалы Canvas нет: Primitive содержит семь семейств и 78
непрозрачных цветов. Единственная тематическая роль корневого холста называется
`color.alias.neutral.canvas`: в Light она ссылается на `gray.0`, в Dark — на
`gray.11`. Именованная роль помещена в Neutral, потому что описывает назначение
нейтральной поверхности, а не дополнительное цветовое семейство. Ни один Alias
alias не может ссылаться на `color.primitive.canvas.*`. Отрицательные индексы вроде
`neutral.-1` не входят в публичный контракт: числовые Alias-шаги сохраняют
непрерывный диапазон `0…10`, а особое назначение выражается именем. Шаг `gray.11`
не входит в числовую Alias-инверсию: Dark `neutral.0` остаётся на `gray.10`, а
только именованный Canvas использует более глубокий `#18181B`. Поэтому
`background.canvas` в Dark снова отличается от `background.base.default`
(`#34343A`) без возвращения отдельного цветового семейства.

### Alias themes

Каждая числовая Alias ramp повторяет индексы `0…10`. Light ссылается на
назначенную ей Primitive-рампу в прямом порядке, Dark — в обратном; набор paths
обеих тем совпадает. Поэтому один
Context alias автоматически получает подходящий resolved цвет без условия в
компоненте. Именованная роль `color.alias.neutral.canvas` дополняет Neutral и
передаёт только назначение корневого холста; отдельного семейства
`color.alias.canvas.*` нет.

`color.alias.overlay.*` — намеренное исключение: transparent, hover, active,
selected, disabled, scrim, backdrop и skeleton overlays имеют прямой RGBA с
`alpha < 1`. Светлая и тёмная тема могут использовать разные каналы и alpha.

### Context

Общий `context.json` содержит только применимые роли и состояния, а не полный
Cartesian product. Публичные группы:

- `color.context.background.*`;
- `color.context.text.*`;
- `color.context.icon.*`;
- `color.context.border.*`;
- `color.context.overlay.*`.

В них закреплены `default`, `hover`, `active`, `disabled`, `selected`, status,
`skeleton.base|highlight` и Brand-роль границы для focus там, где они имеют смысл.
Например,
`color.context.background.canvas` сохраняет публичное имя и ссылается на
`color.alias.neutral.canvas`,
`color.context.background.brand.default` ссылается на `color.alias.brand.7`, hover —
на шаг `8`; основной текст — на `neutral.9`, вторичный — на `neutral.8`, третичный —
на `neutral.7`, disabled — на `neutral.4`. Светлый status background остаётся на
шаге `1`, status text/icon использует шаг `8`, а status border — шаг `7`.
Primary action берёт `brand.7`, Brand text — шаг `8`, а focus-намерение через
`border.brand.default` — `brand.7`:
поднятая Primitive-палитра не ослабляет обязательный контраст публичных Context-ролей
и внутренних Core-сочетаний.
Отдельная Alias/Context роль Accent удалена как точный дубль Brand; legacy
CSS-переменные с этим словом разрешаются в Brand через compatibility-слой.

Продукт использует Context. Внутри Core компонент может уточнить его собственным
Component token, который остаётся alias на Context и не образует второй публичный
color API. Статус никогда не передаётся одним цветом: рядом нужны понятный текст,
иконка или форма.

### Color token lifecycle

Context — публичный цветовой API для потребителей. Primitive, Alias и Static
являются внутренними authoring-слоями и не образуют самостоятельный product API.
Каноническая политика и migration records находятся в
[`token-migrations.json`](token-migrations.json): stable Context path допускает
новое использование и удаляется только в major-версии; deprecated path запрещён
для нового кода, обязан иметь replacement и сохраняет перечисленные compatibility
channels до `removeIn`.

Migration groups отсортированы и расширяются без смены schema. `context-v1-to-v2`
содержит полный контракт из 59 старых paths к 50 canonical roles; рядом объявлены
CSS-only группы для 11 Primitive Brand→Coral paths и двух ранних контрактов из 73
role paths и 58 Primitive paths. Никакой color rename bridge не хранится скрытой
таблицей в Python. Context v1 deprecated с `1.12.0`, доступен через CSS и Catalog
deep-link до `2.0.0` и не существует как дублирующие DTCG records. `build_tokens.py`
проверяет manifest и переносит его `policy`/`migrations` в generated
`color-tokens.json`.

Colors `1.13.1` добавляет migration kind `consolidate`: три равнозначных Context
роли не остаются параллельными records. `background.tertiary.active` заменён на
`background.primary.active`, `border.focus.default` — на
`border.brand.default`, `border.primary.selected` — на `border.brand.selected`.
CSS и Catalog deep links принимают старые ID до `2.0.0` и сразу показывают
канонический replacement.

Colors `1.14.0` переименовывает только цветовой слой `Semantic` в `Alias`.
Все 76 canonical records используют `color.alias.*`, а Context ссылается на Alias.
Прежние внутренние `color.semantic.*` не остаются compatibility API: продуктовый
код и раньше должен был использовать только Context. Нецветовые Semantic tokens
типографики, размеров и остальных foundations сохраняют своё имя и контракт.

Catalog представляет этот контракт четырьмя соседними вкладками: `Color anatomy`
объясняет цепочку и правило выбора слоя, `Primitive` показывает ramps и Static
константы, `Alias` — Light/Dark mapping, `Context` — публичные application roles.
Все три token-вкладки открыты без accordion и таблиц. Primitive показывает каждый
шаг отдельным квадратом. Alias группируется по смысловому семейству: слева идёт
колонка Light, справа — Dark, а каждая строка показывает короткое Alias-имя и
соответствующий Primitive source. Внешний контейнер семейства не создаёт фон, radius
или padding. Context группируется по роли и каноническому состоянию и показывает
один цвет активной темы вместе с его Alias source. Полный token path остаётся в
copy action и `data-token-name`; resolved-значения и source aliases берутся из
catalog model.
Вкладки не создают новый token layer и не меняют канонические DTCG sources.

В `Color anatomy` также находится интерактивный Context playground. Он позволяет
независимо выбрать и включить/выключить роли background, border, text, icon и
overlay на одном образце. Для каждой роли сначала выбирается доступное состояние,
а список токенов автоматически ограничивается этим состоянием внутри соответствующей
группы `color.context.*`; Primitive и Alias в API контрола не попадают. Overlay
по умолчанию выключен. У
playground нет отдельной видимой шапки: локальная круглая IconButton находится в
правом верхнем углу preview, показывает солнце для Light и луну для Dark и меняет
token resolution только внутри preview, не затрагивая тему документа и URL. При
отключении выбранный token сохраняется: background
становится прозрачным, border исчезает, а text/icon/overlay скрываются до повторного
включения.

## Типографика

Основной шрифт Contour — локальный variable font Onest. Публичный контракт продукта
намеренно короткий: интерфейс выбирает готовую визуальную роль через компонент `Text`,
класс `.rf-text--*` или токен `typography.style.*`, а не собирает размер, высоту
строки и вес отдельно.

```text
Text variant / Component token → typography.style.* → UI
```

Визуальный вариант не определяет HTML-тег: `heading` можно применить к корректному
для структуры страницы `h1`–`h6`, а `body` — к `p`, `span` или другому подходящему
элементу. Цвет текста всегда задаётся отдельной Context color role. Прямое
использование `font.*`, `typography.semantic.*`, `typography.component.*` и их CSS
variables в продуктовом коде запрещено. Пути `typography.semantic.*` и
`typography.component.*` отсутствуют в canonical graph.

Catalog повторяет структуру Colors и Metrics: общий hero, затем вкладки `Anatomy`,
`Primitive` и `Styles`. В Anatomy один интерактивный образец позволяет независимо
выбрать Style, семантический HTML-элемент и ширину строки. Styles показывает четыре
самостоятельные таблицы и все 20 базовых публичных ролей: `Display`, `Title`,
`Headline` и `Body`. Button, TextField, Badge, Chip и SegmentedControl ссылаются на
эту же шкалу через свои component tokens и не создают отдельные Styles. Primitive оставлен как технический
справочник только для авторов Design System: четыре последовательных раздела
`Family`, `Weight`, `Size` и `Line-height` одновременно показывают свои плоские
таблицы `Name / Value` в порядке Figma. Полные технические paths остаются в
machine-readable attributes и deep links, но не утяжеляют таблицы. Внутренний
`Letter Spacing` не дублируется в повседневном интерфейсе.

Отдельных `typography.style.button.*`, `typography.style.input.*` и
`typography.style.chip.*` нет. Button использует `Headline`, а поля, Badge, Chip и
SegmentedControl — ближайшие размеры `Body`.

Канонический генератор проверяет двухступенчатую цепочку:

```text
Primitive font.* → typography.style.* → Component token → UI
```

Внутренний reference-слой `font.*` из `primitives.json` содержит 36 прямых
Primitive-значений. 34 из них дословно повторяют Figma и видны в четырёх
технических таблицах Catalog, но не являются продуктовым API:

- `font.family.title|headline|body`, все на Onest;
- 13 `font.size.3xs…7xl` как независимые DTCG Dimension `8…56px`;
- 15 `font.lineHeight.4xs…8xl` как независимые DTCG Dimension `10…64px`;
- `font.weight.regular|medium|bold` (`400/500/700`).

Ещё два внутренних `font.letterSpacing.tight|normal` остаются DTCG Dimension в
`rem` ради совместимого graph Text Styles и не выводятся как отдельные
Figma-reference строки.

20 составных `typography.style.<group>.<size>` собирают `fontFamily`, `fontSize`,
`fontWeight`, `letterSpacing` и `lineHeight` непосредственно из пяти `font.*`
Primitive references:

- `display.xl|l|m|s` — 4;
- `title.xl|l|m|s` — 4;
- `headline.xl|l|m|s|xs|xxs` — 6;
- `body.xl|l|m|s|xs|xxs` — 6.

Промежуточных `typography.semantic.*` и `typography.component.*` слоёв больше нет.
Каждый DTCG component token с типом `typography` обязан ссылаться непосредственно
на один из 20 базовых Styles. Валидатор отклоняет raw typography values, ссылки component
tokens на `font.*` и любые canonical записи удалённых промежуточных namespaces.

Desktop и Mobile имеют одинаковые 20 публичных paths и отдельные явные mode
contracts. `typography.json` задаёт default mode; `typography-mobile.json` может
переопределять только утверждённые properties тех же Styles. Web-export поддерживает
явный `data-typography-mode="mobile"`. Light/Dark на типографику не влияет.

Старые CSS-классы `.rf-text--display-large`, `.rf-text--heading-*`,
`.rf-text--body-*`, `.rf-text--label-*` и `.rf-text--code-*` остаются aliases на
один миграционный цикл. Они не возвращают удалённые token paths и не являются API
для нового кода.

Компонент не собирает размер, вес и высоту строки заново. Если существующей роли
недостаточно для нескольких подтверждённых сценариев, сначала расширяется общая
типографика и публичный `Text`, а не добавляется локальный `font-size`.

## Dimension и spacing

Нецветовые размеры проходят цепочку от общей числовой шкалы к параметру конкретного
CSS-свойства и затем к контракту компонента:

```text
Dimension → Spacing / Radius / Border / Opacity → Component → UI
```

`dimension.*` — единственные прямые DTCG dimension values этого контракта. Exact
шкала: `0`, `1`, `2`, `4`, `8`, `12`, `16`, `20`, `24`, `28`, `32`, `36`,
`40`, `44`, `48`, `56`, `64`, `72`, `80`, `96`, `112`, `120`, `128`, `160`,
`248`, `480`, `560`, `1600`; имя равно целому значению в px. Всего в шкале 28
значений.

Dimension хранит только измеримое значение, а не поведение. Ограничение появляется,
когда параметр свойства или CSS-свойство компонента использует значение в `min-*` или
`max-*`. Например, `spacing.560` становится `max-width` диалога через Component
token. Поэтому отдельной группы `constraint` нет и произвольные literals по-прежнему
запрещены. Старые CSS-пути `dimension-constraint-*` временно сохраняются только как
compatibility aliases на соответствующие `dimension.*`.

Дробных Dimension нет. `border.width.medium` использует `dimension.2` и является
единственным каноническим именем толщины `2px`; прежний `border.width.thick`
остаётся только deprecated compatibility alias на `medium`;
прежняя CSS-переменная `dimension-1-5` временно перенаправляется на то же значение
для совместимости и не является каноническим токеном.

Канонический spacing называет фактическое значение, а не индекс:

```text
spacing.0   → dimension.0
spacing.2   → dimension.2
spacing.4   → dimension.4
spacing.8   → dimension.8
spacing.12  → dimension.12
spacing.16  → dimension.16
spacing.20  → dimension.20
spacing.24  → dimension.24
spacing.32  → dimension.32
spacing.40  → dimension.40
spacing.48  → dimension.48
spacing.64  → dimension.64
spacing.96  → dimension.96
spacing.160 → dimension.160
```

Старый `space.*` — только generated compatibility API с индексными значениями (`space.1 = 4px`,
`space.2 = 8px`, `space.3 = 12px` и так далее). Его нельзя механически смешивать с
`spacing.*`: генератор сохраняет старые CSS variables как aliases, но product lint
запрещает и `space.*`, и прямой `dimension.*`. Новый продуктовый код выбирает
property-specific `spacing`, `radius`, `border.width` или Component token.

Для повторяемой композиции Component token выбирает значение напрямую из
`spacing.*`: тот же источник используется для padding, gap, width, height,
min/max constraints и размера иконки. Отдельных `sizing.*`, `layout.*`,
`control.*`, `touchTarget.*` и `icon.size.*` API нет. Safe area, экранная
клавиатура и высота Telegram WebView обрабатываются платформенным адаптером.

### SafeArea — только platform insets

`SafeArea` не является универсальным content container и не задаёт продуктовый
ритм. Его единственная ответственность — добавить фактические системные inset-зоны
поверхности:

```text
SafeArea                 platform/device insets
└── Page layout (Grid)   page width и horizontal content padding
    └── Stack            product spacing между частями
```

На Web `.rf-safe-area` читает только `env(safe-area-inset-*)`; нулевой inset не
создаёт запасной декоративный padding. Page layout, `Stack`, feature shell и sticky
action отвечают за свои отступы отдельными вложенными слоями.

Запрещено применять `SafeArea` и content padding к одному DOM-узлу: тогда два
независимых контракта невозможно проверить и они легко складываются повторно. Для
modal/sheet внешний safe-area layer не должен также дублировать inset во внутреннем
footer. Исключение возможно только для platform adapter с отдельным contract test.

На iOS и Android используются native safe-area/window-inset APIs с той же границей
ответственности. Telegram viewport adapter передаёт доступные insets, но не выбирает
product spacing.

## Spacing, радиусы и границы

Все перечисленные значения — property-specific параметры, а не повторные raw
dimensions и не самостоятельный Alias-слой:

| Параметр свойства | Dimension source |
| --- | --- |
| `radius.none/xs/sm/md/lg/xl` | `0/2/4/8/12/16` |
| `radius.2xl/3xl/4xl/5xl/6xl/full` | `24/32/40/48/64/160` |
| `border.width.none/thin/medium/heavy` | `0/1/2/4` |
| `spacing.0/2/4/8/12/16/20/24/32/40/44/48/64/80/96/112/128/160/248/480/560/1600` | одноимённые `dimension.*` |

`radius.full → dimension.160` достаточно велик для максимального системного
control и остаётся переносимым числом вместо магического `999px`. `border.width`
описывает визуальную силу; старые `default/thick/selected/focus` сохраняются только
как compatibility aliases. Стили `solid` и `dashed` остаются отдельными string tokens.

Component tokens выбирают подходящие `spacing.*`, `radius.*` и
`border.width.*` напрямую. Минимальная интерактивная область
компонента ссылается на `spacing.44`, даже если видимая иконка меньше.

## Opacity

Primitive opacity содержит только `opacity.0/10/20/50/70/100` со значениями
`0/0.1/0.2/0.5/0.7/1`. Это единственный числовой источник прозрачности:
дублирующего Foundation alias `backdrop.*` нет.

`color.alias.overlay.*` по-прежнему задаёт theme-aware RGBA для hover, scrim и
модальных поверхностей. Цветовая роль содержит RGB и alpha, поэтому не является
дубликатом числового `opacity.*`. Нельзя подменять цвет Overlay одним числом opacity
или зашивать локальный `opacity: .53` в feature CSS.

## Elevation

Elevation описывает порядок поверхностей, а не декоративную тень. Уровни:

- `elevation.none` — плоская поверхность;
- `elevation.sm` — небольшое отделение;
- `elevation.md` — обычная поднятая поверхность;
- `elevation.lg` — заметная карточка или панель;
- `elevation.overlay` — popover, sheet или другой верхний слой.

В DTCG elevation хранится как тип `shadow` с цветом, смещением, blur и spread. Web
получает `box-shadow`; будущие iOS и Android adapters переводят тот же смысловой
уровень в доступные им shadow/elevation-параметры. Пиксельное совпадение теней между
платформами не является целью — иерархия должна ощущаться одинаково.

В тёмной теме уровни `sm`, `md` и `lg` могут быть без тени: глубину там передают
surface и border. Нельзя вручную возвращать чёрную тень, если тема определяет
`none`.

Elevation всегда применяется как контракт поверхности, а не как отдельный эффект:

```text
Context background + Context border + Component elevation → готовая поверхность
```

Сначала достаточно background, whitespace или border. Elevation добавляется только
к поверхности, которая действительно находится выше соседнего контента:

- `sm` использует Card;
- `md` используют Dropdown, Menu, legacy elevated Surface (`deprecated`) и интерактивная Card
  в hover;
- `lg` зарезервирован для будущей высокой плавающей поверхности и пока не имеет
  стабильного потребителя;
- `overlay` используют Dialog и Toast.

Product CSS не подключает `elevation.*` и локальный `box-shadow` напрямую. Уровень
приходит через публичный контракт Core component. Порядок наложения остаётся
отдельным контрактом: `z-index` отвечает за stacking и не выводится из имени
Elevation. Тень также не заменяет focus ring, status color или доступную границу.

## Motion

Motion event состоит из трёх частей: duration, easing и свойства, которое меняется.
Исходная шкала содержит `reduced` 1ms, `fast` 120ms, `normal` 180ms, `slow` 240ms и
`ambient` 1200ms. Easing-шкала содержит `standard`, `enter` и `exit`. Product code
не собирает переход из `motion.duration.*` и `motion.easing.*` вручную: эти Primitive
токены предназначены для авторов Design System, а готовое поведение приходит через
публичный контракт Core component или утверждённый pattern.

Канонические сочетания:

| Pattern | Duration | Easing | Свойства | Применение |
| --- | --- | --- | --- | --- |
| Interaction | `fast` | `standard` | color, opacity или transform | hover, press и частая локальная обратная связь |
| Enter | `slow` | `enter` | opacity + transform | появление Dropdown, Menu, Dialog или Toast из связанного источника |
| Exit | `normal` | `exit` | opacity + transform | более короткое исчезновение той же поверхности |
| Reposition | `slow` | `standard` | transform | изменение положения уже видимого элемента |
| Ambient | `ambient` | `standard` | transform или opacity | только циклический Spinner/Skeleton |

Появление обычно длиннее исчезновения и использует ease-out-подобный `enter`; уход
короче и использует `exit`. Движение начинается от связанного trigger/source, а
одинаковое действие во всех компонентах использует одинаковый pattern. Один event
меняет не больше одного-двух свойств. Предпочтительны `transform`, `opacity` и color;
анимация `width`, `height`, `top`, `left` и других layout-свойств запрещена, если
тот же результат можно получить transform-композицией.

Motion помогает понять непрерывность и изменение состояния, но не несёт обязательную
информацию и не блокирует действие. Focus, ошибка, подтверждение и ARIA-feedback
обновляются в начале события, а не после завершения анимации. Для
`prefers-reduced-motion: reduce` пространственное движение отключается или заменяется
мгновенным/fade-переходом; обязательная техническая анимация сокращается до
`motion.duration.reduced`. Будущие нативные adapters обязаны уважать системную
настройку уменьшения движения и сохранять полностью рабочий сценарий без animation.

## Grid

Grid задаёт общую responsive-композицию страницы: колонки, внешние поля, gutter,
максимальную ширину содержимого и точки перестроения. Пороговые Primitive-токены
остаются отдельной стабильной mobile-first шкалой:

- `breakpoint.sm` — 640px;
- `breakpoint.md` — 768px;
- `breakpoint.lg` — 1024px;
- `breakpoint.xl` — 1200px;
- `breakpoint.2xl` — 1440px.

Новый layout сначала работает на узком экране, затем расширяется. Локальная точка
перестроения допустима, когда конкретное содержимое действительно перестаёт
помещаться, но она документируется рядом с компонентом и не объявляется новой
глобальной шкалой. Переименование страницы в Grid не меняет token API:
`breakpoint.*` продолжает описывать пороги, а Grid объединяет их с правилами колонок,
полей, gutter и контейнера.

### Container: ширина, центрирование и поля страницы

Container — правило Foundation Grid, а не отдельный UI-примитив. Wide ограничивает
ширину через `spacing.1600`, Narrow подходит для чтения и форм, Fluid занимает
доступную область. Центрирование использует `margin-inline: auto`; поля выбираются
по общей матрице Grid, а внутренние отступы — из `spacing.*`. Вложенная композиция
не должна повторно добавлять поля страницы. Содержимое сужается вместе с доступной
областью; обязательны reflow, длинный текст и сохранение порядка чтения.

Совместимый `.rf-container` остаётся в публичном Core CSS для существующих Mini App
и Landing: `width: min(100%, var(--rf-spacing-1600))`, центрирование и
`padding-inline: var(--rf-spacing-16)` на всех ширинах. Он не переключается на
адаптивные margins Grid автоматически. Перенос документации не меняет геометрию
продукта. Класс не является отдельным компонентным API в Registry.

## Иконки

Стандартные размеры иконок в Component contracts ссылаются на
`spacing.12/16/20/24/32`.
Размер изображения не равен размеру touch target.

Страница Iconography использует тот же Foundation shell, что Colors, Metrics,
Typography и Elevation. Iconography 3.0 показывает импортированный из Figma набор:
904 одинаковых Glyph в Line, Solid и Duotone (неполные комплекты удалены целиком).
В `Anatomy` параметры идут в порядке Glyph → Style
→ Color. Каждая вкладка стиля содержит поиск и копирование имени, по 72 карточки
с кнопкой «Показать ещё». Deep link `?icon=<name>&iconographyTab=solid` выбирает
стиль и поиск; прежний `iconographyTab=icons` открывает Line. Style содержит только
доступные начертания выбранного Glyph, без заглушек удалённых вариантов.
Отдельного публичного `icon.size.*` API нет.

Новый набор пока проходит визуальное утверждение в Catalog. Оригинальные SVG и
Figma node IDs находятся в `design/icons/figma/`, воспроизводимые theme-aware
пакеты — в `design/icons/generated/`. Сборка: `scripts/build_iconography.py`.
Прежний `icons.js` и его продуктовые копии сохраняются до утверждения; карта
будущей замены — `design/icons/figma/migration.json`. Подробности —
[`ICONOGRAPHY_MIGRATION.md`](../../docs/design-system/ICONOGRAPHY_MIGRATION.md).

Публичный смысловой API выглядит так:

```text
Icon(name, size, tone)
```

На Web текущий adapter использует локальный `ContourIcons` и `data-lucide`.
Иконки строятся на сетке 24x24, наследуют цвет через `currentColor` и не содержат
случайного fill/stroke из feature-кода. Новое имя сначала добавляется в мастер-реестр
`design/icons/icons.js`, затем проходит генерацию/синхронизацию и проверку всех мест
использования.

Декоративная иконка скрывается через `aria-hidden`. Смысловая иконка получает
видимую подпись или доступное имя кнопки. Emoji и случайный inline SVG не заменяют
системную иконку. Иллюстрации и брендовые SVG являются отдельным типом ассета.
Сам `Icon` не интерактивен: для самостоятельного действия используется
`IconButton` с системным touch target и доступным именем. Локальные `fill`, `stroke`
и цветовые значения не подменяют наследуемую Context-роль.

## Изображения и media

Канонические aspect ratios:

- `media.aspectRatio.square` — 1:1;
- `media.aspectRatio.portrait` — 4:5;
- `media.aspectRatio.product` — 4:3;
- `media.aspectRatio.landscape` — 16:9.

Контейнер резервирует размер до загрузки, чтобы страница не прыгала. Фотография
товара, thumbnail и avatar обычно используют `object-fit: cover`; логотип и
иллюстрация — `contain`. Обрезка не должна скрывать важную часть изображения.

Каждая продуктовая media-поверхность предусматривает:

1. loading — зарезервированный ratio и skeleton/sunken surface;
2. loaded — корректный `alt`, размер и fit;
3. error — стабильный placeholder и понятный текст, если изображение необходимо для
   задачи;
4. empty — отдельное осмысленное состояние, а не сломанная картинка.

Декоративное изображение получает пустой `alt`. Для содержательного изображения
`alt` описывает его смысл, но не повторяет соседний текст. Responsive images должны
не загружать заведомо избыточный файл для маленького viewport.

### Визуальный стиль и экспорт

Фотография реального товара остаётся главным содержимым маркетплейса: спокойная
тёплая поверхность не конкурирует с цветами, а crop сохраняет сам букет и важные
детали. Системная иллюстрация допустима для категории, onboarding или empty state;
она продолжает уже утверждённый мягкий 3D-язык Brand / Warm с одинаковыми
светом, материалом и ракурсом. Новый экран не создаёт отдельное семейство
иллюстраций, случайный градиент или декоративную фотографию без мастер-решения в
`design/`.

Новые системные и product-иллюстрации по умолчанию генерируются и экспортируются
как изолированный cutout с настоящим alpha-каналом, без встроенного фона, студийной
плоскости, белого matte или нарисованной шахматной сетки. Фон становится частью
самого raster-asset только когда он несёт утверждённый смысл сцены. Перед подключением
PNG проверяется технически: файл должен содержать полностью прозрачные фоновые и
эффективно непрозрачные предметные пиксели; одного визуального preview недостаточно.

Вектор остаётся SVG для логотипа и UI-графики. Растровый мастер хранится в наибольшем
нужном размере без искусственного увеличения. Web получает responsive `srcset` и
`sizes` как минимум для обычной и двойной плотности; прозрачная графика сохраняет
PNG/WebP по результату визуального сравнения. Когда появятся нативные клиенты, один
мастер экспортируется в `1x`, `2x` и `3x` с одинаковым crop и именем ресурса — эти
копии не становятся новыми источниками правды. Иконки по плотностям не растрируются:
их переводит платформенный vector adapter.

## Доступность

Цель системы — WCAG 2.2 AA. Минимальный контракт:

- primary, secondary и tertiary normal text проходят contrast не ниже 4.5:1 на
  поддерживаемых поверхностях; крупный текст не объявляется
  «крупным» только ради более слабого требования;
- focus видим с клавиатуры, имеет контраст не ниже 3:1 и поддерживает forced colors;
- интерактивная область не меньше Component-контракта на `spacing.44`;
- статус, ошибка и выбранное состояние не передаются одним цветом;
- label связан с control, ошибка объясняет способ исправления;
- семантический HTML и порядок чтения совпадают с визуальным;
- интерфейс остаётся понятным при zoom 200%, длинных переводах RU/EN/KY/UZ и
  увеличенном системном шрифте;
- движение уважает reduced motion;
- loading, success и error сообщаются assistive technologies без неожиданной смены
  фокуса.

Component API обязан включать accessible name и состояния `disabled`, `loading`,
`error`, `selected` там, где они имеют смысл. Визуальный каталог не заменяет
keyboard и screen-reader проверки.

## Граница Telegram adapter

Telegram Mini App — потребитель общей системы, а не отдельная Design System.
Переменные `--tg-theme-*`, `Telegram.WebApp.colorScheme`, `env(safe-area-inset-*)`,
динамическая высота WebView и особенности Telegram navigation принадлежат только
Mini App adapter.

Граница работает так:

1. общие DTCG sources ничего не знают о Telegram;
2. adapter читает доступные host colors и отображает их на Context-роли холста,
   поверхности, основного и вторичного текста;
3. брендовые actions, status colors, focus, typography, spacing и компоненты
   продолжают использовать Contour tokens;
4. adapter проверяет contrast и использует theme fallback, если host-значение не
   подходит или отсутствует;
5. safe area и WebView viewport влияют на layout оболочки, но не создают новые
   глобальные foundations.

Feature-код не обращается к `--tg-theme-*` напрямую и не содержит собственную копию
Telegram mapping. Платформенное исключение добавляется в adapter, документируется и
проверяется отдельно в light/dark и обычном браузере.

## Как добавлять новое значение

Перед добавлением значения нужно найти существующую роль и проверить каталог
компонентов. Если роль действительно новая:

1. выбрать правильный уровень: Primitive seed, Alias theme, Context, Static или
   Component;
2. добавить DTCG token во все нужные canonical source-файлы;
3. сохранить одинаковый Alias contract Light/Dark и границы aliases;
4. запустить `build_tokens.py`;
5. запустить `build_tokens.py --check`, UI-linter и тесты;
6. визуально проверить обе темы, keyboard focus, reduced motion и нужные viewport.

Нельзя добавлять случайный HEX, размер, radius, shadow, z-index или transition в
feature-код «временно». Если исключение относится к уникальной иллюстрации или
данным пользователя, оно явно документируется и добавляется в узкий allowlist, а
не превращается в новый системный токен.
