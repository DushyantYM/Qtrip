// import { text } from "body-parser";
import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
 
  
  //Updates the DOM with the cities
  cities.forEach((key) => {

    addCityToDOM(key.id, key.city, key.description, key.image);


  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  
  const url = config.backendEndpoint;

  try {

    let res = await fetch(`${url}/cities`);

    const data = await res.json();
     return data;
    
  }
  catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const layoutRow = document.getElementById('data');

  let div = document.createElement('div');
  div.className = 'col-12 col-sm-6 col-xl-3 mb-4'
  div.id = id;

  let link = document.createElement('a');
  link.href = `./pages/adventures/?city=${id}`;

  let tileDiv = document.createElement('div');
  tileDiv.className = 'tile';
  tileDiv.id = id;

  let imageDiv = document.createElement('img');
  imageDiv.src = image;
  imageDiv.className = 'img-fluid';

  let textDiv = document.createElement('div');
  textDiv.className = 'tile-text text-center pb-3';

  let cityTextDiv = document.createElement('div');
  let bold = document.createElement('b');
  //
  bold.innerText = city;

  cityTextDiv.append(bold);

  let desciptionDiv = document.createElement('div');
  desciptionDiv.innerText = description;

  div.append(link);
  link.append(tileDiv);
  tileDiv.append(imageDiv, textDiv);
  textDiv.append(cityTextDiv, desciptionDiv);

  layoutRow.append(div);


  // <div class="col-12 col-sm-6 col-xl-3 mb-4">
  //       <a href="./pages/adventures/">
  //         <div class="tile">
            
  //             <img src="./assets/bengaluru.jpg" class="img-fluid">
  //             <div class="tile-text text-center pb-3">
  //               <div><b>Bengaluru</b></div>
  //               <div>100+ Places</div>
  //           </div>
          
  //         </div> 
  //       </a>  
  //     </div>


}

export { init, fetchCities, addCityToDOM };
