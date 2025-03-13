import { API_AUTH, API_LOGIN, BASE_API } from "../api/api.js";
import { save } from "../functions/save.js";

export async function loginUser (email, password) {
  const response = await fetch (BASE_API + API_AUTH + API_LOGIN, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({email, password})
  });
  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    save("token", accessToken);
    save("profile", profile);
    return profile
  }
 throw new Error("Could not login");
}
  