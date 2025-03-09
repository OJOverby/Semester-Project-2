
import { fetchListing } from "./../api-calls/fetchListing.js";

export async function renderListingsDetails(itemID) {
  if (!itemID) {
    console.error("No post ID provided");
    return;
  }
  const endpoint = "/auction/listings/"+itemID+"?_bids=true";
  try {
    const item = await fetchListing(endpoint);
    const container = document.querySelector(".item-container");
    
    if (!container) {
      console.error("Container not found");
      return;
    }
    console.log(item);
    
    container.innerHTML = `
      <h3>${item.data.title || 'Untitled post'}</h3>
    `;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }
}
