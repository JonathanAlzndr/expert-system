import { Link, NavLink } from "react-router";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function HeaderUser() {
  return (
    <>
      <header
        className={`border-b-\[1px] sticky top-0 z-50 flex h-16 w-full items-center justify-between border border-green-600/40 bg-white p-3 text-black backdrop-blur-sm transition-colors duration-300 sm:p-4 lg:p-5`}
      >
        <div className="flex w-full justify-center">
          <img src={"/"} alt="logo.png" />
          <Link
            className="mx-5 cursor-pointer text-base font-bold hover:opacity-70 active:scale-90 lg:text-xl"
            to={"/"}
          >
            Kesehatan Utama
          </Link>
        </div>

        <div className="flex w-full items-center justify-center gap-6">
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
          <button className="cursor-pointer active:scale-90">
            <IoMdNotificationsOutline
              size={25}
              className="text-shadow-gray-900"
            />
          </button>
          <div className="h-10 w-10 rounded-full bg-gray-800"></div>
        </div>
      </header>
    </>
  );
}
