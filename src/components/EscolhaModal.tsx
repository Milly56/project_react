    import { useState } from "react";
    import Modal from "./Modal";

    import LivroAdicionarModal from "./Livros/LivroAdicionarModal";
    import RetirarLivroModal from "./Retiradas/RetirarLivrosModal";
    import LivroBuscarModal from "./Livros/LivroBuscarModal";
    import LivroExcluirModal from "./Livros/LivroExcluirModel";
    import LivroListModal from "./Livros/LivroListaModal";
    import LivroEditarModal from "./Livros/LivroEditarModal";
    import ListaRetiradasModal from "./Retiradas/ListaRetiradasModal";
    import BuscarRetiradaModal from "./Retiradas/BuscarRetiradasModal";
    import DevolverLivroModal from "./Retiradas/DevolucaoRetirada";
    import ExcluirRetiradaModal from "./Retiradas/ExcluirRetiradaModal";

    import { Livro } from "../services/livro/livrobuscar.service";
    import { livroService } from "../services/livro/livroeditar.service";

    interface EscolhaModalProps {
    isOpen: boolean;
    onClose: () => void;
    clickedButton: string;
    }

    export default function EscolhaModal({
    isOpen,
    onClose,
    clickedButton,
    }: EscolhaModalProps) {
    const [openSecond, setOpenSecond] = useState(false);
    const [choice, setChoice] = useState<"livros" | "retiradas" | "">("");
    const [livroSelecionado, setLivroSelecionado] = useState<Livro | null>(null);

    const handleSelectLivro = (livro: Livro) => {
        setLivroSelecionado(livro);
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-4 text-center">
            Escolha uma opção
            </h2>

            <div className="flex flex-col gap-4">
            <button
                className="w-full bg-[#A0BBD5] text-white py-3 rounded-xl text-lg"
                onClick={() => {
                setChoice("livros");
                onClose();
                setOpenSecond(true);
                }}
            >
                Livros
            </button>

            <button
                className="w-full bg-[#4F73AE] text-white py-3 rounded-xl text-lg"
                onClick={() => {
                setChoice("retiradas");
                onClose();
                setOpenSecond(true);
                }}
            >
                Retiradas
            </button>

            <button
                onClick={onClose}
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
                <ExcluirRetiradaModal onClose={() => setOpenSecond(false)} />
                )}
            </>
            )}
        </Modal>
        </>
    );
    }
