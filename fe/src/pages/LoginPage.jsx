import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /*  const handleLogin = async (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/api/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => alert(res.data))
      .catch((err) => console.error(`error guys: ${err}`));
  }; */

  const handleLogin = async (e) => {
    e.preventDefault(); // Pastikan untuk mencegah form default submission
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        window.alert("Berhasil: " + JSON.stringify(data)); // Perlihatkan data yang diterima dari server
      } else {
        const errorData = await res.json();
        window.alert("Error: " + errorData.message || "Login gagal"); // Menangani error jika ada
      }
    } catch (err) {
      console.error(err);
      window.alert("Terjadi kesalahan: " + err.message); // Menampilkan pesan error jika ada masalah saat request
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
