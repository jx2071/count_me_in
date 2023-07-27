import axios from "axios";
import { sha256 } from "js-sha256";
export default async function postLoginAPI(
  loginData,
  setIncorrectLogin,
  setLogedIn,
  setLoginData,
  setAvatar
) {
  const { email, password } = loginData;
  const hashedPassword = sha256(password + email);
  const LoginAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Login-Auth`;

  axios
    .post(LoginAPI, {
      user_name: email,
      password_hash: hashedPassword,
    })
    .then((response) => {
      setLogedIn(true);
      setIncorrectLogin(false);
      setAvatar(response.data.avatar);
      let userInfo = {
        user_name: response.data.user_name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        gender: response.data.gender,
        token: response.data.token,
      };
      window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    })
    .catch((error) => {
      setIncorrectLogin(true);
      setLogedIn(false);
      console.log(error);
    });

  setLoginData({
    ...loginData,
    password: "",
  });
}
