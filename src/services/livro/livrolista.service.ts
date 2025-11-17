    import { api } from "../../api"; 
    import Cookies from "js-cookie";

    export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    quantidade: number;
    }

    interface LivroResponse {
    success: boolean;
    data: LivroData[];
    total: number;
    }

    interface LivroData {
    livroId: number;
    titulo: string;
    categoria: string;
    quantidade: number;
    }

    const livroService = {
    async buscarLivros(): Promise<LivroResponse> {  
        const token = Cookies.get("token");

        if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
        const response = await api.get<LivroResponse>("/api/livros", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data; 
        } catch (error: any) {
        console.error("Erro ao buscar os livros:", error);
        throw new Error("Erro ao buscar os livros.");
        }
    },
    };

    export { livroService };
