//pegando os parametros da url
import { useSearchParams, Link } from "react-router-dom";
//hook para pegar os dados
import { useFetch } from "../hooks/useFetch";

const Search = () => {
  //hook para pegar os parametros
  let [searchParams] = useSearchParams();

  //Extrai os parametros de busca e monta a url
  const url = "http://localhost:3000/products?" + searchParams;

  //hook para a executar a busca , executando o metodo na api
  const { data: items, loading, error } = useFetch(url);

  //Cria a lista com os dados retornados
  return (
    <div>
      <h1>Resultados disponíveis:</h1>
      <ul className="products">
        {items &&
          items.map((product) => (
            <li key={product.id}>
              <h2>{product.name}</h2>
              <p>R$: {product.price}</p>
              <Link to={`/products/${product.id}`}>Detalhes</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;