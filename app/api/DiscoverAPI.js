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
