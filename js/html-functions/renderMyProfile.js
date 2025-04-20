import { fetchUser } from "../api-calls/fetchUser.js";
import { load } from "../functions/load.js";
import { auctionCountdown } from "../functions/auctionCountdown.js";
import { handleLogout } from "../functions/handleLogout.js";

export async function renderMyProfile() {
  const myProfile = load("profile");
  const profileName = myProfile.name;

  try {
    const response = await fetchUser(`/auction/profiles/${profileName}?_listings=true&_wins=true`);

    if (!response.data) {
      throw new Error('Profile data is missing in the response.');
    }

    const profileContainer = document.querySelector(".profile-container");
    const { data } = response;

    const getCurrentBid = (bids) => {
      if (!bids || bids.length === 0) return "No bids";
      const highestBid = Math.max(...bids.map(b => b.amount));
      return `${highestBid} credits`;
    };

    const tableHeader = `
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border w-1/4">Title</th>
          <th class="px-4 py-2 border w-1/2">Description</th>
          <th class="px-4 py-2 border w-1/6">Time Remaining</th>
          <th class="px-4 py-2 border w-1/6">Current Bid</th>
        </tr>
      </thead>
    `;

    const listingsRows = data.listings.length > 0
      ? data.listings.map(listing => `
          <tr>
            <td class="border px-4 py-2">${listing.title}</td>
            <td class="border px-4 py-2">${listing.description}</td>
            <td class="border px-4 py-2">
              <span class="countdown" data-endsat="${listing.endsAt}"></span>
            </td>
            <td class="border px-4 py-2">${getCurrentBid(listing.bids)}</td>
          </tr>
        `).join('')
      : `<tr><td colspan="4" class="text-center text-gray-500 py-4 border" style="width:100%;">No listings found.</td></tr>`;

    const winsRows = data.wins.length > 0
      ? data.wins.map(win => `
          <tr>
            <td class="border px-4 py-2">${win.title}</td>
            <td class="border px-4 py-2">${win.description}</td>
            <td class="border px-4 py-2">${new Date(win.endsAt).toLocaleDateString()}</td>
            <td class="border px-4 py-2">${getCurrentBid(win.bids)}</td>
          </tr>
        `).join('')
      : `<tr><td colspan="4" class="text-center text-gray-500 py-4 border" style="width:100%;">No wins yet.</td></tr>`;

    const profileContent = `
      <div class="relative max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <button id="logout-button" class="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded">
          Logout
        </button>
        <div class="flex items-center mt-0 ml-4">
          <img src="${data.avatar.url}" alt="${data.avatar.alt}" class="w-24 h-24 rounded-full border-4 border-white shadow-lg">
          <div class="ml-4">
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="mt-2"><strong>Credits:</strong> ${data.credits}</p>
          </div>
        </div>

        <div class="mt-6 overflow-x-auto">
          <h2 class="text-xl font-semibold mb-4">Listings (${data._count.listings})</h2>
          <table class="min-w-full table-fixed bg-white border border-gray-200 text-left text-sm">
            ${tableHeader}
            <tbody>
              ${listingsRows}
            </tbody>
          </table>
        </div>


        <div class="mt-6 overflow-x-auto">
          <h2 class="text-xl font-bold mb-4">Wins (${data.wins.length})</h2>
          <table class="min-w-full table-fixed bg-white border border-gray-200 text-left text-sm">
            ${tableHeader}
            <tbody>
              ${winsRows}
            </tbody>
          </table>
        </div>
      </div>
    `;

    profileContainer.innerHTML = profileContent;


    document.querySelectorAll(".countdown").forEach(span => {
      const endsAt = span.getAttribute("data-endsat");
      auctionCountdown(endsAt, span);
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
  }

  handleLogout();
}
