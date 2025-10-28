import Button from "./Button";

export default function Hero() {
  return (
    <>
      <section className="flex h-3/4 w-full flex-col items-center justify-center bg-amber-200 px-60 py-20">
        <h1 className="text-5xl font-bold"> Kesehatan mu, Prioritas kami</h1>
        <br />
        <p className="text-center text-lg">
          Selamat datang di HealthFirst, mitra tepercaya Anda dalam kesehatan
          dan kebugaran.Kami menawarkan berbagai layanan untuk membantu
          Andatetap mendapat informasi dan proaktif tentang kesehatan Anda.
        </p>
        <br />
        <div className="h-20 w-20">
          <Button text={"Lainnya"} color="red" />
        </div>
      </section>
    </>
  );
}
