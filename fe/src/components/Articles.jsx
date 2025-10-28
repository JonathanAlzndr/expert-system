export default function Articles() {
  return (
    <>
      <section className="bg-merahTua flex flex-col items-center justify-center p-20 text-white">
        <h2 className="text-3xl font-semibold">Jelajahi Layanan Kami</h2>
        <div className="my-20 flex gap-20">
          <Card
            title={"Penyakit"}
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
    </>
  );
}
