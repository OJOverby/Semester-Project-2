import { auctionCountdown } from "../functions/auctionCountdown.js";
import { fetchListings } from "../api-calls/fetchListings.js";
import { findHighestBid } from "../functions/findHighestBid.js";

export async function renderListings(APIfetch) {
  const listings = APIfetch;
  const container = document.querySelector(".grid-container");
    const breadcrumb = document.querySelector(".breadcrumb");
    const dropdown = document.querySelector("#dropdown");



  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
    </div>
  `;

  const grid = container.querySelector(".grid");

  listings.forEach((listing) => {
    const listingLink = document.createElement("a");
    listingLink.href = `/item/index.html?id=${listing.id}`;
    listingLink.classList.add(
      "p-4",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "hover:shadow-2xl",
      "hover:scale-[1.02]",
      "transition",
      "duration-300",
      "ease-in-out",
      "flex",
      "flex-col",
      "items-center",
      "text-black",
      "no-underline"
    );

    const formattedDate = new Date(listing.endsAt).toLocaleDateString("en-GB");
    const highestBid = findHighestBid(listing.bids);

    listingLink.innerHTML = `
      <div class="text-lg font-semibold text-center">${listing.title}</div>
      <img src="${listing.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image" class="w-full h-48 object-cover rounded-md mt-2">
      <p class="text-gray-600 mt-2">Ends at: ${formattedDate}</p>
      <p class="text-gray-600">Highest bid: ${highestBid || "No bids yet"}</p>
      <p class="countdown text-red-500"></p>
    `;

    const countdown = listingLink.querySelector(".countdown");
    auctionCountdown(listing.endsAt, countdown);

    grid.appendChild(listingLink);

       
    const path = window.location.pathname;
 if (path.startsWith("/listings")) {
    dropdown.classList.remove("hidden");
    breadcrumb.innerHTML = `  
    <li><a href="../index.html">Home</a></li>
    <li><a href="#">Listings</a></li>`;
}

  });

}
