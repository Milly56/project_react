import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import { PrivateRoute } from "./routes/privateroutes";
import { AuthProvider } from "./context/authcontext";
import { Erro404 } from "./pages/Erro404";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"
          element={<Login />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Erro404 />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export { App };
