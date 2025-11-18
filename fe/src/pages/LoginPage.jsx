import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Untuk mendecode token

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State loading untuk tombol
  const [error, setError] = useState(""); // Untuk menyimpan error message

  // Cek token admin saat pertama kali halaman dimuat
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate("/admin"); // Token valid, arahkan ke /admin
        } else {
          localStorage.removeItem("authToken"); // Token kadaluarsa
        }
      } catch (e) {
        localStorage.removeItem("authToken"); // Hapus token jika error
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah form submission default
    setLoading(true);
    setError(""); // Reset error sebelum mencoba login

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data) {
        // Menyimpan token di localStorage setelah login berhasil
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data)); // Menyimpan seluruh data pengguna jika diperlukan

        navigate("/admin"); // Arahkan ke halaman admin setelah login sukses
      }
    } catch (err) {
      if (err.response) {
        // Jika server memberikan respons error
        setError("Error: " + (err.response.data.message || "Login gagal"));
      } else {
        // Jika tidak ada respons dari server
        setError("Terjadi kesalahan: " + err.message);
      }
      console.error(err);
    } finally {
      setLoading(false); // Reset loading setelah proses selesai
    }
  };

  return (
    <div className="box-border flex h-screen w-full items-center justify-center">
      <div className="flex w-lg flex-col items-center rounded-xl p-10">
        <div className="my-1 h-20 w-20 overflow-hidden rounded-full shadow-lg">
          <img
            src={
              "https://media.istockphoto.com/id/1321617070/id/vektor/logo-medis-kesehatan.jpg?s=612x612&w=0&k=20&c=zCH2ajNmvD2Z0peBNjXmY1WoR8bDhvxAgYevGH9U_XI="
            }
            alt="logo.png"
            className="object-cover"
          />
        </div>

        <h1 className="text-3xl font-semibold">Admin Kesehatan</h1>
        <p className="text-lg">Silahkan masuk untuk melanjutkan</p>
        <br />

        <form className="flex w-full flex-col" onSubmit={handleLogin}>
          <Input
            label={"username"}
            type={"text"}
            placeholder={"Username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label={"password"}
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <div className="h-10 w-full">
            <Button text={"Masuk"} color="primary" type="submit" />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Tampilkan error */}
        </form>
      </div>
    </div>
  );
}

function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="my-2 flex flex-col">
      <label className="self-start" htmlFor={label}>
        {placeholder}
      </label>
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Masukan ${placeholder}`}
        className="my-1 transform rounded-sm px-3 py-1 text-lg outline-1 outline-gray-400 transition-all focus:outline-2"
      />
    </div>
  );
}
