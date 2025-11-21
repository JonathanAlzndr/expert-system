import { Link, useNavigate } from "react-router";
import Button from "./Button";
import { H2 } from "../components/Text";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={`border-primary sticky top-0 z-50 flex h-16 w-full items-center justify-around border-b bg-white p-3 text-black backdrop-blur-2xl sm:p-4 lg:p-5`}
      >
        <div className="flex w-xs items-center">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={
                "https://media.istockphoto.com/id/1321617070/id/vektor/logo-medis-kesehatan.jpg?s=612x612&w=0&k=20&c=zCH2ajNmvD2Z0peBNjXmY1WoR8bDhvxAgYevGH9U_XI="
              }
              alt="logo.png"
              className="object-cover"
            />
          </div>
          <Link
            className="mx-5 cursor-pointer text-base font-semibold hover:opacity-70 active:scale-95 lg:text-xl"
            to={"/"}
          >
            <H2 variant="text">TanyaPakar</H2>
          </Link>
        </div>

        <ul className="flex items-center gap-7 text-sm font-semibold lg:text-base">
          <li>
            <a href="#" className="hover:text-primary">
              Beranda
            </a>
          </li>
          <li>
            <a href="#information" className="hover:text-primary">
              Informasi Penyakit
            </a>
          </li>
        </ul>
        <div className="ml-10 flex w-3xs justify-center">
          <div className="h-9 w-20">
            <Button
              color="primary"
              text={"Masuk"}
              onClick={() => {
                navigate("/login");
              }}
            />
          </div>
        </div>
      </header>
    </>
  );
}
