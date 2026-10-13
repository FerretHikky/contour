# Reflower Design System Site

Закрытая Sites-оболочка для канонического Catalog. Она не содержит отдельной
версии интерфейса: Worker отдаёт байт-в-байт bundle из `public/`, который собирает
`../scripts/build_hosted_catalog.py` из мастер-файлов Design System.

```bash
python3 ../scripts/build_hosted_catalog.py
pnpm install --frozen-lockfile
pnpm run dev
pnpm run build
pnpm run typecheck
pnpm run test:worker
```

Авторские Web runtimes находятся в `../web/runtime/*.ts`. Перед генерацией hosted
bundle команда `python3 ../scripts/build_web_runtime.py` обновляет совместимые
`catalog.js` и `core-ui.js`; `pnpm run typecheck` отдельно проверяет React shell,
строгие общие contracts и compatibility-профиль существующих DOM handlers.

`public/` вручную не редактируется. Корень Site отдаёт
`/design-system/web/catalog.html`, а Worker добавляет CSP, запрет индексации и
остальные защитные заголовки. PostgreSQL, D1, R2 и отдельная авторизация приложению
не нужны: доступом управляет OpenAI Sites.

`pnpm-workspace.yaml` разрешает install scripts только для зафиксированных версий
`esbuild`, `sharp` и `workerd`, которые нужны Vite/Sites build. Новая версия или
другая зависимость должна пройти отдельное review и не получает разрешение
автоматически.
