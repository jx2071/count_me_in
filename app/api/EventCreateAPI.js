import axios from "axios";

export default async function postEventCreateAPI(
  eventData,
  setSuccess,
  setErrorMsg,
  setError
) {
  const eventAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Event-Create`;

  axios
    .post(eventAPI, eventData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      setSuccess(true);
    })
    .catch((error) => {
      setErrorMsg(error.response);
      setError(true);
      console.log(error);
    });
}
