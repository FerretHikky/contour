# Design System Catalog

Каталог в [`design/design-system/web/catalog.html`](../../design/design-system/web/catalog.html)
теперь является рабочим интерфейсом Design System, а не отдельной витриной
компонентов. Он помогает найти каноническое имя, проверить lifecycle и платформенную
реализацию, изучить Foundations, сравнить близкие компоненты и собрать feature без
локального дубля Core UI.

Основной холст Catalog использует `color.context.background.base.default`; панели и
служебные поверхности сохраняют собственные Context-роли.

## Icon: единый контейнер для наших иконок

Icon имеет статус **Stable**. Страница `#components/icon` оформлена по структуре Button/TextField: Anatomy,
Playground и шесть карточек Examples с вкладками «Описание», «Web + Mini App»,
«React», исходными файлами и копированием кода. Старый адрес `#primitives/icon`
перенаправляет на компонент. Icon не имеет собственной кнопочной поверхности.

Playground: Variant (Brand/Primary/Secondary/Tertiary/Danger/Success), Style
(Line/Solid/Duotone), State (Default/Disabled/Skeleton), Size (12/16/24/32px), Glyph.
Тема превью переключается независимо. Во всех трёх стилях используется один набор
из 904 Glyph; смена Style сохраняет выбранную иконку без искусственной заливки.
Brand — первый вариант в списке и Examples, фирменный цвет из существующей роли
`color.context.icon.brand.default` для обеих тем. Default/Disabled/Skeleton работают
как у остальных вариантов. Начальное значение Playground остаётся Primary.

Общий контракт — `.rf-icon` с `data-rf-icon-glyph` через публичный Core и React `Icon`.
Admin, Mini App и Landing используют этот компонент, включая Start/End в Button
и TextField. Прямое использование Glyph и старого `ContourIcons` запрещено.
Статус Stable зафиксирован после миграции этих независимых поверхностей: состояния,
размеры, темы, доступные имена, загрузка начертаний и React adapter проверяются в
`tests/test_design_system_icon.py`, `test_design_system_iconography.py` и
`test_design_system_icon_boundary.py`. Web и Telegram Mini App используют один Core;
нативные iOS/Android adapters в текущий Stable-контракт не входят.

## Удалённый доступ

Планируемый постоянный адрес Catalog — `https://design.reflower.app`. Публикация
выполняется через OpenAI Sites отдельно от Bot, Admin, Mini App и Landing. Текущий
Site по решению владельца публичен по адресу
`https://reflower-design-system.ferrethikky.chatgpt.site`; изменение режима доступа
остаётся отдельным решением.

В Sites отправляется детерминированный bundle
`design/design-system/site/public/`, собранный из канонических файлов Design System.
Bundle нельзя исправлять вручную: сначала меняется источник, затем повторяются
генерация и проверки.

Custom domain пока ожидает настройки DNS. После первой публикации и до подтверждения
домена и HTTPS рабочим будет приватный адрес, выданный Sites;
`design.reflower.app` нельзя указывать как готовую публичную ссылку. Каждая новая
версия публикуется только из чистого commit, для полного SHA которого GitHub workflow
`verify.yml` уже завершился статусом `Success`.

## Runtime-архитектура: TypeScript + React без второго Core

Авторская интерактивная логика Catalog и Web Core перенесена в TypeScript.
Канонические исходники находятся в `design/design-system/web/runtime/catalog.ts`
и `core-ui.ts`; общие типы lifecycle, платформ, Registry entry и Catalog model — в
`runtime/contracts.ts`. Публичные `catalog.js` и `core-ui.js` теперь generated-
артефакты: прямые правки в них запрещены, а `build_web_runtime.py --check`
останавливает gate при любом расхождении. Admin, Mini App, Landing и Sites продолжают
получать совместимые `.js`, поэтому смена authoring-языка не меняет публичное
подключение и не требует feature-workaround.

React-оболочка страницы отвечает за верхнюю навигацию, тему, адаптивный режим и
состояние текущего hash-route. Бокового меню и отдельного drawer в Catalog нет:
основные разделы доступны из верхней навигации, а компоненты — из индексных карточек.
Исходник оболочки находится в `design/design-system/site/catalog/catalog-shell.tsx`,
а Vite собирает проверяемый `design/design-system/web/catalog-react.js`. Большой
content renderer и playground остаются framework-independent DOM runtime, но их
authoring source теперь TypeScript, а не ручной JavaScript.

React-оболочка читает тот же generated `catalog-model.json`, а примеры продолжают
рендерить публичные `core-ui.css` и `core-ui.js`. React-компоненты Button, Checkbox,
Radio и другие для Catalog не создаются: иначе витрина могла бы разойтись с тем,
что реально подключают Flask-сервисы. Следующие этапы могут переносить отдельные
страницы и playground в типизированные React-модули только при сохранении реального
Core DOM и существующих deep links.

Порядок runtime фиксирован: Core controller → React shell → content renderer.
Generated React bundle содержит SHA-256 своего TypeScript-исходника. Для Core и
content renderer отдельная parity-проверка требует точного соответствия TypeScript
и generated JavaScript. Строгий `tsconfig.contracts.json` проверяет публичные типы;
compatibility-профиль `tsconfig.runtime.json` разрешает существующим DOM handlers
мигрировать без изменения поведения. Новый интерактивный runtime-код добавляется
только в TypeScript source. Hosted bundle остаётся byte-copy канонического runtime,
поэтому локальный и опубликованный Catalog используют одну реализацию.

## Initial Catalog audit

Исходная версия хорошо показывала реальный Core UI и обе темы, но была одной длинной
страницей без поиска и архитектурной навигации. Foundations, primitives, components
и patterns были смешаны; lifecycle и platform evidence рядом с примерами не
показывались; полных information pages не было ни у одной из 56 Registry entries.
Это создавало риск принять experimental API за stable и перенести feature semantics
в Core.

Полный аудит с P0/P1/P2 findings находится в
[`CATALOG_AUDIT.md`](CATALOG_AUDIT.md).

Сравнение desktop до и после:

![Catalog до и после, desktop](catalog-audit/comparison-desktop.jpg)

Сравнение mobile Dark до и после:

![Catalog до и после, mobile Dark](catalog-audit/comparison-mobile-dark.jpg)

## Information architecture

Primary navigation теперь повторяет компактную верхнюю панель Admin и оставляет в
ней четыре понятных входа:

```text
Home
Foundation
Components
Templates
```

Home больше не дублирует Registry-отчёт и архитектурную документацию. Это стартовая
карта Design System: в верхнем hero расположены короткое объяснение системы и
собственная прозрачная cutout-иллюстрация Contour без встроенного фона. Ниже остаются
ровно три входные карточки: `Foundation` ведёт на индекс основ, `Components` — на
сгруппированный индекс компонентов, `Templates` — на готовые повторяемые сборки.
Детальные карточки не дублируются на Home: они доступны уже внутри выбранного слоя.
Каждая входная карточка соответствует существующему route Catalog; несуществующие
страницы не подменяются декоративными ссылками. В hero остаются только заголовок и
подзаголовок без надзаголовка и нижнего разделителя. Секции Home также не используют
линии-разделители. Карточки построены как крупная
иллюстративная зона с подписью: служебные стрелки и маленькие пиктограммы на Home не
используются. Три иллюстрации входных карточек хранятся как прозрачный PNG-cutout без
встроенного фона; фон визуальной зоны задаётся только системным токеном
`color.context.background.primary.default`, поэтому автоматически следует теме. На
всех карточках Home используется системное скругление `radius.2xl` (`24px`) и
`elevation.none`; тень не появляется и в hover-состоянии. Cutout-ассеты
нормализованы на холсте `1536×1024`: видимая композиция центрируется
и вписывается в общую safe-зону до `1198×737`, оставляя не менее `150px` по
горизонтали и `120px` по вертикали. Это выравнивает визуальную массу и не допускает
обрезания объектов краем карточки. Iconography дополнительно перекадрирована с
восстановленными внешними частями композиции и настоящим alpha-каналом. На
узком экране hero перестраивается в одну колонку, а сетка карточек
становится одноколоночной без отдельной mobile-версии.

Основной контент Home повторяет адаптивные поля Admin: `32px` на desktop, `24px` в
компактном layout и `12px` на телефоне. Максимальная ширина остаётся системной
`layout.content.maxWidth`, поэтому на широких экранах появляется такой же спокойный
внешний отступ, как в админке. Страница Colors использует те же адаптивные поля,
чтобы переход с Home не менял основной левый и правый край. Остальные технические
страницы Catalog сохраняют более плотную рамку, чтобы таблицы и component specimens
не потеряли полезную ширину.

Логотип Contour расположен слева, основные разделы — в широкой центральной
`NavigationBar`, а переключатель темы остаётся справа. Он использует системную
иконку `Sunny` в светлой теме и `Clear night 01` в тёмной — тот же визуальный
контракт, что и у переключателей темы внутри component playground. Поиск, вход в
полный список разделов и служебный бейдж версии Registry временно убраны из шапки
по решению владельца. Выбранный пункт верхней панели соответствует всей группе
route: Foundation включает все страницы Foundations, Components — Primitives и
Components, Templates — все Registry-сущности уровня `pattern`. Страницы правил
остаются доступными по прямым `guidelines/*` route, но больше не смешиваются с
каталогом готовых сборок.

Верхний пункт Foundation открывает самостоятельный индекс `#foundations`: hero
объясняет назначение слоя отдельной 3D-композицией из базовых плит, сетки, шкал и
системных модулей, а ниже повторяется единый набор карточек Foundations с Home.
Colors доступен как одна из карточек и больше не является landing page группы.

Foundations разделены на Colors, Metrics, Typography, Elevation, Motion, Grid,
Iconography и Media. Spacing, Radius, Border и Opacity
представлены вкладками страницы Metrics: это единый интерфейс для цепочки
Dimension → параметр свойства → Component без общего UI-слоя Alias. Старые hash
routes Spacing, Radius и Borders перенаправляются на каноническую страницу.
Старый hash `#foundations/breakpoints` совместимо перенаправляется на
`#foundations/grid`; публичная breakpoint-шкала при этом сохраняет имена
`breakpoint.*`, потому что порог остаётся Primitive-составляющей более широкой Grid
системы.
Самостоятельный индекс `#components` теперь повторяет обзорный шаблон Foundations:
hero объясняет роль готовых элементов, а ниже каждая Component-сущность из Registry
получает собственный визуальный блок. Карточка строится из model data, показывает
каноническое имя, назначение, lifecycle и категорию через системную иконку и ведёт
на подробный contract entity; ручной список компонентов в Catalog не хранится.
В обзоре Button идёт первым, TextField — вторым; остальные карточки сохраняют
сортировку по категории и имени. Назначение TextField в Registry сокращено до
одной фразы; подробная анатомия и правила поведения остаются в документации компонента.
Обзорная страница не показывает технический бейдж версии; section version остаётся
на подробных entity pages, где относится к контракту конкретной сущности.
Страница `#components/button` использует тот же визуальный шаблон, что современные
Foundations: самостоятельный hero и вкладки `Anatomy`, `Button`, `Icon Button`.
Anatomy объясняет action root, label, optional Subtitle, Start/End icon slots, loading и accessibility; Button
показывает сфокусированный интерактивный playground: большое превью располагается
над строками настройки variant, state, size, label и Subtitle. Subtitle можно
включить или выключить системным Switch и отредактировать через TextField; Start icon
и End icon включаются отдельными Switch, используют канонические иконки размером
24 px и скрыты от accessibility tree. Subtitle повторяет строку настройки Typography:
meta и Switch стоят сверху по противоположным краям, а TextField занимает всю ширину
следующей строки. У Start icon и End icon meta и Switch также стоят в одной строке.
Общий выбор Start/End icon в Button, TextField, Tab, Badge и Chip содержит поиск
Glyph и отдельный Style (Line / Solid / Duotone) для каждого слота. Оба поля
стоят в одной строке в порядке Glyph → Style и складываются вертикально только на
phone. Они выключаются вместе со Switch, сохраняя выбор. Недоступные для Glyph начертания
отключены; при выборе Glyph без текущего Style используется первое доступное.
Icon Button также предлагает Style. Превью передаёт его публичному Icon через
`data-rf-icon-style`, не меняя размеры и наследуемый цвет.
Вертикальный layout включается только на phone.
В превью Subtitle
он отображается второй строкой на базовом `Body XS` и связан через `aria-describedby`,
а Label остаётся именем действия. Длинные Label/Subtitle переносятся без обрезания.
Отдельные витрины
смешанных размеров, матрица состояний и Foundation traceability из этой вкладки удалены.
После Playground раздел `Examples` показывает каждый публичный Variant отдельным
визуальным блоком формата `Button — Variant`:
`Primary`, `Secondary`, `Tertiary`, `Ghost`, `Danger` и `Success`. В каждом блоке
системные Tabs переключают краткое описание назначения и готовый source по
реально поддержанным платформам и языкам.
Variant и size используют
тот же канонический Dropdown, а label — тот же полноширинный TextField, что Typography.
Icon Button показывает
icon-only presentation, включая `close`, и
обязательное accessible name. IconButton больше не дублируется отдельной карточкой и
пунктом навигации в Components. Старый route `#components/icon-button` совместимо
перенаправляется на `#components/button?buttonTab=icon-button`, а Registry entry
остаётся каноническим источником его API и lifecycle.
Публичные Button variants: `primary`, `secondary`, `tertiary`, `ghost`, `danger` и
`success`. `secondary` использует нейтральную заливку `background.primary`,
`tertiary` — прозрачный фон с brand-обводкой, а `ghost` не имеет фона и обводки в
покое. Имя `destructive` удалено из Button API и всех его использований;
опасное действие обозначается только `danger`.
State Dropdown показывает взаимоисключающие `default`, `hover`, `pressed`,
`focused`, `disabled`, `loading` и `skeleton`. Интерактивные pseudo-states
симулируются только в Catalog, а skeleton входит в публичный Button state contract.
Size использует три публичных размера: `L` — 48 px, `M` — 40 px и `S` — 32 px.
Те же значения используются в API как `l`, `m` и `s`; старые `lg`, `md` и `sm`
для Button и IconButton удалены.
Превью Button имеет локальный Light/Dark toggle по тому же контракту, что Colors:
тема меняется только внутри stage и не переключает весь Catalog.
Технический индекс Primitives сохраняет группировку по Registry category. Уровень
`pattern` показывается владельцу как отдельная обзорная страница `Templates` в том
же визуальном шаблоне, что Foundations и Components: hero, описание слоя и группы
карточек. Template — повторяемая сборка минимум из двух зарегистрированных
primitives, components или templates с собственным общим контрактом композиции.
Поле `governance.catalogPlacement` закрепляет это правило: новая Registry-сущность
уровня `pattern` автоматически получает route `patterns/*` и попадает только в
Templates, а не в Components. Validator отклоняет Template без двух dependencies
или попытку направить такой уровень обратно в Components.

Состояние загруженного изображения называется **Default** в интерфейсе и примерах;
внутреннее значение `loaded` и контракт Core остаются без изменений.
В превью и примерах Image используется локальная фотография `listing-card-figma-bouquet.png`
с описанием «Букет с подсолнухом», а не иллюстрация компонентов.
Контейнер `[data-image-output]` резервирует ширину до 248 px,
а `.rf-image-frame.catalog-thumbnail-preview` имеет block layout. Без этого inline-span с
абсолютно позиционированным изображением схлопывался до 0×0 даже при успешной
загрузке файла. Проверки состояний должны проверять не только равенство размеров,
но и ненулевые ширину/высоту и `naturalWidth` в Default.

ListingCard обновлён по Figma `35:4`: эталон 179×292 px, фото 179×220 px,
панель с отступом 12 px и перекрытием 16 px; цена Title S, тип Headline XS,
свежесть Body S. Город, «Новое» и «Моё» — Badge S поверх фото.
Иконка города — системный Icon `location`, Style `solid`, размер XS.
У Badge оставлены только S и M: XXS/XS удалены из Core, registry и Playground,
все их использования и примеры переведены на S по решению владельца.
Фотография сохранена в `web/assets/listing-card-figma-bouquet.png`.
Бейджи «Новое», «Моё», «Отклик» и «Город» включаются отдельными Switch,
а не выбираются как Variant. По умолчанию включены «Новое», «Моё» и «Город».
Настройки сохраняются при переключении State; Loading временно скрывает все бейджи.
Примеры комбинаций остаются в Examples, но не считаются вариантами карточки.
Если включены все статусы, их ряд переносится внутри границ фото.
Playground поддерживает темы, состояния и ширину.
Утверждённый компактный дизайн перенесён в продуктовый адаптер Mini App: город и
статусы находятся поверх фотографии, а цена, тип и свежесть — в панели с
перекрытием 16 px. Разметка продукта сохраняет те же состояния, токены и
типографические роли, что и эталон Catalog.
ListingCard в Catalog использует полный Image: `rf-image-frame`, `rf-image`,
`rf-skeleton--fill` и внутренний `rf-media-fallback` с Icon `image-off`.
Карточка передаёт `data-state=loaded/loading/error`; видимостью и видом этих
состояний владеет Core Image. Локальные media-error/media-skeleton CSS и ручное
скрытие фотографии удалены. Расположение статусов и города остаётся в ListingCard.
На стыке фото и панели нельзя оставлять собственные нижние скругления AspectRatio:
они вырезали фотографию под закруглённой панелью и давали белые зазоры.
В ListingCard media имеет нулевой радиус; внешний контур обрезает Card, а панель
накрывает прямоугольное фото на 16 px. Геометрия 179×292 px сохраняется.
В шапке ListingCard не показывается растянутый lifecycle Badge; статус beta
сохраняется в registry и контракте Anatomy. Переключатель темы Playground применяет
локальные Context/component-переменные к превью, не меняя тему всей страницы.
Для текущего пакета Catalog raw-бюджет обновлён до 613 KiB (измерено 626598 байт,
включая типизированный runtime); gzip — 104 KiB (измерено 105769 байт).
Дополнительные варианты карточки и Badge увеличивают gzip-бюджет менее чем на 1 KiB.
Проверка в браузере покрывает геометрию 179×292, loading/photo error/long content,
город в accessible name, реальные цвета обеих тем и отсутствие переполнения на 390 px.

ListingCard относится к Templates: это сборка карточки объявления из Card,
AspectRatio, Image, Badge, Skeleton, Text и Icon. Канонический адрес —
`#patterns/listing-card`; старый `#components/listing-card` перенаправляется на него.
Перенос меняет классификацию каталога и сохраняет существующий product adapter.
Страница ListingCard использует общий шаблон Button: hero с настоящей карточкой,
вкладки Anatomy и ListingCard. В Anatomy показаны состав и контракт; ListingCard
содержит Playground в общем контейнере Button: stage с локальной темой, затем строки
Variant, State, Width, Price, Title, Freshness и City. Ниже идут четыре Examples
с вкладками описания и Web reference. Разметка примеров явно обозначена как
experimental reference, требующий стилей каталога. Превью переиспользует
существующую разметку, обработчик ограничен своей панелью. Выбор вкладки сохраняется
в `listingCardTab`, поддерживаются клавиатурные переходы Core Tabs.

Справочные страницы Terminology, comparison, Composition, `Should this be Core?`,
real product usage, Do/Don't, feature-building, Accessibility, Migration и Specimen
Lab сохраняются на `guidelines/*` для прямых ссылок и внутренних проверок.

Страница Elevation повторяет общий шаблон современных Foundations: самостоятельный
hero с системной иллюстрацией и соседние вкладки `Anatomy` и `Levels`.
Образцы показывают не тень отдельно, а связку Context surface, boundary и
Elevation token одновременно в Light и Dark. В `Anatomy` отдельно зафиксировано,
что `z-index` управляет порядком наложения и не вычисляется из визуальной глубины;
там же находятся правила применения, Do/Don't и карта текущих потребителей.
`Levels` документирует пять канонических путей `elevation.none|sm|md|lg|overlay`,
их реальные значения тем и фактических Core-потребителей; каждый уровень занимает
полную ширину страницы, а Light и Dark сравниваются рядом без декоративной карточки
вокруг примера. `lg` честно обозначен как зарезервированный уровень без стабильного
компонента. Anatomy закрепляет flat-first правило: обычный контент сначала
разделяется border или whitespace,
а поднятая поверхность всегда сочетает системные background, border и shadow.
В Dark отсутствие shadow у `sm`, `md` и `lg` считается корректным theme contract,
а не пропущенным значением. Product CSS не выбирает Foundation elevation напрямую:
готовый уровень приходит через публичный Core component contract.

Страница Iconography 3.0 содержит вкладки `Anatomy`, `Line`, `Solid`, `Duotone`.
Набор Figma содержит по 904 одинаковых Glyph в Line, Solid и Duotone; 15 неполных
комплектов удалены целиком из файлов и каталога без предупреждений или заглушек. Anatomy позволяет
выбрать Glyph → Style → Color; Style предлагает только доступные начертания Glyph.
Color берёт варианты и их порядок из registry компонента Icon: Brand первым,
затем Primary, Secondary, Tertiary, Danger, Success. Начальный выбор остаётся Primary.
Brand использует тот же `--rf-icon-brand` и Light/Dark-контракт, что компонент Icon.
Загрузчик Iconography использует content hash из `runtimeAssets.iconography`
в generated model (модель запрашивается с `cache: no-store`). Все три точки входа —
Foundation, обложка Icon и карточка Components — используют один версионированный
URL. Без версии отдельный JS-модуль мог оставаться старым в тёплом кэше, даже
после обновления HTML; так пропадал новый Brand в списке Color.
После правок runtime нужно регенерировать модель, версии HTML через `build_tokens.py`
и hosted bundle; копирование hosted bundle само по себе не обновляет версии HTML.
Вкладки стилей показывают по 72 карточки, поиск
работает по всему набору, «Показать ещё» раскрывает следующую порцию. Deep link
`?icon=<name>&iconographyTab=solid` сохраняет стиль и фильтр; старый `icons` ведёт
в Line. JSON-пакеты загружаются только при открытии Iconography, отдельно от
основной модели каталога. Исходные SVG сохраняются без перерисовки.
Набор находится на этапе визуального утверждения: продуктовый `icons.js` пока
не заменён. План замены и соответствия —
[`ICONOGRAPHY_MIGRATION.md`](ICONOGRAPHY_MIGRATION.md).
Продукт использует только Core Icon API: emoji, локальные inline SVG и отдельный
`icon.size.*` API запрещены; интерактивное действие собирается через `IconButton`.

На узком экране основные четыре пункта остаются в верхней панели и при необходимости
прокручиваются горизонтально. Текущий пункт получает `aria-current`. Компоненты и
foundations открываются через индексные карточки; каждая важная поверхность сохраняет
стабильный hash route, а theme сохраняется в URL.

Страница Colors внутри Foundations начинается с самостоятельного hero: заголовок и
краткое объяснение находятся слева, а справа используется прозрачная цветовая
иллюстрация из master assets Design System. Ниже расположен канонический `Tabs` с
четырьмя соседними панелями `Color anatomy`, `Primitive`, `Alias` и `Context`.
Выбранная панель сохраняется в query-параметре `colorTab`; deep link на конкретный
token автоматически открывает соответствующий слой. Стрелки, Home/End и roving focus
работают через Core `Tabs`, включая панели, добавленные Catalog после загрузки.

`Color anatomy` объясняет путь значения до интерфейса и использует единый
редакционный ритм: короткое объяснение → визуализация реальных token values →
подпись к примеру. Растровых иллюстраций внутри anatomy нет: swatch ramps строятся
на лету из данных catalog model, поэтому документация не расходится с текущими
значениями Design System. Раздел насыщенных цветов показывает шесть Primitive
families — Coral, Green, Red, Blue, Yellow и Orange; нейтральные и alpha-роли
представлены парными Light/Dark Alias ramps. Каждая ячейка получает доступное имя
и tooltip с token path и значением. Визуализации занимают всю доступную ширину
контента страницы внутри тех же боковых полей, что Home. Заголовочные и секционные
описания используют ту же полную ширину; композиция перестраивается в более узкие
колонки на compact и phone layout без отдельной мобильной версии.

Начиная с Colors `1.13.0`, глава «Как применять цветовые токены» раскрывает не
только цепочку слоёв, но и решение задачи. Вверху явно зафиксировано правило:
продуктовый код выбирает только `color.context.*`; Primitive, Alias и Static
остаются внутренними authoring/trace-слоями, а color Component tokens — внутренним
API реализации Core. Дальше Catalog показывает анатомию имени
`property → role → state`, три шага выбора роли и пары
«правильно/неправильно». Практический раздел намеренно остаётся коротким:
комбинации Context-ролей проверяются в интерактивном playground, accessibility —
обязательными gates, а lifecycle и compatibility — каноническим migration manifest.
Эти материалы не дублируются отдельными визуальными блоками внутри Color anatomy.

Начиная с версии Colors `1.11.25`, сразу после вводного блока находится
интерактивный Context playground. Он применяет к одному образцу пять независимых
публичных ролей — background, border, text, icon и overlay. Для каждой роли можно
сначала выбрать доступное состояние, затем только подходящий ему token
соответствующей группы `color.context.*`, временно отключить роль и вернуть без
потери выбранного значения. Состояния во всех ролях идут в едином порядке: Base,
Hover, Active, Selected, Disabled и Skeleton (если он предусмотрен ролью).
Интенсивности `subtle`/`strong`, inverse-варианты и специальные overlay-роли остаются
вариантами Base, а `skeleton.base` и `skeleton.highlight` объединены в один Skeleton.
Начальный Background — `color.context.background.base.default`; Overlay по умолчанию
выключен. Отдельной видимой шапки у playground
нет: Light/Dark переключается локально круглой IconButton в правом верхнем углу
preview, где солнце обозначает Light, а луна — Dark. Переключение не меняет тему
Catalog или query-параметр страницы. Отключённые
слои не подменяются Primitive/Alias значениями: фон становится прозрачным,
граница исчезает, а text/icon/overlay скрываются. Контролы собираются из
канонических Switch, IconButton и stable custom Dropdown; списки состояний и вариантов
строятся из текущей catalog model, поэтому playground не содержит ручной копии
палитры. Dropdown показывает компактные подписи без префикса `color.context.`, но
скрытый input, `data-value`, clipboard payload и разрешение токена сохраняют полное
каноническое имя.

Вкладка Context показывает один квадрат для текущей темы Catalog и рядом короткие
имена Context-роли и её Alias-источника. Light/Dark не дублируются в этой вкладке:
тематическое сопоставление уже раскрыто двумя колонками во вкладке Alias, а Context
демонстрирует итоговую публичную роль такой, какой её получает интерфейс сейчас.
Под заголовком каждой Context-группы Catalog показывает короткое сгенерированное
описание без служебной подписи: Background перечисляет canvas/sections/cards/fields,
Text — текстовые роли на проверенном фоне, Icon — standalone/control/status,
Border — поля/контролы/dividers/focus, Overlay — interaction/scrim/backdrop/skeleton.
Описание хранится рядом с canonical группой в `context.json`, попадает в catalog
model и связано с заголовком через `aria-describedby`; ручной параллельной таблицы
назначений в JavaScript нет.

Завершающая глава сохраняет архитектуру применения токенов:

```text
Primitive color families → Alias Light/Dark → Context mappings → Component
```

Alias не показывает отдельное семейство Canvas. Начиная с Colors `1.11.29`,
отдельная Primitive-шкала Canvas тоже удалена: тематический холст представлен одной
именованной ролью `color.alias.neutral.canvas` первой строкой внутри Neutral.
Light берёт `color.primitive.gray.0`, а начиная с Colors `1.11.31` Dark —
`color.primitive.gray.11 = #18181B`; ни один
Alias source alias не ссылается на `color.primitive.canvas.*`. Публичный Context
`color.context.background.canvas` сохранён. Dark `neutral.0` остаётся на
`gray.10 = #34343A`, поэтому Canvas снова отличается от `background.base.default`,
не создавая отдельную Primitive-рампу. Отрицательная ступень
`color.alias.neutral.-1` намеренно не вводится: числовая шкала остаётся
непрерывной `0…10`, а специальное назначение выражается читаемым именем.

Начиная с Colors `1.14.0`, цветовой слой и вкладка `Semantic` называются `Alias`,
а canonical пути используют `color.alias.*`. Это точнее описывает назначение слоя:
он связывает Primitive с Light/Dark темами, тогда как смысл применения задаёт
публичный Context. Прежние внутренние `color.semantic.*` удалены без compatibility
API: продуктовая разработка использует только Context. Нецветовые Semantic tokens
типографики, размеров и остальных foundations не переименовываются.

Начиная с Colors `1.12.0`, карточки цветовых токенов показывают короткое имя внутри
уже выбранного слоя: `gray.0` в Primitive, `neutral.0` в Alias и
`background.base` в Context. Для Context это представление канонического
`color.context.background.base.default`: Catalog скрывает общий префикс и конечный
`.default`, но не меняет идентификатор. Полный идентификатор остаётся в `data-token-name`,
доступной подсказке кнопки и значении copy action; например, карточка `gray.0`
копирует `color.primitive.gray.0`. `data-token-display-name` хранит короткую подпись
отдельно, поэтому deep link, поиск, alias graph и продуктовая передача токенов
продолжают работать с полным именем. В scoped-секции Static тот же принцип сокращает
`color.static.black` и `color.static.white` до `black` и `white` без изменения их ID.

Static black/white показаны рядом с Primitive как специальные абсолютные константы,
а не как самостоятельный слой применения. Component остаётся потребителем Context,
а не четвёртой копией палитры. Primitive, Alias и Context используют один открытый
визуальный язык без accordion и таблиц. Alias группирует весь generated набор по
семействам, Context — по публичной роли и состояниям Base, Hover, Active, Selected,
Disabled и Skeleton. Начиная с Colors `1.11.28`, каждое Alias-семейство состоит
из двух равноправных колонок Light и Dark. Одна строка по-прежнему представляет один
canonical Alias record, а внутри неё находятся две тематические ячейки. Каждая
ячейка показывает resolved swatch, короткое Alias-имя и соответствующий короткий
Primitive source token; например, `neutral.0` рядом с `gray.0`. Для прямого
alpha-значения вместо вымышленного Primitive alias показывается само значение.
Полный Alias path остаётся в `data-token-name`, tooltip и copy action, а
`data-token-source` каждой тематической ячейки хранит исходное canonical alias/value.
Так две темы можно сравнивать по вертикали без потери alias traceability и без
дублирования record в DOM. Alias-family не имеет собственного фонового surface,
внешнего radius или padding: заголовок и двухколоночные строки идут прямо в общем
потоке страницы.

Context показывает один resolved-цвет текущей темы Catalog и использует те же
11/6/5 колонок на desktop/compact/phone, что и Primitive. Он дополнительно
группируется по состояниям. Карточка показывает scoped short name, Alias source
и реальное resolved-значение; полный token path доступен через tooltip и copy action,
а Light/Dark mapping остаётся в Alias и catalog model. Вкладка
Primitive не использует accordion. Начиная с Colors `1.11.30`, семь семейств Coral,
Gray, Green, Red, Blue, Yellow и Orange всегда открыты и следуют друг за другом сразу
после Tabs, без общего вводного заголовка и описания; Primitive Canvas отсутствует.
Шесть цветных семейств показывают по 11 реальных swatches `0…10`, а Gray — 12
swatches `0…11`; под цветом
видно короткое имя, например `coral.4`, а следующей строкой — точное HEX-значение. Полное
`color.primitive.coral.4` сохраняется для tooltip, copy и `data-token-name`. Тот же
контракт используют Static black/white; deep link всегда опирается на canonical path.
Alias-семейство при этом остаётся Brand: его Light/Dark source aliases переходят
на прямую и обратную последовательности `color.primitive.coral.0…10`. Context и
Component Brand paths не переименовываются, поэтому изменение делает компактнее
только имя исходной палитры и не ломает публичную передачу токенов.
Generated Web CSS на один релиз сохраняет старые custom properties
`--rf-color-primitive-brand-*` и `--primitive-brand-*` как aliases на Coral. Они не
появляются среди DTCG records, не участвуют в Catalog search/copy и существуют
только как ограниченный compatibility bridge для уже собранных потребителей.

### Context naming v2

Colors `1.12.0` вводит новый публичный naming contract для Context-ролей.
Порядок сегментов фиксирован:

```text
color.context.<property>.<role>[.<modifier>][.<state>]
```

Например, базовая поверхность —
`color.context.background.base.default`, её hover —
`color.context.background.base.hover`, а усиленный error hover —
`color.context.background.error.secondary.hover`. Сначала идёт свойство интерфейса
(`background`, `text`, `icon`, `border`, `overlay`), затем смысловая роль, при
необходимости интенсивность и в конце состояние. `basic` переименован в `base`,
`main` — в `default`, camelCase-состояния разложены на отдельные сегменты:
`strongHover` → `secondary.hover`, `strongActive` → `secondary.active`,
`skeletonBase` → `skeleton.base`.

Конечный `.default` обязателен только там, где у той же роли есть дочерние
состояния. Это сохраняет валидность DTCG: один узел не может одновременно быть
токеном и группой. Поэтому самостоятельные листья остаются компактными, например
`color.context.background.canvas`, `color.context.text.error` и
`color.context.border.success`. Catalog показывает короткие подписи без
`color.context.` и без конечного `.default`: `background.base`,
`text.primary`, `background.error.secondary`. Copy, `data-token-name`, JSON/TypeScript
API и новые deep links всегда используют полный канонический ID.

На один релиз действует compatibility bridge. Старые полные ссылки, например
`color.context.background.basic.main`, и короткая ссылка `background.base`
нормализуются в `color.context.background.base.default`; URL после открытия
содержит новый канонический ID. Старые ID не дублируются в DTCG и catalog model,
чтобы не возникало двух источников правды. Generated CSS временно сохраняет старые
custom properties как aliases на новые; новый код их не использует.

Начиная с Colors `1.12.1`, Context-карточки внутри каждого состояния используют
единый смысловой presentation-порядок: Brand → Base → Primary → Secondary →
Tertiary → Canvas → Inverse → Success → Error → Warning → Info → Focus → Skeleton.
Сортировка применяется только в Catalog и не меняет canonical token paths,
resolved-значения или порядок generated API.

Colors `1.14.1` отделяет статусные поверхности от общего ряда
`Background → Base`: после базовых ролей идут самостоятельные группы `Error`,
`Info`, `Success` и `Warning`. В каждой группе мягкий `default` визуально называется
`Primary`, а насыщенный `strong` — `Secondary`, как в Figma Variables. Это только
presentation-проекция: Copy, deep links, `data-token-name`, CSS variables и DTCG
продолжают использовать полные канонические ID `*.default` и `*.strong`.

Colors `1.15.0` делает эту проекцию канонической: статусные Background-токены
переименованы из `default/strong` в `primary/secondary`. Для Error насыщенная роль
сохраняет состояния `secondary.default`, `secondary.hover` и `secondary.active`;
остальные статусные роли используют компактные leaves. Старые пути остаются
CSS-алиасами и Catalog deep links до `2.0.0`, а значения и Light/Dark mapping не
меняются.

В Colors `1.12.3` playground повторяет порядок ролей вкладки Context, показывает
под каждым Context token его короткий Alias source вместо пары Light/Dark HEX,
а внешний контейнер playground использует `background.primary`; панель параметров
сохраняет `background.base`.

В Colors `1.12.4` одинаковые нейтральные disabled-роли сведены к одному токену на
свойство: `background.base.disabled`, `text.primary.disabled`,
`icon.primary.disabled`, `border.primary.disabled`. Catalog больше не показывает
одинаковые карточки Primary/Secondary/Tertiary/Inverse. Старые CSS-пути остаются
в compatibility bridge. Потребители `background.tertiary.active` переведены на
контрастный `background.primary.active`; удаление старого public path оформлено
отдельным lifecycle release ниже.

В Colors `1.12.5` базовая граница стала легче: `border.primary` использует
`neutral.1`, а `border.tertiary` — `neutral.3`. `text.tertiary` остаётся на
`neutral.7`: более светлый `neutral.1` почти исчезает на базовой поверхности и не
проходит обязательный контраст WCAG 4.5:1 для пользовательского текста.

В Colors `1.12.2` neutral Selected-состояния больше не маскируются Brand-цветом:
Base, Primary, Secondary и Tertiary используют соответственно `neutral.1–4`.
Brand disabled остаётся в Coral во всех применимых свойствах; Icon Tertiary
осветлён до `neutral.6`, а Text Tertiary сохранён на доступном `neutral.7`.
`brand.subtle` документирован как мягкая фирменная подложка, а
`error.strong.hover` — как реальное состояние destructive action.

Colors `1.13.0` добавляет к naming contract machine-readable lifecycle. Файл
`token-migrations.json` — единственный источник всех действующих переименований:
каждая группа содержит version window, status, reason, channels и полный набор
`from → to`. Генератор проверяет существование replacement, отсутствие старого ID
в canonical graph, циклы, SemVer и срок удаления, затем из того же manifest строит
CSS bridge и Catalog deep-link migration. Старый deep link открывает replacement,
канонизирует URL и показывает срок совместимости; скрытая таблица переименований в
Python или JavaScript запрещена.

Colors `1.13.1` завершает консолидацию трёх дублирующих Context-ролей:
`background.tertiary.active` заменена на `background.primary.active`,
`border.focus.default` — на `border.brand.default`, а
`border.primary.selected` — на `border.brand.selected`. В canonical DTCG остаётся
ровно одна роль на каждый из этих смыслов; manifest-группа
`context-role-consolidation` сохраняет CSS и Catalog deep-link compatibility до
Colors `2.0.0`.

Исходный Catalog остаётся под строгим ratchet `270 KiB` raw и `53 KiB` gzip.
Удаление дублирующих примеров, CSS-snippet, accessibility callout и lifecycle-summary
уменьшает runtime source; compatibility и lifecycle при этом продолжают проверяться
по `token-migrations.json`, а не по скрытой ручной копии в интерфейсе.

На странице entity раздел `Foundation traceability` строится из DTCG sources, а не
из ручной документации. Для каждого из 162 component-токенов Catalog показывает:

- исходный component alias;
- полную Light/Dark цепочку через Color Context, Alias и Primitive;
- вложенную группировку Context-таблиц по состояниям Default, Subtle, Hover, Active,
  Selected, Disabled, Focus, Status & errors и Special без изменения token paths;
- Typography role и её ветви font family/size/weight/line-height/letter-spacing;
- цепочку Spacing, Radius или Border Width до Dimension;
- ссылку на точный Foundation token и итоговое resolved-значение.

В Metrics → Anatomy ползунок Width в компактной раскладке занимает всю строку,
как соседние Dropdown. Для `.catalog-dimension-playground__range` задан
`grid-column: 1 / -1`: без него range попадал в колонку образца шириной 48 px.
Браузерная проверка сравнивает ширину ползунка и подписей границ с доступной шириной
строки при viewport 320, 390 и 980 px; изменение Width продолжает обновлять превью.

Точные размеры показываются в единой Primitive-шкале `dimension.*`. Ограничивающее
поведение появляется только в Alias/Component token и CSS-свойстве `min-*`/`max-*`,
поэтому отдельного Primitive lane для constraints нет. Если Registry entity не имеет точной machine-readable
component-token группы или значение ещё не утверждено как Foundation, Catalog
показывает gap и не придумывает ручное соответствие.

## Registry integration

Catalog не хранит вторую копию Registry metadata. Сборщик
`design/design-system/scripts/build_catalog.py` читает Component Registry, DTCG
sources и сгенерированные из них `color-tokens.json`, `foundation-tokens.json` и
`typography-tokens.json`, а также master icon registry, общие stress fixtures и
небольшой curated guidance source. Manifest records не переписываются вручную;
resolved payload используется только для проверки и компактного trace. Результат — валидируемый
`design/design-system/generated/catalog-model.json`.

В model Registry entry переносится без изменения, а UI добавляет только вычисленные
route/search index и decision guidance, которого нет в Registry. Генератор
останавливается при неизвестной entry, запрещённом дублирующем поле, missing token
alias, alias cycle, Light/Dark drift или stale output. `design_system_check.py`
проверяет model через `build_catalog.py --check`.

## Foundations coverage

Страница `Metrics` использует шесть доступных вкладок. `Anatomy` содержит живой
playground: горизонтальный padding, вертикальный padding и gap независимо выбираются
из одной шкалы Spacing; width выбирается из неё же, а Radius, Border и Opacity применяются к тому же
образцу без перезагрузки страницы. Это повторяет продуктовый контракт: направление
padding и расстояние между дочерними элементами используют общую шкалу, но остаются
разными CSS-параметрами. `Dimension` содержит 28 исходных
значений; Spacing, Radius и Border показывают собственные property-specific
параметры. Отдельных Sizing, Icon Size, Layout, Control и Touch Target API нет. `Opacity`
содержит единственную исходную шкалу Opacity без дублирующего Backdrop-слоя. Размерные Component
tokens показываются на странице соответствующего компонента и ссылаются на
соответствующий параметр. Выбранная панель сохраняется в query-параметре
`dimensionTab`, а прежние значения `dimensions|primitive-values` канонизируются в
`dimension`, `foundation-aliases` и прежний `sizing` — в `spacing`. Deep link `token=` автоматически открывает
правильный уровень. Канонический hash
остаётся `#foundations/dimensions`, поэтому старые ссылки не ломаются.
Hero версии 2.0.1 повторяет композицию Colors: слева находятся название Metrics,
version badge и короткий subtitle с перечнем параметров, справа
используется каноническая иллюстрация
`foundations-dimensions.png`. Eyebrow и кнопка Foundation contract удалены;
документация уровней остаётся внутри вкладок.
Боковые поля страницы Metrics повторяют Colors: 32 px на широком экране, 24 px
в compact-режиме и 12 px на телефоне. Заголовки групп не дублируют количество строк:
полный набор всегда виден в следующей таблице.
Внутренние секции вкладок не добавляют собственный вертикальный padding поверх
отступа tab panel, поэтому начало контента совпадает с вкладками Colors.
Все таблицы Catalog используют Context-поверхность `background.primary`: одинаковый
фон применяется к заголовкам, названиям токенов и ячейкам во всех темах.
В Metrics самостоятельные секции отделяются свободным пространством без
линий. Таблицы сохраняют внешний контур и разделители строк, чтобы данные визуально
оставались таблицей; активное состояние табов сохранено как навигационный ориентир.
В таблицах `Dimension` и исходной шкале Opacity показаны только Token, Value и
Specimen: колонка `Resolved` скрыта, потому что исходное число уже является финальным
значением. В property-specific параметрах эта колонка сохранена для раскрытия цепочки
ссылок. Все группы показаны сразу внутри своих вкладок: вместо аккордеонов
используются обычные секции с заголовком, описанием и постоянно
видимой таблицей. Это позволяет просматривать всю шкалу без дополнительных кликов;
deep links по-прежнему выделяют нужную строку.

В Typography `3.0.0` удалены компонентные группы `Button`, `Input` и `Chip`.
Компоненты теперь используют только базовые Styles: Button — `Headline S/XS/XXS`,
TextField — `Body M/S/XS`, Badge и SegmentedControl — `Body M/XS`. Отдельные
`font.family.button|input|chip`, CSS-классы `.rf-text--button-*`,
`.rf-text--input-*` и `.rf-text--chip-*` удалены без compatibility aliases.

Catalog показывает:

- 78 непрозрачных Primitive colors: шесть ramps по 11 шагов `0…10` и Gray с
  дополнительным `gray.11 = #18181B`; отдельной Canvas-шкалы нет, а семейства не
  содержат назначений вроде success/error;
- 76 Alias colors в Light и Dark: 66 числовых aliases с точной инверсией,
  именованная роль `neutral.canvas` и 9 прямых полупрозрачных Overlay;
- 97 Context roles для background, text, icon, border и overlay с полным alias
  path и resolved Light/Dark value;
- 2 неизменяемых Static colors — black и white;
- 34 Primitive foundation records: 28 значений единой Dimension-шкалы и
  6 Primitive Opacity;
- 38 property-specific foundation parameters: 22 spacing, 12 radius и 4 border width;
- размерные Component tokens документируются на страницах компонентов и получают
  значение только через property-specific Foundation parameter;
- Border показывает четыре канонические толщины: `none`, `thin`, `medium`, `heavy`;
  прежний `thick` скрыт из каталога и сохраняется только как deprecated CSS alias на
  `medium`;
- Typography в том же shell, что Colors и Metrics: hero, вкладки Anatomy, Primitive и
  Styles. Anatomy содержит единый список параметров Display, Title, Headline и Body
  по визуальному паттерну Colors: название и выбранный token, системный switch,
  поле текста и выбор Style расположены в одной строке. Описательные подписи удалены.
  Для каждой включённой роли можно ввести свой текст и выбрать Style; единый specimen с
  системной иконкой показывает только включённые строки без служебных token/metrics.
  Primitive-свойства остаются частью канонического Style и не редактируются в
  продуктовом playground;
- 20 составных Styles как единственный публичный типографический API продукта:
  четыре самостоятельные таблицы `Display`, `Title`, `Headline` и `Body`
  показывают token, specimen, размер/высоту строки и вес; вкладка
  сразу начинается с `Display`, без повторяющих её название вводных блоков;
- 34 Figma-reference Primitive typography values как внутренний технический
  справочник для авторов Design System, а не продуктовый API; внутри единственной
  вкладки Primitive каталог
  одновременно показывает четыре последовательные таблицы `Name / Value`: 3
  `Family`, 3 `Weight`, 13 `Size` и 15 `Line-height`, в порядке Figma. Ещё 2
  внутренних `Letter Spacing` остаются в переносимом generated graph (36 Primitive
  records), но не дублируются в основном интерфейсе Catalog; промежуточных
  `typography.semantic.*` и `typography.component.*` слоёв нет;
- общая spacing scale для padding, gap, размеров, ограничений и иконок; числовые foundation-таблицы,
  включая именованные Radius и Typography Primitive-шкалы, всегда упорядочены по
  resolved-значению от меньшего к большему;
- radius, borders и elevation как визуальные образцы;
- Motion в том же shell, что Colors, Metrics, Typography и Elevation: hero и вкладки
  Anatomy, Duration, Easing и Patterns. Anatomy позволяет независимо выбрать
  duration, easing и анимируемое свойство, повторно запустить specimen и проверить
  локальный Reduced motion без перезагрузки страницы. Duration показывает все 5
  канонических значений, Easing — все 3 кривые, а Patterns — 5 утверждённых сочетаний
  Interaction, Enter, Exit, Reposition и Ambient вместе с допустимыми свойствами и
  типовыми потребителями;
- Grid с breakpoint-токенами, колонками, внешними полями, gutter, максимальной
  шириной контейнера и Mobile/Tablet/Desktop presets;
- 44 master icons с поиском, canonical name, keywords и системными sizes;
- 19 component-token groups с проверкой Light/Dark parity.
- 162 component-token traces без обрезания длинных групп и с проверяемыми ссылками
  до соответствующих Foundations/Primitive значений.

Typography следует тому же правилу публичной границы, что Context у Colors и
property-specific parameters у Metrics. Продуктовый код использует только
`typography.style.*` или canonical `Text`/component API. Пути `font.*`
предназначены для авторов Design System и запрещены в продуктовом CSS; удалённые
`typography.semantic.*` и `typography.component.*` отсутствуют в canonical graph.
Каждый Style ссылается на Primitive `font.*` напрямую, а каждый typography-valued
component token — непосредственно на Style. Старые
`.rf-text--display-large`, `.rf-text--heading-*`, `.rf-text--body-*`,
`.rf-text--label-*` и `.rf-text--code-*` временно остаются CSS compatibility aliases
и не считаются новым API.

Motion следует той же публичной границе: продуктовый код получает готовое поведение
через Core component или утверждённый pattern и не собирает переход напрямую из
`motion.duration.*`/`motion.easing.*`. Catalog документирует состав motion event,
асимметрию enter/exit, ограничение в одно-два безопасных свойства, связь движения с
trigger/source, немедленное обновление focus/error/ARIA-состояний и полноценную
альтернативу для `prefers-reduced-motion: reduce`.

Primitive, Alias и Static явно помечены как internal authoring/trace layers:
product code использует только Context, а color Component tokens остаются
внутренней реализацией Core. Для каждого Context record
Catalog показывает раскрываемые Light/Dark цепочки Context → Alias → Primitive →
resolved value; Overlay заканчивается прямым RGBA, а Static не зависит от theme.
Полные переносимые graphs без UI-представления сохраняются в
[`generated/color-tokens.json`](../../design/design-system/generated/color-tokens.json),
[`generated/foundation-tokens.json`](../../design/design-system/generated/foundation-tokens.json)
и
  [`generated/typography-tokens.json`](../../design/design-system/generated/typography-tokens.json).

Opacity является единственным числовым источником прозрачности.
`color.alias.overlay.backdrop` остаётся отдельной theme-aware RGBA-ролью, которая
реально окрашивает Dialog/BottomSheet scrim и не дублирует числовую шкалу.

## Component coverage

Общий information template построен для всех 57 Registry entries и показывает
применимые fields: purpose, status, level, category, synonyms, variants, sizes,
states, dependencies, API, accessibility, platform targets, canonical
implementations, token mapping, composition, related entries, replacement и
lifecycle warning.

| Срез | Stable | Beta | Experimental | Deprecated | Всего |
| --- | ---: | ---: | ---: | ---: | ---: |
| Все Registry entries | 18 | 26 | 9 | 4 | 57 |
| Только components | 17 | 16 | 5 | 4 | 42 |
| Primitives | 0 | 8 | 0 | 0 | 8 |
| Templates (patterns) | 1 | 2 | 4 | 0 | 7 |

Catalog не меняет статусы. Under-evaluation patterns остаются визуально отличимы от
stable Core. Deprecated components (`Select`, `Modal`, `ActionMenu`) не показываются
в общем списке Components и в связанных рекомендациях. Они остаются в Registry и
доступны по сохранённым прямым ссылкам с lifecycle warning и replacement, чтобы не
ломать миграцию существующих интеграций. Поэтому пользовательская витрина содержит
39 актуальных component entries до исключения внутренних `IconButton` и `Tab`.

Витрина Components разделена на семь пользовательских групп: Controls, Inputs &
selection, Navigation, Data display, Feedback, Overlays и Media & icons. Button и
Chip входят в Controls, а Breadcrumbs, Link и Segmented Control — в Navigation; отдельная
малочисленная группа Actions не используется. TextField, DatePicker, Dropdown и
OptionList собраны в Inputs & selection. Card относится к Data display. Badge и Counter относятся к Feedback:
первый сообщает короткий статус, второй — количество. Avatar, Icon, Image и
Thumbnail образуют Media & icons; самостоятельный MediaFallback скрыт как deprecated
и остаётся внутренней совместимой частью Image.
Внутри каждой группы карточки сортируются по lifecycle: Stable → Beta →
Experimental, а внутри одного статуса — по каноническому имени. Категория остаётся
registry-данными и определяет группу; отдельная ручная раскладка компонентов не
поддерживается.

## Search and terminology

Глобальный поиск работает по canonical name, `synonyms`, purpose, category, states,
полным token paths, aliases, resolved foundation values, patterns, guides и icons.
Color, Dimension, Border Style, публичные Typography Styles и внутренние
Typography Primitive references ведут к точной записи на своей канонической
Foundation route. Удалённые Typography
Semantic/Component paths не индексируются как canonical records. Результат
объясняет, почему найден entry:
canonical match, synonym или deprecated replacement. Например, `TextInput` ведёт к
`TextField`. Старый `Input` полностью удалён из Registry, списка и общего Core API:
CSS alias `rf-input` и группа `component.input` больше не выпускаются.
Сохранённая ссылка `#components/input` перенаправляется на `#components/text-field`.
Аналогично удалён дублирующий SearchField: поиск иконок и responsive-пример используют
TextField с `type="search"`, а ссылка `#components/search-field` ведёт на
TextField. Классы `rf-search-field*` не выпускаются. SearchBar остаётся самостоятельным
паттерном поискового сценария (поле, очистка, отправка и результаты).
Отдельный Field удалён из Registry, каталога и общего API; его семь демонстрационных
примеров и отдельные параметры удалены, а не перенесены в TextField. Текущий
TextField сохраняет свои Variant/State/Size и настройки без изменений.
Общая anatomy теперь принадлежит TextField: `rf-text-field-group` — контейнер,
`rf-text-field__control/label/hint/error/icon/action` — внутренние части.
Сам input сохраняет класс `rf-text-field`. Старые `rf-field*` не выпускаются;
все активные потребители в Admin и Mini App обновлены вместе с Core. Multiline,
Dropdown и DatePicker переиспользуют эту anatomy, сохраняя свои нативные controls.
Ссылка `#components/field` перенаправляется на TextField. Новый набор параметров,
вариантов и токенов не создаётся.
Legacy-переменные продуктовой темы `--input-*` получают значения из TextField,
не создавая отдельный компонент или набор токенов. В исходниках Admin, Mini App и
Landing потребителей класса `rf-input` нет. Поисковые имена `InputField` и `TextInput`
ведут на один TextField и не создают отдельные компоненты.

Terminology и comparison guides разбирают Button/Link, Badge/Chip,
Dialog/BottomSheet, Toast/Alert, Tabs/SegmentedControl,
Spinner/Skeleton и Card/ListItem. Aliases используются только для
discovery и не создают компоненты-синонимы.

## Playground and states

### Страница Breadcrumbs

Breadcrumbs добавлен как beta Web-компонент в Navigation. Страница следует общему
оформлению утверждённых компонентов: hero, Anatomy, Use/Don’t use, Playground,
независимое переключение темы и Examples с готовым HTML. Playground меняет
Variant (`default`/`supporting`), Size (`md`/`sm`), Separator (Chevron/Slash/Dot),
глубину 2–5, Home Icon и явное сокращение середины пути.

Каноническая анатомия — именованный `nav`, ordered list, нативные ссылки для
родительских уровней и обычный текст с `aria-current="page"` для текущей страницы.
Chevron и Home используют только Icon. Рекомендовано не больше пяти видимых
уровней; `…` в beta API не получает скрытое menu behavior и при необходимости
композируется с отдельным Dropdown.
Preview и параметры Breadcrumbs разделены тем же системным `gap-4`, что и Button и
Slider; Light/Dark toggle остаётся внутри preview.
В индексной карточке показан отдельный неинтерактивный specimen без вложенных ссылок:
вся карточка уже является одной ссылкой на страницу Breadcrumbs, поэтому настоящий
`a` внутри неё нарушил бы HTML-анатомию и раскладку сетки.

### Страница Radio

В Playground Radio и Checkbox есть отдельный Switch **Error**, выключенный
по умолчанию. Он не меняет Value или State: передаёт `aria-invalid="true"`
на input и связывает сообщение через `aria-describedby`. Ошибка использует
Context error для контура и выбранной заливки; при Hover, Pressed и Focused
ошибка имеет приоритет. Disable и Skeleton временно скрывают error presentation
и ARIA-ошибку, сохраняя положение переключателя Error; выход возвращает ошибку.
В превью по-прежнему нет видимой подписи. Сообщение доступно скринридеру.
Строка Error на обеих страницах занимает всю ширину формы: подпись слева,
Switch у правого внутреннего края, в одной строке даже на узком экране.

Chip использует общий шаблон страницы: обложка, Anatomy → Chip, Playground,
Examples с вкладками «Описание» и Web и копированием исходного HTML.
В группе Controls карточка Chip расположена после Stable-контролов и перед Slider.
В её превью показан сам Chip Primary размера M с текстом «Пионы», без иконок
и общей заглушки Selection. Превью не интерактивно: вся карточка открывает страницу Chip.
Варианты Primary / Secondary / Tertiary и состояния берутся из registry.
Прежние Neutral / Filter / Selected / Removable удалены из списка и примеров.
State: Default, Hover, Pressed, Focused, Disable, Skeleton. Skeleton скрывает содержимое без
изменения геометрии, выключает кнопку и сообщает загрузку через внешний
role=status / aria-busy; Disable сохраняет видимый текст и иконку.
Playground настраивает Variant, State, Size (L 40 px / M 32 px / S 24 px) и Label;
порядок размеров — L, M, S, по умолчанию M. На touch видимая высота та же,
но невидимая область нажатия не ниже 44 px. Тема превью переключается независимо.
Start icon / End icon включаются независимо, каждый имеет поиск Glyph.
Размеры публичного Icon привязаны к Chip: L → 24 px, M → 16 px, S → 12 px.
В Skeleton обе иконки скрыты с сохранением геометрии, в Disable видимы.
Три варианта меняют только оформление; превью демонстрирует нажатие без изменения
данных. Core задаёт представление, продукт владеет обработчиками. Примеры лежат
в `examples/chip/`. Chip имеет статус Stable Web;
страница доступна по `#components/chip`, вкладка — `?chipTab=chip`.

Radio — каноническое имя бывшего RadioGroup; lifecycle — Stable Web после
утверждения владельцем. Value, шесть State, Error, обе темы, доступные имена
и нативная клавиатурная навигация покрыты проверками. Поиск
понимает RadioGroup и RadioButton, старый `#components/radio-group` открывает
`#components/radio`, сохраняя query-параметры. Карточка входит в Stable-часть группы
Controls и использует ту же нативную иллюстрацию, что обложка страницы.

Страница следует общему шаблону: обложка, Anatomy → Radio, Playground, Examples
с вкладками Описание / Web и копированием кода. `radioTab=radio` открывает превью.
В Playground один Radio без видимой подписи и заголовка группы, с доступным
именем через aria-label. Value — Unchecked / Checked; State — Default, Hover,
Pressed, Focused, Disable, Skeleton, именно в таком порядке. Invalid убран.
Размер один, M / 24 px, поэтому отдельного Size нет. Темы превью переключаются
независимо от темы каталога. Hover и Pressed работают через data-state и настоящее
наведение/нажатие; Focused переводит настоящий фокус. Disable сохраняет видимый
выбор, Skeleton скрывает input и показывает сплошной круг загрузки без изменения
размера. Для Skeleton input disabled, choice aria-hidden, внешний контейнер
получает role=status, aria-label и aria-busy; выход восстанавливает выбранное значение.
При переходе Skeleton → Focused фокус ставится после обновления видимости
контрола (два animation frame), иначе браузер может проигнорировать focus().
Space выбирает Radio; повторный клик не снимает выбор.
Фокус Radio — круглый слой внутри размеров input, без внешней квадратной рамки.
Он рисуется на rf-choice: нативный radio игнорирует border-radius собственной
обводки. В forced-colors сохраняется системный Highlight. Checkbox не меняется.
Полный пример группы с подписями остаётся в Examples.

Это переименование и обновление документационной страницы, а не замена
нативного Radio: публичные `.rf-choice`, `.rf-choice__input`, `.rf-radio-group`
и группировка через общий `name` сохранены. Клавиатуру и единственность выбора
обеспечивает браузер. Пример и Playground используют разные name и не влияют
друг на друга. Новых native adapters или product-миграций нет.

### Страница Counter

Новый Beta-компонент `#components/counter` — числовая метка, а не текстовый Badge
и не кнопки изменения количества. Страница: Anatomy → Counter, Playground,
Examples Brand/Neutral с исходным HTML и копированием. `?counterTab=counter`
открывает Playground; карточка находится после Segmented Control.
Размер — 20 px. Настройки: Variant Brand/Neutral, State Default/Skeleton,
Value и Max (по умолчанию 3 и 99). Value/Max — демонстрация форматирования
потребителя: целые числа 0…999999999, Max не меньше 1; больше Max → `Max+`.
Точное число доступно скринридеру. Ноль не скрывается. Skeleton сохраняет
геометрию и сообщает загрузку внешним status-контейнером. Тема превью независима.
Новый контракт хранится в component.counter tokens и canonical content.css.
До утверждения внешний вид существующего счётчика Segmented Control не меняется.

### Страница Segmented Control

`#components/segmented-control` использует общий шаблон: обложка с самим
компонентом, Anatomy → Segmented Control, Playground и Examples с вкладками
Описание / Web и копированием исходного HTML. Карточка стоит сразу после Radio.
`?segmentedTab=segmented-control` открывает Playground напрямую.
Настройки: Value, Size S/M, Count и Disabled для «Архивные». Выбор в превью
синхронизирован с Value; при отключении выбранных «Архивные» выбираются «Активные».
Состояния Hover/Focused проверяются нативным наведением и клавиатурой;
публичный контракт и Stable-статус не меняются. Light/Dark превью независимы
от темы страницы. Группы примера и Playground имеют разные name и не влияют
друг на друга. Код примера — `examples/segmented-control/single-select.html`.
Это локальный взаимоисключающий выбор, не Tabs и не навигация по URL.

### Страница Checkbox

Checkbox использует общий шаблон обновлённых страниц: неинтерактивная обложка,
Anatomy → Checkbox, Playground и два source-backed примера Value с вкладками Описание / Web
и копированием HTML. В Components порядок начинается Button, TextField, Icon,
Switch, Badge, Tabs, Avatar, Checkbox. Обложка карточки совпадает с обложкой страницы.
Examples содержит только Unchecked и Checked вместо общей карточки Default.
Оба примера получаются из канонического HTML: Checked добавляет checked.
Примеры переключаются независимо от Playground.

Playground разделяет Value (Unchecked / Checked / Indeterminate) и State
(Default / Hover / Pressed / Focused / Disable / Skeleton) и изолированную
Light/Dark-тему. Встроенного Label и его настройки нет, как у Switch:
Playground и HTML-пример показывают только Checkbox. Доступное имя обязательно
задаётся через aria-label или aria-labelledby. Переключение мышью или Space обновляет Value.
Focused переводит настоящий фокус в input, не имитирует его отдельным CSS;
Hover и Pressed используют те же semantic-цвета, что реальные :hover / :active.
Disable соответствует нативному disabled; Invalid убран из настроек State.
Disable имеет приглушённый контур (border.secondary.active) на базовом фоне:
Unchecked остаётся пустым, Checked сохраняет отметку выбора.
Skeleton — сплошная заливка без контура и отметок. Ранее disabledBackground и
skeleton.base разрешались в один neutral-2, из-за чего пустой Disable был похож
на Skeleton. Различие закреплено в canonical forms.css и browser-проверке обеих тем.
Indeterminate возвращён третьим Value рядом с Unchecked и Checked, с отдельным
примером и кодом установки DOM-свойства `input.indeterminate = true`.
Фиксированный знак «минус» обозначает частичный выбор. Disable сохраняет его,
Skeleton скрывает; возврат в Default восстанавливает Value. Space снимает
промежуточное значение и переводит Checkbox в Checked по нативным правилам.
Единственный публичный Size M — 24 px, высота кликабельной строки не меньше 44 px;
неизменяемые Variant и Size не занимают отдельные строки настроек.

Декомпозиция: Checkbox (rf-choice), Dropdown, TextField, Icon, Tabs и общий layout
Catalog. Checkbox сохраняет нативную семантику input и получает системную оболочку
rf-choice__control: радиус component.selectionControl.checkboxRadius → radius.md
(8 px), галочка и промежуточное значение — декоративные Icon. Псевдоклассы input
управляют оформлением без дополнительных обработчиков и дублирования значения.
Галочка использует Icon checkbox-check / Line в размере M (24 px). Контур точно
взят из предоставленного владельцем Union.svg, сохранён в design/icons/custom/checkbox-check.svg.
Исходный viewBox 12×10 центрируется в сетке 24×24 переносом (6, 7), без
масштабирования и перерисовки path; белый цвет становится currentColor для тем.
Обложка, Playground и HTML-пример используют одинаковую иконку;
глобальный рисунок checkmark не меняется.
В forced-colors используется нативное отображение. Старые input без оболочки не
меняются; миграция продуктовой разметки выполняется отдельно после просмотра.
Skeleton задаётся data-state="skeleton" на rf-choice: disabled input и весь
контент скрыты от скринридера через aria-hidden на rf-choice; внешняя обёртка
получает role="status", aria-label="Загрузка выбора" и aria-busy="true".
Плейсхолдер контрола сохраняет геометрию и не интерактивен. Снятие
Skeleton возвращает сохранённый Value и доступное имя, удаляет атрибуты загрузки.
Checkbox — Stable Web: внешний вид утверждён владельцем, Value/State, темы,
доступность и код примеров проверяются автоматически. Кликабельная область
увеличена до 44×44 px без изменения видимого контрола 24 px. Мобильные браузеры
используют тот же Core; native adapters не заявлены. Публикация — отдельно
после release gate; повышение статуса само по себе не мигрирует legacy-экраны.

После добавления страницы runtime HTML/CSS/JS — 521549 bytes raw / 91542 gzip;
бюджет округлён до 510 / 90 KiB. После добавления оболочки Checkbox и Icon
бюджет Model увеличен с 418 до 419 KiB raw, а после добавления Stable guidance
и мобильной стратегии Checkbox — до 420 KiB; gzip остаётся 53 KiB.
Browser-проверки покрывают значения, шесть состояний, Skeleton semantics,
реальный фокус, Space, доступное имя без видимого Label, локальную тему, вложенные tabs,
порядок карточек, неинтерактивную обложку и мобильную ширину в обеих темах.

Фокус Unchecked Checkbox рисуется одним системным контуром внутрь границы native input:
отрицательный outline-offset равен толщине outline. Это перекрывает нативную
обводку вместо второго внешнего контура, сохраняет focus-visible и не добавляет
box-shadow. У Checked и Indeterminate сохраняется внешний focus-контур без
зазора: он остаётся заметным рядом с заливкой. Правило находится в canonical
forms.css, только для checkbox; Radio и остальные controls не меняются.

### Страница Avatar

`#components/avatar` использует общий шаблон Button/Badge: неинтерактивная
обложка с Avatar XL, Anatomy → Avatar, Playground и три source-backed примера
с описанием и копированием кода Web + Mini App. Та же обложка находится в списке
Components; порядок карточек не менялся. `avatarTab=avatar` открывает Playground,
вкладки примеров не меняют этот параметр. Статус остаётся Beta.

Playground показывает Variant Image / Initials / Placeholder, State Loading /
Loaded / Error / Empty, Size XS / S / M / L / XL (24/32/40/48/64 px), доступное
Name и до двух букв Initials. Размеры читаются из component token trace; уже
существующий XS включён в registry. Placeholder использует публичный Icon `user`.
Для Image переиспользовано локальное фото цветов — не портрет реального пользователя
и не внешняя загрузка. В продуктовом примере путь нужно заменить своим фото.

Canonical Avatar сохраняет размеры во всех состояниях: Loading скрывает вложенное
содержимое на системном skeleton-фоне, Error/Empty скрывают img. Потребитель отвечает
за загрузку, fallback и доступную семантику; Playground моделирует состояния,
подставляет инициалы либо Icon и обрабатывает ошибку изображения. При загрузке
контейнер получает role=status, aria-busy и имя; в остальных состояниях role=img
и имя пользователя. Имя не выводится поверх Avatar. Для дублирования соседнего
имени в продукте используется aria-hidden. Новых focus/hover/pressed состояний нет.

Локальная тема превью изолирована от темы страницы, обложка и примеры следуют
глобальной теме. Browser-тесты покрывают пять размеров, четыре состояния,
изображение/fallback, обе темы, мобильную ширину, уникальные ID и вложенные tabs.
Декомпозиция: существующие Avatar + Icon + Dropdown + TextField + Tabs; новый
шаблон страницы не создаёт продуктового компонента. Найденные gaps — отсутствующий
XS в registry и непоказанные media states — закрыты в canonical source и Catalog.
Миграция продуктовых сценариев и публикация в эту правку не входят.

После добавления Avatar бюджет model — 416 KiB raw / 52 KiB gzip; runtime
HTML/CSS/JS — 496 KiB raw / 88 KiB gzip (измерено 506931 / 89657 bytes).
Новая библиотека или изображение не добавлялись.

### Страница Tabs

Tab и Tabs переведены в Stable совместно: группа использует тот же контракт
элемента, без отдельной beta-зависимости Tab. Основания — два независимых применения
Core (Admin User Profile и опубликованный Design System Catalog), source-backed
примеры, проверенные состояния, клавиатура, обе темы и мобильная ширина. Stable
заявлен для Web и Telegram Mini App через общий Web adapter; это не новая миграция
продуктовых экранов и не обещание native iOS/Android реализации.

Explicit WebView implementation и stable-guidance увеличили модель до 427071 bytes
raw / 53280 gzip; текущий бюджет model — 418 / 53 KiB. Runtime остаётся в пределах
496 / 88 KiB. Браузерный набор проверяет восемь сценариев Tab/Tabs, включая
Disabled/Skeleton, Icon slots, группы 1–10, клавиатуру и изолированные темы.

**Контракт композиции:** Tabs состоит из компонентов Tab и использует их единый
API, а не параллельную реализацию. Оба зарегистрированы отдельно как Beta;
в dependencies Tabs явно указан Tab. Tab владеет Label, Value (Default / Selected),
State (Default / Hover / Pressed / Focused / Disable / Skeleton), Start icon и End icon.
Tabs владеет списком, активным элементом, roving tabindex, клавиатурной навигацией
и связями с панелями; выбор группы меняет Value соответствующего Tab.
Состояния, иконки и оформление дочернего элемента не переопределяются группой.

Canonical пример Tab — `examples/tab/line.html`; состояния Playground читаются из
его registry. Превью группы строит каждую вкладку из этого же образца, добавляя
подпись, уникальные id и выбор из `examples/tabs/line.html`. Согласованность анатомии
примеров и зависимости проверяется тестом. Tab не добавляет карточку в Components:
ссылка registry `#components/tab` открывает раздел Tab внутри страницы Tabs.
Настройки двух Playground независимы: это два экземпляра одного контракта.
В Playground группы Tabs не выводятся единственные Variant и Size — как и в Tab.
Параметры группы: «Количество табов» (1–10, по умолчанию 3) и Active tab.
Disabled убран из настроек группы; само состояние по-прежнему доступно у Tab.
Active tab предлагает только существующие вкладки. При уменьшении количества
выбор сохраняется, если вкладка остаётся; иначе выбирается последняя доступная.
Новые элементы используют canonical Tab, получают уникальные id и связанные панели.
Клавиатурная навигация остаётся в Core; ряд прокручивается на узком экране.

Tabs расположен сразу после Badge, шестым в Components. Страница `#components/tabs`
использует общий шаблон: неинтерактивная обложка с Core Tabs в обеих темах,
разделы Anatomy → Tab → Tabs. Tab — один элемент, Tabs — группа вкладок.
Прежний параметр `tabsTab=items` сохранён для совместимости ссылок и открывает Tab;
`tabsTab=tabs` открывает группу. Оба сохраняют выбранный раздел;
вложенные вкладки не меняют этот параметр. Playground позволяет выбрать активную
панель, изменить количество вкладок и переключить тему только превью. Hover и Focused
проверяются настоящим наведением и клавиатурой. Стрелки, Home и End переключают
доступные вкладки, Tab переводит фокус в панель.

Раздел Tab показывает один элемент: отдельные Playground и Example, Value Default / Selected
независимо от State Default / Hover / Pressed / Focused / Disable / Skeleton. Повторяющиеся Pressed из
запроса представлены одним пунктом. Единственные Variant и Size не выводятся в Tab.
Первым параметром идёт Value. Label редактируется,
тема превью независимая. Start icon / End icon включаются отдельно, каждый с выбором
Glyph через общий поиск. Внутри — публичный Icon S (16 px), цвет наследуется от Tab,
отступ между содержимым — системный spacing-8. По умолчанию оба слота выключены.
`aria-selected` управляет Value; `data-state` позволяет показать состояние без
принудительного перемещения фокуса. Нативные hover, active и focus-visible продолжают
работать; pressed использует Context Text Brand Active. Disable использует нативный
`disabled`, пропускается при Tab и не меняет Value. В Core значение называется `disabled`.
Skeleton также недоступен: скрывает дочерний текст/иконки без изменения геометрии,
использует Context Background Skeleton Base. Превью сообщает загрузку через
role=status и aria-busy, вложенная группа скрыта от скринридера; выход из Skeleton
восстанавливает доступность и выбранное Value.
Пример получен из того же canonical Line: сохраняет tablist,
один tab и связанную визуально скрытую панель. Это изолированный образец элемента,
а не рекомендация делать продуктовую группу из одной вкладки. Настройки Tab и Tabs
сохраняются при переключении разделов и не влияют друг на друга.

Источник примера — `examples/tabs/line.html`, подключённый через `code-examples.json`.
Каждое превью получает собственные id, код копируется из canonical source.
Registry уточнён по фактическому Core API: Line / M (минимальная высота 44 px).
Ранее заявленные Segmented и S не имели реализации и больше не предлагаются как
доступный API. Tab и Tabs имеют статус Stable. В canonical navigation.css добавлены
Icon-слоты, pressed и демонстрационные состояния; контроллер Core JS не менялся.
Generated Core-копии пересобраны генератором; отдельной миграции продуктовых экранов
и публикации в этом изменении нет.

Для страницы Tabs бюджеты подняты адресно: model — 413 KiB raw / 52 KiB gzip,
runtime HTML/CSS/JS — 482 KiB raw / 86 KiB gzip. Измерено соответственно
422778 / 52309 и 492617 / 87983 bytes. Добавлены registry Tab, его canonical HTML-пример
и управление количеством вкладок 1–10;
новых зависимостей и графических ассетов нет.

### Страница Badge

Badge размещён сразу после Switch (пятый в Components). Его страница
`#components/badge` использует общий стиль Button/Switch: неинтерактивная обложка
«Новое», вкладки Anatomy и Badge, Playground и Examples. `badgeTab=badge` сохраняет
вкладку при обновлении страницы; вложенные вкладки кода её не меняют.
Variant, Size и State (Default / Skeleton) берутся из registry. Brand стоит первым
в Variant и Examples; начальный выбор в Playground остаётся Neutral. Label размещён
отдельной строкой; пустой ввод показывает «Статус», текст вставляется безопасно.
У M текст уменьшен до Body S (14/18 px), высота 24 px и боковые отступы 8 px
сохранены. S не изменён: высота 20 px, отступы 4 px, текст 12/16 px.
Start icon и End icon включаются независимо; у каждого есть поиск и выбор Glyph
из общего набора. Рисунок рендерит публичный Icon XS (12 px), цвет наследуется
от Badge. По умолчанию оба выключены. Skeleton скрывает текст и иконки без изменения
габаритов; сообщает загрузку через aria-busy и доступное имя «Загрузка статуса».
Переключатель Light/Dark меняет только превью. Все шесть вариантов имеют пример
из `examples/badge/` с описанием, Web-кодом и копированием; сам Badge не интерактивен.
Brand в Examples показан без иконок; готовый Web-код соответствует превью.
Skeleton остаётся в Playground, отдельной карточки в Examples нет.
Область примера Neutral использует Background Canvas, чтобы Background Primary
самой метки не сливался с окружением в светлой и тёмной темах.
Карточка и обложка наследуют тему страницы. Neutral использует Background Primary
(`color.context.background.primary.default`) вместо Tertiary в обеих темах;
изменён canonical token `component.badge.neutralBackground`, а не локальный CSS.
Цвет текста и остальные варианты не изменены. Статус Stable сохранён.

### Страница Switch

В списке Components Switch стоит четвёртым: Button → TextField → Icon → Switch.
Остальные карточки сохраняют сортировку по категории и имени.
Switch имеет статус Stable в registry и на карточке Components. В шапке страницы
отдельная метка статуса не выводится. Stable относится к Web API;
React/native adapters пока не реализованы. Guidance хранится в catalog-guidance.json.

`#components/switch` оформлена как Button/TextField: общая неинтерактивная
иллюстрация для hero и карточки Components, вкладки Anatomy и Switch,
playground и Examples. `switchTab=switch` сохраняет выбранную вкладку в URL;
вложенные вкладки примеров не меняют её. Обложка следует теме всей страницы,
а Light/Dark внутри playground переключается независимо.

Value задаёт Off/On; State — Default, Hover, Pressed, Focussed, Disabled, Skeleton;
Size — L · 32 px, M · 24 px, S · 16 px (высота дорожки). Видимого Label и его
настройки нет. Input сохраняет доступное имя через `aria-label`. Нажатие в preview
синхронизирует Value без пересоздания input и потери фокуса. Настоящие hover/pressed
и keyboard focus работают наряду с фиксированными состояниями для просмотра.
Skeleton не интерактивен и скрывает неизвестное значение. Два примера — Off и On — имеют
описание, Web-код и копирование; источник — `examples/switch/default.html`.
Отдельные карточки Hover, Pressed, Focussed, Disabled (Off/On) и Skeleton удалены;
сами состояния сохранены в Playground и контракте компонента.

Геометрия обновлена после сравнения с [Astryx Switch](https://astryx.atmeta.com/components/Switch):
компактная заполненная дорожка, круглый ползунок, равные отступы 2 px;
размеры дорожек 56×32 / 40×24 / 24×16 px, область нажатия не меньше 44×44 px.
Off использует прежний нейтральный фон: `selectionControl.border` для Default/Focussed,
`border.primary.hover` для Hover, `border.primary.default` для Pressed. On остаётся Brand,
Disabled и Skeleton сохраняют отдельные системные роли.
Browser-проверки покрывают 72 сочетания Size × Value × State × Theme,
геометрию ползунка, hit area, Space/Tab, настоящий Hover/Pressed, RTL,
forced colors, недоступный Skeleton, отсутствие Label и обложки на узком экране.
После утверждения владельца 31 августа 2026 года Switch и Badge перенесены
генератором в локальные публичные Core-копии Admin, Mini App и Landing вместе с
цветовыми и размерными токенами. Версии CSS в HTML-шаблонах обновлены, чтобы
браузер не сохранял старое оформление. Badge в карточках Mini App, Bloom и
админке уже использует публичный Core: локальные классы карточек задают только
расположение метки и не переопределяют её цвет или размер. Продуктовых потребителей
Switch пока нет; обновлённый компонент доступен во всех трёх сервисах.
Проверка service-copy parity не допускает расхождения с canonical; браузерный
регрессионный тест проверяет размеры Switch и Badge на CSS каждого сервиса в обеих
темах. Перенос локальный: commit, push и production-деплой выполняются отдельно,
после обязательного release gate.

Button, TextField и отдельный Slider получили интерактивные playgrounds поверх
настоящего Core UI. Slider не является вариантом Input: он выбирает приблизительное
значение, а точный числовой ввод остаётся задачей Number TextField.
Playground Slider теперь использует тот же внешний `Stack / gap-4`, что Button:
preview и панель параметров разделены системным отступом. В preview есть независимый
Light/Dark toggle; он применяет сгенерированные Context, Slider и TextField tokens,
не меняя тему всей страницы Catalog.
Отдельная State matrix со страницы Slider удалена: все настраиваемые состояния
проверяются в Playground, а ниже остаётся только компактный готовый Example.
Для Button можно менять variant, state, size `S/M/L` (`32/40/48 px`), label,
Subtitle, Start icon и End icon; иконки включаются независимо и остаются 24 px.
Состояния включают default, hover, pressed, focused, disabled, loading и skeleton.
TextField использует ту же структуру страницы, что Button: hero, вкладки `Anatomy`
и `TextField`, Playground и четыре карточки из Registry: `default`
(native `type="text"`), `search` (`type="search"`), `password` (`type="password"`)
и `price` (decimal text input с валютой).
Телефон, email, число и ссылка пока убраны из Variant и файлов примеров;
поддержка native input types в Core не удаляется.
Иконки, trailing action и clearable удалены из вариантов и отдельных примеров;
публичная анатомия Core по-прежнему поддерживает эти параметры.
Настройки идут в порядке Variant → State → Error → Size → Label → Value →
Placeholder → Description → Start icon → End icon. Description (ранее Helper text)
включается Switch. У Default Start icon выключен по умолчанию; у Search включена
иконка поиска. При смене Variant начальное значение Start icon берётся из HTML-примера.
Его можно выключить вручную; другие настройки не сбрасывают выбор. End icon выключен
по умолчанию и включается независимо. Search-карточка и готовый код также содержат
иконку поиска. Используются готовые Core slots `.rf-field__icon` и
`.rf-field__trailing-icon` с модификаторами отступов input, без дополнительного CSS.
Системные search/check декоративны (`aria-hidden`), не являются действиями и скрыты
в Skeleton. Размер остаётся каноническим для TextField — 16 px.
Error — независимый Switch, выключенный по умолчанию. Он задаёт `aria-invalid`
и меняет Description на системный `.rf-field__error`: рамка и описание получают
цвет ошибки в обеих темах, включая Hover/Pressed/Focused. Текст Description и его
переключатель сохраняются; скрытое описание не связывается через `aria-describedby`.
Skeleton скрывает описание ошибки и сохраняет свою загрузочную заливку.
По умолчанию Label включён, Placeholder выключен для всех вариантов.
Ручной выбор сохраняется при смене Variant. Label и Placeholder имеют Switch:
можно включить оба, но нельзя выключить
оба. При выключении последнего активного параметра второй включается автоматически.
Выключенное текстовое поле настройки недоступно, его текст сохраняется.
Без видимого Label превью сохраняет доступное имя через `aria-label`; Placeholder
работает нативно. При выключенном Placeholder используется технический пробел для
`:placeholder-shown`, чтобы floating Label корректно работал у пустого поля.
Размеры S/M/L отображают существующий API `sm/md/lg` (40/44/48 px), без миграции
контракта TextField под размеры Button. State содержит ровно Default, Hover,
Pressed, Focused, Disabled, Skeleton. Hover/pressed/focused симулируются в Catalog
без перехвата фокуса. Во всех вариантах TextField Focused и настоящий keyboard focus
меняют только цвет тонкой рамки 1px, без второго контура или тени. Error сохраняет
красную рамку той же толщины. Правило работает в Light/Dark.
Disabled использует native disabled; Skeleton — canonical
`data-skeleton="true"`, disabled, aria-hidden и aria-busy на контейнере. Он сохраняет
размер поля, скрывает текст/подпись/подсказку и учитывает reduced motion.
Filled, Read Only и Invalid удалены из меню; native readonly/validation в Core сохранены.
Локальный Light/Dark toggle меняет только превью через canonical resolved tokens.
Прямой ввод в превью синхронизирует Value. Variant берёт native type и autocomplete
из файла примера; отдельного Type нет. При смене назначения обновляются Label,
Placeholder и Description.
Default/Search сохраняют `autocomplete=off`; Search отключает автокоррекцию.
Default/Search в Playground, Anatomy и готовых HTML-примерах подключают Core
`data-rf-input-clear`: крестик виден только при focus-within и непустом редактируемом
значении, очищает его и возвращает курсор в поле. Очистка синхронизирует настройку
Value; Tab → Enter тоже работает. При видимом крестике декоративный End icon скрыт,
после очистки или потери фокуса возвращается. Password сохраняет глаз, Price — валюту;
очистка в эти фиксированные trailing slots не добавляется.
Password использует `autocomplete=current-password` и существующий Core password-toggle.
Глаз виден даже у пустого поля, раскрывает/скрывает пароль с сохранением ввода и фокуса.
End icon включён и заблокирован для настройки: trailing slot занят постоянным глазом,
декоративная иконка не дублируется. В Disabled глаз недоступен, в Skeleton скрыт.
Value в настройках Password тоже маскируется; при переходе в/из Password значение
очищается, чтобы случайно не показать пароль в другом варианте. Карточка и HTML
содержат ту же готовую композицию, без отдельной реализации переключения в Catalog.
Price добавляет постоянный текстовый suffix ₽ вместо End icon (его Switch заблокирован).
Currency появляется только у Price, сразу после Variant. В демонстрационном списке
RUB, KGS, KZT, GEL, UZS, EUR, USD, GBP, HNL — коды и подписи из текущего money.py.
Выбор меняет только валюту справа; сумма и выбор валюты сохраняются при изменении
других настроек. Пересчёта по курсу нет. Готовый HTML использует `data-rf-currency`;
Core получает символ через Intl, продукт может передать свою локализованную подпись
через `data-rf-currency-label` (каталог использует `сом`/`сум` и другие подписи проекта).
Валюта не входит в value и остаётся в
`aria-describedby`, даже когда Description выключен. Core `data-rf-price` принимает
цифры, точку/запятую и до двух десятичных знаков, удаляет пробелы группировки и
нормализует запятую в точку. Недопустимый ввод отклоняется, сумма не округляется.
Вставка `1 234,50` даёт строку `1234.50`; отрицательные суммы и экспонента запрещены.
Ограничение действует и в Value Playground, и в примере через один Core controller.
Пустой ввод разрешён; required, бизнес-лимиты и серверная проверка остаются в продукте.
Suffix использует существующие токены, имеет disabled-цвет и скрывается в Skeleton.
Карточки имеют один ряд вкладок `Описание` / `Web + Mini App` и копирование кода.
HTML хранится в `examples/text-field/`, регистрируется в `code-examples.json` и
используется и для живого превью, и для кода. React/native adapter TextField пока
не реализован — вкладки с фиктивным импортом нет. Старый общий Playground удалён;
расширенные stress specimens и autofill-проверки остаются в Specimen Lab/Core tests.
Новые controls и карточки переиспользуют существующий layout Button/Typography;
Pressed и Skeleton реализованы в canonical forms.css на существующих токенах;
продуктовые страницы новые состояния пока не используют.
TextArea удалён как отдельная запись Registry и страница каталога. Теперь это
`TextField` с Variant `multiline` (подпись в интерфейсе — Multiline). В Playground
из свойств компонента видны только Variant и Placeholder: без переключателя Placeholder, Label,
Description, Error, Size, State, Value и иконок. Ввод выполняется прямо в превью,
переносы строк сохраняются; нижний угол растягивает поле по высоте, не по ширине.
Placeholder сопровождается `aria-label`, поэтому поле имеет доступное имя и после
ввода текста. Старый `#components/text-area` ведёт на TextField. Готовый исходник —
`examples/text-field/multiline.html`; Admin Broadcast использует этот же вариант
с прежними `name`, `required`, `maxlength` и восстановлением черновика.
Старый класс `rf-text-area` больше не выпускается: используется
`rf-text-field rf-text-field--multiline`, без отдельного набора цветов и состояний.
Браузерный контракт Multiline проверяет прежний маршрут, только два видимых свойства компонента,
ввод переносов строк, редактирование Placeholder, настоящее растягивание мышью,
неизменность ширины, светлую/тёмную тему, тонкий фокус, готовый код и возврат к Default.
Размеры окна в проверке: 390, 980 и 1440 px.

В Playground TextField и Button Start/End icon имеют отдельный Glyph dropdown с
поиском по единому набору Icon. Выключенный слот блокирует выбор, но сохраняет
выбранное имя. В Password/Price выбор End Glyph скрыт, поскольку справа находится
служебное действие/валюта; Multiline по-прежнему не показывает настройки иконок.
TextField Value располагается под подписью на всех ширинах, как Label/Description.
В Playground TextField Description по умолчанию выключен: поле настройки недоступно,
пояснение в превью отсутствует. Переключатель включает его вручную и сохраняет текст.
Декоративный образец перед TextField Width удалён; сам регулятор сохранён.

Для всех вариантов TextField в Playground доступен Width — настройка ширины
превью, не новое свойство компонента. Использует тот же Slider и раскладку, что Metrics:
0–1600 px, по умолчанию 560 px, на узком экране ползунок занимает всю строку.
Превью ограничено доступной шириной сцены, как в Metrics, и не расширяет страницу.
Изменение Width не пересоздаёт поле: введённый текст, показ пароля и высота Multiline
сохраняются. Ширина сохраняется при переключении Variant и темы. В готовые примеры
кода эта настройка каталога не добавляется.

Обложка страницы Button содержит одну декоративную Primary-кнопку «Сохранить»
без иконок. Это inert-иллюстрация, а не действие: без hover, фокуса и кликов;
цвета наследуются из системных токенов светлой и тёмной темы.
Карточка Button в Components использует ту же иллюстрацию через общий renderer;
старая плашка «Actions / Button» заменена. Иллюстрация не перехватывает нажатие:
вся карточка остаётся ссылкой на страницу компонента, в том числе область кнопки.

Обложка страницы TextField — декоративное пустое поле «Название» без Description,
значения и иконок. Вместо настоящего input используется inert-иллюстрация на стилях
TextField: без ввода, фокуса и hover, с цветами текущей светлой/тёмной темы.
Playground и готовые примеры сохраняют обычную интерактивность.
Карточка TextField в Components использует эту же иллюстрацию через общий renderer
вместо плашки «Forms / TextField». Обе поверхности наследуют одну тему; изображение
не перехватывает нажатие и не мешает переходу по карточке.

Playground Button также использует Width после Size: тот же Slider 0–1600 px,
начальное значение 560 px. Кнопка заполняет выбранную ширину превью, ограниченную
доступной шириной сцены. Изменение Width не пересоздаёт кнопку и не сбрасывает
Variant, State, Size, Label, Subtitle, иконки или тему, включая Loading.
Строка Width не показывает отдельный декоративный specimen: значение и Slider уже
полностью объясняют параметр.
Это настройка каталога, не новый параметр публичного Button; Icon Button и
готовые примеры кода остаются без изменений.

После аудита Button/TextField каталог подключает один generated Core CSS вместо
одновременных `components.css` и прямого `forms.css`. Генератор записывает content-hash
в URL локальных CSS/JS, включая вложенные ранее в цепочку компоненты: старый кэш
не может вернуть удалённую анатомию или дополнительную рамку. Это проверяется
браузерным сценарием со старым кэшем и двумя последовательными версиями bundle.
Loading/Skeleton в playgrounds Button и IconButton управляются публичным
`ContourUI.setButtonState`, а не локальной имитацией disabled и таймерами.

Только Label внутри поля остаётся в одну строку при сужении
TextField. Вместо многоточия используется плавное затухание последних 32 px, как
в ListingCard. Альфа-маска не накладывает цвет фона и работает в обеих темах;
для RTL затухание находится слева. Полные тексты остаются в DOM и доступны через
label/aria-describedby. Description и ошибка ведут себя одинаково: весь текст
переносится и не маскируется, в том числе длинные слова без пробелов.
Ввод, курсор и переносы строк Multiline не маскируются.

Проверка предыдущего обновления TextField: static Design System gate успешен; 23 браузерных
сценария каталога прошли без пропусков, включая назначения ввода и autocomplete,
состояния, размеры, редактирование, локальную тему и reflow 320/980/1653 px,
а также постоянный глаз Password, показ/скрытие с клавиатуры, ввод суммы Price,
валюту и готовый HTML. Матрица тонкой рамки проверяет все четыре варианта в обеих
темах, с Error и без, при симулированном и настоящем фокусе.
Дополнительно прошли все 12 браузерных контрактов Core UI.
TextField — Search показывает продуктовый поиск с
`autocomplete="off"`, `data-rf-autofill="off"`, отключённой автокоррекцией и без
начального focus. Core добавляет best-effort password-manager hints и скрывает
WebKit credential/contact affordance; auth specimens не получают этот opt-out.
`one-time-code` не используется как подмена search semantics: это назначение только
для настоящего кода подтверждения. Auth-поля сохраняют явные
`username`/`current-password`/`new-password`, но также не получают `autofocus`.
Тот же TextField показывает системную leading icon и универсальный trailing action;
в каталоге есть search icon, clear action и их совместная композиция. Clear action
появляется только при `focus-within` и непустом native value, остаётся доступным при
переходе Tab на саму кнопку, имеет локализуемый `aria-label`, очищает поле и сохраняет
keyboard focus без отдельного SearchInput/LoginInput.
Helper/error description стоит под рамкой `TextField` и начинается на одной вертикальной
оси с label/value. Border охватывает только интерактивный control. Все состояния
`focus-visible` используют компактный прилегающий indicator без широкого halo;
error сохраняет красный цвет, не создавая второй крупной рамки.
Compact `sm` сохраняет системный горизонтальный inset `16px`, поэтому floating
label, value и description не прижимаются к скруглению `24px` даже в узком preview.
У `type=number` сохраняются native value, numeric keyboard, `min`/`max`/`step` и
ArrowUp/ArrowDown, но нестабильные браузерные spinner-кнопки скрыты: они нарушали
геометрию floating label и скругления 24 px в узком Chromium/WebView.

DatePicker и Dropdown имеют отдельные реальные state matrices. DatePicker
композируется из общей floating anatomy TextField, native `input[type=date]` и системной
calendar action: locale-формат, частичный ввод, очистка, `min`/`max` и picker
overlay остаются браузерными. Dropdown полностью custom: selection использует
listbox/option, actions — menu/menuitem; все пункты композируют системный ListItem.
Core-controller покрывает Arrow keys, Enter, Escape, Tab, outside click, повторный
trigger и перенос panel вверх у нижней границы. `anchored / content-fit` показывает
компактную touch-panel рядом с trigger; длинные списки сохраняют mobile sheet только
на compact viewport ниже `breakpoint.md`, а на планшете остаются ограниченной
dropdown panel рядом с trigger.
Browser select popup в новом API не используется.

### Source-backed Button и IconButton examples

После Playground каждый вариант Button (`primary`, `secondary`, `tertiary`, `ghost`,
`danger`, `success`) имеет отдельный preview и один ряд вкладок: «Описание»,
«Web + Mini App» и «React». Промежуточной вкладки «Код» и вложенных
platform/language tablist нет. Код не собирается из
демонстрационных строк внутри `catalog.js`: manifest
`design/design-system/code-examples.json` указывает настоящий source-файл, а
`build_catalog.py` валидирует платформу, adapter, язык, extension и variant и только
после этого включает его содержимое в `generated/catalog-model.json`.

Вкладка Icon Button устроена тем же способом: отдельный Playground и семь карточек
вариантов, включая `close`. В Playground доступны variant, state, размеры `S/M/L`,
системная иконка, локализованное доступное имя и независимое Light/Dark preview.
Каждая карточка показывает те же плоские вкладки «Описание», «Web + Mini App» и
«React», без прежних дублирующих матриц вариантов и состояний.

«Web + Mini App» показывает один общий Core HTML с `data-i18n`: браузер использует
fallback-текст, а Mini App подставляет локализованную строку. Manifest закрепляет за
этим source сразу обе платформы через `platforms: ["web", "telegram-mini-app"]`.
Это runtime coverage одного Core Web adapter в браузере и Telegram WebView, а не
заявление об отдельной canonical Mini App implementation в Registry.
Отдельная вкладка «React» показывает TSX из реального `@reflower/core-ui-react`.
Для IconButton React API требует `label`, а общий HTML source использует
`data-i18n-aria-label`, поэтому icon-only действие остаётся доступным после копирования.
Кнопка копирования берёт именно видимый source.
Новый язык или платформа появляются только вместе с исполняемым/компилируемым
adapter и source-файлом. Поэтому React здесь означает React Web, а не React Native;
готовых SwiftUI, Android Compose и React Native adapters пока нет.

Specimen Lab постоянно показывает state matrices и реальные examples для Button,
TextField/Multiline, Checkbox, Radio, Switch, Slider, SegmentedControl, Tabs, Dropdown,
Accordion, Card, ListItem, Badge, Alert, Toast, Skeleton, EmptyState, ErrorState,
Dialog и BottomSheet. Responsive preview использует breakpoint tokens.

Общий `stress-fixtures.json` покрывает short/long/unbroken text, RU/EN/KY/UZ,
RTL-ready content, large number, empty optional content, missing/failed image, long
user name, long title и multiline description. Catalog не содержит второго набора
fixture data.

## Accessibility

Автоматически проверяются semantic landmarks/headings, search role и live region,
current navigation, accessible names, labels/error relations, keyboard search,
отсутствие sidebar/drawer, theme state, focus-visible, busy/disabled semantics, touch
targets, horizontal reflow и отсутствие browser errors. Core contract suite отдельно
проверяет интерактивные components, forced colors и overlay focus behavior.

Visual review выполнен в Light/Dark на desktop и mobile с парным сравнением до/после.
Это не является заявлением полной accessibility compliance: ручные VoiceOver,
TalkBack, реальный zoom/200%, экранная клавиатура, Telegram host controls и
assistive-technology announcement order остаются обязательными перед lifecycle
promotion.

## Responsive

Browser gate проверяет 320, 390, 768 и 1440 px; дополнительный визуальный review
выполнен для desktop и mobile Dark. Sidebar не блокирует content на mobile,
property tables прокручиваются внутри своего контейнера, playground становится
одноколоночным, а content grids сохраняют читаемые минимальные ширины. Breakpoint
логика берётся из Design System token, поэтому для Catalog не потребовалось lint
exception.

## Performance

Generated model и три runtime asset — HTML, CSS и JS — ограничены ratchet-бюджетами,
которые проверяет `tests/test_design_system_catalog.py`. В потолок входят
public Context guidance, допустимые поверхности и применение токенов. Lifecycle
остаётся в canonical model для проверки compatibility, а source-backed examples —
в сгенерированном `codeExamples`; оба набора входят в измерение. Изменение не
добавляет растровых ассетов; размер по-прежнему ограничен детерминированным тестом.

После добавления Icon-слотов и Skeleton в Badge лимит model — 408 KiB raw / 51 KiB gzip;
трёх runtime assets — 458 KiB raw / 83 KiB gzip. Измерено 416952 bytes модели
(51229 gzip) и 468508 bytes runtime (84611 gzip). К предыдущим потолкам
Switch 404/50 и 445/81 KiB добавлены шесть коротких канонических HTML-примеров
Badge и отдельная страница на существующих стилях/Core. Новых зависимостей нет.
Карточки примеров используют исходники, а не независимые копии разметки.
Ранее добавлены TextField Price и связь валюты с полем. Сторонние
зависимости и изображения не добавлены.

## Verification

- `RUN_BROWSER_E2E=1 python3 scripts/design_system_check.py`: 194 Design System tests,
  без failures и skips;
- visual baseline: 18/18 reviewed cases;
- `./scripts/verify-release.sh all`: 631 тест по всему репозиторию, без failures и skips;
- migration sequence 001–051, Ruff, Bandit и audit всех production dependencies —
  успешно;
- production Docker images для Bot, Admin, Mini App и Landing собраны локально.

Release gate ничего не публикует и удаляет временную PostgreSQL и проверочные images
после завершения.

## Design System gaps discovered

- Только 19 component-token groups имеют machine-readable источник, а названия групп
  не всегда совпадают с canonical component names. Catalog показывает exact mapping
  только там, где он доказуем, и пишет `not machine-mapped yet` в остальных случаях.
- Registry dependencies описывают components/primitives, но не полный token graph;
  его нельзя подменять вручную составленным списком в документации.
- Icon keywords пока в основном вычисляются из canonical names; curated vocabulary
  для предметных синонимов остаётся отдельным governance улучшением.
- У каждого содержательного маршрута Catalog, кроме Home, есть независимая SemVer-версия в
  `component-registry.json` (`catalogVersions`). Она показывается системным Badge
  рядом с главным заголовком; component entity наследует версию своего раздела
  Primitives, Components или Patterns. Общая `registryVersion` остаётся внутренним
  техническим контрактом сборки и больше не подменяет версию пользовательского
  раздела.
- Полного недублируемого component changelog пока нет. История раздела отслеживается
  по его версии и изменениям Registry в Git, без второй ручной истории API.
- iOS/Android adapters пока отсутствуют. Target strategy и canonical implementation
  намеренно показаны раздельно.
- Сложные beta/experimental components ещё не получили отдельный playground для
  каждой permutation; Specimen Lab покрывает high-value behavior без превращения
  Catalog в IDE.

Эти gaps не закрывались новыми Core abstractions без production evidence.

## Remaining work

- Провести ручной screen-reader и real-device review на Web, Telegram WebView, iOS и
  Android по мере появления adapters.
- Постепенно добавить curated token mapping и icon search vocabulary в канонические
  machine sources, а не внутрь Catalog.
- Расширять high-value state/stress examples только по найденным product regressions;
  текущий visual baseline содержит 16 намеренно выбранных случаев.
- Рассмотреть build-time prerender entity pages, если возникнет доказанная
  потребность в полностью автономном no-JS чтении; сейчас semantic shell и JSON model
  покрывают browser и agent workflows.

## Recommended next step

Следующая отдельная итерация — наблюдать за реальным использованием Catalog в code
review и feature work, собрать список не найденных запросов/неясных решений и на
этом evidence улучшить token traceability и terminology. Новую migration wave этой
работой запускать не нужно.
DatePicker и Dropdown теперь имеют отдельные реальные state matrices. DatePicker
композируется из общей floating anatomy TextField, native `input[type=date]` и системной
calendar action: locale-формат, частичный ввод, очистка, `min`/`max` и picker
overlay остаются браузерными. Dropdown не использует browser popup: selection и
actions разделены mode-specific semantics, а их строки собраны из ListItem. Core
покрывает Arrow keys, Enter, Escape, Tab, outside click и viewport placement;
матрица отдельно фиксирует `anchored / content-fit` presentation.
# Адаптивная витрина (локальное согласование)

В Templates → CardList добавлен `adaptiveGrid` с настоящими ListingCard: 2/3/4
колонки по доступной ширине, промежуток 16 px и центрированный предел 1040 px.
Семь карточек показывают неполную последнюю строку; общая тема каталога проверяет
light/dark. Соседние секции используют `rf-card-list-container` с тем же пределом.
Это предварительный canonical вариант: production и временный Mini App на 8766
не переключены до утверждения владельцем. Причина: прежние две широкие колонки
с карточками max-width 248 px оставляли большие пустоты.

## Surface: этап вывода из публичного использования

Раздел Primitives версии 1.12.0 показывает семь рекомендуемых примитивов. Surface
имеет статус deprecated и скрыт из основного списка; маршрут `#primitives/surface`
сохранён и объясняет выбор замены. Для содержимого — Card, для overlay/навигации —
соответствующие компоненты, для обычного фона — Context background/text. Указанный
в Registry replacement Card относится только к содержательным карточкам.
Старые CSS-классы и продуктовые применения пока совместимы; их физическое удаление
выполняется после согласования замены и миграции Mini App.

## Container перенесён в Foundation Grid

Primitives 1.13.0 показывает шесть рекомендуемых примитивов; Container удалён из
Component Registry. Foundation → Grid 2.1.0 содержит блок «Container — правило
страницы»: ширина, центрирование, боковые поля, reflow и отдельное пояснение
совместимого `.rf-container`. Старый `#primitives/container` перенаправляет на
`#foundations/grid`. CSS-класс и текущая геометрия Mini App/Landing сохранены.

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
отдельные Selected и interaction state, подпись, Icon и независимая Light/Dark тема.
Вкладка Tab Bar показывает композицию пунктов и полные source-backed examples.

Страница Tab Bar увеличивает runtime budget с 613/104 до 625/106 KiB raw/gzip:
измерено 638704/108189 bytes. Добавлены три вкладки и работающие примеры вместо
прежних generic sections. Новых зависимостей и растровых ассетов нет.


### Уточнение Tab и Tab Bar по UI Kit

Tab: Glyph с поиском и Style Line/Solid/Duotone используют общий Icon picker.
Selected независим от Default/Hover/Pressed/Focused/Disabled/Hidden. Подпись можно
скрыть визуально, сохранив доступное имя; длинная подпись обрезается многоточием.
Опциональный Counter использует существующий beta-компонент без изменения его
статуса: точное число доступно скринридеру, визуальное значение ограничено 99+.
Tab Bar: 2–6 пунктов, текущий раздел, длинные подписи, мобильная/широкая область и
демонстрационный safe-area 32 px. Системная полоса Home Indicator не рисуется.
Удалены пояснения над/под playground и отдельный блок кода Tab по замечаниям владельца.
Hero и preview изолируют stacking context: z-index демонстрационной нижней панели
больше не пересекается со sticky-шапкой каталога. Продуктовые экраны не мигрировались.

После расширения настроек Tab Bar лимит runtime — 628/107 KiB raw/gzip; измерено 493272/87777 bytes. Общий Icon picker переиспользован, новых зависимостей нет.


### Уточнение настроек Tab

Value — Dropdown Default/Selected с пояснением «Выбрана ли вкладка», как в Tabs.
Hidden удалён из Item state. Icon обязателен: остаются Glyph и Style без выключателя.
Counter объединяет переключатель и числовой ввод в одной строке; выключенный ввод
сохраняет значение. Focused использует фон и подчёркивание вместо рамки, включая
клавиатурный фокус. Disabled использует системные цвет и opacity; исправлен приоритет
CSS, из-за которого bottom/selected могли возвращать обычный цвет недоступному пункту.

В шапке Tab Bar убран визуальный бейдж Stable (статус в реестре сохранён).
В изолированном превью Tab нет верхнего разделителя панели. Настройка Last item
и её демонстрационная логика удалены из Tab Bar; состояния проверяются во вкладке Tab.

Настройки Tab и Tab Bar имеют короткое описание под каждым названием, как в Tabs.
Поля, списки и строка Counter занимают всю доступную ширину. Одиночные переключатели
выравниваются по правому краю на desktop, compact и phone; общий compact-стиль больше
не возвращает их в середину строки.

Описания параметров увеличили runtime до 644204 bytes: raw-бюджет уточнён до 630 KiB, gzip — 109724 bytes, бюджет 108 KiB. Новых зависимостей нет.


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

Отдельная страница NavigationBar и адаптивная оболочка увеличили budget runtime до 635/110 KiB raw/gzip. Новых зависимостей нет.

Эталон catalog-overview-mobile-dark обновлён адресно: после переноса панели вниз высота блока overview уменьшилась на 64 px. Остальные visual cases и допуски сохранены.

NavigationBar: Sidebar удалён как неиспользуемый вариант. Страница использует общий
шаблон Anatomy / Tab / Navigation Bar, отдельные playground пункта и панели с темами,
настройками и вкладками «Описание» / «Web» у source-backed примера.

Navigation Bar: в Tab → State доступен Skeleton. Заглушка сохраняет размер пункта, скрывает подпись и исключается из навигации клавиатурой и дерева доступности. Выбор Value не меняет загрузочное отображение.

Tab Bar также поддерживает Tab → State → Skeleton: скрываются Icon, Label и Counter, размер пункта сохраняется. Загрузочный пункт не принимает фокус и скрыт от скринридера; возврат в Default восстанавливает содержимое.

Опциональные параметры playground оформляются единообразно: заголовок с описанием слева, Switch справа в той же строке, связанные поля и списки ниже на всю ширину. Это правило действует также на узких экранах, включая Label и Counter в Tab Bar и слоты иконок других компонентов.

Tab Bar использует отдельный component.navigation.bottomTextStyle → typography.style.body.xxs (10 px) для компактных подписей. Верхний Navigation Bar сохраняет body.s; размер Icon и область нажатия не меняются. Проверка включает пять разделов Admin на ширине 440 px.

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


### Dropdown: единая страница компонента

Dropdown использует общую шапку и Tabs: **Anatomy / Dropdown**.
`dropdownTab` сохраняет выбранную вкладку в URL. Playground поддерживает
Selection/Actions, Single/Multiple/Searchable/Grouped/Cascading, State, Size,
Placement, Label и независимую Light/Dark-тему. Действия демонстрационные;
выбор или команда отображаются под настройками. Примеры внутри вкладки Dropdown сохраняют реальные
состояния Core и вложенные списки. В Anatomy нет отдельной копии поведения.
В Text показан публичный цветовой вариант `.rf-text--brand`.

В Actions-превью подпись использует `.rf-dropdown__trigger-value`, стрелка —
`.rf-dropdown__chevron`: при растянутой кнопке текст остаётся слева, стрелка справа.


### Dropdown Actions: расширение в каталоге

Hero и карточка Dropdown используют одну иллюстрацию раскрытого меню действий.
Actions-playground предлагает Trigger (Button / Icon Button / Field), Alignment
(Start / Center / End), подпись, иконки, описание и Default / Disabled / Destructive
первого пункта, а также Submenu. Selection сохраняет свой поиск и варианты выбора.
Core открывает меню с кнопки ArrowDown/ArrowUp, ищет пункт по началу подписи и
возвращает фокус из подменю по Escape/обратной стрелке; на touch есть «Назад».
Публичные hooks: `data-rf-menu-align`, `data-rf-menu-submenu-target`,
`data-rf-menu-back`. Визуальные значения наследуются из существующих Dropdown,
Button, IconButton и ListItem. Исправлена специфичность цвета Destructive:
обычное правило ListItem раньше перекрывало destructive token.

Открытое Actions-меню пересчитывает положение при изменении размеров trigger/panel
(например, после загрузки шрифта). ResizeObserver отключается при закрытии.


### Dropdown: плотность, группы и загрузка Actions

Actions поддерживает Density Default / Compact, Groups с заголовками «Объявление»
и «Управление», Loading со Spinner и aria-busy, Width Content / Trigger / Container.
Compact уменьшает вертикальные отступы на desktop; touch target остаётся минимум
44 px. Группы связаны с подписями через role=group и aria-labelledby. При загрузке
команд нет, панель получает фокус и закрывается Escape с возвратом на кнопку.
Размер кнопки и плотность строк независимы. Рекомендуются максимум два уровня меню.
В контейнере с overflow:hidden для Actions используется Viewport; Anchored по
определению остаётся частью контейнера и может обрезаться. Для transformed-родителей
нужен отдельный portal-контракт, которого текущий API не обещает.

Dropdown playground по умолчанию открывается в Actions с Button «Действия».
Поле выбора доступно через Mode → Selection.
При открытии Actions фокус не прокручивает страницу: это предотвращает закрытие
Viewport-меню собственным обработчиком внешнего scroll.

Карточки обзора Components сохраняют одинаковое landscape-превью независимо от
высоты содержимого. Открытый Dropdown уменьшен только в иллюстрации карточки;
hero и интерактивный компонент сохраняют системные размеры.

DatePicker объединён с Text Field: дата доступна как вариант Date с нативным
календарём. Отдельной карточки и страницы нет; старый маршрут открывает Text Field.
Публичные date hooks сохранены для совместимости существующих форм.

List Item использует общий формат Anatomy / List Item с URL-параметром
listItemTab. Playground показывает Static, Navigation, Action и Selection
(композиция с Checkbox), заголовок, описание и leading/trailing slots; доступен
переключатель темы. Навигация и действия демонстрационные, без ухода со страницы.
Option List и его использование в Mini App пока не меняются.

Бюджет catalog.js расширен до 660 KiB raw / 114 KiB gzip для страницы List Item
(около 8 KiB исходного кода); новых зависимостей и изображений нет.

Selection в List Item использует полную anatomy Checkbox: rf-choice__control,
нативный input и системный Icon checkbox-check. Один input без control-обёртки
показывает браузерное оформление и не соответствует визуальному контракту.

List Item / Rich расширен по референсу UI Kit (Figma 135:1192): Center/Top,
Truncate/Wrap, Divider Full/Inset/None, верхняя подпись и правое значение,
Leading Icon/Image/None, Trailing Chevron/Text/None. Selection размещает один
Checkbox или Switch слева/справа, без вложенного интерактивного элемента в button.
Состояния Default/Hover/Pressed/Focused/Disabled/Skeleton используют canonical
CSS и semantic tokens. Skeleton сохраняет размеры, inert/aria-hidden на строке
и aria-busy/status снаружи. Новый контракт включается rf-list-item--rich;
продуктовые потребители и Option List пока не мигрированы. Бюджет каталога
664 KiB raw / 116 KiB gzip учитывает дополнительные настройки без зависимостей.

Option List объединён с List Item. Старый маршрут открывает List Item, поиск
по OptionList находит его. Selection / Control None — button с aria-pressed,
без видимого checkbox; форма управляет единственным выбранным вариантом.
Mini App использует этот контракт в выборе типа объявления, с системными
слотами изображения и текста. Локальное оформление Option List удалено.

Карточка List Item в обзоре использует реальную системную строку с иконкой,
заголовком, описанием и стрелкой вместо общей заглушки. Превью неинтерактивно
и сохраняет общий landscape-формат; название отображается как List Item.

List Item: Surface Filled добавляет системный primary-фон и XL-скругление.
Plain сохраняет плоскую строку. rf-list--separated задаёт промежуток между
самостоятельными строками; Mini App использует Filled в выборе типа объявления.

Выбор языка использует List Item Rich с системным Radio (rf-choice--md,
нативный input внутри rf-choice) в trailing-слоте. Флаги оформляет публичный
rf-list-item__image--flag; локальное оформление удалено. Одна группа
profileLanguage сохраняет выбор через прежнюю кнопку «Сохранить».
В каталоге List Item → Selection → Control доступен Radio.

Feature Card относится к Templates (`pattern`, статус Beta): композиция Card, Text
и Image для перехода в раздел. Канонический адрес — `patterns/feature-card`;
старый `components/feature-card` открывает ту же страницу. Использование карточки
«Мои объявления» в Mini App и публичные CSS-классы не меняются.

Страница Feature Card использует Anatomy / Feature Card и playground с Title,
Description, локальной темой и настоящим действием. Старые generic Playground /
State matrix заменены. Лимит catalog.js — 672 KiB raw / 116 KiB gzip; страница
переиспользует имеющуюся иллюстрацию, новых зависимостей нет.

Link больше не имеет отдельной страницы Components. Правила и пример нативной
ссылки находятся в Typography → Anatomy → Ссылки. Старый адрес `components/link`
открывает `foundations/typography`. `rf-link` — совместимая публичная утилита
Typography из primitives.css; три ссылки Bloom сохраняют href и аналитику.

Pagination относится к Templates (`pattern`, статус Experimental): композиция
текста и элементов перехода между страницами. Канонический адрес —
`patterns/pagination`; `components/pagination` открывает ту же страницу. Общей
реализации Core пока нет; существующая серверная пагинация админки не изменена.

Страница Pagination: Anatomy / Pagination, интерактивная композиция Previous /
Next, параметры Page / Pages, первая/последняя/единственная страница и локальная
светлая/тёмная тема. Номер ограничивается количеством страниц; новые зависимости
и общий Core API не добавлены. Лимит catalog.js: 680 KiB raw / 118 KiB gzip.

Card больше не отображается как компонент. Listing Card и Feature Card имеют собственную поверхность и keyboard/hover/pressed контракты без rf-card; старый маршрут components/card ведёт на Components. Legacy rf-card пока обслуживает немигрированные экраны и не предлагается для нового кода.

AttributeCard удалён: его заменяет статический List Item с Filled surface, иконкой, заголовком и description=wrap. Старый URL components/attribute-card перенаправляется на List Item.

### Empty State в Templates (2026-09-06)

EmptyState перенесён из Components в Templates со статусом Stable. Использования Mini App и Admin и публичные CSS-классы не изменены. Старый URL components/empty-state открывает patterns/empty-state. Страница следует общему формату: hero, Anatomy / Empty State, редактирование Title, Description, Action и состояния Visible/Hidden, локальная тема. Пустые description/action скрывают соответствующие части.

Страница Empty State добавляет самостоятельный playground: runtime budget 688 KiB raw (gzip остаётся 118 KiB). Иллюстрация empty-sprout-3d включена в hosted bundle.

### Alert (2026-09-06)

Страница Alert использует общий формат: реальный hero, Anatomy / Alert, playground Title, Description, Action, Variant (Info/Success/Warning/Error) и локальная тема. Пустые description/action скрываются; нажатие кнопки подтверждается только в превью. Static demo не получает role=alert; правила динамического status/urgent alert описаны в Anatomy. Core и продукты не изменены. Runtime budget для дополнительной страницы — 696 KiB raw / 120 KiB gzip.

Alert приведён к структуре Text Field/List Item: hero с anatomy-stage, Variant первым через Core Dropdown; Description и Action имеют Switch в заголовке и поле ниже, Icon — отдельный Switch. Выключение сохраняет введённый текст. Служебное подтверждение появляется только после нажатия кнопки превью.

### Alert Soft по референсу Figma

Новый вариант presentation rf-alert--soft показан в каталоге: Neutral/Brand/Info/Success/Warning/Error, Title/Description/Icon/Action/Close, Default/Skeleton. Скрытие по Close — результат действия, а не отдельное состояние в State. Заголовок использует Headline XS, действие — Core Ghost Button, закрытие — IconButton. data-rf-alert-close отправляет отменяемое событие rf:alert-dismiss и скрывает ближайший Alert; продукт отвечает за перенос фокуса и сохранение решения пользователя. Skeleton inert/aria-busy сохраняет геометрию. Старые outlined использования продуктов не меняются до утверждения визуала.

Карточка Alert в Components показывает реальный Soft Success с иконкой, заголовком и описанием вместо категорийной заглушки. Превью не содержит вложенных действий и сохраняет стандартную высоту области иллюстрации.

Alert / Icon использует общий picker рисунка с поиском и Style (Line/Solid/Duotone). Выключение Icon блокирует оба списка, сохраняя выбор. В превью рисунок и стиль передаются публичному Icon; недоступные для выбранного рисунка стили исключаются общим контролом.

### Toast: страница каталога

Toast использует общий формат hero / Anatomy / Toast с интерактивным playground. Доступны Variant, Message, Icon (переключатель, поиск рисунка и Style), Close и локальная тема. Variant выбирает смысловую иконку, которую можно заменить вручную; фон остаётся каноническим Toast. Показ и закрытие используют публичные Core triggers. Превью остаётся внутри stage, без таймера. Статус Beta сохранён: очередь, таймер и переходы не имитируются как готовый API.

Toast добавляет около 10 KiB к текущему каталогу: итоговый raw bundle 723134 байта, budget 708 KiB; gzip 123413 байт, budget 121 KiB. Новых библиотек и растровых ресурсов нет.

Закрытие Toast в каталоге — IconButton Ghost без постоянной рамки. Цвет иконки наследует контрастный Toast text через компонентные переменные; клавиатурный focus сохраняется.

Release-проверки Mini App используют Listing Card и filled List Item: проверяют дозагрузку карточек, геометрию и одну колонку характеристик вместо удалённых Card / Attribute Card.

### Фон оболочки Mini App

Хедер и нижняя панель действий подробностей объявления используют существующий Context background.canvas, как body и Bottom Sheet. Ранее перенесённый из legacy Surface background.base давал серую полосу в тёмной теме. Фоны карточек сохраняются. Браузерный контракт сравнивает фон оболочки и шторок с canvas в обеих темах на 320/390/1440 px.

Tooltip удалён как неиспользуемый experimental-компонент без реализации. Старый адрес components/tooltip возвращает список Components. Реестр: 51 запись, 35 components, 7 experimental; остальные группы без изменений.

### Toast lifecycle

Публичный ContourUI.showToast(host, options) и dismissToast(host, reason) управляют одним сообщением на host. Options: message, variant, duration (5000 по умолчанию; 0 — постоянно), persistent, uniqueID, duplicate (ignore/replace). Error всегда остаётся до закрытия. Совпадение ID либо variant+message не сбрасывает таймер; новая запись отменяет старый таймер. Hover, focus и скрытая вкладка приостанавливают отсчёт. Удаление host очищает таймер. rf:toast-dismiss передаёт auto/manual; фокус возвращается только если был внутри закрытого Toast. Каталог запускает lifecycle кнопкой «Показать Toast»; правка параметров возвращает статическое превью. Очередь, свайп и Action не входят в этот этап.

Mini App использует общий showToast вместо локального toastTimer. Close — существующий Ghost IconButton с common.close на ru/en/ky/uz. Тексты сообщений и выбор иконки остаются у продукта.

### Отдельный раздел Primitives

Основное меню каталога: Home → Foundation → Primitives → Components → Templates.
Раздел `#primitives` автоматически показывает активные записи registry уровня
`primitive`: SafeArea, Stack, Inline, Text, AspectRatio и VisuallyHidden. Deprecated
Surface доступен через lifecycle-фильтр, но не предлагается для новых интерфейсов.
Foundation сохраняет шкалы и токены. Primitives использует общие hero, группы и
карточки каталога; открытая страница примитива выделяет этот пункт меню как текущий.
На телефоне все пять разделов доступны через адаптивный Tab Bar.

### Banner вместо Feature Card

`components/banner` заменяет страницу `patterns/feature-card`; старые ссылки
перенаправляются. Banner (Beta, component) имеет Anatomy / Banner и playground:
фон Filled/Plain, иллюстрация Left/Right/None, размер Default/Large, Label, Title,
Description, отдельное действие либо кликабельный контейнер, стрелка и Skeleton.
Контролы не вкладываются друг в друга; Skeleton inert и aria-busy. Иллюстрация
декоративная. Старый Core CSS FeatureCard временно сохранён для Mini App до
утверждения нового визуала, продукт в этом пакете не мигрирует.

Primitives overview не показывает версию рядом с заголовком. Общая сетка карточек
Primitives / Components / Templates сохраняет пустые колонки: одиночная карточка
не растягивается на ширину группы. На узком телефоне остаётся одна колонка.

### Layout и страницы примитивов

Foundation Grid содержит вкладку Grid с готовыми сетками `rf-layout-grid`:
Default (минимум 280), Compact (160), Wide (376), все размеры составлены из
Foundation spacing. Auto-fill сохраняет ширину одиночной карточки; min(100%, …)
предотвращает переполнение на узком экране. Grid зарегистрирован как primitive.

Stack и Inline поддерживают `data-align`, `data-justify`, `data-grow`, `data-wrap`,
и `data-rf-layout-mobile="row|column"`. Core отслеживает ширину viewport относительно
Foundation breakpoint.sm; исходный порядок DOM сохраняется. На большом экране
возвращается исходное направление примитива. Все шесть активных примитивов имеют
Anatomy и собственную вкладку Playground, с переключением темы и настройками.
SafeArea демонстрирует реальные системные inset, без искусственных значений;
VisuallyHidden демонстрирует доступное имя кнопки. Product-код пока не мигрирует.

### Индивидуальный размер и Grid span

Stack/Inline: прямые дочерние элементы принимают `data-rf-item-size`
(`grow`, `content`, `fixed`; отсутствие/`inherit` оставляет настройку контейнера)
и `data-rf-item-align` (`start`, `center`, `end`, `stretch`). Fixed сохраняет
естественный размер без сжатия, а не задаёт произвольную ширину. Настройки ребёнка
имеют приоритет над общим Grow. DOM и порядок клавиатурной навигации не меняются.

Foundation Grid: `data-rf-grid-span="2|3|all"` на прямом ребёнке. Core ограничивает
числовой span фактически доступными колонками при изменении размера контейнера;
на телефоне не появляются неявные колонки и горизонтальный скролл. `all` занимает
весь явный ряд. Без JS числовой span безопасно остаётся равным одной колонке.
Playground содержит Item / Item size / Item align и First item span соответственно.

### Разделение Foundation Grid и Primitives Grid

`foundations/grid` описывает брейкпоинты, поля, промежутки и композицию страницы.
`primitives/grid` (Beta) содержит Anatomy / Grid и рабочие настройки сетки и span.
Токены не дублируются. Разделы связаны ссылками; прежний URL
`?gridTab=playground#foundations/grid` перенаправляется в новый Playground.

### Страница Spinner

Spinner использует общий hero и вкладки Anatomy / Spinner (`spinnerTab=spinner`).
Playground показывает размеры sm/md/lg, подпись и симуляцию Reduced motion без
вращения, а также светлую/тёмную тему. Индикатор декоративный (`aria-hidden`),
область помечена `aria-busy` и содержит текст загрузки. В карточке каталога показан
настоящий Spinner. В этом изменении обновляется документация; уровень component
и продуктовая реализация остаются прежними.

Превью карточек каталога декоративные (`inert`, `aria-hidden`): переходом владеет
сама карточка. Область изображения изолирует слои и ограничивает отрисовку
(`isolation: isolate; contain: paint`), чтобы меню Dropdown и другие вложенные
поверхности не перекрывали sticky-хедер при прокрутке.

Spinner: Appearance `inherit/inverse`, подпись видимая либо `rf-sr-only`;
в обоих случаях она описывает загрузку. Inverse демонстрируется на брендовой
поверхности. Кольцо плавно появляется без изменения размеров. При системном
`prefers-reduced-motion: reduce` Spinner и индикатор Button полностью отключают
анимации: прежняя длительность 1 мс ошибочно ускоряла бесконечное вращение.

В Playground Spinner отображается только кольцо: настройки Label/Show label и
пояснение под формой убраны. Описание «Загрузка…» сохраняется только для скринридера.

### Calendar

Отдельный Beta-компонент в Inputs, вдохновлённый Calendar Astryx. Страница
`?calendarTab=calendar#components/calendar` следует Anatomy / Calendar: статичные
превью, Playground с Mode, Months, State, Language, Bounds и Weekdays only.

Web API: `<div data-rf-calendar>` автоматически инициализируется Core. Параметры:
`data-mode="single|range"`, `data-month="YYYY-MM"`, `data-months="1|2"`,
`data-value`, `data-start`, `data-end`, `data-min`, `data-max` (ISO YYYY-MM-DD),
`data-unavailable` (ISO даты через запятую), `data-weekdays="true"`,
`data-locale="ru|en|ky|uz"`, `data-state="default|disabled|skeleton"`.
Событие `rf:calendar-change` передаёт `{value,start,end}`; первая точка диапазона
имеет пустой end. Пересечение недоступной даты начинает новый диапазон.
Даты вычисляются как календарные дни, без сдвига часового пояса. Неделя с понедельника.
Два месяца складываются вертикально на телефоне. Стрелки/Home/End/PageUp/PageDown
перемещают фокус, Shift+PageUp/PageDown переключают год; Enter/Space выбирают дату.
Календарь не управляет фильтрами, popover или кнопкой «Применить» админки.

### Единое расположение заголовка Playground

Заголовок раздела располагается перед серой панелью, как на странице Button:
`catalog-button-playground-section` → `header` + `catalog-dimension-playground`.
Панель содержит сцену превью и настройки, но не заголовок раздела. Применяется
также к вкладке Tab, Dropdown, List Item, Banner, Pagination, Empty State, Alert,
Toast и общему renderer страниц примитивов, Spinner и Calendar. Заголовки внутри
самого демонстрируемого компонента (например Calendar или Banner) сохраняются.

Toast Playground постоянно показывает образец без кнопки запуска и настройки
Duration. После ручного закрытия тот же образец возвращается через 1 секунду;
смена страницы или настроек не восстанавливает удалённый элемент. Это только
поведение каталога: production-таймеры и API Core Toast остаются прежними.

Calendar Range: фон выделения скругляется у начала/конца диапазона и на границах
недели/месяца. Одиночная выбранная дата имеет скругление с обеих сторон;
промежуточные дни остаются соединённой полосой без квадратного фона под кругами.

Toast: в Playground есть Width Compact/Content. Content использует публичный
`rf-toast-region--content`: ширина области контента оболочки (максимум ширина
Dialog минус боковые отступы 16), без дополнительного сужения самого сообщения.

Успешный Toast: Check cr fr в стиле Solid, цвет Context icon.successInverse; цвет
крестика и текста сохраняется. Mini App использует тот же контракт.

Toast использует внутренние отступы 12 px по вертикали, 16 px по горизонтали
и радиус 32 px (системный radius.3xl); контракт одинаков в Catalog и Mini App.

Закрытие Toast: Icon Close внутри нативной кнопки `rf-toast__close`, без
IconButton. Нет фона и обводки в обычном состоянии; фокус клавиатуры видим,
Enter/Space закрывают сообщение, доступное имя сохраняется.

Для зелёной иконки на инверсном фоне Toast используется отдельная роль
`color.context.icon.successInverse` (Alias success.2). В светлой теме это светлый
зелёный на тёмном Toast; в тёмной — тёмный зелёный на светлом Toast.
