import { House } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cabecalho({ titulo, voltar = true }) {
  return (
    <header className="relative bg-purple-900 text-white p-4 flex items-center justify-center">
      {voltar && (
        <Link to="/" className="absolute left-4" aria-label="Voltar para a página inicial">
          <House size={32} />
        </Link>
      )}
      <h1 className="text-2xl md:text-3xl font-bold">{titulo}</h1>
    </header>
  );
}