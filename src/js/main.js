import { domSelectors } from "../js/dom.js";

const dom = domSelectors();
const key = `D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi`;

dom.searchInput.value = null;

function search(key, query, option) {
  if (option === "search") {
    const url = `http://dataservice.accuweather.com/locations/v1/search?apikey=${key}&q=${query}`;
    console.log(url);
    return url;
  } else if (option === "weather") {
    const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${query}?apikey=${key}`;
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

async function displayData(location){
    const locationID = location.Key;
    console.log("ID: " + locationID);
    const lData = await getData(search(key, locationID, "weather"));
    console.log(lData);
    const card = document.createElement("div");
    card.classList.add("location");
    card.innerHTML = `<h3 class='region-name'>${location.EnglishName}</h3>
    <h4>${location.Region.EnglishName}</h4>
    <h4>${location.Country.EnglishName}</h4>
    <p>${location.Type}</p>
    <div class='expandable' id='${locationID}'>
    <p>${JSON.stringify(lData)}</p>
    </div>
    `;
    dom.lContainer.appendChild(card);
}

dom.search.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitted = dom.searchInput.value;
  console.log(`value submitted: ${submitted}`);
  const locations = await getData(search(key, submitted, "search"));
  console.log(locations);

  for (let i = 0; i <= locations.length; i++) {
    const location = locations[i]
    displayData(location)
  }
});
