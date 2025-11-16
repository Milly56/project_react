import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [pw1, setPw1] = useState(false);
  const [pw2, setPw2] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setPw1(false);
      setPw2(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (form.get("password") !== form.get("password2")) {
      alert("As senhas não coincidem.");
      return;
    }

    setSuccess(true);
  };

  const inputStyle =
    "w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

      {!success && (
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg animate-fade-in">

          <h3 className="text-xl font-semibold text-center mb-4">
            Cadastre-se agora
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Nome</label>
              <input name="name" required className={inputStyle} />
            </div>


            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Data de nascimento
              </label>
              <input type="date" name="dob" className={inputStyle} />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Email</label>
              <input type="email" name="email" required className={inputStyle} />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Digite sua senha
              </label>

              <div className="relative">
                <input
                  type={pw1 ? "text" : "password"}
                  name="password"
                  required
                  className={`${inputStyle} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setPw1(!pw1)}
                  className="absolute inset-y-0 right-3 flex items-center 
                            text-gray-500 hover:text-gray-700"
                >
                  {pw1 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Confirme sua senha
              </label>

              <div className="relative">
                <input
                  type={pw2 ? "text" : "password"}
                  name="password2"
                  required
                  className={`${inputStyle} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setPw2(!pw2)}
                  className="absolute inset-y-0 right-3 flex items-center 
                            text-gray-500 hover:text-gray-700"
                >
                  {pw2 ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-[#5288BC] hover:bg-[#41719A] 
                      text-white py-2.5 sm:py-3 rounded font-medium text-sm sm:text-base"
              type="submit"
            >
              Cadastrar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-[#FF5F59] text-xs sm:text-sm 
                        font-medium mt-2 hover:underline"
            >
              Cancelar
            </button>

          </form>
        </div>
      )}

      {success && (
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg text-center animate-fade-in">

          <div className="mx-auto w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4">
            <AiOutlineCheck className="text-green-600" size={32} />
          </div>

          <h3 className="text-xl font-semibold mb-2">Cadastrado com sucesso!</h3>

          <p className="text-gray-600 mb-6">
            Parabéns! Seu cadastro foi criado com sucesso.
          </p>

          <div className="flex gap-3">

            <button
              className="w-1/2 py-2 rounded font-medium text-sm
                        border border-[#FF5F59] text-[#FF5F59] hover:bg-red-50"
              onClick={onClose}
            >
              Fechar
            </button>

            <button
              className="w-1/2 bg-[#5288BC] hover:bg-[#41719A]
                        text-white py-2 rounded font-medium text-sm"
              onClick={onClose}
            >
              Fazer Login
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
