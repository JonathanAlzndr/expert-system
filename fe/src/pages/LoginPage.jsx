import Button from "../../components/Button";

export default function LoginPage() {
  return (
    <>
      <div className="box-border flex h-screen w-full items-center justify-center">
        <div className="flex w-sm flex-col items-center">
          <img src={""} alt="logo.png" />
          <h1 className="text-3xl font-semibold">Health Admin</h1>
          <p className="text-lg">Please log in to continue</p>
          <br />
          <div className="flex w-full flex-col">
            <Input label={"username"} type={"text"} placeholder={"Username"} />
            <br />
            <Input label={"password"} type={"text"} placeholder={"Password"} />
            <br />
            <Button text={"Login"} color="blue" />
          </div>
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
        placeholder={`Enter your ${placeholder}`}
        className="my-1 transform rounded-sm px-3 py-1 text-lg outline-1 outline-gray-400 transition-all focus:outline-2"
      />
    </>
  );
}
