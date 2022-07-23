import { useState } from 'react'

const ListRender = () => {

    const [minhaLista] = useState(["Pedro", "Maria", "Thiago", "Lucas"])

    const [lsUsers, setUsers] = useState([
        { id: 1, name: "Andre", age: 31 },
        { id: 2, name: "Lucas", age: 48 },
        { id: 3, name: "Maria", age: 27 },
        { id: 4, name: "Pedro", age: 8 },
        { id: 5, name: "Andreia", age: 39 },
        { id: 6, name: "Dentinho", age: 92 },
    ]);

    //tem acesso ao estado antigo
    const deleteRandom = () => {
        //gera um numero aleatorio e arredonda para baixo
        const randomNumber = Math.floor(Math.random() * 7);

        setUsers((prevUsers) => {
            //Lista no estado atual antes de remover
            console.log(prevUsers);

            //Recarrega lista filtrando o que tenha id diferente id gerado
            return prevUsers.filter((user) => randomNumber !== user.id);
        });

    };

    return (
        <div>
            <h3>Minha lista key pelo map ERRADO!</h3>
            <ul>
                {minhaLista.map((item, idx) => (
                    <li key={idx} >{item}</li>
                ))}
            </ul>
            <h3>Minha lista key maneira correta usar uma chave unica, id por exemplo:</h3>
            <ul>
                {lsUsers.map((user) => (
                    <li key={user.id} >{user.name} - {user.age}</li>
                ))}
            </ul>
            <h3>Usando o previu astate para manipular a lista:</h3>
            <button onClick={deleteRandom}>Deletar user aleatorio</button>
        </div>
    )
}

export default ListRender