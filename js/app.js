import { fetchListings } from "./api-calls/fetchListings.js";
import { renderListings } from "./html-functions/renderListings.js";
//import { renderListingsDetails } from "./html-functions/renderListingsDetails.js";


const listings = await fetchListings();

console.log(listings);


const path = window.location.pathname;
console.log(path);

if (path === "/" || path === "/index.html") {
    renderListings();
} else if (path.startsWith("/item")) {
   // renderListingsDetails();
} 
