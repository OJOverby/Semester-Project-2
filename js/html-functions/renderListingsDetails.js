import { findHighestBid } from "../functions/findHighestBid.js";
import { fetchListing } from "./../api-calls/fetchListing.js";
import { load } from "../functions/load.js";
import { placeBid } from "./../api-calls/placeBid.js";
import { auctionCountdown } from "../functions/auctionCountdown.js";

export async function renderListingsDetails(itemID) {
  if (!itemID) {
    console.error("No post ID provided");
    return;
  }

  const endpoint = "/auction/listings/" + itemID + "?_bids=true";

  try {
    const item = await fetchListing(endpoint);
    const container = document.querySelector(".item-container");
    const highestBid = findHighestBid(item.data.bids);
    const siteTitle = item.data.title;
    document.title = `${siteTitle} - Bidlify`;

    if (!container) {
      console.error("Container not found");
      return;
    }

    const token = load("token");

    const now = new Date();
    const endsAt = new Date(item.data.endsAt);
    const isExpired = now >= endsAt;

    const bidButton = token
      ? `<button id="openBidModal" type="button" class="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" ${isExpired ? "disabled class=cursor-not-allowed opacity-50" : ""}>Place bid</button>`
      : "";

    container.innerHTML = `
      <div class="flex max-w-3xl shadow-lg rounded-xl overflow-hidden bg-white">
        <img class="w-1/2 object-cover" src="${item.data.media[0]?.url || './../../images/placeholder.jpeg'}" alt="Listing image">
        <div class="w-1/2 p-6 flex flex-col justify-center">
          <h3 class="text-2xl font-semibold mb-2">${item.data.title || 'Untitled Post'}</h3>
          <p class="text-gray-600 mb-2">${item.data.description || 'The seller did not include a description, but it is probably awsome'}</p>
          <p class="text-gray-600">Highest bid: ${highestBid || 'No bids yet'}</p>
          <p class="countdown text-red-500 mb-2"></p>
          ${bidButton}
        </div>
      </div>
    `;

    const countdown = container.querySelector(".countdown");
    auctionCountdown(item.data.endsAt, countdown);

    if (!isExpired) {
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
    }
  } catch (error) {
    console.error("Failed to fetch listing:", error);
  }
}
