import { useState } from "react";
import { adicionarLivro } from "../../services/livro/livroadicionar.service";
import { AiOutlineCheck } from "react-icons/ai";

interface LivroAdicionarModalProps {
    onClose: () => void;
}

export default function LivroAdicionarModal({ onClose }: LivroAdicionarModalProps) {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const [success, setSuccess] = useState(false);

    async function handleAdicionar() {
        try {
            await adicionarLivro({
                titulo,
                categoria,
                quantidade: Number(quantidade),
            });

            setSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Erro ao adicionar livro!");
        }
    }

    function resetForm() {
        setTitulo("");
        setCategoria("");
        setQuantidade("");
        setSuccess(false);
    }

    if (success) {
        return (
            <div className="
                w-full max-w-sm sm:max-w-md md:max-w-lg 
                rounded-2xl p-6 sm:p-8 shadow-lg text-center animate-fade-in
                bg-white dark:bg-[#1F1F23] 
                text-black dark:text-white
            ">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <AiOutlineCheck className="text-green-600 dark:text-green-300" size={36} />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    Livro cadastrado!
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                    O livro foi adicionado com sucesso ao sistema.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                        onClick={resetForm}
                        className="bg-[#5288BC] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
                    >
                        Cadastrar outro
                    </button>

                    <button
                        onClick={onClose}
                        className="bg-gray-300 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="
            flex flex-col gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg 
            text-gray-900 dark:text-gray-100
        ">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
                Adicionar Livro
            </h2>

            <input
                className="
                    border rounded-lg w-full p-3 sm:p-4 text-sm sm:text-base
                    bg-white dark:bg-[#2A2A2E]
                    text-black dark:text-white
                    border-gray-300 dark:border-gray-700
                "
                placeholder="Título do livro"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <input
                className="
                    border rounded-lg w-full p-3 sm:p-4 text-sm sm:text-base
                    bg-white dark:bg-[#2A2A2E]
                    text-black dark:text-white
                    border-gray-300 dark:border-gray-700
                "
                placeholder="Categoria do livro"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            />

            <input
                className="
                    border rounded-lg w-full p-3 sm:p-4 text-sm sm:text-base
                    bg-white dark:bg-[#2A2A2E]
                    text-black dark:text-white
                    border-gray-300 dark:border-gray-700
                "
                placeholder="Quantidade"
                type="number"
                min="1"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
            />

            <button
                onClick={handleAdicionar}
                className="
                    bg-[#5288BC] text-white p-3 sm:p-4 rounded-lg 
                    text-sm sm:text-base hover:bg-blue-700 transition
                "
            >
                Adicionar
            </button>

            <button
                onClick={onClose}
                className="text-red-500 dark:text-red-400 underline text-center text-sm sm:text-base"
            >
                Cancelar
            </button>
        </div>
    );
}
