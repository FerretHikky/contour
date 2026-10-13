# Как расширять Design System Contour

Эти правила обязательны и для человека, и для AI coding agent. Их цель — сначала
переиспользовать существующую систему и только затем добавлять новую общую часть.

## Непереставляемый порядок изменений

Design System является источником правды. Изменение общего визуального или
интерактивного контракта всегда проходит только в таком порядке:

```text
canonical Design System source
       -> Registry + Catalog states
       -> утверждение владельца
       -> generation + component/browser checks
       -> product adapter / feature consumption
       -> удаление локального legacy-дубля
```

Нельзя использовать уже написанный product override как мастер и копировать его в
Core. Реальный продукт может дать use case и выявить gap, но решение этого gap сначала
проектируется в canonical tokens/components/patterns. До утверждения продукт продолжает
использовать прежний контракт либо отдельный локальный preview в `design/`, но не
получает временный production-style override.

Это правило относится к анатомии, вариантам, states, responsive behavior,
accessibility, цветам, типографике, размерам, отступам, радиусам, теням, иконкам и
анимации общих элементов. Данные, API-вызовы, локализованный copy, маршрутизация и
бизнес-сценарий остаются ответственностью feature и не переносятся в Core.

## Перед началом

1. Прочитайте [`README.md`](README.md), [`FOUNDATIONS.md`](FOUNDATIONS.md),
   [`COMPONENTS.md`](COMPONENTS.md), machine-readable
   [`component-registry.json`](component-registry.json) и
   [`COMPONENT_INVENTORY.md`](../../docs/design-system/COMPONENT_INVENTORY.md).
2. Посмотрите живые примеры в [`web/catalog.html`](web/catalog.html).
3. Найдите похожий экран, сценарий, компонент и состояние в `design/` и
   `services/`. Ищите не только по имени, но и по назначению: «подтвердить»,
   «поиск», «ошибка», «пустой список», «выбрать значение».
4. Для изменения существующего интерфейса проверьте его legacy-ограничения в
   [`DESIGN_SYSTEM_AUDIT.md`](DESIGN_SYSTEM_AUDIT.md). Не начинайте массовую
   миграцию вместе с одной новой функцией.

Сначала проверьте lifecycle в registry. `stable` пригоден для повторного feature-
использования. `beta` требует проверки в целевой поверхности. `experimental` нельзя
считать готовым production API. `deprecated` запрещён для нового кода и всегда
указывает replacement.

До написания нового UI нужно пройти поиск в таком порядке:

```text
существующий Component
       -> существующий Pattern
       -> существующие Primitives
       -> Context color tokens / Core component API
       -> composition
       -> variant
       -> новый reusable Component или Pattern
```

Если задачу решает ранний пункт, следующий не нужен.

## Миграция существующего экрана

Legacy-экран переносится небольшим вертикальным срезом и всегда проходит следующие
шесть этапов в указанном порядке:

1. **Decomposing** — разложите экран на feature components, patterns, Core
   components, primitives и tokens; отдельно перечислите состояния и платформенные
   ограничения.
2. **Reuse** — сопоставьте каждую часть с существующим registry и используйте готовый
   API с его семантикой, состояниями и accessibility-контрактом.
3. **Gap analysis** — до изменения общего слоя запишите, чего действительно не
   хватает, и классифицируйте потребность как API defect, composition, variant,
   pattern или product-specific feature.
4. **Composition** — сначала соедините готовые элементы. Feature wrapper может
   управлять данными, layout и сценарием, но не дублирует Button, Field, Card или
   другую базовую presentation.
5. **Variant** — расширяйте существующий component только при неизменных назначении,
   структуре и accessibility-контракте. Вариант не создаётся ради одного случайного
   размера или цвета.
6. **New component only as a last option** — новый общий component или pattern
   появляется только после подтверждённого повторения, platform-neutral контракта и
   доказательства, что composition/variant задачу не решают.

До реализации зафиксируйте decomposition и gap table. После реализации обновите их
фактическим результатом, удалённым legacy debt и найденными API-проблемами. Если
пилот выявил дефект обещанного Core-состояния, исправьте canonical implementation и
пересоберите service adapters; локальный override в feature не считается миграцией.
Product-specific сущности остаются в feature даже тогда, когда их разметка сложная.
Статус registry не повышается автоматически из-за одного успешного экрана.

## Процесс добавления UI

### 1. Опишите задачу, а не внешний вид

Зафиксируйте, что делает пользователь, на каких поверхностях работает решение и
какие состояния нужны. «Красная маленькая кнопка» — не задача. «Опасное удаление,
которое требует подтверждения» — задача, для которой уже может существовать
`Button` с `destructive` variant и pattern подтверждения.

Определите минимум:

- основное и вторичное действие;
- default, hover, pressed, focused, disabled и loading, если они применимы;
- empty, error, success и offline/повтор, если их может увидеть пользователь;
- поведение клавиатуры, screen reader и touch;
- светлую и тёмную темы;
- узкий экран, Telegram WebView, safe area и системную клавиатуру, если это Mini
  App.

### 2. Используйте существующую композицию

Собирайте UI из задокументированных primitives и components. Pattern не копирует
внутренний CSS Button/TextField/Card, а соединяет их и задаёт порядок действий.

Feature-specific wrapper допустим, если он содержит только продуктовые данные,
layout и поведение сценария. Он не должен становиться ещё одной локальной UI-
библиотекой.

### 3. Выберите composition, variant или новый компонент

Используйте **composition**, когда меняется только сочетание готовых частей:
например, Card + Stack + Text + Button. Для такого случая новый Card не нужен.

Добавьте **variant существующего компонента**, когда сохраняются его:

- назначение и HTML-семантика;
- внутренняя структура;
- взаимодействие и accessibility-контракт;
- состояния и ожидаемое поведение.

Variant должен быть конечным и понятным, например `variant="destructive"` или
класс `rf-button--danger`. Не создавайте API из десятков булевых флагов вроде
`red`, `rounded`, `small`, `withBorder`.

Создайте **новый reusable component**, только когда у элемента отдельные семантика,
структура или интерактивный/a11y-контракт и он нужен более чем в одном подтверждённом
контексте. Одного небольшого визуального отличия недостаточно.

Создайте **pattern**, когда повторяется целый пользовательский фрагмент из нескольких
components: SearchBar, ErrorState, FilterBar, ActionSheet, ConfirmationDialog.
Одноразовый сценарий остаётся feature composition до появления повторного случая.

Не создавайте primitive «на будущее». Новый primitive оправдан только тогда, когда
он выражает минимальное платформонезависимое правило и реально упрощает несколько
components.

### 4. Сначала измените визуальный мастер

Любое новое визуальное решение сначала фиксируется в `design/design-system/` или в
другом подходящем мастер-каталоге `design/` и показывается владельцу. Для Web:

1. добавьте или измените canonical tokens;
2. соберите решение из `web/primitives.css` и `web/components.css`;
3. интерактивную логику добавляйте только в `web/runtime/*.ts`, а не в generated
   `web/core-ui.js` или `web/catalog.js`;
4. покажите все состояния в `web/catalog.html`;
5. проверьте light/dark, narrow/wide, keyboard и reduced motion;
6. после утверждения синхронно перенесите утверждённый контракт в нужные сервисы.

Не начинайте с локального CSS внутри feature, чтобы потом «когда-нибудь» вынести его
в систему. Не подключайте component CSS в production-сервис произвольной ручной
копией: у независимых `git subtree` должен быть понятный и проверяемый способ
доставки.

### 5. Работайте с токенами по слоям

Канонический источник — `design/design-system/tokens/`.

- Новый цвет начинается с seed шага `5` в `color-primitives.json`; генератор строит
  остальные непрозрачные шаги `0…10`. Ручная параллельная ramp запрещена.
- Новая числовая ступень получает Alias сразу в Light и Dark с одинаковым
  именем и обратным mapping. Только Alias Overlay хранит прямой RGBA.
- Новое место применения или состояние получает общий Context token в
  `context.json`, который ссылается только на Alias.
- Решение конкретного компонента получает Component token, который ссылается на
  Context/foundation role.
- Продуктовый CSS использует только `color.context.*`: это единственный публичный
  color API. Primitive, Alias и Static — внутренние authoring/trace-слои, а
  color Component tokens — внутренняя реализация Core-компонентов поверх Context.
- Абсолютные black/white добавляются в Static только для действительно неизменяемого
  технического случая, а не вместо выбора Context-роли.
- Новый размер сначала сверяется с exact `dimension.*` Primitive set в
  `foundations.json`. Публичные параметры `spacing.*`, `radius.*` и
  `border.width.*` содержат только полные aliases на `dimension.*`, никогда raw
  px. Component dimension tokens напрямую ссылаются на один из этих параметров
  или на `opacity.*`, без промежуточных Role-групп.
- `spacing.*` — единая размерная шкала для CSS-свойств: она применяется не только
  к padding/gap, но и к width/height, min/max constraints, hit area и размеру
  иконки. Удалённые namespaces `sizing.*`, `layout.*`, `control.*`,
  `touchTarget.*` и `icon.size.*` не имеют compatibility aliases и не должны
  появляться в новых токенах, CSS или документации.
- Dimension использует только целые значения. Удалённый `dimension.1-5` остаётся
  только CSS-совместимостью и перенаправляется на `dimension.2`; новые дробные
  размеры добавлять нельзя.
- Новый spacing называется фактическим значением (`spacing.24 = 24px`). Старый
  индексный `space.*` — только compatibility API и не расширяется. Продуктовый CSS
  не использует ни `space.*`, ни raw `dimension.*`: он получает размер через
  property parameter или Component contract.
- `opacity.*` — единственный числовой источник прозрачности. Theme-aware
  `color.alias.overlay.*` остаётся отдельным RGBA-контрактом для цветных слоёв;
  число opacity и цвет Overlay нельзя смешивать.

Не добавляйте token только для замены одного случайного числа. Сначала проверьте
существующую шкалу и смысловую роль. Новый token должен иметь понятное имя,
документированное назначение и возможность переноса на Web/iOS/Android.

После изменения JSON обязательно запустите генератор. Он проверяет полноту color
ramps, exact Dimension/Opacity sets, отсутствие raw Semantic foundations, alpha,
Light/Dark inversion и каждый разрешённый переход alias graph. Generated CSS,
TypeScript, manifests, resolved JSON, compatibility-файлы и service-копии вручную
не редактируются.

Любое переименование или объединение опубликованного color token сначала
описывается в `token-migrations.json`. Запись обязана содержать старый и новый ID,
каналы совместимости, `deprecatedIn`, `removeIn`, причину и статус. Генератор сам
строит CSS aliases и Catalog deep-link lookup; параллельная hardcoded-таблица в
Python, JavaScript или документации запрещена. Replacement должен существовать в
canonical graph, старый ID — отсутствовать в нём, а удаление compatibility bridge
допускается только в объявленной major-версии.

### 6. Реализуйте полный контракт состояний

Для каждого нового или изменённого интерактивного компонента одновременно
реализуются применимые состояния:

- default;
- hover;
- pressed/active;
- focus-visible;
- disabled;
- loading с `aria-busy` и защитой от повторного действия;
- invalid/error с понятным сообщением;
- selected/expanded, если компонент выбирает или раскрывает содержимое.

Состояние не должно различаться только цветом. Loading, error, success и disabled
должны быть понятны без анимации. Component API явно описывает `variant`, `size` и
state, а недопустимые сочетания не перекладываются на feature.

### 7. Проверьте accessibility как часть API

До завершения работы проверьте:

- правильный HTML-элемент и доступное имя;
- управление клавиатурой и видимый focus;
- `label`, `aria-describedby`, `aria-invalid`, `aria-expanded`, `aria-busy` и другие
  атрибуты по смыслу, а не для формального наличия;
- контраст текста не ниже 4.5:1 и интерфейсной графики/focus не ниже 3:1;
- touch target не меньше `spacing.44` (`44px`) либо более крупного значения,
  закреплённого Component-контрактом;
- декоративные иконки скрыты от screen reader, icon-only кнопки имеют `aria-label`;
- корректное поведение при `prefers-reduced-motion` и forced colors;
- loading, empty и error не оставляют пользователя без следующего действия.

Платформенный adapter может реализовать эти правила иначе, но не может убрать их.

### 8. Локализуйте продуктовый текст

Компонент не хранит продуктовую фразу внутри себя: label, hint, error, empty text и
accessibility-текст передаёт feature.

Любой новый видимый текст или accessibility-текст в Telegram Bot и Mini App сразу
добавляется на русский (`ru`), английский (`en`), кыргызский (`ky`) и узбекский
(`uz`). Во всех языках должны совпадать ключи и плейсхолдеры. Если новая поверхность
ещё не покрыта проверкой, расширьте `tests/test_i18n.py` в том же изменении.

Данные пользователя и канонические значения базы не переводятся. Текст автора
объявления или рассылки не становится системной строкой.

### 9. Обновите документацию, каталог и тесты

В одном изменении с кодом:

- опишите API, variants, sizes, states, composition и ограничения в
  `COMPONENTS.md` или соответствующем документе;
- добавьте или обновите запись в `component-registry.json`; статус повышается только
  после выполнения Definition of Done, а deprecated запись указывает replacement;
- добавьте реалистичный пример каждого важного состояния в `web/catalog.html`;
- добавьте или обновите автоматические проверки токенов, CSS variables, иконок,
  accessibility-контрактов и generated outputs;
- обновите затронутую страницу живой вики `docs/*.md`;
- обновите тест обязательного сценария, если изменился один из его шагов.

Пример в каталоге — часть контракта, но не замена тесту. Документ без работающего
примера и component без описанного API считаются незавершёнными.

### 10. Запустите проверки

Из корня репозитория:

```bash
python3 design/design-system/scripts/build_web_runtime.py
python3 design/design-system/scripts/build_tokens.py
python3 scripts/design_system_check.py --static
RUN_BROWSER_E2E=1 python3 scripts/design_system_check.py
```

Первые две команды нужны только после изменения canonical source. `--static` — быстрый
локальный/CI gate. Browser-вариант обязателен перед release и падает, если хотя бы
один Design System browser suite пропущен.

Если менялись строки Bot или Mini App, отдельно проверьте локализации:

```bash
PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s tests -p 'test_i18n.py'
```

После любого значимого изменения кода, интерфейса, базы, прав или конфигурации
обязательно запустите полный контур Contour:

```bash
./scripts/verify-release.sh
```

Пропущенный или упавший обязательный сценарий нельзя объявлять не связанным с UI и
обходить. Ошибка должна быть исправлена либо честно указана владельцу как блокер.

## Lifecycle и promotion evidence

Разрешённая последовательность общего API:

```text
experimental → beta → stable → deprecated
```

Один production screen не повышает status автоматически. Переход выполняется
отдельным review и одновременно обновляет registry, документацию, catalog и tests.
Пропуск стадии допустим только для исправления критической safety/accessibility-
ошибки с явным объяснением; он не используется для ускорения feature delivery.

### `experimental → beta`

- назначение, canonical name и граница Core/feature согласованы;
- есть reference implementation и platform strategy;
- public anatomy/state vocabulary описаны;
- основные keyboard и accessibility risks закрыты contract tests;
- нерешённые вопросы явно перечислены, API ещё может измениться.

### `beta → stable`

- есть минимум два независимых production use case, а не два варианта одного
  экрана;
- интеграции не обходят API feature-specific override или параллельным controller;
- default/hover/pressed/focus/disabled/loading/error и другие применимые states
  покрыты;
- доступны documentation, canonical implementation, contract/accessibility tests и
  high-value Light/Dark visual regression;
- Web и Mobile behavior определены; platform difference не скрывает отсутствующий
  обязательный contract;
- миграционное evidence не содержит незакрытого high-severity gap.

Stable component не может зависеть от `experimental`: сначала стабилизируется
dependency или composition меняется. `deprecated` всегда содержит существующий
не-deprecated replacement и migration note; новое использование запрещено.

## Pattern evidence, а не автоматическое создание

После пилота остаются четыре кандидата. Они зарегистрированы как evidence, но не
promoted:

| Candidate | Подтверждённый use case A | Независимый use case B | Решение сейчас |
| --- | --- | --- | --- |
| FilterBar | Mini App CatalogFilters | Admin management route filters | pattern review завершён / registry beta |
| CardList | Mini App CatalogGrid | отсутствует | feature composition / registry experimental |
| StandaloneFormLayout | Admin Login | отсутствует | feature composition, записи component нет |
| FullscreenSettingsFlow | Mini App ProfileSettingsFlow | отсутствует | feature composition, записи component нет |

План, mockup и второй mode внутри того же feature не считаются независимым evidence.
После второго реального случая review выбирает одно из двух решений: оставить
product composition или зарегистрировать общий Pattern. Название кандидата само по
себе не создаёт public API.

## Технические запреты

В новом или изменяемом UI нельзя:

- добавлять произвольные `hex`, `rgb()`, `hsl()` и другие локальные цвета;
- добавлять произвольные `font-size`, `font-weight`, `line-height` и
  `letter-spacing`;
- добавлять случайные margin, padding, gap, размеры, radius, border, shadow,
  animation duration, z-index и глобальные breakpoints;
- использовать Primitive или Alias color там, где должна быть Context role;
- создавать feature-specific копии Button, TextField, Card или другого общего
  компонента;
- обходить компонент Icon: вставлять SVG, загружать исходники/JSON Glyph напрямую,
  вызывать внутренний renderer либо добавлять `data-lucide`/`ContourIcons`;
- ссылаться на имя иконки, которого нет в мастер-реестре;
- вручную исправлять `generated/`, `design/brand/` outputs или service-копии;
- добавлять framework-зависимые значения в foundations;
- скрывать различия тем внутри component code вместо Alias → Context chain;
- создавать component API из набора несвязанных булевых флагов;
- повышать `legacy-baseline.json` только для прохождения линтера;
- смешивать массовую legacy-миграцию с реализацией одной функции.

Исключение возможно для настоящего платформенного контракта, данных, геометрии,
которая вычисляется из содержимого, или отдельного брендового/иллюстративного
ассета. Оно регистрируется в `lint-exceptions.json` с точными `rule`, repo-relative
`path`, диапазоном не шире 25 строк, literal `match`, малым `maxOccurrences`, reason,
owner и review condition. Непосредственно перед literal нужна
`/* ds-lint-exception: exact-id */`; annotation действует максимум через две строки.
Wildcard/global ignore, stale entry, неизвестная annotation и выход за scope
завершают lint ошибкой. Исключение не превращает случайное значение в новый token.

## Как работает legacy ratchet

[`scripts/lint_ui_values.py`](scripts/lint_ui_values.py) строго запрещает visual
literals в новом Web-слое и сравнивает старые Admin, Mini App и Landing с
[`legacy-baseline.json`](legacy-baseline.json). Старый долг может уменьшаться, но не
расти. Линтер также проверяет, что используемые имена иконок существуют в мастер-
реестре.

Токен не маскирует соседний literal: `padding:var(--rf-space-2) 13px`,
`border:1px solid var(...)` и literal fallback внутри `var(...)` считаются
нарушениями так же, как полностью жёстко заданное значение.

`--update-baseline` не является обычной командой разработки. Уменьшение можно
зафиксировать после миграции; увеличение требует `--review-id`, `--review-owner` и
содержательный `--review-reason`, а scoped delta сохраняется в metadata. Без этих
данных линтер не даст «починить CI» ростом baseline.

## Что не нужно мигрировать сейчас

- весь Admin, Mini App или Landing одним большим изменением;
- Telegram keyboard в Web Button;
- Telegram host variables, safe area и WebView viewport в обычные brand tokens;
- авторские иллюстрации, фотографии и логотипы в icon library;
- старые compatibility aliases до миграции всех потребителей;
- SwiftUI/Compose outputs, пока в репозитории нет нативного клиента;
- одноразовый feature layout в общий component без подтверждённого повторения.

## Checklist перед передачей результата

### Решение

- [ ] Найдены и проверены существующие component, pattern и primitives.
- [ ] Проверены registry status, canonical name, replacement и platform strategy.
- [ ] Composition рассмотрена до variant, а variant — до нового компонента.
- [ ] Для нового reusable component есть отдельная повторяемая семантика или
      поведение.
- [ ] Визуальный мастер сначала создан в `design/` и показан владельцу.
- [ ] Изменение общего компонента утверждено в Catalog до изменения product adapter.
- [ ] В продукте нет локального CSS/JS, повторяющего новый системный контракт.

### Tokens и код

- [ ] Продуктовые color styles используют только Context tokens; Component color
      tokens остаются внутренним Core API, а Primitive/Alias/Static и literals
      не попадают в product code.
- [ ] Light и Dark имеют одинаковый Alias contract и точную инверсию ramps.
- [ ] Generated-файлы и service-копии обновлены только генератором.
- [ ] Feature не создаёт параллельные Button/TextField/Card.
- [ ] Новые имена иконок существуют в мастер-реестре.

### Состояния и доступность

- [ ] Реализованы все применимые states, включая focus, disabled, loading и error.
- [ ] Проверены keyboard, screen reader name, ARIA и touch target.
- [ ] Проверены contrast, reduced motion, light/dark и узкий экран.
- [ ] Состояние понятно не только по цвету.

### Текст, документация и проверки

- [ ] Продуктовый текст передаётся feature и локализован на RU/EN/KY/UZ для Bot и
      Mini App.
- [ ] Обновлены component docs, каталог, тесты и затронутая страница вики.
- [ ] `python3 scripts/design_system_check.py --static` проходит.
- [ ] Перед release проходит строгий browser Design System check без skip.
- [ ] Целевые i18n tests проходят.
- [ ] Полный `scripts/verify-release.sh` проходит после значимого изменения.
