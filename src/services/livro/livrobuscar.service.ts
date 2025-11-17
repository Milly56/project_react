    import { api } from "../../api";
    import Cookies from "js-cookie";

    export interface Livro {
    id: number;
    titulo: string;
    categoria: string;
    quantidade: number;
    }

    const livroService = {
    async buscarLivroPorTitulo(titulo: string): Promise<Livro | null> {
        const token = Cookies.get("token");

        if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
        const response = await api.get(
            `/api/livros/titulo/${encodeURIComponent(titulo)}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        const data = response.data?.data; 

        if (!data) return null;

        const livro: Livro = {
            id: data.livroId,
            titulo: data.titulo,
            categoria: data.categoria,
            quantidade: data.quantidade,
        };

        return livro;

        } catch (error: any) {
        console.error("Erro ao buscar o livro:", error);

        if (error.response) {
            if (error.response.status === 401)
            throw new Error("Não autorizado. Faça login novamente.");

            if (error.response.status === 404)
            throw new Error("Livro não encontrado.");
        }

        throw new Error("Erro desconhecido na requisição.");
        }
    },
    };

    export { livroService };
