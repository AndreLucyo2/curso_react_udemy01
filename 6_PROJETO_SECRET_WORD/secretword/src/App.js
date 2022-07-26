//Hooks react
import { useState } from "react";

// components
import StartScreen from "./components/StartScreen";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// Stagios do jogo: Inicio , jogo e game over
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {

  //Defininco o stagio inicial:
  const [gameStage, setGameStage] = useState(stages[0].name);

  //carregando as palavras:
  const [words] = useState(wordsList);

  //iniciando o jogo:
  const startGame = () => {
    setGameStage(stages[1].name)

  }

  //Função para processar a letra que o usuario input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  }

  //Reiniciar o jogo: retorna para o primeiro estagio
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
      {gameStage === "end" && <GameOver  retry={retry}/>}
    </div>
  );
}

export default App;
