import { useState } from 'react'

const ConditionalRender = () => {

    const [condicao] = useState(false);

    const [name, setName] = useState('Andre');

    return (
        <div>
            <h1>Isso será exibido?</h1>
            {/* Condiciona ternaria simples */}
            {condicao && <p>Se a condicao for true, sim</p>}
            {/* Condiciona ternaria simples */}
            {!condicao && <p>Agora a condicao é falso</p>}

            {/* Condiciona ternaria */}
            <h1>If ternário:</h1>
            {name === "João"?(
                <div>O nome é {name} </div>
            ):(
                <div>Nome não encontrado!</div>
            )}
            {/* Altera o estado e ja rerenderiza a tela */}
            <button onClick={()=>setName("João")}>Altera nome</button>
        </div>
    )
}

export default ConditionalRender