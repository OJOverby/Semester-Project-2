
export function handleLogout() {
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      localStorage.clear(); 
      window.location.href = "/index.html";
    });
    

}
