import { Link, NavLink, useNavigate } from "react-router";
import Button from "./Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header
        className={`border-primary sticky top-0 z-50 flex h-16 w-full items-center justify-around border-b bg-white p-3 text-black backdrop-blur-2xl sm:p-4 lg:p-5`}
      >
        <div className="flex w-xs">
          <img src={"/"} alt="logo.png" />
          <Link
            className="mx-5 cursor-pointer text-base font-semibold hover:opacity-70 active:scale-90 lg:text-xl"
            to={"/"}
          >
            Kesehatan Utama
          </Link>
        </div>

        <ul className="flex items-center gap-7 text-sm font-semibold lg:text-base">
          <li>
            <NavLink className="hover:text-primary">Beranda</NavLink>
          </li>
          <li>
            <NavLink className="hover:text-primary">Layanan</NavLink>
          </li>
          <li>
            <NavLink className="hover:text-primary">Tentang Kami</NavLink>
          </li>
          <li>
            <NavLink className="hover:text-primary">Kontak</NavLink>
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
