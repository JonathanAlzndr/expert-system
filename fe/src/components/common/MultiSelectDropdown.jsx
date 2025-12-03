// components/common/MultiSelectDropdown.jsx
import React, { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({
	label,
	options,
	selectedValues,
	onChange,
	placeholder = "Pilih...",
	error,
	id,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Format options jika berupa array of strings
	const formattedOptions = options.map((option) => {
		if (typeof option === "string") {
			return { value: option, label: option };
		}
		return option;
	});

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (value) => {
		let newSelectedValues;
		if (selectedValues.includes(value)) {
			// Remove if already selected
			newSelectedValues = selectedValues.filter((v) => v !== value);
		} else {
			// Add if not selected
			newSelectedValues = [...selectedValues, value];
		}
		onChange(newSelectedValues);
	};

	const removeSelected = (value, e) => {
		e.stopPropagation();
		const newSelectedValues = selectedValues.filter((v) => v !== value);
		onChange(newSelectedValues);
	};

	const clearAll = (e) => {
		e.stopPropagation();
		onChange([]);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const getSelectedLabels = () => {
		return selectedValues.map((value) => {
			const option = formattedOptions.find((opt) => opt.value === value);
			return option ? option.label : value;
		});
	};

	const selectedLabels = getSelectedLabels();

	return (
		<div className="mb-4" ref={dropdownRef}>
			{label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

			<div className="relative">
				<button
					type="button"
					onClick={toggleDropdown}
					className={`w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
						error ? "border-red-300" : "border-gray-300"
					} ${selectedValues.length > 0 ? "bg-white" : "bg-gray-50"}`}
					aria-expanded={isOpen}
					aria-haspopup="listbox"
				>
					<div className="flex justify-between items-center">
						<div className="flex flex-wrap gap-1 flex-1 min-h-7">
							{selectedLabels.length > 0 ? (
								selectedLabels.map((label, index) => (
									<span
										key={index}
										className="inline-flex items-center px-2 py-1 rounded-md text-sm bg-blue-100 text-blue-800 mr-1 mb-1"
									>
										{label}
										<button
											type="button"
											onClick={(e) => removeSelected(selectedValues[index], e)}
											className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
											aria-label={`Remove ${label}`}
										>
											&times;
										</button>
									</span>
								))
							) : (
								<span className="text-gray-500">{placeholder}</span>
							)}
						</div>
						<div className="flex items-center ml-2">
							{selectedValues.length > 0 && (
								<button
									type="button"
									onClick={clearAll}
									className="text-gray-400 hover:text-gray-600 mr-2 text-sm"
									aria-label="Clear all"
								>
									Clear
								</button>
							)}
							<svg
								className={`h-5 w-5 text-gray-400 transition-transform ${
									isOpen ? "transform rotate-180" : ""
								}`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</button>

				{isOpen && (
					<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
						<ul className="py-1" role="listbox">
							{formattedOptions.map((option) => {
								const isSelected = selectedValues.includes(option.value);
								return (
									<li
										key={option.value}
										role="option"
										aria-selected={isSelected}
										className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
										onClick={() => handleOptionClick(option.value)}
									>
										<div className="flex items-center h-5">
											<input
												type="checkbox"
												checked={isSelected}
												onChange={() => {}}
												className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
												onClick={(e) => e.stopPropagation()}
											/>
										</div>
										<span className="ml-2 block truncate">{option.label}</span>
									</li>
								);
							})}

							{formattedOptions.length === 0 && (
								<li className="px-3 py-2 text-gray-500 text-center">Tidak ada opsi tersedia</li>
							)}
						</ul>
					</div>
				)}
			</div>

			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}

			{selectedValues.length > 0 && (
				<p className="mt-1 text-sm text-gray-500">{selectedValues.length} gejala dipilih</p>
			)}
		</div>
	);
};

export default MultiSelectDropdown;
