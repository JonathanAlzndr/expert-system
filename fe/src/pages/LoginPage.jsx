import { useEffect } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1050,
    });
  }, []);
  return (
    <>
      <div
        className="box-border flex h-screen w-full items-center justify-center"
        data-aos="zoom-out"
      >
        <div className="flex w-sm flex-col items-center">
          <div className="my-1 h-20 w-20 overflow-hidden rounded-full">
            <img
              src={
                "https://media.istockphoto.com/id/1321617070/id/vektor/logo-medis-kesehatan.jpg?s=612x612&w=0&k=20&c=zCH2ajNmvD2Z0peBNjXmY1WoR8bDhvxAgYevGH9U_XI="
              }
              alt="logo.png"
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-semibold">Admin Kesehatan</h1>
          <p className="text-lg">Silahkan masuk untuk melanjutkan</p>
          <br />
          <form className="flex w-full flex-col">
            <Input label={"username"} type={"text"} placeholder={"Username"} />
            <Input label={"password"} type={"text"} placeholder={"Password"} />
            <br />
            <div className="h-10 w-full">
              <Button
                text={"Masuk"}
                onClick={() => navigate({ pathname: "/diagnosis" })}
                color="primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Input({ label, type, placeholder }) {
  return (
    <div className="my-2 flex flex-col">
      <label className="self-start" htmlFor={label}>
        {placeholder}
      </label>
      <input
        id={label}
        type={type}
        placeholder={`Masukan ${placeholder}`}
        className="my-1 transform rounded-sm px-3 py-1 text-lg outline-1 outline-gray-400 transition-all focus:outline-2"
      />
    </div>
  );
}
