import { BASE_API } from "./../api/api.js";

export async function fetchListingsEndingSoon(limit = 100) {
    const endpoint = `/auction/listings?_active=true&_bids=true&sort=endsAt&sortOrder=asc&page=1&limit=${limit}`;
    const response = await fetch(BASE_API + endpoint);

    if (!response.ok) {
        console.error("Failed to fetch listings:", response.status, response.statusText);
        return [];
    }

    const result = await response.json();

    if (result && result.data) {
        return result.data;
    } else {
        console.error("Invalid data format received:", result);
        return [];
    }
}
