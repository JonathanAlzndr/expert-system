export default function Button({ text, color, onClick, type = "button" }) {
  let variant = "";
  switch (color) {
    case "blue":
      variant = "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white";
      break;
    case "primary":
      variant = "bg-primary hover:bg-primary/90 active:bg-primary text-white";
      break;
    case "secondary":
      variant = "bg-white hover:bg-white/90 active:bg-white text-primary";
      break;
    default:
      variant = "bg-primary hover:bg-primary/90 active:bg-primary text-white";
  }

  return (
    <button
      className={`${variant} h-full w-full cursor-pointer rounded-sm text-xs shadow-lg active:scale-98 lg:text-sm`}
      type={type}
      onClick={onClick}
    >
      <b>{text}</b>
    </button>
  );
}
