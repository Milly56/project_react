import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
className?: string;
children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
children,
className = "",
...props
}) => {
return (
    <button
    className={`w-full bg-[#5288BC] text-white rounded-md py-2 hover:bg-blue-700 transition ${className}`}
    {...props}
    >
    {children}
    </button>
);
};
