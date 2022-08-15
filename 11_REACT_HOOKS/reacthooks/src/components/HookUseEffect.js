import { useEffect, useState } from "react";

const HookUseEffect = () => {

    // 1 - useEffect, sem dependencias
    // Executa sempre ao renderizar componente, da um escopo definido
    useEffect(() => {
        console.log("Estou sendo executado!");
    });

    //contador para o exemplo
    const [number, setNumber] = useState(0);

    const changeSomething = () => {
        setNumber(number + 1);
    };

    return (
        <div>
            <h2>useEffect</h2>
            <p>Number: {number}</p>
            <button onClick={changeSomething}>Executar!</button>
            <hr />
        </div>
    );
};

export default HookUseEffect