import { useReducer } from 'react';

const HookUseReducer = () => {

    //1 - começando com o userReducer
    //Muda o estado e ainda pode executar uma função
    // dispatch : nome da função do useReducer
    const [number, dispatch] = useReducer((state, action) => {
        //Aqui pode executar alguma logica para modar o stado do campo
        return Math.random(state);
    });

    return (
        <div>
            <h2> HookUseReducer</h2>
            <p>Número: {number}</p>
            <button onClick={dispatch}>Alterar número!</button>
            <hr />
        </div>
    )
}

export default HookUseReducer