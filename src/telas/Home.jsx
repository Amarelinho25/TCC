import react from "react";
import {NavLink} from "react-router-dom";
import Carrossel from "../components/compoCarrosel";

const imagensCarrossel = [
  {
    src: "https://i.pinimg.com/1200x/2e/ab/52/2eab525a92ea63e790768c81129ec6db.jpg",
  },
  {
    src: "https://i.pinimg.com/1200x/79/ba/f7/79baf75f68a8f6151a05af80a6ebb480.jpg",
  },
  {
    src: "https://i.pinimg.com/1200x/18/6d/4c/186d4c896ba234ccd89d47cfc24659bf.jpg",
  },
];

const Quadros = [
{
  id: '1',
  titulo: "Poderes",
  capa: "https://i.pinimg.com/736x/cc/df/7b/ccdf7bc6025465180f1bca9a06298844.jpg",
  rota: "/stands",
},
{
  id: '2',
  titulo: "História",
  capa: "https://i.pinimg.com/736x/cb/36/7f/cb367f343734a698d5790e8067044970.jpg",
  rota: "/history",
},
{
  id: '3',
  titulo: "Personagens",
  capa: "https://i.pinimg.com/736x/94/bd/45/94bd456950c9ad4764e84394c73e2fa5.jpg",
  rota: "/personagens",
 
},
{
  id: '4',
  titulo: "Anime",
  capa: "https://i.pinimg.com/1200x/c0/e5/a8/c0e5a8a6892b8488abe5199649a7e84b.jpg",
  rota: "/anime"
}
]

export default function Home() {
  return (
    <>
   
    <div className="bg-purple-500 to-pink-500 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Wiki jojo</h1>
    </div>

    <br/>
    
    <Carrossel imagens={imagensCarrossel} />

    <div className="mb-1">
       
        <h1 className="text-2xl font-bold text-center">JoJo's Bizarre Adventure</h1>
    </div>
    <div className="mb-4">
        <p className="text-center">JoJo's Bizarre Adventure é uma série de mangá escrita e ilustrada por Hirohiko Araki. A história segue as aventuras da família Joestar, cujos membros descobrem possuir habilidades sobrenaturais e enfrentam inimigos poderosos ao longo das gerações.</p>
        <br/>
        <p className="text-center">A série é conhecida por seu estilo artístico distinto, personagens memoráveis e enredos complexos. Cada parte da história apresenta um protagonista diferente da família Joestar, com suas próprias lutas e desafios.</p>
    </div>

    <br/>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {Quadros.map((quadro) => (
        <NavLink key={quadro.id} to={quadro.rota} className="block">
          <div className="bg-purple-300 p-4 rounded-xl shadow-lg overflow-hidden">
            <h1 className="text-lg font-bold text-center mb-2">
              {quadro.titulo}
            </h1>
            <img
              src={quadro.capa}
              alt={quadro.titulo}
              className="w-full h-70 object-cover rounded-xl"
            />
          </div>
        </NavLink>
      ))}
    </div>
  </>
  );
}

