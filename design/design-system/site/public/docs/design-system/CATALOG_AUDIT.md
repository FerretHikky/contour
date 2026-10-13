# Аудит Design System Catalog

Дата аудита: 11 августа 2026 года. Аудит описывает исходный Catalog до перестройки его в рабочий интерфейс Design System.

## Краткий вывод

Исходный Catalog качественно показывает реальный Web Core UI и настоящие Light/Dark themes, но остаётся длинной витриной из десяти секций. Он не подключён к Component Registry, не разделяет уровни архитектуры и не помогает принять решение о переиспользовании. Главный риск — stable, beta и experimental API выглядят одинаково готовыми.

Снимки исходного состояния:

![Исходный Catalog, desktop Light](catalog-audit/01-current-desktop-light.jpg)

![Исходный Catalog, mobile Light](catalog-audit/02-current-mobile-light.jpg)

![Исходный Catalog, mobile Dark](catalog-audit/03-current-mobile-dark.jpg)

## Метод и границы проверки

1. **Структура и источники данных — требует переработки.** Сопоставлены `catalog.html`, Component Registry 1.3.0, Component Inventory, Core UI CSS/JS, Foundations, Pilot Migration и quality gates.
2. **Coverage — требует переработки.** Для всех 56 записей Registry проверены level, lifecycle, platforms, synonyms, API-поля, accessibility contract и canonical implementation. Полный шаблон component page выполнен для 0 из 56 записей.
3. **Light/Dark — базовый контракт работает.** Обе темы проверены в живом браузере; Catalog переключает настоящие semantic tokens, а не demo palette.
4. **Responsive — базовый reflow работает, discovery не работает.** Проверены 1440×1000 и 390×844. Контент не распадается, но на mobile первый экран занят заголовком и началом первого specimen; навигации и поиска нет.
5. **Accessibility — частично хорошо, но не подтверждена полностью.** В исходнике есть `main`, последовательные заголовки, labels, native controls и focus-visible из Core. Проверка не заменяет ручной тест со screen reader.
6. **Performance — явного перегруза нет.** 56 registry entries и 42 icons пока не требуют virtualization; сначала нужен измеряемый budget и функциональный Catalog.

## Сильные стороны исходной версии

- Примеры используют настоящий Core UI, а не отдельные demo-компоненты.
- Цвета, размеры, типографика и spacing берутся из semantic tokens.
- Light/Dark отражают настоящую тему Design System.
- Native form controls сохраняют предсказуемые keyboard и screen-reader semantics.
- SafeArea показан корректной композицией `SafeArea → Container → Stack`.
- В исходном Catalog нет отдельной палитры, шрифтовой шкалы или icon implementation.

## Findings

### P0 — может привести к неправильному использованию Design System

| Problem | Impact | Priority | Proposed solution |
| --- | --- | --- | --- |
| Catalog вручную задаёт названия, группировки и описания вместо чтения Registry. | Lifecycle, platforms, synonyms и replacement могут разойтись с source of truth. | P0 | Генерировать semantic Catalog model из Component Registry; валидатор должен запрещать повтор registry-owned полей в catalog guidance. |
| Lifecycle не виден рядом со specimens. | Experimental Dialog, BottomSheet и ActionMenu выглядят так же готово, как stable Button. | P0 | На каждой entity page показывать Registry status, lifecycle warning, canonical evidence и replacement. |
| Foundations, primitives, components и patterns смешаны. | EmptyState ошибочно выглядит тем же типом pattern, что ErrorState/LoadingState; component и pattern воспринимаются как один слой. | P0 | Разделить primary navigation по архитектурным уровням, category оставить вторым уровнем. |
| Платформенная поддержка описана одной общей фразой. | Target platform легко принять за реально реализованный adapter; BottomSheet можно ошибочно считать Web-supported. | P0 | Раздельно показывать Registry target platforms и canonical implementations. Supported выводить только из implementation evidence. |
| Нет canonical discovery, synonyms и deprecated replacements. | Команда и coding agents могут создать `CustomInput`, `Modal`, `RedButton` или другой локальный дубль. | P0 | Поиск строить из `name`, `synonyms`, category, purpose, states и replacement. Exact deprecated match должен явно вести к replacement. |
| Не показана граница Core UI и product semantics. | Feature-компоненты могут преждевременно попасть в Core; локальный UI может дублировать Core. | P0 | Добавить decision guide, pilot decomposition и явные Core/Feature границы из `PILOT_MIGRATION.md`. |

### P1 — сильно ухудшает usability

| Problem | Impact | Priority | Proposed solution |
| --- | --- | --- | --- |
| Нет глобальной навигации и поиска. | Нужный component нельзя найти за несколько секунд; mobile требует длинного скролла. | P1 | Реализованная верхняя навигация ведёт в индексные разделы; предложение sidebar/drawer отменено решением владельца, discovery строится через карточки и стабильные hash routes. |
| Anchors есть только у нескольких showcase-групп. | Нельзя дать стабильную ссылку на Button, token group или guide из PR, Wiki или Codex task. | P1 | Hash routes для каждой foundation/entity/guide; current location и theme хранить в URL. |
| Foundations сведены к нескольким typography/icon examples. | Разработчик не видит semantic-vs-primitive mapping, реальные type roles, spacing, radius, elevation, motion, breakpoints и media. | P1 | Сгенерировать first-class specimens из DTCG JSON и resolved Light/Dark values. |
| Нет общего component information template. | Отсутствуют use/don’t, anatomy, API, tokens, related, lifecycle и platform differences. | P1 | Один generated template для всех Registry entries; необязательную guidance хранить отдельно без повторения registry metadata. |
| Нет state matrices и полезных playgrounds. | Состояния приходится искать в CSS или воспроизводить в product screen. | P1 | Постоянно видимые matrices для ключевых controls и небольшие playgrounds на настоящем Core UI. |
| Reusable stress fixtures не подключены к Catalog. | Длинные слова, локализации, missing/failed images и multiline content проверяются слишком поздно. | P1 | Читать общий `stress-fixtures.json`; дополнить недостающие fixture classes в единственном source. |
| Нет container preview. | Width-dependent ошибки Card, ListItem, form, tabs и overlays не видны до product integration. | P1 | Добавить реальные Mobile/Tablet/Desktop container presets из breakpoint tokens. |
| Нет searchable Icon Catalog. | Повышается риск нового inline SVG или неверного icon name. | P1 | Генерировать icon index из master registry `ContourIcons.names`, показывать canonical name и системные sizes. |
| Нет Terminology, comparison, Composition, Do/Don’t и Building a feature. | Людям и AI трудно выбрать между близкими concepts и понять границы композиции. | P1 | Добавить decision-oriented guides, согласованные с `AGENTS.md` и `DESIGN_SYSTEM_CONTRIBUTING.md`. |
| DOM не размечен стабильными entity metadata. | Coding agent не может надёжно извлечь name, level, status и platform evidence из страницы. | P1 | Использовать semantic articles и предсказуемые `data-ds-name`, `data-ds-level`, `data-ds-status`. |
| Visual regression покрывает только пять component families. | Регрессии большинства приоритетных specimens могут пройти незамеченными. | P1 | Расширить существующий manifest на Button, fields, selection, data display, feedback и overlays в обеих themes. |

### P2 — улучшение качества

| Problem | Impact | Priority | Proposed solution |
| --- | --- | --- | --- |
| Две равные колонки подходят витрине, но не документационному инструменту. | Длинные API/accessibility tables станут плотными и плохо сканируемыми. | P2 | Content-first shell: compact navigation, один основной article, локальный contents rail на wide screens. |
| Theme и выбранная entity не связаны с URL. | Review link не воспроизводит контекст. | P2 | Сохранять hash route, query `theme` и поисковый query; playground micro-state не сериализовать. |
| Нет copy canonical name/API action. | Возникают опечатки и неканонические названия. | P2 | Добавить небольшое copy action с доступным live confirmation. |
| Changelog не имеет общего недублируемого источника. | История API не видна в Catalog. | P2 | Выполнено частично: каждый раздел получил независимую SemVer-версию из Registry и Badge рядом с H1; подробную историю по-прежнему смотреть в Git до появления единого governance contract. |

## Coverage исходной версии

Registry содержит 56 entries: 13 primitives, 34 components и 9 patterns. По lifecycle это 10 stable, 30 beta, 13 experimental и 3 deprecated. Все 10 stable components имеют хотя бы визуальное представление в исходной витрине, но ни у одного нет полного информационного шаблона. Canonical symbols обнаруживаются для 41 из 56 entries; это не равно подтверждённой platform support.

Исходный visual baseline содержит 13 снимков только для пяти families: Button, TextField, Card, Dialog и BottomSheet.

## Naming и platform evidence

- Каноническое поле Registry называется `synonyms`; Catalog показывает его пользователю как aliases только для discovery.
- `Input` deprecated и заменён на `TextField`; `InputField` является synonym wrapper-компонента `Field`, поэтому не должен вручную приписываться TextField.
- `Modal` deprecated и заменён на `Dialog`; `Dialog` пока experimental.
- Registry `platforms` описывает target strategy. Фактическая canonical implementation берётся из `implementation.canonical`; эти значения нельзя смешивать в один supported badge.
- В Registry target Web указан у 54 entries, Telegram Mini App — у 14, iOS/Android/Telegram Bot — у 0. Canonical implementations есть для Web у 43 и Telegram Mini App у 3 entries.

## Целевая архитектура данных

```text
Component Registry ─┐
DTCG tokens ────────┼─→ build_catalog.py ─→ generated/catalog-model.json
icons.js ───────────┤                              ↓
stress fixtures ────┤                         catalog.html + catalog.js
catalog guidance ───┘                         semantic documentation UI
```

Registry остаётся единственным source of truth для `name`, `synonyms`, `category`, `level`, `status`, `platforms`, `variants`, `sizes`, `states`, `dependencies`, `replacement`, accessibility identifiers и canonical implementation. Catalog guidance может хранить только отсутствующие decision fields — например, curated use/don’t, comparison и composition text. Build validator должен отклонять forbidden registry-owned fields, unknown entity keys и stale generated output.

Выбрана гибридная схема: сборщик заранее валидирует и генерирует единый
machine-readable model, а `catalog.html` остаётся полноценным semantic shell с
landmarks, navigation и guide pages. `catalog.js` строит Registry/Foundation pages
из модели и показывает явное error state при невозможности загрузки. Поэтому
metadata не дублируются в HTML, deep links воспроизводимы, а Catalog не является
canvas-only интерфейсом. Доступность динамической части закреплена browser
contracts; JSON model остаётся доступным coding agents независимо от UI.

## Принятые критерии следующего этапа

- Registry counts, statuses, synonyms и platform evidence появляются без ручного дублирования.
- Каждая entity получает стабильный hash route и общий information template.
- Search различает canonical result, synonym match и deprecated replacement.
- Foundations строятся из DTCG tokens, icons — из master icon registry, stress examples — из общего fixture source.
- Catalog dogfoods Core UI; documentation-only layout components остаются в catalog layer.
- Проверки включают semantic/static contract, real browser behavior, responsive widths, Light/Dark, accessibility smoke и существующий visual regression gate.
