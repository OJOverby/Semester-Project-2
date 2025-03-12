import { fetchListing } from "../api-calls/fetchListing.js";

export async function tagListings(){
    const endpoint = "/auction/listings?_tag=";
    const params = new URLSearchParams(window.location.search);
    const tagTerm = params.get('tag');
    const tagEndpoint = endpoint + tagTerm;

    const listings = await fetchListing(tagEndpoint);

    console.log(listings);

}
