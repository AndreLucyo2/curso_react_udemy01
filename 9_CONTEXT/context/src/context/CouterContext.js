// 1 - criar o context
import { createContext, useState } from 'react';

//Exporta o contexto para poder usar em outros lugares
export const CounterContext = createContext();

// 2 - Criar o provider : mantem o chilfren, para renderizar componentes filhos
export const CounterContextProvider = ({ children }) => {
    //contexto comportilhado, valor e como alterar
    const [counter, setCounter] = useState(5);

    return (
        //no value, envia os valores de consumo e tambem o de alteração
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );

}