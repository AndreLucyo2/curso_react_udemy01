import './Game.css'

//recebe todos os estados que prcisa consumir:
const Game = ({
  verifyLetter,
  pickedCategory,
  pickedWord,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {




  return (

    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adicinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra : <span>{pickedCategory}</span>
      </h3>
      <p>Voce ainda tem {guesses} tentativas(S).</p>

      {/* letras sendo exibidas*/}
      <div className="wordContainer">
        {/* Logica das letras: */}
        {letters.map((letter, i) =>
          guessedLetters.includes(letter) ? (
            //Se a letra ja tiver sido adivinhada...
            //Mostra a letra adibivinhada:
            <span className="letter" key={i}>
              {letter}
            </span>
          ) : (
            //se nao, deixa o quadro brancoS
            <span key={i} className="blankSquare"></span>
          )
        )};
      </div>

      {/* onde vai adivinhar a letra*/}
      <div className="letterContainer">
        <p>Tente adivinhar a letra da palavra:</p>
        <form>
          <input type="text" name='letter' maxLength="1" required />
          <button>Jogar!</button>
        </form>
      </div>

      {/* mostra as letras ja utilizadas */}
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas</p>

        {wrongLetters.map((letter, i) => (
          //mostra as letras ja utilizadas: 
          <span key={i}>{letter}, </span>
        ))};

      </div>

    </div>
  )
}

export default Game