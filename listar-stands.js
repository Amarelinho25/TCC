import * as cheerio from "cheerio";

const url = process.argv[2];
if (!url) {
  console.log('Uso: node listar-stands.mjs "https://jojowiki.com/..."');
  process.exit(1);
}

const resposta = await fetch(url, {
  headers: { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" },
});
if (!resposta.ok) {
  console.log("Status:", resposta.status);
  process.exit(1);
}
const $ = cheerio.load(await resposta.text());

const limpar = (t) => t.replace(/\s+/g, " ").trim();

// 1. Quantos quadros existem e quantos cartões cada um tem
console.log("Quadros (.cbox):", $(".cbox").length);
$(".cbox").each((i, cbox) => {
  const titulo = limpar($(cbox).find(".cboxTitle").first().text());
  console.log(`  [${i}] ${titulo || "(sem título)"} -> ${$(cbox).find(".charbox").length} cartões`);
});
console.log("Total de .charbox na página:", $(".charbox").length);

// 2. Cartões que têm usuário (.charstand): os 10 primeiros
const stands = $(".charbox").has(".charstand");
console.log("\nCartões com usuário (.charstand):", stands.length);

stands.slice(0, 10).each((i, box) => {
  const stand = $(box).find(".charname a").first();
  const usuarios = $(box)
    .find(".charstand a")
    .map((j, a) => limpar($(a).text()))
    .get()
    .join(" + ");
  console.log(`${limpar(stand.text())} (${stand.attr("href")}) | usuário: ${usuarios || "(nenhum)"}`);
});