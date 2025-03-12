import { auctionCountdown } from "../functions/auctionCountdown.js";
import { getPopularTags } from "../functions/getPopularTags.js";
import { fetchListings } from "../api-calls/fetchListings.js";

export async function renderListingsCarousel() {
  let listings = await fetchListings();
  const container = document.querySelector(".listings-container");

  container.innerHTML = `
    <div class="relative">
      <button class="prev-arrow absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        ◀
      </button>
      <div class="carousel-container flex overflow-x-auto snap-x snap-mandatory space-x-4 p-4">
      </div>
      <button class="next-arrow absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        ▶
      </button>
    </div>
  `;

  const carousel = container.querySelector(".carousel-container");

  listings.forEach(function (listing) {
    const listingElement = document.createElement("div");
    listingElement.classList.add(
      "snap-start",
      "min-w-[70%]",
      "md:min-w-[30%]",
      "p-4",
      "bg-white",
      "shadow-md",
      "rounded-lg",
      "relative",
      "hover:shadow-lg",
      "transition-shadow",
      "duration-300",
      "flex",
      "flex-col",
      "items-center"
    );
    listingElement.innerHTML = `
      <div>
        <a href="/item/index.html?id=${listing.id}" class="text-xl font-semibold text-blue-600 hover:underline">
          ${listing.title}
          <img src="${listing.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image" class="w-40 h-40 object-cover rounded-md mt-2">
        </a>
      </div>
      <p class="text-gray-600">Ends at: ${listing.endsAt}</p>
      <p class="countdown text-red-500"></p>
    `;

    const countdown = listingElement.querySelector(".countdown");
    auctionCountdown(listing.endsAt, countdown);

    carousel.appendChild(listingElement);
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
