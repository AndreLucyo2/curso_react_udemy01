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

  //Palavra e categoria sorteada
  const [pickedWord, setPickedWord] = useState("");
  //Categoria escolhida
  const [pickedCategory, setPickedCategory] = useState("");
  //Letras:
  const [letters, setLetters] = useState([]);

  //letras adivinhadas
  const [guessedLetters, setGuessedLetters] = useState([]);
  //Letras erradas:
  const [wrongLetters, setWrongLetters] = useState([]);
  //tentativas do usuario
  const [guesses, setGuesses] = useState(3);
  //pontuação obtida:
  const [score, setScore] = useState(0);

  //Pega uma categoria e uma palavra aleatória
  const pickWordAndCategory = () => {
    // Seleciona a categoria aleatória: pick a random category
    //obtem a lista de categorias
    const categories = Object.keys(words);
    //obtem uma da lista de categorias:
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // obtem a palavra correspondente a categoria: pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];


    //Debig no console:
    console.log(category, word);

    //Retorna o que foi definido para iniciar o jogo
    return { category, word };
  };

  //iniciando o jogo:
  const startGame = () => {
    //Faz o resgate do jogo: estrutura o jogo
    const { category, word } = pickWordAndCategory();
    //Debug
    console.log(category, word);

    //pega a palavra e transforma em letras:
    let wordLetters = word.split("");
    //Normalizar , usa tudo com minusculo
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    //Debug
    console.log(wordLetters);

    //Alterando os estados do jogo:
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    //Inicia o jogo
    setGameStage(stages[1].name);
  }

  //Função para processar a letra que o usuario input
  const verifyLetter = (letter) => {

    //Normalizar a letra tudo para minuscula
    const normalizedLetter = letter.toLowerCase();
    //valida se ja foi informado a letra
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //incluir as letras acertadas ou erradas
    if (letters.includes(normalizedLetter)) {
      //letras certas:complementa a lista de letras corretas
      //Adição de elementos no array e mantendo os que existem
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter,
      ]);
    } else {
      //Letras erradas
      //Adição de elementos no array e mantendo os que existem
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }

  }

  //Reiniciar o jogo: retorna para o primeiro estagio
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" &&
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
