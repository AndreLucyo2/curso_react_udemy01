//react
import { Link } from "react-router-dom";

//Estilos
import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
//hook que pega o parametro da url de uma forma mas correta
import { useQuery } from "../../hooks/useQuery";

// components
import PostDetail from "../../components/PostDetail";

const Search = () => {

    //pega o parametro
    const query = useQuery();

    //pega o tributo da reuquisição, neste caso nomeado como "q"
    const search = query.get("q");

    //recebe o documento, e usa a pesquisa
    const { documents: posts } = useFetchDocuments("posts", search);

    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            <div className="post-list">
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts a partir da sua busca... {search}</p>
                        <Link to="/" className="btn btn-dark">
                            Voltar
                        </Link>
                    </div>
                )}
                {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default Search;
