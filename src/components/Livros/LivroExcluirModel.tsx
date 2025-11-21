    import { useState } from "react";
    import { livroService } from "../../services/livro/livroexcluir.service";

    interface LivroExcluirModalProps {
    onClose: () => void;
    }

    export default function LivroExcluirModal({ onClose }: LivroExcluirModalProps) {
    const [titulo, setTitulo] = useState<string>("");
    const [quantidade, setQuantidade] = useState<number>(0);
    const [erro, setErro] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleExcluir = async () => {
        if (!titulo || quantidade <= 0) {
        setErro("Por favor, insira o título e a quantidade corretamente.");
        return;
        }

        setLoading(true);
        setErro(null);

        try {
        await livroService.excluirLivro(titulo, quantidade);
        alert("Livro excluído com sucesso!");
        onClose(); 
        } catch (error: any) {
        setErro(error.message || "Erro ao excluir o livro.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg mx-auto">

        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Excluir Livro
        </h2>

        <input
            className="border rounded-lg w-full p-3 sm:p-4 text-sm sm:text-base"
            placeholder="Digite o título do livro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        <input
            type="number"
            className="border rounded-lg w-full p-3 sm:p-4 mt-3 text-sm sm:text-base"
            placeholder="Digite a quantidade do livro"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            min={1}
        />

        {erro && <p className="text-red-500 text-center text-sm sm:text-base">{erro}</p>}

        <button
            onClick={handleExcluir}
            className="bg-red-500 text-white p-3 sm:p-4 rounded-lg mt-4 w-full sm:w-auto text-sm sm:text-base hover:bg-red-600 transition duration-150"
            disabled={loading}
        >
            {loading ? "Excluindo..." : "Excluir Livro"}
        </button>

        <button
            onClick={onClose}
            className="text-red-500 underline text-center mt-3 text-sm sm:text-base"
        >
            Cancelar
        </button>
        </div>
    );
    }
