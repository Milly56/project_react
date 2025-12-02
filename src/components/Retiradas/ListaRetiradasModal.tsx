import { useState, useEffect } from "react";
import { retiradaService, Retirada } from "../../services/retirada/listaretiradas.service";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function ListaRetiradasModal({ onClose }: { onClose: () => void }) {
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    useEffect(() => {
        const fetchRetiradas = async () => {
            setLoading(true);
            setErro(null);
            try {
                const resposta = await retiradaService.listarTodas();
                if (resposta.success && Array.isArray(resposta.retiradas)) {
                    setRetiradas(resposta.retiradas);
                } else {
                    throw new Error("Formato inválido");
                }
            } catch (error) {
                console.error(error);
                setErro("Erro ao carregar as retiradas.");
            } finally {
                setLoading(false);
            }
        };

        fetchRetiradas();
    }, []);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentRetiradas = retiradas.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(retiradas.length / itemsPerPage);

    return (
        <div className="flex flex-col gap-4 animate-fade-in dark:text-white">

            <h2 className="text-xl font-semibold text-center mb-2">
                Lista de Retiradas
            </h2>

            {erro && (
                <p className="text-red-500 dark:text-red-400 text-center bg-red-100 dark:bg-red-900/40 py-2 rounded-lg text-sm">
                    {erro}
                </p>
            )}

            {loading ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Carregando...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {currentRetiradas.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            Nenhuma retirada encontrada.
                        </p>
                    ) : (
                        currentRetiradas.map((retirada, idx) => (
                            <div
                                key={idx}
                                className="
                                    p-5 rounded-xl shadow-md border 
                                    bg-gray-100 dark:bg-[#1f1f1f]
                                    border-gray-300 dark:border-gray-700
                                    transition hover:shadow-lg
                                "
                            >
                                <p><span className="font-semibold">Usuário:</span> {retirada.nomeUsuario}</p>
                                <p><span className="font-semibold">Título:</span> {retirada.tituloLivro}</p>
                                <p><span className="font-semibold">Quantidade:</span> {retirada.quantidade}</p>

                                <p><span className="font-semibold">Motivo:</span> {retirada.motivo}</p>

                                <p><span className="font-semibold">Contato:</span> {retirada.contato}</p>

                                <p>
                                    <span className="font-semibold">Retirada:</span>{" "}
                                    <span className="text-[#5288BC] dark:text-red-400 font-medium">
                                        {new Date(retirada.dataRetirada).toLocaleDateString("pt-BR")}
                                    </span>
                                </p>

                                <p>
                                    <span className="font-semibold">Devolução:</span>{" "}
                                    {retirada.dataDevolucao ? (
                                        <span className="text-green-600 dark:text-green-400 font-medium">
                                            {new Date(retirada.dataDevolucao).toLocaleDateString("pt-BR")}
                                        </span>
                                    ) : (
                                        <span className="text-red-600 dark:text-red-400 font-medium">
                                            Não devolvido
                                        </span>
                                    )}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}

            {retiradas.length > 0 && (
                <div className="flex items-center justify-center gap-6 mt-2">

                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="
                            p-2 rounded-full shadow-md 
                            bg-[#5288BC] hover:bg-[#3c6c99]
                            dark:bg-red-600 dark:hover:bg-red-700
                            text-white transition disabled:opacity-50
                        "
                    >
                        <AiOutlineArrowLeft size={20} />
                    </button>

                    <span className="font-medium">
                        Página {currentPage} de {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="
                            p-2 rounded-full shadow-md 
                            bg-[#5288BC] hover:bg-[#3c6c99]
                            dark:bg-red-600 dark:hover:bg-red-700
                            text-white transition disabled:opacity-50
                        "
                    >
                        <AiOutlineArrowRight size={20} />
                    </button>

                </div>
            )}

            <button
                onClick={onClose}
                className="
                    text-[#5288BC] dark:text-red-400
                    underline text-center mt-3 hover:opacity-80 transition
                "
            >
                Fechar
            </button>
        </div>
    );
}
