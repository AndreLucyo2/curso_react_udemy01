import { useState } from 'react'

const ListRender = () => {

    const [minhaLista] = useState(["Pedro", "Maria", "Thiago", "Lucas"])

    const [lsUsers] = useState([
        { id: 1, name: "Andre", age: 31 },
        { id: 15654, name: "Lucas", age: 48 },
        { id: 48, name: "Maria", age: 27 },
        { id: 7785, name: "Pedro", age: 8 },
        { id: 234255, name: "Andreia", age: 39 },
        { id: 8, name: "Dentinho", age: 92 },
    ]);

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
        </div>
    )
}

export default ListRender