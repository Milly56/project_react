    import { useState } from "react";
    import { Livro } from "../../services/livro/livroeditar.service";

    interface Props {
    livro: Livro;
    onClose: () => void;
    onSave: (tituloOriginal: string, dadosEditados: Partial<Livro>) => Promise<void>;
    }

    export default function LivroEditarModal({ livro, onClose, onSave }: Props) {
    const [titulo, setTitulo] = useState(livro.titulo);
    const [categoria, setCategoria] = useState(livro.categoria);
    const [quantidade, setQuantidade] = useState<number>(livro.quantidade);

    const handleSave = async () => {
        const dadosEditados: Partial<Livro> = {};
        if (titulo !== livro.titulo) dadosEditados.titulo = titulo;
        if (categoria !== livro.categoria) dadosEditados.categoria = categoria;
        if (quantidade !== livro.quantidade) dadosEditados.quantidade = Number(quantidade);

        if (Object.keys(dadosEditados).length === 0) {
        alert("Nenhuma alteração foi feita.");
        return;
        }

        try {
        await onSave(livro.titulo, dadosEditados);
        onClose();
        } catch (error) {
        console.error(error);
        alert("Erro ao salvar alterações.");
        }
    };

    return (
        <div
        className="
            w-full max-w-sm sm:max-w-md md:max-w-lg 
            p-4 sm:p-6 
            bg-white dark:bg-[#1F1F23] 
            text-black dark:text-white
            rounded-lg shadow-lg
        "
        >
        <h2
            className="
            text-xl sm:text-2xl md:text-3xl 
            font-bold 
            text-gray-800 dark:text-white
            border-b border-gray-300 dark:border-gray-700
            pb-4 mb-6 text-center sm:text-left
            "
        >
            📝 Detalhes e Edição: {livro.titulo}
        </h2>

        <div className="space-y-4 sm:space-y-5">
            <label className="block">
            <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Título:
            </span>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="
                w-full p-3 sm:p-4 
                text-sm sm:text-base 
                border border-gray-300 dark:border-gray-700 
                rounded-lg 
                bg-white dark:bg-[#2A2A2E] 
                text-black dark:text-white 
                focus:ring-blue-500 focus:border-blue-500 
                transition duration-150
                "
                placeholder="Digite o novo título"
            />
            </label>

            <label className="block">
            <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Categoria:
            </span>
            <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="
                w-full p-3 sm:p-4 
                text-sm sm:text-base 
                border border-gray-300 dark:border-gray-700
                rounded-lg 
                bg-white dark:bg-[#2A2A2E] 
                text-black dark:text-white 
                focus:ring-blue-500 focus:border-blue-500 
                transition duration-150
                "
                placeholder="Digite a nova categoria"
            />
            </label>

            <label className="block">
            <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                Quantidade em Estoque:
            </span>
            <input
                type="number"
                value={quantidade}
                min={0}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="
                w-full p-3 sm:p-4 
                text-sm sm:text-base 
                border border-gray-300 dark:border-gray-700 
                rounded-lg 
                bg-white dark:bg-[#2A2A2E] 
                text-black dark:text-white 
                appearance-none
                focus:ring-blue-500 focus:border-blue-500 
                transition duration-150
                "
                placeholder="0"
            />
            </label>
        </div>

        <div
            className="
            flex flex-col sm:flex-row 
            gap-3 sm:gap-4 
            justify-end 
            mt-6 sm:mt-8 
            pt-4 
            border-t border-gray-300 dark:border-gray-700
            "
        >
            <button
            onClick={onClose}
            className="
                w-full sm:w-auto 
                bg-gray-200 dark:bg-[#2A2A2E] 
                text-gray-700 dark:text-gray-300 
                px-4 sm:px-6 py-2 
                rounded-lg font-medium 
                hover:bg-gray-300 dark:hover:bg-[#3A3A3E] 
                transition duration-150
            "
            >
            Cancelar / Fechar
            </button>

            <button
            onClick={handleSave}
            className="
                w-full sm:w-auto 
                bg-red-600 dark:bg-red-500
                text-white 
                px-4 sm:px-6 py-2 
                rounded-lg font-medium 
                hover:bg-red-700 dark:hover:bg-red-400 
                transition duration-150 
                shadow-md hover:shadow-lg
            "
            >
            Salvar Alterações
            </button>
        </div>
        </div>
    );
    }
