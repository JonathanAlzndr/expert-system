export default function Services() {
  const Card = ({ title, body, picture }) => {
    return (
      <div className="flex h-50 w-full flex-col items-center justify-around px-4 py-1">
        <img
          className="h-full w-full transform rounded-xl object-cover object-[center_30%] shadow-xl transition-all duration-500 hover:scale-105"
          src={`${picture}`}
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
          picture={
            "https://media.istockphoto.com/id/1312616957/id/vektor/diagnosa-paru-paru-kesehatan-konsep-penyakit-paru-paru-pulmonologi-kanker-pneumonia.jpg?s=612x612&w=0&k=20&c=KvpEjO0K6FI5M313L81s31ZUOTajsewHb1y0mNLL79s="
          }
        />
        <Card
          title={"Penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
          picture={
            "https://media.istockphoto.com/id/1415126482/id/vektor/wanita-dengan-alergi-dari-serbuk-sari-bulu-kucing-jeruk-kacang-tanah-atau-berry-hidung-meler.jpg?s=612x612&w=0&k=20&c=2OTdNl64bXW-Z6lPoPcscJvz47BiSEKuNQtSfn2oBOA="
          }
        />
        <Card
          title={"Penyakit"}
          body={
            "Learn about various sexually transmitteddiseases, their symptoms, and preventionmethods."
          }
          picture={
            "https://media.istockphoto.com/id/1454206700/id/vektor/pria-muda-mengalami-batuk-kering-pria-dengan-asma-alergi-atau-pilek-orang-sakit-pria-dengan.jpg?s=612x612&w=0&k=20&c=0HiK3qJy1GhYMepf8ItZ9Ia6OGwQRq2T44JXhLmVJhA="
          }
        />
      </div>
    </section>
  );
}
