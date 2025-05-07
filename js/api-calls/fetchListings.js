import { BASE_API } from "./../api/api.js";

export async function fetchListings() {
    const allListings = [];
    let currentPage = 1;
    let isLastPage = false;

    while (!isLastPage) {
        const endpoint = `/auction/listings?_active=true&_bids=true&page=${currentPage}`;
        const response = await fetch(BASE_API + endpoint);

        if (!response.ok) {
            console.error(`Failed to fetch page ${currentPage}:`, response.status, response.statusText);
            break;
        }

        const listings = await response.json();

        if (listings && listings.data) {
            allListings.push(...listings.data);
            isLastPage = listings.meta.isLastPage;
            currentPage++;
        } else {
            console.error("Invalid data format received:", listings);
            break;
        }
    }

    console.log(`Fetched ${allListings.length} listings.`);
    return allListings;
}
