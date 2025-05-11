import { renderListings } from "../html-functions/renderListings.js"
import { fetchListings } from "../api-calls/fetchListings.js";

export async function sortButtons() {
  const listings = await fetchListings();
  const dropdown = document.getElementById("sortDropdown");

  const sortAndRender = (sortOrder) => {
    const sortedListings = [...listings].sort((a, b) => {
      const dateA = new Date(a.endsAt);
      const dateB = new Date(b.endsAt);
      return sortOrder === "newest" ? dateA - dateB : dateB - dateA;
    });

    renderListings(sortedListings);
  };

  // Initial render
  sortAndRender(dropdown.value);

  // On dropdown change
  dropdown.addEventListener("change", (event) => {
    const sortOrder = event.target.value;
    console.log("Sorting:", sortOrder);
    sortAndRender(sortOrder);
  });
}


