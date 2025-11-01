import Button from "./Button";

export default function Hero() {
  return (
    <>
      <section className="flex h-110 w-full items-center justify-center px-50">
        <div className="text-background flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold">
            Prioritaskan Kesehatan mu
          </h1>
          <br />
          <p className="text-lg">
            Selamat datang di HealthFirst, mitra tepercaya Anda dalam kesehatan
            dan kebugaran.Kami menawarkan berbagai layanan untuk membantu Anda
            tetap mendapat informasi dan proaktif tentang kesehatan Anda.
          </p>
          <br />
          <div className="h-10 w-30">
            <Button text={"Lainnya"} color="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
