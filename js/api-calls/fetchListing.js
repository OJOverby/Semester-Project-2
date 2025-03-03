import { BASE_API } from "./../api/api.js";

export async function fetchListing(endpoint) {
    try {
        const response = await fetch(BASE_API + endpoint);
        return await response.json();
    } catch (error) {
        console.error("Error in fetchListing:", error);
        return { error: error.message };
    }
}
