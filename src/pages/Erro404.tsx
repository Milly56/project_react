    import { LiaRobotSolid } from "react-icons/lia";

    const Erro404 = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 min-h-screen px-4 sm:px-6">
        <LiaRobotSolid className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-700" />

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#5288BC]">404</h1>

        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 text-center">
            Página não encontrada
        </h2>
        </div>
    );
    };

    export { Erro404 };
