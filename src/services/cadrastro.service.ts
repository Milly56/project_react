
    import { api } from "../api";

    export const usuarioService = {
    async cadastrarUsuario(data: { nome: string; data_nascimento: string; email: string; senha: string }) {
        const response = await api.post("/api/usuarios", data);
        return response.data;
    },

    };
