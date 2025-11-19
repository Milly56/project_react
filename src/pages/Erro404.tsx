import { LiaRobotSolid } from "react-icons/lia";

const Erro404 = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
            <LiaRobotSolid className="text-8xl text-gray-700" />

            <h1 className="text-6xl font-bold text-[#5288BC]">404</h1>
            <h2 className="text-xl text-gray-600">Página não encontrada</h2>
        </div>
    );
};

export { Erro404 };
