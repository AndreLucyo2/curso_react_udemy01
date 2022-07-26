import './Game.css'

function Game({ verifyLetter }) {
  return (

    <div className="game">
      <p className="points">
        <span>Pontuação: 000</span>
      </p>
      <h1>Adicinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra : <span>Dica ...</span>
      </h3>
      {/* letras sendo exibidas*/}
      <div className="wordContainer">
        <span className="letter">A</span>
        <span className="blankSquare"></span>
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
        <span>a,</span>
        <span>b,</span>
      </div>

    </div>
  )
}

export default Game