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
            await livroService.excluirLivro(titulo, quantidade); // Chama o serviço para excluir o livro
            alert("Livro excluído com sucesso!");
            onClose(); 
        } catch (error: any) {
            setErro(error.message || "Erro ao excluir o livro.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Excluir Livro</h2>

            <input
                className="border rounded-lg w-full p-3"
                placeholder="Digite o título do livro"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />

            <input
                type="number"
                className="border rounded-lg w-full p-3 mt-4"
                placeholder="Digite a quantidade do livro"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
            />

            {erro && <p className="text-red-500 text-center">{erro}</p>}

            <button
                onClick={handleExcluir}
                className="bg-red-500 text-white p-3 rounded-lg mt-4"
                disabled={loading}
            >
                {loading ? "Excluindo..." : "Excluir Livro"}
            </button>

            <button
                onClick={onClose}
                className="text-red-500 underline text-center mt-4"
            >
                Cancelar
            </button>
        </div>
    );
}
