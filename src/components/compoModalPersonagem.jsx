import { useEffect, useState } from "react";
import { X } from "lucide-react";

// [chave no JSON, rótulo na tela]
const CAMPOS = [
  ["ja_kanji", "Nome em japonês"],
  ["ja_romaji", "Romanização"],
  ["alias", "Apelido"],
  ["stand", "Stand"],
  ["age", "Idade"],
  ["birthday", "Aniversário"],
  ["zodiac", "Signo"],
  ["czodiac", "Zodíaco chinês"],
  ["gender", "Gênero"],
  ["height", "Altura"],
  ["weight", "Peso"],
  ["blood", "Tipo sanguíneo"],
  ["nation", "Nacionalidade"],
  ["occupation", "Ocupação"],
  ["hair", "Cabelo"],
  ["residence", "Residência"],
  ["maritalstatus", "Estado civil"],
  ["family", "Família"],
  ["affiliation", "Afiliação"],
  ["status", "Status"],
  ["death", "Data da morte"],
  ["cod", "Causa da morte"],
];

const SECOES = [
  ["Appearance", "Aparência"],
  ["Personality", "Personalidade"],
  ["Abilities", "Habilidades"],
  ["History", "História"],
];

// No JSON, subtítulos e parágrafos vêm misturados na mesma lista.
// Regra simples: texto curto e sem pontuação final é tratado como subtítulo.
const ehSubtitulo = (texto) => texto.length < 40 && !/[.!?]$/.test(texto);

export default function ModalPersonagem({ personagem, onFechar }) {
  // Todas as imagens do personagem, sem repetidas e sem null
  const imagens = [
    ...new Set(
      [
        personagem.imagens.avatarAnime,
        personagem.imagens.avatarManga,
        ...personagem.imagens.infobox,
      ].filter(Boolean)
    ),
  ];
  const [imagemAtiva, setImagemAtiva] = useState(imagens[0] ?? null);

  // Fecha com a tecla Esc
  useEffect(() => {
    const aoApertar = (e) => {
      if (e.key === "Escape") onFechar();
    };
    window.addEventListener("keydown", aoApertar);
    return () => window.removeEventListener("keydown", aoApertar);
  }, [onFechar]);

  // Só os campos que o personagem realmente tem preenchidos
  const linhas = CAMPOS.map(([chave, rotulo]) => [
    rotulo,
    personagem.infobox[chave]?.texto,
  ]).filter(([, texto]) => texto);

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
          <h2 className="text-2xl font-bold text-purple-900">{personagem.nome}</h2>
          {personagem.nomeWiki && personagem.nomeWiki !== personagem.nome && (
            <p className="text-sm text-gray-500">Página: {personagem.nomeWiki}</p>
          )}
          {personagem.status && (
            <span className="inline-block text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded mt-1">
              {personagem.status}
            </span>
          )}

          <div className="flex flex-col md:flex-row gap-6 mt-4">
            {/* Coluna das imagens */}
            <div className="md:w-64 shrink-0">
              {imagemAtiva && (
                <img
                  src={`/${imagemAtiva}`}
                  alt={personagem.nome}
                  className="w-full rounded"
                />
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {imagens.map((src) => (
                  <img
                    key={src}
                    src={`/${src}`}
                    alt=""
                    loading="lazy"
                    onClick={() => setImagemAtiva(src)}
                    className={
                      "w-12 h-12 object-cover rounded cursor-pointer border-2 " +
                      (src === imagemAtiva ? "border-purple-700" : "border-transparent")
                    }
                  />
                ))}
              </div>
            </div>

            {/* Coluna das informações */}
            <div className="flex-1">
              <p className="text-sm mb-4">{personagem.resumo}</p>

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

          {/* Seções do artigo */}
          {SECOES.map(([chave, titulo]) => {
            const textos = personagem.secoes[chave];
            if (!textos || textos.length === 0) return null;
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

          <p className="text-xs text-gray-500 mt-6">
            Fonte:{" "}
            <a
              href={`https://jojowiki.com${personagem.pagina}`}
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