import * as cheerio from "cheerio";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const WIKI = "https://jojowiki.com";
const INICIO = "/Phantom_Blood_(Anime)"; // começamos por aqui e seguimos previous/next
const PASTA_BASE = "assets/anime";
const ARQUIVO_SAIDA = "scripts/saida/anime.json";
const PAUSA_MS = 800;
const MAX_TEMPORADAS = 12; // trava de segurança contra laço infinito
const HEADERS = { "User-Agent": "Mozilla/5.0 (projeto de TCC - wiki JoJo)" };

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const limpar = (t) => t.replace(/\[\d+\]/g, "").replace(/\s+/g, " ").trim();

// "/Phantom_Blood_(Anime)/pt-br#x" -> "/Phantom_Blood_(Anime)"
const semIdioma = (p) => p.split("#")[0].replace(/\/pt-br$/, "");

function nomeDaPasta(pagina) {
    return decodeURIComponent(pagina.slice(1))
        .replace(/[^\w.-]+/g, "_")
        .replace(/\.+$/, "");
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

// Tenta a versão em português; se não existir, usa a original
async function carregarPagina(caminho) {
    try {
        return cheerio.load(await buscarHtml(`${caminho}/pt-br`));
    } catch (e) {
        console.error(`  Sem /pt-br (${e.message}); usando a versão original`);
        return cheerio.load(await buscarHtml(caminho));
    }
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

// chave do data-source -> { texto, links }
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

        infobox[chave] = { texto: limpar($(el).text()), links };
    });
    return infobox;
}

// Lê uma página de temporada. Devolve null se a página não parecer uma (sem estúdio na infobox)
async function lerTemporada(caminho) {
    const $ = await carregarPagina(caminho);
    const inf = extrairInfobox($);
    if (!inf.studio) return null;

    const resumo = $(".mw-parser-output > p")
        .map((i, el) => limpar($(el).text()))
        .get()
        .find((t) => t.length > 0);

    let imagem = null;
    const img = $('[data-source="image"] img').first();
    if (img.length) {
        try {
            const url = melhorUrl($, img[0]);
            const ext = path.extname(nomeDoArquivo(url)) || ".png";
            imagem = await baixarImagem(url, nomeDaPasta(caminho), "capa" + ext);
        } catch (e) {
            console.error("  Falhou imagem:", e.message);
        }
    }

    // Primeiro link de um campo (previous/next) = a temporada vizinha
    const vizinha = (campo) => {
        const l = inf[campo]?.links?.[0]?.pagina;
        return l ? semIdioma(l) : null;
    };

    return {
        titulo: limpar($("h1").first().text()),
        pagina: caminho,
        estudio: inf.studio.texto,
        estreia: inf.first?.texto ?? null,
        fim: inf.last?.texto ?? null,
        episodios: parseInt(inf.episodes?.texto, 10) || null,
        generos: inf.genre?.texto ?? null,
        resumo,
        imagem,
        anterior: vizinha("previous"),
        proxima: vizinha("next"),
    };
}

// ---------- Principal ----------
const vistos = new Set([INICIO]);

const inicial = await lerTemporada(INICIO);
if (!inicial) {
    console.log("A página inicial não parece uma temporada (sem estúdio na infobox).");
    process.exit(1);
}
console.log("Início:", inicial.titulo);

// Para trás: segue "previous" até acabar
const antes = [];
let atual = inicial;
while (atual.anterior && !vistos.has(atual.anterior) && vistos.size < MAX_TEMPORADAS) {
    vistos.add(atual.anterior);
    await esperar(PAUSA_MS);
    const t = await lerTemporada(atual.anterior);
    if (!t) {
        console.log("  Parei: não parece uma temporada:", atual.anterior);
        break;
    }
    console.log("<-", t.titulo);
    antes.unshift(t); // unshift coloca no começo da lista
    atual = t;
}

// Para a frente: segue "next" até acabar
const depois = [];
atual = inicial;
while (atual.proxima && !vistos.has(atual.proxima) && vistos.size < MAX_TEMPORADAS) {
    vistos.add(atual.proxima);
    await esperar(PAUSA_MS);
    const t = await lerTemporada(atual.proxima);
    if (!t) {
        console.log("  Parei: não parece uma temporada:", atual.proxima);
        break;
    }
    console.log("->", t.titulo);
    depois.push(t);
    atual = t;
}

const temporadas = [...antes, inicial, ...depois].map((t, i) => ({ ordem: i + 1, ...t }));

console.log("\nResultado:");
temporadas.forEach((t) =>
    console.log(`${t.ordem}. ${t.titulo} | ${t.estudio} | ${t.estreia} -> ${t.fim} | ${t.episodios} ep.`)
);

mkdirSync(path.dirname(ARQUIVO_SAIDA), { recursive: true });
writeFileSync(ARQUIVO_SAIDA, JSON.stringify({ temporadas }, null, 2));
console.log(`\n${temporadas.length} temporadas. Salvo em ${ARQUIVO_SAIDA}`);