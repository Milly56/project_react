"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";
import LivroAdicionarModal from "../components/Livros/LivroAdicionarModal";
import RetirarLivroModal from "../components/Retiradas/RetirarLivrosModal";
import LivroBuscarModal from "../components/Livros/LivroBuscarModal";
import LivroExcluirModal from "../components/Livros/LivroExcluirModel";
import LivroListModal from "../components/Livros/LivroListaModal";
import LivroEditarModal from "../components/Livros/LivroEditarModal";
import ListaRetiradasModal from "../components/Retiradas/ListaRetiradasModal";

import { Livro } from "../services/livro/livrobuscar.service";
import { livroService } from "../services/livro/livroeditar.service";
import BuscarRetiradaModal from "../components/Retiradas/BuscarRetiradasModal";
import DevolverLivroModal from "../components/Retiradas/DevolucaoRetirada";
import ExcluirRetiradaModal from "../components/Retiradas/ExcluirRetiradaModal";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [choice, setChoice] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  const navigate = useNavigate();

  const handleSelectLivro = (livro: Livro) => setLivroSelecionado(livro);

  const handleCategoriaClick = (titulo: string) => {
    const titleToIconMap: Record<string, string> = {
      "adicionar livros a biblioteca digital": "home_adiciona",
      "excluir livros da biblioteca digital": "home_excluir",
      "listar livros da biblioteca digital": "home_lista",
      "pesquisar livros na biblioteca digital": "home_pesquisar",
      "atualizar livros da biblioteca digital": "home_atualizar",
    };
    const icon = titleToIconMap[titulo];
    if (icon) {
      setClickedButton(icon);
      setOpen(true);
    }
  };

  const categorias = [
    { titulo: "adicionar livros a biblioteca digital", icon: "src/assets/home_adiciona.png" },
    { titulo: "excluir livros da biblioteca digital", icon: "src/assets/home_excluir.png" },
    { titulo: "listar livros da biblioteca digital", icon: "src/assets/home_lista.png" },
    { titulo: "pesquisar livros na biblioteca digital", icon: "src/assets/home_pesquisar.png" },
    { titulo: "atualizar livros da biblioteca digital", icon: "src/assets/home_atualizar.png" },
  ];

  return (
    <div className="flex justify-center items-center bg-gray-100 px-2 sm:px-4 min-h-screen">
      <div className="relative rounded-2xl shadow-xl bg-[#678DB2] overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">

        <div className="absolute top-2 right-2 z-20">
          <FaUserCircle
            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-9 lg:w-10 lg:h-10 text-white cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/perfil")}
          />
        </div>

        <div className="relative w-full">
          <img
            src="src/assets/home_completo.png"
            alt="Home Completo"
            className="w-full h-auto object-cover block"
          />

          <div className="absolute top-[60%] sm:top-[62%] md:top-[65%] left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 z-20">
            {categorias.map((categoria) => (
              <div
                key={categoria.titulo}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 cursor-pointer flex items-center justify-center hover:scale-105 transition-transform"
                onClick={() => handleCategoriaClick(categoria.titulo)}
              >
                <img
                  src={categoria.icon}
                  alt={categoria.titulo}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAIS */}
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Escolha uma opção</h2>
        <div className="flex flex-col gap-3 sm:gap-4">
          <button
            className="w-full bg-[#A0BBD5] text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg"
            onClick={() => {
              setChoice("livros");
              setOpen(false);
              setOpenSecond(true);
            }}
          >
            Livros
          </button>
          <button
            className="w-full bg-[#4F73AE] text-white py-2.5 sm:py-3 rounded-xl text-base sm:text-lg"
            onClick={() => {
              setChoice("retiradas");
              setOpen(false);
              setOpenSecond(true);
            }}
          >
            Retiradas
          </button>
          <button
            className="w-full bg-[#5288BC] text-white py-2 rounded-lg text-sm sm:text-base"
            onClick={() => setOpen(false)}
          >
            Fechar
          </button>
        </div>
      </Modal>

      <Modal isOpen={openSecond} onClose={() => setOpenSecond(false)}>
        {choice === "livros" && (
          <>
            {clickedButton === "home_adiciona" && <LivroAdicionarModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_pesquisar" && <LivroBuscarModal onClose={() => setOpenSecond(false)} onSelect={handleSelectLivro} />}
            {clickedButton === "home_atualizar" &&
              (livroSelecionado ? (
                <LivroEditarModal
                  livro={livroSelecionado}
                  onClose={() => setOpenSecond(false)}
                  onSave={async (tituloOriginal, dadosEditados) => {
                    const atualizado = await livroService.atualizarLivro(tituloOriginal, dadosEditados);
                    setLivroSelecionado(atualizado);
                    setOpenSecond(false);
                  }}
                />
              ) : (
                <div className="text-center text-red-600 p-4">
                  Primeiro selecione um livro em <b>Pesquisar</b>.
                </div>
              ))}
            {clickedButton === "home_lista" && <LivroListModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_excluir" && <LivroExcluirModal onClose={() => setOpenSecond(false)} />}
          </>
        )}
        {choice === "retiradas" && (
          <>
            {clickedButton === "home_adiciona" && <RetirarLivroModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_lista" && <ListaRetiradasModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_atualizar" && <DevolverLivroModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_pesquisar" && <BuscarRetiradaModal onClose={() => setOpenSecond(false)} />}
            {clickedButton === "home_excluir" && <ExcluirRetiradaModal onClose={() => setOpenSecond(false)} />}
          </>
        )}
      </Modal>
    </div>
  );
}
