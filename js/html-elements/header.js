import { load } from "../functions/load.js";


export function header() {
    const header = document.querySelector("#header");
    const token = load("token");

    const profileLoginLink = token
    ? '<a href="/profile/index.html" class="block px-4 py-2 md:p-0 hover:text-gray-300 transition">Profile</a>'
    : '<a href="/login/index.html" class="block px-4 py-2 md:p-0 hover:text-gray-300 transition">Log In</a>';

const createAuctionLink = token
    ? '<a href="/createauction/index.html" class="block px-4 py-2 md:p-0 hover:text-gray-300 transition">Create Auction</a>'
    : '';

    header.innerHTML = `
<div class="flex items-center px-4 py-2 w-full shadow-md bg-white relative">
  <h1 class="text-2xl font-semibold whitespace-nowrap">Auction House</h1>
  <button id="menu-toggle" class="md:hidden ml-auto focus:outline-none">
    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  </button>

  <nav id="nav-menu" class="hidden flex-col md:flex md:flex-row md:items-center md:ml-8 md:flex-1 md:justify-around w-full md:w-auto absolute md:static top-full left-0 bg-white md:bg-transparent z-50 md:z-auto shadow-md md:shadow-none">
    <form class="flex items-center me-3 px-4 py-2 md:p-0" action="/search/index.html" method="get">
      <input
        class="form-input me-1 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        type="search"
        placeholder="Search"
        aria-label="Search"
        id="search-input"
        name="search"
      />
      <button type="submit" id="search-button" class="bg-transparent border-0">
        <img class="searchicon h-5 w-5" src="../images/search.svg" alt="Search button">
      </button>
    </form>
    <a href="/index.html" class="block px-4 py-2 md:p-0 hover:text-gray-300 transition">Home</a>
    <a href="/listings/index.html" class="block px-4 py-2 md:p-0 hover:text-gray-300 transition">Listings</a>
    ${createAuctionLink}
    ${profileLoginLink}
  </nav>
</div>

    `

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
  
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });
  
  
}

