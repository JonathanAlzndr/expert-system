export default function Services() {
  const Card = ({ title, body }) => {
    return (
      <div className="flex h-50 w-full flex-col items-center justify-around px-4 py-1">
        <img
          className="h-full w-full rounded-xl object-cover object-[center_60%]"
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDd3KIZ9USkV7-6apBmR9TUWbhYp3lZMQCPek1c5crKD6raK14X3TL6U0bHg-TcIgVYb3APEvSRO3nJaWB9TvHQohZ4TlM062CqTFh9j0clKD1FALhRHODYDl5Gy5rz5pBIpwzeS5zG1_hZGzEN_XUnlYtW1TM_MDNlP-Mm6yPk7bL3FqFgbml6CBMTx2WIzSfrLMb5vmiuoejb_6nY6ZcsHarvnr25czwP0NDTlH7uoDC2n3WDr-6Sz6OH0s_9N7Aytn7xZMn4l94"
          }
          alt={`${title}.png`}
        />
        <br />
        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-2xl font-bold">{title}</h3>
          <p className="text-center text-base">{body}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="flex flex-col items-center justify-center p-20">
      <h2 className="text-3xl font-semibold">Jelajahi Layanan Kami</h2>
      <div className="my-20 flex gap-20">
        <Card
          title={"Penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
        <Card
          title={"Penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
        <Card
          title={"Penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
      </div>
    </section>
  );
}
