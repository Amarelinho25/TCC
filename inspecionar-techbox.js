import * as cheerio from "cheerio";

const WIKI = "https://jojowiki.com";
const caminho = process.argv[2] ?? "/Star_Platinum/pt-br";

const resposta = await fetch(WIKI + caminho, {
  headers: { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" },
});
console.log("Status:", resposta.status);
if (!resposta.ok) process.exit(1);

const $ = cheerio.load(await resposta.text());
const limpar = (t) => t.replace(/\s+/g, " ").trim();

const caixas = $(".techBox");
console.log("techBox encontradas:", caixas.length);

// Para cada caixa: o que vem antes dela (o subtítulo) e o começo do texto
caixas.each((i, el) => {
  const caixa = $(el);
  console.log(`\n--- techBox ${i} ---`);
  console.log("Antes dela:", caixa.prev().prop("tagName"), "|", limpar(caixa.prev().text()).slice(0, 60));
  console.log("Texto:", limpar(caixa.text()).slice(0, 200));
});

// O HTML da primeira, para escolhermos os seletores
console.log("\nHTML da primeira:\n", $(".techBox").first().html()?.slice(0, 1500));