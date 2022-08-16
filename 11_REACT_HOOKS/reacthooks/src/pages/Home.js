import React from 'react'
import HookUseEffect from '../components/HookUseEffect'
import HookUseReducer from '../components/HookUseReducer'
import HookUseState from '../components/HookUseState'

//importa o contexto:
import { useContext } from 'react'
import { SomeContext } from '../components/HookUseContext'

const Home = () => {
    //Recebe o contexto: 
    const { contextValue } = useContext(SomeContext);


    return (
        <div>
            <hr />
            <HookUseState />
            <HookUseReducer />
            <HookUseEffect />
            <h2>useContext</h2>
            <p>Valor do contexto: <strong>{contextValue}</strong></p>
            <hr />
        </div>
    )
}

export default Home