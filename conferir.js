import { readFileSync } from "node:fs";

// Caminho do JSON vem do terminal; se não vier, usa o da parte 3
const arquivo = process.argv[2] ?? "scripts/saida/parte-3.json";
const { personagens, falhas } = JSON.parse(readFileSync(arquivo, "utf8"));

console.log(`${arquivo}: ${personagens.length} personagens, ${falhas.length} falhas\n`);

for (const p of personagens) {
  const secoes =
    Object.entries(p.secoes)
      .map(([nome, paragrafos]) => `${nome}(${paragrafos.length})`)
      .join(", ") || "nenhuma";

  console.log(p.nome);
  console.log("  campos da infobox:", Object.keys(p.infobox).length);
  console.log("  seções:", secoes);
  console.log("  resumo:", p.resumo ? p.resumo.slice(0, 70) + "..." : "(vazio)");
  console.log("  avatares:", p.imagens.avatarAnime, "|", p.imagens.avatarManga);
  console.log("  imagens da infobox:", p.imagens.infobox.length);
}