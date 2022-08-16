import { useCallback, useState } from "react";
import List from "./List";

const HookUseCallback = () => {

    const [counter, setCounter] = useState(0);

    //imita um retorno de uma API pu de um banco de dados
    //separa a atualização do componente
    const getItemsFromDatabase = useCallback(() => {
        //mante uma função ma memoria, só reexecuta ela quando quiser pelo array de dependencias
        return ["a", "b", "c"];
    }, []);


    return (
        <div>
            <h2>HookUseCallback</h2>
            <List getItems={getItemsFromDatabase} />
            <button onClick={() => setCounter(counter + 1)}>Alterar!</button>
            <p>{counter}</p>
            <hr />
        </div>
    )
}

export default HookUseCallback