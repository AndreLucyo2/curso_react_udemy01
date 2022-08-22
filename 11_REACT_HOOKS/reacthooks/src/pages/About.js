//importa o contexto:
import { useContext } from 'react'
import { SomeContext } from '../components/HookUseContext'

const About = () => {

  //Recebe o contexto: 
  const { contextValue } = useContext(SomeContext);

  return (
    <div>
      <hr />
      <h2>About</h2>
      <h2>useContext</h2>
      <p>Valor do contexto: <strong>{contextValue}</strong></p>
      <hr />
    </div>
  )
}

export default About