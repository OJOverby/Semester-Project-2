import { auctionCountdown } from "../functions/auctionCountdown.js";
import { getPopularTags } from "../functions/getPopularTags.js";
import { fetchListingsEndingSoon } from "../api-calls/fetchListingsEndingSoon.js";
import { findHighestBid } from "../functions/findHighestBid.js";

export async function renderListingsCarousel() {
  let listings = await fetchListingsEndingSoon();
  const container = document.querySelector(".listings-container");

  container.innerHTML = `
    <div class="relative">
      <button
        class="prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-customOrange focus:outline-none focus:ring-0"
      >
        ◀
      </button>
      <div class="carousel-container flex overflow-x-auto snap-x snap-mandatory space-x-4 p-4">
      </div>
      <button
        class="next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black text-white p-2 rounded-full shadow-md hover:bg-customOrange focus:outline-none focus:ring-0"
      >
        ▶
      </button>
    </div>
  `;

  const carousel = container.querySelector(".carousel-container");

  listings.forEach(function (listing) {
    const listingLink = document.createElement("a");
    listingLink.href = `/item/index.html?id=${listing.id}`;
    listingLink.classList.add(
      "snap-start",
      "min-w-[70%]",
      "md:min-w-[30%]",
      "p-4",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "relative",
      "hover:shadow-2xl",
      "hover:scale-[1.02]",
      "transition-shadow",
      "duration-300",
      "flex",
      "flex-col",
      "items-center",
      "text-black",
      "no-underline"
    );

    const formattedDate = new Date(listing.endsAt).toLocaleDateString("en-GB");
    const highestBid = findHighestBid(listing.bids);

    listingLink.innerHTML = `
      <div class="text-xl font-semibold text-center">${listing.title}</div>
      <img src="${listing.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image" class="w-40 h-40 object-cover rounded-md mt-2">
      <p class="text-gray-600 mt-2">Ends at: ${formattedDate}</p>
      <p class="text-gray-600">Highest bid: ${highestBid || "No bids yet"}</p>
      <p class="countdown text-red-500"></p>
    `;

    const countdown = listingLink.querySelector(".countdown");
    auctionCountdown(listing.endsAt, countdown);

    carousel.appendChild(listingLink);
  });

  const prevArrow = container.querySelector(".prev-arrow");
  const nextArrow = container.querySelector(".next-arrow");

  prevArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: -carousel.offsetWidth / 2, behavior: "smooth" });
  });

  nextArrow.addEventListener("click", () => {
    carousel.scrollBy({ left: carousel.offsetWidth / 2, behavior: "smooth" });
  });
}
