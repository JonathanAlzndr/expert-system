export function Button({ type, onClick, children }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`bg-primary py-2 w-full rounded-lg font-semibold text-white flex items-center justify-center active:scale-98  shadow-lg cursor-pointer `}
		>
			{children}
		</button>
	);
}
