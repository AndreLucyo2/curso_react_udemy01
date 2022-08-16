// 1 - criar o context : react
import { createContext, useState } from 'react';

//Exporta o contexto para poder usar em outros lugares
export const CounterContext = createContext();

// 2 - Criar o provider : mantem o chilfren, para renderizar componentes filhos
export const CounterContextProvider = ({ children }) => {

    //Variavel -->  Informação de contexto comportilhado: valor e como alterar
    const [counter, setCounter] = useState(0);

    return (
        //Provider envia o valore de consumo e tambem o metodo alteração
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );

}