import { api } from "../../api";
import Cookies from "js-cookie";

export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    quantidade: number;
}

const livroService = {
    async excluirLivro(titulo: string, quantidade: number): Promise<void> {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
            const response = await api.delete(`/api/livros`, {
                data: { titulo, quantidade }, 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                console.log("Livro excluído com sucesso");
            }
        } catch (error: any) {
            console.error("Erro ao excluir livro:", error);
            throw new Error("Erro ao excluir o livro.");
        }
    },
};

export { livroService };
