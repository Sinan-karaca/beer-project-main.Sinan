var searchApi = "https://api.punkapi.com/v2/beers?beer_name=";
var beerSearchData = "";
let currentPageNr = 1;
let maxPageNr;

async function searchFnc() {
  let searchBeer = document.getElementById("searchFnc").value;
  beerSearchData = await fetch(searchApi + searchBeer).then((data) =>
    data.json()
  );
  presentData();
  showPageNr();
}
function presentData() {
  let search = document.getElementById("searchResults");
  while (search.firstChild) {
    search.removeChild(search.firstChild);
  }
  let ulList = document.createElement("ul");
  search.appendChild(ulList);
  let showData = beerSearchData.slice().splice(currentPageNr * 10 - 10, 10);
  for (let i = 0; i < showData.length; i++) {
    let list = document.createElement("li");
    list.onclick = function () {
      window.location.href = "/beerInfoPage.html?id=" + showData[i].id;
    };
    list.appendChild(
      document.createTextNode(showData[i].name)
    );
    ulList.appendChild(list);
  }
}

document.getElementById("searchBtn").addEventListener("click", async e => {
  e.preventDefault();
  searchFnc();
});

document.getElementById("right-arrow").addEventListener("click", (e) => {
  nextBtnOnClick();
});

document.getElementById("left-arrow").addEventListener("click", (e) => {
  prevBtnOnClick();
});

let pages = document.createElement("span");
pages.setAttribute("id", "page");
document.querySelector("#btn").appendChild(pages);

function showPageNr() {
  maxPageNr = Math.ceil(beerSearchData.length / 10);
  document.querySelector(
    "#page"
  ).textContent = `${currentPageNr} / ${maxPageNr}`;
}

//knapparna
function prevBtnOnClick() {
  if (currentPageNr > 1) {
    currentPageNr--;
    searchFnc();
    document.querySelector(
      "#page"
    ).textContent = `${currentPageNr} / ${maxPageNr}`;
  }
}

function nextBtnOnClick() {
  if (currentPageNr < maxPageNr) {
    currentPageNr++;
    searchFnc();
    document.querySelector(
      "#page"
    ).textContent = `${currentPageNr} / ${maxPageNr}`;
  }
}
