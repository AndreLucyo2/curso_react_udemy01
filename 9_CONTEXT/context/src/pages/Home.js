
import { useContext } from 'react'
import ChangeCounter from '../components/ChangeCounter';
import { CounterContext } from '../context/CouterContext'

const Home = () => {

  //recebe o valor de contexto:
  const { counter } = useContext(CounterContext);

  return (
    <div>
      <h1>Home</h1>
      <p>Valor do contador: {counter}</p>
      <ChangeCounter/>
    </div>
  );
}

export default Home