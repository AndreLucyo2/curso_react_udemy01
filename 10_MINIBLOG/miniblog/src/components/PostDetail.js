import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";

const PostDetail = ({ post }) => {

    return (
        <div className={styles.post_detail}>

            {/* mostra a imagem */}
            <img src={post.image} alt={post.title} />

            {/* mostra o titulo */}
            <h2>{post.title}</h2>

            {/* mostra o autor */}
            <p className={styles.createdby}>por: {post.createdBy}</p>

            {/* mostra os dados do post */}
            <div className={styles.tags}>
                {/* Pega os campos de cada documento na colection do firebase */}
                {post.tags.map((tag) => (
                    <p key={tag}>
                        {/* Mostra as tags */}
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>

            {/* Para ler o post individual redireciona para posts/id... */}
            <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ler
            </Link>
        </div>
    );
};

export default PostDetail;