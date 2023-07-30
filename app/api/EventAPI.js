import axios from "axios";

export default async function fetchEventAPIs(
  eventId,
  setEventData,
  setTimeline,
  setLoading,
  setError
) {
  const eventAPI = `https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Event-Details?event_id=${eventId}`;

  const backgroundType = {
    join: "bg-green-500",
    leave: "bg-yellow-500",
    start: "bg-blue-500",
    pause: "bg-red-500",
    edit: "bg-blue-500",
    create: "bg-blue-500",
  };

  axios
    .get(eventAPI)
    .then((response) => {
      setEventData(response.data.event);
      response.data.timeline.forEach((item) => {
        item.backgroundType = backgroundType[item.action_type];
      });
      setTimeline(response.data.timeline);
      setLoading(false);
    })
    .catch((error) => {
      setError(true);
      console.log(error);
    });
}
