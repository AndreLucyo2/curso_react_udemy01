import { useEffect, useState } from "react";

//componente:
const HookUseEffect = () => {

    //--- Executa sempre que o componente muda  ---------------------------
    // 1 - useEffect, sem dependencias, executa sempre que o componente muda
    // Executa sempre ao renderizar componente, da um escopo definido
    useEffect(() => {
        console.log("Estou sendo executado, pois meu componente mudou!");
    });

    //contador para o exemplo
    const [number, setNumber] = useState(0);

    const changeSomething = () => {
        setNumber(number + 1);
    };

    //--- Executa só quando o componente é carregado  ----------------------
    // 2 - array de dependências vazio, quando quer executar algo apenas uma vez
    useEffect(() => {
        //mesmo que alterar algo, ele nunca mais é executado
        console.log("Serei executado apenas uma vez!");
    }, []);


    //---- Executa só quando um valor específico é alterado  ---------------
    // 3 - item no array de dependências
    const [anotherNumber, setAnotherNumber] = useState(0);

    useEffect(() => {

        if (anotherNumber > 0) {
            console.log("Sou executado apenas quando a dependencia anotherNumber muda!");
        }
        //passa uma dependencia que sera monitorado o valor   
    }, [anotherNumber]);

    return (
        <div>
            <h2>useEffect</h2>
            <p>Number: {number}</p>
            <button onClick={changeSomething}>Executar!</button>
            <br />
            <p>Another Number: {anotherNumber}</p>
            <button onClick={() => setAnotherNumber(anotherNumber + 1)}>
                Mudar anotherNumber!
            </button>
            <hr />
        </div>
    );
};

export default HookUseEffect