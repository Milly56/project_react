    import { useState, useEffect } from "react";
    import { livroService, Livro } from "../../services/livro/livrolista.service";

    interface LivroListModalProps {
    onClose: () => void;
    }

    export default function LivroListModal({ onClose }: LivroListModalProps) {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchLivros = async () => {
        setLoading(true);
        setErro(null);

        try {
            const resposta = await livroService.buscarLivros();

            if (resposta.success && Array.isArray(resposta.data)) {
            const livrosFormatados = resposta.data.map(livro => ({
                id: livro.livroId,
                titulo: livro.titulo,
                categoria: livro.categoria,
                quantidade: livro.quantidade,
            }));

            setLivros(livrosFormatados);
            } else {
            throw new Error("Formato de dados inesperado");
            }
        } catch (error: any) {
            setErro("Erro ao carregar os livros.");
            console.error("Erro ao carregar os livros:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchLivros();
    }, []);

    return (
        <div className="
        flex flex-col gap-4 p-4 sm:p-6 
        bg-white dark:bg-[#1F1F23] 
        text-black dark:text-white
        rounded-lg shadow-lg 
        max-w-sm sm:max-w-md md:max-w-lg mx-auto
        ">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Lista de Livros
        </h2>

        {erro && (
            <p className="text-red-500 dark:text-red-400 text-center text-sm sm:text-base">
            {erro}
            </p>
        )}

        {loading ? (
            <p className="text-center text-sm sm:text-base">Carregando...</p>
        ) : (
            <div className="overflow-x-auto">
            {livros.length === 0 ? (
                <p className="text-center text-sm sm:text-base">Nenhum livro encontrado.</p>
            ) : (
                <ul className="space-y-2">
                {livros.map((livro) => (
                    <li
                    key={livro.id}
                    className="
                        flex justify-between text-sm sm:text-base 
                        px-2 py-1
                        border-b border-gray-200 dark:border-gray-700
                    "
                    >
                    <span className="truncate max-w-[70%] sm:max-w-[75%]">
                        {livro.titulo}
                    </span>
                    <span className="font-semibold">{livro.quantidade}</span>
                    </li>
                ))}
                </ul>
            )}
            </div>
        )}

        <button
            onClick={onClose}
            className="
            text-red-600 underline mt-4 text-sm sm:text-base
            dark:text-red-400
            "
        >
            Fechar
        </button>
        </div>
    );
    }
