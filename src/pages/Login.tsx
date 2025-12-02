import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import RegisterModal from "../components/RegisterModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { TextField } from "@mui/material";

import fundo from "../assets/fundo.png";
import imageLogin from "../assets/image-login.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login({ email, senha });
      navigate("/home");
    } catch (error) {
      console.log("Erro ao fazer login:", error);
      alert("Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <div className="relative flex justify-center items-center overflow-hidden min-h-screen px-4 sm:px-6 md:px-8 dark:bg-[#0E0E0E] bg-gray-100 transition-colors">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 rounded-2xl shadow-xl overflow-hidden w-full max-w-[1200px] min-h-screen lg:min-h-[600px]
        bg-white dark:bg-[#1A1A1A] transition-colors">

        <div className="relative flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-10 
            bg-white/85 dark:bg-[#1A1A1A]/90 backdrop-blur-sm rounded-2xl lg:bg-transparent
            overflow-hidden z-10 transition-colors">

          <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-8 text-center z-10
            text-black dark:text-white">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="w-full space-y-5 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10"
          >
            <div>
              <TextField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                label="Digite seu email"
                required
                InputLabelProps={{
                  style: { color: "inherit" }
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "inherit",
                  },
                }}
              />
            </div>

            <div>
              <div className="relative">
                <TextField
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full"
                  label="Senha"
                  required
                  InputLabelProps={{
                    style: { color: "inherit" }
                  }}
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "inherit",
                    },
                  }}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="
                w-full 
                bg-[#5288BC] hover:bg-[#41719A] 
                dark:bg-[#C53030] dark:hover:bg-[#9B2C2C]
                text-white py-2.5 sm:py-3 rounded
                font-medium text-sm sm:text-base cursor-pointer 
                transition-colors duration-300
              "
            >
              Entrar
            </button>
          </form>

          <div className="w-full flex justify-end mt-4 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10">
            <button
              type="button"
              onClick={() => setOpenRegister(true)}
              className="
                text-[#7FCEFB]
                dark:text-[#F56565]
                text-xs sm:text-[15px]
                hover:underline cursor-pointer
              "
            >
              Cadastre-se agora
            </button>
          </div>
        </div>

        <div
          className="relative hidden lg:flex flex-col justify-center items-center text-white px-8 pt-8 pb-10 overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${fundo})` }}
        >
          <h3 className="relative text-[25px] font-bold mb-8 text-center">
            O futuro começa com a leitura!
          </h3>

          <div className="flex items-end gap-6 w-full justify-center mt-8">
            <p className="text-[18px] leading-relaxed max-w-[200px] text-left mb-12">
              "A sua biblioteca, a qualquer hora e em qualquer lugar. Faça seu login."
            </p>

            <div className="relative flex justify-center items-center h-75 w-60 rounded-2xl overflow-hidden">
              <img
                src={imageLogin}
                alt="Pessoa lendo"
                className="relative w-[350px] z-10"
              />
            </div>
          </div>
        </div>
      </div>

      <RegisterModal
        isOpen={openRegister}
        onClose={() => setOpenRegister(false)}
      />
    </div>
  );
}
