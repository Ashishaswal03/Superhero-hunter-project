let button=document.querySelector('.search-btn');
let searchBar=document.querySelector('.search-bar');
let showContainer=document.querySelector('.show-container');
let searchCon=document.querySelector('.search-con')



let date= new Date();


let Publickey='bd8a480bb63717eac29838a47c5f2998';
let ts=1698548552704;
let hashVal="01807d81421a0613f90626adb9289d07";

const [timestamp, apikey, hashValue] = [ts, Publickey, hashVal];

if (localStorage.getItem("myhero") == null) {
  localStorage.setItem("myhero", JSON.stringify([]));
} else {

  var myHeroId = JSON.parse(localStorage.getItem("myhero"));

}

// function used to add character id in myhero key in 
function seeMore(id) {
  for (let i = 0; i < myHeroId.length; i++) {
    myHeroId.pop();
  }
  myHeroId.push(id);
  localStorage.setItem("myhero", JSON.stringify(myHeroId));
}

// make a favourites key for storing all favourites hero's id in local storage if not available
if (localStorage.getItem("favourites") == null) {
  localStorage.setItem("favourites", JSON.stringify([]));
} else {
  var arr = JSON.parse(localStorage.getItem("favourites"));
}


// function for adding id value in local storage 
function addFavourite(id) {
  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("Hero is added to your favourite heros")
  } else {
    alert("This hero is already existed in your list")
  }
}


async function showHerosList() {
    let url = `HTTPS://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${Publickey}&hash=${hashVal}&limit=100`;
  
  
    let response = await fetch(url);
    let jsonData = await response.json();
  
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML += `
      <div class="card l" style="width: 18rem;">
        <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }" class="card-img-top" alt="hero image">
        <div class="card-body ">
          <h5 class="card-title">${element.name}</h5>
         
      <a href="myhero.html"  class="btn btn-primary listButton" onclick="seeMore(${element.id})">See More</a>
      <a data-href="fav.html"  id="favourite-button" class="btn btn-primary listButton" target="_blank" onclick="addFavourite(${element.id})">Add to Favourite</a>
        
        </div>
      </div>
      `
  
    })
  }
  
  showHerosList();


// search from api

button.addEventListener("click", (getResult = async () => {
    // if (searchBar.value.trim().length < 1) {
    //   console.log("Invalid input");
    // }
    // listContainer.innerHTML = "";
    searchCon.innerHTML = "";
  
    var searchText = searchBar.value;
    console.log(searchText);
    let url = `HTTPS://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apikey}&hash=${hashValue}&name=${searchText}`;

  
  
    let response = await fetch(url);
    let jsonData = await response.json();
  
    jsonData.data["results"].forEach((element) => {
  
      searchCon.innerHTML = `
          <div class="card" style="width: 18rem;">
    <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }" class="card-img-top" alt="hero image">
    <div class="card-body">
      <h5 class="card-title">${element.name}</h5>
      <a href="myhero.html" class="btn btn-primary" onclick="seeMore(${element.id})">See More</a>
       <a data-href="fav.html"  id="favourite-button" class="btn btn-primary" target="_blank" onclick="addFavourite(${element.id})">Add to Favourite</a>
       
    
    </div>
  </div>
          
          `
    })
  }))