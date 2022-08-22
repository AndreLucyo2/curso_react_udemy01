import { useState, useMemo, useEffect } from "react";

const HookUseMemo = () => {
    const [number, setNumber] = useState(0);

    //gera o erro
    //const premiumNumbers = ["0", "100", "200"];

    
    // resolvendo com o memo, executa quando quiser, pois o valor esta na memoria
    const premiumNumbers = useMemo(() => {
        return ["0", "100", "200"];
    }, []);


    //faz algo quando o premiumNumbers for alterado
    useEffect(() => {
        console.log("Premium numbers foi alterado!");
    }, [premiumNumbers]);

    return (
        <div>
            <h2>useMemo</h2>
            <input type="text" onChange={(e) => setNumber(e.target.value)} />
            {/* acerte a numero - se incluir mostra o que acertou */}
            {premiumNumbers.includes(number) ? <p>Acertou o número!</p> : ""}
            <hr />
        </div>
    );
};

export default HookUseMemo;
