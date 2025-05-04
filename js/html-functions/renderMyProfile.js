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
      return highestBid;
    };

    const listingsHeader = `
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border w-1/4">Title</th>
          <th class="px-4 py-2 border w-1/2">Description</th>
          <th class="px-4 py-2 border w-1/6">Time Remaining</th>
          <th class="px-4 py-2 border w-1/6">Current Bid</th>
        </tr>
      </thead>
    `;

    const winsHeader = `
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border w-1/4">Title</th>
          <th class="px-4 py-2 border w-1/2">Description</th>
          <th class="px-4 py-2 border w-1/6">Ended At</th>
          <th class="px-4 py-2 border w-1/6">Winning Bid</th>
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

    // For each win, fetch the listing's bids and extract the highest
    const winsRows = data.wins.length > 0
      ? (await Promise.all(data.wins.map(async win => {
          try {
            const listingResponse = await fetchUser(`/auction/listings/${win.id}?_bids=true`);
            const listingData = listingResponse.data;
            const highestBid = listingData.bids && listingData.bids.length > 0
              ? Math.max(...listingData.bids.map(b => b.amount))
              : "No bids";

            return `
              <tr>
                <td class="border px-4 py-2">${win.title}</td>
                <td class="border px-4 py-2">${win.description}</td>
                <td class="border px-4 py-2">${new Date(win.endsAt).toLocaleDateString()}</td>
                <td class="border px-4 py-2">${highestBid !== "No bids" ? `${highestBid}` : "No bids"}</td>
              </tr>
            `;
          } catch (err) {
            console.error(`Error fetching listing ${win.id}:`, err);
            return `
              <tr>
                <td class="border px-4 py-2">${win.title}</td>
                <td class="border px-4 py-2">${win.description}</td>
                <td class="border px-4 py-2">${new Date(win.endsAt).toLocaleDateString()}</td>
                <td class="border px-4 py-2 text-red-500">Error fetching bid</td>
              </tr>
            `;
          }
        }))).join('')
      : `<tr><td colspan="4" class="text-center text-gray-500 py-4 border" style="width:100%;">No wins yet.</td></tr>`;

    const profileContent = `
      <div class="relative max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
        <button id="logout-button" class="absolute top-4 right-4 bg-black hover:bg-gray-800 text-white text-sm px-4 py-2 rounded">
          Logout
        </button>
        <div class="flex items-center mt-0 ml-4">
          <img src="${data.avatar.url}" alt="${data.avatar.alt}" id="avatar-img" class="w-24 h-24 rounded-full border-4 border-white hover:border-customOrange shadow-lg">
          <div class="ml-4">
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="mt-2"><strong>Credits:</strong> ${data.credits}</p>
          </div>
        </div>

        <div class="mt-6 overflow-x-auto">
          <h2 class="text-xl font-semibold mb-4">Listings (${data._count.listings})</h2>
          <table class="min-w-full table-fixed bg-white border border-gray-200 text-left text-sm">
            ${listingsHeader}
            <tbody>
              ${listingsRows}
            </tbody>
          </table>
        </div>

        <div class="mt-6 overflow-x-auto">
          <h2 class="text-xl font-bold mb-4">Wins (${data._count.wins})</h2>
          <table class="min-w-full table-fixed bg-white border border-gray-200 text-left text-sm">
            ${winsHeader}
            <tbody>
              ${winsRows}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Avatar Modal -->
      <div id="avatar-modal" class="fixed inset-0 z-50 hidden bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
          <button id="close-modal" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
          <div class="text-center">
            <img id="modal-avatar" src="${data.avatar.url}" alt="${data.avatar.alt}" class="mx-auto w-32 h-32 rounded-full border-4 border-gray-200 shadow mb-4">
            <button id="change-avatar-btn" class="bg-black hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition">
              Change Avatar
            </button>
            <div id="avatar-input-container" class="mt-4 hidden">
              <input type="url" id="new-avatar-url" placeholder="New avatar URL..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2">
              <button id="save-avatar" class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition">
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    profileContainer.innerHTML = profileContent;

    // Avatar modal logic
    const avatarImg = document.getElementById("avatar-img");
    const modal = document.getElementById("avatar-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const changeAvatarBtn = document.getElementById("change-avatar-btn");
    const avatarInputContainer = document.getElementById("avatar-input-container");
    const saveAvatarBtn = document.getElementById("save-avatar");
    const newAvatarInput = document.getElementById("new-avatar-url");
    const modalAvatar = document.getElementById("modal-avatar");

    avatarImg.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      avatarInputContainer.classList.add("hidden");
      newAvatarInput.value = "";
    });

    changeAvatarBtn.addEventListener("click", () => {
      avatarInputContainer.classList.toggle("hidden");
    });

    saveAvatarBtn.addEventListener("click", () => {
      const newUrl = newAvatarInput.value.trim();
      if (newUrl) {
        avatarImg.src = newUrl;
        modalAvatar.src = newUrl;
        avatarInputContainer.classList.add("hidden");
        newAvatarInput.value = "";
      }
    });

    // Initialize countdowns
    document.querySelectorAll(".countdown").forEach(span => {
      const endsAt = span.getAttribute("data-endsat");
      auctionCountdown(endsAt, span);
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
  }

  handleLogout();
}
