import { api } from "../../api";
import Cookies from "js-cookie";

export const deletarRetiradaService = {
    async deletar(nomeUsuario: string, tituloLivro: string) {
        try {
            const token = Cookies.get("token");

            const response = await api.delete("/api/retiradas/deletar", {
                headers: { Authorization: `Bearer ${token}` },
                data: { nomeUsuario, tituloLivro }
            });

            return response.data;
        } catch (error: any) {
            return {
                success: false,
                message: error.response?.data?.message || "Erro ao deletar retirada."
            };
        }
    }
};