import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
//hook que pega o parametro da url de uma forma mas correta
import { useQuery } from "../../hooks/useQuery";

const Search = () => {

    //pega o parametro
    const query = useQuery();

    //pega o tributo da reuquisição, neste caso nomeado como "q"
    const search = query.get("q");

    return (
        <div>
            <h1>Search</h1>
            <p>{search}</p>
        </div>
    )
}

export default Search