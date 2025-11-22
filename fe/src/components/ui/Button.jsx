import React from 'react';

const Button = ({children, variant = 'primary', size, ...props}) => {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition duration-300";
    const variants = {
        primary: "bg-[var(--color-primary)] text-white hover:bg-[#0e556b]",
        secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700"
    };

    return (
        <button className={`cursor-pointer ${baseClasses} ${variants[variant]} ${size} `} {...props}>
                {children}
        </button>
    );
};

export default Button;
