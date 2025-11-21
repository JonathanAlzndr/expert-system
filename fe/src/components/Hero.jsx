import Button from "./Button";
import { useNavigate } from "react-router";
import { P, H1 } from "./text";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex h-110 w-full items-center justify-center px-50">
        <div className="text-background flex flex-col items-center justify-center text-center">
          <H1>Prioritaskan Kesehatan mu</H1>
          <br />
          <P>
            Selamat datang di HealthFirst, mitra tepercaya Anda dalam kesehatan
            dan kebugaran.Kami menawarkan berbagai layanan untuk membantu Anda
            tetap mendapat informasi dan proaktif tentang kesehatan Anda.
          </P>
          <br />
          <div className="h-10 w-50">
            <Button
              text={"Mulai Diagnosis Sekarang"}
              onClick={() => navigate({ pathname: "/diagnosis" })}
              color="secondary"
            />
          </div>
        </div>
      </section>
    </>
  );
}
