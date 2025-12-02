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
        className={`
            w-full 
            bg-[#E04545] 
            text-white 
            rounded-xl 
            py-2.5 
            font-medium
            shadow-sm

            hover:bg-[#c63b3b]
            active:scale-95
            transition-all duration-200

            dark:bg-[#ff4d4d]
            dark:hover:bg-[#e04343]

            ${className}
        `}
        {...props}
        >
        {children}
        </button>
    );
    };
