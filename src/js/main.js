import { domSelectors } from "../js/dom.js";

const dom = domSelectors();
const key = `D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi`;

dom.searchInput.value = null;

function search(key, query) {
  const url = `http://dataservice.accuweather.com/locations/v1/search?apikey=${key}&q=${query}`;
  console.log(url);
  return url;
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

dom.search.addEventListener("submit", async (e) => {
  e.preventDefault();
  const submitted = dom.searchInput.value;
  console.log(`value submitted: ${submitted}`);
  const locations = await getData(search(key, submitted));
  console.log(locations);
  locations.forEach((location) => {
    dom.lContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="location">
    <p>${location.EnglishName}</p>
    <p>${location.Region.EnglishName}</p>
    <p>${location.Country.EnglishName}</p>
    <p>${location.Type}</p>
  </div>`
    );
  });
});
