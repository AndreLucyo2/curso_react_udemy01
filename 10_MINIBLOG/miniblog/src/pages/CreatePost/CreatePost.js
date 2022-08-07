import styles from "./CreatePost.module.css";
//react
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//context
import { useAuthValue } from "../../contexts/AuthContext";

//HOOK
import { useInsertDocument } from "../../hooks/useInsertDocument";


const CreatePost = () => {
    //Estrutura do post:
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    //dados do usuario:
    const { user } = useAuthValue();

    //import da função e a response
    const { insertDocument, response } = useInsertDocument("posts");

    //SUBMINT  ============================================================
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //validar a umagem url  -------------------------------------------


        // create tags array  ---------------------------------------------
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // check todos os valores -----------------------------------------



        //faz o insert:
        insertDocument({
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        });


        // redirect to home page

    };

    return (
        <div className={styles.create_post}>
            <h2>Criar post</h2>
            <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Título:</span>
                    <input
                        type="text"
                        name="text"
                        required
                        placeholder="Pense num bom título..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>URL da imagem:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insira uma imagem que representa seu post"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Conteúdo:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insira o conteúdo do post"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Insira as tags separadas por vírgula"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>

                {/* Efeito enquanto aguarda a resposta do cadastro */}
                {!response.loading && <button className="btn">Criar post!</button>}
                {response.loading && (
                    <button className="btn" disabled>
                        Aguarde.. .
                    </button>
                )}
                {(response.error || formError) && (
                    <p className="error">{response.error || formError}</p>
                )}

            </form>
        </div>
    );
};

export default CreatePost;