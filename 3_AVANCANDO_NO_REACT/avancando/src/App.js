
import { useState } from 'react';
import './App.css';

import City from "./assets/city.jpg"
import CarDetails from './components/CarDetails';
import ConditionalRender from './components/ConditionalRender';
import ListRender from './components/ListRender';
import ManageData from './components/ManageData';
import ShowUserName from './components/ShowUserName';

function App() {

  const name = "João";
  const [userName] = useState("Pedro");

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
      <ConditionalRender/>

      {/* Passando props com valores diretos */}
      <ShowUserName name="Andre"/>
      {/* Passando props com valores por variaveis */}
      <ShowUserName name={name}/>
      {/* Passando props com valores por states */}
      <ShowUserName name={userName}/>
      {/* desistruturando as props */}
      <CarDetails brand="Ford" color="Azul" km={10000} />
    </div>
  );
}

export default App;
