    import { useState, useEffect } from "react";
    import { livroService, Livro } from "../../services/livro/livrolista.service";

    interface LivroListModalProps {
    onClose: () => void;
    }

    export default function LivroListModal({ onClose }: LivroListModalProps) {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        const fetchLivros = async () => {
        setLoading(true);
        setErro(null);

        try {
            const resposta = await livroService.buscarLivros();

            if (resposta.success && Array.isArray(resposta.data)) {
            const livrosFormatados = resposta.data.map(livro => ({
                id: livro.livroId, 
                titulo: livro.titulo,
                categoria: livro.categoria,
                quantidade: livro.quantidade,
            }));

            setLivros(livrosFormatados);  
            } else {
            throw new Error("Formato de dados inesperado");
            }
        } catch (error: any) {
            setErro("Erro ao carregar os livros.");
            console.error("Erro ao carregar os livros:", error); 
        } finally {
            setLoading(false);
        }
        };

        fetchLivros();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Lista de Livros</h2>

        {erro && <p className="text-red-500 text-center">{erro}</p>}

        {loading ? (
            <p className="text-center">Carregando...</p>
        ) : (
            <div>
            {livros.length === 0 ? (
                <p className="text-center">Nenhum livro encontrado.</p>
            ) : (
                <ul className="space-y-2">
                {livros.map((livro) => (
                    <li key={livro.id} className="flex justify-between">
                    <span>{livro.titulo}</span>
                    <span>{livro.quantidade}</span>
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
