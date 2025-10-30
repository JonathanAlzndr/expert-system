export default function HeaderUser() {
  return (
    <>
      <header
        className={`bg-merahTua sticky top-0 z-50 flex h-16 w-full border-b-\[1px] border-red-900 backdrop-blur-sm items-center justify-around p-3 text-slate-100 transition-colors duration-300 sm:p-4 lg:p-5`}
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
        <div className="flex w-3xs justify-center ml-10">
          <div className="w-20 h-9">
            <Button
              color="red"
              text={"Masuk"}
              onClick={() => navigate({ pathname: "/login" })}
            />
          </div>
        </div>
      </header>
    </>
  );
}
