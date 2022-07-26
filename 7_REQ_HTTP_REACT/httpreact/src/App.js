
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
  //Retorna: os dados, as configs e o loading
  //pega o erro
  const { data: items, httpConfig, loading, error } = useFetch(ulrBaseAPI);//recebe uma url, e retorna os dados e as configs


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
  //Desafio usando o metodo DELETE
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };

  //--------------------------------------------------------------------------------------
  return (
    <div className="App">
      <h1>Lista de produtos</h1>

      {/* 6 - Aplicando o loading */}
      {loading && <p className="loadingx">CARREGANDO DADOS ...</p>}

      {/* 7 - Exibe algo caso der erro*/}
      {error && <p className="error">{error}</p>}

      {/* Só mostra a lista caso nao der erro */}
      {!error && (
        <ul>
          {/* faz um if simples so faz o map caso o arry não seja null quandos tiver itens faz o map */}
          {items && items.map((product) => (
            <li key={product.id}>{product.name} - R${product.price}
              {/* 9 - Criando o botão para o DELETE */}
              <button className="btnDelete"  onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

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
          {/* 6 - Desativa ações qté que o loading tenha finalizado */}
          {loading && <input type="submit" disabled value="Aguarda!" />}
          {!loading && <input type="submit" value="Criar" />}

        </form>
      </div>
    </div>
  );
}

export default App;
