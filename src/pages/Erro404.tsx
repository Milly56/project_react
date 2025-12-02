    "use client";

    import { LiaRobotSolid } from "react-icons/lia";

    export function Erro404() {
    return (
        <div
        className="flex flex-col justify-center items-center gap-6 min-h-screen px-4 sm:px-6
        bg-gray-100 dark:bg-[#1a1a1a] transition-colors"
        >
        <LiaRobotSolid className="text-7xl text-gray-800 dark:text-gray-200 mt-10" />

        <h1 className="text-[60px] font-bold text-[#5288BC] dark:text-[#A0BBD5]">
            404
        </h1>

        <h2 className="text-xl text-gray-700 dark:text-gray-300 text-center">
            Página não encontrada
        </h2>
        </div>
    );
    }
