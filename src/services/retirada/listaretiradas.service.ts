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
    async listarTodas(): Promise<{ success: boolean; retiradas: Retirada[] }> {
        const token = Cookies.get("token");

        if (!token) {
            throw new Error("Token não encontrado. Faça login novamente.");
        }

        const response = await api.get("/api/retiradas", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const lista = response.data.retiradas.retiradas;

        return {
            success: response.data.success,
            retiradas: lista,
        };
    },
};
