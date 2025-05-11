
export function footer() {
    const header = document.querySelector("#footer");
    const currentYear = new Date().getFullYear();
    header.innerHTML = `
    <div class="w-full bg-customOrange shadow-inner px-4 py-4">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-sm text-black">
        <div class="mb-4 md:mb-0">
          <p>&copy; ${currentYear} Bidlify. All rights reserved.</p>
        </div>
      </div>
    </div>
    `
}
