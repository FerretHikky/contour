# Цвета Reflower

Палитра соединяет два характера продукта:

- **Brand / Petal** — цветок и человеческое тепло; единственный брендовый и
  функциональный акцент проекта.
- **Airy neutral** — светлый холодно-нейтральный фон, на котором фотографии цветов
  остаются главными.

`tokens.css` и `tokens.json` — generated compatibility-экспорты для существующего
продукта. Их нельзя редактировать вручную. Единственный источник правды — DTCG
JSON-файлы в `design/design-system/tokens/`:

```text
Primitive → Alias Light/Dark → Context → Component
Static black/white — отдельный неизменяемый слой
```

Новые цветные Primitive ramps задаются одним seed шага `5` в
`color-primitives.json`; Gray дополнительно хранит утверждённые anchors
`0/1/5/10/11`, где `gray.11 = #18181B` — отдельный глубокий Canvas-шаг. Шесть
цветных семейств используют шаги `0…10`, Gray — `0…11`; промежуточные значения
детерминированно строит генератор. Направление «Воздушное
цветение» сохраняет светлый mix-профиль и ограничивает затемнение шагов `6…10`
коэффициентами `10/22/33/45/56%` к чёрному.
Alias меняет направление шкалы в Dark, общий `context.json` задаёт применение,
а components не обходят Context. После изменения источника запустите
`python3 design/design-system/scripts/build_tokens.py`.

| Роль | Цвет | Значение |
|---|---|---|
| Primary action | Accent 7 | `#BE4E6A` |
| Brand petal | Coral 5 | `#F36488` |
| Text | Gray 9 | `#46464B` |
| Background | Gray 0 | `#FFFFFF` |
| Secondary surface | Gray 1 | `#F6F6F9` |
| Secondary text | Gray 8 | `#59595D` |
| Border | Gray 3 | `#C6C6C8` |

Brand отвечает за действия, активные состояния, ссылки и фирменные акценты, но не
заменяет цвета ошибок и других статусов.

Таблица выше показывает основные resolved-роли светлой темы. Canonical Primitive
слой называет цветовые семейства `coral`, `gray`, `green`, `red`, `blue`,
`yellow` и `orange`. Назначения появляются только в Alias: например,
`brand → coral`, `neutral → gray`, `success → green`, `warning → orange`.
Отдельная роль `accent` удалена как точный дубль Brand.
Прежний тёплый Warm не выдаётся за ахроматический `gray`. Полный список ramps,
aliases и Context states
показывает Design System Catalog; правила описаны в
[`docs/color-system.md`](../../../docs/color-system.md).

Проверенные пары WCAG AA нового контракта:

- Primary action `#BE4E6A` + White — `4.68:1`.
- Primary text `#46464B` + White — `9.38:1`.
- Secondary text `#59595D` + White — `6.97:1`.
- Dark primary text `#F6F6F9` + Gray 10 `#34343A` — `11.46:1`.
