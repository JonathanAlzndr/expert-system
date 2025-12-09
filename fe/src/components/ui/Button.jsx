import React from "react";

const Button = ({ children, onClick, variant = "primary", className = "", ...props }) => {
	const baseClasses =
		"px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform active:scale-95";

	const variants = {
		primary: "bg-[#176b87] text-white hover:bg-[#0e4b5f] shadow-lg shadow-[#176b87]/30",
		secondary: "bg-[#b4d4ff] text-[#071c23] hover:bg-[#9bc5ff]",
		danger: "bg-red-500 text-white hover:bg-red-600 shadow-red-500/30",
		outline: "border-2 border-[#176b87] text-[#176b87] hover:bg-[#176b87] hover:text-white",
	};

	// Jika variant tidak ada di object, fallback ke primary, atau biarkan custom class menangani
	const variantClass = variants[variant] || variants.primary;

	return (
		<button onClick={onClick} className={`${baseClasses} ${variantClass} ${className}`} {...props}>
			{children}
		</button>
	);
};

export default Button;
