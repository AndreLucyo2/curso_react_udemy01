//refatorando para ficar mais simples:
// import { useContext } from 'react'
// import { CounterContext } from '../context/CouterContext'

//components:
import ChangeCounter from '../components/ChangeCounter';

// 4 - refatorando para usar um hook
import { useCounterContext } from '../hook/useCounterContext';

const Home = () => {

  //recebe o valor de contexto:
  //const { counter } = useContext(CounterContext);
  
  
  const { counter } = useCounterContext();

  return (
    <div>
      <h1>Home</h1>
      <p>Valor do contador: {counter}</p>
      <ChangeCounter/>
    </div>
  );
}

export default Home