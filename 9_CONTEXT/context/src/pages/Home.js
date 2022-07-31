//refatorando para ficar mais simples:
// import { useContext } from 'react'
// import { CounterContext } from '../context/CouterContext'

//components:
import ChangeCounter from '../components/ChangeCounter';

// 4 - refatorando para usar um hook
import { useCounterContext } from '../hook/useCounterContext';

// Contextos mais complexos:
import { useTitleColorContext } from "../hook/useTitleColorContext";

const Home = () => {

  // 2 - recebe o valor de contexto:
  //const { counter } = useContext(CounterContext); 
  const { counter } = useCounterContext();

  // 5 - contexto mais complexo: Extrai os dados vindo do contexto
  const { color, dispatch } = useTitleColorContext();

  // 6 - alterando contexto complexo
  const setTitleColor = (color) => {
    //altera o stado comforme o que receber:
    dispatch({ type: color });
  };

  return (
    <div>
      <h1 style={{ color: color }} >Home</h1>
      <p style={{margin:"10px"}}>Valor do contador: {counter}</p>
      <ChangeCounter />
      <div>
        <button onClick={() => setTitleColor("RED")}>Vermelho</button>
        <button onClick={() => setTitleColor("BLUE")}>Azul</button>
      </div>
    </div>
  );
}

export default Home