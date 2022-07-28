
import './App.css';

//react
import { useState, useEffect } from 'react'

// 4 - importa o custom hook para GET
import { useFetch } from './hooks/useFetch';

const ulrBaseAPI = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  // 4 - usando o custom hook GET
  const {data} = useFetch(ulrBaseAPI);
  console.log(data);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - GET - Resgatando dados:
  // useEffect(() => {
  //   //Faz um GET nos db.json
  //   async function fetchData() {
  //     //faz o get e aguarda a response
  //     const resp = await fetch(ulrBaseAPI);
  //     //pega a resonse a converte para objeto js
  //     const data = await resp.json();
  //     //seta os dados
  //     setProducts(data);
  //   };

  //   //chama a função:
  //   fetchData();

  // }, []);

  // 2 - POST de produto: dispara quando submete do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Monta o objeto Js, quando o nome do useState é o mesmo da chave pode ser direto
    const product = {
      name,
      price,
    };

    //cria a requisição de POST, ja converte o objeto para json
    const res = await fetch(ulrBaseAPI, {
      method: "POST",
      headers: {
        //infroma o tipo de dado que vai trafegar
        "Content-Type": "application/json",
      },
      //converte objeto js para Stein json
      body: JSON.stringify(product),
    });

    // 3 - carregamento dinamico: Pega o retorno e ja adiciona no front
    // converte a resposta do POST em objeto js para mostrar ele no front 
    const addedProduct = await res.json();
    //seta o useState : com JavaScript object spread Operator "..." mantem os antigos e adiciona o novo
    setProducts((prevProducts) => [...prevProducts, addedProduct]);

    //resetar os useState, ja limpa a tela: limpa os inputs
    setName('');
    setPrice('');

  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
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
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
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
