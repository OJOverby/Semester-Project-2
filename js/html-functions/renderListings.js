import { auctionCountdown } from "../functions/auctionCountdown.js";
import { getPopularTags } from "../functions/getPopularTags.js";
import { fetchListings } from "./../api-calls/fetchListings.js";


export async function renderListings(){
  let listings = await fetchListings();
  const container = document.querySelector(".listings-container");
 
  container.innerHTML = "";
  console.log(getPopularTags(listings));
  
  listings.forEach(function(listing){
    const listingElement = document.createElement("div");
    listingElement.classList.add(
      "col-12",
      "col-md-5",
      "p-1",
      "hover-element",
      "position-relative",
      "shadow",
      "mt-2"
    );
    listingElement.innerHTML = `
   <div>${listing.title}</div>
   <p>${listing.endsAt}</p>
   <p class="countdown"></p>
  `;
  const countdown = listingElement.querySelector(".countdown");
 auctionCountdown(listing.endsAt, countdown);
  container.appendChild(listingElement);
})

}
