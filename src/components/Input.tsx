import React from "react";

// define os tipos esperados nas props
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
label?: string;
}

// tipa o componente com React.FC (Function Component)
export const Input: React.FC<InputProps> = ({
label,
type = "text",
placeholder,
...props
}) => {
return (
    <div className="w-full">
    {label && (
        <label className="block text-sm mb-1 text-gray-600">{label}</label>
    )}
    <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
    />
    </div>
);
};
