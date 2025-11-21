import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { H1, H2, H3 } from "../components/Text";
/* icons */
import { MdOutlineSick } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaCapsules } from "react-icons/fa";

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
      <Card text={"Jumlah Penyakit"} color={`bg-red-100`}>
        <div className="flex flex-col">
          <H3 variant="text-red-700">{"Jumlah Penyakit"}</H3>
          <H1 variant="text-background">{"0"}</H1>
        </div>
        <MdOutlineSick size={50} className="text-red-700" />
      </Card>
    </main>
  );
}
