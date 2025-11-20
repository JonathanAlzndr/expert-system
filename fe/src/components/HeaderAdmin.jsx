import { Link, NavLink } from "react-router";

export default function HeaderAdmin() {
  return (
    <>
      <header
        className={`border-b-\[1px] border-primary sticky top-0 z-50 flex h-16 w-full items-center justify-between border bg-white p-3 text-black backdrop-blur-sm transition-colors duration-300 sm:p-4 lg:p-5`}
      >
        <div className="flex w-full items-center justify-center">
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
            className="mx-5 cursor-pointer text-base font-semibold hover:opacity-80 active:scale-95 lg:text-xl"
            to={"/"}
          >
            Kesehatan Utama
          </Link>
        </div>

        <div className="flex w-full items-center justify-center gap-6 font-semibold">
          <ul className="flex items-center gap-7 text-sm lg:text-sm">
            <li>
              <NavLink className={"hover:text-primary"} to={"/admin"}>
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink className={"hover:text-primary"} to={"/admin/deases"}>
                Penyakit
              </NavLink>
            </li>
          </ul>
          <button className="cursor-pointer active:scale-90" onClick={() => {}}>
            <div className="h-10 w-10 rounded-full">
              <img
                src="https://media.istockphoto.com/id/1300845620/id/vektor/ikon-pengguna-datar-terisolasi-pada-latar-belakang-putih-simbol-pengguna-ilustrasi-vektor.jpg?s=612x612&w=0&k=20&c=QN0LOsRwA1dHZz9lsKavYdSqUUnis3__FQLtZTQ--Ro="
                alt="profile.jpg"
                className="object-cover"
              />
            </div>
          </button>
        </div>
      </header>
    </>
  );
}
