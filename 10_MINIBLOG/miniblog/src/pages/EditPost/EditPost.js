import styles from "./EditPost.module.css";
//react
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//context
import { useAuthValue } from "../../contexts/AuthContext";

//HOOK
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";


const EditPost = () => {

    //pegar os parametros da url
    const { id } = useParams();
    //pega o post pelo id
    const { document: post } = useFetchDocument("posts", id);

    //Estrutura do post:
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    // carregar os dados no form --- fill form data
    useEffect(() => {
        //ve que o posto chegou 
        if (post) {
            //carrega os dados
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            //retorna as tags para uma string separada por ,
            const textTags = post.tags.join(", ");
            setTags(textTags);
        }
    }, [post]);

    //redirecionar e navegar
    const navigate = useNavigate();

    //dados do usuario:
    const { user } = useAuthValue();

    //hook: que faz o update: import da função e a response passando a coleção
    const { updateDocument, response } = useUpdateDocument("posts");

    //SUBMINT  ============================================================
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        //validar a umagem url  -------------------------------------------
        try {
            //valida a se é uma url
            new URL(image);
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // create tags array  ---------------------------------------------
        //tira os espaços, poe lowcase e cria um array separando por virgula 
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // check todos os valores -----------------------------------------
        // check values se faltou algum valor obriga preencher 
        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!");
        }

        //se tiver algum erro no form nao deve proceguir
        if (formError) return

        //Cria a estrutura, propriedades do documento:
        const data = {
            title,
            image,
            body,
            tags: tagsArray,
        };

        console.log(post);

        //Executa o metodo para atualziar o document
        updateDocument(id, data);

        // redirect to dashboard page
        //se der tudo certo vai para dashboard
        navigate("/dashboard");
    };

    return (
        <div className={styles.edit_post}>
            {/* Valida se o post chegou */}
            {post && (
                <>
                    <h2>Editando  post</h2>
                    <p>Altere os dados do post!</p>

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

                        <p className={styles.preview_title}>Preview da imagem atual:</p>
                        <img
                            className={styles.image_preview}
                            src={post.image}
                            alt={post.title}
                        />

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
                        {!response.loading && <button className="btn">Editar post!</button>}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde.. .
                            </button>
                        )}
                        {/* Valida erro tanto na response quanto no form */}
                        {(response.error || formError) && (
                            <p className="error">{response.error || formError}</p>
                        )}

                    </form>
                </>
            )}
        </div>
    );
};

export default EditPost;