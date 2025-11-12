import { Outlet } from "react-router";
import HeaderAdmin from "../components/HeaderAdmin";

export default function LayoutAdmin() {
  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
}
