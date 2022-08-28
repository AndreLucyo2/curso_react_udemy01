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

    //controle de fotos, acesso os dois forms a nivel de DOM deste elemento
    //Usando o hook de referencias do react
    // New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // Load user data, dispara quando cheda o id
    useEffect(() => {
        dispatch(getUserDetails(id));
    }, [dispatch, id]);

    // Publish a new photo
    const submitHandle = (e) => {
        e.preventDefault();
    };

    // Update photo title
    const handleUpdate = (e) => {
        e.preventDefault();

    };

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
            {/*Checar se o usuario que esta acessando é o dono dele */}
            {id === userAuth._id && (
                <>
                    <div className="new-photo" ref={newPhotoForm}>
                        <h3>Compartilhe algum momento seu:</h3>
                        <form >
                            <label>
                                <span>Título para a foto:</span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" />
                            </label>

                            <input type="submit" value="Postar" />

                        </form>
                    </div>
                </>
            )}

        </div>
    )
}

export default Profile