
import './App.css';

//react
import { useState, useEffect } from 'react'

const ulrBaseAPI = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  // 1 - GET - Resgatando dados:
  useEffect(() => {
    //Faz um GET nos db.json
    async function fetchData() {
      //faz o get e aguarda a response
      const resp = await fetch(ulrBaseAPI);
      //pega a resonse a converte para objeto js
      const data = await resp.json();
      //seta os dados
      setProducts(data);
    };

    //chama a função:
    fetchData();

  }, []);

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - R${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
