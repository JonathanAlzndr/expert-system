export default function Button({ text, onClick, color = "green" }) {
  let variant = "";
  switch (color) {
    case "blue":
      variant = "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 ";
      break;
    case "red":
      variant = "bg-red-600 hover:bg-red-700 active:bg-blue-800 ";
      break;
    default:
      variant = "bg-green-600 hover:bg-green-700 active:bg-green-800 ";
  }
  return (
    <button
      className={`${variant} mt-5 h-10 cursor-pointer rounded-lg px-2 text-xs text-white shadow-lg text-shadow-md active:scale-93 lg:text-base`}
      onClick={onClick}
    >
      <b>{text}</b>
    </button>
  );
}
