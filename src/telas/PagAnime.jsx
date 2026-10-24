import { House } from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

export default function PagAnime() {
    return (
        <>
            <div>
                <div className="bg-purple-900 text-white p-4">
                    <Link to="/">
                      <House className="absolute left-4" size={40}/>
                    </Link>

                    <h1 className="text-2xl font-bold text-center">Anime</h1>
                </div>
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">JoJo's Bizarre Adventure</h2>
                <p className="mb-4"></p>
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Sinopse</h2>
                <p className="mb-4">JoJo's Bizarre Adventure é uma série de mangá e anime que segue as aventuras da família Joestar ao longo de várias gerações. Cada parte da história apresenta um novo protagonista, conhecido como "JoJo", que enfrenta inimigos sobrenaturais e desafios extraordinários. A série é conhecida por seu estilo artístico único, batalhas criativas e enredos complexos que misturam elementos de ação, aventura e fantasia.</p>
            </div>

            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Partes do Anime</h2>
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 1: Phantom Blood</li>
                    <p className="mb-4">A história segue Jonathan Joestar e sua luta contra seu irmão adotivo, Dio Brando, que se torna um vampiro. A trama explora temas de honra, coragem e a batalha entre o bem e o mal.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 2</li>
                    <p className="mb-4">A história segue Joseph Joestar, neto de Jonathan, enquanto ele enfrenta os Homens do Pilar, seres antigos com habilidades sobrenaturais. A trama combina ação, humor e estratégias inteligentes.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 3: Stardust Crusaders</li>
                    <p className="mb-4">A história segue Jotaro Kujo e seus aliados em uma jornada para derrotar Dio Brando, que retornou com poderes sobrenaturais. A trama introduz o conceito de Stands, manifestações físicas.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 4: Diamond is Unbreakable</li>
                    <p className="mb-4">A história segue Josuke Higashikata e seus amigos enquanto investigam estranhos acontecimentos em sua cidade natal, Morioh. A trama combina mistério, ação e desenvolvimento de personagens.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 5: Golden Wind</li>
                    <p className="mb-4">A história segue Giorno Giovanna e seu objetivo de se tornar um "Gang-Star" na Itália. A trama explora temas de ambição, lealdade e a luta contra organizações criminosas.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 6: Stone Ocean</li>
                    <p className="mb-4">A história segue Jolyne Cujoh, filha de Jotaro Kujo, enquanto ela luta para limpar seu nome e enfrentar inimigos poderosos dentro de uma prisão. A trama aborda temas de justiça, redenção e a força do espírito humano.</p>
                </ul>
            </div>
            <div className="m-4 p-4 bg-white rounded-lg shadow-lg">
                <ul className="list-disc list-inside">
                    <li className="mb-2 font-bold">Parte 7: Steel Ball Run</li>
                    <p className="mb-4">A história segue Johnny Joestar e Gyro Zeppeli em uma corrida de cavalos pelos Estados Unidos, enfrentando desafios e inimigos ao longo do caminho. A trama explora temas de perseverança, amizade e a busca por redenção.</p>
                </ul>
            </div>
        </>
    );
}
