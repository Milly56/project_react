    import { api } from "../../api";
    import Cookies from "js-cookie";

    export interface Retirada {
    nomeUsuario: string;
    tituloLivro: string;
    quantidade: number;
    motivo: string;
    contato: string;
    dataRetirada: string;
    dataDevolucao: string | null;
    }

    export const retiradaService = {
    async buscarPorNomeETitulo(
        nomeUsuario: string, 
        tituloLivro: string
    ): Promise<{ success: boolean; retirada?: Retirada; message?: string }> {

        const token = Cookies.get("token");

        try {
        const response = await api.get("/api/retiradas/buscar", {
            params: { nomeUsuario, tituloLivro },
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
        } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message || "Erro ao buscar retirada"
        };
        }
    }
    };
