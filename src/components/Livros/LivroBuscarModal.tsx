    import { useState } from "react";
    import { livroService, Livro } from "../../services/livro/livrobuscar.service";

    interface LivroBuscarModalProps {
    onClose: () => void;
    onSelect: (livro: Livro) => void;
    }

    export default function LivroBuscarModal({ onClose, onSelect }: LivroBuscarModalProps) {
    const [titulo, setTitulo] = useState("");
    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [livroEncontrado, setLivroEncontrado] = useState<Livro | null>(null);

    const handleBuscar = async () => {
        setLoading(true);
        setErro(null);
        setLivroEncontrado(null);

        try {
        const livro = await livroService.buscarLivroPorTitulo(titulo);

        if (livro) {
            setLivroEncontrado(livro);
        } else {
            setErro("Livro não encontrado.");
        }
        } catch (error: any) {
        setErro(error.message || "Erro ao buscar o livro.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Buscar Livro
        </h2>

        <input
            className="border rounded-lg w-full p-3 sm:p-4 text-sm sm:text-base"
            placeholder="Digite o título do livro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        {erro && <p className="text-red-500 text-center text-sm sm:text-base">{erro}</p>}

        <button
            onClick={handleBuscar}
            className="bg-[#5288BC] text-white p-3 sm:p-4 rounded-lg text-sm sm:text-base disabled:opacity-50"
            disabled={loading}
        >
            {loading ? "Buscando..." : "Buscar"}
        </button>

        {livroEncontrado && (
            <div className="border rounded-lg p-4 sm:p-6 bg-gray-100 flex flex-col gap-3 sm:gap-4 text-sm sm:text-base">
            <p>
                <strong>ID:</strong> {livroEncontrado.id}
            </p>
            <p>
                <strong>Título:</strong> {livroEncontrado.titulo}
            </p>
            <p>
                <strong>Categoria:</strong> {livroEncontrado.categoria}
            </p>
            <p>
                <strong>Quantidade:</strong> {livroEncontrado.quantidade}
            </p>

            <button
                onClick={() => {
                onSelect(livroEncontrado);
                onClose();
                }}
                className="bg-green-600 text-white p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            >
                Selecionar
            </button>
            </div>
        )}

        <button
            onClick={onClose}
            className="text-red-500 underline text-center text-sm sm:text-base"
        >
            Cancelar
        </button>
        </div>
    );
    }
