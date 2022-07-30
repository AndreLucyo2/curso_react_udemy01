//hook para pode r redirecionar dentro do codigo do componente
import { useNavigate } from "react-router-dom";
//pegando o estado do input
import { useState } from "react";

export const SearchForm = () => {
    //pega o navigate sendo executado
    const navigate = useNavigate();
    //monta e pega a query
    const [query, setQuery] = useState();

    //evendo de submit para fazer a busca
    const handleSubmit = (e) => {
        //nao faz recarregamento da pagina
        e.preventDefault();

        //Monta o refinamento para fazer a busca
        navigate("/search?q=" + query);
    };

    //Monta o formulario
    return (
        <form onSubmit={handleSubmit}>
            {/* pega o que ie digirado e monta a busca */}
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <input type="submit" value="Buscar" />
        </form>
    );
};