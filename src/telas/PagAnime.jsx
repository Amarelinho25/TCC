import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cabecalho from "../components/compoCabecalho";
import Rodape from "../components/compoRodape";

const partes = [
    {
        id: 1,
        titulo: "Phantom Blood",
        protagonista: "Jonathan Joestar",
        status: "Concluída",
        sinopse: "A história segue Jonathan Joestar e sua luta contra seu irmão adotivo, Dio Brando, que se torna um vampiro. A trama explora temas de honra, coragem e a batalha entre o bem e o mal.",
    },
    {
        id: 2,
        titulo: "Battle Tendency",
        protagonista: "Joseph Joestar",
        status: "Concluída",
        sinopse: "A história segue Joseph Joestar, neto de Jonathan, enquanto ele enfrenta os Homens do Pilar, seres antigos com habilidades sobrenaturais. A trama combina ação, humor e estratégias inteligentes.",
    },
    {
        id: 3,
        titulo: "Stardust Crusaders",
        protagonista: "Jotaro Kujo",
        status: "Concluída",
        sinopse: "A história segue Jotaro Kujo e seus aliados em uma jornada para derrotar Dio Brando, que retornou com poderes sobrenaturais. A trama introduz o conceito de Stands, manifestações físicas de energia espiritual.",
    },
    {
        id: 4,
        titulo: "Diamond is Unbreakable",
        protagonista: "Josuke Higashikata",
        status: "Concluída",
        sinopse: "A história segue Josuke Higashikata e seus amigos enquanto investigam estranhos acontecimentos em sua cidade natal, Morioh. A trama combina mistério, ação e desenvolvimento de personagens.",
    },
    {
        id: 5,
        titulo: "Golden Wind",
        protagonista: "Giorno Giovanna",
        status: "Concluída",
        sinopse: "A história segue Giorno Giovanna e seu objetivo de se tornar um \"Gang-Star\" na Itália. A trama explora temas de ambição, lealdade e a luta contra organizações criminosas.",
    },
    {
        id: 6,
        titulo: "Stone Ocean",
        protagonista: "Jolyne Cujoh",
        status: "Concluída",
        sinopse: "A história segue Jolyne Cujoh, filha de Jotaro Kujo, enquanto ela luta para limpar seu nome e enfrentar inimigos poderosos dentro de uma prisão. A trama aborda temas de justiça, redenção e a força do espírito humano.",
    },
    {
        id: 7,
        titulo: "Steel Ball Run",
        protagonista: "Johnny Joestar",
        status: "Em exibição",
        detalhe: "Estreou na Netflix em 19 de março de 2026, e os episódios semanais retomaram em 25 de setembro de 2026.",
        sinopse: "A história segue Johnny Joestar e Gyro Zeppeli em uma corrida de cavalos pelos Estados Unidos, enfrentando desafios e inimigos ao longo do caminho. A trama explora temas de perseverança, amizade e a busca por redenção.",
    },
];

const FILTROS = ["Todas", "Concluída", "Em exibição"];

// Cor da etiqueta de status
const corDoStatus = (status) =>
    status === "Em exibição"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";

export default function PagAnime() {
    const [filtro, setFiltro] = useState("Todas");
    const [resumo, setResumo] = useState({});

    // Mesmo arquivo da linha do tempo da História: dá o avatar do protagonista de cada parte
    useEffect(() => {
        fetch("/data/resumo-partes.json")
            .then((resp) => {
                if (!resp.ok) throw new Error(`Status ${resp.status}`);
                return resp.json();
            })
            .then(setResumo)
            .catch((e) => console.error("Erro ao carregar resumo das partes:", e.message));
    }, []);

    const visiveis = partes.filter((p) => filtro === "Todas" || p.status === filtro);

    const [temporadas, setTemporadas] = useState([]);

    useEffect(() => {
        fetch("/data/anime.json")
            .then((resp) => {
                if (!resp.ok) throw new Error(`Status ${resp.status}`);
                return resp.json();
            })
            .then((dados) => setTemporadas(dados.temporadas))
            .catch((e) => console.error("Erro ao carregar temporadas:", e.message));
    }, []);

    return (
        <>
            <div>
                <Cabecalho titulo="Anime" />
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">JoJo's Bizarre Adventure</h2>
                <p className="mb-4"></p>
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Sinopse</h2>
                <p className="mb-4">JoJo's Bizarre Adventure é uma série de mangá e anime que segue as aventuras da família Joestar ao longo de várias gerações. Cada parte da história apresenta um novo protagonista, conhecido como "JoJo", que enfrenta inimigos sobrenaturais e desafios extraordinários. A série é conhecida por seu estilo artístico único, batalhas criativas e enredos complexos que misturam elementos de ação, aventura e fantasia.</p>
            </div>

            {temporadas.length > 0 && (
                <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Temporadas do anime</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {temporadas.map((t) => (
                            <div key={t.pagina} className="flex gap-4 rounded-xl bg-purple-100 p-4 shadow">
                                {t.imagem && (
                                    <img
                                        src={`/${t.imagem}`}
                                        alt={t.titulo}
                                        loading="lazy"
                                        className="h-36 w-24 shrink-0 rounded-lg object-cover"
                                    />
                                )}

                                <div className="text-sm">
                                    <p className="text-xs font-bold text-purple-700">Temporada {t.ordem}</p>
                                    <h3 className="mb-1 text-base font-bold">{t.titulo}</h3>
                                    <p>Estúdio: {t.estudio}</p>
                                    {t.estreia && (
                                        <p>
                                            Exibição: {t.estreia}
                                            {t.fim && ` a ${t.fim}`}
                                        </p>
                                    )}
                                    {t.episodios && <p>Episódios: {t.episodios}</p>}
                                    {t.generos && <p className="text-xs text-gray-600">{t.generos}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Partes adaptadas para anime</h2>

                <div className="flex flex-wrap gap-2 mb-4">
                    {FILTROS.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFiltro(f)}
                            className={
                                f === filtro
                                    ? "bg-purple-700 text-white px-4 py-2 rounded-lg font-bold"
                                    : "bg-gray-200 text-purple-700 px-4 py-2 rounded-lg"
                            }
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visiveis.map((p) => {
                        const avatar = resumo[p.id]?.principais?.[0]?.avatar;
                        return (
                            <div key={p.id} className="flex gap-4 rounded-xl bg-purple-100 p-4 shadow">
                                {avatar && (
                                    <img
                                        src={`/${avatar}`}
                                        alt={p.protagonista}
                                        loading="lazy"
                                        className="h-24 w-24 shrink-0 rounded-xl object-cover"
                                    />
                                )}

                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-lg font-bold">
                                            Parte {p.id}: {p.titulo}
                                        </h3>
                                        <span className={`rounded px-2 py-0.5 text-xs font-bold ${corDoStatus(p.status)}`}>
                                            {p.status}
                                        </span>
                                    </div>

                                    <p className="mb-2 text-sm text-purple-900">
                                        Protagonista: {p.protagonista}
                                    </p>
                                    <p className="mb-2 text-sm">{p.sinopse}</p>
                                    {p.detalhe && (
                                        <p className="mb-2 text-sm font-semibold">{p.detalhe}</p>
                                    )}

                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            to={`/personagens?parte=${p.id}`}
                                            className="rounded-lg bg-purple-700 px-3 py-1 text-sm font-bold text-white"
                                        >
                                            Personagens
                                        </Link>
                                        {p.id >= 3 && (
                                            <Link
                                                to={`/stands?parte=${p.id}`}
                                                className="rounded-lg bg-purple-700 px-3 py-1 text-sm font-bold text-white"
                                            >
                                                Stands
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </>
    );
}
