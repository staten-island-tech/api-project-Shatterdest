import { domSelectors } from '../js/dom.js'

const dom = domSelectors();
const key = `D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi`;

function search(key) {
  const query = prompt("enter search");
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
    console.log(error)
  }
}

dom.search.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(`value submitted: ${dom.searchInput.value}`)
  getData(search())
})