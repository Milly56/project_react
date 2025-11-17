import { useState } from "react";
import { Livro } from "../../services/livro/livroeditar.service";

// Definindo a interface diretamente no arquivo
interface Props {
    livro: Livro; 
    onClose: () => void;
    onSave: (tituloOriginal: string, dadosEditados: Partial<Livro>) => Promise<void>;
}

export default function LivroEditarModal({ livro, onClose, onSave }: Props) {
    const [titulo, setTitulo] = useState(livro.titulo);
    const [categoria, setCategoria] = useState(livro.categoria);
    const [quantidade, setQuantidade] = useState(livro.quantidade);

    const handleSave = async () => {
        // A validação de dados pode ser adicionada aqui
        const dadosEditados: Partial<Livro> = {
            titulo,
            categoria,
            // Garante que quantidade seja um número ao salvar, já que o input é 'number'
            quantidade: Number(quantidade), 
        };
        await onSave(livro.titulo, dadosEditados);
        onClose();  // Fecha o modal após salvar os dados
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8">
                
                {/* TÍTULO E FECHAR */}
                <div className="flex justify-between items-start border-b pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        📝 Detalhes e Edição: {livro.titulo}
                    </h2>
                    {/* Botão de Fechar no canto superior */}
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-gray-600 transition duration-150"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                
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

                    {/* Campo Categoria */}
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

                    {/* Campo Quantidade */}
                    <label className="block">
                        <span className="text-sm font-semibold text-gray-700 mb-1 block">Quantidade em Estoque:</span>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg p-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            placeholder="0"
                        />
                    </label>
                </div>

                {/* BOTÕES DE AÇÃO */}
                <div className="flex gap-4 justify-end mt-8 pt-4 border-t">
                    {/* Botão Secundário para Fechar */}
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition duration-150"
                    >
                        Cancelar / Fechar
                    </button>
                    {/* Botão Primário para Salvar */}
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-150 shadow-md hover:shadow-lg"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </div>
        </div>
    );
}
