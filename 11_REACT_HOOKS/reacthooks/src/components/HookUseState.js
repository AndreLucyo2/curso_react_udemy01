
import { useState } from 'react'

const HookUseState = () => {
    //1 - useState
    let userName = "João";
    const [name, setName] = useState("Lucas");

    const changeName = () => {
        userName = 'Pedro';

        setName("André Lucio");

        console.log(`useState:${name}`);
        console.log(`variavel:${userName}`);
    };

    console.log(`useState:${name}`);
    console.log(`variavel:${userName}`);

    return (
        <div>
            {/* 1 - useState */}
            <h2>useState</h2>
            <p>Variável: {userName}</p>
            <p>useState:{name}</p>
            <button onClick={changeName}>Mudar Names!</button>

            <hr />
        </div>
    )
}

export default HookUseState