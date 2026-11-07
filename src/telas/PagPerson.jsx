import React, { useState, useEffect } from "react";
import Carrossel from "../components/compoCarrosel";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import ModalPersonagem from "../components/compoModalPersonagem";

const imagensCarrossel = [
  {
    src: "https://i.pinimg.com/1200x/43/06/e8/4306e82fa8d2ce120cda8b54f9fbd0c6.jpg",
    legenda: "Yoshikage Kira",
  },
  {
    src: "https://i.pinimg.com/736x/e7/22/d9/e722d9cc2afbc3bcbab087c11f1d9e52.jpg",
    legenda: "Kosuku Kawajiri",
  },
  {
    src: "https://i.pinimg.com/736x/9a/0c/23/9a0c232bc732c9ccc691b3caa0f07216.jpg",
    legenda: "Kosuku Kawajiri Cabelo branco",
  },
];

const partes = [
  "Phantom Blood",
  "Battle Tendency",
  "Stardust Crusaders",
  "Diamond is Unbreakable",
  "Golden Wind",
  "Stone Ocean",
  "Steel Ball Run",
  "JoJolion",
  "The JOJOLands",
];

// Remove o primeiro parêntese que contém japonês: "Nome (ジョナサン, Jonasan) é..." -> "Nome é..."
const limparResumo = (texto) =>
  texto ? texto.replace(/\s*\([^)]*[\u3040-\u30ff\u4e00-\u9fff][^)]*\)/, "") : "";

// Corta textos longos para caber no cartão
const encurtar = (texto, max = 220) =>
  !texto ? "" : texto.length > max ? texto.slice(0, max) + "..." : texto;

const Personagens = () => {
  const [parteAtiva, setParteAtiva] = useState(1);
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

    fetch(`/data/parte-${parteAtiva}.json`)
      .then((resp) => {
        if (!resp.ok) throw new Error(`Status ${resp.status}`);
        return resp.json();
      })
      .then((dados) => {
        if (!ativo) return;
        // O Kira da Parte 4 continua com o carrossel que você já montou
        const comCarrossel = dados.personagens.map((p) =>
          parteAtiva === 4 && p.nome === "Yoshikage Kira"
            ? { ...p, carrossel: imagensCarrossel }
            : p
        );
        setLista(comCarrossel);
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

  // Fica fora do useEffect: precisa ser recalculada a cada tecla digitada na busca
  const filtrada = lista.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div className="bg-purple-900 text-white p-4">
        <Link to="/">
          <House className="absolute left-4" size={40} />
        </Link>

        <h1 className="text-3xl font-bold text-center">Personagens</h1>
      </div>

      <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {partes.map((nome, index) => (
            <button
              key={nome}
              onClick={() => setParteAtiva(index + 1)}
              className={
                index + 1 === parteAtiva
                  ? "bg-purple-700 text-white px-4 py-2 rounded-t-lg font-bold"
                  : "bg-gray-200 text-purple-700 px-4 py-2 rounded-t-lg"
              }
            >
              Part {index + 1}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">
          Parte {parteAtiva}: {partes[parteAtiva - 1]}
        </h2>

        {carregando && <p>Carregando personagens...</p>}
        {erro && <p>Erro ao carregar: {erro}</p>}
        {!carregando && !erro && lista.length === 0 && (
          <p>Nenhum personagem cadastrado ainda.</p>
        )}

        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar personagem..."
          className="w-full md:w-80 mb-4 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {!carregando && !erro && lista.length > 0 && filtrada.length === 0 && (
          <p>Nenhum personagem encontrado.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrada.map((p) => {
            const avatar = p.imagens.avatarAnime ?? p.imagens.avatarManga;
            return (
              <div
              key={p.pagina}
              onClick={() => setSelecionado(p)}
              className="cursor-pointer shadow-lg rounded-lg p-4 flex gap-4 transition duration-200 hover:-translate-y-1 hover:shadow-xl"
               >
                {p.carrossel ? (
                 <div className="w-40 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <Carrossel imagens={p.carrossel} />
                 </div>
                ) : avatar ? (
                  <img
                    src={`/${avatar}`}
                    alt={p.nome}
                    loading="lazy"
                    className="w-24 h-24 shrink-0 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 shrink-0 bg-gray-200 rounded" />
                )}

                <div>
                  <h3 className="font-bold">{p.nome}</h3>
                  {p.status && (
                    <span className="inline-block text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded mb-1">
                      {p.status}
                    </span>
                  )}
                  <p className="text-sm">{encurtar(limparResumo(p.resumo))}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {selecionado && (
         <ModalPersonagem
         personagem={selecionado}
         onFechar={() => setSelecionado(null)}
         />
      )}
    </div>
  );
};

export default Personagens;