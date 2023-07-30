import axios from "axios";

export default async function fetchDiscoverAPIs(setDsicoverData, setLoading) {
  const discoverAPI =
    "https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Events-Display";

  axios
    .get(discoverAPI)
    .then((response) => {
      setDsicoverData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function fetchActivitiesAPI(token, setActivitiesData, setLoading) {
  const activitiesAPI =
    "https://2w742f76z1.execute-api.us-east-1.amazonaws.com/dev/CMI-Dev-Events-Display";

  axios
    .get(activitiesAPI + `?token=${token}`)
    .then((response) => {
      setActivitiesData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}
