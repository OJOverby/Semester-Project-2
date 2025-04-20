import { fetchUser } from "../api-calls/fetchUser.js";
import { load } from "../functions/load.js";

export async function renderMyProfile() {
  const myProfile = load("profile");
  const profileName = myProfile.name;

  try {
    const response = await fetchUser(`/auction/profiles/${profileName}?_listings=true&_wins=true`);

    if (!response.data) {
      throw new Error('Profile data is missing in the response.');
    }
    const profileContainer = document.querySelector(".profile-container");
    console.log(response);

    const { data } = response;

    const profileContent = `
      <div class="relative max-w-3xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
         <button id="logoutButton" class="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded">
          Logout
        </button>
        <div class="flex items-center mt-0 ml-4">
          <img src="${data.avatar.url}" alt="${data.avatar.alt}" class="w-24 h-24 rounded-full border-4 border-white shadow-lg">
          <div class="ml-4">
            <h1 class="text-2xl font-bold">${data.name}</h1>
            <p class="mt-2"><strong>Credits:</strong> ${data.credits}</p>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-semibold mb-4">Listings (${data._count.listings})</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            ${data.listings.map(listing => `
              <div class="bg-white rounded-lg shadow p-4">
                <img src="${listing.media[0]?.url}" alt="${listing.media[0]?.alt}" class="w-full h-32 object-cover rounded">
                <h3 class="mt-2 font-semibold">${listing.title}</h3>
                <p class="text-gray-600 text-sm">${listing.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-xl font-bold">Wins (${data.wins.length})</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            ${data.wins.map(win => `
              <div class="bg-white p-4 rounded-lg shadow">
                <img src="${win.media[0]?.url}" alt="${win.media[0]?.alt}" class="w-full h-32 object-cover rounded">
                <h3 class="font-semibold mt-2">${win.title}</h3>
                <p class="text-gray-600">${win.description}</p>
                <p class="mt-1 text-sm text-gray-500">Ended at: ${new Date(win.endsAt).toLocaleDateString()}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    profileContainer.innerHTML = profileContent;

  } catch (error) {
    console.error('Error fetching profile:', error);
  }
}

  