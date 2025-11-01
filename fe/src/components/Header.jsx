import { Link, NavLink, useNavigate } from "react-router";
import Button from "./Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex h-16 w-full items-center justify-around border-green-900 bg-white p-3 text-black backdrop-blur-2xl transition-colors duration-300 sm:p-4 lg:p-5`}
      >
        <div className="flex w-xs">
          <img src={"/"} alt="logo.png" />
          <Link
            className="mx-5 cursor-pointer text-base font-bold hover:opacity-70 active:scale-90 lg:text-xl"
            to={"/"}
          >
            Kesehatan Utama
          </Link>
        </div>

        <ul className="flex items-center gap-7 text-sm lg:text-sm">
          <li>
            <NavLink>Beranda</NavLink>
          </li>
          <li>
            <NavLink>Layanan</NavLink>
          </li>
          <li>
            <NavLink>Tentang Kami</NavLink>
          </li>
          <li>
            <NavLink>Kontak</NavLink>
          </li>
        </ul>
        <div className="ml-10 flex w-3xs justify-center">
          <div className="h-9 w-20">
            <Button
              color="primary"
              text={"Masuk"}
              onClick={() => navigate({ pathname: "/login" })}
            />
          </div>
        </div>
      </header>
    </>
  );
}
