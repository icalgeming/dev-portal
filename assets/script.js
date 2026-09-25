(function () {
  const input = document.getElementById("search");
  if (!input) return;

  const sections = Array.from(document.querySelectorAll("main > section"));
  const noResults = document.getElementById("no-results");

  const cards = sections.map((section) => ({
    section,
    items: Array.from(section.querySelectorAll(".card")).map((card) => ({
      el: card,
      text: card.textContent.toLowerCase(),
    })),
  }));

  function filter() {
    const query = input.value.trim().toLowerCase();
    let anyVisible = false;

    cards.forEach(({ section, items }) => {
      let sectionHasMatch = false;
      items.forEach(({ el, text }) => {
        const matches = !query || text.includes(query);
        el.classList.toggle("is-hidden", !matches);
        if (matches) sectionHasMatch = true;
      });
      section.classList.toggle("is-empty", !sectionHasMatch);
      if (sectionHasMatch) anyVisible = true;
    });

    if (noResults) {
      noResults.classList.toggle("is-visible", !anyVisible);
    }
  }

  input.addEventListener("input", filter);
})();

(function () {
  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  const root = document.documentElement;

  toggle.addEventListener("click", function () {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "dark");
    }
    try {
      localStorage.setItem("theme", isDark ? "light" : "dark");
    } catch (e) {}
  });
})();
