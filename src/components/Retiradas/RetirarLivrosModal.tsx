    import { useState } from "react";

    export default function RetirarLivroModal({ onClose }: { onClose: () => void }) {
    const [titulo, setTitulo] = useState("");
    const [categoria, setCategoria] = useState(""); 
    const [quantidade, setQuantidade] = useState("");
    const [telefone, setTelefone] = useState("");
    const [dataRetirada, setDataRetirada] = useState("");
    const [dataDevolucao, setDataDevolucao] = useState("");

    return (
        <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Retirar livro</h2>

        <input
            className="border rounded-lg w-full p-3"
            placeholder="Título do livro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
        />

        <input
            className="border rounded-lg w-full p-3"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
        />

        <input
            type="number"
            min="1"
            className="border rounded-lg w-full p-3"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
        />

        <input
            type="tel"
            className="border rounded-lg w-full p-3"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
        />

        <input
            type="date"
            className="border rounded-lg w-full p-3"
            value={dataRetirada}
            onChange={(e) => setDataRetirada(e.target.value)}
        />

        <input
            type="date"
            className="border rounded-lg w-full p-3"
            value={dataDevolucao}
            onChange={(e) => setDataDevolucao(e.target.value)}
        />

        <button className="bg-[#5288BC] text-white p-3 rounded-lg">
            Retirar
        </button>

        <button onClick={onClose} className="text-red-500 underline text-center">
            Cancelar
        </button>
        </div>
    );
    }
