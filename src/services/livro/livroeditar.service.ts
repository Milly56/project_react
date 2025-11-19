import { api } from "../../api";
import Cookies from "js-cookie";

export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    quantidade: number;
}

const livroService = {

    async atualizarLivro(
        tituloOriginal: string,
        dados: Partial<Livro>
    ): Promise<Livro> {

        const token = Cookies.get("token");

        if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
            const response = await api.put(
                `/api/livros/titulo/${encodeURIComponent(tituloOriginal)}`,
                dados,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const livro = response.data;

            return {
                id: livro.id ?? livro.livroId,
                titulo: livro.titulo,
                categoria: livro.categoria,
                quantidade: livro.quantidade
            };

        } catch (error: any) {
            console.error("Erro ao atualizar o livro:", error);

            if (error.response) {
                if (error.response.status === 401)
                    throw new Error("Não autorizado. Faça login novamente.");
                if (error.response.status === 404)
                    throw new Error("Livro não encontrado.");
                if (error.response.status === 400)
                    throw new Error("Erro de validação nos dados enviados.");
            }

            throw new Error("Erro desconhecido na requisição.");
        }
    }

};

export { livroService };
