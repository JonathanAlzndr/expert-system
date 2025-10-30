import { Link, NavLink } from "react-router";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function HeaderUser() {
  return (
    <>
      <header
        className={`bg-white sticky top-0 z-50 flex h-16 w-full border-b-\[1px] border border-red-600/40 backdrop-blur-sm items-center justify-between p-3 text-black transition-colors duration-300 sm:p-4 lg:p-5`}
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

        <div className="flex w-full gap-6 justify-center items-center">
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
          <button className="active:scale-90 cursor-pointer">
            <IoMdNotificationsOutline
              size={25}
              className="text-shadow-gray-900"
            />
          </button>
          <div className=" rounded-full bg-gray-800 h-10 w-10 ">
            <img src="" alt="" className="" />
          </div>
        </div>
      </header>
    </>
  );
}
