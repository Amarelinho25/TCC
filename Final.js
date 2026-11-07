import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

// ---------- Configuração ----------
const WIKI = "https://jojowiki.com";
const PARTES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const SO_LISTAR = true;   // true = só mostra os nomes, não baixa nada
const LIMITE = 2;         // para testar. Troque por null para rodar todos
const USAR_PT_BR = true;  // true = tenta a página em português; se não existir, usa a em inglês
const PASTA_BASE = "assets"; // imagens: assets/<Personagem>/
const PAUSA_MS = 800;        // espera entre requisições
const HEADERS = { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" };
const categoria = (n) => `/Category:Part_${n}_Characters`;
const arquivoSaida = (n) => `scripts/saida/parte-${n}.json`;

// chave guardada no JSON -> nomes que a seção pode ter na página (português ou inglês)
const SECOES = {
  Appearance: ["Aparência", "Appearance"],
  Personality: ["Personalidade", "Personality"],
  Abilities: ["Habilidades", "Abilities"],
  History: ["História", "History"],
  Quotes: ["Frases", "Quotes"],
};

// ---------- Utilidades ----------
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function limpar(texto) {
  return texto.replace(/\[\d+\]/g, "").replace(/\s+/g, " ").trim();
}

// Lê o texto trocando <br> por " | "
function textoComQuebras($, el) {
  const copia = $(el).clone();
  copia.find("br").replaceWith(" | ");
  return limpar(copia.text());
}

// "/Jonathan_Joestar" -> "Jonathan_Joestar"
function nomeDaPasta(pagina) {
  return decodeURIComponent(pagina.slice(1))
    .replace(/[^\w.-]+/g, "_")
    .replace(/\.+$/, ""); // Windows não aceita pasta terminando em ponto
}

// Maior URL do srcset, ou o src, sempre completa
function melhorUrl($, img) {
  let url = $(img).attr("src");
  const srcset = $(img).attr("srcset");
  if (srcset) {
    const candidatos = srcset.split(",").map((s) => s.trim().split(/\s+/)[0]);
    url = candidatos[candidatos.length - 1];
  }
  return new URL(url, WIKI).href;
}

// Nome do arquivo a partir da URL, sem o prefixo "120px-"
function nomeDoArquivo(url) {
  const ultimo = decodeURIComponent(new URL(url).pathname.split("/").pop());
  return ultimo.replace(/^\d+px-/, "");
}

async function buscarHtml(caminho) {
  const resposta = await fetch(WIKI + caminho, { headers: HEADERS });
  if (!resposta.ok) throw new Error(`Status ${resposta.status} em ${caminho}`);
  return await resposta.text();
}

// ---------- Lista de personagens da parte ----------
async function listarPersonagens(caminho) {
  const $ = cheerio.load(await buscarHtml(caminho));

  // O 1º .charbox pertence ao quadro principal; o pai dele guarda só os personagens principais
  const grupo = $(".cbox .charbox").first().parent().children(".charbox");

  const vistos = new Set();
  const lista = [];

  grupo.each((i, box) => {
    const link = $(box).find(".charname a").first();
    const pagina = link.attr("href");
    if (!pagina || vistos.has(pagina)) return;
    vistos.add(pagina);

    const imgs = $(box).find(".charicon img");
    const status = limpar($(box).find(".charstatus").text()).replace(/[()]/g, "");

    lista.push({
      nome: limpar(link.text()),
      pagina,
      status: status || null,
      avatarAnime: imgs[0] ? melhorUrl($, imgs[0]) : null,
      avatarManga: imgs[1] ? melhorUrl($, imgs[1]) : null,
    });
  });
  return lista;
}

// ---------- Extração de dados da página do personagem ----------
function extrairInfobox($) {
  const infobox = {};
  $(".pi-data-value").each((i, el) => {
    const chave = $(el).closest("[data-source]").attr("data-source");
    if (!chave || chave in infobox) return;

    const links = $(el)
      .find("a[href]")
      .map((j, a) => ({ nome: limpar($(a).text()), pagina: $(a).attr("href") }))
      .get()
      .filter((l) => l.nome !== "" && l.pagina.startsWith("/") && !l.pagina.startsWith("/File:"));

    infobox[chave] = { texto: textoComQuebras($, el), links };
  });
  return infobox;
}

function extrairSecoes($) {
  const resultado = {};
  for (const [chave, nomes] of Object.entries(SECOES)) {
    const titulo = $(".mw-parser-output > h2")
      .filter((i, el) => nomes.includes(limpar($(el).text())))
      .first();
    if (titulo.length === 0) continue;

    resultado[chave] = titulo
      .nextUntil("h2")
      .filter("p, h3, h4")
      .map((i, el) => limpar($(el).text()))
      .get()
      .filter((t) => t.length > 0);
  }
  return resultado;
}

function extrairUrlsDasImagens($) {
  const urls = $('[data-source="image"] img')
    .map((i, img) => melhorUrl($, img))
    .get();
  return [...new Set(urls)];
}

// ---------- Download de imagens ----------
// Devolve o caminho relativo salvo (ex.: "assets/Dio_Brando/avatar-anime-parte3.png")
async function baixarImagem(url, pastaNome, nomeArquivo) {
  const pasta = path.join(PASTA_BASE, pastaNome);
  mkdirSync(pasta, { recursive: true });

  const destino = path.join(pasta, nomeArquivo);
  const relativo = `${PASTA_BASE}/${pastaNome}/${nomeArquivo}`;

  if (existsSync(destino)) return relativo; // já baixada em outra execução

  const resposta = await fetch(url, { headers: HEADERS });
  if (!resposta.ok) throw new Error(`Status ${resposta.status} em ${url}`);
  writeFileSync(destino, Buffer.from(await resposta.arrayBuffer()));
  await esperar(PAUSA_MS);
  return relativo;
}

// ---------- Um personagem completo ----------
const cachePaginas = new Map(); // pagina -> dados já extraídos (vale durante a execução)

// Tenta a versão em português; se não existir, usa a original em inglês
async function carregarPagina(pagina) {
  if (USAR_PT_BR) {
    try {
      return cheerio.load(await buscarHtml(`${pagina}/pt-br`));
    } catch (e) {
      console.error(`  Sem /pt-br (${e.message}); usando a versão em inglês`);
    }
  }
  return cheerio.load(await buscarHtml(pagina));
}

// Busca e extrai o que é igual em qualquer parte
async function dadosDaPagina(p) {
  if (cachePaginas.has(p.pagina)) return cachePaginas.get(p.pagina);

  const $ = await carregarPagina(p.pagina);
  const pastaNome = nomeDaPasta(p.pagina);

  const resumo = $(".mw-parser-output > p")
    .map((i, el) => limpar($(el).text()))
    .get()
    .find((t) => t.length > 0);

  const imagensInfobox = [];
  for (const url of extrairUrlsDasImagens($)) {
    try {
      imagensInfobox.push(await baixarImagem(url, pastaNome, nomeDoArquivo(url)));
    } catch (e) {
      console.error("  Falhou imagem:", e.message);
    }
  }

  const dados = {
    nomeWiki: limpar($("h1").first().text()),
    resumo,
    infobox: extrairInfobox($),
    secoes: extrairSecoes($),
    imagensInfobox,
  };
  cachePaginas.set(p.pagina, dados);
  return dados;
}

// Junta os dados da página com o que é específico da parte (avatares e status)
async function processarPersonagem(p, parte) {
  const pastaNome = nomeDaPasta(p.pagina);
  const dados = await dadosDaPagina(p);

  const avatares = { avatarAnime: null, avatarManga: null };
  const lista = [
    ["avatarAnime", `avatar-anime-parte${parte}`],
    ["avatarManga", `avatar-manga-parte${parte}`],
  ];

  for (const [campo, nome] of lista) {
    if (!p[campo]) continue;
    const ext = path.extname(nomeDoArquivo(p[campo])) || ".png";
    try {
      avatares[campo] = await baixarImagem(p[campo], pastaNome, nome + ext);
    } catch (e) {
      console.error("  Falhou avatar:", e.message);
    }
  }

  return {
    nome: p.nome,
    nomeWiki: dados.nomeWiki,
    pagina: p.pagina,
    parte,
    status: p.status,
    resumo: dados.resumo,
    infobox: dados.infobox,
    secoes: dados.secoes,
    imagens: { ...avatares, infobox: dados.imagensInfobox },
  };
}

// ---------- Principal ----------
async function processarParte(n) {
  const todos = await listarPersonagens(categoria(n));
  console.log(`\n=== Parte ${n}: ${todos.length} personagens ===`);

  if (SO_LISTAR) {
    console.log(todos.map((p) => p.nome).join(" | "));
    return;
  }

  const lista = todos.slice(0, LIMITE ?? todos.length);
  const resultado = [];
  const falhas = [];

  for (const [i, p] of lista.entries()) {
    console.log(`[${i + 1}/${lista.length}] ${p.nome}`);
    try {
      resultado.push(await processarPersonagem(p, n));
    } catch (e) {
      console.error("  ERRO:", e.message);
      falhas.push({ nome: p.nome, pagina: p.pagina, erro: e.message });
    }
    await esperar(PAUSA_MS);
  }

  const saida = arquivoSaida(n);
  mkdirSync(path.dirname(saida), { recursive: true });
  writeFileSync(saida, JSON.stringify({ parte: n, personagens: resultado, falhas }, null, 2));
  console.log(`Parte ${n}: ${resultado.length} ok, ${falhas.length} falhas. Salvo em ${saida}`);
}

async function main() {
  for (const n of PARTES) {
    try {
      await processarParte(n);
    } catch (e) {
      console.error(`Parte ${n} falhou:`, e.message);
    }
    await esperar(PAUSA_MS);
  }
}

main().catch((e) => console.error("Erro:", e.message));