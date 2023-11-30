const key = `D4b4dAzj6RLOGGm46BucLTLpzz2Z9Kzi`;

async function getData(key) {
    try {
        const response = await fetch(URL);
        console.log(response);
        if(response.status != 200) {
            throw new Error(response.statusText)
        }
        //take respnse from server and convert it to JSON
        const data = await response.json();
        console.log(data)
        document.querySelector('h1').textContent = data.content;
        document.querySelector('h2').textContent = data.author;
    }
    catch (error) {
        document.querySelector('h1').textContent = error;
    }
}

getData(URL)