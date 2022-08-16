
import { useState } from 'react';
import './App.css';

import City from "./assets/city.jpg"
import CarDetails from './components/CarDetails';
import ChangeMsgState from './components/ChangeMsgState';
import ConditionalRender from './components/ConditionalRender';
import Container from './components/Container';
import ExecuteFunction from './components/ExecuteFunction';
import FragmentA from './components/FragmentA';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import Mensagen from './components/Mensagen';
import ShowUserName from './components/ShowUserName';

function App() {

  const name = "João";
  const [userName] = useState("Pedro");

  //recebendo a lista do backend - api... 
  const cars = [
    { id: 1, brand: "Ferrari", color: "Amarelo", km: 0 },
    { id: 2, brand: "KIA", color: "Branco", km: 200000 },
    { id: 3, brand: "Renault", color: "Azul", km: 32000 },
  ];

  //Passando função por props:deve ser executado no filho
  function showMsg() {
    console.log("Evento do componente PAI!")
  }

  //Passando função por props:um consome a função e outro altera o valor
  const [mensagem, setMensagem] = useState("");
  //Altera a mensagem
  const handleMessage = (msg) => {
    setMensagem(msg)
  }

  return (
    <div className="App">
      <h1>Avançando no react</h1>
      {/* Imagen na pasta public */}
      <div>
        <img src="/img1.jpg" alt="Pausagem public" />
      </div>
      {/* Imagen na pasta src/... */}
      <div>
        <img src={City} alt="Cidade SRC" />
      </div>
      {/* Stado da variavel*/}
      <ManageData />
      {/* Renderizar listas */}
      <ListRender />
      <ConditionalRender />

      {/* Passando props com valores diretos */}
      <ShowUserName name="Andre" />
      {/* Passando props com valores por variaveis */}
      <ShowUserName name={name} />
      {/* Passando props com valores por states */}
      <ShowUserName name={userName} />

      {/* desistruturando as props */}
      <CarDetails brand="VW" color="Azul" km={10000} newCar={true} />

      {/* Reaproveitando elemento*/}
      <CarDetails brand="Ford" color="Vermelho" km={5800} newCar={false} />
      <CarDetails brand="Fiat" color="Verde" km={0} newCar={true} />

      {/* Render com loop no array de obj */}
      {cars.map((car, i) => (
        <CarDetails
          key={car.id}
          id={i + 1}
          brand={car.brand}
          color={car.color}
          km={car.km}
        />
      ))}

      {/* fragments */}
      <FragmentA />
      <FragmentA fragmentProp={"Quarto titulo"} />

      {/* Utilizando children */}
      <Container>
        <h2>Este conteudo children!</h2>
      </Container>

      {/* Função como props */}
      <ExecuteFunction minhaFuncao={showMsg()} />

      {/* State lift */}
      <Mensagen msg={mensagem}/>
      <ChangeMsgState alterarMsg={setMensagem}/>

    </div>
  );
}

export default App;
