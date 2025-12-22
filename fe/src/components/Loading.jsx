import React from "react";

export function Loading() {
	return (
		<div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-30 z-50">
			<div className="w-14 h-14 border-4 border-gray-300 border-t-4 border-t-primary rounded-full animate-spin"></div>
		</div>
	);
}

export default Loading;
