import { API_AUTH, API_REGISTER, BASE_API } from "../api/api.js";

export async function registerUser (name, email, password) {
  const response = await fetch(BASE_API + API_AUTH + API_REGISTER, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({name, email, password})
  });
  if (response.ok) {
    return await response.json();
  }
   throw new Error("Could not register account")
}

