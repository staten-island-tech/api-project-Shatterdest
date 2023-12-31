export async function getPosition(options){
  return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}