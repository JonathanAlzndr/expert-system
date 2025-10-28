export default function Services() {
  const Card = ({ title, body }) => {
    return (
      <div className="flex h-50 w-90 flex-col items-center justify-around p-4">
        <img className="h-full w-full" src="" alt={`${title}.png`} />
        <div className="flex flex-col items-center">
          <h3 className="mb-2 text-2xl font-semibold">{title}</h3>
          <p className="text-center text-sm text-gray-300">{body}</p>
        </div>
      </div>
    );
  };
  return (
    <section className="bg-merahTua flex flex-col items-center justify-center p-20 text-white">
      <h2 className="text-3xl font-semibold">Jelajahi Layanan Kami</h2>
      <div className="my-20 flex gap-20">
        <Card
          title={"penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
        <Card
          title={"penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
        <Card
          title={"penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
        />
      </div>
    </section>
  );
}
