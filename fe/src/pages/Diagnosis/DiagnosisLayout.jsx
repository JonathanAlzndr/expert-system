import { Outlet } from 'react-router';
import HeaderUser from './../../components/HeaderUser';

export default function DiagnosisLayout() {
  return (
    <>
      <HeaderUser />
      <main className="mx-auto flex flex-col justify-center">
        <Outlet />
      </main>
    </>
  );
}
