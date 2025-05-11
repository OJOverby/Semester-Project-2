import { BASE_API } from "../api/api.js";
import { load } from "../functions/load.js";
import { API_KEY } from "../api/api-key.js";
import { handleAuction } from "../functions/handleAuction.js";

export async function createAuction () {
  const auctionData = await handleAuction();
  const response = await fetch(BASE_API + "/auction/listings", {
    headers: {
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-API-Key": API_KEY,
        "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(auctionData)
  });
  if (response.ok) {
    return await response.json();
  }
   throw new Error("Could not create auction")
}
