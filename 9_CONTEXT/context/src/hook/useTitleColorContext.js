//react
import { useContext } from "react";

//importa o contexto
import { TitleColorContext } from "../components/TitleColorContext";

//Hook para alterar o context
export const useTitleColorContext = () => {

    //inicialização do contexto fica aqui no hook
    const context = useContext(TitleColorContext);

    //mensagem para deve debugar em caso de erro
    //valida se é um contexto de fato!
    if (!context) {
        console.log("Contexto não encontrado!");
        return;
    }

    //Se tiver ok, retorna o contexto
    return context;
}
