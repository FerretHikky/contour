import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";

declare const __CATALOG_SOURCE_SHA256__: string;

interface CatalogRouteDetail {
  route: string;
}

declare global {
  interface WindowEventMap {
    "catalog:route": CustomEvent<CatalogRouteDetail>;
  }
}

function routeFromLocation(): string {
  return decodeURIComponent(window.location.hash.slice(1) || "overview").split("?")[0];
}

function primarySection(route: string): "home" | "foundation" | "primitives" | "components" | "template" | null {
  if (route === "overview") return "home";
  if (route === "foundations" || route.startsWith("foundations/")) return "foundation";
  if (route === "primitives" || route.startsWith("primitives/")) return "primitives";
  if (route === "patterns" || route.startsWith("patterns/")) return "template";
  if (route.startsWith("guidelines/")) return null;
  return "components";
}

function CatalogController() {
  const [route, setRoute] = useState(routeFromLocation);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    new URL(window.location.href).searchParams.get("theme") === "dark" ? "dark" : "light",
  );

  const primaryRoot = document.getElementById("catalog-react-primary");
  const actionsRoot = document.getElementById("catalog-react-actions");

  useEffect(() => {
    const syncHash = () => setRoute(routeFromLocation());
    const syncRenderedRoute = (event: WindowEventMap["catalog:route"]) => {
      setRoute(event.detail.route);
    };
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("catalog:route", syncRenderedRoute);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("catalog:route", syncRenderedRoute);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const currentShell = document.getElementById("catalog-shell");
    if (!currentShell) return;
    const applyLayout = () => {
      const styles = getComputedStyle(document.documentElement);
      const large = Number.parseFloat(styles.getPropertyValue("--rf-breakpoint-lg")) || 0;
      const small = Number.parseFloat(styles.getPropertyValue("--rf-breakpoint-sm")) || 0;
      const width = document.documentElement.clientWidth;
      currentShell.dataset.catalogWide = String(width > large);
      currentShell.dataset.catalogCompact = String(width <= large);
      const phone = width <= small;
      currentShell.dataset.catalogPhone = String(phone);
      const navigation = document.getElementById("catalog-react-primary");
      navigation?.classList.toggle("rf-navigation-bar--top", !phone);
      navigation?.classList.toggle("rf-navigation-bar--bottom", phone);
      if (navigation) navigation.dataset.navigationComponent = phone ? "TabBar" : "NavigationBar";
    };
    const observer = new ResizeObserver(applyLayout);
    observer.observe(document.documentElement);
    applyLayout();
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const url = new URL(window.location.href);
    if (nextTheme === "dark") url.searchParams.set("theme", "dark");
    else url.searchParams.delete("theme");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    setTheme(nextTheme);
  };

  const activeSection = primarySection(route);

  const primaryNavigation = primaryRoot
    ? createPortal(
        <>
          {[
            ["overview", "home", "Home", "home"],
            ["foundations", "foundation", "Foundation", "cube"],
            ["primitives", "primitives", "Primitives", "ai-02"],
            ["components", "components", "Components", "grid-four-01"],
            ["patterns", "template", "Templates", "layers-three"],
          ].map(([target, section, label, glyph]) => (
            <a
              className="rf-navigation-bar__item"
              href={`#${target}`}
              data-catalog-section={section}
              aria-current={activeSection === section ? "page" : undefined}
              key={target}
            >
              <span className="rf-icon rf-icon--md catalog-navigation-icon" data-rf-icon-glyph={glyph} data-rf-icon-style="solid" aria-hidden="true" />
              <span className="rf-navigation-bar__label">{label}</span>
            </a>
          ))}
        </>,
        primaryRoot,
      )
    : null;

  const actions = actionsRoot
    ? createPortal(
        <button
          className="rf-icon-button rf-icon-button--secondary"
          id="theme-toggle"
          type="button"
          aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <span
            className="rf-icon rf-icon--sm"
            data-rf-icon-glyph={theme === "dark" ? "clear-night-01" : "sunny"}
            aria-hidden="true"
          />
        </button>,
        actionsRoot,
      )
    : null;

  return (
    <>
      {primaryNavigation}
      {actions}
    </>
  );
}

const root = document.getElementById("catalog-react-controller");
if (!root) throw new Error("Catalog React controller root is missing");
root.dataset.catalogReactSource = __CATALOG_SOURCE_SHA256__;
createRoot(root).render(<CatalogController />);
