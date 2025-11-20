import { NavLink, useNavigate } from "react-router";
import { MdDashboard } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { GoProjectSymlink } from "react-icons/go";
import { TbTableShare } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import Logo from "./Logo";
import { CiLogout } from "react-icons/ci";

export default function SideBar() {
  const navigate = useNavigate();
  return (
    <>
      <aside className="flex h-screen w-70 flex-col items-start gap-10 p-4">
        <div className="flex flex-col items-center self-center">
          <Logo size={"13"} />
          <h1 className="text-3xl font-semibold">TanyaPakar</h1>
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
          <Li text={"Keluar"}>
            <CiLogout size={25} className="text-red-600" />
          </Li>
        </ul>
      </aside>
    </>
  );
}

function Li({ children, text }) {
  return (
    <li className="flex cursor-pointer items-center gap-6 hover:scale-102 active:scale-97 lg:text-lg">
      {children}
      <p className="text-xl text-shadow-sm">{text}</p>
    </li>
  );
}
