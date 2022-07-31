// contexto mais complexo
import { createContext, useReducer } from "react";

//Exporta a criação de contexto
export const TitleColorContext = createContext();

export const titleColorReducer = (state, action) => {
    // switch (action.type) {
    //   case "RED":
    //     return { ...state, color: "red" };
    //   case "BLUE":
    //     return { ...state, color: "blue" };
    //   default:
    //     return state;
    // }
};

//Exposta o provider
export const TitleColorContextProvider = ({ children }) => {
    //o que o contexto esta intregando : ja com valores default, inicia com cor definida
    //titleColorReducer -> quem altera o estado
    //dispatch -> com estado inicial definido
    const [state, dispatch] = useReducer(titleColorReducer, {color: "purple",});

    console.log("Title Color Context:", state);

    return (
        //value : passa o valor , o state é o valor que sera consumido
        <TitleColorContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TitleColorContext.Provider>
    );
};