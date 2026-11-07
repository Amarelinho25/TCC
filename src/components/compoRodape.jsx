export default function Rodape() {
  return (
    <footer className="bg-purple-900 text-white text-sm text-center p-4 mt-8">
      <p>JoJo's Bizarre Adventure é criação de Hirohiko Araki. Projeto de TCC, sem fins lucrativos.</p>
      <p className="mt-1">
        Parte dos textos e das imagens vem da{" "}
        <a
          href="https://jojowiki.com"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          JoJo's Bizarre Encyclopedia (JoJo Wiki)
        </a>
        , cujo conteúdo é distribuído sob licença CC BY-SA.
      </p>
    </footer>
  );
}