import "core-js/stable";
import "regenerator-runtime/runtime";

import '../styles/main.sass';

main();

function main() {
  let selectedContent = "one";

  const nav = document.querySelector(".Nav");
  const links = document.querySelectorAll(".Nav-listItemLink");
  const sections = document.querySelectorAll(".Main-content");

  nav.addEventListener("click", ev => {
    // If link is clicked
    if (ev.target && ev.target.classList.contains("Nav-listItemLink") ) {
      ev.preventDefault();

      const targetSection = ev.target.dataset.select;
      if (targetSection === selectedContent) return;
      selectedContent = targetSection;

      links.forEach(link => {
        if (link === ev.target) {
          ev.target.classList.add("is-selected");
        } else {
          link.classList.remove("is-selected");
        }
      });

      sections.forEach(section => {
        if (section.dataset.section === selectedContent) {
          section.classList.add("is-active");
        } else {
          section.classList.remove("is-active");
        }
      });
    }
  });
}
