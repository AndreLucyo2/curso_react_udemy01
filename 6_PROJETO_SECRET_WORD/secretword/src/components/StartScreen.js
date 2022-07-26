import "./StartScreen.css";

const GameStart = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar</p>
      {/* Quando usuario clicar, manda o pai executar e iniciar o jogo*/}
      <button onClick={startGame}>Começar jogo</button>
    </div>
  );
};

export default GameStart;