export async function getData(URL) {
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
    dom.error.innerHTML = `Please Try Again! Error ${error}`;
    console.log(error);
  }
}

export function search(key, query, option) {
  if (option === "search") {
    const url = `https://dataservice.accuweather.com/locations/v1/search?apikey=${key}&q=${query}`;
    console.log(url);
    return url;
  } else if (option === "weather") {
    const url = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${query}?apikey=${key}`;
    console.log(url);
    return url;
  } else if (option === "coords") {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${key}&q=${query.lat}%2C${query.long}`;
    console.log(url);
    return url;
  } else if (option === "postal") {
    const url = `http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${key}&q=${query}`;
    console.log(url);
    return url;
  } else {
    console.log("how");
  }
}
