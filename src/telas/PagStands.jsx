import React, { useState, useEffect } from "react";
import {House} from "lucide-react";
import {Link} from "react-router-dom"
import ModalStand from "../components/compoModalStand";

// Partes que têm Stands na wiki (as partes 1 e 2 não têm)
const partes = [
  { n: 3, nome: "Stardust Crusaders" },
  { n: 4, nome: "Diamond is Unbreakable" },
  { n: 5, nome: "Golden Wind" },
  { n: 6, nome: "Stone Ocean" },
  { n: 7, nome: "Steel Ball Run" },
  { n: 8, nome: "JoJolion" },
  { n: 9, nome: "The JOJOLands" },
];

// Remove o primeiro parêntese que contém japonês: "Nome (スタープラチナ, Sutā) é..." -> "Nome é..."
const limparResumo = (texto) =>
  texto ? texto.replace(/\s*\([^)]*[\u3040-\u30ff\u4e00-\u9fff][^)]*\)/, "") : "";

// Corta textos longos para caber no cartão
const encurtar = (texto, max = 160) =>
  !texto ? "" : texto.length > max ? texto.slice(0, max) + "..." : texto;

export default function PagStands() {
    
    const [parteAtiva, setParteAtiva] = useState(3);
    const [lista, setLista] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [busca, setBusca] = useState("");
    const [selecionado, setSelecionado] = useState(null);

    useEffect(() => {
        let ativo = true; // evita gravar dados de uma aba antiga se você trocar rápido
        setCarregando(true);
        setErro(null);
        setLista([]);

        fetch(`/data/stands-parte-${parteAtiva}.json`)
            .then((resp) => {
                if (!resp.ok) throw new Error(`Status ${resp.status}`);
                return resp.json();
            })
            .then((dados) => {
                if (ativo) setLista(dados.stands);
            })
            .catch((e) => {
                if (ativo) setErro(e.message);
            })
            .finally(() => {
                if (ativo) setCarregando(false);
            });

        return () => {
            ativo = false;
        };
    }, [parteAtiva]);

    // Busca pelo nome do Stand ou do usuário (digitar "jotaro" acha o Star Platinum)
    const filtrada = lista.filter((s) => {
        const termo = busca.toLowerCase();
        return (
            s.nome.toLowerCase().includes(termo) ||
            s.usuarios.some((u) => u.nome.toLowerCase().includes(termo))
        );
    });

    const [hamon, setHamon] = useState([]);

    useEffect(() => {
        fetch("/data/hamon.json")
            .then((resp) => {
                if (!resp.ok) throw new Error(`Status ${resp.status}`);
                return resp.json();
            })
            .then((dados) => setHamon(dados.personagens))
            .catch((e) => console.error("Erro ao carregar Hamon:", e.message));
    }, []);

    return (
        <>
    <div className="relative bg-purple-900 p-4 text-white flex items-center justify-center">
   <Link to="/" className="absolute left-4">
        <House size={40} />
    </Link>

    <h1 className="text-3xl font-bold text-center">
        Stands
    </h1>
</div>


    <br/>

    <div className="mb-1">
        <h1 className="text-2xl font-bold text-center">Stands</h1>
    </div>
    <div className="mb-4">
         <p className="text-center">Stands são manifestações físicas de energia espiritual que concedem habilidades especiais aos seus usuários. Cada Stand é único e possui poderes distintos, variando desde habilidades de combate até manipulação de tempo e espaço.</p>
        <br/>
         <p className="text-center">A relação entre o usuário e seu Stand é profunda, muitas vezes refletindo a personalidade e os desejos do indivíduo. Stands desempenham um papel central na série JoJo's Bizarre Adventure, sendo essenciais para as batalhas e desafios enfrentados pelos personagens.</p>
         <br/>
         <p className="text-center">Abaixo, você encontrará uma lista de alguns dos Stands mais notáveis da série, juntamente com suas habilidades e características únicas.</p>
    </div>

    <div className="text-center">
        <h1 className="text-2xl font-bold">Lista de Stands</h1>
        <p className="text-center">Abaixo está uma lista de alguns dos Stands mais notáveis da série:</p>
    </div>
    
        <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-2 mb-4">
            {partes.map((p) => (
                <button
                    key={p.n}
                    onClick={() => setParteAtiva(p.n)}
                    className={
                        p.n === parteAtiva
                            ? "bg-purple-700 text-white px-4 py-2 rounded-t-lg font-bold"
                            : "bg-gray-200 text-purple-700 px-4 py-2 rounded-t-lg"
                    }
                >
                    Part {p.n}
                </button>
            ))}
        </div>

        <h2 className="text-xl font-bold mb-4">
            Parte {parteAtiva}: {partes.find((p) => p.n === parteAtiva)?.nome}
        </h2>

        <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar Stand ou usuário..."
            className="w-full md:w-80 mb-4 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {carregando && <p>Carregando Stands...</p>}
        {erro && <p>Erro ao carregar: {erro}</p>}
        {!carregando && !erro && lista.length > 0 && filtrada.length === 0 && (
            <p>Nenhum Stand encontrado.</p>
        )}

        <div className="max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtrada.map((s) => {
                    const avatar = s.imagens.avatarAnime ?? s.imagens.avatarManga;
                    return (
                        <div
                            key={s.pagina}
                            onClick={() => setSelecionado(s)}
                            className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md flex gap-4 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                        >
                            {avatar ? (
                                <img
                                    src={`/${avatar}`}
                                    alt={s.nome}
                                    loading="lazy"
                                    className="w-24 h-24 shrink-0 object-cover rounded-xl"
                                />
                            ) : (
                                <div className="w-24 h-24 shrink-0 bg-gray-300 rounded-xl" />
                            )}

                            <div>
                                <h2 className="text-lg font-bold">{s.nome}</h2>
                                <p className="text-xs text-purple-900 mb-1">
                                    Usuário:{" "}
                                    {s.usuarios.map((u) => u.nome).join(", ") || "Sem usuário definido"}
                                </p>
                                <p className="text-sm">{encurtar(limparResumo(s.resumo))}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hamon.map((p) => {
                const avatar = p.avatarAnime ?? p.avatarManga;
                return (
                    <a
                        key={p.pagina}
                        href={`https://jojowiki.com${p.pagina}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-gray-100 p-3 rounded-lg shadow-md text-center transition duration-200 hover:-translate-y-1 hover:shadow-xl"
                    >
                        {avatar ? (
                            <img
                                src={`/${avatar}`}
                                alt={p.nome}
                                loading="lazy"
                                className="w-24 h-24 object-cover rounded-xl mx-auto mb-2"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-300 rounded-xl mx-auto mb-2" />
                        )}
                        <p className="font-bold text-sm">{p.nome}</p>
                    </a>
                );
            })}
        </div>
    
 {selecionado && (
        <ModalStand stand={selecionado} onFechar={() => setSelecionado(null)} />
    )}
    
        </>
    );
}