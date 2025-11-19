import { useState } from "react";
import { deletarRetiradaService } from "../../services/retirada/deletar_retiradas.service";

export default function DeletarRetiradaModal({ onClose }: { onClose: () => void }) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tituloLivro, setTituloLivro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");

    async function handleDeletar() {
        setMensagem("");
        setTipoMensagem("");

        const response = await deletarRetiradaService.deletar(nomeUsuario, tituloLivro);

        if (!response.success) {
            setMensagem(response.message);
            setTipoMensagem("erro");
            return;
        }

        setMensagem(response.message);
        setTipoMensagem("sucesso");
    }

    return (
        <div className="flex flex-col gap-4">

            <h2 className="text-xl font-semibold text-center">Deletar Retirada</h2>

            <input
                type="text"
                placeholder="Nome do usuário"
                className="border rounded-lg p-3 w-full"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
            />

            <input
                type="text"
                placeholder="Título do livro"
                className="border rounded-lg p-3 w-full"
                value={tituloLivro}
                onChange={(e) => setTituloLivro(e.target.value)}
            />

            <button
                onClick={handleDeletar}
                className="bg-[#5288BC] text-white p-3 rounded-lg hover:opacity-90 transition"
            >
                Remover Retirada
            </button>

            {mensagem && (
                <div
                    className={`text-center text-sm p-2 rounded-lg ${
                        tipoMensagem === "erro"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                    }`}
                >
                    {mensagem}
                </div>
            )}

            <button
                onClick={onClose}
                className="text-red-500 underline text-center"
            >
                Fechar
            </button>
        </div>
    );
}
