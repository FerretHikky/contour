type ComponentLifecycle = "stable" | "beta" | "experimental" | "deprecated";
type ComponentLevel = "primitive" | "component" | "pattern";
type ComponentPlatform =
  | "web"
  | "telegram-mini-app"
  | "telegram-bot"
  | "ios"
  | "android";

interface ComponentImplementationReference {
  platform: ComponentPlatform;
  file: string;
  symbols: string[];
}

interface ComponentRegistryEntry {
  name: string;
  summary: string;
  synonyms: string[];
  category: string;
  level: ComponentLevel;
  status: ComponentLifecycle;
  replacement: string | null;
  platforms: ComponentPlatform[];
  purpose: string;
  variants: string[];
  sizes: string[];
  states: string[];
  dependencies: string[];
  accessibility: string[];
  platformDifferences: Record<string, string>;
  implementation: {
    canonical: ComponentImplementationReference[];
    legacyReferences: string[];
  };
}

interface CatalogEntry {
  slug: string;
  route: string;
  searchText: string;
  registry: ComponentRegistryEntry;
}

interface CatalogGuidanceChoice {
  target: string;
  when: string;
}

interface CatalogGuidanceComparison {
  id: string;
  title: string;
  choices: CatalogGuidanceChoice[];
  summary: string;
}

interface CatalogGuidanceComposition {
  id: string;
  title: string;
  parts: string[];
  note: string;
}

interface CatalogPilotExample {
  id: string;
  title: string;
  core: string[];
  supporting: string[];
  feature: string[];
  lesson: string;
}

// Keep the runtime's actual model keys and token shapes tied to the validated,
// generated artifact. Registry enums retain their stricter public contract.
type GeneratedCatalogModel = typeof import("../../generated/catalog-model.json");
type CatalogModel = Omit<GeneratedCatalogModel, "registry"> & {
  registry: Omit<GeneratedCatalogModel["registry"], "entries"> & {
    entries: CatalogEntry[];
  };
};

// Catalog playgrounds use named native inputs (including the hidden values of
// Core Dropdown). This is local to those authored forms, never a DOM override.
type CatalogPlaygroundControlName =
  | "activeTab" | "count" | "currency" | "disabled" | "endIcon" | "error"
  | "hint" | "initials" | "label" | "max" | "name" | "placeholder"
  | "showLabel" | "showPlaceholder" | "size" | "startIcon" | "state"
  | "tabCount" | "value" | "variant" | "width";
type CatalogPlaygroundForm = HTMLFormElement & {
  elements: HTMLFormControlsCollection & Record<CatalogPlaygroundControlName, HTMLInputElement>;
};

// None of the Catalog forms contains a file input. Keep the browser FormData
// implementation, while making its text-only result explicit at construction.
type CatalogTextFormData = Omit<FormData, "get"> & {
  get(name: string): string | null;
};

interface IconRuntimeModule {
  set(
    host: Element,
    glyph: string,
    options: { style: string },
  ): Promise<boolean>;
}

interface ReflowerUIRuntime {
  showToast?: (host: HTMLElement, options?: {message?: string; variant?: string; duration?: number; persistent?: boolean; uniqueID?: string; duplicate?: "ignore" | "replace"}) => void;
  dismissToast?: (host: HTMLElement, reason?: string) => void;
  setButtonState?: (
    action: HTMLElement,
    options?: { disabled?: boolean; loading?: boolean; skeleton?: boolean },
  ) => void;
}

interface Window {
  ReflowerCore?: Record<string, unknown>;
  ReflowerUI?: ReflowerUIRuntime;
}
