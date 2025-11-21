// components/DisclaimerPopup.jsx
import { useEffect } from "react";
import { IoMdAlert } from "react-icons/io";
import Button from "./Button";
import { P } from "./Text";

export default function Alert({ onClick }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-150 rounded-xl bg-white p-6 text-center shadow-lg">
        <IoMdAlert size={50} className="mx-auto mb-3 text-4xl text-black" />

        <P variant="text-black">
          Dengan menggunakan sistem ini, Anda setuju bahwa hasil yang diberikan
          bukanlah pengganti diagnosis medis profesional. Untuk informasi lebih
          lanjut, konsultasikan dengan dokter atau tenaga medis terkait.
        </P>
        <br />
        <div className="mx-auto h-8 w-25">
          <Button onClick={onClick} color={"black"} text={"lanjut"}></Button>
        </div>
      </div>
    </div>
  );
}
