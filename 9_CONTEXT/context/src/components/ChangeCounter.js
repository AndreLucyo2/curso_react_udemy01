// 3 - alterando valor do contador
import { useContext } from "react";

import { CounterContext } from "../context/CouterContext";

const ChangeCounter = () => {
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