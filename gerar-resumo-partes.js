import { readFileSync, writeFileSync, existsSync } from "node:fs";

const resumo = {};

for (let n = 1; n <= 9; n++) {
  const { personagens } = JSON.parse(readFileSync(`scripts/saida/parte-${n}.json`, "utf8"));

  // Os 6 primeiros da lista da wiki (o primeiro é o protagonista de cada parte)
  const principais = personagens.slice(0, 6).map((p) => ({
    nome: p.nome,
    pagina: p.pagina,
    avatar: p.imagens.avatarAnime ?? p.imagens.avatarManga,
  }));

  // As partes 1 e 2 não têm arquivo de Stands
  let stands = 0;
  const arquivoStands = `scripts/saida/stands-parte-${n}.json`;
  if (existsSync(arquivoStands)) {
    stands = JSON.parse(readFileSync(arquivoStands, "utf8")).stands.length;
  }

  resumo[n] = { total: personagens.length, stands, principais };
  console.log(`Parte ${n}: ${personagens.length} personagens, ${stands} Stands, 1º = ${principais[0]?.nome}`);
}

writeFileSync("scripts/saida/resumo-partes.json", JSON.stringify(resumo, null, 2));
console.log("Salvo em scripts/saida/resumo-partes.json");