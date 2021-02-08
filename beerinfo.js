var searchApi = "https://api.punkapi.com/v2/beers/";

function presentBeerInfo() {
    const urlParams = new URLSearchParams(window.location.search); 
    const id = urlParams.get('id');
    searchFnc(id);
}

presentBeerInfo();


async function searchFnc(id) {
    let data = await fetch(searchApi + id).then(data => data.json());
    presentData(data[0]);
}

function presentData(data) {
    let section = document.getElementById("presentInfo");
    let ulList = document.createElement("ul");
    let description = document.createElement("li");
    let alcoholByVol = document.createElement("li");
    let volume = document.createElement("li");
    let ingredients = document.createElement("li");
    let foodPairing = document.createElement("li");
    let brewersTips = document.createElement("li");
    let image = document.createElement("img");

    description.appendChild(document.createTextNode("Description: " + data.description));
    image.setAttribute("src", data.image_url);
    image.classList.add("beerImg");
    alcoholByVol.appendChild(document.createTextNode("Alcohol by Volume: " + data.abv));
    volume.appendChild(document.createTextNode(data.volume.value + data.volume.unit));

    for (let i = 0; i < data.ingredients.hops.length; i++) {
        let hopsli = document.createElement("li");
        hopsli.appendChild(document.createTextNode("Hops: " + data.ingredients.hops[i].name));
        ingredients.appendChild(hopsli);
        
    }
    for (let i = 0; i < data.ingredients.malt.length; i++) {
        let maltLi = document.createElement("li");
        maltLi.appendChild(document.createTextNode("Malt: " + data.ingredients.malt[i].name));
        ingredients.appendChild(maltLi);
        
    }
    ingredients.appendChild(document.createTextNode("Yeast: " + data.ingredients.yeast));

    for (let i = 0; i < data.food_pairing.length; i++) {
        foodLi = document.createElement("li");
        foodLi.appendChild(document.createTextNode("Food Pairings: " + data.food_pairing[i]));
        foodPairing.appendChild(foodLi);
    }
     
    brewersTips.appendChild(document.createTextNode(data.brewers_tips));
    
    
    section.appendChild(ulList);
    ulList.appendChild(description);
    ulList.appendChild(alcoholByVol);
    ulList.appendChild(volume);
    ulList.appendChild(ingredients);
    ulList.appendChild(foodPairing);
    ulList.appendChild(brewersTips);
    ulList.appendChild(image);
    console.log(data);
}

