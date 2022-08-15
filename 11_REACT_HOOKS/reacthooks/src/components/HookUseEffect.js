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


    //---- Limpesa do useEfect evitar o vazamento de momoria ----------------
    // 4 - limpeza do useEffect
    useEffect(() => {

        //simulando, usado uma função javascript executar algo de tempo em tempo
        const timer = setTimeout(() => {

            console.log("Hello World!");

            // gera erro sem cleanup
            //setAnotherNumber(anotherNumber + 1);
        }, 2000);

        // Realizar exemplo sem clean up (manda parar o timer)
        // criar um mecanismo que valide quando nao quero mais executar uma determinda ação
        //devido a esta função anonima o react ja entende, tipo trocar de pagina, etc... 
        return () => clearTimeout(timer); 
        
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