    import { ReactNode } from "react";
    import { Navigate } from "react-router-dom";
    import { useAuth } from "../context/authcontext";

    export function PrivateRoute({ children }: { children: ReactNode }) {
    const { token, loading, isAuthenticated } = useAuth();

    if (loading) {
        return <div>Carregando...</div>; 
    }

    if (!token || !isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
    }
