import React from "react";

const Card = ({ children, className = "" }) => {
	return (
		<div
			className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
		>
			{children}
		</div>
	);
};

export default Card;
