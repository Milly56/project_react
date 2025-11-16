        import { ReactNode } from "react";
        import { Navigate } from "react-router-dom";
        import { useAuth } from "../context/authcontext";
        import { isTokenValid } from "../utils/checkToken";

        export function PrivateRoute({ children }: { children: ReactNode }) {
        const { token } = useAuth();

        if (!token || !isTokenValid(token)) {
            return <Navigate to="/" replace />;
        }

        return <>{children}</>;
        }
