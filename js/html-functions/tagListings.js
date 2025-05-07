import { fetchListing } from "../api-calls/fetchListing.js";
import { renderListings } from "./renderListings.js";

export async function tagListings() {
  const baseEndpoint = "/auction/listings?_active=true&_bids=true&_tag=";
  const params = new URLSearchParams(window.location.search);
  const tagTerm = params.get("tag");
  const tagEndpoint = baseEndpoint + encodeURIComponent(tagTerm);

  const listings = await fetchListing(tagEndpoint);
  renderListings(listings.data);

  const siteTitle = tagTerm;
  document.title = `${siteTitle} - Bidlify`;
}
