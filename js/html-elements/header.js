import { addSVG } from "../../js/svg/addSVG.js";
import { auctionSVG } from "../js/../svg/auctionSVG.js";
import { homeSVG } from "../../js/svg/homeSVG.js";
import { profileSVG } from "../js/../svg/profileSVG.js";
import { searchSVG } from "../js/../svg/searchSVG.js";
import { logoSVG } from "../svg/logoSVG.js";
import { load } from "../functions/load.js";

export function header() {
    const header = document.querySelector("#header");
    const token = load("token");
    const auctionIcon = auctionSVG();
    const homeIcon = homeSVG();
    const addIcon = addSVG();
    const profileIcon = profileSVG();
    const searchIcon = searchSVG();
    const logoIcon = logoSVG();

    const profileLoginLink = token
        ? `<a href="/profile/index.html" class="flex items-center gap-2 px-4 py-2 md:p-0 hover:text-white transition">${profileIcon}  Profile</a>`
        : `<a href="/login/index.html" class="flex items-center gap-2 px-4 py-2 md:p-0 hover:text-white transition">${profileIcon}  Log In</a>`;

    const createAuctionLink = token
        ? `<a href="/createauction/index.html" class="flex items-center gap-2 px-4 py md:p-0 hover:text-white transition">
           ${addIcon} Create Auction
         </a>`
        : '';

    header.innerHTML = `
<div class="flex items-center px-4 py-2 w-full shadow-md bg-customOrange relative">
    <a href="/index.html" class="flex hover:text-white transition">
        ${logoIcon}
        <h1 class="text-2xl font-semibold whitespace-nowrap">Bidlify</h1>
    </a>
    <button id="menu-toggle" class="md:hidden ml-auto focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    </button>

    <nav id="nav-menu" class="hidden absolute top-full left-0 w-full bg-gray-100 z-50 shadow-md h-[60vh] flex-col
    md:static md:flex md:flex-row md:items-center md:justify-around md:h-auto md:bg-transparent md:shadow-none">
    
        <div class="flex flex-col items-center justify-center w-full h-full text-center gap-4
        md:flex-row md:items-center md:justify-around md:gap-0 md:text-left md:h-auto">

            <form class="flex items-center px-4 py-2 md:p-0" action="/search/index.html" method="get">
                <input
                    class="form-input me-1 px-3 py-1 rounded-md border border-white focus:outline-none focus:border-blue-500"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    id="search-input"
                    name="search"
                />
                <button type="submit" id="search-button" class="bg-transparent border-0 hover:text-white transition">
                    ${searchIcon}
                </button>
            </form>
            <a href="/index.html" class="flex items-center gap-2 px-4 py-2 md:p-0 hover:text-white transition">
                ${homeIcon} Home
            </a>
            <a href="/listings/index.html" class="flex items-center gap-2 px-4 py-2 md:p-0 hover:text-white transition">
                ${auctionIcon} Listings
            </a>
            ${createAuctionLink}
            ${profileLoginLink}
        </div>
    </nav>
</div>
`;

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });
}
