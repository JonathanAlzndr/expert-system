export default function Button({ text, color, onClick, type = "button" }) {
  let variant = "";
  switch (color) {
    case "black":
      variant =
        "bg-black hover:bg-black/70 active:bg-black text-white text-shadow-sm";
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
      className={`${variant} h-full w-full cursor-pointer rounded text-xs shadow-lg active:scale-98 lg:text-sm`}
      type={type}
      onClick={onClick}
    >
      <b>{text}</b>
    </button>
  );
}
