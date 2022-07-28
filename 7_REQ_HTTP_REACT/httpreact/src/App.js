
import './App.css';

//react
import { useState, useEffect } from 'react'

// 4 - importa o custom hook para GET
import { useFetch } from './hooks/useFetch';

const ulrBaseAPI = "http://localhost:3000/products"

function App() {

  //--------------------------------------------------------------------------------------
  //const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 4 - usando o custom hook DINAMICO : renomeia data para items
  const { data: items, httpConfig } = useFetch(ulrBaseAPI);//recebe uma url, e retorna os dados e as configs


  //--------------------------------------------------------------------------------------
  // 2 - POST de produto: dispara quando submete do form e ja retorna os dados e atualiza a tela
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Monta o objeto Js, quando o nome do useState é o mesmo da chave pode ser direto
    const product = {
      name,
      price,
    };

    // 5 - seta as config para o tipo da requisição POST e envia os dados
    httpConfig(product, "POST");

    //resetar os useState, ja limpa a tela: limpa os inputs
    setName('');
    setPrice('');

  };


  //--------------------------------------------------------------------------------------
  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {/* faz um if simples so faz o map caso o arry não seja null quandos tiver itens faz o map */}
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R${product.price}</li>
        ))}
      </ul>
      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </div>
  );
}

export default App;
