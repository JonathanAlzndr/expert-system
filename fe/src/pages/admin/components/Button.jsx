export function Button({ type, onClick, children }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-primary py-2 px-6 rounded-lg font-semibold text-white flex items-center active:scale-98 shadow-xl hover:bg-primary/97 cursor-pointer`}
		>
			{children}
		</button>
	);
}
