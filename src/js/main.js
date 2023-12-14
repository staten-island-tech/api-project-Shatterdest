import { domSelectors } from "../js/dom.js";

const dom = domSelectors();
const key = "D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi";
console.log(key);

dom.searchInput.value = null;

function search(key, query, option) {
  if (option === "search") {
    const url = `https://dataservice.accuweather.com/locations/v1/search?apikey=${key}&q=${query}`;
    console.log(url);
    return url;
  } else if (option === "weather") {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${query}?apikey=${key}`;
    console.log(url);
    return url;
  } else {
    console.log("how");
  }
}

async function getData(URL) {
  try {
    const response = await fetch(URL);
    console.log(response);
    if (response.status >= 200 || response.status <= 299) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error(response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function displayData(location) {
  console.log(location);
  const locationID = location.Key;
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
    <h2 class='headline'>${lData.Headline.Text}</h2></summary>
    `;
  dom.lContainer.appendChild(card);
  card.appendChild(forecastContainer);
  for (let i = 0; i <= forecasts.length; i++) {
    console.log(forecasts);
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast");
    forecastCard.innerHTML = `<h4>${forecasts[i].Date}</h4>
      <h3 class='min-temp'>Minimum: ${forecasts[i].Temperature.Minimum.Value} °F</h3>
      <h3 class='max-temp'>Maximum: ${forecasts[i].Temperature.Maximum.Value} °F</h3>
      <h2 class='day-text'>Day: ${forecasts[i].Day.IconPhrase}</h2><img src="${forecasts[i].Day.Icon}.png" alt="">
      <h2 class='night-text'>Night: ${forecasts[i].Night.IconPhrase}</h2><img src="${forecasts[i].Night.Icon}.png" alt="">
      `;
    console.log(forecastCard);
    forecastContainer.appendChild(forecastCard);
  }
}

dom.search.addEventListener("submit", async (e) => {
  e.preventDefault();
  dom.lContainer.innerHTML = "";
  const submitted = dom.searchInput.value;
  console.log(`value submitted: ${submitted}`);
  const locations = await getData(search(key, submitted, "search"));
  console.log(locations);

  for (let i = 0; i <= locations.length; i++) {
    const location = await locations[i];
    displayData(location);
  }
});
