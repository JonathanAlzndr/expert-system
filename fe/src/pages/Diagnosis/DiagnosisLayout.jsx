import { Outlet } from "react-router";
import HeaderAdmin from "./../../components/HeaderAdmin";

export default function DiagnosisLayout() {
  return (
    <>
      <HeaderAdmin />
      <main className="mx-auto flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
}
