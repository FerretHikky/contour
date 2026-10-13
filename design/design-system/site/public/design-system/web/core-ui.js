/* Generated from design/design-system/web/runtime/core-ui.ts. Do not edit this JavaScript directly. */
// JSDoc contracts are checked on the byte-identical generated JavaScript by tsconfig.runtime.json.
/* Framework-independent Web behavior for Core UI compound components. */
(function () {
  "use strict";

  // Only canonical Icon hosts opt into the new set; legacy data-lucide stays separate.
  var iconModuleURL = document.currentScript && /** @type {HTMLScriptElement} */ (document.currentScript).src
    ? new URL("icon-glyphs.js", /** @type {HTMLScriptElement} */ (document.currentScript).src).href : null;
  /** @type {Promise<IconRuntimeModule> | undefined} */
  var iconModule;
  /** @type {WeakMap<Element, string>} */
  var iconSignatures = new WeakMap();
  function initializeIcons(scope) {
    var hosts = scope.matches && scope.matches('[data-rf-icon-glyph]')
      ? [scope] : scope.querySelectorAll('[data-rf-icon-glyph]');
    hosts.forEach(function (host) {
      if (!iconModuleURL) return;
      var signature = JSON.stringify([host.dataset.rfIconGlyph, host.dataset.rfIconStyle || 'line', host.getAttribute('aria-label')]);
      if (iconSignatures.get(host) === signature) return;
      iconSignatures.set(host, signature);
      if (!iconModule) iconModule = import(iconModuleURL).catch(function (error) { iconModule = null; throw error; });
      iconModule.then(function (runtime) {
        if (iconSignatures.get(host) === signature) return runtime.set(host, host.dataset.rfIconGlyph, {style: host.dataset.rfIconStyle || 'line'});
      }).catch(function () { iconSignatures.delete(host); host.dataset.rfIconError = 'load'; });
    });
  }
  initializeIcons(document);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      if (record.type === 'attributes') initializeIcons(record.target);
      record.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeIcons(node);
      });
    });
  }).observe(document.documentElement, {subtree: true, childList: true, attributes: true,
    attributeFilter: ['data-rf-icon-glyph', 'data-rf-icon-style', 'aria-label']});

  /*
   * Loading and skeleton are declarative intents. One shared snapshot keeps
   * their derived disabled/busy semantics active until both intents end.
   */
  /** @type {WeakMap<Element, Record<string, unknown>>} */
  var loadingSnapshots = new WeakMap();

  // Price keeps a decimal string: no floating-point rounding or currency in value.
  /** @type {WeakMap<HTMLInputElement, string>} */
  var priceValues = new WeakMap();
  // Currency is a display parameter, never a conversion of the entered amount.
  function renderCurrency(suffix) {
    if (!suffix.matches(".rf-text-field__suffix[data-rf-currency]")) return;
    var code = (suffix.getAttribute("data-rf-currency") || "").trim().toUpperCase();
    if (!/^[A-Z]{3}$/.test(code)) return;
    var label = suffix.getAttribute("data-rf-currency-label");
    if (!label) {
      try {
        label = new Intl.NumberFormat(document.documentElement.lang || "en", {
          style: "currency", currency: code, currencyDisplay: "narrowSymbol"
        }).formatToParts(0).find(function (part) { return part.type === "currency"; }).value;
      } catch (_) { label = code; }
    }
    suffix.textContent = label;
    suffix.setAttribute("aria-label", code + ": " + label);
    suffix.setAttribute("title", code);
  }
  function initializeCurrencies(scope) {
    if (scope.matches && scope.matches(".rf-text-field__suffix[data-rf-currency]")) renderCurrency(scope);
    if (scope.querySelectorAll) scope.querySelectorAll(".rf-text-field__suffix[data-rf-currency]").forEach(renderCurrency);
  }
  initializeCurrencies(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") renderCurrency(mutation.target);
      else mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeCurrencies(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true,
    attributes: true, attributeFilter: ["data-rf-currency", "data-rf-currency-label"] });
  function normalizePriceValue(value) {
    var compact = value.replace(/[\s\u00a0\u202f]/g, "");
    if (!/^\d*(?:[.,]\d{0,2})?$/.test(compact)) return null;
    return compact.replace(",", ".").replace(/^\./, "0.");
  }
  /**
   * @param {EventTarget | null} field
   * @returns {field is HTMLInputElement}
   */
  function isPriceField(field) {
    return field && /** @type {Element} */ (field).matches && /** @type {Element} */ (field).matches("input[data-rf-price]");
  }
  /** @param {HTMLInputElement} field */
  function reconcilePrice(field) {
    var normalized = normalizePriceValue(field.value);
    var next = normalized === null ? (priceValues.get(field) || "") : normalized;
    if (field.value !== next) {
      var caret = field.selectionStart;
      var prefix = caret === null ? next : normalizePriceValue(field.value.slice(0, caret));
      field.value = next;
      if (caret !== null) field.setSelectionRange(prefix === null ? next.length : prefix.length, prefix === null ? next.length : prefix.length);
    }
    priceValues.set(field, next);
  }
  document.addEventListener("focusin", function (event) {
    if (isPriceField(event.target)) reconcilePrice(event.target);
  }, true);
  document.addEventListener("beforeinput", function (event) {
    var field = event.target;
    if (!isPriceField(field) || event.isComposing || event.data === null || field.selectionStart === null) return;
    var next = field.value.slice(0, field.selectionStart) + event.data + field.value.slice(field.selectionEnd);
    if (normalizePriceValue(next) === null) event.preventDefault();
  }, true);
  document.addEventListener("input", function (event) {
    if (isPriceField(event.target) && !/** @type {InputEvent} */ (event).isComposing) reconcilePrice(event.target);
  }, true);
  document.addEventListener("compositionend", function (event) {
    if (!isPriceField(event.target)) return;
    reconcilePrice(event.target);
    event.target.dispatchEvent(new Event("input", { bubbles: true }));
  }, true);
  document.addEventListener("reset", function (event) {
    if (!/** @type {HTMLFormElement} */ (event.target).querySelectorAll) return;
    /** @type {NodeListOf<HTMLInputElement>} */ (/** @type {HTMLFormElement} */ (event.target).querySelectorAll("input[data-rf-price]")).forEach(function (field) {
      priceValues.set(field, normalizePriceValue(field.defaultValue) || "");
    });
  }, true);

  function restoreAttribute(element, name, value) {
    if (value === null) element.removeAttribute(name);
    else element.setAttribute(name, value);
  }

  /*
   * TextField supplies the mechanical accessibility wiring that is safe to infer
   * from its own anatomy. Product code still owns copy, validity and native
   * attributes; Core only completes missing ids/associations and keeps the
   * active supporting message in aria-describedby.
   */
  var fieldSemantics = new WeakMap();
  var nextFieldId = 0;

  function uniqueFieldId(suffix) {
    var candidate;
    do {
      nextFieldId += 1;
      candidate = "rf-text-field-" + nextFieldId + (suffix || "");
    } while (document.getElementById(candidate));
    return candidate;
  }

  function fieldControlFor(root) {
    var control = root.querySelector(".rf-text-field__control");
    if (!control || control.closest(".rf-text-field-group") !== root) return null;
    return Array.from(control.children).find(function (child) {
      return child.matches(".rf-text-field,.rf-text-field--multiline,.rf-date-picker,.rf-select,.rf-select-trigger");
    }) || null;
  }

  function fieldMessagesFor(root) {
    return Array.from(root.querySelectorAll(".rf-text-field__hint,.rf-text-field__error")).filter(function (message) {
      return message.closest(".rf-text-field-group") === root;
    });
  }

  function syncFieldSemantics(root) {
    if (!root || !root.matches || !root.matches(".rf-text-field-group")) return;
    var field = fieldControlFor(root);
    if (!field) return;
    var label = Array.from(root.querySelectorAll("label.rf-text-field__label")).find(function (candidate) {
      return candidate.closest(".rf-text-field-group") === root;
    });
    if (label && !label.contains(field)) {
      if (!field.id && label.htmlFor && !document.getElementById(label.htmlFor)) field.id = label.htmlFor;
      if (!field.id) field.id = uniqueFieldId("");
      if (label.htmlFor !== field.id) label.htmlFor = field.id;
    }

    var messages = fieldMessagesFor(root);
    messages.forEach(function (message) {
      if (!message.id) message.id = uniqueFieldId(message.classList.contains("rf-text-field__error") ? "-error" : "-hint");
      if (message.classList.contains("rf-text-field__error")) {
        if (!message.hasAttribute("aria-live")) message.setAttribute("aria-live", "polite");
        if (!message.hasAttribute("aria-atomic")) message.setAttribute("aria-atomic", "true");
      }
    });

    var state = fieldSemantics.get(field);
    if (!state) {
      var messageIds = new Set(messages.map(function (message) { return message.id; }));
      state = {
        baseDescriptionIds: (field.getAttribute("aria-describedby") || "").split(/\s+/).filter(function (id) {
          return id && !messageIds.has(id);
        }),
      };
      fieldSemantics.set(field, state);
    }
    var visible = messages.filter(function (message) { return !message.hidden; });
    var errors = visible.filter(function (message) { return message.classList.contains("rf-text-field__error"); });
    var activeMessages = errors.length ? errors : visible.filter(function (message) {
      return message.classList.contains("rf-text-field__hint");
    });
    var descriptionIds = Array.from(new Set(state.baseDescriptionIds.concat(activeMessages.map(function (message) {
      return message.id;
    }))));
    if (descriptionIds.length) field.setAttribute("aria-describedby", descriptionIds.join(" "));
    else field.removeAttribute("aria-describedby");
  }

  function initializeFieldSemantics(scope) {
    if (!scope) return;
    var roots = [];
    if (scope.matches && scope.matches(".rf-text-field-group")) roots.push(scope);
    if (scope.querySelectorAll) roots = roots.concat(Array.from(scope.querySelectorAll(".rf-text-field-group")));
    roots.forEach(syncFieldSemantics);
  }

  initializeFieldSemantics(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        syncFieldSemantics(/** @type {Element} */ (mutation.target).closest(".rf-text-field-group"));
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        initializeFieldSemantics(node);
        syncFieldSemantics(node.parentElement && node.parentElement.closest(".rf-text-field-group"));
      });
      if (mutation.removedNodes.length) {
        syncFieldSemantics(/** @type {Element} */ (mutation.target).closest(".rf-text-field-group"));
      }
    });
  }).observe(document.documentElement, {
    attributeFilter: ["hidden"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  /*
   * Non-auth fields can explicitly opt out of browser and password-manager
   * suggestions. autocomplete=off remains the standards-facing instruction;
   * the additional attributes are harmless vendor hints for managers that do
   * not consistently honour it. Auth purposes are deliberately left intact.
   */
  function applyAutofillPolicy(field) {
    if (!field || !field.matches || !field.matches('input[data-rf-autofill="off"],textarea[data-rf-autofill="off"]')) return;
    var purpose = (field.getAttribute("autocomplete") || "").toLowerCase();
    if (field.matches('input[type="password"]') || ["username", "current-password", "new-password", "one-time-code"].indexOf(purpose) !== -1) return;
    field.setAttribute("autocomplete", "off");
    field.setAttribute("data-lpignore", "true");
    field.setAttribute("data-1p-ignore", "");
    field.setAttribute("data-bwignore", "");
    field.setAttribute("data-form-type", "other");
  }

  function initializeAutofillPolicy(scope) {
    if (!scope) return;
    var fields = [];
    if (scope.matches && scope.matches('[data-rf-autofill="off"]')) fields.push(scope);
    if (scope.querySelectorAll) fields = fields.concat(Array.from(scope.querySelectorAll('[data-rf-autofill="off"]')));
    fields.forEach(applyAutofillPolicy);
  }

  initializeAutofillPolicy(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeAutofillPolicy(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  /*
   * Floating labels use the native :placeholder-shown state so controlled,
   * uncontrolled, pasted, autofilled and programmatically assigned values all
   * share one CSS contract. A private blank placeholder enables that state when
   * product code does not provide visible placeholder copy.
   */
  function initializeFloatingFields(scope) {
    if (!scope) return;
    var controls = [];
    if (scope.matches && scope.matches(".rf-text-field__control")) controls.push(scope);
    if (scope.querySelectorAll) {
      controls = controls.concat(Array.from(scope.querySelectorAll(".rf-text-field__control")));
    }
    controls.forEach(function (control) {
      var label = Array.from(control.children).find(function (child) {
        return child.classList.contains("rf-text-field__label");
      });
      if (!label) return;
      var field = Array.from(control.children).find(function (child) {
        return child.matches(".rf-text-field,.rf-text-field--multiline,.rf-select,.rf-select-trigger");
      });
      if (field && field.matches(".rf-date-picker,.rf-select,.rf-select-trigger")) {
        if (field.value || field.getAttribute("data-rf-value")) field.setAttribute("data-rf-has-value", "");
        else field.removeAttribute("data-rf-has-value");
      } else if (field && !field.hasAttribute("placeholder")) {
        field.setAttribute("placeholder", " ");
        field.setAttribute("data-rf-floating-placeholder", "");
      }
    });
  }

  initializeFloatingFields(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        initializeFloatingFields(node);
        var parentControl = node.parentElement && node.parentElement.closest(".rf-text-field__control");
        if (parentControl) initializeFloatingFields(parentControl);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  document.addEventListener("input", function (event) {
    if (/** @type {Element} */ (event.target).matches(".rf-date-picker,.rf-select")) initializeFloatingFields(/** @type {Element} */ (event.target).closest(".rf-text-field__control"));
  });
  document.addEventListener("change", function (event) {
    if (/** @type {Element} */ (event.target).matches(".rf-date-picker,.rf-select")) initializeFloatingFields(/** @type {Element} */ (event.target).closest(".rf-text-field__control"));
  });

  /*
   * Password is a TextField composition with the existing trailing action.
   * Product code owns localized labels; Core owns type/icon/pressed state and
   * restores the input focus and selection after the action is activated.
   */
  var passwordToggleDisabled = new WeakMap();

  function passwordFieldFor(toggle) {
    var control = toggle.closest(".rf-text-field__control");
    if (!control) return null;
    return control.querySelector(
      ".rf-text-field[data-rf-password-field]," +
      ".rf-text-field[type=password]"
    );
  }

  function renderPasswordToggle(toggle, field) {
    var visible = field.type === "text";
    var icon = toggle.querySelector("[data-rf-icon-glyph]");
    var iconName = visible ? "eye-off" : "eye";
    toggle.setAttribute("aria-pressed", visible ? "true" : "false");
    if (field.id) toggle.setAttribute("aria-controls", field.id);
    var label = toggle.getAttribute(
      visible ? "data-rf-password-hide-label" : "data-rf-password-show-label"
    );
    if (label) toggle.setAttribute("aria-label", label);
    if (icon && icon.getAttribute("data-rf-icon-glyph") !== iconName) {
      icon.setAttribute("data-rf-icon-glyph", iconName);
    }
    var disabled = field.disabled || passwordToggleDisabled.get(toggle) === true;
    if (toggle.disabled !== disabled) toggle.disabled = disabled;
  }

  function togglePasswordVisibility(toggle) {
    var field = passwordFieldFor(toggle);
    if (!field || field.disabled || toggle.disabled) return;
    var selectionStart = field.selectionStart;
    var selectionEnd = field.selectionEnd;
    var selectionDirection = field.selectionDirection;
    field.type = field.type === "password" ? "text" : "password";
    renderPasswordToggle(toggle, field);
    field.focus({ preventScroll: true });
    if (selectionStart !== null && selectionEnd !== null) {
      field.setSelectionRange(selectionStart, selectionEnd, selectionDirection || "none");
    }
  }

  function initializePasswordToggles(scope) {
    var toggles = [];
    if (scope.matches && scope.matches("[data-rf-password-toggle]")) toggles.push(scope);
    if (scope.querySelectorAll) {
      toggles = toggles.concat(Array.from(scope.querySelectorAll("[data-rf-password-toggle]")));
    }
    toggles.forEach(function (toggle) {
      var field = passwordFieldFor(toggle);
      if (!field) return;
      field.setAttribute("data-rf-password-field", "");
      if (!passwordToggleDisabled.has(toggle)) {
        passwordToggleDisabled.set(toggle, toggle.disabled);
        toggle.addEventListener("click", function () {
          togglePasswordVisibility(toggle);
        });
      }
      renderPasswordToggle(toggle, field);
    });
  }

  initializePasswordToggles(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        var control = /** @type {Element} */ (mutation.target).closest(".rf-text-field__control");
        if (control) initializePasswordToggles(control);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        initializePasswordToggles(node);
        var control = node.parentElement && node.parentElement.closest(".rf-text-field__control");
        if (control) initializePasswordToggles(control);
      });
    });
  }).observe(document.documentElement, {
    attributeFilter: ["disabled", "type"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  /* Native reset runs after the reset event. Reconcile only Core-owned derived
   * state on the next task; native values and product state remain untouched. */
  document.addEventListener("reset", function (event) {
    window.setTimeout(function () {
      var form = /** @type {HTMLFormElement} */ (event.target);
      if (!form || !form.querySelectorAll) return;
      form.querySelectorAll("[data-rf-password-toggle]").forEach(function (toggle) {
        var field = passwordFieldFor(toggle);
        if (!field) return;
        field.type = "password";
        renderPasswordToggle(toggle, field);
      });
      initializeInputClearActions(form);
      initializeFloatingFields(form);
      initializeFieldSemantics(form);
    }, 0);
  });

  /*
   * A clear button is the generic trailing action for editable text controls.
   * Product code owns its localized accessible name and system icon; Core owns
   * visibility, disabled state, native events and focus restoration.
   */
  var inputClearInitialized = new WeakSet();
  var inputClearDisabled = new WeakMap();

  function fieldForInputClear(action) {
    var control = action.closest(".rf-text-field__control");
    if (!control) return null;
    return control.querySelector(".rf-text-field,.rf-text-field--multiline");
  }

  function renderInputClear(action, field) {
    var control = action.closest(".rf-text-field__control");
    var semanticOwner = control && control.querySelector("[data-rf-password-toggle],[data-rf-date-trigger]");
    if (field.id) action.setAttribute("aria-controls", field.id);
    if (!inputClearDisabled.has(action)) inputClearDisabled.set(action, action.disabled);
    var disabled = field.disabled || field.readOnly || inputClearDisabled.get(action) === true;
    if (action.disabled !== disabled) action.disabled = disabled;
    var editing = control && control.matches(":focus-within");
    action.hidden = !editing || field.value.length === 0 || !!semanticOwner || disabled;
  }

  function deferInputClearRender(action, field) {
    window.setTimeout(function () { renderInputClear(action, field); }, 0);
  }

  function clearInputValue(action) {
    var field = fieldForInputClear(action);
    if (!field || field.disabled || field.readOnly || action.disabled) return;
    field.value = "";
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
    renderInputClear(action, field);
    field.focus({ preventScroll: true });
  }

  function initializeInputClearActions(scope) {
    var actions = [];
    if (scope.matches && scope.matches("[data-rf-input-clear]")) actions.push(scope);
    if (scope.querySelectorAll) {
      actions = actions.concat(Array.from(scope.querySelectorAll("[data-rf-input-clear]")));
    }
    actions.forEach(function (action) {
      var field = fieldForInputClear(action);
      if (!field) return;
      if (!inputClearInitialized.has(action)) {
        inputClearInitialized.add(action);
        action.addEventListener("click", function () { clearInputValue(action); });
        field.addEventListener("input", function () { renderInputClear(action, field); });
        field.addEventListener("change", function () { renderInputClear(action, field); });
        field.addEventListener("focus", function () { renderInputClear(action, field); });
        field.addEventListener("blur", function () { deferInputClearRender(action, field); });
        action.addEventListener("focus", function () { renderInputClear(action, field); });
        action.addEventListener("blur", function () { deferInputClearRender(action, field); });
      }
      renderInputClear(action, field);
    });
  }

  initializeInputClearActions(document);
  window.addEventListener("pageshow", function () { initializeInputClearActions(document); });
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        var control = /** @type {Element} */ (mutation.target).closest(".rf-text-field__control");
        if (control) initializeInputClearActions(control);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        initializeInputClearActions(node);
        var control = node.parentElement && node.parentElement.closest(".rf-text-field__control");
        if (control) initializeInputClearActions(control);
      });
    });
  }).observe(document.documentElement, {
    attributeFilter: ["disabled", "readonly", "value"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  /*
   * DatePicker keeps native date input semantics and browser-owned locale,
   * partial input, validation, min/max and overlay. Core only adds the shared
   * floating state and a named system-icon action for showPicker().
   */
  var datePickerInitialized = new WeakSet();
  var dateTriggerDisabled = new WeakMap();

  function syncDatePicker(field) {
    if (field.value) field.setAttribute("data-rf-has-value", "");
    else field.removeAttribute("data-rf-has-value");
    var control = field.closest(".rf-text-field__control");
    var trigger = control && control.querySelector("[data-rf-date-trigger]");
    if (!trigger) return;
    if (field.id) trigger.setAttribute("aria-controls", field.id);
    if (!dateTriggerDisabled.has(trigger)) dateTriggerDisabled.set(trigger, trigger.disabled);
    trigger.disabled = field.disabled || dateTriggerDisabled.get(trigger) === true;
  }

  function openDatePicker(field) {
    if (field.disabled) return;
    field.focus({ preventScroll: true });
    if (typeof field.showPicker === "function") {
      try { field.showPicker(); } catch (error) { field.focus({ preventScroll: true }); }
    }
  }

  function initializeDatePickers(scope) {
    var fields = [];
    if (scope.matches && scope.matches("[data-rf-date-picker],.rf-date-picker[type=date]")) fields.push(scope);
    if (scope.querySelectorAll) fields = fields.concat(Array.from(scope.querySelectorAll("[data-rf-date-picker],.rf-date-picker[type=date]")));
    fields.forEach(function (field) {
      if (!datePickerInitialized.has(field)) {
        datePickerInitialized.add(field);
        field.setAttribute("data-rf-date-picker", "");
        field.addEventListener("input", function () { syncDatePicker(field); });
        field.addEventListener("change", function () { syncDatePicker(field); });
        var trigger = field.closest(".rf-text-field__control") && field.closest(".rf-text-field__control").querySelector("[data-rf-date-trigger]");
        if (trigger) trigger.addEventListener("click", function () { openDatePicker(field); });
      }
      syncDatePicker(field);
    });
  }

  initializeDatePickers(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        if (/** @type {Element} */ (mutation.target).matches("[data-rf-date-picker],.rf-date-picker[type=date]")) syncDatePicker(mutation.target);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeDatePickers(node);
      });
    });
  }).observe(document.documentElement, { attributeFilter: ["disabled", "value"], attributes: true, childList: true, subtree: true });

  /* Dropdown selection mode owns a custom listbox presentation. Deprecated
   * data-rf-select attributes remain accepted during product migration.
   */
  var selectInitialized = new WeakSet();
  var selectSequence = 0;

  function selectParts(root) {
    return {
      trigger: root.querySelector("[data-rf-dropdown-trigger],[data-rf-select-trigger]"),
      listbox: root.querySelector("[data-rf-dropdown-panel],[data-rf-select-listbox]") || root.querySelector('[role="listbox"]'),
      listboxes: Array.from(root.querySelectorAll('[role="listbox"]')),
      input: root.querySelector("[data-rf-dropdown-input],[data-rf-select-input]"),
      search: root.querySelector("[data-rf-dropdown-search],[data-rf-select-search]"),
      empty: root.querySelector("[data-rf-dropdown-empty],[data-rf-select-empty]"),
      status: root.querySelector("[data-rf-dropdown-status],[data-rf-select-status]"),
      editable: root.hasAttribute("data-rf-dropdown-editable"),
      options: Array.from(root.querySelectorAll('[role="option"]')),
    };
  }

  function selectHas(root, name) {
    return root.hasAttribute("data-rf-dropdown-" + name) || root.hasAttribute("data-rf-select-" + name);
  }

  function selectOptionAttribute(option, name) {
    return option.getAttribute("data-rf-dropdown-" + name) || option.getAttribute("data-rf-select-" + name);
  }

  function availableSelectOptions(parts, listbox) {
    return parts.options.filter(function (option) {
      return !option.hidden && option.getAttribute("aria-disabled") !== "true" && (!listbox || option.closest('[role="listbox"]') === listbox);
    });
  }

  function selectedSelectOptions(parts) {
    return parts.options.filter(function (option) { return option.getAttribute("aria-selected") === "true"; });
  }

  function selectedSelectOption(parts) {
    return selectedSelectOptions(parts)[0] || null;
  }

  function selectOptionLabel(option) {
    var label = option && option.querySelector("[data-rf-dropdown-label],[data-rf-select-label]");
    return label ? label.textContent.trim() : option ? option.textContent.trim() : "";
  }

  function setSelectIcon(host, name) {
    if (!host || host.getAttribute("data-rf-icon-glyph") === name) return;
    host.setAttribute("data-rf-icon-glyph", name);
  }

  function renderSelect(root) {
    var parts = selectParts(root);
    if (!parts.trigger || !parts.listbox) return;
    var selected = selectedSelectOptions(parts);
    var valueHost = parts.trigger.querySelector("[data-rf-dropdown-value],[data-rf-select-value]");
    var placeholder = parts.trigger.getAttribute("data-rf-dropdown-placeholder") || parts.trigger.getAttribute("data-rf-select-placeholder") || "";
    if (valueHost) {
      valueHost.textContent = selected.length ? selected.map(selectOptionLabel).join(", ") : placeholder;
      valueHost.className = selected.length ? "rf-dropdown__trigger-value" : "rf-dropdown__trigger-placeholder";
    }
    if (selected.length) parts.trigger.setAttribute("data-rf-has-value", "");
    else parts.trigger.removeAttribute("data-rf-has-value");
    if (parts.input) parts.input.value = selected.map(function (option) { return option.getAttribute("data-value") || ""; }).join(",");
    setSelectIcon(parts.trigger.querySelector("[data-rf-dropdown-chevron],[data-rf-select-chevron]"), parts.trigger.getAttribute("aria-expanded") === "true" ? "chevron-up" : "chevron-down");
  }

  function prepareSelectOptions(root) {
    var parts = selectParts(root);
    if (!parts.trigger || !parts.listbox) return parts;
    if (!parts.listbox.id) {
      selectSequence += 1;
      parts.listbox.id = "rf-dropdown-listbox-" + selectSequence;
    }
    if (parts.editable) {
      parts.trigger.setAttribute("role", "combobox");
      parts.trigger.setAttribute("aria-autocomplete", "list");
    }
    parts.trigger.setAttribute("aria-haspopup", "listbox");
    parts.trigger.setAttribute("aria-controls", parts.listbox.id);
    parts.listboxes.forEach(function (listbox) { listbox.tabIndex = -1; });
    if (selectHas(root, "multiple")) parts.listbox.setAttribute("aria-multiselectable", "true");
    parts.options.forEach(function (option, index) {
      if (!option.id) option.id = parts.listbox.id + "-option-" + index;
    });
    return parts;
  }

  function syncSelectFromInput(root) {
    var parts = prepareSelectOptions(root);
    if (!parts.input) { renderSelect(root); return; }
    var values = (parts.input.value || "").split(",").filter(Boolean);
    parts.options.forEach(function (option) {
      option.setAttribute("aria-selected", values.indexOf(option.getAttribute("data-value") || "") >= 0 ? "true" : "false");
    });
    renderSelect(root);
  }

  function setActiveSelectOption(parts, option) {
    parts.options.forEach(function (item) { item.toggleAttribute("data-rf-active", item === option); });
    parts.listboxes.forEach(function (listbox) { listbox.removeAttribute("aria-activedescendant"); });
    if (parts.editable) {
      if (option) parts.trigger.setAttribute("aria-activedescendant", option.id);
      else parts.trigger.removeAttribute("aria-activedescendant");
    }
    if (option) {
      option.closest('[role="listbox"]').setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    }
  }

  function closeSelectSubmenus(root, parts) {
    parts.listboxes.filter(function (listbox) { return listbox.hasAttribute("data-rf-dropdown-submenu") || listbox.hasAttribute("data-rf-select-submenu"); }).forEach(function (submenu) { submenu.hidden = true; });
    parts.options.forEach(function (option) { if (selectOptionAttribute(option, "submenu-target")) option.setAttribute("aria-expanded", "false"); });
  }

  function openSelectSubmenu(root, parts, option) {
    var targetId = option && selectOptionAttribute(option, "submenu-target");
    var submenu = targetId && document.getElementById(targetId);
    if (!submenu || !root.contains(submenu)) return false;
    closeSelectSubmenus(root, parts);
    submenu.hidden = false;
    option.setAttribute("aria-expanded", "true");
    var first = availableSelectOptions(parts, submenu)[0];
    setActiveSelectOption(parts, first || null);
    submenu.focus({ preventScroll: true });
    return true;
  }

  function filterSelectOptions(root, parts, query) {
    var normalized = query.trim().toLocaleLowerCase();
    parts.options.forEach(function (option) {
      option.hidden = root.getAttribute("data-rf-dropdown-filter") !== "external" && !!normalized && selectOptionLabel(option).toLocaleLowerCase().indexOf(normalized) < 0;
    });
    root.querySelectorAll("[data-rf-dropdown-group],[data-rf-select-group]").forEach(function (group) {
      group.hidden = !Array.from(group.querySelectorAll('[role="option"]')).some(function (option) { return !option.hidden; });
    });
    var visibleCount = parts.options.filter(function (option) { return !option.hidden; }).length;
    if (parts.empty) parts.empty.hidden = visibleCount > 0;
    if (parts.status) parts.status.textContent = visibleCount + " результатов";
    var active = parts.options.find(function (option) { return option.hasAttribute("data-rf-active"); });
    var available = availableSelectOptions(parts, parts.listbox);
    setActiveSelectOption(parts, available.indexOf(active) >= 0 ? active : available[0] || null);
  }

  function closeSelect(root, restoreFocus) {
    var parts = selectParts(root);
    if (!parts.trigger || !parts.listbox) return;
    parts.listbox.hidden = true;
    parts.listbox.style.removeProperty("transform");
    closeSelectSubmenus(root, parts);
    parts.trigger.setAttribute("aria-expanded", "false");
    setActiveSelectOption(parts, null);
    renderSelect(root);
    if (restoreFocus) parts.trigger.focus({ preventScroll: true });
  }

  function positionSelect(root, parts) {
    root.setAttribute("data-rf-placement", "bottom");
    parts.listbox.style.transform = "translateX(0px)";
    var rect = root.getBoundingClientRect();
    var menuRect = parts.listbox.getBoundingClientRect();
    var menuHeight = menuRect.height;
    var inset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rf-spacing-8")) || 8;
    var inlineShift = 0;
    if (menuRect.right > window.innerWidth - inset) inlineShift -= menuRect.right - (window.innerWidth - inset);
    if (menuRect.left + inlineShift < inset) inlineShift += inset - (menuRect.left + inlineShift);
    parts.listbox.style.transform = "translateX(" + inlineShift + "px)";
    if (window.innerHeight - rect.bottom < menuHeight && rect.top > window.innerHeight - rect.bottom) root.setAttribute("data-rf-placement", "top");
  }

  function openSelect(root, direction) {
    var parts = selectParts(root);
    if (!parts.trigger || !parts.listbox || parts.trigger.disabled) return;
    if (parts.editable && root.getAttribute("data-rf-dropdown-filter") === "external" && !parts.options.length) {
      closeSelect(root, false);
      return;
    }
    document.querySelectorAll('[data-rf-dropdown][data-rf-dropdown-mode="selection"],[data-rf-select]').forEach(function (other) { if (other !== root) closeSelect(other, false); });
    parts.listbox.hidden = false;
    parts.trigger.setAttribute("aria-expanded", "true");
    positionSelect(root, parts);
    var options = availableSelectOptions(parts, parts.listbox);
    var selected = selectedSelectOption(parts);
    var active = options.indexOf(selected) >= 0 ? selected : (direction === "up" ? options[options.length - 1] : options[0]);
    setActiveSelectOption(parts, active);
    renderSelect(root);
    if (parts.editable) parts.trigger.focus({ preventScroll: true });
    else if (parts.search) parts.search.focus({ preventScroll: true });
    else parts.listbox.focus({ preventScroll: true });
  }

  function chooseSelectOption(root, option) {
    var parts = selectParts(root);
    if (!option || option.hidden || option.getAttribute("aria-disabled") === "true") return;
    if (selectOptionAttribute(option, "submenu-target") && openSelectSubmenu(root, parts, option)) return;
    if (selectHas(root, "multiple")) option.setAttribute("aria-selected", option.getAttribute("aria-selected") === "true" ? "false" : "true");
    else parts.options.forEach(function (item) { item.setAttribute("aria-selected", item === option ? "true" : "false"); });
    if (parts.editable) parts.trigger.value = selectOptionLabel(option);
    renderSelect(root);
    if (parts.input) {
      parts.input.dispatchEvent(new Event("input", { bubbles: true }));
      parts.input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (!selectHas(root, "multiple")) closeSelect(root, true);
    else setActiveSelectOption(parts, option);
  }

  function initializeSelects(scope) {
    var roots = [];
    var selector = '[data-rf-dropdown][data-rf-dropdown-mode="selection"],[data-rf-select]';
    if (scope.matches && scope.matches(selector)) roots.push(scope);
    if (scope.querySelectorAll) roots = roots.concat(Array.from(scope.querySelectorAll(selector)));
    roots.forEach(function (root) {
      if (selectInitialized.has(root)) { renderSelect(root); return; }
      var parts = prepareSelectOptions(root);
      if (!parts.trigger || !parts.listbox) return;
      selectInitialized.add(root);
      parts.trigger.setAttribute("aria-expanded", "false");
      var initialValue = parts.input && parts.input.value;
      if (initialValue && !selectedSelectOption(parts)) {
        var initialValues = initialValue.split(",");
        parts.options.forEach(function (option) {
          if (initialValues.indexOf(option.getAttribute("data-value")) >= 0) option.setAttribute("aria-selected", "true");
        });
      }
      parts.trigger.addEventListener("click", function () {
        if (parts.editable) openSelect(root, "down");
        else if (parts.trigger.getAttribute("aria-expanded") === "true") closeSelect(root, true);
        else openSelect(root, "down");
      });
      parts.trigger.addEventListener("keydown", function (event) {
        if (parts.editable) {
          if (event.key === "Escape") {
            if (parts.trigger.getAttribute("aria-expanded") === "true") { event.preventDefault(); closeSelect(root, true); }
            return;
          }
          if (event.key === "Tab") { closeSelect(root, false); return; }
          if (event.key === "Enter") {
            if (parts.trigger.getAttribute("aria-expanded") === "true") {
              event.preventDefault();
              chooseSelectOption(root, selectParts(root).options.find(function (option) { return option.hasAttribute("data-rf-active"); }));
            }
            return;
          }
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          if (parts.trigger.getAttribute("aria-expanded") !== "true") { openSelect(root, event.key === "ArrowUp" ? "up" : "down"); return; }
          var currentParts = prepareSelectOptions(root);
          var options = availableSelectOptions(currentParts, currentParts.listbox);
          var active = currentParts.options.find(function (option) { return option.hasAttribute("data-rf-active"); });
          var index = options.indexOf(active);
          index = event.key === "ArrowUp" ? (index - 1 + options.length) % options.length : (index + 1) % options.length;
          setActiveSelectOption(currentParts, options[index] || null);
          return;
        }
        if (["ArrowDown", "ArrowUp", "Enter", " "].indexOf(event.key) < 0) return;
        event.preventDefault();
        openSelect(root, event.key === "ArrowUp" ? "up" : "down");
      });
      if (parts.editable) {
        parts.trigger.addEventListener("input", function () {
          var currentParts = prepareSelectOptions(root);
          currentParts.options.forEach(function (option) { option.setAttribute("aria-selected", "false"); });
          if (currentParts.input) {
            currentParts.input.value = "";
            currentParts.input.dispatchEvent(new Event("change", { bubbles: true }));
          }
          openSelect(root, "down");
          filterSelectOptions(root, currentParts, currentParts.trigger.value);
        });
      }
      parts.listboxes.forEach(function (listbox) { listbox.addEventListener("click", function (event) { chooseSelectOption(root, /** @type {Element} */ (event.target).closest('[role="option"]')); }); });
      parts.listboxes.forEach(function (listbox) { listbox.addEventListener("keydown", function (event) {
        var currentParts = prepareSelectOptions(root);
        if (event.key === "Escape") { event.preventDefault(); closeSelect(root, true); return; }
        if (event.key === "Tab") { closeSelect(root, false); return; }
        // Search keeps normal text editing (Space, Home/End and Left/Right).
        if (event.target === currentParts.search && event.key !== "Enter") return;
        var currentListbox = event.currentTarget;
        var options = availableSelectOptions(currentParts, currentListbox);
        var active = currentParts.options.find(function (option) { return option.hasAttribute("data-rf-active"); });
        var index = options.indexOf(active);
        if (event.key === "ArrowRight" && active && selectOptionAttribute(active, "submenu-target")) { event.preventDefault(); openSelectSubmenu(root, currentParts, active); return; }
        if (event.key === "ArrowLeft" && (currentListbox.hasAttribute("data-rf-dropdown-submenu") || currentListbox.hasAttribute("data-rf-select-submenu"))) {
          event.preventDefault();
          var parent = currentParts.options.find(function (option) { return selectOptionAttribute(option, "submenu-target") === currentListbox.id; });
          currentListbox.hidden = true;
          if (parent) { parent.setAttribute("aria-expanded", "false"); setActiveSelectOption(currentParts, parent); currentParts.listbox.focus({ preventScroll: true }); }
          return;
        }
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); chooseSelectOption(root, active); return; }
        if (["ArrowDown", "ArrowUp", "Home", "End"].indexOf(event.key) < 0 || !options.length) return;
        event.preventDefault();
        if (event.key === "Home") index = 0;
        else if (event.key === "End") index = options.length - 1;
        else if (event.key === "ArrowDown") index = (index + 1 + options.length) % options.length;
        else index = (index - 1 + options.length) % options.length;
        setActiveSelectOption(currentParts, options[index]);
      }); });
      if (parts.search) {
        parts.search.setAttribute("aria-controls", parts.listbox.id);
        parts.search.addEventListener("input", function () { var currentParts = prepareSelectOptions(root); filterSelectOptions(root, currentParts, currentParts.search.value); });
        parts.search.addEventListener("keydown", function (event) {
          if (event.key === "Escape") { event.preventDefault(); closeSelect(root, true); return; }
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          event.stopPropagation();
          var currentParts = prepareSelectOptions(root);
          var options = availableSelectOptions(currentParts, currentParts.listbox);
          var first = event.key === "ArrowUp" ? options[options.length - 1] : options[0];
          setActiveSelectOption(currentParts, first || null);
          currentParts.listbox.focus({ preventScroll: true });
        });
      }
      if (parts.input) {
        parts.input.addEventListener("input", function () { syncSelectFromInput(root); });
        parts.input.addEventListener("change", function () { syncSelectFromInput(root); });
      }
      root.querySelectorAll("[data-rf-dropdown-submenu-back],[data-rf-select-submenu-back]").forEach(function (back) {
        back.addEventListener("click", function () {
          var submenu = back.closest("[data-rf-dropdown-submenu],[data-rf-select-submenu]");
          var parent = parts.options.find(function (option) { return selectOptionAttribute(option, "submenu-target") === submenu.id; });
          submenu.hidden = true;
          if (parent) { parent.setAttribute("aria-expanded", "false"); setActiveSelectOption(parts, parent); parts.listbox.focus({ preventScroll: true }); }
        });
      });
      closeSelect(root, false);
    });
  }

  initializeSelects(document);
  document.addEventListener("pointerdown", function (event) {
    document.querySelectorAll('[data-rf-dropdown][data-rf-dropdown-mode="selection"],[data-rf-select]').forEach(function (root) {
      var trigger = root.querySelector('[data-rf-dropdown-trigger],[data-rf-select-trigger]');
      if (trigger && trigger.getAttribute("aria-expanded") === "true" && event.target instanceof Node && !root.contains(event.target)) closeSelect(root, false);
    });
  });
  function repositionOpenSelects() {
    document.querySelectorAll('[data-rf-dropdown][data-rf-dropdown-mode="selection"] [data-rf-dropdown-trigger][aria-expanded="true"],[data-rf-select] [data-rf-select-trigger][aria-expanded="true"]').forEach(function (trigger) {
      var root = trigger.closest('[data-rf-dropdown][data-rf-dropdown-mode="selection"],[data-rf-select]');
      positionSelect(root, selectParts(root));
    });
  }
  window.addEventListener("resize", repositionOpenSelects);
  window.addEventListener("scroll", repositionOpenSelects, true);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) { if (node.nodeType === Node.ELEMENT_NODE) initializeSelects(node); });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  function ensureButtonContent(action) {
    var content = Array.from(action.children).find(function (child) {
      return child.classList.contains("rf-button__content");
    });
    if (content) return content;

    content = document.createElement("span");
    content.className = "rf-button__content";
    Array.from(action.childNodes).forEach(function (node) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.classList.contains("rf-button__spinner")
      ) return;
      content.appendChild(node);
    });
    action.insertBefore(content, action.firstChild);
    return content;
  }

  function setButtonLoading(action, loading, skeleton) {
    var snapshot = loadingSnapshots.get(action);
    if (loading || skeleton) {
      if (!snapshot) {
        snapshot = {
          disabled: "disabled" in action ? action.disabled : null,
          ariaBusy: action.getAttribute("aria-busy"),
          ariaDisabled: action.getAttribute("aria-disabled"),
        };
        loadingSnapshots.set(action, snapshot);
      }

      ensureButtonContent(action);
      if (loading && !skeleton && !action.querySelector(":scope > .rf-button__spinner")) {
        var spinner = document.createElement("span");
        spinner.className = "rf-button__spinner";
        spinner.setAttribute("aria-hidden", "true");
        spinner.setAttribute("data-rf-loading-indicator", "");
        action.appendChild(spinner);
      }
      if (loading && !skeleton) {
        action.querySelectorAll(":scope > [data-rf-loading-indicator]").forEach(function (spinner) {
          spinner.hidden = false;
        });
      }
      if (!loading || skeleton) {
        action.querySelectorAll(":scope > [data-rf-loading-indicator]").forEach(function (spinner) {
          spinner.remove();
        });
      }
      if ("disabled" in action) action.disabled = true;
      action.setAttribute("aria-disabled", "true");
      action.setAttribute("aria-busy", "true");
      return;
    }

    if (!snapshot) return;
    if ("disabled" in action) action.disabled = snapshot.disabled;
    restoreAttribute(action, "aria-disabled", snapshot.ariaDisabled);
    restoreAttribute(action, "aria-busy", snapshot.ariaBusy);
    action.querySelectorAll(":scope > [data-rf-loading-indicator]").forEach(function (spinner) {
      spinner.remove();
    });
    loadingSnapshots.delete(action);
  }

  function syncButtonLoading(action) {
    if (!action.matches(".rf-button,.rf-icon-button")) return;
    if (action.getAttribute("data-rf-state-owner") === "react") return;
    setButtonLoading(action, action.getAttribute("data-loading") === "true", action.getAttribute("data-skeleton") === "true");
  }

  // A synchronous setter is useful for previews and adapters that change the
  // native disabled baseline and a busy intent in the same render.
  function setButtonState(action, options) {
    if (!action || !action.matches || !action.matches(".rf-button,.rf-icon-button")) return;
    if (action.getAttribute("data-rf-state-owner") === "react") return;
    options = options || {};
    var owns = function (key) { return Object.prototype.hasOwnProperty.call(options, key); };
    var loading = owns("loading") ? options.loading === true : action.getAttribute("data-loading") === "true";
    var skeleton = owns("skeleton") ? options.skeleton === true : action.getAttribute("data-skeleton") === "true";
    setButtonLoading(action, false, false);
    if (owns("disabled")) {
      if ("disabled" in action) action.disabled = options.disabled === true;
      else if (options.disabled === true) action.setAttribute("aria-disabled", "true");
      else action.removeAttribute("aria-disabled");
    }
    if (loading) action.setAttribute("data-loading", "true");
    else action.removeAttribute("data-loading");
    if (skeleton) action.setAttribute("data-skeleton", "true");
    else action.removeAttribute("data-skeleton");
    syncButtonLoading(action);
  }
  window.ReflowerUI = window.ReflowerUI || {};
  window.ReflowerUI.setButtonState = setButtonState;
  // One host displays one message. Duplicate visible messages do not reset reading time.
  var toastStates = new Map();
  function dismissToast(host, reason) {
    var state = toastStates.get(host);
    if (state) { clearTimeout(state.timer); toastStates.delete(host); }
    if (!host || host.hidden) return;
    var restore = host.contains(document.activeElement) && state && state.returnFocus;
    host.hidden = true;
    host.dispatchEvent(new CustomEvent('rf:toast-dismiss', {bubbles:true, detail:{reason:reason || 'manual'}}));
    if (restore && restore.isConnected) restore.focus();
  }
  function scheduleToast(host) {
    var state = toastStates.get(host);
    if (!state) return;
    clearTimeout(state.timer);
    if (!state.duration || state.paused.size || document.hidden) return;
    state.started = Date.now();
    state.timer = setTimeout(function () { dismissToast(host, 'auto'); }, state.remaining);
  }
  function pauseToast(host, key, pause) {
    var state = toastStates.get(host);
    if (!state) return;
    if (pause) {
      if (!state.paused.size && state.timer) state.remaining = Math.max(0, state.remaining - (Date.now() - state.started));
      clearTimeout(state.timer); state.timer = null; state.paused.add(key);
    } else state.paused.delete(key);
    scheduleToast(host);
  }
  function showToast(host, options) {
    if (!host || !host.matches('.rf-toast')) return;
    options = options || {};
    var content = host.querySelector('.rf-toast__content');
    var message = options.message === undefined ? (content ? content.textContent : '') : String(options.message);
    var variant = options.variant || host.getAttribute('data-variant') || 'info';
    var key = options.uniqueID || variant + ':' + message;
    var previous = toastStates.get(host);
    if (previous && !host.hidden && previous.key === key && options.duplicate !== 'replace') return;
    if (previous) clearTimeout(previous.timer);
    if (content) content.textContent = message;
    host.setAttribute('data-variant', variant);
    var duration = options.persistent === true || variant === 'error' ? 0 : (options.duration === undefined ? 5000 : Math.max(0, Number(options.duration) || 0));
    var paused = new Set();
    if (host.matches(':hover')) paused.add('pointer');
    if (host.contains(document.activeElement)) paused.add('focus');
    if (document.hidden) paused.add('visibility');
    toastStates.set(host, {key:key, duration:duration, remaining:duration, started:0, timer:null, paused:paused, returnFocus:previous ? previous.returnFocus : document.activeElement});
    host.hidden = false;
    scheduleToast(host);
  }
  window.ReflowerUI.showToast = showToast;
  window.ReflowerUI.dismissToast = dismissToast;
  document.addEventListener('pointerover', function (event) { var host = event.target instanceof Element && event.target.closest('.rf-toast'); if (host && event.pointerType !== 'touch') pauseToast(host, 'pointer', true); });
  document.addEventListener('pointerout', function (event) { var host = event.target instanceof Element && event.target.closest('.rf-toast'); if (host && !(event.relatedTarget instanceof Node && host.contains(event.relatedTarget))) pauseToast(host, 'pointer', false); });
  document.addEventListener('focusin', function (event) { var host = event.target instanceof Element && event.target.closest('.rf-toast'); if (host) pauseToast(host, 'focus', true); });
  document.addEventListener('focusout', function (event) { var host = event.target instanceof Element && event.target.closest('.rf-toast'); if (host && !(event.relatedTarget instanceof Node && host.contains(event.relatedTarget))) pauseToast(host, 'focus', false); });
  document.addEventListener('visibilitychange', function () { toastStates.forEach(function (_, host) { pauseToast(host, 'visibility', document.hidden); }); });
  new MutationObserver(function () { toastStates.forEach(function (state, host) { if (!host.isConnected) { clearTimeout(state.timer); toastStates.delete(host); } }); }).observe(document.documentElement, {childList:true, subtree:true});


  document.querySelectorAll(".rf-button,.rf-icon-button").forEach(syncButtonLoading);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        syncButtonLoading(mutation.target);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (/** @type {Element} */ (node).matches(".rf-button,.rf-icon-button")) {
          syncButtonLoading(node);
        }
        /** @type {Element} */ (node).querySelectorAll(".rf-button,.rf-icon-button").forEach(syncButtonLoading);
      });
    });
  }).observe(document.documentElement, {
    attributeFilter: ["data-loading", "data-skeleton"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  /* Visible supporting copy is a description, not part of the action name.
   * Keep caller-provided names and description IDs; own only inferred IDs. */
  var buttonCopySemantics = new WeakMap();
  var nextButtonCopyId = 0;
  function buttonCopyId(element, part) {
    if (!element.id) {
      var id;
      do { id = "rf-button-" + part + "-" + (++nextButtonCopyId); }
      while (document.getElementById(id));
      element.id = id;
    }
    return element.id;
  }
  function setButtonReference(action, attribute, ids) {
    var value = Array.from(new Set(ids)).join(" ");
    if (value) {
      if (action.getAttribute(attribute) !== value) action.setAttribute(attribute, value);
    } else if (action.hasAttribute(attribute)) action.removeAttribute(attribute);
  }
  function syncButtonCopy(action) {
    if (!action || !action.matches("button.rf-button,a.rf-button")) return;
    if (action.getAttribute("data-rf-state-owner") === "react") return;
    var state = buttonCopySemantics.get(action) || { label: null, subtitle: null };
    var ids = function (attribute, owned) {
      return (action.getAttribute(attribute) || "").split(/\s+/).filter(function (id) { return id && id !== owned; });
    };
    var labels = ids("aria-labelledby", state.label);
    var descriptions = ids("aria-describedby", state.subtitle);
    state.label = null;
    state.subtitle = null;
    var copy = action.querySelector(".rf-button__copy");
    var label = copy && copy.querySelector(".rf-button__label");
    var subtitle = copy && copy.querySelector(".rf-button__subtitle");
    var visibleSubtitle = subtitle && !subtitle.closest("[hidden]") &&
      window.getComputedStyle(subtitle).display !== "none" && subtitle.textContent.trim();
    if (visibleSubtitle) {
      subtitle.removeAttribute("aria-hidden");
      var subtitleId = buttonCopyId(subtitle, "subtitle");
      if (descriptions.indexOf(subtitleId) === -1) {
        descriptions.push(subtitleId);
        state.subtitle = subtitleId;
      }
      if (label && label.textContent.trim() && !action.getAttribute("aria-label") && !labels.length) {
        state.label = buttonCopyId(label, "label");
        labels.push(state.label);
      }
    }
    buttonCopySemantics.set(action, state);
    setButtonReference(action, "aria-labelledby", labels);
    setButtonReference(action, "aria-describedby", descriptions);
  }
  function initializeButtonCopy(scope) {
    if (!scope) return;
    if (scope.matches && scope.matches("button.rf-button,a.rf-button")) syncButtonCopy(scope);
    if (scope.querySelectorAll) scope.querySelectorAll("button.rf-button,a.rf-button").forEach(syncButtonCopy);
  }
  initializeButtonCopy(document);
  new MutationObserver(function (mutations) {
    var actions = new Set();
    mutations.forEach(function (mutation) {
      var element = mutation.target.nodeType === Node.ELEMENT_NODE ? /** @type {Element} */ (mutation.target) : mutation.target.parentElement;
      var action = element && element.closest("button.rf-button,a.rf-button");
      if (action) actions.add(action);
      if (element && mutation.type === "attributes" && ["hidden", "style", "class"].indexOf(mutation.attributeName) !== -1) {
        element.querySelectorAll("button.rf-button,a.rf-button").forEach(function (descendant) { actions.add(descendant); });
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeButtonCopy(node);
      });
    });
    actions.forEach(syncButtonCopy);
  }).observe(document.documentElement, {
    attributeFilter: ["hidden", "style", "class", "id", "aria-label", "aria-labelledby", "aria-describedby", "aria-hidden"],
    attributes: true, childList: true, characterData: true, subtree: true,
  });

  /*
   * SegmentedControl is single-select by contract. Product code may choose the
   * preferred option, but Core guarantees a valid selection at every render.
   */
  function segmentedOptions(root) {
    var nativeOptions = Array.from(root.querySelectorAll(".rf-segmented-control__input[type=radio]"));
    if (nativeOptions.length) return nativeOptions;
    return Array.from(root.querySelectorAll("[data-rf-segmented-value]"));
  }

  function segmentedOptionAvailable(option) {
    return !option.disabled && option.getAttribute("aria-disabled") !== "true";
  }

  function segmentedOptionSelected(option) {
    return option.matches("input[type=radio]")
      ? option.checked
      : option.getAttribute("aria-pressed") === "true";
  }

  function setSegmentedSelection(root, selected) {
    segmentedOptions(root).forEach(function (option) {
      var active = option === selected;
      if (option.matches("input[type=radio]")) {
        if (option.checked !== active) option.checked = active;
      } else if (option.getAttribute("aria-pressed") !== (active ? "true" : "false")) {
        option.setAttribute("aria-pressed", active ? "true" : "false");
      }
    });
  }

  function syncSegmentedControl(root) {
    var options = segmentedOptions(root);
    var available = options.filter(segmentedOptionAvailable);
    if (!available.length) return;
    var selected = available.filter(segmentedOptionSelected);
    setSegmentedSelection(root, selected[0] || available[0]);
  }

  function initializeSegmentedControls(scope) {
    if (scope.matches && scope.matches("[data-rf-segmented-control],.rf-segmented-control")) {
      syncSegmentedControl(scope);
    }
    if (scope.querySelectorAll) {
      scope.querySelectorAll("[data-rf-segmented-control],.rf-segmented-control").forEach(syncSegmentedControl);
    }
  }

  initializeSegmentedControls(document);
  document.addEventListener("reset", function (event) {
    // Native reset applies checked/defaultChecked after event dispatch.
    queueMicrotask(function () {
      if (!event.defaultPrevented) initializeSegmentedControls(event.target);
    });
  });
  document.addEventListener("click", function (event) {
    var option = /** @type {Element} */ (event.target).closest("[data-rf-segmented-value]");
    if (!option || !segmentedOptionAvailable(option)) return;
    var root = option.closest("[data-rf-segmented-control]");
    if (root) setSegmentedSelection(root, option);
  });
  document.addEventListener("change", function (event) {
    if (!/** @type {Element} */ (event.target).matches(".rf-segmented-control__input[type=radio]")) return;
    var root = /** @type {Element} */ (event.target).closest(".rf-segmented-control");
    if (root) syncSegmentedControl(root);
  });
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        var root = /** @type {Element} */ (mutation.target).closest("[data-rf-segmented-control],.rf-segmented-control");
        if (root) syncSegmentedControl(root);
        return;
      }
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeSegmentedControls(node);
      });
    });
  }).observe(document.documentElement, {
    attributeFilter: ["aria-disabled", "aria-pressed", "checked", "disabled"],
    attributes: true,
    childList: true,
    subtree: true,
  });

  function syncSlider(input) {
    var min = Number(input.min || 0);
    var max = Number(input.max || 100);
    var value = Number(input.value);
    var progress = max > min ? ((value - min) / (max - min)) * 100 : 0;
    input.style.setProperty("--rf-slider-progress", Math.min(100, Math.max(0, progress)) + "%");
    var root = input.closest("[data-rf-slider],.rf-slider-field");
    var output = root && root.querySelector("[data-rf-slider-output]");
    if (output) output.value = input.value;
  }

  function initializeSliders(scope) {
    if (scope.matches && scope.matches("input.rf-slider[type=range]")) syncSlider(scope);
    if (scope.querySelectorAll) scope.querySelectorAll("input.rf-slider[type=range]").forEach(syncSlider);
  }

  initializeSliders(document);
  document.addEventListener("input", function (event) {
    if (/** @type {Element} */ (event.target).matches("input.rf-slider[type=range]")) syncSlider(event.target);
  });
  document.addEventListener("change", function (event) {
    if (/** @type {Element} */ (event.target).matches("input.rf-slider[type=range]")) syncSlider(event.target);
  });
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeSliders(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  var tabsInitialized = new WeakSet();

  function setTab(tabList, nextTab, moveFocus) {
    var tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    var root = tabList.closest("[data-rf-tabs]");
    tabs.forEach(function (tab) {
      var selected = tab === nextTab;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      var panelId = tab.getAttribute("aria-controls");
      var panel = panelId ? document.getElementById(panelId) : null;
      if (panel && root.contains(panel)) panel.hidden = !selected;
    });
    if (moveFocus) nextTab.focus();
  }

  function initializeTabs(scope) {
    var roots = [];
    if (scope.matches && scope.matches("[data-rf-tabs]")) roots.push(scope);
    if (scope.querySelectorAll) roots = roots.concat(Array.from(scope.querySelectorAll("[data-rf-tabs]")));
    roots.forEach(function (root) {
      if (tabsInitialized.has(root)) return;
      var tabList = root.querySelector('[role="tablist"]');
      if (!tabList) return;
      tabsInitialized.add(root);
      tabList.addEventListener("click", function (event) {
        var tab = /** @type {Element} */ (event.target).closest('[role="tab"]');
        if (tab && tabList.contains(tab)) setTab(tabList, tab, false);
      });
      tabList.addEventListener("keydown", function (event) {
        var tabs = Array.from(tabList.querySelectorAll('[role="tab"]:not(:disabled)'));
        var current = tabs.indexOf(event.target);
        if (current < 0) return;
        var orientation = tabList.getAttribute("aria-orientation") || "horizontal";
        var next = current;
        if (orientation === "horizontal" && event.key === "ArrowRight") next = (current + 1) % tabs.length;
        if (orientation === "horizontal" && event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
        if (orientation === "vertical" && event.key === "ArrowDown") next = (current + 1) % tabs.length;
        if (orientation === "vertical" && event.key === "ArrowUp") next = (current - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== current) {
          event.preventDefault();
          setTab(tabList, tabs[next], true);
        }
      });
    });
  }

  initializeTabs(document);
  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE) initializeTabs(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });

  var blockDisabledAction = function (event) {
    var disabledAction = /** @type {Element} */ (event.target).closest('[aria-disabled="true"],[data-loading="true"],[data-skeleton="true"]');
    if (!disabledAction) return;
    if (event.type === "keydown" && event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  ["click", "auxclick", "keydown"].forEach(function (eventName) {
    document.addEventListener(eventName, blockDisabledAction, true);
  });

  var dialogOpeners = new WeakMap();
  document.addEventListener("click", function (event) {

    var dialogTrigger = /** @type {Element} */ (event.target).closest("[data-rf-dialog-open]");
    if (dialogTrigger) {
      var dialog = /** @type {HTMLDialogElement | null} */ (document.getElementById(dialogTrigger.getAttribute("data-rf-dialog-open")));
      if (dialog && typeof dialog.showModal === "function") {
        dialogOpeners.set(dialog, dialogTrigger);
        dialog.showModal();
      }
      return;
    }

    var dialogClose = /** @type {Element} */ (event.target).closest("[data-rf-dialog-close]");
    if (dialogClose) {
      var currentDialog = dialogClose.closest("dialog");
      if (currentDialog) currentDialog.close();
      return;
    }

    var toastTrigger = /** @type {Element} */ (event.target).closest("[data-rf-toast-open]");
    if (toastTrigger) {
      var toast = document.getElementById(toastTrigger.getAttribute("data-rf-toast-open"));
      if (toast) showToast(toast, {duration: Number(toast.getAttribute('data-rf-toast-duration') || 5000), persistent: toast.getAttribute('data-rf-toast-persistent') === 'true'});
      return;
    }

    var toastClose = /** @type {Element} */ (event.target).closest("[data-rf-toast-close]");
    if (toastClose) {
      var currentToast = /** @type {HTMLElement | null} */ (toastClose.closest(".rf-toast"));
      if (currentToast) dismissToast(currentToast, 'manual');
      return;
    }

    var toggle = /** @type {Element} */ (event.target).closest("[data-rf-toggle]");
    if (toggle) {
      toggle.setAttribute("aria-pressed", toggle.getAttribute("aria-pressed") === "true" ? "false" : "true");
    }
  });

  document.querySelectorAll("dialog.rf-dialog").forEach(function (dialog) {
    dialog.addEventListener("close", function () {
      var opener = dialogOpeners.get(dialog);
      if (opener && opener.isConnected) opener.focus();
    });
  });

  var menuInitialized = new WeakSet();
  var menuSequence = 0;
  var activeMenuClose = null;
  var activeMenuAnchor = null;
  var activeMenuRect = null;
  document.addEventListener("pointerdown", function (event) {
    if (activeMenuClose && activeMenuAnchor && !activeMenuAnchor.contains(event.target)) activeMenuClose(false);
  });
  document.addEventListener("scroll", function (event) {
    if (activeMenuClose && activeMenuAnchor && !activeMenuAnchor.contains(event.target) && (activeMenuAnchor.classList.contains("rf-dropdown--viewport") || activeMenuAnchor.querySelector('.rf-dropdown__action-submenu:not([hidden])'))) {
      var rect=activeMenuAnchor.getBoundingClientRect();
      if (!activeMenuRect || Math.abs(rect.top-activeMenuRect.top)>1 || Math.abs(rect.left-activeMenuRect.left)>1) activeMenuClose(false);
    }
  }, true);
  window.addEventListener("resize", function () { if (activeMenuClose) activeMenuClose(false); });

  function positionMenu(anchor, trigger, menu) {
    var widthMode = anchor.getAttribute("data-rf-menu-width");
    if (widthMode === "trigger" || widthMode === "container") {
      var widthTarget = widthMode === "trigger" ? trigger : anchor;
      var maxWidth = window.innerWidth - (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rf-spacing-32")) || 32);
      menu.style.width = Math.min(widthTarget.getBoundingClientRect().width,maxWidth) + "px";
      menu.style.minWidth = "0";
    }
    var fixed = getComputedStyle(menu).position === "fixed";
    if (fixed && window.matchMedia("(pointer: coarse)").matches) {
      menu.style.removeProperty("top");
      menu.style.removeProperty("left");
      return;
    }
    var inset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rf-spacing-8")) || 8;
    var triggerRect = trigger.getBoundingClientRect();
    var menuRect = menu.getBoundingClientRect();
    var alignment = anchor.getAttribute("data-rf-menu-align") || (fixed ? "end" : "start");
    var rtl = getComputedStyle(anchor).direction === "rtl";
    var alignedLeft = alignment === "center" ? triggerRect.left + (triggerRect.width-menuRect.width)/2 : (alignment === "start") !== rtl ? triggerRect.left : triggerRect.right-menuRect.width;
    var left = Math.min(Math.max(inset, alignedLeft), window.innerWidth - menuRect.width - inset);
    var top = triggerRect.bottom + inset;
    if (top + menuRect.height > window.innerHeight - inset && triggerRect.top - menuRect.height - inset >= inset) top = triggerRect.top - menuRect.height - inset;
    else top = Math.min(top, window.innerHeight - menuRect.height - inset);
    var anchorRect = anchor.getBoundingClientRect();
    menu.style.inset = "auto";menu.style.translate = "none";
    menu.style.left = (Math.max(inset, left) - (fixed ? 0 : anchorRect.left)) + "px";
    menu.style.top = (Math.max(inset, top) - (fixed ? 0 : anchorRect.top)) + "px";
  }

  function initializeMenus(scope) {
    var anchors = [];
    var selector = '[data-rf-dropdown][data-rf-dropdown-mode="actions"],[data-rf-menu]';
    if (scope.matches && scope.matches(selector)) anchors.push(scope);
    if (scope.querySelectorAll) anchors = anchors.concat(Array.from(scope.querySelectorAll(selector)));
    anchors.forEach(function (anchor) {
    if (menuInitialized.has(anchor)) return;
    var trigger = anchor.querySelector("[data-rf-dropdown-trigger],[data-rf-menu-trigger]");
    var menu = anchor.querySelector('[role="menu"]');
    if (!trigger || !menu) return;
    menuInitialized.add(anchor);
    menuSequence += 1;
    if (!menu.id) menu.id = "rf-dropdown-menu-" + menuSequence;
    trigger.setAttribute("aria-haspopup", "menu");
    trigger.setAttribute("aria-controls", menu.id);
    var currentMenu = menu;
    var menuResize = null;
    var menuPath = [];
    var typeahead = "", typeaheadAt = 0;
    var items = function () {
      return Array.from(currentMenu.querySelectorAll('[role="menuitem"]:not(:disabled)')).filter(function (item) { return item.getAttribute("aria-disabled") !== "true" && item.closest('[role="menu"]') === currentMenu && !item.hidden; });
    };
    var setItemFocus = function (nextItem, moveFocus) {
      items().forEach(function (item) {
        item.tabIndex = item === nextItem ? 0 : -1;
      });
      if (moveFocus) { if (nextItem) {nextItem.focus({preventScroll:true});var itemBounds=nextItem.getBoundingClientRect(),menuBounds=currentMenu.getBoundingClientRect();if(itemBounds.top<menuBounds.top)currentMenu.scrollTop-=menuBounds.top-itemBounds.top;else if(itemBounds.bottom>menuBounds.bottom)currentMenu.scrollTop+=itemBounds.bottom-menuBounds.bottom;} else {currentMenu.tabIndex=-1;currentMenu.focus({preventScroll:true});} }
    };
    var back = function (moveFocus) {
      var parent = menuPath.pop();
      if (!parent) return false;
      currentMenu.hidden = true;
      parent.item.setAttribute("aria-expanded", "false");
      currentMenu = parent.menu;
      setItemFocus(parent.item, moveFocus !== false);
      return true;
    };
    var openSubmenu = function (item) {
      var id = item && item.getAttribute("data-rf-menu-submenu-target");
      var submenu = id && document.getElementById(id);
      if (!submenu || !anchor.contains(submenu) || item.getAttribute("aria-disabled") === "true") return false;
      item.setAttribute("aria-haspopup", "menu");
      item.setAttribute("aria-expanded", "true");
      item.setAttribute("aria-controls", id);
      menuPath.push({menu: currentMenu, item: item});
      item.tabIndex = -1;
      submenu.hidden = false;
      currentMenu = submenu;
      if (getComputedStyle(submenu).position === "fixed") {
        var rect = item.getBoundingClientRect(), bounds = submenu.getBoundingClientRect();
        var gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--rf-spacing-8")) || 8;
        var rtl = getComputedStyle(anchor).direction === "rtl";
        var touch = window.matchMedia("(pointer: coarse)").matches;
        var parentRect = menuPath[menuPath.length-1].menu.getBoundingClientRect();
        var left = touch ? parentRect.left : rtl ? rect.left - bounds.width - gap : rect.right + gap;
        if (left < gap || left + bounds.width > innerWidth - gap) left = rtl ? rect.right + gap : rect.left - bounds.width - gap;
        submenu.style.left = Math.max(gap, Math.min(left, innerWidth - bounds.width - gap)) + "px";
        submenu.style.top = Math.max(gap, Math.min(touch ? parentRect.top : rect.top, innerHeight - bounds.height - gap)) + "px";
      }
      setItemFocus(items()[0], true);
      return true;
    };
    anchor.querySelectorAll('[data-rf-menu-submenu-target]').forEach(function (item) {
      item.setAttribute("aria-haspopup", "menu");item.setAttribute("aria-expanded", "false");
      item.setAttribute("aria-controls", item.getAttribute("data-rf-menu-submenu-target"));
    });
    var close = function (restoreFocus) {
      if (menuResize) {menuResize.disconnect();menuResize=null;}
      while (back(false)) { /* Restore the root menu before closing. */ }
      typeahead = "";
      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      items().forEach(function (item) {
        item.tabIndex = -1;
      });
      if (activeMenuClose === close) { activeMenuClose = null; activeMenuAnchor = null; }
      if (restoreFocus) trigger.focus();
    };
    close(false);
    var openMenu = function (last) {
      if (trigger.disabled || trigger.getAttribute("aria-disabled") === "true") return;
      var open = menu.hidden;
      if (!open) {
        close(true);
        return;
      }
      if (activeMenuClose && activeMenuClose !== close) activeMenuClose(false);
      menu.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      activeMenuClose = close;
      activeMenuAnchor = anchor;
      activeMenuRect = anchor.getBoundingClientRect();
      positionMenu(anchor, trigger, menu);
      setItemFocus(last ? items()[items().length - 1] : items()[0], true);
      menuResize = new ResizeObserver(function () { if (!menu.hidden) positionMenu(anchor,trigger,menu); });
      menuResize.observe(menu);menuResize.observe(trigger);menuResize.observe(anchor);
    };
    trigger.addEventListener("click", function () { openMenu(false); });
    trigger.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (menu.hidden) openMenu(event.key === "ArrowUp");
        else setItemFocus(event.key === "ArrowUp" ? items()[items().length - 1] : items()[0], true);
      }
    });
    anchor.addEventListener("keydown", function (event) {
      var menuItems = items();
      var current = menuItems.indexOf(event.target);
      if (event.key === "Escape") {
        event.preventDefault();
        if (!back()) close(true);
        return;
      }
      if (event.key === "Tab") {
        close(false);
        return;
      }
      var rtl = getComputedStyle(anchor).direction === "rtl";
      if (event.key === (rtl ? "ArrowRight" : "ArrowLeft") && menuPath.length) { event.preventDefault(); back(); return; }
      if (current < 0) return;
      if (event.key === (rtl ? "ArrowLeft" : "ArrowRight")) { if (openSubmenu(event.target)) event.preventDefault(); return; }
      if (event.key.length === 1 && event.key !== " " && !event.ctrlKey && !event.metaKey && !event.altKey) {
        var now = Date.now();typeahead = now - typeaheadAt > 700 ? event.key : typeahead + event.key;typeaheadAt = now;
        var query = typeahead.toLocaleLowerCase();
        if (Array.from(query).every(function (letter) { return letter === query[0]; })) query = query[0];
        var ordered = menuItems.slice(current + 1).concat(menuItems.slice(0, current + 1));
        var match = ordered.find(function (item) { var label = item.querySelector('.rf-dropdown__item-label');return (label || item).textContent.trim().toLocaleLowerCase().startsWith(query); });
        if (match) {event.preventDefault();setItemFocus(match,true);}return;
      }
      var next = current;
      if (event.key === "ArrowDown") next = (current + 1) % menuItems.length;
      if (event.key === "ArrowUp") next = (current - 1 + menuItems.length) % menuItems.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = menuItems.length - 1;
      if (next !== current) {
        event.preventDefault();
        setItemFocus(menuItems[next], true);
      }
    });
    anchor.addEventListener("click", function (event) {
      if (/** @type {Element} */(event.target).closest("[data-rf-menu-back]")) {back();return;}
      var item = /** @type {HTMLElement & {disabled?: boolean}} */ (/** @type {Element} */ (event.target).closest('[role="menuitem"]'));
      if (item && item.getAttribute("aria-disabled") !== "true" && !item.disabled) { if (!openSubmenu(item)) close(true); }
    });
    anchor.addEventListener("focusout", function (event) {
      if (!event.relatedTarget || !anchor.contains(event.relatedTarget)) close(false);
    });
    });
  }
  function initializeDropdowns(scope) {
    initializeSelects(scope);
    initializeMenus(scope);
  }
  initializeDropdowns(document);
  new MutationObserver(function (mutations) {
    if (activeMenuAnchor && !activeMenuAnchor.isConnected && activeMenuClose) activeMenuClose(false);
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        initializeDropdowns(node);
        var root = /** @type {Element} */ (node).closest && /** @type {Element} */ (node).closest('[data-rf-dropdown][data-rf-dropdown-mode="selection"],[data-rf-select]');
        if (root && selectInitialized.has(root) && (/** @type {Element} */ (node).matches('[role="option"]') || /** @type {Element} */ (node).querySelector('[role="option"]'))) {
          syncSelectFromInput(root);
          var parts = selectParts(root);
          if (parts.editable && root.getAttribute("data-rf-dropdown-filter") === "external" && document.activeElement === parts.trigger) openSelect(root, "down");
        }
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('click', function(event) {
    var target = event.target instanceof Element ? event.target.closest('[data-rf-alert-close]') : null;
    if (!target) return;
    var alert = /** @type {HTMLElement} */ (target.closest('.rf-alert'));
    if (!alert || alert.getAttribute('data-state') === 'skeleton') return;
    var dismissal = new CustomEvent('rf:alert-dismiss', {bubbles:true,cancelable:true});
    if (!alert.dispatchEvent(dismissal)) return;
    alert.hidden = true;
  });

  // Responsive layout uses the same Foundation breakpoint as the catalog shell.
  function syncResponsiveLayouts() {
    var compact = document.documentElement.clientWidth <= parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--rf-breakpoint-sm'));
    document.querySelectorAll('[data-rf-layout-mobile]').forEach(function(element) {
      element.setAttribute('data-rf-layout-compact', String(compact));
    });
  }
  new ResizeObserver(syncResponsiveLayouts).observe(document.documentElement);
  new MutationObserver(syncResponsiveLayouts).observe(document.documentElement, {childList:true,subtree:true});
  syncResponsiveLayouts();

  // Clamp spans to the actual explicit columns: never create implicit mobile columns.
  var spanGrids = new Set();
  function syncGridSpans(grid) {
    var styles = getComputedStyle(grid);
    var token = function(name){return parseFloat(styles.getPropertyValue('--rf-spacing-'+name)) || 0;};
    var minimum = grid.classList.contains('rf-layout-grid--compact') ? token('160') : token('248') + token(grid.classList.contains('rf-layout-grid--wide') ? '128' : '32');
    var gap = parseFloat(styles.columnGap) || 0;
    var columns = Math.max(1,Math.floor((grid.clientWidth+gap)/(minimum+gap)));
    Array.from(grid.children).forEach(function(child) {
      if (!(child instanceof HTMLElement)) return;
      var requested = parseInt(child.getAttribute('data-rf-grid-span'),10);
      if (Number.isFinite(requested)) child.setAttribute('data-rf-grid-span-effective',String(Math.max(1,Math.min(requested,columns,3))));
      else child.removeAttribute('data-rf-grid-span-effective');
    });
  }
  var gridSpanObserver = new ResizeObserver(function(records){records.forEach(function(record){syncGridSpans(record.target);});});
  function discoverSpanGrids() {
    spanGrids.forEach(function(grid){if(!grid.isConnected){gridSpanObserver.unobserve(grid);spanGrids.delete(grid);}});
    document.querySelectorAll('.rf-layout-grid').forEach(function(grid){
      if(!spanGrids.has(grid)){spanGrids.add(grid);gridSpanObserver.observe(grid);}
      syncGridSpans(grid);
    });
  }
  new MutationObserver(discoverSpanGrids).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['data-rf-grid-span','class']});
  discoverSpanGrids();
})();

/* Calendar: civil ISO dates, independent from time zones and product filters. */
(function () {
  var roots = new WeakSet();
  var copy = {
    ru:['Предыдущий месяц','Следующий месяц','Календарь','Выберите дату','Выберите конец периода'],
    en:['Previous month','Next month','Calendar','Choose a date','Choose the end date'],
    ky:['Мурунку ай','Кийинки ай','Календарь','Күндү тандаңыз','Аяктоо күнүн тандаңыз'],
    uz:['Oldingi oy','Keyingi oy','Taqvim','Sanani tanlang','Tugash sanasini tanlang']
  };
  function iso(d) { return d.toISOString().slice(0,10); }
  function date(s) { var d=new Date(s+'T12:00:00Z');return /^\d{4}-\d{2}-\d{2}$/.test(s||'')&&!isNaN(+d)&&iso(d)===s?d:null; }
  function add(d,n) { var r=new Date(+d);r.setUTCDate(r.getUTCDate()+n);return r; }
  function month(d,n) { return new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+n,1,12)); }
  function el(tag,cls,text) {var e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
  function mount(root) {
    if(roots.has(root))return;roots.add(root);
    var today=new Date(), todayISO=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
    var initial=date(root.dataset.value)||date(root.dataset.start)||date(todayISO);
    var view=month(date(root.dataset.month+'-01')||initial,0),focus=iso(initial);
    function blocked(s) {var d=date(s);return !d||root.dataset.state==='disabled'||(date(root.dataset.min)&&s<root.dataset.min)||(date(root.dataset.max)&&s>root.dataset.max)||(root.dataset.weekdays==='true'&&[0,6].includes(d.getUTCDay()))||(root.dataset.unavailable||'').split(',').includes(s);}
    function render(restore) {
      var lang=root.dataset.locale||'ru',labels=copy[lang]||copy.en,locale=lang==='ky'?'ky-KG':lang;
      var fmt=new Intl.DateTimeFormat(locale,{month:'long',year:'numeric',timeZone:'UTC'}),full=new Intl.DateTimeFormat(locale,{dateStyle:'full',timeZone:'UTC'});
      var count=root.dataset.months==='2'?2:1,range=root.dataset.mode==='range',start=root.dataset.start,end=root.dataset.end,value=root.dataset.value;
      if(value&&blocked(value)&&root.dataset.state!=='disabled'){value='';root.dataset.value='';}
      if(start){var invalid=blocked(start)||!!(end&&blocked(end));if(end&&!invalid){for(var check=date(start);check&&iso(check)<=end;check=add(check,1)){if(blocked(iso(check))){invalid=true;break;}}}if(invalid&&root.dataset.state!=='disabled'){start='';end='';root.dataset.start='';root.dataset.end='';}}
      var min=date(root.dataset.min),max=date(root.dataset.max);
      if(min&&view<month(min,0))view=month(min,0);if(max&&view>month(max,0))view=month(max,0);
      root.replaceChildren();root.classList.add('rf-calendar');root.setAttribute('role','group');root.setAttribute('aria-label',labels[2]);root.setAttribute('aria-busy',String(root.dataset.state==='skeleton'));
      var header=el('div','rf-calendar__header'),title=el('span','rf-text rf-text--label-large',fmt.format(view)+(count===2?' – '+fmt.format(month(view,1)):''));title.setAttribute('aria-live','polite');
      [-1,1].forEach(function(n){var b=el('button','rf-icon-button rf-icon-button--secondary rf-icon-button--s');b.type='button';b.dataset.move=String(n);b.setAttribute('aria-label',labels[n===-1?0:1]);b.disabled=root.dataset.state==='disabled'||root.dataset.state==='skeleton'||(n===-1&&min&&view<=month(min,0))||(n===1&&max&&month(view,count)>month(max,0));var icon=el('span','rf-icon rf-icon--sm');icon.dataset.rfIconGlyph=n===-1?'chevron-left':'chevron-right';icon.setAttribute('aria-hidden','true');b.append(icon);header.append(b);if(n===-1)header.append(title);});root.append(header);
      var months=el('div','rf-calendar__months');var buttons=[];
      for(var m=0;m<count;m++){
        var first=month(view,m),table=el('table','rf-calendar__month');table.setAttribute('role','grid');table.setAttribute('aria-label',fmt.format(first));
        if(count===2)table.append(el('caption','rf-text rf-text--label-small',fmt.format(first)));
        var head=el('thead'),tr=el('tr');for(var w=0;w<7;w++){var day=add(new Date(Date.UTC(2026,5,1,12)),w),th=el('th','rf-text rf-text--caption',new Intl.DateTimeFormat(locale,{weekday:'short',timeZone:'UTC'}).format(day));th.scope='col';tr.append(th);}head.append(tr);table.append(head);
        var body=el('tbody'),offset=(first.getUTCDay()+6)%7;
        for(var row=0;row<6;row++){var line=el('tr');for(var col=0;col<7;col++){var d=add(first,row*7+col-offset),cell=el('td');if(d.getUTCMonth()===first.getUTCMonth()){
          var s=iso(d),selected=range?!!(start&&(s===start||(end&&s>=start&&s<=end))):s===value;
          cell.setAttribute('aria-selected',String(selected));if(range&&selected){cell.classList.add('rf-calendar__range');if(s===start||col===0||d.getUTCDate()===1)cell.dataset.rangeStart='true';if(s===end||!end||col===6||add(d,1).getUTCMonth()!==d.getUTCMonth())cell.dataset.rangeEnd='true';}
          var b=el('button','rf-calendar__day',String(d.getUTCDate()));b.type='button';b.dataset.date=s;b.tabIndex=-1;b.setAttribute('aria-label',full.format(d));b.disabled=!!blocked(s)||root.dataset.state==='skeleton';if(s===todayISO)b.setAttribute('aria-current','date');if(selected)b.dataset.selected='true';if(range&&(s===start||s===end))b.dataset.endpoint='true';cell.append(b);buttons.push(b);
        }line.append(cell);}body.append(line);}table.append(body);months.append(table);
      }root.append(months);
      var target=buttons.find(b=>b.dataset.date===focus&&!b.disabled)||buttons.find(b=>!b.disabled);if(target){target.tabIndex=0;focus=target.dataset.date;if(restore)target.focus();}
      var status=el('span','rf-sr-only',range&&start&&!end?labels[4]:labels[3]);status.setAttribute('role','status');root.append(status);
    }
    root.addEventListener('click',function(event){var b=event.target.closest('button');if(!b||b.disabled||root.dataset.state==='skeleton')return;
      if(b.dataset.move){view=month(view,Number(b.dataset.move));focus=iso(view);render(false);root.querySelector('[data-move="'+b.dataset.move+'"]').focus();return;}
      var s=b.dataset.date;if(!s||blocked(s))return;focus=s;
      if(root.dataset.mode==='range'){
        if(!root.dataset.start||root.dataset.end){root.dataset.start=s;root.dataset.end='';}
        else {var a=root.dataset.start,z=s;if(a>z){var t=a;a=z;z=t;}var invalid=false;for(var d=date(a);iso(d)<=z;d=add(d,1)){if(blocked(iso(d))){invalid=true;break;}}if(invalid){root.dataset.start=s;root.dataset.end='';}else{root.dataset.start=a;root.dataset.end=z;}}
      }else root.dataset.value=s;
      render(true);root.dispatchEvent(new CustomEvent('rf:calendar-change',{bubbles:true,detail:{value:root.dataset.mode==='range'?null:root.dataset.value||null,start:root.dataset.mode==='range'?root.dataset.start||null:null,end:root.dataset.mode==='range'?root.dataset.end||null:null}}));
    });
    root.addEventListener('keydown',function(event){var b=event.target.closest('[data-date]');if(!b)return;var d=date(b.dataset.date),next=null,k=event.key;
      if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(k))next=add(d,({ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7})[k]);
      if(k==='Home')next=add(d,-((d.getUTCDay()+6)%7));if(k==='End')next=add(d,6-((d.getUTCDay()+6)%7));
      if(k==='PageUp'||k==='PageDown'){var base=month(d,(k==='PageUp'?-1:1)*(event.shiftKey?12:1));next=add(base,Math.min(d.getUTCDate(),add(month(base,1),-1).getUTCDate())-1);}
      if(!next)return;event.preventDefault();var direction=next<d?-1:1;for(var i=0;i<3660&&blocked(iso(next));i++)next=add(next,direction);if(blocked(iso(next)))return;
      focus=iso(next);if(next<view||next>=month(view,root.dataset.months==='2'?2:1))view=month(next,0);render(true);
    });
    new MutationObserver(function(){render(false);}).observe(root,{attributes:true,attributeFilter:['data-mode','data-months','data-locale','data-min','data-max','data-weekdays','data-unavailable','data-state']});
    render(false);
  }
  function scan(scope){if(scope.matches&&scope.matches('[data-rf-calendar]'))mount(scope);scope.querySelectorAll('[data-rf-calendar]').forEach(mount);}
  scan(document);new MutationObserver(function(records){records.forEach(function(r){r.addedNodes.forEach(function(n){if(n.nodeType===1)scan(n);});});}).observe(document.documentElement,{childList:true,subtree:true});
})();
