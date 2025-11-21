"use client";

import { useEffect, useState } from "react";
import { authService } from "../services/ath.service";
import { usuarioService } from "../services/perfil.service";
import { useNavigate } from "react-router-dom";

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

			const updated = await usuarioService.atualizarUsuario(id, {
					nome,
					email,
			});

			setUsuario(updated);
			setEditMode(false);
			alert("Perfil atualizado com sucesso!");
			} catch (error) {
			console.error("Erro ao atualizar usuário:", error);
			alert("Erro ao atualizar perfil.");
			}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
			<div className="bg-white shadow-lg rounded-2xl border border-gray-200 p-8 w-full max-w-md mb-8">
				<h1 className="text-2xl font-semibold text-center mb-6 text-[#5288BC]">Perfil do Usuário</h1>
					<div className="space-y-6">
						<div>
							<label className="block text-gray-700 font-semibold mb-1">Nome</label>
							{editMode ? (
							<input
								type="text"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
								className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700
								focus:outline-none focus:ring-2 focus:ring-[#5288BC] shadow-inner"
							/>
							) : (
							<input
								type="text"
								readOnly
								value={usuario.nome}
								className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 select-none shadow-inner"
							/>
							)}
						</div>

						<div>
							<label className="block text-gray-700 font-semibold mb-1">Email</label>
							{editMode ? (
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700
									focus:outline-none focus:ring-2 focus:ring-[#5288BC] shadow-inner"
								/>
								) : (
								<input
									type="text"
									readOnly
									value={usuario.email}
									className="w-full px-3 py-2 rounded-lg border border-transparent bg-transparent text-gray-700 select-none shadow-inner"
								/>
							)}
						</div>
					</div>

					<div className="mt-8 flex justify-between gap-2">
						{editMode ? (
							<button
								onClick={handleUpdate}
								className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm"
							>
								Salvar
							</button>
						) : (
							<button
								onClick={() => setEditMode(true)}
								className="px-3 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition text-sm"
							>
								Editar
							</button>
						)}

						<button
							onClick={handleLogout}
							className="px-3 py-2 bg-[#5288BC] text-white rounded-lg hover:bg-[#41719A] transition text-sm"
						>
							Logout
						</button>
						<button
							onClick={handleDelete}
							className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
						>
							Excluir
						</button>
					</div>

					{usuario.id === 1 && (
						<button
							onClick={() => setShowModal(true)}
							className="mt-4 w-full px-3 py-2 bg-[#7FCEFB] text-white rounded-lg hover:bg-[#6AC0EB] transition text-sm"
						>
							Listar Usuários
						</button>
					)}
				</div>

				{showModal && (
					<div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
						<div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
							<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold text-[#5288BC]">Usuários Cadastrados</h2>

							<button
								onClick={() => setShowModal(false)}
								className="text-gray-600 hover:text-red-500 text-lg"
							>
								✕
							</button>
							</div>

							{erro && <p className="text-red-500 text-center">{erro}</p>}

							<div className="max-h-80 overflow-y-auto pr-2">
							{usuariosLista.length === 0 ? (
									<p className="text-center">Carregando...</p>
							) : (
								usuariosLista.map((u) => (
								<div
									key={u.id}
									className="border-b border-gray-200 py-2 flex justify-between text-gray-700"
								>
									<span>{u.nome}</span>
									<span className="text-gray-500">{u.email}</span>
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
