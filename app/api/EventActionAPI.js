import axios from "axios";

export default async function postEventActionAPI(
  payload,
  setTokenExpireError,
  setJoinSuccess
) {
  const EventActionAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Event-Actions`;

  axios
    .post(EventActionAPI, payload)
    .then(() => {
      setJoinSuccess(true);
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        setTokenExpireError(true);
      } else {
        console.log(error);
      }
    });
}
