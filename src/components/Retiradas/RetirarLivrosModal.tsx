import { useState } from "react";
import { retiradaService } from "../../services/retirada/criar_retiradas.service";
import { AiOutlineCheck, AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RetirarLivrosModal({ onClose }: { onClose: () => void }) {
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [tituloLivro, setTituloLivro] = useState("");
    const [quantidadeLivro, setQuantidadeLivro] = useState("");
    const [motivoRetirada, setMotivoRetirada] = useState("");
    const [contato, setContato] = useState("");

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    async function handleRetirar() {
        if (!nomeUsuario || !tituloLivro || !quantidadeLivro || !motivoRetirada || !contato) {
            setErrorMsg("Preencha todos os campos!");
            return;
        }

        try {
            setLoading(true);
            setErrorMsg("");

            await retiradaService.criarRetirada({
                nomeUsuario,
                tituloLivro,
                quantidadeLivro: Number(quantidadeLivro),
                motivoRetirada,
                contato,
            });

            setSuccess(true);
        } catch (error) {
            console.error(error);
            setErrorMsg("Erro ao registrar retirada.");
        } finally {
            setLoading(false);
        }
    }

    // -----------------------------
    //  TELA DE SUCESSO (ESTILO = Buscar Retirada)
    // -----------------------------
    if (success) {
        return (
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-lg text-center animate-fade-in">
                
                <div className="mx-auto w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 shadow-sm">
                    <AiOutlineCheck className="text-green-600" size={32} />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-green-700">
                    Retirada registrada!
                </h3>

                <p className="text-gray-600 mb-6">
                    A retirada do livro foi registrada com sucesso.
                </p>

                <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-lg font-semibold text-white 
                            bg-green-600 hover:bg-green-700 transition-all duration-200
                            shadow-md hover:shadow-lg active:scale-95"
                >
                    Fechar
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-5 animate-fade-in">
            <h2 className="text-xl font-semibold mb-2 text-center">Retirar livro</h2>

            {errorMsg && (
                <div className="text-red-500 text-center text-sm bg-red-100 border border-red-300 py-2 rounded-lg">
                    {errorMsg}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:ring-2 focus:ring-[#5288BC] focus:border-[#5288BC] outline-none"
                    placeholder="Nome do usuário"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                />

                <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:ring-2 focus:ring-[#5288BC] focus:border-[#5288BC] outline-none"
                    placeholder="Título do livro"
                    value={tituloLivro}
                    onChange={(e) => setTituloLivro(e.target.value)}
                />

                <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:ring-2 focus:ring-[#5288BC] focus:border-[#5288BC] outline-none"
                    placeholder="Quantidade"
                    value={quantidadeLivro}
                    onChange={(e) => setQuantidadeLivro(e.target.value)}
                />

                <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:ring-2 focus:ring-[#5288BC] focus:border-[#5288BC] outline-none"
                    placeholder="Motivo da retirada"
                    value={motivoRetirada}
                    onChange={(e) => setMotivoRetirada(e.target.value)}
                />

                <input
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 
                            focus:ring-2 focus:ring-[#5288BC] focus:border-[#5288BC] outline-none"
                    placeholder="Contato (telefone)"
                    value={contato}
                    onChange={(e) => setContato(e.target.value)}
                />
            </div>

            <button
                className="flex items-center justify-center gap-2 bg-[#5288BC] hover:bg-[#3c6c99] 
                        text-white py-2 rounded-lg transition disabled:opacity-50"
                onClick={handleRetirar}
                disabled={loading}
            >
                {loading && (
                    <AiOutlineLoading3Quarters className="animate-spin text-white" size={20} />
                )}
                {loading ? "Registrando..." : "Retirar"}
            </button>

            <button
                onClick={onClose}
                className="text-red-500 underline text-center"
            >
                Cancelar
            </button>
        </div>
    );
}
