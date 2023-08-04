import axios from "axios";
import { sha256 } from "js-sha256";

export default async function postSignupAPI(
  userData,
  setUserInfo,
  setSignupSuccess
) {
  const { name, email, gender, password } = userData;
  const hashedPassword = sha256(password + email);
  const SignupAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Signup`;

  axios
    .post(SignupAPI, {
      name,
      email,
      gender,
      hashedPassword,
    })
    .then((response) => {
      let userInfo = {
        user_name: response.data.user_name,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        gender: response.data.gender,
        avatar: response.data.avatar,
      };
      setUserInfo(userInfo);
      window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
      window.sessionStorage.setItem("Token", response.data.token);
      setSignupSuccess(true);
    })
    .catch((error) => {
      console.log(error);
    });
}
