import { Outlet } from "react-router";
import SideBar from "../components/Sidebar";

export default function LayoutAdmin() {
  return (
    <>
      <main className="flex">
        <div className="">
          <SideBar />
        </div>
        <div className="flex w-full flex-col items-center">
          <Outlet />
        </div>
      </main>
    </>
  );
}
