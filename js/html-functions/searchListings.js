import { fetchListing } from "../api-calls/fetchListing.js";

export async function searchListings(){
    const endpoint = "/auction/listings/search?q=";
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get('search');
    const searchEndpoint = endpoint + searchTerm;

    const listings = await fetchListing(searchEndpoint);

    console.log(listings);

}
