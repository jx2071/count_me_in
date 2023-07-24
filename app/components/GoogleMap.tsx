export default function GoogleMap(props: { location: string; show: boolean }) {
  const { location, show } = props;
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
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCTxDEPkK-7yFbbIDFnz3D8SkxWutvarxU&q=${encodeURIComponent(
            location
          )}}&zoom=14`}
        ></iframe>
      </>
    );
  } else {
    return <></>;
  }
}
