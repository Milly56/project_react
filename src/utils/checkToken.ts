    import { jwtDecode } from "jwt-decode";

    export function isTokenValid(token: string): boolean {
    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch {
        return false;
    }
    }
