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

// Redux
import { getPhoto, like } from "../../slices/photoSlice";
import LikeContainer from "../../components/LikeContainer";

function Photo() {
    const { id } = useParams();

    const dispatch = useDispatch();

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
        </div>
    );
}

export default Photo