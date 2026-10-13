import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const siteRoot = import.meta.dirname;
const catalogSource = resolve(siteRoot, "catalog/catalog-shell.tsx");
const catalogSourceHash = createHash("sha256")
  .update(readFileSync(catalogSource))
  .digest("hex");
const canonicalWebRoot = resolve(siteRoot, "../web");
const outputRoot = existsSync(resolve(canonicalWebRoot, "catalog.html"))
  ? canonicalWebRoot
  : resolve(siteRoot, "public/design-system/web");

export default defineConfig({
  root: siteRoot,
  define: {
    __CATALOG_SOURCE_SHA256__: JSON.stringify(catalogSourceHash),
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    lib: {
      entry: catalogSource,
      formats: ["iife"],
      name: "ReflowerCatalog",
      fileName: () => "catalog-react.js",
    },
    minify: "esbuild",
    outDir: outputRoot,
    sourcemap: false,
  },
});
