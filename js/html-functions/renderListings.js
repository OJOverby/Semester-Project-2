import { auctionCountdown } from "../functions/auctionCountdown.js";
import { fetchListings } from "../api-calls/fetchListings.js";
import { findHighestBid } from "../functions/findHighestBid.js";

export async function renderListings(APIfetch) {
  const listings = APIfetch;
  const container = document.querySelector(".grid-container");

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
    </div>
  `;

  const grid = container.querySelector(".grid");

  listings.forEach((listing) => {
    const listingElement = document.createElement("div");
    listingElement.classList.add(
      "p-4",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "hover:shadow-lg",
      "transition-shadow",
      "duration-300",
      "flex",
      "flex-col",
      "items-center"
    );

    const formattedDate = new Date(listing.endsAt).toLocaleDateString("en-GB");
    const highestBid = findHighestBid(listing.bids);

    listingElement.innerHTML = `
      <a href="/item/index.html?id=${listing.id}" class="text-lg font-semibold text-black hover:underline text-center">
        ${listing.title}
        <img src="${listing.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image" class="w-full h-48 object-cover rounded-md mt-2">
      </a>
      <p class="text-gray-600 mt-2">Ends at: ${formattedDate}</p>
      <p class="text-gray-600">Highest bid: ${highestBid || "No bids yet"}</p>
      <p class="countdown text-red-500"></p>
    `;

    const countdown = listingElement.querySelector(".countdown");
    auctionCountdown(listing.endsAt, countdown);

    grid.appendChild(listingElement);
  });
}
