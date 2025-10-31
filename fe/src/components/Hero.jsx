import Button from "./Button";

export default function Hero() {
	return (
		<>
			<section className="flex h-150 w-full flex-col items-center justify-center px-60 py-24 text-white bg-black">
				<h1 className="text-5xl font-bold"> Kesehatan mu, Prioritas kami</h1>
				<br />
				<p className="text-center text-lg">
					Selamat datang di HealthFirst, mitra tepercaya Anda dalam kesehatan dan kebugaran.Kami
					menawarkan berbagai layanan untuk membantu Andatetap mendapat informasi dan proaktif
					tentang kesehatan Anda.
				</p>
				<br />
				<div className="h-11 w-20">
					<Button text={"Lainnya"} color="red" />
				</div>
			</section>
		</>
	);
}
