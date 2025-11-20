import { useState } from "react";
import { usuarioSchema } from "../schema/CadrastroSchema";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usuarioService } from "../services/cadrastro.service";
import { TextField } from "@mui/material";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleRegister() {
    setErrors({});
    setLoading(true);

    const result = usuarioSchema.safeParse({
      nome,
      data_nascimento: dataNascimento,
      email,
      senha,
    });

    if (!result.success) {
      const formatted: any = {};
      result.error.issues.forEach((err) => {
        formatted[err.path[0]] = err.message;
      });
      setErrors(formatted);
      setLoading(false);
      return;
    }

    try {
      await usuarioService.cadastrarUsuario({
        nome,
        data_nascimento: dataNascimento,
        email,
        senha,
      });

      setSuccess(true);
    } catch (err: any) {
      console.log("ERRO AO CADASTRAR:", err);

      if (err.response?.status === 409) {
        setErrors({ email: "Este e-mail já está cadastrado." });
      } else {
        alert("Erro no servidor ao cadastrar.");
      }
    }

    setLoading(false);
  }

  function resetForm() {
    setNome("");
    setDataNascimento("");
    setEmail("");
    setSenha("");
    setErrors({});
    setSuccess(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      {success ? (
        /* TELA DE SUCESSO ---------------------------- */
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl text-center flex flex-col gap-4">
          <div className="mx-auto w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center">
            <AiOutlineCheck className="text-green-600" size={32} />
          </div>

          <h3 className="text-xl font-semibold">Cadastro realizado!</h3>

          <p className="text-gray-600">O usuário foi registrado com sucesso.</p>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetForm}
              className="bg-[#5288BC] text-white px-4 py-2 rounded-lg"
            >
              Cadastrar outro
            </button>

            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        /* FORMULÁRIO ---------------------------- */
        <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Criar Conta</h2>

          {/* NOME */}
          <div>
            <TextField
              label="Nome"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>

          {/* DATA */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Data de nascimento
            </label>
            <TextField
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            {errors.data_nascimento && (
              <p className="text-red-500 text-sm mt-1">
                {errors.data_nascimento}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <TextField
              label="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* SENHA */}
          <div>
            <div className="relative">
              <TextField
                label="Senha"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm sm:text-base pr-10"
                placeholder="Digite sua senha"
                type={showPass ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.senha && (
              <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
            )}
          </div>

          {/* BOTÃO */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full bg-[#5288BC] hover:bg-[#41719A] transition-all duration-300 ease-in-out text-white py-2.5 rounded font-medium text-sm sm:text-base ${
              loading ? "opacity-70 cursor-pointer" : "cursor-pointer"
            }`}
          >
            {loading ? "Cadastrando..." : "Cadastrar-se"}
          </button>

          <button onClick={onClose} className="text-red-500 underline text-center cursor-pointer">
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
