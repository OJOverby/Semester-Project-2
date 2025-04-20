import { fetchListings } from "./api-calls/fetchListings.js";
import { renderListingsCarousel } from "./html-functions/renderListingsCarousel.js";
import { renderListingsDetails } from "./html-functions/renderListingsDetails.js";
import { renderTagsList } from "./html-functions/renderTagsList.js";
import { header } from "./html-elements/header.js";
import { footer } from "./html-elements/footer.js";
import { renderListings } from "./html-functions/renderListings.js";
import { tagListings } from "./html-functions/tagListings.js";
import { searchListings } from "./html-functions/searchListings.js";
import { loginListner } from "./functions/handleLogin.js"
import { renderMyProfile } from "./html-functions/renderMyProfile.js";
import { auctionListener } from "./functions/handleAuction.js";

// Renders the header and the footer present at all sites
header();
footer();

const listings = await fetchListings();

console.log(listings);

const path = window.location.pathname;
console.log(path);


if (path === "/" || path === "/index.html") {
    renderListingsCarousel();
    renderTagsList();
} 
else if (path.startsWith("/item")) {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    console.log(id);
    if(id){
        renderListingsDetails(id);
    };

} 
else if (path.startsWith("/listings")) {
    renderListings(await fetchListings());
} else if (path.startsWith("/tags")) {
    tagListings(); 
} else if (path.startsWith("/search")) {
    searchListings();
} else if (path.startsWith("/login")) {
    loginListner();
} else if (path.startsWith("/profile")) {
    renderMyProfile();
} else if (path.startsWith("/createauction")) {
    auctionListener();
} 




