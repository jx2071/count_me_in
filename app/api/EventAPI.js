import axios from "axios";

export default async function fetchEventAPIs(
  eventId,
  setEventData,
  setLoading
) {
  const eventAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Event-Details?event_id=${eventId}`;

  axios
    .get(eventAPI)
    .then((response) => {
      setEventData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}
