(function () {
  var supportedLocales = ["ru", "en", "ky", "uz", "ka"];
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme() {
    document.documentElement.dataset.theme = media.matches ? "dark" : "light";
  }

  function preferredLocale() {
    var candidates = navigator.languages || [navigator.language || "ru"];
    for (var index = 0; index < candidates.length; index += 1) {
      var locale = String(candidates[index]).toLowerCase().split("-")[0];
      if (supportedLocales.indexOf(locale) !== -1) return locale;
    }
    return "ru";
  }

  function applyLocale() {
    var locale = preferredLocale();
    var template = document.querySelector('[data-unavailable-locale="' + locale + '"]');
    if (!template) return;
    document.documentElement.lang = locale;
    document.title = template.dataset.pageTitle;
    document.querySelector("[data-unavailable-title]").textContent =
      template.content.querySelector("[data-title]").textContent;
    document.querySelector("[data-unavailable-description]").textContent =
      template.content.querySelector("[data-description]").textContent;
    document.querySelector("[data-unavailable-action]").textContent =
      template.content.querySelector("[data-action]").textContent;
  }

  applyTheme();
  applyLocale();
  if (media.addEventListener) media.addEventListener("change", applyTheme);
})();
