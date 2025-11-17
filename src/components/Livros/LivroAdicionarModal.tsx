    import { useState } from "react";

    export default function LivroAdicionarModal({ onClose }: { onClose: () => void }) {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");

    return (
        <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
            Adicionar Livro
        </h2>

        <input
            className="border rounded-lg w-full p-3"
            placeholder="Título do livro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        <input
            className="border rounded-lg w-full p-3"
            placeholder="Categoria do livro"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
        />

        <input
            className="border rounded-lg w-full p-3"
            placeholder="Quantidade"
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
        />

        <button className="bg-[#5288BC] text-white p-3 rounded-lg">
            Adicionar
        </button>

        <button
            onClick={onClose}
            className="text-red-500 underline text-center"
        >
            Cancelar
        </button>
        </div>
    );
    }
