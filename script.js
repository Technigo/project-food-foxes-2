const cardContainer = document.getElementById("card-container");
const card = document.getElementById("card");
const restoInfo = document.getElementById("api-data");
let restaurantList = [];
let priceRange = null;
let goodReviewOnly = null;
let sortToLowest = null;
let sortTohighest = null;
let sortLow = null;
let sortHigh = null;

const apiKey = "66748116ada83a96ea0d8e2b3c763360"; //Peggy
const cityID = 91; //Dublin
const cusineID = 82; //pizza
const apiURL = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityID}&entity_type=city&cuisines=${cusineID}`;



const fetchZomato = () => {
  
  fetch(apiURL, { headers: { "user-key": apiKey } })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      restaurantList = response.restaurants;
      printRestorants(restaurantList);
    });
};
fetchZomato();


// Filter
const onPriceRangeChange = (target) => {
  priceRange = target.value;
  printRestorants(filterList());
};
const onReviewChange = (target) => {
  goodReviewOnly = target.checked;
  printRestorants(filterList());
};
const filterList = () => {
  let filteredRestaurants = restaurantList;
  if (priceRange) {
    filteredRestaurants = filteredRestaurants.filter(
      (item) => item.restaurant.price_range == priceRange
    );
  }
  if (goodReviewOnly) {
    filteredRestaurants = filteredRestaurants.filter(
      (item) => item.restaurant.user_rating.aggregate_rating >= 4.1
    );
  }
  return filteredRestaurants;
};
const printRestorants = (restaurants) => {
  cardContainer.innerHTML = "";
  restaurants.forEach((place) => {
    cardContainer.innerHTML += `
    <article class="card" id="card"> 
      <img class="pic" src="${place.restaurant.thumb}"/>
      <h4>${place.restaurant.name}</h4>
      <p>Address: ${place.restaurant.location.address}</p>
      <p>Average cost for two: ${place.restaurant.average_cost_for_two} ${place.restaurant.currency}</p>
      <p>Price Range: ${place.restaurant.price_range}</p>
      <p>Aggregate Rating: ${place.restaurant.user_rating.aggregate_rating}</p>   
    </article>`;
  });
};

//function sort price
const ascending = apiURL.concat('&sort=cost&order=asc');
const descending = apiURL.concat('&sort=cost&order=desc');
console.log(ascending);

const sortFromLow = (target) => {
  sortLow = target.checked;
  if (sortLow) {
    return ascending;
  }
}

const sortFromHigh = (target) => {
  sortHigh = target.checked;
 if (sortHigh) {
   return descending;
 }
}


const sortPrice = () => {
  fetch(onSortChange, { headers: { "user-key": apiKey } })
  .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }
      return response.json()
    })
    .then((response) => {
      restaurantList = response.restaurants;
      sortFromLow(restaurantList);
      sortFromHigh(restaurantList);
    })
}
