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

  //  2 - useRef e dom
  //ele recebe o input como referencia, permitindo ter acesso a todas as propriedade do input e manipulalos
  const inputRef = useRef();
  //cria um referencia do input
  const [text, setText] = useState("");
  //cria o evento de submit, 
  const handleSubmit = (e) => {
    e.preventDefault();

    //Limpa o conteudo 
    setText("");

    //após a ação ele retorna o foco no input através do ref
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>useRef</h2>
      {/* 1 - useRef */}
      <p>O componente renderizou: {numberRef.current} vezes.</p>
      <p>Counter 1: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Contador A</button>
      <p>Counter 2: {counterB}</p>
      <button onClick={() => setCounterB(counterB + 1)}>Contador B</button>

      {/* 2 - useRef e DOM */}
      <h3>useRef e DOM</h3>
      <form onSubmit={handleSubmit}>
        {/* linka o input com a referencia criada */}
        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Enviar" />
      </form>

      <hr />
    </div>
  )
}

export default HookUseRef