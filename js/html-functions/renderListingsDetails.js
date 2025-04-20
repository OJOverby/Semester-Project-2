
import { findHighestBid } from "../functions/findHighestBid.js";
import { fetchListing } from "./../api-calls/fetchListing.js";
import { load } from "../functions/load.js";
import {placeBid} from "./../api-calls/placeBid.js";

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
        const token = load("token");
    
        const bidButton = token
        ? '<button id="openBidModal" type="button" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place bid</button>'
        : '';

    
    container.innerHTML = `
         <div class="flex max-w-3xl shadow-lg rounded-xl overflow-hidden bg-white">
        <img class="w-1/2 object-cover" src="${item.data.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image">
        <div class="w-1/2 p-6 flex flex-col justify-center">
          <h3 class="text-2xl font-semibold mb-2">${item.data.title || 'Untitled Post'}</h3>
          <p class="text-gray-600">${item.data.description || 'Missing description'}</p>
          <p class="text-gray-600">Highest bid: ${highestBid}</p>
            ${bidButton}  
        </div>
      </div>
    `;

    const openModalBtn = document.getElementById("openBidModal");
    const closeModalBtn = document.getElementById("closeBidModal");
    const bidModal = document.getElementById("bidModal");
    const submitBidButton = document.getElementById("submitBid");
    const bidAmountInput = document.getElementById("amount");

    if (openModalBtn && closeModalBtn && submitBidButton && bidModal && bidAmountInput) {
      openModalBtn.addEventListener("click", () => {
        bidModal.classList.remove("hidden");
      });

      closeModalBtn.addEventListener("click", () => {
        bidModal.classList.add("hidden");
        bidAmountInput.value = "";
      });

      submitBidButton.addEventListener("click", async () => {
        const amount = parseFloat(bidAmountInput.value);
        if (isNaN(amount) || amount <= 0) {
          alert("Please enter a valid bid amount.");
          return;
        }

        try {
          await placeBid(itemID, amount);
          alert("Bid placed successfully!");
          bidModal.classList.add("hidden");
          bidAmountInput.value = "";
          renderListingsDetails(itemID); 
        } catch (err) {
          alert("Failed to place bid. Try again.");
          console.error(err);
        }
      });
    }
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }
  
}
