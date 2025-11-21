import { useState } from "react";
import { H1, H2, P } from "../components/text";

export default function DiagnosisResults() {
  return (
    <section className="my-15 flex h-100 w-200 flex-col items-center">
      <div className="h-100 w-250">
        <h1 className="text-3xl font-semibold">Hasil Pengecekan Gejala</h1>
        <br />
        <div className="h-100 w-full rounded-xl bg-white p-10 shadow-xl">
          <ProgressBar title={"Nama Penyakit"} />
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
        <h2 className="text-3xl font-semibold">{title}</h2>
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
    <div className="my-10 flex h-50 w-50 rounded bg-green-600 px-5 py-3 shadow-xl">
      <div className="text-background h-full w-full">
        <h2 className="text-2xl">Kepastian</h2>
        <p className="text-5xl font-semibold">{insight}</p>
      </div>
    </div>
  );
};

const Card = ({
  judul = "judul",
  p = "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus.",
}) => {
  return (
    <div className="my-10 flex h-50 w-150 flex-col justify-between rounded bg-green-600 px-5 py-6 shadow-xl">
      <H2>{judul}</H2>
      <P>{p}</P>
    </div>
  );
};
