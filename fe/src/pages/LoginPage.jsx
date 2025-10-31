import Button from "../components/Button";

export default function LoginPage() {
  return (
    <>
      <div className="box-border flex h-screen w-full items-center justify-center">
        <div className="flex w-sm flex-col items-center">
          <img src={""} alt="logo.png" />
          <h1 className="text-3xl font-semibold">Kesehatan Admin</h1>
          <p className="text-lg">Silahkan masuk untuk melanjutkan</p>
          <br />
          <form className="flex w-full flex-col">
            <Input label={"username"} type={"text"} placeholder={"Username"} />
            <br />
            <Input label={"password"} type={"text"} placeholder={"Password"} />
            <br />
            <div className="h-9 w-full">
              <Button text={"Masuk"} color="blue" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function Input({ label, type, placeholder }) {
  return (
    <>
      <label className="self-start" htmlFor={label}>
        {placeholder}
      </label>
      <input
        id={label}
        type={type}
        placeholder={`Masukan ${placeholder}`}
        className="my-1 transform rounded-sm px-3 py-1 text-lg outline-1 outline-gray-400 transition-all focus:outline-2"
      />
    </>
  );
}
