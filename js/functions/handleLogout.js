
export function handleLogout() {
    const logoutButton = document.getElementById("logout-button");
    logoutButton.addEventListener("click", () => {
      localStorage.clear(); 
      window.location.href = "/index.html";
    });
    

}
