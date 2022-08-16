
import { useState } from 'react'

const HookUseState = () => {
    //1 - useState  ---------------------------------------
    let userName = "João";
    const [name, setName] = useState("Lucas");

    const changeName = () => {
        userName = 'Pedro';

        setName("André Lucio");

        console.log(`variavel:${userName}`);
    };
    console.log(`useState:${name}`);

    //2 - useStates e inputs -------------------------------
    const [age, setAge] = useState(18);

    const handleSubmit = (e) => {
        //SPA - nao recarrega a pagina
        e.preventDefault();

        //Envia os dados para uma API
        console.log(`valor enviado: ${age}`);
    }

    return (
        <div>
            {/* 1 - useState ----------------------------- */}
            <h2>useState</h2>
            <p>Variável: {userName}</p>
            <p>useState:{name}</p>
            <button onClick={changeName}>Mudar Names!</button>

            {/* 2 - useStates e inputs ------------------- */}
            <p>Informe sua idade:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input type="submit" value='Enviar'/>
            </form>
            <p>Voce tem <strong>{age}</strong> anos!</p>
            <hr />
        </div>
    )
}

export default HookUseState