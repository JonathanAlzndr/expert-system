import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
/* components */
import { Card } from "../components/Card";
import { H1, H2, H3 } from "../components/Text";
/* icons */
import { MdOutlineSick } from "react-icons/md";
import { MdWarningAmber } from "react-icons/md";
import { MdMonitorHeart } from "react-icons/md";

export default function DashboardAdmin() {
  const [penyakitData, setPenyakitData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Jika token tidak valid, arahkan ke login
    if (false) {
      navigate("/login");
    } else {
      fetchPenyakitData(); // Ambil data penyakit jika token valid
    }
  }, [navigate]);

  const fetchPenyakitData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:5000/api/penyakit", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPenyakitData(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
      window.alert("Gagal memuat data penyakit.");
    }
  };

  return (
    <main className="flex gap-10 p-10">
      <Card color={`bg-red-100`}>
        <div className="flex flex-col">
          <H3 variant="text-red-800">{"Jumlah Penyakit"}</H3>
          <H1 variant="text-red-800">{"0"}</H1>
        </div>
        <MdOutlineSick size={50} className="text-red-800" />
      </Card>
      <Card color={`bg-green-100`}>
        <div className="flex flex-col">
          <H3 variant="text-green-800">{"Jumlah Gejala"}</H3>
          <H1 variant="text-green-800">{"0"}</H1>
        </div>
        <MdMonitorHeart size={50} className="text-green-800" />
      </Card>
      <Card color={`bg-yellow-100`}>
        <div className="flex flex-col">
          <H3 variant="text-yellow-800">{"Jumlah Aturan"}</H3>
          <H1 variant="text-yellow-800">{"0"}</H1>
        </div>
        <MdWarningAmber size={50} className="text-yellow-800" />
      </Card>
    </main>
  );
}
