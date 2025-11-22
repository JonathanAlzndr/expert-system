/* icons */
import { MdDashboard } from "react-icons/md";
import { MdOutlineSick } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaStethoscope } from "react-icons/fa";
import { MdMonitorHeart } from "react-icons/md";

/* components */
import Logo from "./Logo";
import { H1, H2, H4, H3, P } from "./Text";
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
          <H2 variant="black">TanyaPakar</H2>
        </div>
        <ul className="mx-2 flex w-full flex-col gap-2">
          <Li text={"Beranda"} onClick={() => navigate("/admin")}>
            <MdDashboard size={23} className="text-dark" />
          </Li>
          <Li text={"Data Penyakit"} onClick={() => navigate("/admin/deases")}>
            <MdOutlineSick size={23} className="text-dark" />
          </Li>
          <Li text={"Data Gejala"} onClick={() => navigate("/admin/symptom")}>
            <MdMonitorHeart size={23} className="text-dark" />
          </Li>
          <Li text={"Data Aturan"} onClick={() => navigate("/admin/symptom")}>
            <FaStethoscope size={23} className="text-dark" />
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
      className="flex w-full cursor-pointer items-center gap-3 rounded px-2 py-2 hover:bg-gray-300/30 active:bg-gray-300/80"
    >
      {children}
      <H4 variant={"text-dark font-semibold select-none"}>{text}</H4>
    </li>
  );
}
