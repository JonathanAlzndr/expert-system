import { NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { TbTableShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Logo from "./Logo";
import { CiLogout } from "react-icons/ci";
import { removeToken } from "../utils/auth";

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };
  return (
    <>
      <aside className="flex h-screen w-65 flex-col items-start gap-10 p-4">
        <div className="flex flex-col items-center self-center">
          <Logo size={10} />
          <h1 className="text-2xl font-semibold">TanyaPakar</h1>
        </div>
        <ul className="my-2 flex flex-col gap-3">
          <Li text={"Beranda"}>
            <MdDashboard size={25} className="text-green-700" />
          </Li>
          <Li text={"Data Penyakit"}>
            <RiProfileLine size={25} />
          </Li>
          <Li text={"Data Gejala"}>
            <GoProjectSymlink size={25} />
          </Li>
          <Li text={"Data Aturan"}>
            <TbTableShare size={25} />
          </Li>
          <Li text={"Keluar"} onClick={handleLogout}>
            <CiLogout size={25} className="text-red-600" />
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
      className="flex cursor-pointer items-center gap-6 hover:scale-101 active:scale-99"
    >
      {children}
      <p className="text-base text-shadow-sm">{text}</p>
    </li>
  );
}
