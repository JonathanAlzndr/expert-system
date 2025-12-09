import React from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
	if (!isOpen) return null;

	const sizeClasses = {
		sm: "max-w-md",
		md: "max-w-2xl",
		lg: "max-w-4xl",
		xl: "max-w-6xl",
	};

	return (
		/* PERUBAHAN DISINI:
      1. Tambahkan backdrop-blur-sm untuk efek blur pada background.
      2. Tambahkan transition-all duration-300 untuk animasi halus.
    */
		<div
			className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
			onClick={onClose} // Mengizinkan penutupan dengan klik di luar modal
		>
			<div
				// Mencegah penutupan modal saat mengklik konten di dalamnya
				onClick={(e) => e.stopPropagation()}
				className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto`}
			>
				<div className="p-6">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold text-gray-800">{title}</h2>
						<IoClose
							size={25}
							className={"active:scale-90 text-gray-500 hover:text-gray-800 cursor-pointer"}
							onClick={onClose}
						/>
					</div>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
