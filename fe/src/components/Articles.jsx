import { SecondaryCard } from "./Card";

export default function Articles() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-5 py-20">
        <h2 className="text-3xl font-semibold">Artikel Unggulan</h2>
        <div className="my-20 flex w-300 flex-col gap-30">
          <SecondaryCard
            title={"Penyakit"}
            body={
              "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
            }
          />
          <SecondaryCard
            title={"penyakit"}
            body={
              "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
            }
            layout={false}
          />
          <SecondaryCard
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
