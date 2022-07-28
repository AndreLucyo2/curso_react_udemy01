
import './App.css';

//react
import { useState, useEffect } from 'react'

const ulrBaseAPI = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  // 1 - Resgatando dados:
  useEffect(() => {

    async function fetchData() {
      const resp = await fetch(ulrBaseAPI);
      const data = await resp.json();
      setProducts(data);
    };

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
