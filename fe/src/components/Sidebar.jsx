/* icons */
import { MdDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { TbTableShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
/* components */
import Logo from "./Logo";
import { H4, H3, P } from "./Text";
import { NavLink, useNavigate } from "react-router";

/* utils */
import { removeToken } from "../utils/auth";

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };
  return (
    <>
      <aside className="flex h-screen w-65 flex-col items-start gap-10 border-r-2 border-gray-300 px-4 py-4 shadow-xl">
        <div className="flex flex-col items-center self-center">
          <Logo size={10} />
          <h1 className="text-2xl font-semibold">TanyaPakar</h1>
        </div>
        <ul className="flex w-full flex-col gap-2">
          <Li text={"Beranda"}>
            <MdDashboard size={23} className="text-green-700" />
          </Li>
          <Li text={"Data Penyakit"}>
            <RiProfileLine size={23} />
          </Li>
          <Li text={"Data Gejala"}>
            <GoProjectSymlink size={23} />
          </Li>
          <Li text={"Data Aturan"}>
            <TbTableShare size={23} />
          </Li>
          <Li text={"Keluar"} onClick={handleLogout}>
            <CiLogout size={23} className="text-red-600" />
          </Li>
        </ul>
      </aside>
    </>
  );
}

function Li({ children, text, onClick }) {
  return (
    <li
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-200/60"
    >
      {children}
      <H4 variant={"black select-none"}>{text}</H4>
    </li>
  );
}
