import * as cheerio from "cheerio";

const WIKI = "https://jojowiki.com";
const pagina = "/Jotaro_Kujo";
const SECOES = ["Abilities", "Quotes"];

const resposta = await fetch(WIKI + pagina, {
  headers: { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" },
});
const $ = cheerio.load(await resposta.text());

for (const nome of SECOES) {
  const titulo = $(".mw-parser-output > h2")
    .filter((i, el) => $(el).text().replace(/\s+/g, " ").trim() === nome)
    .first();

  console.log(`\n===== ${nome} =====`);

  const irmaos = titulo.nextUntil("h2");

  // 1. Quantos elementos de cada tipo existem na seção
  const contagem = {};
  irmaos.each((i, el) => {
    const marca = el.tagName + (el.attribs.class ? "." + el.attribs.class.split(" ")[0] : "");
    contagem[marca] = (contagem[marca] ?? 0) + 1;
  });
  console.log("Elementos:", contagem);

  // 2. Os 6 primeiros, com o começo do texto de cada um
  irmaos.slice(0, 6).each((i, el) => {
    const texto = $(el).text().replace(/\s+/g, " ").trim().slice(0, 80);
    console.log(` [${i}] <${el.tagName} class="${el.attribs.class ?? ""}"> ${texto}`);
  });
}