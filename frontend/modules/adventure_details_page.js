import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const URLparams = new URLSearchParams(search);
  const adventureId = URLparams.get('adventure');

  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  const backendEndpoint = config.backendEndpoint;
  try {
     let res = await fetch(`${backendEndpoint}/adventures/detail?adventure=${adventureId}`);
     let data = await res.json();
    
    return data;
    
  } catch {
    return null;
  }
 
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM



  let { name, subtitle, images, content } = adventure;
  let adventureNameElement = document.getElementById("adventure-name");
  adventureNameElement.innerHTML = name;

  let adventureSubtitleElement = document.getElementById("adventure-subtitle");
  adventureSubtitleElement.innerHTML = subtitle;

  let photoGalleryEle = document.getElementById("photo-gallery");

  images.forEach( (img) => {
    
    let div = document.createElement("div");
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", img);
    imgElement.setAttribute("class", "activity-card-image");

    div.append(imgElement);

    photoGalleryEle.append(div);
    
  });

  let advContentElement = document.getElementById("adventure-content");

  advContentElement.innerHTML = content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGalleryEle = document.getElementById("photo-gallery");

  photoGalleryEle.innerHTML = ``;

  //<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel"></div>
  let parentDiv = document.createElement("div");
  parentDiv.setAttribute("id", "carouselExampleIndicators");
  parentDiv.setAttribute("class", "carousel slide");
  parentDiv.setAttribute("data-bs-ride", "carousel");

  // <div class="carousel-indicators"></div>
  let indicatorDiv = document.createElement("div");
  indicatorDiv.setAttribute("class", "carousel-indicators");


  let len = images.length;
  for (let i = 0; i < len; i++){
    indicatorDiv.innerHTML += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-current="true" aria-label="Slide ${i + 1}">
    </button>`;
  }
  let firstChild = indicatorDiv.firstChild;
  console.log(firstChild);
  firstChild.setAttribute("class", "active");

  //<div class="carousel-inner"></div>

  let innerDiv = document.createElement("div");
  innerDiv.setAttribute("class", "carousel-inner");

  images.forEach(img => {
    innerDiv.innerHTML+= ` <div class="carousel-item ">
     <img src="${img}" class="d-block w-100" alt="...">
    </div>`
    
  });

  let firstImgChild = innerDiv.firstChild.nextSibling;
  console.log(firstImgChild);
  firstImgChild.setAttribute("class", "carousel-item active");

  let buttonDiv = document.createElement("div");
  buttonDiv.innerHTML = `  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`

  parentDiv.append(indicatorDiv, innerDiv, buttonDiv);

  photoGalleryEle.append(parentDiv);

}
//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS

  let { available, costPerHead } = adventure;
  // 1. If the adventure is already reserved, display the sold-out message.

//   Use the available field of the input adventure to make the if else decision


  let sold_out_panel = document.getElementById("reservation-panel-sold-out");
  let available_panel = document.getElementById("reservation-panel-available")
  
  // If the adventure is available
  if (available) {

    sold_out_panel.style.display = "none";
    available_panel.style.display = "block";

    let reservation_person_cost = document.getElementById("reservation-person-cost");
    reservation_person_cost.innerHTML = costPerHead;
  }
  else {
    available_panel.style.display = "none";
    sold_out_panel.style.display = "block";
  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost;
  let costPerHead = adventure.costPerHead;
  totalCost = persons * costPerHead; 
  // console.log(totalCost);

  let totalCostDiv = document.getElementById("reservation-cost");

  totalCostDiv.innerHTML = `${totalCost}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  let myForm = document.getElementById("myForm");
    
  myForm.addEventListener('submit', (event) => {

    event.preventDefault;
      
    let name = myForm.elements["name"].value;

    let date = myForm.elements["date"].value;
      
    let person = myForm.elements["person"].value;

    const data = {
      name,
      date,
      person,
      adventure: adventure.id
    };

    const endPoint = config.backendEndpoint;

    const URL = `${endPoint}/reservations/new`;
   
   // console.log(JSON.stringify(data));

    fetch(URL, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async res => {
        
        const data = await res.json();
        
        if (!res.ok) {
          alert("Failed!");
          return Promise.error(res.status);
        }
        alert("Success!");
        window.location.href = window.location.href  
        adventure.reserved = true;
       
        return data;
      })
      .then((data) => {
        console.log(data);
      }).catch(e => {
        console.log(e);
      });    
  
  });
    
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const banner = document.getElementById("reserved-banner");
  if (adventure.reserved) {
   
    banner.style.display = "block";
  }
  else {
    banner.style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
