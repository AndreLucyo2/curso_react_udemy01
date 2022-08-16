// 3 - alterando valor do contador
import { useContext } from "react";

//importa o contexto
import { CounterContext } from "../context/CouterContext";

const ChangeCounter = () => {
  //Recebe do Provider o valore de consumo e tambem o metodo alteração
  const { counter, setCounter } = useContext(CounterContext);

  return (
    <div>
      {/* Executa a ação a cada click no componente */}
      <button onClick={() => setCounter(counter + 1)}>
        Add value to counter
      </button>
    </div>
  );
};

export default ChangeCounter;