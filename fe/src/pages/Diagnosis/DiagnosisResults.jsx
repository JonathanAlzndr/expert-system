import { useState } from "react";

export default function DiagnosisResults() {
  return (
    <section className="my-15 flex h-100 w-200 flex-col items-center">
      <div className="h-100 w-250">
        <h1 className="text-3xl font-semibold">Hasil Pengecekan Gejala</h1>
        <br />
        <div className="h-100 w-full rounded-xl bg-white p-10 shadow-xl">
          <ProgressBar title={"Proses Diagnosis"} />
          <div className="flex justify-between">
            <Insight />
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
}
const ProgressBar = ({ title }) => {
  const [progress, setProgress] = useState("Terselesaikan");
  return (
    <>
      <div className="mx-2 flex items-center justify-between">
        <h2 className="text-2xl">{title}</h2>
        <p>{progress}</p>
      </div>
      <div class="relative my-2 h-5 overflow-hidden rounded-full bg-gray-300">
        <div class="absolute top-0 bottom-0 left-0 w-10 rounded-full bg-green-500"></div>
      </div>
    </>
  );
};

const Insight = () => {
  const [insight, setInsight] = useState("80%");
  return (
    <div className="my-10 flex h-50 w-50 rounded bg-green-600 px-5 py-3">
      <div className="text-background h-full w-full">
        <h2 className="text-2xl">Kepastian</h2>
        <p className="text-5xl font-semibold">{insight}</p>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="my-10 flex h-50 w-150 justify-between rounded bg-green-600 px-5 py-6">
      <div className="text-background h-full w-full">
        <h2 className="text-2xl font-semibold">Lorem</h2>
        <h3 className="text-xl font-semibold">Lorem ipsum dolor sit.</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
          similique. Lorem ipsum dolor sit amet.
        </p>
      </div>
      <div className="mx-2 h-30 w-100 self-end overflow-hidden rounded-lg border-2 border-green-900">
        <img
          src={
            "https://media.istockphoto.com/id/1421878861/id/vektor/batuk-pria-muda-yang-sakit-terisolasi-ilustrasi-kartun-gaya-datar-vektor.jpg?s=612x612&w=0&k=20&c=Rzpcjk_dR3TsnSzKiLB5xyqQYA8jr_B4emkwt1Y6dNo="
          }
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
    </div>
  );
};
