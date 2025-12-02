import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import { PrivateRoute } from "./routes/privateroutes";
import { AuthProvider } from "./context/authcontext";
import { ThemeProvider } from "./context/ThemeContext";
import { Erro404 } from "./pages/Erro404";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>

          <div className="fixed top-4 right-20 z-50">
            <ThemeToggle />
          </div>

          <Routes>
            <Route path="/" element={<Login />} />

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
      </ThemeProvider>
    </AuthProvider>
  );
}

export { App };
