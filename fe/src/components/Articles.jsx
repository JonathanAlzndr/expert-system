import { SecondaryCard } from "./Card";

export default function Articles() {
  return (
    <>
      <section
        id="artikel"
        className="relative flex flex-col items-center justify-center px-5 py-20"
      >
        <h2 className="text-3xl font-semibold">Artikel Unggulan</h2>
        <div className="my-20 flex w-300 flex-col gap-30">
          <SecondaryCard
            title={"Penyakit"}
            body={
              "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
            }
            picture={
              "https://media.istockphoto.com/id/528290460/id/foto/anak-laki-laki-mengukur-demam.jpg?s=612x612&w=0&k=20&c=qJ7_Y6zx1UhwPPFIqOpbU6YPVLxSXzzboB9-rw6q2mI="
            }
          />
          <SecondaryCard
            title={"penyakit"}
            body={
              "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
            }
            picture={
              "https://media.istockphoto.com/id/474077956/id/foto/anjing-sakit-sakit.jpg?s=612x612&w=0&k=20&c=QRQeXJ3rmKyPv853DhMTJQcU0jdLqnNv_9-bUB69jLk="
            }
            layout={false}
          />
          <SecondaryCard
            title={"penyakit"}
            body={
              "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
            }
            picture={
              "https://media.istockphoto.com/id/1354562446/id/foto/wanita-muda-asia-duduk-di-tempat-tidur-dan-meniup-hidungnya-dengan-tisu-saat-menderita-pilek.jpg?s=612x612&w=0&k=20&c=4hD0rsZ7Yo30t9F-4wtECAptX8Ku7Ae6fNFSWrL-loo="
            }
          />
        </div>
      </section>
    </>
  );
}
