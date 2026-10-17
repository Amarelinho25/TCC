import React, { useState } from "react";
import Carrossel from "../components/compoCarrosel";
import { House } from "lucide-react";
import {Link} from "react-router-dom"

const imagensCarrossel = [
  {
    src: "https://i.pinimg.com/1200x/43/06/e8/4306e82fa8d2ce120cda8b54f9fbd0c6.jpg",
    legenda: "Yoshikage Kira",
  },
  {
    src: "https://i.pinimg.com/736x/e7/22/d9/e722d9cc2afbc3bcbab087c11f1d9e52.jpg",
    legenda: "Kosuku Kawajiri",
  },
  {
    src: "https://i.pinimg.com/736x/9a/0c/23/9a0c232bc732c9ccc691b3caa0f07216.jpg",
    legenda: "Kosuku Kawajiri Cabelo branco",
  },
];

const partes = [
  "Phantom Blood",
  "Battle Tendency",
  "Stardust Crusaders",
  "Diamond is Unbreakable",
  "Golden Wind",
  "Stone Ocean",
  "Steel Ball Run",
  "JoJolion",
  "The JOJOLands",
];

const personagens = {
  1: [
    {
      nome: "Jonathan Joestar",
      imagem: "https://i.pinimg.com/1200x/34/21/23/342123eaa737cb792ce4ba32b3600156.jpg",
      descricao: "Jonathan Joestar é o protagonista da primeira parte da série, conhecido por sua coragem e determinação.",
    },
    {
      nome: "Dio Brando",
      imagem: "https://i.pinimg.com/1200x/fe/0b/15/fe0b15f51e39ad8677a8ae821124d944.jpg",
      descricao: "Dio Brando é o principal antagonista da primeira parte, um vilão carismático e manipulador.",
    },
    {
      nome: "Robert E. O. Speedwagon",
      imagem: "https://i.pinimg.com/736x/16/58/46/165846d544aa54db5102b1681e5f6e97.jpg",
      descricao: "Robert E. O. Speedwagon é um aliado de Jonathan Joestar, conhecido por sua lealdade e coragem.",
    },
    {
      nome: "Will A. Zeppeli",
      imagem: "https://i.pinimg.com/736x/7a/d5/96/7ad596c51f5177d22e756789237557c5.jpg",
      descricao: "Will A. Zeppeli é um aliado de Jonathan Joestar, que o ensinou a usar o Hamon para lutar contra os vampiros.",
    },
    {
      nome: "Erina Pendleton",
      imagem: "https://i.pinimg.com/736x/38/6b/01/386b01302b737afdbe5575a8f3545da6.jpg",
      descricao: "Erina Pendleton é o interesse amoroso de Jonathan Joestar, conhecida por sua gentileza e compaixão.",
    },
  ],

  2: [
    {
      nome: "Joseph Joestar",
      imagem: "https://i.pinimg.com/736x/ed/f1/75/edf1753c02c9774df94e4f962252751d.jpg",
      descricao: "Joseph Joestar é o protagonista da segunda parte da série, conhecido por sua astúcia e habilidades de combate.",
    },
    {
      nome: "Caesar Anthonio Zeppeli",
      imagem: "https://i.pinimg.com/736x/1d/c9/25/1dc92594fa7924a3ed830f1a524eec79.jpg",
      descricao: "Caesar Anthonio Zeppeli é um aliado de Joseph Joestar, conhecido por sua habilidade com o Hamon e seu senso de honra.",
    },
    {
      nome: "Lisa Lisa",
      imagem: "https://i.pinimg.com/736x/da/9d/f7/da9df768162d2c32be3e961a0c1e14cf.jpg",
      descricao: "Lisa Lisa é uma aliada de Joseph Joestar, conhecida por sua habilidade com o Hamon e seu papel como mentora.",
    },
    {
      nome: "Wamuu",
      imagem: "https://i.pinimg.com/1200x/a4/a9/ec/a4a9ec4f7e04b4e8467eb722180561c2.jpg",
      descricao: "Wamuu é um dos vilões da segunda parte, conhecido por sua força e lealdade ao seu mestre, Kars.",
    },
    {
      nome: "Kars",
      imagem: "https://i.pinimg.com/1200x/ee/a9/a4/eea9a4ee326eb353fccf411cd0841b42.jpg",
      descricao: "Kars é o principal antagonista da segunda parte, conhecido por sua ambição e desejo de se tornar o ser mais poderoso do mundo.",
    },
    {
      nome: "Esidisi",
      imagem: "https://i.pinimg.com/1200x/ee/a9/a4/eea9a4ee326eb353fccf411cd0841b42.jpg",
      descricao: "Esidisi é um dos vilões da segunda parte, conhecido por sua habilidade de manipular o calor e sua lealdade a Kars.",
    }
  ],
  3: [
    {
      nome: "Jotaro Kujo",
      imagem: "https://i.pinimg.com/736x/34/b2/02/34b2027905ea113bcfe4855128aae2f8.jpg",
      descricao: "Jotaro Kujo é o protagonista da terceira parte da série, conhecido por sua força, inteligência e habilidade com seu Stand, Star Platinum.",
    },
    {
      nome: "Noriaki Kakyoin",
      imagem: "https://i.pinimg.com/736x/ee/a2/2e/eea22ea0d649ca986aa76ba06a21658d.jpg",
      descricao: "Noriaki Kakyoin é um aliado de Jotaro Kujo, conhecido por sua habilidade com seu Stand, Hierophant Green, e sua lealdade ao grupo.",
    },
    {
      nome: "Jean Pierre Polnareff",
      imagem: "https://i.pinimg.com/736x/83/f3/e5/83f3e58055efbf497d294761f943985d.jpg",
      descricao: "Jean Pierre Polnareff é um aliado de Jotaro Kujo, conhecido por sua habilidade com seu Stand, Silver Chariot, e seu senso de justiça.",
    },
    {
      nome: "Muhammad Avdol",
      imagem: "https://i.pinimg.com/736x/10/88/ac/1088ace25483efff77ba2db299a1d440.jpg",
      descricao: "Muhammad Avdol é um aliado de Jotaro Kujo, conhecido por sua habilidade com seu Stand, Magician's Red, e sua sabedoria.",
    },
    {
      nome: "Iggy",
      imagem: "https://i.pinimg.com/736x/4c/46/7f/4c467f4847507e89a53c765b7a95e227.jpg",
      descricao: "Iggy é um aliado de Jotaro Kujo, conhecido por sua habilidade com seu Stand, The Fool, e sua personalidade independente.",
    },
    {
      nome: "Joseph Joestar",
      imagem: "https://i.pinimg.com/1200x/5c/de/bb/5cdebb6d51d07f17e1be273b15fb3ffe.jpg",
      descricao: "Joseph Joestar é o avô de Jotaro Kujo, conhecido por sua experiência, inteligência e habilidade com seu Stand, Hermit Purple.",
    },
    {
      nome: "Dio Brando",
      imagem: "https://i.pinimg.com/1200x/c9/01/57/c90157185f9bb1ff65d6dc8306ff4df6.jpg",
      descricao: "Dio Brando é o principal antagonista da terceira parte, conhecido por sua habilidade com seu Stand, The World, e sua ambição de dominar o mundo.",
    }
  ],
  4: [
    {
      nome: "Josuke Higashikata",
      imagem: "https://i.pinimg.com/736x/4d/55/a6/4d55a6f9cdffe2dab7c4440b0dc1d58c.jpg",
      descricao: "Josuke Higashikata é o protagonista da quarta parte da série, conhecido por sua habilidade com seu Stand, Crazy Diamond, e sua personalidade amigável.",
    },
    {
      nome: "Koichi Hirose",
      imagem: "https://i.pinimg.com/736x/d8/64/49/d86449f9ff989bbf43459df8194dc4f6.jpg",
      descricao: "Koichi Hirose é um aliado de Josuke Higashikata, conhecido por sua habilidade com seu Stand, Echoes, e sua lealdade ao grupo.",
    },
    {
      nome: "Okuyasu Nijimura",
      imagem: "https://i.pinimg.com/1200x/1c/b1/27/1cb12762949b6ba940456e093c2ead70.jpg",
      descricao: "Okuyasu Nijimura é um aliado de Josuke Higashikata, conhecido por sua habilidade com seu Stand, The Hand, e sua personalidade impulsiva.",
    },
    {
      nome: "Rohan Kishibe",
      imagem: "https://i.pinimg.com/1200x/f7/1d/d4/f71dd428d64e6f842ef5fb6caa060e86.jpg",
      descricao: "Rohan Kishibe é um aliado de Josuke Higashikata, conhecido por sua habilidade com seu Stand, Heaven's Door, e sua paixão por mangá.",
    },
    {
      nome: "Jotaro Kujo",
      imagem: "https://i.pinimg.com/1200x/bb/f8/4b/bbf84bb79038908db4bec25418d47ee1.jpg",
      descricao: "Jotaro Kujo é um aliado e sobrinho de Josuke Higashikata, conhecido por sua habilidade com seu Stand, Star Platinum, e sua experiência em batalhas.",
    },
    {
      nome: "Joseph Joestar",
      imagem: "https://i.pinimg.com/736x/ab/fe/de/abfede79f08e363e6efed3c7c8c59bce.jpg",
      descricao: "Joseph Joestar é o pai de Josuke Higashikata, conhecido por sua experiência, inteligência e habilidade com seu Stand, Hermit Purple.",
    },
    {
      nome: "Yoshikage Kira",
      imagens: imagensCarrossel,
      descricao: "Yoshikage Kira é o principal antagonista da quarta parte, conhecido por sua habilidade com seu Stand, Killer Queen, e sua obsessão por uma vida tranquila.",
    }

  ],
};

const Personagens = () => {
  const [parteAtiva, setParteAtiva] = useState(1);
  const lista = personagens[parteAtiva] || [];

  return (
    <div>
      <div className="bg-purple-900 text-white p-4">
      <Link to="/" >
        <House className="absolute left-4" size={40} />
      </Link>
      
        <h1 className="text-3xl font-bold text-center">Personagens</h1>
      </div>

      <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-2 mb-4">
          {partes.map((nome, index) => (
            <button
              key={nome}
              onClick={() => setParteAtiva(index + 1)}
              className={
                index + 1 === parteAtiva
                  ? "bg-purple-700 text-white px-4 py-2 rounded-t-lg font-bold"
                  : "bg-gray-200 text-purple-700 px-4 py-2 rounded-t-lg"
              }
            >
              Part {index + 1}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4">
          Parte {parteAtiva}: {partes[parteAtiva - 1]}
        </h2>

        {lista.length === 0 && <p>Nenhum personagem cadastrado ainda.</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lista.map((p) => (
            <div key={p.nome} className="shadow-lg rounded-lg p-4 flex gap-4">
              {p.imagens ? (
                <div className="w-40 shrink-0">
                  <Carrossel imagens={p.imagens} />
                </div>
              ) : (
                <img
                  src={p.imagem}
                  alt={p.nome}
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <div>
                <h3 className="font-bold">{p.nome}</h3>
                <p className="text-sm">{p.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personagens;