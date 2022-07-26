import './Game.css'

function Game({verifyLetter}) {
  return (
    <div>
      <h1>Jogo</h1>
      <button onClick={verifyLetter}>Finalizar Game</button>
    </div>
  )
}

export default Game