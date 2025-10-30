import HeaderUser from "./components/HeaderUser";
import { Outlet } from "react-router";

export default function DiagnosisLayout() {
  return (
    <>
      <HeaderUser />
      <main>
        <Outlet />
      </main>
    </>
  );
}
