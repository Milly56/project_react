        import { api } from "../api";

    export const usuarioService = {

    async buscarPorId(id: number) {
        const response = await api.get(`/api/usuarios/${id}`);
        return response.data.data;
    },

    async deletarUsuario(id: number) {
        await api.delete(`/api/usuarios/${id}`);
        return true; 
    },

    async atualizarUsuario(id: number, data: { nome: string; email: string }) {
        const response = await api.put(`/api/usuarios/${id}`, data);
        return response.data.data;
    },

    async listarUsuarios() {
        const response = await api.get("/api/usuarios");
        return response.data.data;
    }
    };
