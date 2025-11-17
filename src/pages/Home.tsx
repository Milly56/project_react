
    import { useState } from "react";
    import Modal from "../components/Modal";

    import LivroAdicionarModal from "../components/Livros/LivroAdicionarModal";
    import RetirarLivroModal from "../components/Retiradas/RetirarLivros";

    export default function Home() {
    const [open, setOpen] = useState(false); 
    const [openSecond, setOpenSecond] = useState(false); 
    const [clickedButton, setClickedButton] = useState(""); 
    const [choice, setChoice] = useState(""); 

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-2 sm:px-4">
        <div
            className="
            rounded-2xl shadow-xl 
            bg-[#678DB2]
            w-full max-w-[720px] md:max-w-[820px] lg:max-w-[960px] xl:max-w-[1020px]
            h-auto
            flex flex-col
            relative overflow-hidden
            p-4 sm:p-6 md:p-8
            "
        >


            <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-[420px] leading-snug text-center lg:text-left">
                O futuro começa com a{" "}
                <span className="text-[#A0BBD5]">leitura!</span>
            </h1>

            <div className="relative hidden 2xl:block w-60 h-80">
                <img
                src="src/assets/moldura_home.png"
                alt="Moldura superior"
                className="absolute top-0 left-0 w-[220px] h-auto"
                />
                <div className="absolute top-7 left-7 w-[220px] h-auto">
                <img
                    src="src/assets/moldura_home.png"
                    alt="Moldura inferior"
                    className="w-full h-auto opacity-80"
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
                className="w-[90%] max-w-[580px] md:max-w-[700px] object-contain"
            />
            </div>

            {/* BOTÕES */}
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
                onClick={() => {
                    setClickedButton(icon);
                    setOpen(true);
                }}
                />
            ))}
            </div>
        </div>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <h2 className="text-xl font-semibold mb-4 text-center">Escolha uma opção</h2>

            <div className="flex flex-col gap-4">
            <button
                className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg"
                onClick={() => {
                setChoice("livros");
                setOpen(false);
                setOpenSecond(true);
                }}
            >
                Livros
            </button>

            <button
                className="w-full bg-green-600 text-white py-3 rounded-xl text-lg"
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
                className="w-full bg-red-500 text-white py-2 rounded-lg"
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

                {clickedButton === "home_excluir" && (
                <div className="text-center">Excluir Livro</div>
                )}

                {clickedButton === "home_lista" && (
                <div className="text-center">Listar Livros</div>
                )}

                {clickedButton === "home_pesquisar" && (
                <div className="text-center">Pesquisar Livro</div>
                )}

                {clickedButton === "home_atualizar" && (
                <div className="text-center">Atualizar Livro</div>
                )}
            </>
            )}

            {choice === "retiradas" && (
            <>
                {clickedButton === "home_adiciona" && (
                <RetirarLivroModal onClose={() => setOpenSecond(false)} />
                )}

                {clickedButton === "home_excluir" && (
                <div className="text-center">Excluir Retirada</div>
                )}

                {clickedButton === "home_pesquisar" && (
                <div className="text-center">Pesquisar Retirada</div>
                )}

                {clickedButton === "home_lista" && (
                <div className="text-center">Listar Retiradas</div>
                )}

                {clickedButton === "home_atualizar" && (
                <div className="text-center">Atualizar Retirada</div>
                )}
            </>
            )}
        </Modal>
        </div>
    );
    }
