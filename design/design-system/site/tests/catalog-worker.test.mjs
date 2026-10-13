import assert from "node:assert/strict";
import test from "node:test";

const catalogEntry = "/design-system/web/catalog.html";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

function executionContext() {
  return {
    waitUntil() {},
    passThroughOnException() {},
  };
}

function assetEnvironment(calls) {
  return {
    ASSETS: {
      fetch: async (request) => {
        const url = new URL(request.url);
        calls.push({ method: request.method, pathname: url.pathname, search: url.search });
        const contentType = url.pathname.endsWith(".css")
          ? "text/css; charset=utf-8"
          : url.pathname.endsWith(".json")
            ? "application/json"
            : "text/html; charset=utf-8";
        return new Response(`asset:${url.pathname}`, {
          status: 200,
          headers: { "content-type": contentType, etag: '"catalog-test"' },
        });
      },
    },
  };
}

test("rewrites the root URL to the canonical static Catalog", async () => {
  const worker = await loadWorker();
  const calls = [];
  const response = await worker.fetch(
    new Request("https://design.reflower.app/?token=color.context.text.primary.main", {
      headers: { accept: "text/html" },
    }),
    assetEnvironment(calls),
    executionContext(),
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, [
    {
      method: "GET",
      pathname: catalogEntry,
      search: "?token=color.context.text.primary.main",
    },
  ]);
  assert.equal(await response.text(), `asset:${catalogEntry}`);
  assert.equal(response.headers.get("cache-control"), "no-cache");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
});

test("adds document and transport security headers", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://design.reflower.app/", { headers: { accept: "text/html" } }),
    assetEnvironment([]),
    executionContext(),
  );

  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
  assert.equal(response.headers.get("cross-origin-resource-policy"), "same-origin");
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=31536000/);
  const policy = response.headers.get("content-security-policy") ?? "";
  assert.match(policy, /default-src 'self'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /style-src 'self' 'unsafe-inline'/);
});

test("serves the direct Catalog document with the same policy for GET and HEAD", async () => {
  const worker = await loadWorker();

  for (const method of ["GET", "HEAD"]) {
    const calls = [];
    const response = await worker.fetch(
      new Request(`https://design.reflower.app${catalogEntry}`, {
        method,
        headers: { accept: "text/html" },
      }),
      assetEnvironment(calls),
      executionContext(),
    );

    assert.deepEqual(calls, [
      { method, pathname: catalogEntry, search: "" },
    ]);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-cache");
    assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
    assert.match(
      response.headers.get("content-security-policy") ?? "",
      /frame-ancestors 'none'/,
    );
  }
});

test("serves the Admin outage asset as a secured standalone document", async () => {
  const worker = await loadWorker();
  const calls = [];
  const response = await worker.fetch(
    new Request("https://design.reflower.app/admin-unavailable.html", {
      headers: { accept: "text/html" },
    }),
    assetEnvironment(calls),
    executionContext(),
  );

  assert.deepEqual(calls, [
    {
      method: "GET",
      pathname: "/design-system/web/admin-unavailable.html",
      search: "",
    },
  ]);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-cache");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.match(response.headers.get("content-security-policy") ?? "", /script-src 'self'/);
});

test("serves the Mini App outage asset as a secured standalone document", async () => {
  const worker = await loadWorker();
  const calls = [];
  const response = await worker.fetch(
    new Request("https://design.reflower.app/miniapp-unavailable.html", {
      headers: { accept: "text/html" },
    }),
    assetEnvironment(calls),
    executionContext(),
  );

  assert.deepEqual(calls, [
    {
      method: "GET",
      pathname: "/design-system/web/miniapp-unavailable.html",
      search: "",
    },
  ]);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-cache");
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
  assert.match(response.headers.get("content-security-policy") ?? "", /script-src 'self'/);
});

test("maps Catalog asset URLs without changing their method, query, or response", async () => {
  const worker = await loadWorker();
  const cases = [
    ["/admin-unavailable.js", "/design-system/web/admin-unavailable.js"],
    ["/miniapp-unavailable.js", "/design-system/web/miniapp-unavailable.js"],
    ["/components/forms.css?v=1.11.12-1", "/design-system/web/components/forms.css"],
    ["/catalog-react.js?v=react-shell", "/design-system/web/catalog-react.js"],
    ["/generated/catalog-model.json", "/design-system/generated/catalog-model.json"],
    ["/FOUNDATIONS.md", "/design-system/FOUNDATIONS.md"],
    [
      "/DESIGN_SYSTEM_CONTRIBUTING.md",
      "/design-system/DESIGN_SYSTEM_CONTRIBUTING.md",
    ],
    ["/brand/logos/reflower-logo-color.svg", "/brand/logos/reflower-logo-color.svg"],
    ["/icons/icons.js", "/icons/icons.js"],
    ["/illustrations/profile-listings-card-3d.png", "/illustrations/profile-listings-card-3d.png"],
    ["/assets/listing-card-white-roses.png", "/design-system/web/assets/listing-card-white-roses.png"],
  ];

  for (const [source, destination] of cases) {
    const calls = [];
    const response = await worker.fetch(
      new Request(`https://design.reflower.app${source}`),
      assetEnvironment(calls),
      executionContext(),
    );
    const sourceUrl = new URL(source, "https://design.reflower.app");
    assert.deepEqual(calls, [
      { method: "GET", pathname: destination, search: sourceUrl.search },
    ]);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("etag"), '"catalog-test"');
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(await response.text(), `asset:${destination}`);
  }
});

test("does not turn writes or unknown API requests into the Catalog", async () => {
  const worker = await loadWorker();

  for (const request of [
    new Request("https://design.reflower.app/", { method: "POST" }),
    new Request("https://design.reflower.app/api/missing", {
      headers: { accept: "application/json" },
    }),
  ]) {
    const calls = [];
    const response = await worker.fetch(
      request,
      {
        ASSETS: {
          fetch: async (assetRequest) => {
            const url = new URL(assetRequest.url);
            calls.push(url.pathname);
            return new Response("Not found", { status: 404 });
          },
        },
      },
      executionContext(),
    );

    assert.ok(!calls.includes(catalogEntry));
    assert.notEqual(await response.text(), `asset:${catalogEntry}`);
  }
});
