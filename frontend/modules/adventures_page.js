
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const params = new URLSearchParams(search);
  const city = params.get('city');

  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const URL = config.backendEndpoint;

  try {
      let res = await fetch(`${URL}/adventures?city=${city}`)
      let AdventureData = await res.json();
      console.log(AdventureData);

    return AdventureData;
    
  } catch (error) {
    return null;
    
  }
 

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
   
  adventures.forEach(obj => {

    //   You have to loop through the list of adventures passed and for each adventure, create a card

// Use these fields from the adventure information to create the card - id, category, image (URL), name, costPerHead and duration

    createCard(obj.id, obj.category, obj.image, obj.name, obj.costPerHead, obj.duration);
    
  });



}

function createCard(id, category, image, name, costPerHead, duration) {

//   Provide a link to the adventure cards such that users can click on a card to get to the Adventure Details pages for that adventure. The link should be in this format - detail/?adventure=<adventure_id> where adventure_id is extracted from the input.

// Use these classes from the provided frontend/css/styles.css file
  
  let gridElement = document.getElementById('data');
  
  let parentDiv = document.createElement('div');
  parentDiv.setAttribute("class", 'col-6 col-md-6 col-lg-3 mt-2 mb-2');
  //parentDiv.setAttribute("id", id);

  let linkToCard = document.createElement('a');
  linkToCard.setAttribute("id", id);
  linkToCard.setAttribute("href","./detail/?adventure="+`${id}`);

  let childDiv = document.createElement('div');
  childDiv.setAttribute("class", "activity-card")
 // childDiv.setAttribute("id", id);

  let imageDiv = document.createElement('img');
  imageDiv.setAttribute("src",image)

  let categoryBanner = document.createElement('div');
  categoryBanner.setAttribute("class",'category-banner');

  gridElement.append(parentDiv);
  parentDiv.append(linkToCard);
  linkToCard.append(childDiv);
  childDiv.append(imageDiv, categoryBanner);

  let p = document.createElement('p');
  p.innerText = category;

  categoryBanner.append(p);

  let cardBody1 = document.createElement('div');
  cardBody1.setAttribute("class", "card-body d-flex flex-column flex-lg-row justify-content-lg-between");
  

  let nameText = document.createElement('h5');
  nameText.setAttribute("class", "card-title");
  nameText.innerText = name;


  let costText = document.createElement('h5');
  costText.setAttribute("class", "card-text");
  costText.innerText = costPerHead;

  cardBody1.append(nameText, costText);

  let cardBody2 = document.createElement('div');
  cardBody2.setAttribute("class", "card-body d-flex justify-content-between");
  childDiv.append(cardBody2);

  let durationText = document.createElement('h5');
  durationText.setAttribute("class", "card-title");
  durationText.innerText = "Durations";


  let durationValText = document.createElement('h5');
  durationValText.setAttribute("class", "card-text");
  durationValText.innerText = duration;

  cardBody2.append(durationText, durationValText);


  childDiv.append(cardBody1,cardBody2);


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
   
  let filteredAdventuresByDuration = list.filter(function (adv) {

    let duration = adv.duration;
   
    return duration >= low && duration <= high;
    
  })

  console.log("duration filter", filteredAdventuresByDuration);
  return filteredAdventuresByDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filteredAdventuresByCategory = list.filter(function (adv) {
    
    return categoryList.includes(adv.category);
    
  })
   console.log("category filter", filteredAdventuresByCategory);
  return filteredAdventuresByCategory;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
    
  let filteredList = [];
  let categoryList = filters.category;

  let durationStr = filters.duration;

  let durationArray = durationStr.split("-");
  let low = durationArray[0] - "0";
  let high = durationArray[1] - "0";

  if (categoryList.length > 0 && durationStr.length === 0) {
     filteredList = filterByCategory(list, categoryList); 
  }
  else if (categoryList.length === 0 && durationStr.length > 0) {
    filteredList = filterByDuration(list, low, high);
    
  }
  else if (categoryList.length > 0 && durationStr.length > 0) {
     filteredList = filterByCategory(list, categoryList);
     filteredList = filterByDuration(filteredList, low, high);
  }
    // no filter
  else {
    filteredList = list;
    
  }


  console.log(filteredList)
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
  let filters = JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryFilterList = filters.category;

  let categorySection = document.getElementById('category-list');

  categoryFilterList.forEach((cat) => {

      let categoryDiv = document.createElement('div');
      categoryDiv.setAttribute("class", "category-filter");
      categoryDiv.setAttribute("id", cat);
      categoryDiv.innerText = cat;

      categorySection.append(categoryDiv);
    
  })


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
