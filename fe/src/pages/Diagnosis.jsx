import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import { H1, H2, H3, H4, P } from "../components/Text";
import Alert from "../components/Alert";

export default function Diagnosis() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [alert, setAlert] = useState(true);

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
  if (alert) {
    return <Alert onClick={() => setAlert((a) => !a)} />;
  } else {
    return (
      <>
        <section className="mt-10 flex h-145 w-200 flex-col overflow-hidden rounded-lg bg-white px-14 py-7 shadow-lg">
          <H1 variant="black">Pengecekan Gejala</H1>
          <H4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex,
            ducimus.
          </H4>
          <br />
          <form
            action=""
            className="w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex h-85 w-full flex-col gap-8 overflow-y-auto">
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
      </>
    );
  }
}

function Input({ id, question, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label htmlFor={id}>
        <P variant="text-text "> {question}</P>
      </label>

      <div className="relative">
        <select
          id={id}
          onClick={() => setIsOpen((prev) => !prev)}
          onBlur={() => setIsOpen(false)}
          className="border-primary/20 dark:bg-background-dark dark:border-primary/30 focus:ring-primary focus:border-primary mt-1 w-full cursor-pointer appearance-none rounded-lg border bg-slate-100/50 px-4 py-3 transition-all"
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
