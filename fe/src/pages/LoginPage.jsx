// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { setToken, isAuthenticated } from "../utils/auth";
import Button from "../components/Button";
import { H1 } from "./../components/Text";
import Logo from "./../components/Logo";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Jika user sudah login, lempar ke /admin
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Ambil token dari backend
      const token = res.data?.token;

      if (!token) {
        setError("Token tidak ditemukan pada response backend.");
        return;
      }

      // Simpan token (menggunakan auth.js)
      setToken(token);

      // Jika ingin menyimpan data user
      localStorage.setItem("userData", JSON.stringify(res.data));

      // Arahkan ke admin
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login gagal. Periksa username/password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-border flex h-screen w-full items-center justify-center">
      <div className="flex w-lg flex-col items-center rounded-xl p-10">
        <Logo size={20} />

        <br />
        <H1 variant="black">Masuk TanyaPakar</H1>
        <br />

        <form className="flex w-full flex-col" onSubmit={handleLogin}>
          <Input
            label="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />

          <div className="mb-2 h-10 w-full">
            <Button
              text={loading ? "Loading..." : "Masuk"}
              color="primary"
              type="submit"
            />
          </div>

          {error && <p className="text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}

function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="my-2 flex flex-col">
      <input
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Masukan ${placeholder}`}
        className="my-2 transform rounded-sm px-2 py-3 text-lg outline-2 outline-gray-500 transition-all focus:bg-slate-200/20 focus:outline-3"
      />
    </div>
  );
}
