import { useState } from "react";
import { devolucaoService } from "../../services/retirada/devolucao_retiradas.service";

export default function DevolverLivroModal({ onClose }: { onClose: () => void }) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tituloLivro, setTituloLivro] = useState("");
    const [resultado, setResultado] = useState<any>(null);
    const [erro, setErro] = useState("");

    async function handleDevolucao() {
        setErro("");
        setResultado(null);

        const response = await devolucaoService.registrarDevolucao({
            nomeUsuario,
            tituloLivro,
        });

        if (!response.success) {
            setErro(response.message || "Erro ao registrar devolução.");
            return;
        }

        setResultado({
            nomeUsuario,
            tituloLivro,
            dataDevolucao: new Date().toISOString(),
            mensagem: "Devolução registrada com sucesso!"
        });
    }

    return (
        <div className="flex flex-col gap-4">

            <h2 className="text-xl font-semibold text-center">Devolver Livro</h2>

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
                onClick={handleDevolucao}
                className="bg-[#D64545] text-white p-3 rounded-lg shadow-md hover:bg-[#b73737] transition"
            >
                Confirmar Devolução
            </button>

            {erro && <p className="text-red-500 text-center">{erro}</p>}

            {resultado && (
                <div className="border rounded-lg p-4 bg-gray-100 flex flex-col gap-2 text-sm">
                    <p className="text-green-700 font-semibold">
                        ✔ {resultado.mensagem}
                    </p>

                    <p><strong>Usuário:</strong> {resultado.nomeUsuario}</p>
                    <p><strong>Título:</strong> {resultado.tituloLivro}</p>
                    <p><strong>Devolução:</strong> 
                        {new Date(resultado.dataDevolucao).toLocaleDateString()}
                    </p>
                </div>
            )}

            <button
                onClick={onClose}
                className="text-[#D64545] underline text-center font-medium hover:text-[#b73737] transition"
            >
                Fechar
            </button>
        </div>
    );
}
