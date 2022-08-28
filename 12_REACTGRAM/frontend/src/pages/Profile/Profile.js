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
import {
    publishPhoto,
    resetMessage,
    getUserPhotos,
} from "../../slices/photoSlice";



const Profile = () => {
    //id do use params veindo a url
    const { id } = useParams();

    const dispatch = useDispatch();

    //usuario que entrei no perfil
    const { user, loading } = useSelector((state) => state.user);
    //usuario autenticado : renomeia user para userAuth
    const { user: userAuth } = useSelector((state) => state.auth);

    //obtem os estados da photo, renomeando
    const {
        photos,
        loading: loadingPhoto,
        error: errorPhoto,
        message: messagePhoto,
    } = useSelector((state) => state.photo);

    //cria os estates da foto
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");


    //controle de fotos, acesso os dois forms a nivel de DOM deste elemento
    //Usando o hook de referencias do react
    // New form and edit form refs
    const newPhotoForm = useRef();
    const editPhotoForm = useRef();

    // Load user data, dispara quando cheda o id
    useEffect(() => {
        dispatch(getUserDetails(id));
        //vai preencher a propriedade photo
        dispatch(getUserPhotos(id));
    }, [dispatch, id]);

    // Reset component message
    function resetComponentMessage() {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    // change image state
    const handleFile = (e) => {
        const image = e.target.files[0];

        //pega a imagem e setar o estado da imagem 
        setImage(image);
    };

    // Publish a new photo
    const submitHandle = (e) => {
        e.preventDefault();

        const photoData = {
            title,
            image,
        };

        // build form data
        const formData = new FormData();

        //cria um objeto de foto
        const photoFormData = Object.keys(photoData).forEach((key) =>
            formData.append(key, photoData[key])
        );
        formData.append("photo", photoFormData);

        dispatch(publishPhoto(formData));

        setTitle("");

        //controla o tempo de exibição da menssagem
        resetComponentMessage();

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
                        <form onSubmit={submitHandle}>
                            <label>
                                <span>Título para a foto:</span>
                                <input
                                    type="text"
                                    placeholder="Insira um título"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title || ""}
                                />
                            </label>
                            <label>
                                <span>Imagem:</span>
                                <input type="file" onChange={handleFile} />
                            </label>

                            {/* Valida o estado da foto */}
                            {!loadingPhoto && <input type="submit" value="Postar" />}
                            {loadingPhoto && (
                                <input type="submit" disabled value="Aguarde..." />
                            )}

                        </form>
                    </div>
                    {/* Valida e mostra se deu erro na foto*/}
                    {errorPhoto && <Message msg={errorPhoto} type="error" />}
                    {messagePhoto && <Message msg={messagePhoto} type="success" />}
                </>
            )}
            {/* Todos vão poder ver as fotos de qualquer usuario */}
            <div className="user-photos">
                <h2>Fotos publicadas:</h2>
                <div className="photos-container">
                    {photos && photos.map((photo) => (
                        <div className="photo" key={photo._id}>
                            {/* Valida se a foto veio antes de tentar exibir */}
                            {photo.image && (
                                <img
                                    src={`${uploads}/photos/${photo.image}`}
                                    alt={photo.title}
                                />
                            )}
                            {/* Exibe as opções do CRUD da foto */}
                            {id === userAuth._id ? (
                                <p>Actions</p>
                            ) : (
                                <Link className="btn" to={`/photos/${photo._id}`}>
                                    Ver
                                </Link>
                            )}
                        </div>
                    ))}
                    {/* Cas o user nao tenha fotos publicadas */}
                    {photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
                </div>
            </div>
        </div>
    )
}

export default Profile