    import { useState } from "react";
    import { adicionarLivro } from "../../services/livro/livroadicionar.service";
    import { AiOutlineCheck } from "react-icons/ai";

    export default function LivroAdicionarModal({ onClose }: { onClose: () => void }) {
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
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg text-center animate-fade-in">
            
            <div className="mx-auto w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <AiOutlineCheck className="text-green-600" size={32} />
            </div>

            <h3 className="text-xl font-semibold mb-2">Livro cadastrado!</h3>

            <p className="text-gray-600 mb-6">
            O livro foi adicionado com sucesso ao sistema.
            </p>

            <div className="flex gap-4 justify-center">
            <button
                onClick={resetForm}
                className="bg-[#5288BC] text-white px-4 py-2 rounded-lg"
            >
                Cadastrar outro
            </button>

            <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded-lg"
            >
                Fechar
            </button>
            </div>
        </div>
        );
    }

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

        <button
            onClick={handleAdicionar}
            className="bg-[#5288BC] text-white p-3 rounded-lg"
        >
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
