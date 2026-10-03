import home from "../home.jsx";

const Stands = [
{
  id: '1',
  titulo: "Star Platinum",
  capa: "https://static.wikia.nocookie.net/jjba/images/3/3e/Star_Platinum.png",
  poderes: "Super força, velocidade e precisão, além de habilidades de parar o tempo em algumas versões.",

},
{
  id: '2',
  titulo: "The World",
  capa: "https://static.wikia.nocookie.net/jjba/images/5/5e/The_World.png",
  poderes: "Habilidade de parar o tempo por alguns segundos, além de força e velocidade sobre-humanas.",

} ]

export default function PagStands() {
    return (
        <>
    <div className="bg-purple-900 text-white p-4">
        <div className="flex justify-between items-center">
             <h1 className="text-2xl font-bold">Stands</h1>
        </div>
    </div>

    <div className='rounded-lg overflow-hidden shadow-lg m-4 left:auto itens-center'>
        <h1>Stands</h1>
    </div>

    <div className="mb-1">
        <h1 className="text-2xl font-bold text-center">Stands</h1>
    </div>
    <div className="mb-4">
         <p className="text-center">Stands são manifestações físicas de energia espiritual que concedem habilidades especiais aos seus usuários. Cada Stand é único e possui poderes distintos, variando desde habilidades de combate até manipulação de tempo e espaço.</p>
        <br/>
         <p className="text-center">A relação entre o usuário e seu Stand é profunda, muitas vezes refletindo a personalidade e os desejos do indivíduo. Stands desempenham um papel central na série JoJo's Bizarre Adventure, sendo essenciais para as batalhas e desafios enfrentados pelos personagens.</p>
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
                    <img src={stand.capa} alt={stand.titulo} className="w-full h-48 object-cover" />
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
            <li>Jonathan Joestar</li>
            <li>Joseph Joestar</li>
            <li>Lisa Lisa</li>
            <li>Caesar Zeppeli</li>
         </ul>
    </div>
        </>
    );
}