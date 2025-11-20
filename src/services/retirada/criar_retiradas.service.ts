    import { api } from "../../api";
    import Cookies from "js-cookie";

    export interface CriarRetiradaDTO {
    nomeUsuario: string;
    tituloLivro: string;
    quantidadeLivro: number;
    motivoRetirada: string;
    contato: string;
    }

    export const retiradaService = {
    async criarRetirada(data: CriarRetiradaDTO) {
        const token = Cookies.get("token");

        if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
        const response = await api.post("/api/retiradas", data, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
        } catch (error) {
        console.error("Erro ao registrar retirada:", error);
        throw new Error("Erro ao registrar retirada.");
        }
    }
    };
