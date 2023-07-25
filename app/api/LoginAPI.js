import axios from "axios";
import { sha256 } from "js-sha256";
export default async function postLoginAPI(
  loginData,
  setIncorrectLogin,
  setLogedIn,
  setLoginData
) {
  const { email, password } = loginData;
  console.log("email: ", email);
  console.log("password: ", password);
  const hashedPassword = sha256(password + email);
  console.log("hashedPassword: ", hashedPassword);
  if (
    email === "a@a.com" &&
    hashedPassword ===
      "0faad6486f315545eea81998bfbdbce03f65772e51f556a1d78a8aa743eb0c3b"
  ) {
    setLogedIn(true);
    setIncorrectLogin(false);
  } else {
    setIncorrectLogin(true);
    setLogedIn(false);
  }
  setLoginData({
    ...loginData,
    password: "",
  });
}
