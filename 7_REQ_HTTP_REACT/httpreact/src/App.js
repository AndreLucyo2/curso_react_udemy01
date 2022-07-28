
import './App.css';

//react
import { useState, useEffect } from 'react'

const ulrBaseAPI = "http://localhost:3000/products"

function App() {

  const [products, setProducts] = useState([]);

  // 1 - Resgatando dados:
  useEffect(async () => {
    const resp = await fetch(ulrBaseAPI);
    const data = await resp.json();
    setProducts(data);

  },[]);

  console.log(products);

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
    </div>
  );
}

export default App;
