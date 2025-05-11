import { BASE_API } from "../api/api.js";
import { load } from "../functions/load.js";
import { API_KEY } from "../api/api-key.js";

export async function updateAvatar(profileName, avatarUrl) {
  const endpoint = `/auction/profiles/${profileName}`;
  const response = await fetch(BASE_API + endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${load("token")}`,
      "X-Noroff-API-Key": API_KEY,
    },
    body: JSON.stringify({
      avatar: {
        url: avatarUrl
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("API Error:", error);
    throw new Error("Could not update avatar");
  }

  return await response.json();
}
