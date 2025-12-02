"use client";

import { useEffect, useState } from "react";
import { authService } from "../services/ath.service";
import { usuarioService } from "../services/perfil.service";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Perfil() {
    const [usuario, setUsuario] = useState<any>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [usuariosLista, setUsuariosLista] = useState<any[]>([]);
    const [erro, setErro] = useState("");

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const id = authService.getUserIdFromToken();
        if (id === null) {
            navigate("/");
            return;
        }

        usuarioService.buscarPorId(id).then((data) => {
            setUsuario(data);
            setNome(data.nome);
            setEmail(data.email);
        });

        if (id === 1) {
            usuarioService
                .listarUsuarios()
                .then((data) => setUsuariosLista(data))
                .catch(() => setErro("Erro ao buscar usuários."));
        }
    }, []);

    if (!usuario) return <p className="text-center mt-10">Carregando...</p>;

    const handleLogout = () => {
        authService.clearToken();
        navigate("/");
    };

    const handleReturnHome = () => {
        navigate("/home");
    }

    const handleDelete = async () => {
        const confirmacao = confirm("Tem certeza que deseja excluir sua conta?");
        if (!confirmacao) return;

        try {
            await usuarioService.deletarUsuario(usuario.id);
            authService.clearToken();
            navigate("/");
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao excluir usuário.");
        }
    };

    const handleUpdate = async () => {
        try {
            const id = usuario.id;

            const updated = await usuarioService.atualizarUsuario(id, { nome, email });

            setUsuario(updated);
            setEditMode(false);
            alert("Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao atualizar perfil.");
        }
    };

    const handleAdminDeleteUser = async (id: number) => {
        if (!confirm("Excluir este usuário?")) return;

        try {
            await usuarioService.deletarUsuario(id);

            setUsuariosLista((prev) => prev.filter((u) => u.id !== id));
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            alert("Erro ao excluir.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 p-8 w-[full] mb-8">
                
                <div className="flex flex-row justify-between items-center">
                    <KeyboardBackspaceIcon 
                        onClick={handleReturnHome} 
                        className="text-[#5288BC] dark:text-white cursor-pointer" 
                    />

                    <button
                        onClick={handleLogout}
                        className="
                            px-3 py-2 
                            bg-red-600 text-white 
                            rounded-lg 
                            hover:bg-red-700 
                            transition text-sm cursor-pointer
                            dark:bg-red-500 dark:hover:bg-red-600
                        "
                    >
                        Logout
                    </button>
                </div>

                <h1 className="text-2xl font-semibold text-center my-10 sm:my-6 text-[#5288BC] dark:text-white">
                    Perfil do Usuário
                </h1>

                <div className="flex flex-row justify-between flex-wrap gap-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Nome</label>
                        {editMode ? (
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5288BC] shadow-inner"
                            />
                        ) : (
                            <input
                                type="text"
                                readOnly
                                value={usuario.nome}
                                className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 dark:text-white select-none shadow-inner"
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email</label>
                        {editMode ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5288BC] shadow-inner"
                            />
                        ) : (
                            <input
                                type="text"
                                readOnly
                                value={usuario.email}
                                className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 dark:text-white select-none shadow-inner"
                            />
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-row justify-center sm:justify-end gap-4">
                    {editMode ? (
                        <button
                            onClick={handleUpdate}
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm cursor-pointer"
                        >
                            Salvar
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-6 py-2 bg-[#FFA239] text-white rounded-lg hover:bg-[#fcac52] transition text-sm cursor-pointer"
                        >
                            Editar
                        </button>
                    )}

                    <button
                        onClick={handleDelete}
                        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm cursor-pointer"
                    >
                        Excluir conta
                    </button>
                </div>

                {usuario.id === 1 && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-10 w-full px-3 py-2 bg-[#5288BC] text-white rounded-lg hover:bg-[#3e79af] transition text-sm cursor-pointer"
                    >
                        Listar Usuários
                    </button>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[#5288BC] dark:text-white">Usuários Cadastrados</h2>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-600 dark:text-gray-300 hover:text-red-500 text-lg"
                            >
                                ✕
                            </button>
                        </div>

                        {erro && <p className="text-red-500 text-center">{erro}</p>}

                        <div className="max-h-80 overflow-y-auto pr-2">
                            {usuariosLista.length === 0 ? (
                                <p className="text-center dark:text-gray-300">Carregando...</p>
                            ) : (
                                usuariosLista.map((u) => (
                                    <div
                                        key={u.id}
                                        className="border-b border-gray-200 dark:border-gray-700 py-2 flex justify-between items-center text-gray-700 dark:text-gray-200"
                                    >
                                        <div>
                                            <p>{u.nome}</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm">{u.email}</p>
                                        </div>

                                        <button
                                            onClick={() => handleAdminDeleteUser(u.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 cursor-pointer"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
