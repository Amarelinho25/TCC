import React, { useState, useEffect } from "react";

const Carrossel1 = ({ imagens }) => {
  const [indice, setIndice] = useState(0);

  const anterior = () => setIndice(indice === 0 ? imagens.length - 1 : indice - 1);
  const proximo = () => setIndice(indice === imagens.length - 1 ? 0 : indice + 1);

  // Troca de imagem sozinho a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndice((atual) => (atual === imagens.length - 1 ? 0 : atual + 1));
    }, 4000);

    return () => clearInterval(timer); // limpa o timer ao sair da página
  }, [imagens.length]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <img
        src={imagens[indice].src}
        alt={imagens[indice].legenda}
        className="w-full h-72 object-cover rounded-lg"
      />

      <p className="text-center font-bold mt-2">{imagens[indice].legenda}</p>

      <button
        onClick={anterior}
        className="absolute left-1 top-1/2 bg-white text-purple-900 px-1 py-0.1 rounded-full"
      >
        ←
      </button>
      <button
        onClick={proximo}
        className="absolute right-1 top-1/2 bg-white text-purple-900 px-1 py-0.1 rounded-full"
      >
        →
      </button>

      {/* Bolinhas */}
      <div className="flex justify-center gap-2 mt-2">
        {imagens.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={
              i === indice
                ? "w-1 h-1 rounded-full bg-purple-700"
                : "w-1 h-1 rounded-full bg-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Carrossel1;