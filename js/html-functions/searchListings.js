import { BASE_API } from "../api/api.js";
import { renderListings } from "./renderListings.js";

export async function searchListings() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");
    const container = document.querySelector(".grid-container");
        const breadcrumb = document.querySelector(".breadcrumb");


    if (!searchTerm) {
        container.innerHTML = `<div class="p-4 text-center text-gray-700">No search term provided.</div>`;
        return;
    }

    const endpoint = `/auction/listings/search?q=${searchTerm}&_bids=true`;
    const response = await fetch(BASE_API + endpoint);

    if (!response.ok) {
        container.innerHTML = `<div class="p-4 text-center text-red-600">Failed to fetch search results.</div>`;
        return;
    }

    const listings = await response.json();

    const now = new Date();
    const activeListings = listings.data.filter(listing => new Date(listing.endsAt) > now);

    if (activeListings.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center text-gray-700">
                Sorry, there are no listings containing <span class="font-semibold">${searchTerm}</span>.
            </div>
        `;
    } else {
        renderListings(activeListings);
        console.log(activeListings);
          breadcrumb.innerHTML = `  
    <li><a href="../index.html">Home</a></li>
    <li><a href="../listings/index.html">Listings</a></li>
    <li><a href="#">${searchTerm}</a></li>`
    }
}
