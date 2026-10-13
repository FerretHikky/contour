/** Sites entry point for the canonical Contour Design System Catalog. */
import handler from "vinext/server/app-router-entry";

interface StaticAssetsBinding {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: StaticAssetsBinding;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const CATALOG_ENTRY = "/design-system/web/catalog.html";
const ADMIN_UNAVAILABLE_ENTRY = "/design-system/web/admin-unavailable.html";
const MINIAPP_UNAVAILABLE_ENTRY = "/design-system/web/miniapp-unavailable.html";

const CATALOG_WEB_FILES = new Set([
  "/admin-unavailable.html",
  "/admin-unavailable.js",
  "/miniapp-unavailable.html",
  "/miniapp-unavailable.js",
  "/catalog.css",
  "/catalog-react.js",
  "/catalog.js",
  "/components.css",
  "/core-ui.js",
  "/primitives.css",
]);

const SECURITY_HEADERS = {
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

const DOCUMENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "object-src 'none'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "upgrade-insecure-requests",
].join("; ");

function catalogAssetPath(pathname: string): string | null {
  if (pathname === "/" || pathname === "/index.html") return CATALOG_ENTRY;
  if (pathname === CATALOG_ENTRY) return pathname;
  if (pathname === "/favicon.svg") return pathname;
  if (
    pathname === "/FOUNDATIONS.md" ||
    pathname === "/DESIGN_SYSTEM_CONTRIBUTING.md"
  ) {
    return `/design-system${pathname}`;
  }
  if (CATALOG_WEB_FILES.has(pathname) || pathname.startsWith("/components/")) {
    return `/design-system/web${pathname}`;
  }
  if (pathname.startsWith("/assets/")) {
    return `/design-system/web${pathname}`;
  }
  if (pathname.startsWith("/generated/")) {
    return `/design-system${pathname}`;
  }
  if (
    pathname.startsWith("/design-system/") ||
    pathname.startsWith("/brand/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/illustrations/") ||
    pathname.startsWith("/docs/")
  ) {
    return pathname;
  }
  return null;
}

function rewrittenAssetRequest(request: Request, pathname: string): Request {
  const url = new URL(request.url);
  url.pathname = pathname;
  return new Request(url, request);
}

function securedResponse(response: Response, isDocument: boolean): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
  if (isDocument) {
    headers.set("Cache-Control", "no-cache");
    headers.set("Content-Security-Policy", DOCUMENT_SECURITY_POLICY);
    headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return new Response(response.body, {
    headers,
    status: response.status,
    statusText: response.statusText,
  });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const isSafeAssetMethod = request.method === "GET" || request.method === "HEAD";
    const assetPath = isSafeAssetMethod ? catalogAssetPath(url.pathname) : null;

    if (assetPath) {
      const response = await env.ASSETS.fetch(rewrittenAssetRequest(request, assetPath));
      return securedResponse(
        response,
        url.pathname === "/" ||
          url.pathname === "/index.html" ||
          url.pathname === CATALOG_ENTRY ||
          url.pathname === "/admin-unavailable.html" ||
          url.pathname === ADMIN_UNAVAILABLE_ENTRY ||
          url.pathname === "/miniapp-unavailable.html" ||
          url.pathname === MINIAPP_UNAVAILABLE_ENTRY,
      );
    }

    return securedResponse(await handler.fetch(request, env, ctx), false);
  },
};

export default worker;
