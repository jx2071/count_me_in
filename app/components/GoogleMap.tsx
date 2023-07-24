export default function GoogleMap(props: { location: string; show: boolean }) {
  const { location, show } = props;
  const api_key = process.env.GOOGLE_MAPS_API_KEY;
  if (show) {
    return (
      <>
        <iframe
          className="mt-3"
          width="100%"
          height="450"
          style={{ border: "0" }}
          loading="lazy"
          allowFullScreen={false}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${api_key}&q=${encodeURIComponent(
            location
          )}}&zoom=14`}
        ></iframe>
      </>
    );
  } else {
    return <></>;
  }
}
