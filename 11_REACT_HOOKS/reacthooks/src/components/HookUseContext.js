import { createContext } from "react";

//exporta a criação do contexto
export const SomeContext = createContext();

//cria o provider
export const HookUseContext = ({ children }) => {

    const contextValue = "Este texto vem do context compartilhado";

    //Como a chidren vai agir no contexto
    return (
        //cria o provider e passa o value que será compartilhado pelo contexto
        <SomeContext.Provider value={{ contextValue }}>
            {/*onde os compoentes serão renderizados e terão acesso ao contexto*/}
            {children}
        </SomeContext.Provider>
    );
};