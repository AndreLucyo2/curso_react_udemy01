//react
import { useContext } from "react";

//importa o contexto
import { CounterContext } from "../context/CouterContext";

//Hook para alterar o context
export const useCounterContext = () => {

    //inicialização do contexto fica aqui no hook
    const context = useContext(CounterContext);

    //mensagem para deve debugar em caso de erro
    //valida se é um contexto de fato!
    if (!context) {
        console.log("Contexto não encontrado!");
        return;
    }

    //Se tiver ok, retorna o contexto
    return context;
}