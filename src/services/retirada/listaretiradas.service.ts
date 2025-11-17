    import { api } from "../../api"; 
    import Cookies from "js-cookie";

    export interface Retirada {
    id: string;
    nomeUsuario: string;
    titulo: string;
    telefone: string;
    dataRetirada: string;
    dataDevolucao: string;
    }

    interface RetiradaResponse {
    success: boolean;
    data: RetiradaData[];
    total: number;
    }

    export interface RetiradaData {
    retiradaId: string;
    nomeUsuario: string;
    titulo: string;
    telefone: string;
    dataRetirada: string;
    dataDevolucao: string;
    }

    const retiradaService = {
    async buscarRetiradas(): Promise<RetiradaResponse> {
        const token = Cookies.get("token");

        if (!token) {
        throw new Error("Token não encontrado. Faça login novamente.");
        }

        try {
        const response = await api.get<RetiradaResponse>("/api/retiradas", {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
        } catch (error: any) {
        console.error("Erro ao buscar as retiradas:", error);
        throw new Error("Erro ao buscar as retiradas.");
        }
    },
    };

    export { retiradaService };
