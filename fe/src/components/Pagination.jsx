import React from "react";

const Pagination = ({ page, totalPages, onNext, onPrev, loading }) => {
	return (
		<div className="flex justify-between items-center mt-4 px-2">
			<span className="text-sm text-gray-600">
				Halaman <b>{page}</b> dari <b>{totalPages}</b>
			</span>
			<div className="flex space-x-2">
				<button
					onClick={onPrev}
					disabled={page === 1 || loading}
					className={`px-3 py-1 rounded text-sm transition ${
						page === 1 || loading
							? "bg-gray-200 text-gray-400 cursor-not-allowed"
							: "bg-primary text-white hover:bg-opacity-90"
					}`}
				>
					Previous
				</button>
				<button
					onClick={onNext}
					disabled={page === totalPages || loading}
					className={`px-3 py-1 rounded text-sm transition ${
						page === totalPages || loading
							? "bg-gray-200 text-gray-400 cursor-not-allowed"
							: "bg-primary text-white hover:bg-opacity-90"
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Pagination;
