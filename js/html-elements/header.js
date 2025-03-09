
export function header() {
    const header = document.querySelector("#header");
    header.innerHTML = `
    <div class="flex items-center px-4 w-full shadow-md">
      <h1 class="text-2xl font-semibold whitespace-nowrap">Auction House</h1>
      <nav class="flex flex-1 justify-around ml-8">
        <form class="flex items-center me-3" action="/search/index.html" method="get">
          <input
          class="form-input me-1 px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          type="search"
          placeholder="Search"
          aria-label="Search"
          id="search-input"
          name="search"
          />
          <button type="submit" id="search-button" class="bg-transparent border-0">
            <i class="bi bi-search text-black">S</i>
          </button>
        </form>
        <a href="/index.html" class="hover:text-gray-300 transition">Home</a>
        <a href="#" class="hover:text-gray-300 transition">Listings</a>
        <a href="#" class="hover:text-gray-300 transition">Log In</a>  
      </nav>
    </div>
    `
}


