    import { api } from "../../api"; 
    import Cookies from "js-cookie";

    export interface LivroDTO {
    titulo: string;
    categoria: string;
    quantidade: number;
    }

    export async function adicionarLivro(data: LivroDTO) {
    try {
        const token = Cookies.get("token");

        const response = await api.post("/api/livros", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        return response.data;
    } catch (error: any) {
        console.error("Erro ao adicionar livro:", error);
        throw error;
    }
    }
