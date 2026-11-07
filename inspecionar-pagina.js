import * as cheerio from "cheerio";

const WIKI = "https://jojowiki.com";
const caminho = process.argv[2];
if (!caminho) {
  console.log("Uso: node inspecionar-pagina.mjs /Star_Platinum/pt-br");
  process.exit(1);
}

const resposta = await fetch(WIKI + caminho, {
  headers: { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" },
});
console.log("Status:", resposta.status);
if (!resposta.ok) process.exit(1);

const $ = cheerio.load(await resposta.text());
const limpar = (t) => t.replace(/\s+/g, " ").trim();

console.log("\nTÍTULO:", limpar($("h1").first().text()));

const resumo = $(".mw-parser-output > p")
  .map((i, el) => limpar($(el).text()))
  .get()
  .find((t) => t.length > 0);
console.log("\nRESUMO:", resumo ? resumo.slice(0, 300) : "(não achei)");

console.log("\nINFOBOX (chave: texto):");
$(".pi-data-value").each((i, el) => {
  const chave = $(el).closest("[data-source]").attr("data-source");
  console.log(` ${chave}: ${limpar($(el).text()).slice(0, 70)}`);
});

console.log("\nSEÇÕES:");
$(".mw-parser-output > h2").each((i, el) => {
  console.log(` - ${limpar($(el).text())} (${$(el).nextUntil("h2").length} elementos)`);
});

console.log("\nCaixas especiais:", {
  abilitybox: $(".abilitybox").length,
  techBox: $(".techBox").length,
});

const primeiro = $(".mw-parser-output > p")
  .filter((i, el) => limpar($(el).text()).length > 0)
  .first();
console.log("\nHTML DO 1º PARÁGRAFO:\n", primeiro.html()?.slice(0, 500));