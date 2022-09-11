import "./Photo.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";


// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// Redux
import { getPhoto, like, comment } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

function Photo() {
    const { id } = useParams();

    const dispatch = useDispatch();

    //custom hook para reseta a mensagem
    const resetMessage = useResetComponentMessage(dispatch);

    //obtem o user logado
    const { user } = useSelector((state) => state.auth);

    //pega alguns dados da foto
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    //Manipular comentário
    const [commentText, setCommentText] = useState();

    //Load foto data, entra na pagina ja vai ter a foto sendo carregada
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);

    //Insert a Like a photo e comentario
    const handleLike = () => {
        //executa o like na foto
        dispatch(like(photo._id));

        //reseta a menssagem
        resetMessage();
    };

    // Insert a comment
    const handleComment = (e) => {
        e.preventDefault();

        //monta os dados do comentário
        const commentData = {
            comment: commentText,
            id: photo._id,
        };

        dispatch(comment(commentData));
        
        //reseta o form, limpa o campo
        setCommentText("");

        resetMessage();
    };


    //Caso em load
    if (loading) {
        return <p>Carregando...</p>;
    };

    //Retorna o elemento:
    return (
        <div id="photo">
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <div className="message-container">
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}
            </div>
            <div className="comments">
                {/* Testa se a entidade existe */}
                {photo.comments && (
                    <>
                        <h3>Comentários ({photo.comments.length}):</h3>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                placeholder="Insira seu comentário..."
                                onChange={(e) => setCommentText(e.target.value)}
                                value={commentText || ""}
                            />
                            <input type="submit" value="Enviar" />
                        </form>
                        {photo.comments.length === 0 && <p>Não há comentários...</p>}
                        {photo.comments.map((comment) => (
                            <div className="comment" key={comment.comment}>
                                <div className="author">
                                    {comment.userImage && (
                                        <img
                                            src={`${uploads}/users/${comment.userImage}`}
                                            alt={comment.userName}
                                        />
                                    )}
                                    <Link to={`/users/${comment.userId}`}>
                                        <p>{comment.userName}</p>
                                    </Link>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Photo