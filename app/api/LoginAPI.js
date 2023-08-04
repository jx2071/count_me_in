import axios from "axios";
import { sha256 } from "js-sha256";
export default async function postLoginAPI(
  loginData,
  setIncorrectLogin,
  setLogedIn,
  setLoginData,
  setUserInfo
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
      let userInfo = {
        user_name: response.data.user_name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        gender: response.data.gender,
        avatar: response.data.avatar,
      };
      setUserInfo(userInfo);
      window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      window.sessionStorage.setItem("token", response.data.token);
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
