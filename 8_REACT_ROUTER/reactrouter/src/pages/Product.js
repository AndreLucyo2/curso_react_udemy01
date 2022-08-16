import React from 'react'

import { Link, useParams } from 'react-router-dom'
import { useFetch } from "../hooks/useFetch";

const Product = () => {

    // 4 - rota dinamica
    //o parametro deve ser igual ao informado no Route, neste caso foi id -->> path='/produts/:id'
    //com isso tem acesso ao dado informado
    const { id } = useParams();

    // 5 - Carregamento de um dado individual com base no ID utilizando url dinamica para a API
    const url = "http://localhost:3000/products/" + id;

    //useFetch hook : fazendo um GET pelo ID
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
                    {/* 6 - nested rout - rota mais complexas */}
                    <Link to={`/products/${product.id}/info`}>Mais informações</Link>
                </div>
            )}

        </>
    )
}

export default Product