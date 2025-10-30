export default function Button({ text, onClick, color = "green" }) {
  let variant = "";
  switch (color) {
    case "blue":
      variant = "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white";
      break;
    case "red":
      variant = "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white";
      break;
    case "secondRed":
      variant =
        "bg-merahTua2 font-light hover:bg-red-500 active:bg-red-900 active:text-red-900 text-red-500 hover:text-red-900";
      break;
    default:
      variant =
        "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white";
  }
  return (
    <button
      className={`${variant} h-full w-full cursor-pointer rounded-sm text-xs shadow-lg text-shadow-md active:scale-98 lg:text-sm`}
      onClick={onClick}
    >
      <b>{text}</b>
    </button>
  );
}
