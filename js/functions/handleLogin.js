import { loginUser } from "../api-calls/loginUser.js";

const form = document.querySelector("#loginForm");
const loginError = document.getElementById("loginError");

export async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        console.log(email);
        await loginUser(email, password);
        window.location.href = "../index.html";
    } catch (error) {
        console.error(error.message);
        if (loginError) {
            loginError.classList.remove("hidden");
        }
    }
}

export function loginListner() {
    form.addEventListener("submit", handleLogin);
}
