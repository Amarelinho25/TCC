import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LinhaDoTempo({ partes }) {
  const [resumo, setResumo] = useState({});
  const [aberta, setAberta] = useState(null); // id da parte aberta (ou null)

  useEffect(() => {
    fetch("/data/resumo-partes.json")
      .then((resp) => {
        if (!resp.ok) throw new Error(`Status ${resp.status}`);
        return resp.json();
      })
      .then(setResumo)
      .catch((e) => console.error("Erro ao carregar resumo das partes:", e.message));
  }, []);

  return (
    <ol className="relative ml-4 border-l-4 border-purple-300">
      {partes.map((parte) => {
        const info = resumo[parte.id];
        const protagonista = info?.principais?.[0];
        // Se o resumo não carregar, usa a imagem que você já tinha
        const imagem = protagonista?.avatar ? `/${protagonista.avatar}` : parte.imagem;
        const aberto = aberta === parte.id;

        return (
          <li key={parte.id} className="mb-8 ml-8">
            <span className="absolute -left-[18px] flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-sm font-bold text-white">
              {parte.id}
            </span>

            <div className="rounded-xl bg-white shadow-lg">
              <button
                onClick={() => setAberta(aberto ? null : parte.id)}
                aria-expanded={aberto}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                {imagem && (
                  <img
                    src={imagem}
                    alt={parte.protagonista}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{parte.titulo}</h3>
                  <p className="text-sm text-purple-900">Protagonista: {parte.protagonista}</p>
                </div>
                <span className="text-2xl text-purple-700">{aberto ? "−" : "+"}</span>
              </button>

              {aberto && (
                <div className="border-t border-purple-100 p-4">
                  <p className="mb-4">{parte.resumo}</p>

                  {info?.principais?.length > 0 && (
                    <>
                      <h4 className="mb-2 font-bold text-purple-900">Personagens principais</h4>
                      <div className="mb-4 flex flex-wrap gap-3">
                        {info.principais.map((p) => (
                          <div key={p.pagina} className="w-20 text-center">
                            {p.avatar && (
                              <img
                                src={`/${p.avatar}`}
                                alt={p.nome}
                                loading="lazy"
                                className="mx-auto h-16 w-16 rounded-lg object-cover"
                              />
                            )}
                            <p className="mt-1 text-xs">{p.nome}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {info && (
                    <p className="mb-4 text-sm text-gray-600">
                      Na JoJo Wiki: {info.total} personagens listados
                      {info.stands > 0 && ` e ${info.stands} Stands`}.
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/personagens?parte=${parte.id}`}
                      className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-bold text-white"
                    >
                      Ver personagens
                    </Link>
                    {parte.id >= 3 && (
                      <Link
                        to={`/stands?parte=${parte.id}`}
                        className="rounded-lg bg-purple-700 px-4 py-2 text-sm font-bold text-white"
                      >
                        Ver Stands
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}