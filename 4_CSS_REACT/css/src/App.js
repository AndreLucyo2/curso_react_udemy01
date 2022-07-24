import './App.css';
import { useState } from 'react'
import MyComponent from './components/MyComponent';
import Title from './components/Title';
import Car from "./components/Car";

function App() {

  /* CSS dinamico */
  const n = 15;
  const [name] = useState("Andre")

  const redTitle = true;

  //----------------------------------------
  const myCars = [
    { name: "Fusca", km: 10000, color: "Branca" },
    { name: "Polo", km: 32000, color: "Cinza" },
    { name: "Onix", km: 0, color: "Preto" },
  ];
  //----------------------------------------

  return (
    <div className="App">

      {/* CSS Global */}
      <h1>React com CSS</h1>

      {/* CSS de componente */}
      <MyComponent />
      <p>Este é um paragrafo do App.js casa CSS</p>
      {/* Inline CSS */}
      <p style={{ color: "blue", padding: "25px", borderTop: "2px solid red" }}>
        Este elemento foi estilizado de forma inline
      </p>
      <p
        style={{
          color: "blueviolet",
          padding: "25px",
          borderTop: "5px solid green"
        }}
      >
        Este elemento foi estilizado de forma inline
      </p>

      {/* CSS Inline Dinamico */}
      <h2 style={n < 10 ? { color: "red" } : { color: "green" }} >CSS Dinamico</h2>
      <h2 style={n >= 15 ? { color: "red" } : { color: "green" }} >CSS Dinamico</h2>
      <h2
        style={name !== "Pedro"
          ? { color: "red", background: "#459" }
          : null} >
        CSS Dinamico , O Nome é {name}
      </h2>
      <h2
        style={!name === "Andre"
          ? { color: "red", background: "#459" }
          : { color: "blue", color: "green" }}>
        CSS Dinamico , O Nome é {name}
      </h2>

      {/* CSS Inline Dinamico nas classes*/}
      <h2
        className={redTitle
          ? "red-title"
          : "title"} >
        Este titulo tem classe CSS dinamica
      </h2>
      {/* CSS modules */}
      <Title />
      <h2 className='my_title'>Teste com classe com mesmo nome, nao gera conflito</h2>

      {/* ------------------------------------ */}
      <div>
        <h1>Showroom de carros</h1>
        <div className="car-container">
          {myCars.map((car) => (
            <Car car={car} />
          ))}
        </div>
      </div>
      {/* ------------------------------------ */}
    </div>
  );
}

export default App;
