import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  const URL = config.backendEndpoint;

  try {
     let res = await fetch(`${URL}/reservations`);

    let data = await res.json();
    console.log(data);
    return data;
    
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let no_reservation_banner = document.getElementById("no-reservation-banner");

  let reservation_table_parent = document.getElementById("reservation-table-parent");
  
  if (reservations.length === 0) {

    
    no_reservation_banner.style.display = "block";
    reservation_table_parent.style.display = "none";

  }
  else {

    no_reservation_banner.style.display = "none";
    reservation_table_parent.style.display = "block";
    
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  const reservation_table = document.getElementById("reservation-table");
  
  reservations.forEach(data => {

    
    
    
    let date = new Date(data.date);
    let dateInFormat = date.toLocaleDateString('en-IN');

    let time = new Date(data.time);
    console.log(time);

    const options = {
      //dateStyle: 'medium',
     // timeStyle: 'medium',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second : 'numeric'
      
    }

    let timeInFormat = time.toLocaleString('en-IN',options);
  
    const tRow = document.createElement("tr");
    //console.log(dateInFormat);
    let { id, name, adventureName, person, price } = data;

    tRow.innerHTML = `<td>${id}</td><td>${name}</td>
    <td>${adventureName}</td>
    <td>${person}</td>
    <td>${dateInFormat}</td>
    <td>${price}</td>
    <td>${timeInFormat}</td>`;

    let btnDiv = document.createElement("div");
    btnDiv.setAttribute("id", data.id);
    
    let link = document.createElement('a');
    link.href = `../detail/?adventure=${data.adventure}`;
    let btn = document.createElement("button");
    let text = document.createTextNode("Visit Adventure");
    btn.setAttribute("class", "reservation-visit-button");

     
    btn.append(text);
    link.append(btn);
    btnDiv.append(link);
    tRow.append(btnDiv) ;
    reservation_table.append(tRow);

  });
  

}

export { fetchReservations, addReservationToTable };
