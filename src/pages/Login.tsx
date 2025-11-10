import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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

          <img
            src="src/assets/moldura_esquerda.png"
            alt="Decoração canto inferior esquerdo"
            className="absolute bottom-0 left-0 w-10 sm:w-[55px] md:w-[65px] opacity-85 lg:hidden"
          />

        
          <img
            src="src/assets/moldura_direita.png"
            alt="Decoração canto superior direito"
            className="absolute top-0 right-0 w-10 sm:w-[55px] md:w-[65px] opacity-85 lg:hidden"
          />

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-center z-10">
            Login
          </h2>

          <form className="w-full space-y-5 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Endereço de Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base"
                placeholder="Digite seu email"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Digite sua senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base pr-10"
                  placeholder="Senha"
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
              className="w-full bg-[#5288BC] hover:bg-[#41719A] text-white py-2.5 sm:py-3 rounded font-medium text-sm sm:text-base"
              type="submit"
            >
              Entrar
            </button>
          </form>

          <div className="w-full flex justify-end mt-4 max-w-[300px] sm:max-w-[380px] md:max-w-[420px] z-10">
            <a href="#" className="text-[#7FCEFB] text-xs sm:text-sm hover:underline">
              Cadastre-se agora
            </a>
          </div>
        </div>

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

            <div className="relative flex justify-center items-center h-80 w-[340px] rounded-2xl overflow-hidden">
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
    </div>
  );
}
