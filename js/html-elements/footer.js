
export function footer() {
    const header = document.querySelector("#footer");
    const currentYear = new Date().getFullYear();
    header.innerHTML = `
    <div class="w-full bg-customOrange shadow-inner px-4 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto text-sm text-black">
        <div class="mb-4 md:mb-0">
          <p>&copy; ${currentYear} Bidlify. All rights reserved.</p>
        </div>
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <a href="/about/index.html" class="hover:text-white transition">About Us</a>
          <a href="/contact/index.html" class="hover:text-white transition">Contact</a>
          <a href="/terms/index.html" class="hover:text-white transition">Terms of Service</a>
          <a href="/privacy/index.html" class="hover:text-white transition">Privacy Policy</a>
        </div>
      </div>
    </div>
    `
}
