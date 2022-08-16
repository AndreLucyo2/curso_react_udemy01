import React, { useEffect, useRef, useState } from "react";

const HookUseRef = () => {

  // 1 - useRef básico
  const numberRef = useRef(0);
  const [counter, setCounter] = useState(0);
  const [counterB, setCounterB] = useState(0);

  //com o useRef ele nao renderiza o compoente.
  useEffect(() => {
    numberRef.current = numberRef.current + 1;
    //dispara um loop infinito
    //setCounter(counter +1);
  });


  return (
    <div>
      <h2>useRef</h2>
      {/* 1 - useRef */}
      <p>O componente renderizou: {numberRef.current} vezes.</p>
      <p>Counter 1: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Contador A</button>
      <p>Counter 2: {counterB}</p>
      <button onClick={() => setCounterB(counterB + 1)}>Contador B</button>
      <hr />
    </div>
  )
}

export default HookUseRef