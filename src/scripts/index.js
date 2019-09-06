import "core-js/stable";
import "regenerator-runtime/runtime";

import '../styles/main.sass';

main();

function main() {
  const map = initMap();
  const chapters = getChapters();

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

      map.flyTo(chapters[selectedContent]);

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


function getChapters() {
  return {
    'one': {
        bearing: -0,
        center: [-108.866174, 49.272291],
        zoom: 2,
        speed: 0.8,
        pitch: 0
    },
    'two': {
        bearing: 0,
        center: [-105.391504, 34.371086],
        zoom: 6.00,
        pitch: 0
    },
    'three': {
        center: [-122.316235, 47.605958],
        bearing: 54.40,
        zoom: 12.59,
        speed: 0.6,
        pitch: 44.50
    },
    'four': {
        bearing: 12.80,
        center: [-0.075681, 51.498018],
        zoom: 13.18,
        speed: 0.6,
        pitch: 0.00
    },
    // 'section4': {
    //     bearing: 60,
    //     center: [-134.408720, 58.300388],
    //     zoom: 16.57,
    //     speed: 0.6,
    //     pitch: 45
    // },
    // 'section5': {
    //     bearing: 15.20,
    //     center: [29.027289, 41.013899],
    //     zoom: 10.56,
    //     pitch: 40.50,
    //     speed: 0.6
    // },
    // 'section6': {
    //     bearing: 0,
    //     center: [-63.594167, -17.701427],
    //     zoom: 5.53,
    //     pitch: 0,
    //     speed: 0.6
    // },
    // 'section7': {
    //     bearing: -0,
    //     center: [27.230526, 0.000000],
    //     zoom: 1.18,
    //     speed: 0.8,
    //     pitch: 0
    // },
  };
}

function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhdmUtZXhwbG9yZXIiLCJhIjoiY2piemVub3VrM2ljNTMzbzB6ZmxuYnczcyJ9.WnNlpz-4Fn-GXFC11M2yaw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v10',
      bearing: -0,
      center: [-108.866174, 49.272291],
      zoom: 2,
      speed: 0.8,
      pitch: 0
  });

  return map;
}

  // On every scroll event, check which element is on screen
  // window.onscroll = function() {
  //     var chapterNames = Object.keys(chapters);
  //     for (var i = 0; i < chapterNames.length; i++) {
  //         var chapterName = chapterNames[i];
  //         if (isElementOnScreen(chapterName)) {
  //             setActiveChapter(chapterName);
  //             break;
  //         }
  //     }
  // };
  // var activeChapterName = 'baker';
  // function setActiveChapter(chapterName) {
  //     if (chapterName === activeChapterName) return;
  //     map.flyTo(chapters[chapterName]);
  //     document.getElementById(chapterName).setAttribute('class', 'active');
  //     document.getElementById(activeChapterName).setAttribute('class', '');
  //     activeChapterName = chapterName;
  // }

  // function isElementOnScreen(id) {
  //     var element = document.getElementById(id);
  //     var bounds = element.getBoundingClientRect();
  //     return bounds.top < window.innerHeight && bounds.bottom > 0;
  // }

