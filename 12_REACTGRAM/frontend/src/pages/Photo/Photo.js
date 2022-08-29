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
import { getPhoto } from "../../slices/photoSlice";

function Photo() {
    const { id } = useParams();

    const dispatch = useDispatch();

    //obtem o user logado
    const { user } = useSelector((state) => state.auth);
    //pega alguns dados da foto
    const { photo, loading, error, message } = useSelector((state) => state.photo);

    //comentario

    //load foto data
    useEffect(() => {
        dispatch(getPhoto(id));
    }, [dispatch, id]);


    // Like a photo




    if (loading) {
        return <p>Carregando...</p>;
    }




    return (
        <div id="photo">
            <PhotoItem photo={photo} />
        </div>
    )
}

export default Photo