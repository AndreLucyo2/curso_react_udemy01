import { useLayoutEffect, useEffect, useState } from "react";

const HookUseEffectLayout = () => {
  const [name, setName] = useState("Algum nome");

  //não importa a ordem pois o useLayoutEffect executa primneriro.
  useEffect(() => {
    console.log("2");
    setName("Mudou de novo!");
  }, []);

  //sempre executa antes de qualquer coisa 
  useLayoutEffect(() => {
    console.log("1");
    setName("Outro nome");
  }, []);

  console.log(name);

  return (
    <div>
      <h2>useEffectLayout</h2>
      <p>Nome: {name}</p>
      <hr />
    </div>
  );
};

export default HookUseEffectLayout;
