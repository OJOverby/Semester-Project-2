
import { findHighestBid } from "../functions/findHighestBid.js";
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
    const highestBid = findHighestBid(item.data.bids);
    
  
    if (!container) {
      console.error("Container not found");
      return;
    }
    console.log(item);
    console.log(item.data.bids);

    
    container.innerHTML = `
         <div class="flex max-w-3xl shadow-lg rounded-xl overflow-hidden bg-white">
        <img class="w-1/2 object-cover" src="${item.data.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image">
        <div class="w-1/2 p-6 flex flex-col justify-center">
          <h3 class="text-2xl font-semibold mb-2">${item.data.title || 'Untitled Post'}</h3>
          <p class="text-gray-600">${item.data.description || 'Missing description'}</p>
          <p class="text-gray-600">Highest bid: ${highestBid}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }
}
