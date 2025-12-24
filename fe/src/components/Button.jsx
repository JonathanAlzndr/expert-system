import React from "react";
function Button({ type, onClick, children }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-primary py-2 w-full rounded-lg font-semibold active:scale-98 text-white flex items-center justify-center shadow-lg cursor-pointer `}
		>
			{children}
		</button>
	);
}

export default Button;
