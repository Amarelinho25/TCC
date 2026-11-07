import { Divide } from "lucide-react";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import Cabecalho from "../components/compoCabecalho";
import Rodape from "../components/compoRodape";
import LinhaDoTempo from "../components/compoLinhaDoTempo";

const partes = [
  {
    id: 1,
    titulo: "Phantom Blood",
    protagonista: "Jonathan Joestar",
    resumo: "Jonathan Joestar é um jovem nobre que tem sua vida transformada após a chegada de Dio Brando, seu irmão adotivo. Ambicioso e cruel, Dio deseja tomar para si tudo o que Jonathan possui. Quando uma antiga Máscara de Pedra desperta poderes misteriosos, começa uma batalha entre os dois que mudará o destino da família Joestar.",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjB09GvxiqLQQBw8UQit3y54BGfGnCLS1oZ8tVzwsJVg&s=10"
  },
  {
    id: 2,
    titulo: "Battle Tendency",
    protagonista: "Joseph Joestar",
    resumo: "oseph Joestar, neto de Jonathan, descobre a existência dos Homens do Pilar, seres antigos e extremamente poderosos ligados à origem da Máscara de Pedra. Com a ajuda de aliados, ele precisa dominar o Hamon e enfrentar ameaças capazes de colocar toda a humanidade em perigo. Diferente de seu avô, Joseph depende tanto de sua inteligência e criatividade quanto de sua força.",
    imagem: "https://i.pinimg.com/736x/8f/c4/09/8fc409a9eb2feb942ae5a8c7998daead.jpg"
  },
  {
    id: 3,
    titulo: "Stardust Crusaders",
    protagonista: "Jotaro Kujo",
    resumo: "Jotaro Kujo descobre que possui um Stand, uma manifestação sobrenatural de poder, após o retorno de uma antiga ameaça ligada à família Joestar. Para salvar sua mãe, ele parte em uma jornada pelo mundo com seu avô Joseph e outros aliados. O grupo precisa chegar ao Egito e derrotar Dio antes que seja tarde demais.",
    imagem: "https://i.pinimg.com/736x/38/a5/4d/38a54d8b6470b5a13c3eb2fac8e1420e.jpg"
  },
  {
    id: 4,
    titulo: "Diamond is Unbreakable",
    protagonista: "Josuke Higashikata",
    resumo: "Em Morioh, uma cidade aparentemente tranquila do Japão, Josuke Higashikata vive uma rotina que muda quando estranhos acontecimentos começam a revelar o lado sombrio do lugar. Ao lado de seus amigos, ele investiga usuários de Stand e crimes misteriosos. A busca pela verdade acaba levando o grupo até um assassino em série que esconde uma vida aparentemente comum.",
    imagem: "https://i.pinimg.com/1200x/fc/02/df/fc02df7a0094b8b8f16009d4bbfdcf56.jpg"
  },
  {
    id: 5,
    titulo: "Golden Wind",
    protagonista: "Giorno Giovanna",
    resumo: "Giorno Giovanna, um jovem que sonha em se tornar um grande chefe da máfia, entra para a organização Passione com o objetivo de transformá-la por dentro. Ao lado de um grupo de companheiros usuários de Stand, ele enfrenta inimigos perigosos e traições enquanto tenta alcançar seu ideal de justiça. Sua jornada coloca à prova a lealdade, a coragem e a determinação de todos",
    imagem: "https://i.pinimg.com/736x/90/dc/c4/90dcc410a981035545a1b43d46b1e67e.jpg"
  },
  {
    id: 6,
    titulo: "Stone Ocean",
    protagonista: "Jolyne Cujo",
    resumo: "Jolyne Cujoh, filha de Jotaro Kujo, é condenada injustamente e enviada para uma prisão na Flórida. Lá, ela desperta seu Stand e descobre que sua prisão faz parte de um plano muito maior. Com a ajuda de outros detentos, Jolyne precisa enfrentar inimigos poderosos e proteger sua família de uma ameaça ligada ao passado dos Joestar.",
    imagem: "https://i.pinimg.com/1200x/8f/02/7a/8f027afc81a468e9f37a0b904003ce9b.jpg"
  },
  {
    id: 7,
    titulo: "Steel Ball Run",
    protagonista: "Johnny Joestar",
    resumo: "Em uma realidade alternativa, Johnny Joestar, um ex-jóquei que perdeu a capacidade de andar, participa de uma corrida de cavalos que atravessa os Estados Unidos. Durante a competição, ele conhece Gyro Zeppeli, que utiliza uma técnica misteriosa chamada Rotação. O que começa como uma disputa por um prêmio se transforma em uma jornada repleta de perigos, segredos e descobertas pessoais",
    imagem: "https://i.pinimg.com/736x/8a/39/51/8a39512199289ae4a6fbc86cf366f082.jpg"
  },
  {
    id: 8,
    titulo: "JoJolion",
    protagonista: "Josuke Higashikata (Gappy)",
    resumo: "Na cidade de Morioh de uma realidade alternativa, um jovem sem memória é encontrado próximo a uma misteriosa formação geológica. Chamado de Josuke Higashikata, ele tenta descobrir sua verdadeira identidade enquanto é acolhido por uma família local. Sua investigação revela segredos ligados a fenômenos inexplicáveis, doenças misteriosas e ao passado da cidadee.",
    imagem: "https://i.pinimg.com/1200x/d5/7f/94/d57f9443fa5ef6800f3e5f9ad88d33c3.jpg"
  },
  {
    id: 9,
    titulo: "The JOJOLands",
    protagonista: "Jodio Joestar",
    resumo: "Jodio Joestar é um adolescente que vive no Havaí e deseja enriquecer em um mundo marcado por desigualdades e interesses pessoais. Ao lado de seu irmão Dragona e de outros aliados, ele se envolve em um plano para roubar um diamante valioso. A missão dá início a uma aventura criminosa em que os protagonistas precisam lidar com poderes estranhos, rivais e as consequências de suas próprias ambições.",
    imagem: "https://i.pinimg.com/1200x/74/9d/53/749d5342843dd51394c798142b8a0dd0.jpg"
  }
];

export default function PagHistoria() {
  return (
    <>
        <Cabecalho titulo="História" />
      <div>
        <h1 className="font-bold flex-items text-center text-lg">História de JoJo's Bizarre Adventure</h1>
        <br />
        <p className="mb-4  text-center">Esta página contará a história da família Joestar.</p>
      </div>

      <div>
        <h1 className="mb-4 font-bold text-center text-lg">Quem é o criador de JoJo?</h1>
        <br />
        <p className="mb-4">Hirohiko Araki é um influente mangaká japonês, aclamado como o criador da icônica série JoJo's Bizarre Adventure, iniciada em 1987. A obra acompanha as aventuras intergeracionais da família Joestar contra ameaças sobrenaturais e revolucionou a narrativa do gênero shonen com a invenção dos Stands — personificações físicas do espírito e poder de luta de cada personagem.</p>
        <br />
        <p className="mb-4">Sua estética marcante destaca-se pelo uso de poses dramáticas e anatômicas inspiradas na arte clássica, figurinos arrojados com forte influência da alta-costura e constantes homenagens à música ocidental, nomeando heróis, vilões e habilidades com referências a artistas e bandas de rock e pop.</p>
        <br />
        <p className="mb-4">O prestígio de Araki extrapolou os quadrinhos, resultando em parcerias oficiais com a grife Gucci e exposições de suas obras no Museu do Louvre, em Paris. Na cultura pop, ele também é carinhosamente conhecido pelo meme de que seria um "vampiro imortal", devido à sua aparência jovem que parece praticamente inalterada com o passar dos anos.</p>
      </div>

      <div>
        <h1 className="mb-4 font-bold text-center text-lg">Introdução a JoJo's Bizarre Adventure</h1>
        <br />
        <p>JoJo's Bizarre Adventure é uma famosa obra japonesa criada por Hirohiko Araki, que mistura ação, aventura, comédia, mistério e elementos sobrenaturais. A história acompanha a família Joestar ao longo de várias gerações, apresentando diferentes protagonistas, cada um com sua própria personalidade, habilidades e desafios.</p>
        <br />
        <p>Ao longo da obra, conhecemos diversos personagens, poderes e acontecimentos marcantes. Desde o Hamon até os misteriosos Stands, JoJo apresenta um universo cheio de criatividade, batalhas estratégicas e momentos inesperados.</p>
        <br />
        <p>Esta wiki foi criada para reunir informações sobre o universo de JoJo's Bizarre Adventure, incluindo seus personagens, Stands, habilidades, histórias e curiosidades. Nosso objetivo é explorar e apresentar os detalhes dessa obra tão única e fascinante.</p>
      </div>

      <br></br>

      <div>
        <h1 className="mb-4 font-bold text-center text-lg">Arvore Genealógica</h1>
      
        <img src="https://i.pinimg.com/736x/4a/ad/b1/4aadb15fed441f2f714f71c20daaad8d.jpg" alt="Arvore Genealógica" className="mx-auto mb-4 rounded-lg shadow-lg" />
      </div>

      <div className="m-4 p-4 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-2">As 9 partes da história</h2>
        <p className="mb-6">
          Clique em uma parte para ver o resumo, os personagens principais e os Stands.
        </p>
        <LinhaDoTempo partes={partes} />
      </div>


    </>
  );
}