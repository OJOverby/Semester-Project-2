import { handleRegister } from "../functions/handleRegister.js";

export function formValidation() {
  const form = document.querySelector("#registerForm");
  const email = document.querySelector("#email");
  const name = document.querySelector("#userName");
  const password = document.querySelector("#password");
  const password2 = document.querySelector("#password2");
  const successMsg = document.querySelector("#successMessage");

  const userNameError = document.querySelector("#userNameError");
  const emailError = document.querySelector("#emailError");
  const passwordError = document.querySelector("#passwordError");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    let isValid = true;

    if (name.value.length < 5) {
      userNameError.classList.remove("hidden");
      isValid = false;
    } else {
      userNameError.classList.add("hidden");
    }

    if (!validateEmail(email.value)) {
      email.setCustomValidity("You must enter a valid Noroff email address.");
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      email.setCustomValidity("");
      emailError.classList.add("hidden");
    }

    if (password.value !== password2.value) {
      password2.setCustomValidity("Passwords do not match");
      passwordError.classList.remove("hidden");
      isValid = false;
    } else {
      password2.setCustomValidity("");
      passwordError.classList.add("hidden");
    }

    if (form.checkValidity() && isValid) {
      form.classList.add("was-validated");
      await handleRegister(name.value, email.value, password.value);
      successMsg.classList.remove("hidden");
      form.reset();
    } else {
      form.classList.add("was-validated");
      console.log("Form contains invalid fields.");
    }
  });

  name.addEventListener("input", () => {
    if (name.value.length >= 5) {
      userNameError.classList.add("hidden");
    }
  });

  email.addEventListener("input", () => {
    if (validateEmail(email.value)) {
      emailError.classList.add("hidden");
    }
  });

  password2.addEventListener("input", () => {
    if (password.value === password2.value) {
      passwordError.classList.add("hidden");
    }
  });

  function validateEmail(email) {
    const regEx = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
    return regEx.test(email);
  }
}
