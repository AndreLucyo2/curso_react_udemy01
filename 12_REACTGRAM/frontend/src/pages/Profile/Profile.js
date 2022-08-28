import "./Profile.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
//icons
import {
    BsFillEyeFill,
    BsPencilFill,
    BsXLg
} from "react-icons/bs";

// hooks
import { useEffect, useState, useRef } from "react";
//selecionar contextos e disparar funções
import { useSelector, useDispatch } from "react-redux";
//para pegar parametros passados  da url
import { useParams } from "react-router-dom";


// Redux
import { getUserDetails } from "../../slices/userSlice";


const Profile = () => {
    //id do use params veindo a url
    const { id } = useParams();

    const dispatch = useDispatch();

    //usuario que entrei no perfil
    const { user, loading } = useSelector((state) => state.user);
    //usuario autenticado : renomeia user para userAuth
    const { user: userAuth } = useSelector((state) => state.auth);


    // Load user data, dispara quando cheda o id
    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch, id]);


    //espera carregar o user para mostrar os dados 
    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="profile">
            <div className="profile-header">
                {user.profileImage && (
                    <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
                )}
                <div className="profile-description">
                    <h2>{user.name}</h2>
                    <p>{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile