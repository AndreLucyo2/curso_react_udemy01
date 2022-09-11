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
import { getPhoto, like } from "../../slices/photoSlice";
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

    //comentario

    //Load foto data, entra na pagina ja vai ter a foto sendo carregada
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);


    //Like a photo e comentario
    const handleLike = () => {
        //executa o like na foto
        dispatch(like(photo._id));
        
        //reseta a menssagem
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
        </div>
    );
}

export default Photo