    import { api } from "../api";
    import Cookies from "js-cookie";
    import { jwtDecode } from "jwt-decode";
    import { loginSchema, LoginSchemaType } from "../schema/LoginSchema";

    interface ReturnDataLogin {
    token: string;
    }

    interface TokenPayload {
    id: number;
    email: string;
    nome: string;
    }

    const authService = {
    async authenticate(data: LoginSchemaType) {
        const validatedData = loginSchema.parse(data);

        const response = await api.post<ReturnDataLogin>("/api/login", validatedData);

        return response.data; 
    },

    setToken(token: string) {
        Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
        });
    },

    getToken() {
        return Cookies.get("token");
    },

    clearToken() {
        Cookies.remove("token");
    },

    getUserIdFromToken() {
        const token = Cookies.get("token");
        if (!token) return null;

        try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.id; 
        } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
        }
    },

    getUserNameFromToken() {
        const token = Cookies.get("token");
        if (!token) return null;

        try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.nome;
        } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
        }
    },

    getUserEmailFromToken() {
        const token = Cookies.get("token");
        if (!token) return null;

        try {
        const decoded = jwtDecode<TokenPayload>(token);
        return decoded.email;
        } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
        }
    },
    };

    export { authService };
