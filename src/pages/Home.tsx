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

import CategoriaMenu from "../components/CategoriaMenu";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const [choice, setChoice] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

  const navigate = useNavigate();

  const handleSelectLivro = (livro: Livro) => {
    setLivroSelecionado(livro);
  };

  const handleCategoriaClick = (titulo: string) => {
    const map: Record<string, string> = {
      "adicionar livros a biblioteca digital": "home_adiciona",
      "excluir livros da biblioteca digital": "home_excluir",
      "listar livros da biblioteca digital": "home_lista",
      "pesquisar livros na biblioteca digital": "home_pesquisar",
      "atualizar livros da biblioteca digital": "home_atualizar",
    };

    const icon = map[titulo];
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
    <div className="flex flex-col justify-center items-center bg-gray-100 p-2 w-full overflow-x-hidden">
      <div className="h-full rounded-2xl shadow-xl bg-[#678DB2] w-full max-w-[1600px] flex flex-col relative overflow-hidden p-4 sm:p-6">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[40px] sm:text-[45px] font-bold text-white leading-snug pt-20">
              O futuro começa com a{" "}
              <span className="text-[#A0BBD5]">leitura!</span>
            </h1>
          </div>

          <div className="w-[220px] h-[300px] relative justify-center hidden lg:flex">
            <div className="w-56 h-90 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl shadow-lg"></div>

            <div className="w-56 h-90 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl shadow-lg absolute top-16 left-14 sm:left-20 flex items-center justify-center text-white">
              <p className="mx-4">"A sua biblioteca, a qualquer hora e em qualquer lugar"</p>
            </div>
          </div>

          <div className="w-[220px] h-[300px] hidden lg:block"></div>
        </div>

        <div className="absolute top-4 right-4">
          <FaUserCircle
            className="w-10 h-10 md:w-12 md:h-12 text-white cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/perfil")}
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-2 pt-20 pb-6 w-full">
          <div className="w-full border border-[#74B7F6]"></div>
          <p className="text-center text-[25px] text-white">Categorias</p>
          <div className="w-full border border-[#74B7F6]"></div>
        </div>

        <div className="flex flex-wrap justify-center lg:justify-around gap-6 py-10 w-full">
          {categorias.map((c) => (
            <CategoriaMenu
              key={c.titulo}
              icon={c.icon}
              onClick={() => handleCategoriaClick(c.titulo)}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold mb-4 text-center">Escolha uma opção</h2>

        <div className="flex flex-col gap-4">
          <button
            className="w-full bg-[#A0BBD5] text-white py-3 rounded-xl text-lg"
            onClick={() => {
              setChoice("livros");
              setOpen(false);
              setOpenSecond(true);
            }}
          >
            Livros
          </button>

          <button
            className="w-full bg-[#4F73AE] text-white py-3 rounded-xl text-lg"
            onClick={() => {
              setChoice("retiradas");
              setOpen(false);
              setOpenSecond(true);
            }}
          >
            Retiradas
          </button>

          <button
            onClick={() => setOpen(false)}
            className="w-full bg-[#5288BC] text-white py-2 rounded-lg"
          >
            Fechar
          </button>
        </div>
      </Modal>

      <Modal isOpen={openSecond} onClose={() => setOpenSecond(false)}>
        {choice === "livros" && (
          <>
            {clickedButton === "home_adiciona" && <LivroAdicionarModal onClose={() => setOpenSecond(false)} />}

            {clickedButton === "home_pesquisar" && (
              <LivroBuscarModal
                onClose={() => setOpenSecond(false)}
                onSelect={handleSelectLivro}
              />
            )}

            {clickedButton === "home_atualizar" && (
              livroSelecionado ? (
                <LivroEditarModal
                  livro={livroSelecionado}
                  onClose={() => setOpenSecond(false)}
                  onSave={async (tituloOriginal, dadosEditados) => {
                    const atualizado = await livroService.atualizarLivro(
                      tituloOriginal,
                      dadosEditados
                    );
                    setLivroSelecionado(atualizado);
                    setOpenSecond(false);
                  }}
                />
              ) : (
                <div className="text-center text-red-600 p-4">
                  Primeiro selecione um livro em <b>Pesquisar</b>.
                </div>
              )
            )}

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
