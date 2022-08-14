import styles from "./Dashboard.module.css"

import { Link } from "react-router-dom";

//hooks:
import { useAuthValue } from '../../contexts/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from "../../hooks/useDeleteDocument";


const Dashboard = () => {

    //Recebe o user: pega o id
    const { user } = useAuthValue();
    const uid = user.uid;

    //faz a busca dos posts do usuário pelo uid na coleção posts , sem busca , passando o uid
    const { documents: posts } = useFetchDocuments("posts", null, uid);

    //inicializar o hook para pegar o metodo deletar: passando a colection
    const { deleteDocument } = useDeleteDocument("posts");

    console.log(uid);
    console.log(posts);

    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <p>Gerencie seus posts</p>

            {posts && posts.length === 0 ? (
                //Quanto não tem posts para exibir
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts</p>
                    <Link to="/posts/create" className="btn">
                        Criar primeiro post
                    </Link>
                </div>
            ) : (
                //Quanto tem posts para exibir
                <div className={styles.post_header}>
                    <span>Título</span>
                    <span>Ações</span>
                </div>
            )}

            {/* Quanto tem posts para exibir */}
            {posts && posts.map((post) => (
                <div className={styles.post_row} key={post.id}>
                    <div className={styles.div2}>
                    {post.title}
                    </div>
                    <div className={styles.actions}>
                        <Link to={`/posts/${post.id}`} className="btn btn-outline">
                            Ver
                        </Link>
                        <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                            Editar
                        </Link>
                        <button
                            onClick={() => deleteDocument(post.id)}
                            className="btn btn-outline btn-danger">
                            Excluir
                        </button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Dashboard