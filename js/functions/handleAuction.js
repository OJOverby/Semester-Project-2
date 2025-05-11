
import { createAuction } from "../api-calls/createAuction.js";
const form = document.querySelector("#auction-form");

export async function handleAuction(event) {
    const auctionTitle = document.querySelector("#auctionTitle").value;
    const auctionDescp = document.querySelector("#auction-form textarea").value;
    const auctionDeadline = document.querySelector("#listingDeadline").value;
    const imageURL = document.querySelector("#imageURL").value;
    const imageAlt = document.querySelector("#imageAlt").value;
    const tags = document.querySelector("#tags").value;
    const tagsArray = tags.split(",").map(tag => tag.trim());


    const auctionData = {
        "title": auctionTitle,
        "description": auctionDescp,
        "tags": tagsArray,
        "media": [{
            "url": imageURL,
            "alt": imageAlt,
        }],
        "endsAt": auctionDeadline
    }
    return auctionData;
};

export function auctionListener() {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      try {
        const auctionData = await handleAuction();
        const response = await createAuction(auctionData);
        console.log("Submit clicked");
        form.reset();
      } catch (error) {
      }
    });
  }
