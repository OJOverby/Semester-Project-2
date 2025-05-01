import { fetchListing } from "../api-calls/fetchListing.js";
import { renderListings } from "./renderListings.js";

export async function searchListings() {
    const endpoint = "/auction/listings/search?q=";
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    const searchEndpoint = endpoint + searchTerm;

    const listings = await fetchListing(searchEndpoint);

    const now = new Date();
    const activeListings = listings.data.filter(listing => new Date(listing.endsAt) > now);

    const container = document.querySelector(".grid-container");

    if (activeListings.length === 0) {
        container.innerHTML = `
            <div class="p-4 text-center text-gray-700">
                Sorry, there are no listings containing <span class="font-semibold">${searchTerm}</span>.
            </div>
        `;
    } else {
        renderListings(activeListings);
        console.log(activeListings);
    }
}
