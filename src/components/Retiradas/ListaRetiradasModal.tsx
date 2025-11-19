import { useState, useEffect } from "react";
import { retiradaService, Retirada } from "../../services/retirada/listaretiradas.service";

export default function ListaRetiradasModal({ onClose }: { onClose: () => void }) {
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchRetiradas = async () => {
            setLoading(true);
            setErro(null);

            try {
                const resposta = await retiradaService.listarTodas();

                if (resposta.success && Array.isArray(resposta.retiradas)) {
                    setRetiradas(resposta.retiradas);
                } else {
                    throw new Error("Formato de dados inesperado");
                }
            } catch (error) {
                console.error("Erro ao carregar as retiradas:", error);
                setErro("Erro ao carregar as retiradas.");
            } finally {
                setLoading(false);
            }
        };

        fetchRetiradas();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            
            <h2 className="text-xl font-semibold text-center">
                Lista de Retiradas
            </h2>

            {erro && <p className="text-red-500 text-center">{erro}</p>}

            {loading ? (
                <p className="text-center">Carregando...</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {retiradas.length === 0 ? (
                        <p className="text-center">Nenhuma retirada encontrada.</p>
                    ) : (
                        retiradas.map((retirada, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg p-4 bg-gray-100 flex flex-col gap-1 text-sm"
                            >
                                <p><strong>Usuário:</strong> {retirada.nomeUsuario}</p>
                                <p><strong>Título:</strong> {retirada.tituloLivro}</p>
                                <p><strong>Quantidade:</strong> {retirada.quantidade}</p>
                                <p><strong>Motivo:</strong> {retirada.motivo}</p>
                                <p><strong>Contato:</strong> {retirada.contato}</p>
                                <p><strong>Retirada:</strong> {new Date(retirada.dataRetirada).toLocaleDateString("pt-BR")}</p>
                                <p>
                                    <strong>Devolução:</strong>{" "}
                                    {retirada.dataDevolucao
                                        ? new Date(retirada.dataDevolucao).toLocaleDateString("pt-BR")
                                        : "Não devolvido"}
                                </p>
                            </div>
                        ))
                    )}
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
