import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { H1, H2, H3, P } from "../components/Text";

export default function Diagnosis() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/diagnosis/pertanyaan",
          { method: "GET" }
        );

        const data = await res.json();
        setQuestions(data.pertanyaanList);
      } catch (err) {
        alert(err);
      }
    };

    if (isAuthenticated()) {
      navigate("/admin", { replace: true });
      return;
    }

    fetchQuestions();
  }, []);

  return (
    <section className="mt-10 flex h-145 w-200 flex-col overflow-hidden rounded-lg bg-white px-7 py-6 shadow-lg">
      <H1 variant="black">Pengecekan Gejala</H1>
      <br />
      <P>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, ducimus.
      </P>
      <br />

      <form action="" className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="flex h-85 w-full flex-col gap-4 overflow-y-auto">
          {/* RENDER DINAMIS */}
          {questions.map((q) => (
            <Input
              key={q.id_gejala}
              id={q.id_gejala}
              question={q.teks_pertanyaan}
            >
              <Option value={"Tidak"} />
              <Option value={"Kurang Yakin"} />
              <Option value={"Yakin"} />
              <Option value={"Sangat Yakin"} />
            </Input>
          ))}
        </div>

        <div className="mt-8 h-11 w-full">
          {/* to do */}
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

function Input({ id, question, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="text-lg font-semibold">
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
          className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown size={14} />
        </span>
      </div>
    </div>
  );
}

function Option({ value }) {
  return <option value="value">{value}</option>;
}
