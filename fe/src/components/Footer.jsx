import { NavLink } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-merahTua flex h-18 w-full border-t border-red-900 text-gray-200/70">
      <div className="flex h-full w-full items-center justify-around">
        <ul className="flex items-center gap-7 text-sm lg:text-base">
          <li>
            <NavLink>Kebijakan privasi</NavLink>
          </li>
          <li>
            <NavLink>Ketentuan layanan</NavLink>
          </li>
          <li>
            <NavLink>Kontak kami</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex h-full w-full items-center justify-end pr-10">
        <p>2025 Fadil</p>
      </div>
    </footer>
  );
}
