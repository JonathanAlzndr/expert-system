import { Outlet } from "react-router";
import SideBar from "../components/Sidebar";

export default function LayoutAdmin() {
  return (
    <>
      <main className="flex">
        <div className="w-100">
          <SideBar />
        </div>
        <div className="min-w-full">
          <Outlet />
        </div>
      </main>
    </>
  );
}
