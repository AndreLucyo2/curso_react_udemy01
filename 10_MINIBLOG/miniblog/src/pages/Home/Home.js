// CSS
import styles from "./Home.module.css";

// react
import { useState } from "react";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useNavigate, Link } from "react-router-dom";

// components
import PostDetail from "../../components/PostDetail";

const Home = () => {

    //contexto da busca:
    const [query, setQuery] = useState("");

    //Redireciona para a url montada pelo consulta
    const navigate = useNavigate();

    //Recebe os documentos e renomeia para post, passa a coleção para buscar "posts"
    const { documents: posts, loading } = useFetchDocuments("posts");

    //submite
    const handleSubmit = (e) => {
        e.preventDefault();

        //se tive valor para buscar.. refina a request
        if (query) {
            return navigate(`/search?q=${query}`);
        }
    };

    return (

        <div className={styles.home}>
            <h1>Veja os nossos posts mais recentes</h1>

            {/* pesquisa */}
            <form className={styles.search_form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Ou busque por tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Pesquisar</button>
            </form>

            <div className="post-list">
                {loading && <p>Carregando...</p>}

                {/* lista de post */}
                {posts && posts.map((post) => (
                    //usa um componente para mostrar o post
                    <PostDetail key={post.id} post={post} />
                ))}

                {posts && posts.length === 0 && (
                    //Tratamento para caso nao tiver nenhum post ainda:
                    <div className={styles.noposts}>
                        <p>Não foram encontrados posts :( </p>
                        <Link to="/posts/create" className="btn">
                            Criar primeiro post
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
