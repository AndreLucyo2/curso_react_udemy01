import { useEffect, useRef, useDebugValue } from "react";

//hook de exemplo
export const usePrevious = (value) => {

  const ref = useRef;

  //useDebugValue
  useDebugValue("-- CUSTOM HOOK COM USEDEBUGVALUE --");
  useDebugValue("O número anterior é:" + value);

  //rota sempre que o componente for solicitado
  //guarda o estado antido de um valor, pode mapear como estava antes de alterar
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
