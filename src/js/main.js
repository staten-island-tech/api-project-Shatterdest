import { dom } from "../js/dom.js";
import { imgs } from "../js/imgs.js";
import { getPosition } from "./currentLocation.js";
import { getData, search } from "./getData.js";

const key = "UAOf0aGozU6aI1pJ2XZurfUqqee85egV";

dom.searchInput.value = null;
dom.postalInput.value = null;

async function displayData(location) {
  console.log(location);
  const locationID = location.Key;
  console.log(`location key: ${locationID}`);
  const lData = await getData(search(key, locationID, "weather"));
  const card = document.createElement("details");
  const forecastContainer = document.createElement("div");
  const forecasts = lData.DailyForecasts;
  console.log("ID: " + locationID);
  console.log(lData);
  card.classList.add("location");
  forecastContainer.classList.add("forecast-container");
  forecastContainer.id = `${locationID}`;
  card.innerHTML = `<summary><h3 class='region-name'>${location.EnglishName}</h3>
    <h4 class='region'>${location.Region.EnglishName}</h4>
    <h4 class='country'>${location.Country.EnglishName}</h4>
    <p class='type'>${location.Type}</p>
    <h2 class='headline'>${lData.Headline.Text}</h2>    <p class='see-more'>Press to see more!</p></summary>

    `;
  dom.lContainer.appendChild(card);
  card.appendChild(forecastContainer);
  for (let i = 0; i < forecasts.length; i++) {
    console.log(forecasts);
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast");
    forecastCard.innerHTML = `<h4 class='time'>${forecasts[i].Date.slice(
      0,
      -15
    )}</h4>
      <h3 class='min-temp temp'>Minimum: ${
        forecasts[i].Temperature.Minimum.Value
      } °F</h3>
      <h3 class='max-temp temp'>Maximum: ${
        forecasts[i].Temperature.Maximum.Value
      } °F</h3>
      <h2 class='day-text forecast-text'>Day: ${
        forecasts[i].Day.IconPhrase
      }</h2><img src="${imgs[forecasts[i].Day.Icon - 1]}" alt="">
      <h2 class='night-text forecast-text'>Night: ${
        forecasts[i].Night.IconPhrase
      }</h2><img src="${imgs[forecasts[i].Night.Icon - 1]}" alt="">
      `;
    console.log(forecastCard);
    forecastContainer.appendChild(forecastCard);
  }
}

function checkBlank(input) {
  if (input.length === 0) {
    return false;
  } else {
    return true;
  }
}

dom.search.addEventListener("submit", async (e) => {
  e.preventDefault();
  dom.lContainer.innerHTML = "";
  dom.error.innerHTML = "";
  const submitted = dom.searchInput.value;
  if (checkBlank(submitted)) {
    console.log(`value submitted: ${submitted}`);
    const locations = await getData(search(key, submitted, "search"));
    if (checkBlank(locations)) {
      console.log(locations);

      for (let i = 0; i <= locations.length; i++) {
        const location = await locations[i];
        displayData(location);
      }
    } else {
      dom.error.innerHTML = `Please submit a valid location!`;
    }
  } else {
    dom.error.innerHTML = `Please submit a valid location!`;
  }
});

dom.postal.addEventListener("submit", async (e) => {
  e.preventDefault();
  dom.lContainer.innerHTML = "";
  const submitted = dom.postalInput.value;
  if (checkBlank(submitted)) {
    const locations = await getData(search(key, submitted, "postal"));
    console.log(locations);
    for (let i = 0; i <= locations.length; i++) {
      const location = await locations[i];
      displayData(location);
    }
  } else {
    dom.error.innerHTML = `Please submit a valid location!`;
  }
});

dom.currentLoc.addEventListener("click", async (e) => {
  e.preventDefault();
  dom.lContainer.innerHTML = "";
  const position = await getPosition({
    enableHighAccuracy: true,
  });
  console.log(position);
  const data = await getData(
    search(
      key,
      { lat: position.coords.latitude, long: position.coords.longitude },
      "coords"
    )
  );
  console.log(data);
  displayData(data);
});
