import { auctionCountdown } from "../functions/auctionCountdown.js";
import { fetchListings } from "../api-calls/fetchListings.js";

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

    listingElement.innerHTML = `
      <a href="/item/index.html?id=${listing.id}" class="text-lg font-semibold text-blue-600 hover:underline text-center">
        ${listing.title}
        <img src="${listing.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image" class="w-full h-48 object-cover rounded-md mt-2">
      </a>
      <p class="text-gray-600 mt-2">Ends at: ${listing.endsAt}</p>
      <p class="countdown text-red-500"></p>
    `;

    const countdown = listingElement.querySelector(".countdown");
    auctionCountdown(listing.endsAt, countdown);

    grid.appendChild(listingElement);
  });
}
