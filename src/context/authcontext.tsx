    import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    } from "react";
    import Cookies from "js-cookie";
    import { authService } from "../services/ath.service";
    import { LoginSchemaType } from "../schema/LoginSchema";
    import { isTokenValid } from "../utils/checkToken";

    interface AuthContextType {
    token: string | null;
    login: (data: LoginSchemaType) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    }

    const AuthContext = createContext<AuthContextType | null>(null);

    export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = Cookies.get("token");

        if (savedToken && isTokenValid(savedToken)) {
        setToken(savedToken);
        } else {
        Cookies.remove("token");
        setToken(null);
        }
    }, []);

    const login = async (data: LoginSchemaType) => {
        const response = await authService.authenticate(data);
        const accessToken: string = response.token;

        if (!accessToken) throw new Error("Token não retornado pela API");

        if (!isTokenValid(accessToken)) {
        throw new Error("Token retornado pela API está expirado ou inválido.");
        }

        Cookies.set("token", accessToken, { expires: 7 });
        setToken(accessToken);
    };

    const logout = () => {
        Cookies.remove("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider
        value={{
            token,
            login,
            logout,
            isAuthenticated: token !== null && isTokenValid(token),
        }}
        >
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
    };
