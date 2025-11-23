import React from "react";

const FormInput = ({ label, type = "text", ...props }) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 mb-2">{label}</label>
			<input
				type={type}
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
				{...props}
			/>
		</div>
	);
};

export default FormInput;
