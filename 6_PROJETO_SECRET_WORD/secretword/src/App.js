//Hooks react
import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

// Stagios do jogo: Inicio , jogo e game over
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {

  //Defininco o stagio inicial:
  const [gameStage, setGameStage] = useState(stages[0].name);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen />}
      {gameStage === "game" && <StartScreen />}
      {gameStage === "end" && <StartScreen />}
    </div>
  );
}

export default App;
