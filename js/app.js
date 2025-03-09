import { fetchListings } from "./api-calls/fetchListings.js";
import { renderListings } from "./html-functions/renderListings.js";
import { renderListingsDetails } from "./html-functions/renderListingsDetails.js";
import { renderTagsList } from "./html-functions/renderTagsList.js";
import { header } from "./html-elements/header.js";
import { footer } from "./html-elements/footer.js";


header();
footer();

const listings = await fetchListings();

console.log(listings);

const path = window.location.pathname;
console.log(path);

if (path === "/" || path === "/index.html") {
    renderListings();
    renderTagsList();
} else if (path.startsWith("/item")) {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    console.log(id);
    if(id){
        renderListingsDetails(id);
    };

} 
