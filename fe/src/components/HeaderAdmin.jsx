import { Link, NavLink } from "react-router";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function HeaderAdmin() {
  return (
    <>
      <header
        className={`border-b-\[1px] border-primary sticky top-0 z-50 flex h-16 w-full items-center justify-between border bg-white p-3 text-black backdrop-blur-sm transition-colors duration-300 sm:p-4 lg:p-5`}
      >
        <div className="flex w-full justify-center">
          <img src={"/"} alt="logo.png" />
          <Link
            className="mx-5 cursor-pointer text-base font-bold hover:opacity-80 active:scale-90 lg:text-xl"
            to={"/"}
          >
            Kesehatan Utama
          </Link>
        </div>

        <div className="flex w-full items-center justify-center gap-6 font-semibold">
          <ul className="flex items-center gap-7 text-sm lg:text-sm">
            <li>
              <NavLink to={"/diagnosis"}>Beranda</NavLink>
            </li>
            <li>
              <NavLink to={"/diagnosis/questions"}>Pengecekan</NavLink>
            </li>
            <li>
              <NavLink to={"/diagnosis/results"}>Hasil</NavLink>
            </li>
          </ul>
          <div className="h-10 w-10 rounded-full bg-gray-800"></div>
        </div>
      </header>
    </>
  );
}
