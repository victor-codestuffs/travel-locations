import "core-js/stable";
import "regenerator-runtime/runtime";

import '../styles/main.sass';

main();

function main() {
  const map = initMap();
  const cities = getCities();

  let selectedCity = cities[0];

  const nav = document.querySelector(".Nav");
  const links = document.querySelectorAll(".Nav-listItemLink");
  const sections = document.querySelectorAll(".Main-content");
  const main = document.querySelector(".Main");

  const selectCity = (targetCity, scrollTo = false) => {
    if (selectedCity === targetCity) return;
    map.flyTo(cities[targetCity]);
    selectedCity = targetCity;

    if (scrollTo) {
      const selector = `section[data-content="${targetCity}"]`;
      const contentEl = document.querySelector(selector);
      contentEl.scrollIntoView();
    }
  };

  nav.addEventListener("click", ev => {
    // If link is clicked
    if (ev.target && ev.target.classList.contains("Nav-listItemLink") ) {
      ev.preventDefault();

      const targetCity = ev.target.dataset.select;
      selectCity(targetCity, true);
    }
  });

  const cityNames = Object.keys(cities);
  main.addEventListener("scroll", () => {
    for (let i = 0; i < cityNames.length; i++) {
      const cityName = cityNames[i];
      const selector = `section[data-content="${cityName}"]`;
      if (isElementOnScreen(selector)) {
        selectCity(cityName);
        break;
      }
    }
  });
}

function getCities() {
  return {
    'hanamura': {
        bearing: -0,
        center: [-108.866174, 49.272291],
        zoom: 2,
        speed: 0.8,
        pitch: 0
    },
    'lijiang': {
        bearing: 0,
        center: [-105.391504, 34.371086],
        zoom: 6.00,
        pitch: 0
    },
    'junkertown': {
        center: [-122.316235, 47.605958],
        bearing: 54.40,
        zoom: 12.59,
        speed: 0.6,
        pitch: 44.50
    },
    'hollywood': {
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
  const map = new mapboxgl.Map({
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

function isElementOnScreen(selector) {
  const element = document.querySelector(selector);
  const bounds = element.getBoundingClientRect();
  return bounds.top < window.innerHeight && bounds.bottom > 0;
}

