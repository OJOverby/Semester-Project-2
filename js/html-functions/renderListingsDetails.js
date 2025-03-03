
import { fetchListing } from "./../api-calls/fetchListing";

export async function renderListingsDetails(itemID) {
  if (!postID) {
    console.error("No post ID provided");
    return;
  }
  const endpoint = `/auction/listings/${itemID}`;
  try {
    const item = await fetchListing(endpoint);
    const container = document.querySelector(".item-container");
    
    if (!container) {
      console.error("Container not found");
      return;
    }
    
    container.innerHTML = `
      <h3>${item?.title || 'Untitled post'}</h3>
    `;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }
}
