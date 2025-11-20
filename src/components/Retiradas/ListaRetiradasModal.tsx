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

    const indexOfLastRetirada = currentPage * itemsPerPage;
    const indexOfFirstRetirada = indexOfLastRetirada - itemsPerPage;
    const currentRetiradas = retiradas.slice(indexOfFirstRetirada, indexOfLastRetirada);

    const totalPages = Math.ceil(retiradas.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                    {currentRetiradas.length === 0 ? (
                        <p className="text-center">Nenhuma retirada encontrada.</p>
                    ) : (
                        currentRetiradas.map((retirada, idx) => (
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

            <div className="flex items-center justify-center space-x-4 mt-4">
                <button
                    onClick={handlePrevPage}
                    className="p-2 bg-[#5288BC] text-white rounded-full shadow-md hover:bg-[#3c6c99] transition-all disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    <AiOutlineArrowLeft size={20} />
                </button>

                <span className="text-lg font-medium">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    onClick={handleNextPage}
                    className="p-2 bg-[#5288BC] text-white rounded-full shadow-md hover:bg-[#3c6c99] transition-all disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    <AiOutlineArrowRight size={20} />
                </button>
            </div>

            <button
                onClick={onClose}
                className="text-[#5288BC] underline text-center mt-4"
            >
                Fechar
            </button>
        </div>
    );
}
