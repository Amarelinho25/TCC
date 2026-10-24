import React from "react";
import {House} from "lucide-react";
import {Link} from "react-router-dom"


const Stands = [
{
  id: '1',
  titulo: "Star Platinum",
  capa: "https://i.pinimg.com/736x/fb/b6/0e/fbb60e8d2f616ba976605ac152d3d987.jpg",
  poderes: "Super força, velocidade e precisão, além de habilidades de parar o tempo em algumas versões.",

},
{
  id: '2',
  titulo: "The World",
  capa: "https://i.pinimg.com/1200x/49/27/84/492784c955776c2b4ceaa0087f2aa673.jpg",
  poderes: "Habilidade de parar o tempo por alguns segundos, além de força e velocidade sobre-humanas.",
},
{
  id: '3',
  titulo: "Crazy Diamond",
  capa: "https://i.pinimg.com/1200x/e7/ec/ce/e7eccee9e4f239480f75defdf897d829.jpg",
  poderes: "Capacidade de restaurar objetos e seres vivos ao seu estado original, além de força e velocidade aprimoradas.",
},
{ 
    id: '4',
    titulo: "Killer Queen",
    capa: "https://i.pinimg.com/1200x/68/7e/b9/687eb9f7fbc8ecc2651d46c78417fae7.jpg",
    poderes: "Habilidade de transformar qualquer objeto em uma bomba, além de força e velocidade aprimoradas.",
} ]

export default function PagStands() {
    return (
        <>
    <div className="relative bg-purple-900 p-4 text-white flex items-center justify-center">
   <Link to="/" className="absolute left-4">
        <House size={40} />
    </Link>

    <h1 className="text-3xl font-bold text-center">
        Stands
    </h1>
</div>


    <br/>

    <div className="mb-1">
        <h1 className="text-2xl font-bold text-center">Stands</h1>
    </div>
    <div className="mb-4">
         <p className="text-center">Stands são manifestações físicas de energia espiritual que concedem habilidades especiais aos seus usuários. Cada Stand é único e possui poderes distintos, variando desde habilidades de combate até manipulação de tempo e espaço.</p>
        <br/>
         <p className="text-center">A relação entre o usuário e seu Stand é profunda, muitas vezes refletindo a personalidade e os desejos do indivíduo. Stands desempenham um papel central na série JoJo's Bizarre Adventure, sendo essenciais para as batalhas e desafios enfrentados pelos personagens.</p>
         <br/>
         <p className="text-center">Abaixo, você encontrará uma lista de alguns dos Stands mais notáveis da série, juntamente com suas habilidades e características únicas.</p>
    </div>

    <div className="text-center">
        <h1 className="text-2xl font-bold">Lista de Stands</h1>
        <p className="text-center">Abaixo está uma lista de alguns dos Stands mais notáveis da série:</p>
    </div>
    
    <div className="h-96 overflow-y-auto m-4 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-2">Aqui são alguns dos Stands mais notáveis:</h1>
        <div className="grid grid-cols-2 gap-4">
            {Stands.map((stand) => (
                <div key={stand.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <img src={stand.capa} alt={stand.titulo} className="w-full h-100 object-cover rounded-xl" />
                    <h2 className="text-lg font-bold">{stand.titulo}</h2>
                    <p>{stand.poderes}</p>
                </div>
            ))}
        </div>
    </div>

    <div className="h-96 overflow-y-auto m-4 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-lg font-bold mb-2">Hamon</h1>
         <p>Hamon é uma técnica de respiração que permite ao usuário canalizar energia vital para realizar feitos extraordinários, como curar ferimentos e combater vampiros. Embora não seja um Stand, Hamon desempenha um papel importante nas primeiras partes da série.</p>
        <br/>
         <p>Alguns usuários de Hamon incluem:</p>
        <br/>
         <ul className="list-disc list-inside">
            <li className="mb-2 font-bold">Jonathan Joestar</li>
              <img src="https://i.pinimg.com/1200x/34/21/23/342123eaa737cb792ce4ba32b3600156.jpg" alt="Jonathan Joestar" className="w-100 h-100 object-cover rounded-xl mb-2" />
            <br/>
            
            <li className="mb-2 font-bold">Joseph Joestar</li>
              <img src="https://i.pinimg.com/736x/51/c2/fa/51c2fa1b372c567c02ad0d7d3f998598.jpg" alt="Joseph Joestar" className="w-100 h-100 object-cover rounded-xl mb-2" />
            <br/>
            
            <li className="mb-2 font-bold">Lisa Lisa</li>
              <img src="https://i.pinimg.com/736x/da/9d/f7/da9df768162d2c32be3e961a0c1e14cf.jpg" alt="Lisa Lisa" className="w-100 h-100 object-cover rounded-xl mb-2" />
            <br/>

            <li className="mb-2 font-bold">Caesar Zeppeli</li>
              <img src="https://i.pinimg.com/736x/1d/c9/25/1dc92594fa7924a3ed830f1a524eec79.jpg" alt="Caesar Zeppeli" className="w-100 h-100 object-cover rounded-xl mb-2" />
            <br/>
        </ul>
        <br/>
         <p>Hamon é uma habilidade que requer treinamento e disciplina, e é frequentemente usada para combater criaturas sobrenaturais na série.</p>
          <br/>
         <p>Embora Hamon seja menos proeminente nas partes posteriores da série, ele continua a ser uma habilidade respeitada e poderosa dentro do universo de JoJo's Bizarre Adventure.</p>
    </div>
    

    
        </>
    );
}