import { fetchListing } from "../api-calls/fetchListing.js";
import { renderListings } from "./renderListings.js";

export async function searchListings(){
    const endpoint = "/auction/listings/search?q=";
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    const searchEndpoint = endpoint + searchTerm;

    const listings = await fetchListing(searchEndpoint);

    const now = new Date();
    const activeListings = listings.data.filter(listing => new Date(listing.endsAt) > now);
    renderListings(activeListings);
    console.log(activeListings);

}
