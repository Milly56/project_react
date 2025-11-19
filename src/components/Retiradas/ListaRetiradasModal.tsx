import { useState, useEffect } from "react";
import { retiradaService, Retirada } from "../../services/retirada/listaretiradas.service";

export default function ListaRetiradasModal({ onClose }: { onClose: () => void }) {
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
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
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-center border-b pb-2">
                Lista de Retiradas
            </h2>

            {erro && <p className="text-red-500 text-center">{erro}</p>}

            {loading ? (
                <p className="text-center">Carregando...</p>
            ) : (
                <div>
                    {retiradas.length === 0 ? (
                        <p className="text-center">Nenhuma retirada encontrada.</p>
                    ) : (
                        <ul className="space-y-4">
                            {retiradas.map((retirada, idx) => (
                                <li
                                    key={idx}
                                    className="border p-4 rounded-lg shadow-sm flex justify-between bg-gray-50"
                                >
                                    <div>
                                        <span className="font-semibold text-lg">
                                            {retirada.tituloLivro}
                                        </span>
                                        <br />
                                        <span className="text-gray-600">{retirada.nomeUsuario}</span>
                                        <br />
                                        <span className="text-gray-600">
                                            <strong>Motivo:</strong> {retirada.motivo}
                                        </span>
                                    </div>

                                    <div className="text-right text-sm">
                                        <span>
                                            <strong>Contato:</strong> {retirada.contato}
                                        </span>
                                        <br />
                                        <span>
                                            <strong>Qtd:</strong> {retirada.quantidade}
                                        </span>
                                        <br />
                                        <span>
                                            <strong>Retirada:</strong>{" "}
                                            {new Date(retirada.dataRetirada).toLocaleDateString("pt-BR")}
                                        </span>
                                        <br />
                                        <span>
                                            <strong>Devolução:</strong>{" "}
                                            {retirada.dataDevolucao
                                                ? new Date(retirada.dataDevolucao).toLocaleDateString("pt-BR")
                                                : "—"}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <button
                onClick={onClose}
                className="text-red-500 underline text-center mt-2"
            >
                Fechar
            </button>
        </div>
    );
}
