import { registerUser } from "../api-calls/registerUser.js"

export async function handleRegister (name, email, password) {
  await registerUser(name, email, password);
    console.log("Registration successfull")
}
