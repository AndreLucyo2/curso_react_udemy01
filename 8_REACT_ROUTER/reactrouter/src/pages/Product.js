import React from 'react'

import { useParams } from 'react-router-dom'

const Product = () => {

    /* 4 - rota dinamica */
    //o parametro deve ser igual ao informado no Route, neste caso foi id -->> path='/produts/:id'
    const {id} = useParams();

    //recebe informação do parametro e pode ser utilizado aqui
    return (
        <>
        <p>ID do produto: {id}</p>
        </>
    )
}

export default Product