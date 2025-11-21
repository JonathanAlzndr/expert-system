import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
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
      <Card text={"Jumlah Penyakit"} color={`bg-red-600`}>
        <MdOutlineSick size={40} className="text-white" />
      </Card>
      <Card text={"Jumlah Gejala"} color={`bg-green-600`}>
        <FaCapsules size={40} className="text-white" />
      </Card>
      <Card text={"Jumlah Aturan"} color={`bg-yellow-500`}>
        <IoSettings size={40} className="text-white" />
      </Card>
    </main>
  );
}
