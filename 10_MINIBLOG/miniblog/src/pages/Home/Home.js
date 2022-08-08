// CSS
import styles from "./Home.module.css";

// react
import { useState } from "react";

// hooks
import { useNavigate, Link } from "react-router-dom";


// components

const Home = () => {

    //contexto da busca:
    const [query, setQuery] = useState("");
    //inicar com uma lista de post vazia
    const [posts] = useState([]);

    //submite
    const handleSubmit = (e) => {
        e.preventDefault();
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

            {/* lista de post */}
            <div className="post-list">
                <h1>Posts...</h1>
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
