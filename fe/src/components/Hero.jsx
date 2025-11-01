import Button from './Button';

export default function Hero() {
  return (
    <>
      <section className="relative flex h-150 w-full items-center justify-center overflow-hidden px-20">
        <img
          src="https://img.freepik.com/free-psd/healthcare-professional-posing-with-first-aid-kit_23-2150110476.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover object-[40%_20%]"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold">Prioritaskan Kesehatan mu</h1>
          <br />
          <p className="text-lg">
            Selamat datang di HealthFirst, mitra tepercaya Anda dalam kesehatan dan kebugaran.Kami
            menawarkan berbagai layanan untuk membantu Anda tetap mendapat informasi dan proaktif
            tentang kesehatan Anda.
          </p>
          <br />
          <div className="h-10 w-20">
            <Button text={'Lainnya'} />
          </div>
        </div>
      </section>
    </>
  );
}
