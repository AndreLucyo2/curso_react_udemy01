import React from 'react'
import HookUseEffect from '../components/HookUseEffect'
import HookUseReducer from '../components/HookUseReducer'
import HookUseState from '../components/HookUseState'

const Home = () => {
    return (
        <div>
            <hr />
            <HookUseState />
            <HookUseReducer/>
            <HookUseEffect/>
        </div>
    )
}

export default Home