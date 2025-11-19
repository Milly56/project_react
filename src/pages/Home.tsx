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

  const handleIconClick = (icon: string) => {
    setClickedButton(icon);
    setOpen(true); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2 sm:px-4">
      <div className="rounded-2xl shadow-xl bg-[#678DB2] w-full max-w-[960px] h-auto flex flex-col relative overflow-hidden p-4 sm:p-6 md:p-8">

        <div className="absolute top-4 right-4">
          <FaUserCircle
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white cursor-pointer hover:scale-110 transition-transform"
            onClick={() => navigate("/perfil")}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-[420px] leading-snug text-center lg:text-left">
            O futuro começa com a{" "}
            <span className="text-[#A0BBD5]">leitura!</span>
          </h1>

          <div className="relative hidden 2xl:block w-60 h-80">
            <img
              src="src/assets/moldura_home.png"
              alt="Moldura"
              className="absolute top-0 left-0 w-[220px]"
            />

            <div className="absolute top-7 left-7 w-[220px]">
              <img
                src="src/assets/moldura_home.png"
                alt="Moldura Inferior"
                className="w-full opacity-80"
              />

              <p className="absolute inset-0 flex items-center justify-center text-white text-center text-sm font-medium px-4">
                A sua biblioteca, a qualquer hora e em qualquer lugar
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center my-4">
          <img
            src="src/assets/categoria_home.png"
            alt="Categorias"
            className="w-[90%] max-w-[700px] object-contain"
          />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mt-4 mb-2">
          {[
            "home_adiciona",
            "home_excluir",
            "home_lista",
            "home_pesquisar",
            "home_atualizar",
          ].map((icon) => (
            <img
              key={icon}
              src={`src/assets/${icon}.png`}
              alt={icon}
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 hover:scale-105 transition-transform cursor-pointer"
              onClick={() => handleIconClick(icon)}
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
            {clickedButton === "home_adiciona" && (
              <LivroAdicionarModal onClose={() => setOpenSecond(false)} />
            )}

            {clickedButton === "home_pesquisar" && (
              <LivroBuscarModal
                onClose={() => setOpenSecond(false)}
                onSelect={handleSelectLivro}
              />
            )}

            {clickedButton === "home_atualizar" &&
              (livroSelecionado ? (
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
              ))}

            {clickedButton === "home_lista" && (
              <LivroListModal onClose={() => setOpenSecond(false)} />
            )}

            {clickedButton === "home_excluir" && (
              <LivroExcluirModal onClose={() => setOpenSecond(false)} />
            )}
          </>
        )}

        {choice === "retiradas" && (
          <>
            {clickedButton === "home_adiciona" && (
              <RetirarLivroModal onClose={() => setOpenSecond(false)} />
            )}

            {clickedButton === "home_lista" && (
              <ListaRetiradasModal onClose={() => setOpenSecond(false)} />
            )}
            {clickedButton === "home_atualizar" && (
              <DevolverLivroModal onClose={() => setOpenSecond(false)} />
            )}
            {clickedButton === "home_pesquisar" && (
              <BuscarRetiradaModal onClose={() => setOpenSecond(false)} />
            )}
            
            {clickedButton === "home_excluir" && (
              <div className="text-center p-4">Excluir retirada</div>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
