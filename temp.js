import { auctionSVG } from "../../svg/auctionSVG.js";
import { homeSVG } from "../../svg/homeSVG.js";
import { load } from "../functions/load.js";


export function header() {
    const header = document.querySelector("#header");
    const token = load("token");
    const auctionIcon = auctionSVG();
    const homeIcon = homeSVG();

    const profileLoginLink = token
    ? '<a href="/profile/index.html" class="block px-4 py-2 md:p-0 hover:text-white transition">Profile</a>'
    : '<a href="/login/index.html" class="block px-4 py-2 md:p-0 hover:text-white transition">Log In</a>';

const createAuctionLink = token
     ? `<a href="/createauction/index.html" class="block px-4 py md:p-0 hover:text-white transition">
       ${auctionIcon} Create Auction
     </a>`
  : '';

    header.innerHTML = `
<div class="flex items-center px-4 py-2 w-full shadow-md bg-customOrange relative">
  <h1 class="text-2xl font-semibold whitespace-nowrap">Bidlify</h1>
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
        class="form-input me-1 px-3 py-1 rounded-md border border-white focus:outline-none focus:border-blue-500"
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
    <a href="/index.html" class="flex items-center gap-2 px-4 py-2 md:p-0 hover:text-white transition">
  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 790.44 790.43" xmlns="http://www.w3.org/2000/svg">
    <path d="M395.22,790.43c-53.34,0-105.1-10.45-153.84-31.07-47.06-19.91-89.33-48.4-125.62-84.69-36.29-36.29-64.78-78.55-84.69-125.62C10.45,500.32,0,448.56,0,395.22s10.45-105.1,31.07-153.84c19.91-47.06,48.4-89.33,84.69-125.62,36.29-36.29,78.55-64.78,125.62-84.69C290.11,10.45,341.87,0,395.22,0s105.1,10.45,153.84,31.07c47.07,19.91,89.33,48.4,125.62,84.69,36.29,36.29,64.78,78.55,84.69,125.62,20.61,48.74,31.07,100.5,31.07,153.84s-10.45,105.1-31.07,153.84c-19.91,47.06-48.4,89.33-84.69,125.62-36.29,36.29-78.55,64.78-125.62,84.69-48.74,20.61-100.5,31.07-153.84,31.07Zm0-744.61c-192.66,0-349.39,156.74-349.39,349.39s156.74,349.39,349.39,349.39,349.39-156.74,349.39-349.39S587.87,45.82,395.22,45.82Z"/>
    <path d="M624.99,368.94l-81.99-64.37v-73.2c0-3.4-2.76-6.15-6.15-6.15h-46.95c-3.4,0-6.15,2.76-6.15,6.15v26.68l-74.37-58.39c-8.37-6.57-20.14-6.57-28.5,0l-214.86,168.68c-9.94,7.81-12.59,22.27-5.09,32.44,7.76,10.52,22.62,12.47,32.83,4.46l191.86-150.63c5.58-4.38,13.42-4.38,19,0l191.87,150.63c4.23,3.32,9.25,4.93,14.23,4.93,6.84,0,13.62-3.03,18.17-8.83,7.87-10.02,6.12-24.53-3.9-32.4Z"/>
    <path d="M385.72,277.26l-168.47,132.24c-1.49,1.17-2.35,2.95-2.35,4.84v175.19c0,3.4,2.76,6.15,6.15,6.15h123.54c3.4,0,6.15-2.76,6.15-6.15v-119.32c0-3.4,2.76-6.15,6.15-6.15h76.65c3.4,0,6.15,2.76,6.15,6.15v119.32c0,3.4,2.76,6.15,6.15,6.15h123.54c3.4,0,6.15-2.76,6.15-6.15v-175.19c0-1.89-.87-3.67-2.35-4.84l-168.47-132.24c-5.58-4.38-13.42-4.38-19,0Z"/>
  </svg>  Home</a>
    <a href="/listings/index.html" class="block px-4 py-2 md:p-0 hover:text-white transition">Listings</a>
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

