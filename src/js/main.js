const key = `D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi`;

function search(key) {
  const query = prompt("enter search");
  const url = `http://dataservice.accuweather.com/locations/v1/search?apikey=${key}&q=${query}`;
  console.log(url);
  return url;
}

async function getData(URL) {
//   try {
    const response = await fetch(URL, /* {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } */);
    console.log(response);
    if (response.status >= 200 || response.status <= 299) {
      const data = await response.text();
      console.log(data);
      document.querySelector("p").textContent = data;
    } else {
      throw new Error(response.statusText);
    }
//   } catch (error) {
//     document.querySelector("p").textContent = error;
//   }
}

getData(key, search(key));
