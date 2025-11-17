import { api } from "../../api";
import Cookies from "js-cookie";

export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    quantidade: number;
}

const livroService = {
    // Função para pesquisar livros por título (ou outras características)
    async pesquisarLivros(query: string): Promise<Livro[]> {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
            const response = await api.get(`/api/livros/buscar?titulo=${encodeURIComponent(query)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;

            if (!data) throw new Error("Nenhum livro encontrado.");

            // Retorna os livros encontrados
            return data.map((livro: any) => ({
                id: livro.id ?? livro.livroId,
                titulo: livro.titulo,
                categoria: livro.categoria,
                quantidade: livro.quantidade,
            }));
        } catch (error: any) {
            console.error("Erro ao buscar livros:", error);

            if (error.response) {
                if (error.response.status === 401) throw new Error("Não autorizado. Faça login novamente.");
                if (error.response.status === 404) throw new Error("Nenhum livro encontrado.");
                if (error.response.status === 400) throw new Error("Erro de validação no envio dos dados.");
            }

            throw new Error("Erro desconhecido na requisição.");
        }
    },

    // Função para atualizar o livro
    async atualizarLivro(
        tituloOriginal: string, // título do livro a ser atualizado
        dados: Partial<Livro> // dados a serem atualizados
    ): Promise<Livro> {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
        }

        const body: Partial<Livro> = { ...dados }; // Monta o corpo da requisição com os dados fornecidos

        try {
            const response = await api.put(
                `/api/livros/titulo/${encodeURIComponent(tituloOriginal)}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            if (!data) throw new Error("Resposta inválida do servidor.");

            // Retorna o livro atualizado
            return {
                id: data.id ?? data.livroId, // Usando livroId como fallback
                titulo: data.titulo,
                categoria: data.categoria,
                quantidade: data.quantidade,
            };
        } catch (error: any) {
            console.error("Erro ao atualizar o livro:", error);

            if (error.response) {
                if (error.response.status === 401) throw new Error("Não autorizado. Faça login novamente.");
                if (error.response.status === 404) throw new Error("Livro não encontrado.");
                if (error.response.status === 400) throw new Error("Erro de validação no envio dos dados.");
            }

            throw new Error("Erro desconhecido na requisição.");
        }
    },
};

export { livroService };
