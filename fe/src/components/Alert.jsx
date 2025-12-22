import React from "react";

const Alert = ({ message, type = "error" }) => {
	if (!message) return null;

	const styles = {
		error: "bg-red-100 border-red-400 text-red-700",
		success: "bg-green-100 border-green-400 text-green-700",
		warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
	};

	return (
		<div
			className={`${styles[type] || styles.error} border px-4 py-3 rounded mb-4 relative`}
			role="alert"
		>
			<span className="block sm:inline">{message}</span>
		</div>
	);
};

export default Alert;
