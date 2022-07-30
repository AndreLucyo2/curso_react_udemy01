import React from 'react'

import { useParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch";

const Product = () => {

    // 4 - rota dinamica
    //o parametro deve ser igual ao informado no Route, neste caso foi id -->> path='/produts/:id'
    const { id } = useParams();

    // 5 - Carregamento de um dado individual com base no ID utilizando url dinamica para a API
    const url = "http://localhost:3000/products/" + id;
    
    //useFetch hook
    const { data: product, loading, error } = useFetch(url);
    //Carregar o objeto:
    console.log(product);

    return (
        <>
            <p>ID do produto: {id}</p>
            {loading && <p>Carregando dados...</p>}
            {error && <p>{error}</p>}
            {product && (
                <div>
                    <h1>{product.name}</h1>
                    <p>R${product.price}</p>
                </div>
            )}

        </>
    )
}

export default Product