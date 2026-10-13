(function () {
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme() {
    document.documentElement.dataset.theme = media.matches ? "dark" : "light";
  }

  applyTheme();
  if (media.addEventListener) media.addEventListener("change", applyTheme);
})();
