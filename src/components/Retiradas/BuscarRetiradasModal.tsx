import { useState } from "react";
import { retiradaService } from "../../services/retirada/pesquisa_retiradas.service";

export default function BuscarRetiradaModal({ onClose }: { onClose: () => void }) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tituloLivro, setTituloLivro] = useState("");
    const [resultado, setResultado] = useState<any>(null);
    const [erro, setErro] = useState("");

    async function handleBuscar() {
        setErro("");
        setResultado(null);

        const response = await retiradaService.buscarPorNomeETitulo(
            nomeUsuario,
            tituloLivro
        );

        if (!response.success) {
            setErro(response.message || "Nenhuma retirada encontrada.");
            return;
        }

        setResultado(response.retirada);
    }

    return (
        <div className="flex flex-col gap-4">

            <h2 className="text-xl font-semibold text-center dark:text-white">
                Buscar Retirada
            </h2>

            <input
                type="text"
                placeholder="Nome do usuário"
                className="border rounded-lg p-3 w-full 
                            bg-white dark:bg-[#1f1f1f]
                            border-gray-300 dark:border-gray-700
                            text-black dark:text-white"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
            />

            <input
                type="text"
                placeholder="Título do livro"
                className="border rounded-lg p-3 w-full
                            bg-white dark:bg-[#1f1f1f]
                            border-gray-300 dark:border-gray-700
                            text-black dark:text-white"
                value={tituloLivro}
                onChange={(e) => setTituloLivro(e.target.value)}
            />

            <button
                onClick={handleBuscar}
                className="
                    bg-[#D64545] text-white p-3 rounded-lg shadow-md
                    hover:bg-[#b73737] 
                    transition
                    dark:bg-[#b73737] dark:hover:bg-[#a32f2f]
                "
            >
                Buscar
            </button>

            {erro && (
                <p className="text-red-600 dark:text-red-400 text-center">{erro}</p>
            )}

            {resultado && (
                <div className="
                    border rounded-lg p-4 flex flex-col gap-2 text-sm
                    bg-gray-100 dark:bg-[#1f1f1f]
                    border-gray-300 dark:border-gray-700
                    text-black dark:text-white
                ">
                    <p><strong>Usuário:</strong> {resultado.nomeUsuario}</p>
                    <p><strong>Título:</strong> {resultado.tituloLivro}</p>
                    <p><strong>Quantidade:</strong> {resultado.quantidade}</p>
                    <p><strong>Motivo:</strong> {resultado.motivo}</p>
                    <p><strong>Contato:</strong> {resultado.contato}</p>
                    <p><strong>Retirada:</strong> {new Date(resultado.dataRetirada).toLocaleDateString()}</p>
                    <p><strong>Devolução:</strong> {resultado.dataDevolucao ? new Date(resultado.dataDevolucao).toLocaleDateString() : "Não devolvido"}</p>
                </div>
            )}

            <button
                onClick={onClose}
                className="
                    text-[#D64545] underline text-center font-medium
                    hover:text-[#b73737]
                    transition
                    dark:text-[#ff7777] dark:hover:text-[#ff5a5a]
                "
            >
                Fechar
            </button>
        </div>
    );
}
