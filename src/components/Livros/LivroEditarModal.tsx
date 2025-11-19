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
        <div className="w-full max-w-lg">

            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
                📝 Detalhes e Edição: {livro.titulo}
            </h2>

            <div className="space-y-5">
                <label className="block">
                    <span className="text-sm font-semibold text-gray-700 mb-1 block">Título:</span>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Digite o novo título"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-semibold text-gray-700 mb-1 block">Categoria:</span>
                    <input
                        type="text"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="Digite a nova categoria"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-semibold text-gray-700 mb-1 block">Quantidade em Estoque:</span>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg p-3 appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        placeholder="0"
                    />
                </label>
            </div>

            <div className="flex gap-4 justify-end mt-8 pt-4 border-t">
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-150"
                >
                    Cancelar / Fechar
                </button>

                <button
                    onClick={handleSave}
                    className="bg-[#5288BC] text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
                >
                    Salvar Alterações
                </button>
            </div>

        </div>
    );
}
