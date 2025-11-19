    import { api } from "../../api";
    import Cookies from "js-cookie";

    export const devolucaoService = {
    async registrarDevolucao({
        nomeUsuario,
        tituloLivro
    }: {
        nomeUsuario: string;
        tituloLivro: string;
    }): Promise<{ success: boolean; message: string }> {
        try {
        const token = Cookies.get("token");

        const response = await api.put(
            "/api/retiradas/devolver",
            { nomeUsuario, tituloLivro },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );

        return response.data;
        } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Erro ao registrar devolução",
        };
        }
    },
    };
