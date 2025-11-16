import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import RegisterModal from "../components/RegisterModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

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
    <div className="relative flex justify-center items-center bg-gray-100 overflow-hidden min-h-screen px-4 sm:px-6 md:px-8">
      <div
        className="relative grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden 
                    w-full max-w-[1000px] 
                    min-h-screen lg:min-h-[500px]"
      >
        <img
          src="src/assets/moldura.png"
          alt="Fundo moldura mobile/tablet"
          className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-90 lg:hidden z-0"
        />

        <div className="relative flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 py-10 bg-white/85 backdrop-blur-sm rounded-2xl lg:bg-transparent overflow-hidden z-10">

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-center z-10">
            Login
          </h2>

          <form
            onSubmit={handleLogin}
            className="w-full space-y-5 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10"
          >
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Endereço de Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base"
                placeholder="Digite seu email"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Digite sua senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base pr-10"
                  placeholder="Senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5288BC] hover:bg-[#41719A] text-white py-2.5 sm:py-3 rounded font-medium text-sm sm:text-base"
            >
              Entrar
            </button>
          </form>

          <div className="w-full flex justify-end mt-4 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10">
            <button
              type="button"
              onClick={() => setOpenRegister(true)}
              className="text-[#7FCEFB] text-xs sm:text-sm hover:underline"
            >
              Cadastre-se agora
            </button>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div
          className="relative hidden lg:flex flex-col justify-start items-center text-white px-8 pt-8 pb-10 overflow-hidden 
                      bg-[url('src/assets/fundo.png')] bg-cover bg-center"
        >
          <h3 className="text-base font-medium mb-8 text-center">
            O futuro começa com a leitura!
          </h3>

          <div className="flex items-end gap-6 w-full justify-center mt-8">
            <p className="text-sm leading-relaxed max-w-[180px] text-left mb-12">
              "A sua biblioteca, a qualquer hora e em qualquer lugar. Faça seu login."
            </p>

            <div className="relative flex justify-center items-center h-75 w-60 rounded-2xl overflow-hidden ">
              <img
                src="src/assets/moldura.png"
                alt="Moldura decorativa"
                className="absolute left-1/2 top-1/2 w-[130%] h-[130%] 
                            -translate-x-1/2 -translate-y-1/2 
                            object-contain object-center rounded-2xl z-0"
              />
              <img
                src="src/assets/lendo.png"
                alt="Pessoa lendo"
                className="relative w-[280px] h-[360px] z-10"
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
