"use client";

import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CategoriaMenu from "../components/CategoriaMenu";
import EscolhaModal from "../components/EscolhaModal";

import homeAdicionar from "../assets/home_adiciona.png";
import homeExcluir from "../assets/home_excluir.png";
import homeLista from "../assets/home_lista.png";
import homePesquisar from "../assets/home_pesquisar.png";
import homeAtualizar from "../assets/home_atualizar.png";

export default function Home() {
  const [openEscolha, setOpenEscolha] = useState(false);
  const [clickedButton, setClickedButton] = useState("");

  const navigate = useNavigate();

  const handleCategoriaClick = (titulo: string) => {
    const map: Record<string, string> = {
      "adicionar livros a biblioteca digital": "home_adiciona",
      "excluir livros da biblioteca digital": "home_excluir",
      "listar livros da biblioteca digital": "home_lista",
      "pesquisar livros na biblioteca digital": "home_pesquisar",
      "atualizar livros da biblioteca digital": "home_atualizar",
    };

    const icon = map[titulo];
    if (!icon) return;

    setClickedButton(icon);
    setOpenEscolha(true);
  };

  const categorias = [
    { titulo: "adicionar livros a biblioteca digital", icon: homeAdicionar },
    { titulo: "excluir livros da biblioteca digital", icon: homeExcluir },
    { titulo: "listar livros da biblioteca digital", icon: homeLista },
    { titulo: "pesquisar livros na biblioteca digital", icon: homePesquisar },
    { titulo: "atualizar livros da biblioteca digital", icon: homeAtualizar },
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

      <EscolhaModal
        isOpen={openEscolha}
        onClose={() => setOpenEscolha(false)}
        clickedButton={clickedButton}
      />
    </div>
  );
}
