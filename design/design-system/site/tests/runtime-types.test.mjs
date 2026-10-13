import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const siteRoot = fileURLToPath(new URL("../", import.meta.url));
const configPath = path.join(siteRoot, "tsconfig.runtime.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
assert.equal(configFile.error, undefined);
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, siteRoot);
assert.deepEqual(config.errors, []);

function diagnostics(replacement) {
  const host = ts.createCompilerHost(config.options);
  const read = host.readFile.bind(host);
  host.readFile = (file) => {
    const source = read(file);
    return replacement && path.resolve(file) === replacement.file
      ? source.replace(replacement.before, replacement.after)
      : source;
  };
  const program = ts.createProgram(config.fileNames, config.options, host);
  return ts.getPreEmitDiagnostics(program);
}

function format(items) {
  return ts.formatDiagnosticsWithColorAndContext(items, {
    getCanonicalFileName: (file) => file,
    getCurrentDirectory: () => siteRoot,
    getNewLine: () => "\n",
  });
}

test("runtime check examines current Core and Catalog JavaScript without noCheck", () => {
  assert.equal(config.options.allowJs, true);
  assert.equal(config.options.checkJs, true);
  assert.notEqual(config.options.noCheck, true);
  assert.deepEqual(
    config.fileNames.filter((file) => file.endsWith(".js")).map((file) => path.basename(file)),
    ["core-ui.js", "catalog.js"],
  );
  for (const name of ["core-ui", "catalog"]) {
    const canonical = fs.readFileSync(path.join(siteRoot, `../web/runtime/${name}.ts`), "utf8");
    const generated = fs.readFileSync(path.join(siteRoot, `../web/${name}.js`), "utf8");
    const notice = `/* Generated from design/design-system/web/runtime/${name}.ts. Do not edit this JavaScript directly. */\n`;
    assert.equal(generated, notice + canonical, "typecheck must examine exactly the authored runtime");
    assert.doesNotMatch(canonical, /@ts-(?:nocheck|ignore|expect-error)\b/);
  }
  const errors = diagnostics();
  assert.equal(errors.length, 0, format(errors));
});

for (const mutation of [
  {
    name: "Core price input rejects a number assigned to its string value",
    runtime: "core-ui",
    before: "field.value = next;",
    after: "field.value = 123;",
    code: 2322,
  },
  {
    name: "Catalog live region rejects a string assigned to its hidden flag",
    runtime: "catalog",
    before: "liveRegion.hidden = false;",
    after: 'liveRegion.hidden = "invalid";',
    code: 2322,
  },
  {
    name: "Catalog validates actual generated model fields",
    runtime: "catalog",
    before: "model.runtimeAssets.iconography",
    after: "model.runtimeAssets.iconography.toFixed(2)",
    code: 2551,
  },
]) {
  test(mutation.name, () => {
    const file = path.resolve(siteRoot, `../web/${mutation.runtime}.js`);
    const source = fs.readFileSync(file, "utf8");
    assert.ok(source.includes(mutation.before), "negative test must mutate existing executable code");
    const errors = diagnostics({ ...mutation, file });
    const error = errors.find((item) =>
      item.code === mutation.code && path.resolve(item.file?.fileName || "") === file,
    );
    assert.ok(error, "real runtime type error must fail the compiler\n" + format(errors));
    assert.equal(
      source.slice(0, source.indexOf(mutation.before)).split("\n").length,
      error.file.getLineAndCharacterOfPosition(error.start).line + 1,
      "the diagnostic must point to the injected error, not an unrelated failure",
    );
  });
}
