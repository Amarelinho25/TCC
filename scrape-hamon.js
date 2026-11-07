import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const WIKI = "https://jojowiki.com";
const CATEGORIA = "/Category:Ripple_Users";
const PASTA_BASE = "assets/hamon";
const ARQUIVO_SAIDA = "scripts/saida/hamon.json";
const PAUSA_MS = 800;
const HEADERS = { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" };

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const limpar = (t) => t.replace(/\[\d+\]/g, "").replace(/\s+/g, " ").trim();

function nomeDaPasta(pagina) {
  return decodeURIComponent(pagina.slice(1))
    .replace(/[^\w.-]+/g, "_")
    .replace(/\.+$/, ""); // Windows não aceita pasta terminando em ponto
}

function melhorUrl($, img) {
  let url = $(img).attr("src");
  const srcset = $(img).attr("srcset");
  if (srcset) {
    const candidatos = srcset.split(",").map((s) => s.trim().split(/\s+/)[0]);
    url = candidatos[candidatos.length - 1];
  }
  return new URL(url, WIKI).href;
}

function nomeDoArquivo(url) {
  const ultimo = decodeURIComponent(new URL(url).pathname.split("/").pop());
  return ultimo.replace(/^\d+px-/, "");
}

async function baixarImagem(url, pastaNome, nomeArquivo) {
  const pasta = path.join(PASTA_BASE, pastaNome);
  mkdirSync(pasta, { recursive: true });

  const destino = path.join(pasta, nomeArquivo);
  const relativo = `${PASTA_BASE}/${pastaNome}/${nomeArquivo}`;
  if (existsSync(destino)) return relativo;

  const resposta = await fetch(url, { headers: HEADERS });
  if (!resposta.ok) throw new Error(`Status ${resposta.status} em ${url}`);
  writeFileSync(destino, Buffer.from(await resposta.arrayBuffer()));
  await esperar(PAUSA_MS);
  return relativo;
}

// ---------- Principal ----------
const resposta = await fetch(WIKI + CATEGORIA, { headers: HEADERS });
console.log("Status:", resposta.status);
if (!resposta.ok) process.exit(1);

const $ = cheerio.load(await resposta.text());
const cartoes = $(".charbox");
console.log(`Cartões (.charbox): ${cartoes.length}`);

// Plano B: se a página não usa cartões, mostramos os links da lista e paramos
if (cartoes.length === 0) {
  console.log("Não achei cartões. Links da lista de páginas da categoria:");
  $("#mw-pages a").each((i, a) => console.log(" -", limpar($(a).text()), $(a).attr("href")));
  process.exit(0);
}

const vistos = new Set();
const lista = [];

// toArray() porque dentro de um for...of podemos usar await (no .each() do cheerio não)
for (const box of cartoes.toArray()) {
  const link = $(box).find(".charname a").first();
  const pagina = link.attr("href");
  if (!pagina || vistos.has(pagina)) continue;
  vistos.add(pagina);

  const imgs = $(box).find(".charicon img");
  const pasta = nomeDaPasta(pagina);
  const item = { nome: limpar(link.text()), pagina, avatarAnime: null, avatarManga: null };

  const avatares = [
    ["avatarAnime", "avatar-anime", 0],
    ["avatarManga", "avatar-manga", 1],
  ];
  for (const [campo, nome, indice] of avatares) {
    if (!imgs[indice]) continue;
    const url = melhorUrl($, imgs[indice]);
    const ext = path.extname(nomeDoArquivo(url)) || ".png";
    try {
      item[campo] = await baixarImagem(url, pasta, nome + ext);
    } catch (e) {
      console.error("  Falhou:", e.message);
    }
  }

  lista.push(item);
  console.log(`- ${item.nome} (${pagina})`);
}

mkdirSync(path.dirname(ARQUIVO_SAIDA), { recursive: true });
writeFileSync(ARQUIVO_SAIDA, JSON.stringify({ categoria: "Ripple Users", personagens: lista }, null, 2));
console.log(`\n${lista.length} personagens. Salvo em ${ARQUIVO_SAIDA}`);