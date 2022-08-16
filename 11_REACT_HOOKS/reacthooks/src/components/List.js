import { useState, useEffect } from "react";

//Recebe os dados la da tela, ou do banco....
const List = ({ getItems }) => {
    //cria um useState
    const [myItems, setMyItems] = useState([]);

    //quando a propriedade for alterada ele executa o useEffect
    useEffect(() => {
        console.log("Buscando itens no DB...");
        setMyItems(getItems());
    }, [getItems]);

    return (
        <div>
            {myItems && myItems.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </div>
    );
};

export default List;