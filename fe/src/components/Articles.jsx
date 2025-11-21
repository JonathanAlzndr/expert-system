import { SecondaryCard } from "./Card";
import { H1, H2 } from "./Text";

export default function Articles() {
  return (
    <>
      <section
        id="information"
        className="relative flex flex-col items-center justify-center px-5 py-20"
      >
        <H1 variant="black">Artikel Unggulan</H1>
        <div className="my-20 flex w-300 flex-col gap-30">
          <SecondaryCard
            title={"Cara kerja Forward Chaining"}
            body={
              "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam."
            }
            picture={
              "https://media.istockphoto.com/id/528290460/id/foto/anak-laki-laki-mengukur-demam.jpg?s=612x612&w=0&k=20&c=qJ7_Y6zx1UhwPPFIqOpbU6YPVLxSXzzboB9-rw6q2mI="
            }
          />
          <SecondaryCard
            title={"Certainty Factor"}
            body={
              "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam."
            }
            picture={
              "https://media.istockphoto.com/id/474077956/id/foto/anjing-sakit-sakit.jpg?s=612x612&w=0&k=20&c=QRQeXJ3rmKyPv853DhMTJQcU0jdLqnNv_9-bUB69jLk="
            }
            layout={false}
          />
        </div>
      </section>
    </>
  );
}
