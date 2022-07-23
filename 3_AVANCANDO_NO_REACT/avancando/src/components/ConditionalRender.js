import { useState } from 'react'

const ConditionalRender = () => {

    const [condicao] = useState(false);

    return (
        <div>
            <h1>Isso será exibido?</h1>
            {/* Condiciona ternaria */}
            {condicao && <p>Se a condicao for true, sim</p>}
            {/* Condiciona ternaria */}
            {!condicao && <p>Agora a condicao é falso</p>}
        </div>
    )
}

export default ConditionalRender