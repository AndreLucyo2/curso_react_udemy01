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
  const { color } = useTitleColorContext();

  return (
    <div>
      <h1 style={{color:color}} >Home</h1>
      <p>Valor do contador: {counter}</p>
      <ChangeCounter />
    </div>
  );
}

export default Home