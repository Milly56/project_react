    import React from "react";

    interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    }

    export const Input: React.FC<InputProps> = ({
    label,
    type = "text",
    placeholder,
    ...props
    }) => {
    return (
        <div className="w-full">
        {label && (
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
            {label}
            </label>
        )}

        <input
            type={type}
            placeholder={placeholder}
            className="
            w-full 
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-[#1A1A1A]
            text-black dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            rounded-md px-3 py-2 outline-none
            focus:ring-2 focus:ring-blue-500
            dark:focus:ring-red-500
            transition-colors
            "
            {...props}
        />
        </div>
    );
    };
