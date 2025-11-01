import Button from "./Button";

function SecondaryCard({ title, body, layout = true }) {
  const Image = ({ alt }) => (
    <img
      className="h-full w-full rounded-xl object-cover object-[center_60%]"
      src={
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDd3KIZ9USkV7-6apBmR9TUWbhYp3lZMQCPek1c5crKD6raK14X3TL6U0bHg-TcIgVYb3APEvSRO3nJaWB9TvHQohZ4TlM062CqTFh9j0clKD1FALhRHODYDl5Gy5rz5pBIpwzeS5zG1_hZGzEN_XUnlYtW1TM_MDNlP-Mm6yPk7bL3FqFgbml6CBMTx2WIzSfrLMb5vmiuoejb_6nY6ZcsHarvnr25czwP0NDTlH7uoDC2n3WDr-6Sz6OH0s_9N7Aytn7xZMn4l94"
      }
      alt={`${alt}.png`}
    />
  );

  const Caption = ({ title, body }) => (
    <div className="flex flex-col items-start">
      <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
      <p className="text-base">{body}</p>
      <br />
      <div className="h-9 w-50">
        <Button text={"Baca selengkapnya"} color="" />
      </div>
    </div>
  );

  return (
    <div className="flex h-60 w-full items-center justify-around gap-10 text-black">
      {layout ? (
        <>
          <div className="h-full w-full">
            <Image alt={title} />
          </div>
          <Caption title={title} body={body} />
        </>
      ) : (
        <>
          <Caption title={title} body={body} />
          <div className="h-full w-full">
            <Image alt={title} />
          </div>
        </>
      )}
    </div>
  );
}

export { SecondaryCard };
