import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/Card";
import { MdOutlineSick } from "react-icons/md";

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
    <main>
      <Card text={"Jumlah Penyakit"}>
        <MdOutlineSick size={40} className="text-white" />
      </Card>
    </main>
  );
}
