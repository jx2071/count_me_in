import axios from "axios";

export default async function fetchEventAPIs(
  eventId,
  setEventData,
  setLoading
) {
  const eventAPI = `https://jsonplaceholder.typicode.com/posts?id=${eventId}`;

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
