    import { useState, useEffect } from "react";
    import { retiradaService, Retirada, RetiradaData } from "../../services/retirada/listaretiradas.service"; // Importando o serviço de retiradas

    export default function ListaRetiradasModal({ onClose }: { onClose: () => void }) {
    const [retiradas, setRetiradas] = useState<Retirada[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchRetiradas = async () => {
        setLoading(true);
        setErro(null);

        try {
            const resposta = await retiradaService.buscarRetiradas();

            if (resposta.success && Array.isArray(resposta.data)) {

            const retiradasFormatadas: Retirada[] = resposta.data.map((retiradaData: RetiradaData) => ({
                id: retiradaData.retiradaId, 
                nomeUsuario: retiradaData.nomeUsuario,
                titulo: retiradaData.titulo,
                telefone: retiradaData.telefone,
                dataRetirada: retiradaData.dataRetirada,
                dataDevolucao: retiradaData.dataDevolucao,
            }));

            setRetiradas(retiradasFormatadas);
            } else {
            throw new Error("Formato de dados inesperado");
            }
        } catch (error: any) {
            setErro("Erro ao carregar as retiradas.");
            console.error("Erro ao carregar as retiradas:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchRetiradas();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Lista de Retiradas</h2>

        {erro && <p className="text-red-500 text-center">{erro}</p>}

        {loading ? (
            <p className="text-center">Carregando...</p>
        ) : (
            <div>
            {retiradas.length === 0 ? (
                <p className="text-center">Nenhuma retirada encontrada.</p>
            ) : (
                <ul className="space-y-2">
                {retiradas.map((retirada) => (
                    <li key={retirada.id} className="flex justify-between">
                    <div>
                        <span className="font-semibold">{retirada.titulo}</span><br />
                        <span>{retirada.nomeUsuario}</span> {/* Nome do usuário */}
                    </div>
                    <div className="text-right">
                        <span><strong>Telefone:</strong> {retirada.telefone}</span><br />
                        <span><strong>Data Retirada:</strong> {retirada.dataRetirada}</span><br />
                        <span><strong>Data Devolução:</strong> {retirada.dataDevolucao}</span>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </div>
        )}

        <button onClick={onClose} className="text-red-500 underline text-center mt-4">
            Fechar
        </button>
        </div>
    );
    }
