import { dom } from "../js/dom.js";
import { imgs } from "../js/imgs.js";
import { getPosition } from "./currentLocation.js";
import { getData, search } from "./getData.js";

const key = "D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi";

dom.searchInput.value = null;
dom.postalInput.value = null;

async function displayData(location, method, input) {
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
  card.innerHTML = `<summary><h2 class='method'>${method} for ${input}</h2><h2 class='region-name'>${location.EnglishName}</h2>
    <h3 class='region'>${location.Region.EnglishName}</h3>
    <h3 class='country'>${location.Country.EnglishName}</h3>
    <p class='type'>${location.Type}</p>
    <h4 class='headline'>${lData.Headline.Text}</h4>
    <p class='see-more'>Press to see more!</p>
    </summary>
    `;
  dom.lContainer.appendChild(card);
  card.appendChild(forecastContainer);
  for (let i = 0; i < forecasts.length; i++) {
    console.log(forecasts);
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast");
    forecastCard.innerHTML = `<h3 class='time'>${forecasts[i].Date.slice(
      0,
      -15
    )}</h3>
      <h4 class='min-temp temp'>Minimum: ${
        forecasts[i].Temperature.Minimum.Value
      } °F</h4>
      <h4 class='max-temp temp'>Maximum: ${
        forecasts[i].Temperature.Maximum.Value
      } °F</h4>
      <h4 class='day-text forecast-text'>Day: ${
        forecasts[i].Day.IconPhrase
      }</h4><img src="${imgs[forecasts[i].Day.Icon - 1]}" alt="Icon of ${
      forecasts[i].Day.IconPhrase
    } weather.">
      <h4 class='night-text forecast-text'>Night: ${
        forecasts[i].Night.IconPhrase
      }</h4><img src="${imgs[forecasts[i].Night.Icon - 1]}" alt="Icon of ${
      forecasts[i].Night.IconPhrase
    } weather">
      `;
    console.log(forecastCard);
    forecastContainer.appendChild(forecastCard);
  }
}

async function displayCurrentLocation() {
  dom.lContainer.innerHTML = "";
  const position = await getPosition({
    enableHighAccuracy: true,
  });
  console.log(position);
  const coords = {
    lat: position.coords.latitude,
    long: position.coords.longitude,
  };
  const data = await getData(search(key, coords, "coords"));
  console.log(data);
  displayData(data, "Your Current Location", `${coords.lat}, ${coords.long}`);
}

function checkBlank(input) {
  if (input === null || input.length === 0) {
    return false;
  } else {
    return true;
  }
}

async function inputHandler(input, method) {
  dom.lContainer.innerHTML = "";
  dom.error.innerHTML = "";
  console.log(`value submitted: ${input}`);
  const locations = await getData(search(key, input, "search"));
  if (checkBlank(locations) && checkBlank(input)) {
    console.log(locations);
    dom.searchInput.value = null;
    dom.postalInput.value = null;
    for (let i = 0; i <= locations.length; i++) {
      const location = await locations[i];
      displayData(location, method, input);
    }
  } else {
    dom.error.innerHTML = `Please submit a valid location!`;
  }
}

displayCurrentLocation();

dom.search.addEventListener("submit", async (e) => {
  e.preventDefault();
  inputHandler(dom.searchInput.value, "Location Search");
});

dom.postal.addEventListener("submit", async (e) => {
  e.preventDefault();
  inputHandler(dom.postalInput.value, "Postal Search");
});

dom.currentLoc.addEventListener("click", async (e) => {
  e.preventDefault();
  displayCurrentLocation();
});
