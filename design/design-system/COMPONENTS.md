# Core UI components Contour

Core UI — platform-neutral component contract поверх tokens, foundations и
primitives. Канонические названия, lifecycle и Mobile-стратегия находятся в
`component-registry.json`; подробный аудит и migration map — в
`docs/design-system/COMPONENT_INVENTORY.md`.

Наличие CSS-класса в reference-каталоге не означает, что компонент уже stable или
что legacy-экран мигрирован. Feature-код преимущественно использует `stable`; `beta`
требует локальной проверки, `experimental` нельзя принимать за общий production API.

## Подключение Web adapter

```html
<link rel="stylesheet" href="/design-system/generated/web/tokens.css">
<link rel="stylesheet" href="/design-system/web/primitives.css">
<link rel="stylesheet" href="/design-system/web/components.css">
<script src="/design/icons/icons.js" defer></script>
<script src="/design-system/web/core-ui.js" defer></script>
```

`components.css` — стабильная точка входа. Она подключает модули `actions`, `forms`,
`content`, `navigation`, `feedback`, `overlays`, `disclosure` и `patterns`. Файлы
модулей не формируют отдельные библиотеки и используют только semantic/component
tokens.

Каноническая Web-логика находится в `web/runtime/core-ui.ts`; публичный
`web/core-ui.js` генерируется и вручную не редактируется. Общие TypeScript-типы
Registry/Catalog/runtime находятся в `web/runtime/contracts.ts` и проходят отдельную
строгую проверку. Новые интерактивные функции Web Core добавляются только в
TypeScript source.

Admin, Mini App и Landing разворачиваются отдельными subtree, поэтому production
подключает сгенерированные локальные `static/design-system/core-ui.css` и
`core-ui.js`. Bundle собирается из тех же canonical файлов и проверяется на точное
совпадение; service-копия не является местом для overrides.

В Dimensions 2.0 размерный контракт компонента напрямую ссылается на
`spacing.*`, `radius.*`, `border.width.*` или `opacity.*`. Промежуточных
`sizing`/`layout`/`control`/`touchTarget`/`icon.size` namespaces нет. Одна шкала
`spacing.*` покрывает padding/gap, width/height, min/max constraints, hit area и
размер иконки; product-код не передаёт в компонент raw `dimension.*` или
deprecated `space.*`.

Generated `core-ui.js` добавляет framework-independent keyboard/focus behavior для stable
Dropdown и Tabs, beta Toast, а также experimental Dialog demo. При переносе в React, SwiftUI
или Compose сохраняется
контракт, а не внутренняя реализация этого файла.

## Component terminology

Tab и Tabs — Stable Core для Web и Telegram Mini App (общий Web adapter).
Tab владеет Label, Value, шестью State и Icon slots; Tabs — группой, выбором,
roving tabindex и связанными панелями. Доступный API — Line / M, не route navigation.
Независимые применения: Admin User Profile и опубликованный Design System Catalog.
Состояния, клавиатура, динамические группы и обе темы покрыты тестами Catalog;
native iOS/Android adapters не входят в обещание Stable.

- **TextField** — единственное публичное имя однострочного поля. Старый Input,
  его CSS alias и группа токенов удалены; используйте `.rf-text-field`.
- **Dialog**, не Modal, — модальная задача. `BottomSheet` является мобильной
  presentation того же overlay contract.
- **Toast**, не Snackbar, — короткое неперехватывающее уведомление.
- **Badge** — неинтерактивный статус. **Chip** — интерактивный компактный выбор.
- **Spinner** — неопределённая короткая работа; Loader отдельным компонентом не
  создаётся.
- **ListItem**, не Row.
- **SegmentedControl** переключает режим или фильтр; **Tabs** переключают связанные
  tab panels.
- IconButton является канонической presentation Button с обязательным accessible
  name, а не параллельным action engine.

`ListItem 1.11.11` центрирует содержимое `.rf-list-item__leading` и
`.rf-list-item__trailing` по обеим осям внутри назначенного slot. Это сохраняет
оптический центр системной иконки не только в slot естественной ширины, но и в
круглых или квадратных feature-контейнерах без локальной компенсации.

## Lifecycle Core UI v1

Стабильное ядро выбрано по реально повторяющимся элементам Admin, Mini App и
Landing:

1. Button, включая IconButton presentation.
2. TextField.
3. Card.
4. Badge.
5. Alert.
6. SegmentedControl.
7. Skeleton.
8. EmptyState.

SafeArea, Stack, Inline, Text, AspectRatio и VisuallyHidden
образуют 6 рекомендуемых reference primitives. Их lifecycle пока
`beta`: implementation есть, но production-миграция ещё не доказала общий API.

`Box`, `Divider` и deprecated `Spacer` удалены из публичного контракта: первый
дублировал обычный контейнер и `min-width: 0` уже встроен в нужные layout
primitives, смысловой разделитель выражается нативным `hr`, а отступы задаются
через `gap` у `Stack` или `Inline`.

## Image

`Image` — единый beta-компонент для содержательного изображения и его состояний.
Корень резервирует media-slot до загрузки и показывает только один слой: Skeleton,
изображение или внутренний fallback.

```html
<div class="rf-aspect-ratio rf-aspect-ratio--portrait rf-image-frame" data-state="loaded">
  <img class="rf-image" src="listing.jpg" alt="Букет белых роз">
  <span class="rf-skeleton rf-skeleton--fill" aria-hidden="true"></span>
  <span class="rf-media-fallback" role="img" aria-label="Фото не загрузилось">
    <span class="rf-media-fallback__icon" aria-hidden="true">
      <span class="rf-icon rf-icon--lg" data-rf-icon-glyph="image-off"></span>
    </span>
    <span class="rf-media-fallback__label">Фото не загрузилось</span>
  </span>
</div>
```

- `data-state` принимает `loading`, `loaded`, `error` или `empty`;
- `rf-image` использует `cover`: slot заполняется полностью, допустимо кадрирование;
- `rf-image--contain` показывает файл полностью и намеренно может оставить поля;
- содержательному изображению нужен `alt`, декоративному — пустой `alt`;
- `rf-image-frame--compact` визуально оставляет только иконку fallback;
- корню нужен локализованный `aria-label`, потому что compact скрывает подпись;
- авторизация, получение файла, blob lifecycle и смена `data-state` принадлежат product;
- `MediaFallback` deprecated как самостоятельный API и остаётся внутренней
  совместимой анатомией `Image`, пока production-разметка мигрирует.

Reference-каталог дополнительно показывает beta/experimental API, чтобы проверить
composition и accessibility до production-миграции. Статус всегда сверяется с
registry, а не угадывается по наличию класса.

## Icon

`Icon` — стабильный (`stable`) визуальный компонент над единым локальным набором Figma.
Это единственный разрешённый способ использования UI-пиктограмм, в том числе
внутри Button, TextField и других компонентов. Исходные SVG и JSON доступны только
реализации Icon и системному просмотру Iconography, не feature-коду. Прямые импорты,
fetch пакетов и альтернативные иконочные библиотеки запрещены. Логотипы, флаги и
иллюстрации остаются медиа-ассетами, а не Glyph. Admin, Mini App, Landing и Catalog
мигрированы на Icon; старые подключения запрещены. Остаточные исключения для
архивных иллюстраций зафиксированы в `icon-legacy-usage.json`.
В каталоге он расположен в Components (`#components/icon`); старый адрес
`#primitives/icon` перенаправляет на эту страницу.

Icon и Iconography используют один загрузчик `web/icon-glyphs.js` и одинаковые
generated SVG-данные. Start/End Button и TextField — вложенные Icon с этим же API.
План переключения этих потребителей находится в
[`ICONOGRAPHY_MIGRATION.md`](../../docs/design-system/ICONOGRAPHY_MIGRATION.md).

```html
<span class="rf-icon rf-icon--sm" data-rf-icon-glyph="search"
      data-rf-icon-style="line" aria-hidden="true"></span>
```

- `xs` = 12 px: compact metadata;
- `sm` = 16 px: Dropdown, DatePicker и IconButton;
- `md` = 24 px: default standalone Icon, Button и TextField;
- `lg` = 32 px: крупные empty/error/status compositions.

Контейнер всегда `inline-flex`, не shrink-ится, имеет нулевой `line-height`, а SVG
занимает 100% контейнера и наследует `currentColor`. Произвольные размеры, локальные
`margin`, `translate` и `scale` не являются API. Декоративный Icon получает
`aria-hidden="true"`; значимая самостоятельная пиктограмма может получить
`aria-label`, после чего renderer задаёт `role="img"`. Сам Icon не кликабелен:
icon-only действие использует нативный `IconButton`.

Цветовые варианты: `brand`, `primary`, `secondary`, `tertiary`, `danger`, `success` через
`rf-icon--{variant}`. Без модификатора сохраняется наследование цвета родителя.
Brand стоит первым в списке Variant и использует `component.icon.brand` →
`color.context.icon.brand.default` с адаптацией к Light/Dark. Начальный выбор
Playground остаётся Primary; порядок вариантов не меняет настройки вложенных Icon.
`tertiary` предназначен для декоративной, не критичной для понимания графики.
`data-state="disabled"` задаёт приглушённый цвет; `skeleton` скрывает Glyph и
сохраняет размер статичной заглушкой (без анимации). Icon не отключает родительское
действие: это обязанность Button/TextField.

`data-rf-icon-style="line|solid|duotone"` выбирает авторское начертание. Полный
набор содержит по 904 одинаковых Glyph в Line, Solid и Duotone.
Duotone использует отдельный полупрозрачный слой, а не заливку произвольных paths.
Web/Mini App подключают только публичные `core-ui.css` и `core-ui.js`: Core сам
подключает renderer для `data-rf-icon-glyph` и загружает нужный Style. Инициализация
работает также для добавленных узлов и смены атрибутов. Имя — канонический Glyph:
`close` для закрытия, `x` только для бренда X; вместо `*-filled` задаётся Solid.
Неподдерживаемая пара даёт пустой host с `data-rf-icon-error="unavailable"`,
ошибка загрузки — `load`. Поздний ответ не заменяет уже выбранный Glyph.

React: `<Icon name="mail" variant="primary" iconStyle="duotone" size={24} />`.
`iconStyle` отделён от нативного React `style`; `state` имеет те же три значения.
По умолчанию размер 24px, цвет наследуется. Смысловой Icon получает `aria-label`,
декоративный — `aria-hidden`. React adapter предназначен для Web, не React Native.
Пакет содержит те же JSON-данные, но загружает их только внутри Icon. Внутренние
`namesForStyle`, `loadStyle` и `set` не экспортируются как публичный `./glyphs` API.

## Button и IconButton

### API

- variants: `primary`, `secondary`, `tertiary`, `ghost`, `danger`, `success`;
  IconButton дополнительно поддерживает `close` с системной подложкой
  `background.primary`;
- sizes: `s`, `m` (по умолчанию), `l`;
- states: default, hover, pressed, focused, disabled, loading, skeleton;
- anatomy: root, optional Start icon, label, optional Subtitle, optional End icon,
  optional Spinner;
- Subtitle использует базовый `typography.style.body.xs` и выводится внутри
  `.rf-button__copy`. Видимый Subtitle связан с кнопкой через `aria-describedby`,
  а Label задаёт имя через `aria-labelledby`, если продукт не передал своё имя.
  Core и React сохраняют внешние description IDs; скрытый Subtitle не озвучивается.
  Длинные Label/Subtitle переносятся, включая слова без пробелов, без обрезания;
- Start icon и End icon включаются независимо, используют только системный Icon
  фиксированного размера 24 px и получают `aria-hidden="true"`;
- IconButton принимает одну системную иконку и обязательное локализованное доступное
  имя: в Core HTML это `aria-label` + `data-i18n-aria-label`, в React Web — обязательные
  props `icon` и `label`. Видимый текст внутри IconButton не добавляется;
- public busy intent: `data-loading="true"` или `data-skeleton="true"`; Core сам
  синхронизирует native `disabled`/`aria-disabled`, `aria-busy` и Spinner. Skeleton
  имеет визуальный приоритет; исходная доступность восстанавливается, когда оба
  состояния выключены. Feature не выставляет производные признаки независимо.
  Для синхронной смены нескольких параметров используется
  `ContourUI.setButtonState(element, {loading, skeleton, disabled})`; отсутствующие
  параметры сохраняются. Catalog использует этот же публичный API без таймеров.
- React сохраняет `aria-disabled`: такой button остаётся доступен для фокуса, но
  click/Enter/Space не запускают действие. Native `disabled`, Loading и Skeleton
  отключают кнопку нативно; оба busy-состояния сообщают `aria-busy`.

React Web adapter экспортирует `Button` и `IconButton` из
`@reflower/core-ui-react`. Оба используют тот же Core CSS; React отвечает только за
типизированные props, нативные события и производные accessibility-атрибуты.
Внутренний маркер `data-rf-state-owner="react"` не даёт Core JS повторно вычислять
busy-состояние из уже изменённого React DOM; оба адаптера можно использовать на
одной странице без двойного восстановления disabled.

```html
<button class="rf-button rf-button--primary" type="button">
  <span class="rf-button__content">
    <span class="rf-icon rf-icon--md" data-rf-icon-glyph="plus" aria-hidden="true"></span>
    <span class="rf-button__copy">
      <span class="rf-button__label">Создать</span>
      <span class="rf-button__subtitle">Новое объявление</span>
    </span>
    <span class="rf-icon rf-icon--md" data-rf-icon-glyph="right-arrow" aria-hidden="true"></span>
  </span>
</button>

<button class="rf-icon-button rf-icon-button--secondary"
        type="button" aria-label="Поиск">
  <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="search" aria-hidden="true"></span>
</button>

<button class="rf-icon-button rf-icon-button--tertiary rf-icon-button--close"
        type="button" aria-label="Закрыть">
  <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span>
</button>
```

Действие использует `<button type="button">`; переход — `<a href>`. При единственном
intent `data-loading="true"` Core выводит `aria-busy="true"`,
`aria-disabled="true"` и нативный `disabled`, сохраняет понятное имя и не запускает
повторное действие. Вручную заданный `disabled` остаётся самостоятельным постоянным
state и точно восстанавливается после loading.
Если ссылка временно имеет `aria-disabled="true"`, Web behavior блокирует переход;
это не заменяет удаление недоступного действия из tab order, когда оно недоступно
надолго.

### React Web adapter

Пакет `@reflower/core-ui-react` в [`adapters/react/`](adapters/react/) даёт
типизированный React API поверх этого же DOM/CSS-контракта. Он поддерживает все шесть
`variant`, размеры `s/m/l`, `loading`, `skeleton`, `subtitle`, независимые
`startIcon`/`endIcon`, `block`, нативные props `<button>` и ref forwarding. Adapter
рендерит публичную анатомию `.rf-button*`; его `typography.css`, `tokens.css`,
`styles.css`, Onest Web fonts и `icons-runtime.js` генерируются из тех же master-
источников, поэтому React не владеет параллельными токенами, шрифтами или стилями.

```tsx
import { Button } from '@reflower/core-ui-react';
import '@reflower/core-ui-react/typography.css';
import '@reflower/core-ui-react/tokens.css';
import '@reflower/core-ui-react/styles.css';

<Button
  variant="success"
  size="l"
  startIcon="check"
  onClick={publish}
>
  {t('listing.action.publish')}
</Button>
```

Пакет предназначен только для React Web. React Native требует другой presentation
adapter без DOM и CSS; SwiftUI и Android Compose также не считаются реализованными,
пока в репозитории нет их компилируемого source и platform checks.

Icon-only действие всегда использует отдельную presentation `rf-icon-button`; вариант
`rf-button--icon-only` не является частью публичного Button API. Hover включается
только для точного pointer, а disabled/loading/`aria-disabled` блокируют hover и
pressed presentation независимо от порядка классов.

Mobile использует тот же variant/size vocabulary, touch target не меньше системного
минимума и нативные pressed/haptic conventions. На coarse pointer `s` и `m`
сохраняют имена, но минимальная область нажатия расширяется до `spacing.44`
(`44px`), `l` остаётся `48px`: итоговая шкала `44/44/48` у Button/IconButton.
Размер control и visual icon независимы: `s/m/l` IconButton меняют hit area,
а вложенный Icon остаётся на `spacing.16` (`16px`).
Интерактивные Core-компоненты рисуют semantic focus ring через
`:focus-visible`: контур совпадает с границей control (`outline-offset: 0`), не
создаёт широкого внешнего halo и остаётся различимым в forced-colors. В единый
контракт входят Button/IconButton, Link, form controls, Chip, interactive
Card/ListItem, Tabs и MenuItem; feature не добавляет собственный outline.
Исключение — TextField: фокус меняет цвет единственной
рамки `border.width.thin` (1px), без дополнительного outline или shadow.
Это одинаково для Default/Search/Password/Price, реального фокуса и Catalog Focused,
в обеих темах; Error сохраняет красный цвет рамки без утолщения.

## TextField

### Anatomy

```text
TextField
├── control
│   ├── optional leading
│   ├── native input
│   ├── optional floating label
│   └── optional trailing action
└── optional description / error
```

Variant TextField: `default` (native `type="text"`), `search` (`type="search"`)
`password` (`type="password"`), `price` (decimal text input) и `multiline` (native textarea). Price использует
`data-rf-price`, `inputmode="decimal"` и `.rf-text-field__suffix` для валюты; input получает
`.rf-text-field--with-suffix`. Принимаются неотрицательные суммы с двумя десятичными
знаками, точка или запятая; пробелы группировки удаляются, запятая нормализуется в
точку. Буквы, экспонента, знаки и лишние разделители отклоняются без извлечения
случайных цифр. Значение остаётся строкой без валюты; сервер проверяет сумму отдельно.
Пустая строка разрешена для редактирования; native pattern проверяет завершённую сумму.
Currency suffix связан с input через `aria-describedby` даже при скрытом Description.
Параметр `data-rf-currency="RUB"` на suffix задаёт ISO-код валюты: Core обновляет
обозначение через Intl без изменения суммы. Необязательный `data-rf-currency-label`
передаёт локализованную подпись продукта (например, `сом` или `сум`). Без известного
символа отображается ISO-код. Смена атрибутов работает и после появления компонента.
Валюта не меняет ограничение Price в два десятичных знака и не выполняет конвертацию.
Password включает постоянный trailing action
`data-rf-password-toggle`: Core переключает type, eye/eye-off, aria-pressed,
локализованное имя действия и сохраняет focus/selection. Для входа пример использует
`autocomplete="current-password"`; для регистрации продукт задаёт `new-password`.
Это один визуальный компонент:
иконки, trailing action и очистка — параметры анатомии, а не variants.
Отдельный Type в Catalog не дублирует Variant; примеры сохраняют соответствующие
native `type` и `autocomplete`.
Другие native input types остаются возможностями Core, но не предлагаются
как отдельные Variant и карточки примеров в Catalog.

Размеры TextField: `sm`, `md`, `lg`. Состояния: default, hover, pressed, focused,
disabled и skeleton. Pressed использует существующую рамку фокуса. Skeleton задаётся
`data-skeleton="true"` вместе с `disabled` и `aria-hidden="true"` на input;
контейнер получает `aria-busy="true"` и доступное локализованное имя загрузки.
Skeleton сохраняет размеры, скрывает label/value/hint и учитывает reduced motion.
Native readonly и validation остаются возможностями Core вне списка State.
Доступное имя обязательно: видимый Label либо `aria-label`, когда Label отключён.
Label внутри поля однострочный: длинный текст плавно затухает
у конца строки (spacing.32), без многоточия. RTL меняет сторону затухания.
Description и ошибка имеют одинаковое поведение: всегда видны полностью,
переносятся, включая длинные слова без пробелов, и не получают fade.
Полное доступное имя и aria-describedby сохраняются. Нативный ввод и Multiline
не получают маску: курсор, выделение и переносы строк работают без изменений.
В Catalog Label и Placeholder включаются независимо; хотя бы один остаётся включён.
Placeholder не заменяет доступное имя. Hint/error связываются с control через
`aria-describedby`, ошибка — через `aria-invalid="true"` и видимый текст. В touch
WebView `sm` не становится меньше минимального touch target. На coarse pointer
текст всех размеров TextField, Multiline и native Select не меньше `body.medium`
(16 px), включая пустое, заполненное, focused, readonly, disabled и error состояния.
Это устраняет причину автоматического приближения iOS при фокусе. Размер не меняется
в момент фокуса; desktop сохраняет свою типографику, ручной zoom не ограничивается.
Во всех размерах label, value и supporting/error text используют единый
горизонтальный inset; у `sm` он не сжимается ниже `spacing.16` (`16px`),
чтобы текст не попадал в зону скругления `24px`.
TextField и Multiline используют единый component radius
`component.textField.radius` → `radius.2xl` (`24px`) во всех типах, состояниях и
темах; product-код не переопределяет его локально.
Trailing action занимает высоту control slot и центрируется системным layout; feature
не позиционирует password/clear button произвольными координатами.
Leading slot принимает декоративную системную иконку `.rf-text-field__icon` размером
24 px; такой же размер у trailing icon и иконок действий. Input получает
`.rf-text-field--with-icon`, поэтому label, value и supporting text автоматически
сдвигаются на одну текстовую ось. Иконка имеет `aria-hidden="true"` и не заменяет label.
Trailing slot использует собственную иконку с действием TextField:
`button.rf-text-field__action-trigger` с системной иконкой 24 px и невидимой
областью нажатия. Она не получает классы или variants `Button`/`IconButton`:
фон и обводка отсутствуют в default/hover/pressed; видимый focus indicator
появляется только при `focus-visible`. Password, clear и calendar используют
один контракт; недоступное действие сохраняет native disabled semantics.
Для обычной очистки используется
`data-rf-input-clear`. Кнопка появляется только у непустого редактируемого поля во
время `focus-within`: в обычном состоянии, при пустом value и у disabled/readonly
поля крестика нет. Переход Tab с input на саму кнопку сохраняет её видимой и доступной
с клавиатуры. Действие очищает native value с `input`/`change` events и возвращает
focus в поле. Текст `aria-label` локализуется продуктом, иконка — системная `x`.
Готовые примеры TextField Default/Search и их Catalog Playground включают очистку
по умолчанию. Пока крестик виден, соседний декоративный trailing Icon скрывается
каноническим CSS; после очистки/blur возвращается. Password/Price сохраняют свой
постоянный trailing элемент и не подключают generic clear.
TextField также поддерживает неинтерактивный trailing Icon через
`rf-text-field__trailing-icon` + `rf-text-field--with-trailing-icon`. Справа у control
всегда один смысловой slot. Приоритет фиксирован: встроенное действие самого control
(`Dropdown` chevron, password eye или DatePicker calendar) → generic clear для
обычного редактируемого текста → status Icon → пустой slot. Leading Icon слева с
этим правилом не конфликтует. `rf-text-field__actions` и `rf-text-field--with-actions`
удалены из публичного API; Core скрывает clear, если рядом существует более
приоритетное control-owned действие.
Inset вычисляется из `spacing.16`, размера иконки `spacing.16` и системного gap
`spacing.8`; feature не задаёт случайный `padding-left`.
Supporting/error text находится под рамкой `control`, но использует тот же
горизонтальный inset, что label/value. Поэтому рамка окружает только интерактивное
поле, а description визуально продолжает его текстовую ось.
Во всех состояниях `focus-visible` для TextField, Multiline и Dropdown используется
тонкий прилегающий индикатор без широкого внешнего halo; error меняет его цвет, но
не добавляет вторую крупную рамку.

Floating label — вариант существующего `TextField`, а не новый input. Label кладётся
внутрь `.rf-text-field__control` после нативного `input`/`textarea`. В пустом поле он
занимает обычное положение; при `:focus-within`, непустом native value или autofill
переходит в компактную верхнюю позицию. Core adapter добавляет служебный пробельный
`placeholder` только когда продукт не передал свой, поэтому `:placeholder-shown`
одинаково обрабатывает controlled/uncontrolled value, paste, очистку и программное
изменение. Публичные `isFocused`, `hasText` и подобные props не нужны. Если label
есть вместе с настоящим placeholder, placeholder показывается только во время focus,
когда label уже поднят.

```html
<div class="rf-text-field-group">
  <span class="rf-text-field__control">
    <input class="rf-text-field" id="title" type="text" aria-describedby="title-hint">
    <label class="rf-text-field__label" for="title">Название</label>
  </span>
  <span class="rf-text-field__hint" id="title-hint">Короткое название букета.</span>
</div>
```

Core не оборачивает native control в JS-объект: consumer получает сам `<input>` и
может напрямую вызывать `focus()`, `select()`/`setSelectionRange()`, читать
`validity`, передавать `FormData` и использовать любой стандартный HTML attribute
или event handler. Для vanilla Web это эквивалент прямого ref; `forwardRef` нужен
только возможному framework adapter, а не canonical DOM implementation.

### Dropdown

`Dropdown` — каноническая собственная раскрывающаяся поверхность Contour. Имя
описывает presentation, поэтому обязательный `data-rf-dropdown-mode` задаёт один из
двух разных интерактивных контрактов:

- `selection` выбирает значение и использует `listbox`/`option`; single, multiple,
  grouped, searchable, cascading, empty, loading и invalid являются
  вариантами и состояниями этого режима;
- `actions` запускает команды и использует menu button + `menu`/`menuitem`;
  disabled и destructive задаются на уровне команды.

Новый API не показывает системный browser `<select>` popup. Deprecated `.rf-select`
и `.rf-menu` принимаются Core только как compatibility API; production-разметка
Admin и Mini App уже использует `Dropdown`. `Select` и `ActionMenu` в Registry
указывают replacement `Dropdown`.

Каждая строка обоих режимов композирует системный `ListItem`:
`.rf-list-item.rf-list-item--interactive.rf-dropdown__item`. Общие slots — leading
Icon, `.rf-list-item__content`, `.rf-list-item__title`, optional
`.rf-list-item__description` и trailing metadata. Публичная типографика строки
зафиксирована в Core: title использует `typography.style.headline.xs`, description —
`typography.style.body.s`; продукт не переопределяет их локальными font-правилами.
Selection item является единственным `role="option"` и не содержит вложенных
button/checkbox; визуальный check — декоративный indicator. Action item сам является
native button с `role="menuitem"`.

Selection single закрывается после выбора; multiple остаётся открыт и обновляет
скрытое поле comma-separated значением. Product владеет данными, локализованным
текстом и преобразованием значения в model. Core владеет open/close, `aria-expanded`,
focus, Arrow/Home/End, Enter/Space, Escape/Tab, поиском по видимому label, submenu
Right/Left, outside dismissal и viewport placement. Disabled item пропускается
стрелочной навигацией. Destructive меняет семантический цвет, но подтверждение
опасного действия остаётся ответственностью product flow.

Скрытое поле `[data-rf-dropdown-input]` является form/model bridge: Core синхронизирует
его при выборе и принимает программное `input`/`change` обратно в options и trigger.
Динамически добавленные product options получают id, keyboard navigation и текущее
selection-состояние без повторной инициализации feature-кодом. Для меню внутри
scrollable таблиц применяется `rf-dropdown--viewport`: Core позиционирует панель
относительно trigger, задаёт ей компактную системную ширину, не даёт ей выйти за
viewport и закрывает при scroll/resize. На fine pointer такая panel не наследует
ширину таблицы, строки или страницы. На coarse pointer нижняя mobile sheet
используется только на compact viewport уже `breakpoint.md`; на планшете panel
остаётся компактной и привязанной к trigger, сохраняя touch targets не меньше 44 px.
Обычная panel остаётся привязана к root; `rf-dropdown__panel--end` выравнивает её по
правому логическому краю. Перед передачей фокуса Core автоматически сдвигает открытую
selection-panel внутрь viewport, поэтому крайнее положение trigger не создаёт
горизонтальный scroll и не сдвигает product content.

Компактный `rf-dropdown--anchored` сохраняет тот же привязанный к trigger контракт и
на touch-устройствах: panel начинается через системные 8 px, имеет ширину не меньше
trigger и растёт только под содержимое в пределах viewport. Для trigger у правого края
он композируется с `rf-dropdown__panel--end`. Вариант предназначен для коротких простых
списков; длинные, searchable и cascading списки используют стандартную mobile sheet
presentation только на compact viewport. На планшете они остаются viewport-safe
dropdown panel и не перекрывают всю ширину экрана.

Trigger Dropdown всегда использует единственный trailing chevron, потому что именно
он сообщает о раскрытии. Clear рядом с chevron не допускается. Если выбор можно
сбросить, product добавляет обычный option «Не выбрано» либо отдельное внешнее
действие формы — в зависимости от смысла данных. Команды удаления не смешиваются с
selection-options и размещаются в `mode=actions`.

Поверхность использует `component.dropdown.*`: radius `radius.2xl` (24 px),
max-height `spacing.480`, Context background/border/state colors и `elevation.md`.
Длинный список прокручивается внутри panel с `overscroll-behavior: contain`; стандартная
touch presentation на compact viewport получает viewport-safe fixed panel и
двухуровневый back action; tablet presentation сохраняет ограниченную ширину panel.

Когда внутри `.rf-text-field-group` используются настоящий `label.rf-text-field__label` и системные
`.rf-text-field__hint`/`.rf-text-field__error`, Core безопасно создаёт только отсутствующие
уникальные `id`, связывает `for` и формирует `aria-describedby`. Явные product ids и
внешние description ids сохраняются. При одновременно показанных helper и error
визуально и для `aria-describedby` остаётся error; динамическая системная ошибка
получает polite live announcement. `aria-invalid` и решение, когда показывать ошибку,
всегда остаются ответственностью формы.

Native `form.reset()` восстанавливает `value/defaultValue` сам. После reset Core
только пересинхронизирует производные состояния: видимость clear, скрытый
`type="password"`, eye/eye-off и floating label. Это не создаёт второго состояния
value и одинаково работает для обычного HTML, server-rendered forms и framework
controlled/uncontrolled adapters.

```html
<div class="rf-text-field-group">
  <span class="rf-text-field__control">
    <span class="rf-text-field__icon rf-icon rf-icon--sm"
          data-rf-icon-glyph="search" aria-hidden="true"></span>
    <input class="rf-text-field rf-text-field--with-icon rf-text-field--with-action"
           id="search" type="search" name="q" value="пионы"
           autocomplete="off" data-rf-autofill="off"
           autocapitalize="off" autocorrect="off"
           spellcheck="false" inputmode="search" enterkeyhint="search">
    <label class="rf-text-field__label" for="search">Поиск</label>
    <span class="rf-text-field__action">
      <button class="rf-icon-button rf-icon-button--tertiary" type="button"
              data-rf-input-clear aria-label="Очистить поиск">
        <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="close" aria-hidden="true"></span>
      </button>
    </span>
  </span>
</div>
```

Прежняя анатомия с внешним label остаётся совместимой и визуально не меняется. Поле
без видимого label обязано получить доступное имя через `aria-label` или другой
эквивалент; placeholder сам по себе доступное имя не заменяет.
`multiline` — вариант TextField, а не отдельный компонент. Использует
`<textarea class="rf-text-field rf-text-field--multiline">`, только Placeholder и
обязательное доступное имя через `aria-label`. Без Label, Description и иконок.
Поле растягивается по вертикали, ширина ограничена контейнером. Нативные `name`,
`rows`, `required`, `maxlength`, `disabled` и события остаются доступны интеграциям,
но не являются дополнительными настройками варианта в Playground.

Поиск и пароль — варианты `search` и `password` общего TextField с Icon или
IconButton, а не отдельные SearchField/PasswordField. SearchField удалён из Registry
и CSS; используйте `rf-text-field` с `type="search"`. Checkbox — Stable Web Core;
Radio (ранее RadioGroup) — `stable/native-first` для Web: использует нативную семантику; Mobile — лучший нативный
control платформы под тем же canonical name. Deprecated Select сохраняется только
как совместимость до утверждённой миграции на custom Dropdown.

Core не ставит `autofocus` и не переводит focus в TextField при
инициализации страницы. Поисковый запрос не является логином, одноразовым кодом или
адресом: TextField — Search использует `type="search"`, `autocomplete="off"`,
`data-rf-autofill="off"`,
`autocapitalize="off"`, `autocorrect="off"`, `spellcheck="false"`,
`inputmode="search"` и `enterkeyhint="search"`. Значение `one-time-code` допустимо
только для настоящего кода подтверждения и не используется как обходной способ
подавить credential autofill. Маркер `data-rf-autofill="off"` включает системный
best-effort opt-out: Core добавляет совместимые hints для распространённых password
managers и скрывает WebKit credential/contact affordance. Это не меняет данные и не
может отменить пользовательскую настройку Safari, который официально вправе
игнорировать `autocomplete="off"`. В auth-сценарии product явно задаёт
`autocomplete="username"`, `current-password` или `new-password`; сам TextField не
угадывает назначение поля, а `data-rf-autofill="off"` там запрещён. В модальном сценарии начальный focus остаётся внутри
dialog, но ставится на не вызывающий экранную клавиатуру элемент, а не на input.

`TextField` — один общий native input для `text`, `email`, `tel`, `number`,
`password` и остальных поддерживаемых браузером типов. Тип, `name`, `required`,
`autocomplete`, `inputmode` и другие стандартные атрибуты передаются самому
`<input>`; отдельные `LoginInput`, `EmailInput` или `PhoneInput` не создаются.
Сюда входят `pattern`, `min`/`max`, `minlength`/`maxlength`, `step`, `multiple`,
`accept` для соответствующих types, `autofocus`, `required`, `readonly`,
`disabled`, `value`/`defaultValue` в framework adapter и стандартные события.
`autofocus` сохраняется как native escape hatch, но по общему контракту не
используется в обычных страницах, поиске и auth-формах; исключение требует отдельного
решения для действительно одноцелевого экрана.

Password использует тот же TextField с `.rf-text-field--with-action` и существующий
`.rf-text-field__action`. Кнопка помечается `data-rf-password-toggle`, получает
локализованные подписи через `data-rf-password-show-label` и
`data-rf-password-hide-label`, а внутри использует системную `eye`/`eye-off`.
Core переключает native `type`, `aria-pressed`, подпись и иконку, не меняет value,
возвращает focus/selection в input и блокирует кнопку при disabled input.

```html
<div class="rf-text-field-group">
  <span class="rf-text-field__control">
    <input class="rf-text-field rf-text-field--with-action" id="password"
           type="password" autocomplete="current-password">
    <label class="rf-text-field__label" for="password">Пароль</label>
    <span class="rf-text-field__action">
      <button class="rf-icon-button rf-icon-button--tertiary" type="button"
              data-rf-password-toggle
              data-rf-password-show-label="Показать пароль"
              data-rf-password-hide-label="Скрыть пароль"
              aria-label="Показать пароль">
        <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="eye" aria-hidden="true"></span>
      </button>
    </span>
  </span>
</div>
```

## Card

Card — самостоятельный блок данных или действия, не синоним любого контейнера.

```text
Card
├── optional Header
├── Content
└── optional Footer
```

Header/Content/Footer являются slots, а не обязательной жёсткой разметкой. Обычная
Card может быть `article`/`section`. Interactive Card обязана быть настоящей ссылкой
или кнопкой, иметь keyboard focus и ровно одно основное действие; внутрь нельзя
вкладывать конкурирующие ссылки или buttons.
Interactive Card использует тот же semantic focus ring, что остальные Core actions.

## Counter

Beta Web API: `span.rf-counter` с вариантом `.rf-counter--brand` или
`.rf-counter--neutral`; внутри `.rf-counter__value`. Высота и минимальная ширина
20 px, padding 4 px, Body XS, tabular numerals, radius.full. Одна цифра круглая,
длинное число расширяет метку. Собственного действия, иконок и tab stop нет.
Count — неотрицательное целое; ноль отображается. Форматирование и порог принадлежат
потребителю: при `99+` визуальный span получает aria-hidden, точное число —
соседний `.rf-sr-only`. Контекст задаёт родительская подпись, нельзя дублировать
число в имени родительского действия и accessibility-поддереве одновременно.
`data-state="skeleton"` сохраняет ширину, скрывает содержимое; Counter получает
aria-hidden, внешняя обёртка — role=status, aria-busy и локализованное имя загрузки.
Нет hover/pressed/focused/disabled: метка не интерактивна.
Light/Dark и forced-colors поддерживаются canonical CSS; native adapters пока нет.
Миграция счётчика SegmentedControl и других потребителей — после визуального утверждения.

```html
<span role="status" aria-label="Загрузка количества" aria-busy="true">
  <span class="rf-counter rf-counter--brand" data-state="skeleton" aria-hidden="true">
    <span class="rf-counter__value">12</span>
  </span>
</span>
```

## Badge и Chip

Badge показывает короткий статус: `neutral`, `brand`, `info`, `success`, `warning`,
`error`, `brand-solid`, `brand-subtle`. Он не кликается, а смысл написан текстом и не зависит только от цвета.
Фон Neutral — `color.context.background.primary.default` в обеих темах;
цвет текста остаётся `color.context.text.primary.default`.
Размеры — `sm` и `md`, состояния — `default` и `skeleton`.
XXS и XS удалены; все прежние использования, включая метки ListingCard, переведены на S.
M сохраняет высоту 24 px и использует боковые отступы 12 px и Body S: текст
14 px / строка 18 px. S остаётся высотой 20 px с отступами 8 px и текстом
12/16 px.
Страница Catalog содержит Anatomy, Playground с Variant/State/Size/Label и изолированной Light/Dark темой,
а также восемь примеров из `examples/badge/` с Web-кодом. Общая обложка страницы
и карточки — неинтерактивный Brand Badge «Новое».
Start icon и End icon опциональны: `.rf-icon.rf-icon--xs[data-rf-icon-glyph]`
размером 12×12 px. Порядок — Start icon, `.rf-badge__label`,
End icon; иконки декоративны (`aria-hidden="true"`) и наследуют цвет метки.
Skeleton задаётся `data-state="skeleton"`: фон `component.badge.skeletonBackground`
ссылается на `color.context.background.skeleton.base`; скрытое содержимое сохраняет
геометрию, анимации нет. Контейнер получает `role="status"`, `aria-busy="true"`
и локализованный `aria-label`; содержимое — `aria-hidden="true"`. В Default эти
атрибуты контейнера снимаются. Badge не получает интерактивной семантики.

Chip имеет стабильный интерактивный контракт: локальный выбор использует
`aria-pressed`, а маршрутный фильтр — `aria-current`. Названия `Tag` и `Pill` не
создают новые components. Базовый фон невыбранного Chip использует
`color.context.background.primary.default`; hover и selected остаются отдельными
семантическими состояниями компонента.

Chip Catalog: Anatomy → Chip, Variant / State / Size / Label, изолированная
Light/Dark тема и три примера из `examples/chip/` с описанием и Web-кодом.
Variant: Primary (фирменная заливка), Secondary (нейтральный фон), Tertiary
(прозрачный фон и фирменный контур). Используются `.rf-chip--primary`,
`.rf-chip--secondary`, `.rf-chip--tertiary`; цвета соответствуют ролям Button.
Прежние Neutral/Filter/Selected/Removable удалены из Variant и примеров.
L — `.rf-chip--lg`, 40 px; M — `.rf-chip--md`, 32 px; S — `.rf-chip--sm`, 24 px.
Без модификатора `.rf-chip` сохраняет 40 px (L) для совместимости. На touch
невидимая область нажатия расширяется до 44 px без изменения видимой высоты;
потребитель оставляет между рядами место для этой области.
Hover/Pressed поддерживают `data-state` для демонстрации; Focused использует
реальный фокус, Disabled — нативный `disabled`. State содержит только Default,
Hover, Pressed, Focused, Disable, Skeleton. Состояние выбора, если оно нужно
продукту, задаётся отдельно через ARIA. Skeleton использует `component.chip.skeletonBackground`,
скрывает текст/иконки без изменения размера. Кнопка disabled и aria-hidden;
внешний контейнер получает role=status, aria-busy=true и имя загрузки.
Start icon и End icon опциональны, до/после `.rf-chip__label`. Каждый — публичный
Icon (`.rf-icon[data-rf-icon-glyph]`, `aria-hidden=true`) с цветом `inherit`.
L → Icon M (`rf-icon--md`, 24 px), M → Icon S (`rf-icon--sm`, 16 px),
S → Icon XS (`rf-icon--xs`, 12 px). Core синхронизирует геометрию вложенных Icon
с размером Chip; Playground позволяет включать оба слота и выбирать Glyph.
Слоты независимы от Variant, при его смене не включаются автоматически.
Продукт подключает обработчики выбора или удаления и соответствующую ARIA-семантику.
Catalog демонстрирует обычное нажатие без изменения данных. Старый Core-контракт
без явного варианта сохраняется для существующих потребителей. Lifecycle остаётся Beta.

## Alert

Variants: `info`, `success`, `warning`, `error`.

```text
Alert
├── Icon
├── Content
│   ├── Title
│   └── Body
└── optional Actions
```

Статический Alert не получает live role автоматически. Для динамического обычного
сообщения используется `role="status"`; `role="alert"` — только для срочной ошибки,
которую нужно объявить немедленно. Alert не исчезает автоматически.

## Slider

Slider — самостоятельный selection-компонент для приблизительного числового выбора
внутри границ `min`/`max`. Он не является вариантом Input или TextField: когда
пользователю нужно ввести точное число, используется `TextField type="number"`.
Нативный `<input type="range">` остаётся внутренней Web-анатомией Slider,
чтобы браузер сохранял клавиатурное управление, объявление текущего значения и
корректные semantics для assistive technologies.

```html
<div class="rf-text-field-group rf-slider-field" data-rf-slider>
  <span class="rf-slider-field__header">
    <label class="rf-text-field__label" for="quantity">Количество цветов</label>
    <output class="rf-slider-field__value" for="quantity"
            data-rf-slider-output>50</output>
  </span>
  <input class="rf-slider" id="quantity" type="range"
         min="0" max="100" step="1" value="50">
  <span class="rf-slider-field__limits" aria-hidden="true">
    <span>0</span><span>100</span>
  </span>
</div>
```

Публичный контракт принимает native `min`, `max`, `step`, `value`/`defaultValue`,
`disabled`, accessible name и события изменения. Текущее значение и подписи границ
опциональны; label или другое доступное имя обязательны. Arrow keys, Home и End
работают через native range semantics. Disabled используется редко и сопровождается
объяснением причины рядом с компонентом. Web Catalog показывает interactive
playground, значение, произвольный шаг и disabled-состояние отдельно от TextField.

Публичный Web API использует селекторы `.rf-slider*` и атрибуты
`data-rf-slider*`. Каноническое имя компонента в Registry и Catalog — `Slider`, а
старый маршрут `#components/range` перенаправляется на `#components/slider`.

## SegmentedControl

SegmentedControl выбирает ровно один режим из небольшого набора. Stable Web variant
строится из нативной radio group с `fieldset`/`legend`; custom button presentation
обязана реализовать pressed/radio semantics и keyboard contract.

Размер `md` используется по умолчанию, `sm` задаётся через
`.rf-segmented-control--sm`; на touch-устройствах оба сохраняют minimum target 44px.
Selected, disabled и focus состояния остаются различимыми в Forced Colors.
Основная подложка компонента использует
`component.segmentedControl.background`, привязанный к
`color.context.background.primary.default`.
Выбранный сегмент использует `component.segmentedControl.selectedBackground`,
привязанный к brand background role, и парный inverse text token; feature-слой не
переопределяет его цвет локально.
Core гарантирует обязательный single selection: если потребитель не передал выбранный
вариант, автоматически выбирается первый доступный; если ошибочно выбрано несколько,
сохраняется первый. Product-экран отвечает только за предпочтительное начальное
значение по своим данным. Для custom button presentation используются
`data-rf-segmented-control` и `data-rf-segmented-value` с `aria-pressed`.
Внутри native-radio presentation все доступные варианты получают равную долю ширины
контейнера, а label заполняет её целиком. Поэтому длинный текст одного варианта не
сжимает соседние сегменты; ширину самого контрола по-прежнему задаёт композиция.
Опциональный счётчик размещается внутри label через
`.rf-segmented-control__count`. Он показывает количество результатов, не является
отдельным действием и автоматически меняет фон и текст вместе с selected-состоянием.
Однозначное значение остаётся круглым, а для двух и более цифр счётчик расширяется
в капсулу за счёт системного `countPaddingInline`, не сжимая сами цифры.

Он не заменяет Tabs: если controls показывают связанные `tabpanel`, используйте Tabs.
Если переходят по адресам, используйте Navigation/Link с `aria-current`.
Страница `SegmentedControl` в Web Catalog содержит живой playground для размеров и
disabled-состояния, а также постоянную state matrix; оба примера используют
каноническую native-radio анатомию и Core CSS.

## Breadcrumbs

Breadcrumbs показывает положение текущей страницы в иерархии и не заменяет
NavigationBar, Tabs или Back в компактном заголовке. Web-анатомия начинается с
именованного `nav` и содержит ordered list. Все родительские уровни остаются
нативными ссылками, а текущая страница выводится обычным текстом с
`aria-current="page"`.

```html
<nav class="rf-breadcrumbs" aria-label="Хлебные крошки">
  <ol class="rf-breadcrumbs__list">
    <li class="rf-breadcrumbs__item">
      <a class="rf-breadcrumbs__link" href="/">Главная</a>
    </li>
    <li class="rf-breadcrumbs__item">
      <span class="rf-breadcrumbs__separator" aria-hidden="true">
        <span class="rf-icon rf-icon--sm" data-rf-icon-glyph="chevron-right"></span>
      </span>
      <span class="rf-breadcrumbs__current" aria-current="page">Breadcrumbs</span>
    </li>
  </ol>
</nav>
```

Варианты `default` и `supporting` меняют только визуальный приоритет. Размеры
`md` и `sm` используют системные typography tokens. Опциональные Home и Chevron
выводятся только через Icon. Рекомендуется не больше пяти видимых уровней; длинный
путь сокращается явным `.rf-breadcrumbs__collapsed`. Этот элемент не открывает
меню сам по себе: интерактивное раскрытие отдельно композируется с Dropdown.

## FilterBar

FilterBar объединяет несколько уже существующих controls в одну именованную область
фильтрации. Pattern не хранит query, URL, выбранный город или продуктовые варианты:
эти данные и обработчики остаются в feature. На серверных страницах route filters
остаются `Link` с `href` и `aria-current`; локальный взаимоисключающий режим может
использовать `SegmentedControl`; независимые условия — `Chip`, Dropdown в режиме
`selection` или
`TextField` с вариантом `search`.

```text
FilterBar
├── accessible heading or group name
├── Controls
│   └── one or more named Groups
├── optional Active filters
│   └── optional Clear action
└── Meta
    └── live Results status
```

Варианты `inline`, `stacked` и `collapsible` меняют только компоновку. Состояния
`default`, `filtered`, `loading` и `disabled` выражаются реальными состояниями
вложенных controls; `aria-busy="true"` ставится на весь pattern, а изменение числа
результатов объявляет `.rf-filter-bar__status` через подходящий live region.
Вертикальный ритм между Controls, Active filters и Meta равен системным `8px`
(`spacing.8`), поэтому счётчик результатов не отделяется от фильтров произвольным
feature-отступом.
Компактные подписи фильтров используют публичный стиль `Body S` через
`.rf-filter-bar__label`. Выбранное состояние меняет цвет и поверхность, но не
подменяет типографический стиль или насыщенность текста.
Collapsible-вариант строится нативным `details/summary`, поэтому закрытые filters
остаются доступны клавиатуре без отдельного JavaScript controller.

FilterBar имеет статус beta после повторного production-применения на route-based
фильтрах Admin. Route-ссылки используют `Chip` с `aria-current="page"`; локальные
действия остаются native button с `aria-pressed`. Каталог показывает интерактивный
playground и матрицу inline/filtered, stacked/loading и collapsible состояний.

## Thumbnail и CardList

`Thumbnail` фиксирует геометрию превью и состояния `loading`, `loaded`, `error` и
`empty`; смысловой `alt` передаёт feature, а повтор изображения карточки остаётся
декоративным. `CardList` задаёт семантический list/grid container, стабильный порядок
чтения и общий state slot, но не владеет pagination API или данными карточек.
`grid` использует `auto-fill`, поэтому неполная последняя строка сохраняет ширину
колонок и единственная карточка не растягивается на весь контейнер. `compactGrid`
фиксирует две равные колонки: мобильная витрина не переключается на три колонки на
широких iPhone, а одиночная карточка занимает одну из двух колонок.

`adaptiveGrid` — отдельный experimental вариант на визуальном согласовании: две
колонки на узком контейнере, три от 632 px, четыре от 848 px; gap 16 px,
максимальная ширина 1040 px. `auto-fill` сохраняет пустые ячейки последней строки.
`rf-card-list-container` задаёт такой же предел и центрирование для соседних секций.
Карточка внутри адаптивной сетки заполняет ячейку, не получает отдельный max-width.
Существующий `compactGrid` и production Mini App пока не меняются.

## AttributeCard

`AttributeCard` — beta-компонент для одной краткой характеристики или свойства.
Внешняя сетка решает, будет карточка компактной или займёт всю строку; сам компонент
сохраняет одну анатомию:

```text
AttributeCard
├── Meta
│   ├── decorative Icon · 24px
│   └── Label · body-small / secondary
└── Value · label-large / primary
```

DOM всегда читает label раньше value. Иконка не заменяет подпись и получает
`aria-hidden`; длинные label/value переносятся без обрезания. Product передаёт
локализованную подпись и значение, но не меняет фон, радиус, внутренние отступы,
типографику или размер иконки feature-CSS. Первый production use case — размер,
свежесть, локация и участник сделки в Listing Detail Bottom Sheet Mini App.

## ConfirmationDialog

ConfirmationDialog — композиция `Dialog + Text + Button` для рискованного действия.
В Web безопасное начальное действие получает фокус первым; в Telegram Mini App
adapter сначала использует `showConfirm`, а при его отсутствии открывает канонический
Web dialog. Product передаёт локализованное последствие и обработчик подтверждения.

## Skeleton

Variants reference: `block`, `text`, `media`, `fill`, `avatar`; `fill` занимает
весь заранее зарезервированный media-slot, а card/list skeletons собираются
композицией этих форм. Сам Skeleton всегда `aria-hidden="true"`; родительский loading region
получает `aria-busy="true"` и один доступный текст. При `prefers-reduced-motion`
анимация фактически отключается системным reduced duration.

## EmptyState

```text
EmptyState
├── optional Icon/Image
├── Title
├── Description
└── optional Actions
```

Варианты `firstUse`, `noResults`, `noAccess` задаются copy и composition, а не
случайными цветами. EmptyState сам не получает `alert`. Если он динамически заменяет скелетон загрузки,
внешняя область управляет `aria-live`.

`hidden` — обязательное системное состояние для EmptyState и ErrorState. Native-атрибут полностью исключает state из layout; компонент нельзя
оставлять рядом с уже отрисованными данными. Feature переключает только `hidden`,
а системный CSS гарантирует, что внутренний flex layout его не переопределит.

ErrorState — pattern того же композиционного уровня, а не новые form
controls.

## Switch

`Switch` — Stable Web component: один вариант `default`, размеры
`lg` / `md` / `sm` (L / M / S), состояния `default`, `hover`, `pressed`,
`focused` (Focussed в Catalog), `disabled`, `skeleton`. Off/On — значение, не State.
Дорожки L/M/S: 56×32 / 40×24 / 24×16 px; круглые ползунки 28/20/12 px,
равномерный отступ 2 px. Область нажатия всегда не меньше 44×44 px.
Off — `selectionControl.border` в Default/Focussed, `color.context.border.primary.hover`
в Hover и `color.context.border.primary.default` в Pressed; On — Brand.
Disabled и Skeleton не наследуют интерактивные фоны Off.
Используется существующая анатомия
`.rf-switch` → `.rf-switch__control` → `input.rf-switch__input` +
`.rf-switch__track`; бегунок — псевдоэлемент track. Встроенного Label нет:
обязателен `aria-label` либо `aria-labelledby` на input, видимое имя принадлежит
контексту настройки. `.rf-switch--lg` / `--md` / `--sm` задают размер, без класса — M.
Native checkbox получает `role="switch"`; источником значения является `checked`,
а не дублирующий `aria-checked`. Space переключает значение, Tab показывает focus;
disabled не меняет значение и исключается из Tab-порядка. Сохранением настройки
владеет продукт, Catalog не выполняет внешних действий.

Страница `#components/switch` содержит Anatomy и Switch, локальный Light/Dark
preview, Value, State и Size. Hover/Pressed/Focused работают нативно;
`data-state` фиксирует их визуальный preview, не заменяя настоящий keyboard focus.
Disabled определяется атрибутом `disabled` на input. Skeleton дополнительно
скрывает input через `aria-hidden`, контейнер получает `role="status"`,
`aria-label="Загрузка настройки"`, `aria-busy="true"`; состояние не переключается.
Skeleton статичен, не показывает неизвестное значение. Два примера Off и On
используют один канонический исходник
`examples/switch/default.html`, зарегистрированный в `code-examples.json`.
Hover, Pressed, Focussed, Disabled (Off/On) и Skeleton доступны в Playground,
без отдельных карточек в Examples.
React/native adapters не добавлены. После утверждения владельца Switch и Badge
синхронизированы генератором в локальные публичные Core-копии Admin, Mini App и
Landing. Это не означает публикацию сервисов в production.

## Checkbox

Checkbox и Radio поддерживают независимый флаг Error: `aria-invalid="true"`
на native input, `aria-describedby` на сообщение проверки. Error не входит в
список State и не меняет Value. Disabled/Skeleton имеют приоритет над ошибкой;
при возвращении в интерактивное состояние потребитель восстанавливает флаг.

`Checkbox` — Stable Web component, визуальный результат утверждён владельцем.
Публичная анатомия: `label.rf-choice.rf-choice--md`, `.rf-choice__control`, нативный
`input.rf-choice__input[type=checkbox]` и декоративные Icon. Контрол — 24×24 px,
радиус 8 px, кликабельная область label — минимум 44×44 px. Встроенного Label нет;
`aria-label` или `aria-labelledby` обязательны. Галочка — `checkbox-check / Line`
из SVG владельца, промежуточная отметка — `minus / Line`.

Value: Unchecked, Checked, Indeterminate; State: Default, Hover, Pressed, Focused,
Disable (нативный disabled), Skeleton. Space меняет значение; Tab показывает
настоящий focus-visible одним контуром. Indeterminate задаётся DOM-свойством
`input.indeterminate = true`; нативное нажатие снимает промежуточное значение.
Disable сохраняет значение и приглушённый контур; Skeleton скрывает отметки,
блокирует input и сообщает загрузку через внешний role=status / aria-busy.
В forced-colors используется нативный control. Темы Light/Dark проверяются в
Playground, каждый Value имеет отдельный copy-ready пример HTML/JS.

Mobile использует тот же Web Core: touch target 44×44 px, touch и аппаратная
клавиатура; отдельные React/iOS/Android adapters не заявлены. Старый native input
без `.rf-choice__control` остаётся совместимым. Stable означает готовность API;
не означает миграцию всех legacy-применений или публикацию текущего локального пакета.

## Beta reference components и patterns

Web reference уже позволяет проверить, но ещё не обещает как stable:

- Radio;
- Link, Chip, Avatar, ListItem;
- Tabs;
- Spinner, Progress и Toast;
- Accordion.

`Avatar` использует базовую label-типографику для `XS/SM/MD`, а крупные fallback
`LG/XL` — публичные `Headline XS/S`. Поэтому буквенный fallback масштабируется вместе
с контейнером и не требует локального `font-size` в продукте. Все пять размеров
показаны рядом в Catalog.

Stable pattern `NavigationBar` использует общий root `.rf-navigation-bar`, варианты
`--top`, `--bottom`, `--sidebar` и item `.rf-navigation-bar__item`. Текущий раздел
обозначается только `aria-current="page"`; disabled item использует native
`disabled` или `aria-disabled="true"`, а native `hidden` всегда исключает пункт из
layout, включая скрытые по роли разделы. Top-вариант распределяет основные разделы
по доступной ширине, bottom учитывает safe area, sidebar сохраняет вертикальный
порядок. Старые имена `.rf-bottom-navigation*` остаются совместимым мостом, но не
создают отдельного canonical имени BottomNavigation. Подпись пункта использует
component token `navigation.textStyle` на базе `body-small` с regular-начертанием.
Фон контейнера использует semantic token `color.context.background.primary.default`,
а выбранный пункт — `color.context.background.brand.default` с inverse-текстом.
В Mini App все пиктограммы навигации берутся из явных `*-filled` glyphs;
selected-состояние меняет только semantic-цвет и `aria-current`, но не дорисовывает
fill в feature CSS.
Горизонтальные Tabs используют только Left/Right, вертикальные — Up/Down при явном
`aria-orientation="vertical"`; текстовая `tabpanel` получает `tabindex="0"`, чтобы
следующий Tab-переход не пропускал её содержимое. Core также инициализирует один раз
`[data-rf-tabs]`, добавленные после загрузки страницы: Catalog может рендерить вкладки
по route без локального контроллера и без повторных обработчиков.

Перед первым production-переносом каждого beta component обновите registry status,
закройте его accessibility contract тестом и проведите visual QA в целевой
поверхности.

## Experimental overlays

Dialog и BottomSheet представлены работающими reference-примерами, но остаются
`experimental`. Dropdown завершил production-пилоты selection/actions в Admin и
selection в Mini App и переведён в `stable`. Нативный Web `<dialog>` обеспечивает
базовый focus trap и
Escape; production contract ещё должен согласовать:

```text
BottomSheet
├── Grip · decorative
├── Header
│   ├── Title region · title + optional subtitle
│   └── visible Close action
├── optional Scroll
│   └── Body
└── optional Footer
    ├── Actions
    └── optional Hint
```

`ListingDetailSheet` и `PromotionSheet` Mini App используют эту общую анатомию.
Фото, характеристики, платные услуги и обработчики остаются feature content. Core
владеет `.rf-bottom-sheet-backdrop`, геометрией и слоями поверхности, её видимостью,
внутренними зонами, safe-area, elevation и видимым действием закрытия.

- focus return и начальный focus;
- inert/scroll lock и связью backdrop с accessibility tree;
- вложенность и очередь overlays;
- Telegram Back Button и safe area;
- iOS/Android native presentations.

Feature-controller по-прежнему отвечает за эти behavior-состояния; визуальная
реализация BottomSheet в Mini App полностью использует публичный Core API.

Полный design review и exit criteria для BottomSheet зафиксированы в
[`../../docs/design-system/BOTTOM_SHEET_CONTRACT.md`](../../docs/design-system/BOTTOM_SHEET_CONTRACT.md).
Текущий вывод: общая modal presentation возможна, Telegram требует отдельного host
adapter, а product data/actions/controller нельзя переносить в generic Core.

## Web / Mobile parity

| Shared concept | Web | Mobile |
| --- | --- | --- |
| Button | hover, focus-visible, Enter/Space | pressed, touch target, optional haptic |
| TextField | label, keyboard, autocomplete, validation | native keyboard/input mode, no forced Web focus behavior |
| SegmentedControl | radio/pressed semantics | native segmented control when it gives better UX |
| Dialog | native dialog/focus controller | native modal/sheet and platform back gesture |
| BottomSheet | narrow-screen dialog presentation | native sheet with safe area and gestures |
| Tabs | tablist keyboard model | native pager/tab behavior where appropriate |
| Toast | live region and queue | native announcement and safe-area placement |

Brand, semantic hierarchy, tokens, typography, spacing and terminology остаются
общими. Interaction не обязан выглядеть и работать буквально одинаково.

## Definition of Done

Component готов к `stable`, только если:

- зарегистрирован под одним PascalCase canonical name;
- использует semantic/component tokens без произвольных visual values;
- variants, sizes, states, anatomy и dependencies документированы;
- Web implementation и Mobile strategy определены;
- keyboard, focus, screen reader, touch target, contrast, disabled/error semantics
  проверены;
- есть пример в каталоге и автоматические tests;
- отсутствует компонент-синоним;
- wiki и migration map обновлены;
- полный release gate проходит без пропусков.

## Отказ от Surface

Surface имеет статус `deprecated`: новое использование запрещено. Для самостоятельного
блока содержимого используется Card, для overlay и навигации — соответствующий Core
component. Card не является универсальной обёрткой для любого фона. Фон страницы или
обычной секции задаётся через `color.context.background.*` вместе с подходящей
`color.context.text.*`; ширина страницы — по Foundation Grid, внутреннее расположение — через Stack и Inline. Продукт не
переопределяет оформление готового компонента. Тени остаются ответственностью Core.

Совместимые `.rf-surface*` пока сохранены для существующего Mini App. Зависимости
Registry больше не предписывают Surface новым компонентам. Перед удалением CSS
необходимо согласовать замены в Catalog и мигрировать существующие применения.

## Container перенесён в Foundation Grid

Container удалён из Component Registry. Ширина, центрирование и внешние поля
страницы описаны в FOUNDATIONS.md → Grid и показаны в Catalog → Foundation → Grid.
Старый маршрут `#primitives/container` перенаправляет в `#foundations/grid`.
Совместимый `.rf-container` сохранён без изменения геометрии Mini App и Landing.

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
