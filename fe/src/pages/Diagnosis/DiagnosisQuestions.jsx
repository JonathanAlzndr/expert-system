import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./../../components/Button";
import { useNavigate } from "react-router";

export default function DiagnosisQuestions() {
  const navigate = useNavigate();
  return (
    <section className="mt-10 flex h-170 w-180 flex-col rounded-lg bg-white px-7 py-6 shadow-lg">
      <h1 className="mb-2 text-3xl font-bold">Pengecekan Gejala</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus.
      </p>
      <br />
      <form action="" className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 flex w-full justify-center gap-12">
          <div className="flex w-full flex-col gap-5">
            <Input question="Pertanyaan 1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
            <Input question="Pertanyaan 1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>

            <Input question="Pertanyaan 1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
            <Input question="Pertanyaan 1">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Input>
          </div>
          <div className="flex w-full flex-col gap-5">
            <Input question="Pertanyaan 2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Input>
            <Input question="Pertanyaan 2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Input>
            <Input question="Pertanyaan 2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Input>
            <Input question="Pertanyaan 2">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Input>
          </div>
        </div>
        <Input question="Pertanyaan 3">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </Input>
        <div className="mt-10 h-11 w-full">
          <Button
            text={"kirim"}
            color={"green"}
            onClick={() => navigate({ pathname: "/diagnosis/results" })}
          />
        </div>
      </form>
    </section>
  );
}

function Input({ id, question = "Pertanyaan?", children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="font-medium">
        {question}
      </label>

      <div className="relative">
        <select
          id={id}
          onClick={() => setIsOpen((prev) => !prev)}
          onBlur={() => setIsOpen(false)}
          className="border-primary/20 bg-background-light dark:bg-background-dark dark:border-primary/30 focus:ring-primary focus:border-primary mt-1 w-full cursor-pointer appearance-none rounded border px-3 py-2 transition-all"
        >
          <option value="">Pilih opsi</option>
          {children}
        </select>

        <span
          className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <FaChevronDown size={14} />
        </span>
      </div>
    </div>
  );
}
