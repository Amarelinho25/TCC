import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Carrossel from "./compoCarrosel";

// [chave no JSON, rótulo na tela], na ordem em que a wiki mostra
const STATS = [
  ["destpower", "Poder Destrutivo"],
  ["speed", "Velocidade"],
  ["range", "Alcance"],
  ["stamina", "Persistência"],
  ["precision", "Precisão"],
  ["potential", "Potencial de Desenvolvimento"],
];

// Letra -> nível de 1 a 5. "Completo" enche a barra; qualquer outro valor (∅) fica vazio
const NIVEL = { A: 5, B: 4, C: 3, D: 2, E: 1, Completo: 5 };

const CAMPOS = [
  ["ja_kanji", "Nome em japonês"],
  ["type", "Tipo"],
  ["namesake", "Origem do nome"],
  ["awakening", "Despertar"],
  ["cry", "Grito"],
  ["mangadebut", "Estreia (mangá)"],
  ["animedebut", "Estreia (anime)"],
  ["ovadebut", "Estreia (OVA)"],
  ["gamedebut", "Estreia (jogo)"],
  ["seiyuu", "Dublador (japonês)"],
];

const SECOES = [
  ["Appearance", "Aparência"],
  ["Personality", "Personalidade"],
  ["Abilities", "Habilidades"],
  ["History", "História"],
];

const ehSubtitulo = (texto) => texto.length < 40 && !/[.!?]$/.test(texto);

// "Star_Platinum_SC_Infobox_Manga.png" -> "Star Platinum SC Manga"
const legendaDe = (src) => {
  const nome = src.split("/").pop().replace(/\.[^.]+$/, "");
  if (nome.startsWith("avatar-anime")) return "Avatar (anime)";
  if (nome.startsWith("avatar-manga")) return "Avatar (mangá)";
  return nome.replace(/_Infobox/i, "").replace(/_/g, " ");
};

export default function ModalStand({ stand, onFechar }) {
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    const aoApertar = (e) => {
      if (e.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, [onFechar]);

  const itens = [
    ...new Set(
      [
        stand.imagens.avatarAnime,
        stand.imagens.avatarManga,
        ...stand.imagens.infobox,
      ].filter(Boolean)
    ),
  ].map((src) => ({ src: `/${src}`, legenda: legendaDe(src) }));

  // Quantas versões de parâmetros existem (algumas páginas têm 1, o Star Platinum tem 3)
  const versoes = Math.max(0, ...STATS.map(([k]) => stand.stats[k]?.length ?? 0));

  const linhas = CAMPOS.map(([chave, rotulo]) => [
    rotulo,
    stand.infobox[chave]?.texto?.replace(/^Enlarge/, ""),
  ]).filter(([, texto]) => texto);

  // As técnicas já aparecem numa seção própria, então tiramos da lista de habilidades
  // os subtítulos que só repetem o nome delas
  const nomesTecnicas = new Set([
    "Técnicas",
    "Techniques",
    ...(stand.tecnicas ?? []).map((t) => t.nome),
  ]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onFechar}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onFechar}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          aria-label="Fechar"
        >
          <X size={28} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-purple-900">{stand.nome}</h2>
          <p className="text-sm mt-1">
            <span className="font-bold text-purple-900">Usuário: </span>
            {stand.usuarios.length === 0
              ? "Sem usuário definido"
              : stand.usuarios.map((u, i) => (
                  <span key={u.pagina}>
                    {i > 0 && ", "}
                    <a
                      href={`https://jojowiki.com${u.pagina}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      {u.nome}
                    </a>
                  </span>
                ))}
          </p>

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="md:w-64 shrink-0">
              {itens.length > 0 && (
                <Carrossel
                  imagens={itens}
                  autoPlay={false}
                  classeImagem="w-full h-80 object-contain bg-gray-100 rounded-lg"
                />
              )}
            </div>

            <div className="flex-1">
              <p className="text-sm mb-4">{stand.resumo}</p>

              {versoes > 0 && (
                <div className="mb-4">
                  {versoes > 1 && (
                    <div className="flex gap-2 mb-2">
                      {Array.from({ length: versoes }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => setVersao(i)}
                          className={
                            i === versao
                              ? "bg-purple-700 text-white text-xs px-3 py-1 rounded"
                              : "bg-gray-200 text-purple-700 text-xs px-3 py-1 rounded"
                          }
                        >
                          Versão {i + 1}
                        </button>
                      ))}
                    </div>
                  )}

                  {STATS.map(([chave, rotulo]) => {
                    const valor = stand.stats[chave]?.[versao] ?? stand.stats[chave]?.[0];
                    if (!valor) return null;
                    return (
                      <div key={chave} className="flex items-center gap-2 text-sm mb-1">
                        <span className="w-48 shrink-0">{rotulo}</span>
                        <div className="flex-1 h-3 bg-gray-200 rounded">
                          <div
                            className="h-3 bg-purple-600 rounded"
                            style={{ width: `${(NIVEL[valor] ?? 0) * 20}%` }}
                          />
                        </div>
                        <span className="w-20 text-right font-bold">{valor}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <dl className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-2 text-sm">
                {linhas.map(([rotulo, texto]) => (
                  <div key={rotulo} className="contents">
                    <dt className="font-bold text-purple-900">{rotulo}</dt>
                    <dd>
                      {texto.split(" | ").map((linha, i) => (
                        <div key={i}>{linha}</div>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {SECOES.map(([chave, titulo]) => {
            const textos = (stand.secoes[chave] ?? []).filter((t) => !nomesTecnicas.has(t));
            if (textos.length === 0) return null;
            return (
              <section key={chave} className="mt-6">
                <h3 className="text-lg font-bold text-purple-900 border-b border-purple-200 mb-2">
                  {titulo}
                </h3>
                {textos.map((t, i) =>
                  ehSubtitulo(t) ? (
                    <h4 key={i} className="font-semibold mt-3">{t}</h4>
                  ) : (
                    <p key={i} className="text-sm mb-2">{t}</p>
                  )
                )}
              </section>
            );
          })}

          {stand.tecnicas?.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-bold text-purple-900 border-b border-purple-200 mb-2">
                Técnicas
              </h3>
              {stand.tecnicas.map((t, i) => (
                <div key={`${t.nome}-${i}`} className="border border-purple-200 rounded-lg p-3 mb-3">
                  <h4 className="font-bold">{t.nome}</h4>
                  {t.japones && <p className="text-xs text-gray-500">{t.japones}</p>}
                  {t.estreia && <p className="text-xs text-gray-500 mb-1">{t.estreia}</p>}
                  <p className="text-sm">{t.descricao}</p>
                </div>
              ))}
            </section>
          )}

          <p className="text-xs text-gray-500 mt-6">
            Fonte:{" "}
            <a
              href={`https://jojowiki.com${stand.pagina}`}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              JoJo Wiki
            </a>{" "}
            (CC BY-SA)
          </p>
        </div>
      </div>
    </div>
  );
}