import { dom } from "./dom";

export async function currentLocation() {
  dom.lContainer.innerHTML = "";
  const response = [];
  const successCallback = async (position) => {
    console.log(position);
    const data = await getData(
      search(
        key,
        { lat: position.coords.latitude, long: position.coords.longitude },
        "coords"
      )
    );
    displayData(data);
  };
  const errorCallback = (error) => {
    throw new Error(error);
  };
  const options = {
    enableHighAccuracy: true,
  };
  try {
    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
