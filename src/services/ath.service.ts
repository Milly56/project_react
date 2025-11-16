    import { api } from "../api";
    import Cookies from "js-cookie";
    import { loginSchema, LoginSchemaType } from "../schema/LoginSchema";

    interface ReturnDataLogin {
    token: string; 
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
    };

    export { authService };
