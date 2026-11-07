import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

// ---------- Configuração ----------
const WIKI = "https://jojowiki.com";
const LISTA = "/List_of_Stands/pt-br";
const QUADROS = [3, 4, 5, 6, 7, 8, 9]; // o quadro de índice i da página é a parte QUADROS[i]
const PARTES = [3, 4, 5, 6, 7, 8, 9];                    // depois: [3, 4, 5, 6, 7, 8, 9]
const SO_LISTAR = false;                // true = só mostra os nomes, não baixa nada
const LIMITE = null;                      // para testar. Troque por null para rodar todos
const PASTA_BASE = "assets/stands";    // imagens: assets/stands/<Stand>/
const arquivoSaida = (n) => `scripts/saida/stands-parte-${n}.json`;
const PAUSA_MS = 800;
const CHAVES_STATS = ["destpower", "speed", "range", "stamina", "precision", "potential"];
const HEADERS = { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" };

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

function textoComQuebras($, el) {
  const copia = $(el).clone();
  copia.find("br").replaceWith(" | ");
  return limpar(copia.text());
}

// "/Jotaro_Kujo/pt-br" -> "/Jotaro_Kujo"
const semIdioma = (pagina) => pagina.replace(/\/pt-br$/, "");

function nomeDaPasta(pagina) {
  return decodeURIComponent(semIdioma(pagina).slice(1))
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

async function buscarHtml(caminho) {
  const resposta = await fetch(WIKI + caminho, { headers: HEADERS });
  if (!resposta.ok) throw new Error(`Status ${resposta.status} em ${caminho}`);
  return await resposta.text();
}

// ---------- Lista de Stands de uma parte ----------
function listarStands($, parte) {
  const indice = QUADROS.indexOf(parte);
  if (indice < 0) throw new Error(`Parte ${parte} não está em QUADROS`);

  const vistos = new Set();
  const lista = [];

  $(".cbox").eq(indice).find(".charbox").each((i, box) => {
    const link = $(box).find(".charname a").first();
    const pagina = link.attr("href");
    if (!pagina || vistos.has(pagina)) return;
    vistos.add(pagina);

    const imgs = $(box).find(".charicon img");
    lista.push({
      nome: limpar(link.text()),
      pagina,
      usuarios: $(box)
        .find(".charstand a")
        .map((j, a) => ({ nome: limpar($(a).text()), pagina: semIdioma($(a).attr("href")) }))
        .get(),
      avatarAnime: imgs[0] ? melhorUrl($, imgs[0]) : null,
      avatarManga: imgs[1] ? melhorUrl($, imgs[1]) : null,
    });
  });
  return lista;
}

// ---------- Extração da página de um Stand ----------
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

// Os parâmetros aparecem uma vez por aba; guardamos todos, na ordem em que aparecem
function extrairStats($) {
  const stats = Object.fromEntries(CHAVES_STATS.map((c) => [c, []]));
  $(".pi-data-value").each((i, el) => {
    const chave = $(el).closest("[data-source]").attr("data-source");
    if (chave in stats) stats[chave].push(limpar($(el).text()));
  });
  return stats;
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

// Cada techBox é uma técnica: nome, nome em japonês, estreia e descrição
function extrairTecnicas($) {
  return $(".techBox")
    .map((i, el) => {
      const caixa = $(el);
      const nome = limpar(caixa.find(".techName").first().text());
      const japones = limpar(caixa.find(".techJPN").first().text());
      const estreia = limpar(caixa.find(".techRow").first().text());

      // Descrição = o que sobra da caixa sem título, linha de estreia e imagem
      const copia = caixa.clone();
      copia.find(".techTitle, .techRow, .techImage, style").remove();
      const descricao = limpar(copia.text());

      return { nome, japones, estreia, descricao };
    })
    .get()
    .filter((t) => t.nome);
}

function extrairUrlsDasImagens($) {
  const urls = $('[data-source="image"] img')
    .map((i, img) => melhorUrl($, img))
    .get();
  return [...new Set(urls)];
}

// ---------- Download de imagens ----------
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

// ---------- Um Stand completo ----------
const cachePaginas = new Map();

async function dadosDaPagina(p) {
  if (cachePaginas.has(p.pagina)) return cachePaginas.get(p.pagina);

  const $ = cheerio.load(await buscarHtml(p.pagina));
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
    stats: extrairStats($),
    secoes: extrairSecoes($),
    tecnicas: extrairTecnicas($),
    imagensInfobox,
  };
  cachePaginas.set(p.pagina, dados);
  return dados;
}

async function processarStand(p, parte) {
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
    pagina: semIdioma(p.pagina),
    parte,
    usuarios: p.usuarios,
    resumo: dados.resumo,
    infobox: dados.infobox,
    stats: dados.stats,
    secoes: dados.secoes,
    tecnicas: dados.tecnicas,
    imagens: { ...avatares, infobox: dados.imagensInfobox },
  };
}

// ---------- Principal ----------
async function processarParte($lista, n) {
  const todos = listarStands($lista, n);
  console.log(`\n=== Parte ${n}: ${todos.length} Stands ===`);

  if (SO_LISTAR) {
    console.log(
      todos
        .map((p) => `${p.nome} (${p.usuarios.map((u) => u.nome).join(" + ") || "sem usuário"})`)
        .join(" | ")
    );
    return;
  }

  const lista = todos.slice(0, LIMITE ?? todos.length);
  const resultado = [];
  const falhas = [];

  for (const [i, p] of lista.entries()) {
    console.log(`[${i + 1}/${lista.length}] ${p.nome}`);
    try {
      resultado.push(await processarStand(p, n));
    } catch (e) {
      console.error("  ERRO:", e.message);
      falhas.push({ nome: p.nome, pagina: p.pagina, erro: e.message });
    }
    await esperar(PAUSA_MS);
  }

  const saida = arquivoSaida(n);
  mkdirSync(path.dirname(saida), { recursive: true });
  writeFileSync(saida, JSON.stringify({ parte: n, stands: resultado, falhas }, null, 2));
  console.log(`Parte ${n}: ${resultado.length} ok, ${falhas.length} falhas. Salvo em ${saida}`);
}

async function main() {
  const $lista = cheerio.load(await buscarHtml(LISTA));
  for (const n of PARTES) {
    try {
      await processarParte($lista, n);
    } catch (e) {
      console.error(`Parte ${n} falhou:`, e.message);
    }
    await esperar(PAUSA_MS);
  }
}

main().catch((e) => console.error("Erro:", e.message));