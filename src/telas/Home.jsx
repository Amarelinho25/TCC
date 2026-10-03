import react from "react";

const Quadros = [
{
  id: '1',
  titulo: "Poderes",
  capa: "https://i.pinimg.com/736x/cc/df/7b/ccdf7bc6025465180f1bca9a06298844.jpg",
  
},
{
  id: '2',
  titulo: "História",
  capa: "https://i.pinimg.com/736x/cb/36/7f/cb367f343734a698d5790e8067044970.jpg",
  
},
{
  id: '3',
  titulo: "Personagens",
  capa: "https://i.pinimg.com/736x/94/bd/45/94bd456950c9ad4764e84394c73e2fa5.jpg",
 
},
{
  id: '4',
  titulo: "Anime",
  capa: "https://i.pinimg.com/1200x/c0/e5/a8/c0e5a8a6892b8488abe5199649a7e84b.jpg",
  
}
]

export default function Home() {
  return (
    <>
   
    <div className="bg-purple-500 to-pink-500 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Wiki jojo</h1>
    </div>

    <div className="rounded-lg overflow-hidden shadow-lg m-4 left:auto itens-center h-100">
        <img src="https://i.pinimg.com/1200x/26/fa/ce/26face59ac64ad6327e24f98e9209625.jpg" alt="" />   
    </div>

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
            <div key={quadro.id} className="bg-purple-300 p-4 rounded-lg shadow-md mb-4 items-center rounded-xl overflow-hidden shadow-lg m-4 left:auto itens-center h-auto w-auto">
                <h1 className="text-lg font-bold text-center">{quadro.titulo}</h1>
                <img src={quadro.capa} alt={quadro.titulo} className=" object-cover gap-4 rounded-xl m-0,5" />
            </div>
        ))}
    </div>
   </>
  );
}
