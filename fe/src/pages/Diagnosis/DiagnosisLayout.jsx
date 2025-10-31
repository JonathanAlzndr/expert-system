import HeaderUser from "./components/HeaderUser";
import { Outlet } from "react-router";

export default function DiagnosisLayout() {
  return (
    <>
      <HeaderUser />
      <main className="flex flex-col justify-center mx-auto">
        <Outlet />
      </main>
    </>
  );
}
