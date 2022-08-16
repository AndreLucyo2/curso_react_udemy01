import { useContext } from 'react'
import { CounterContext } from '../context/CouterContext'

//importa o hook para poder consumir o contexto
import { useTitleColorContext } from "../hook/useTitleColorContext"


const About = () => {
  //recebe o valor de contexto:
  const { counter } = useContext(CounterContext);

  // 5 - contexto mais complexo: Extrai os dados vindo do contexto
  const { color } = useTitleColorContext();

  return (
    <div>
      <h1 style={{ color: color }}>About</h1>
      <p>Valor do contador: {counter}</p>
    </div>
  );
}

export default About