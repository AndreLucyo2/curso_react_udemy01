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
    deletePhoto,
    updatePhoto,
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

    //Estes para edição
    const [editId, setEditId] = useState();
    const [editImage, setEditImage] = useState();
    const [editTitle, setEditTitle] = useState();


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

    // Exclude an image
    const handleDelete = (id) => {
        //ativa a função 
        dispatch(deletePhoto(id));

        //mostra a mensagem por um tempo
        resetComponentMessage();
    };

    // Show or hide forms, alterna entre o form para exibir e editar, nunca se momstra junto
    function hideOrShowForms() {
        //se tiver sendo exibido oculta
        newPhotoForm.current.classList.toggle("hide");
        //se tiver sendo exibido exibe
        editPhotoForm.current.classList.toggle("hide");
    }


    // Update photo title
    const handleUpdate = (e) => {
        e.preventDefault();

        //preenche para o update da foto
        const photoData = {
            title: editTitle,
            id: editId,
        };

        dispatch(updatePhoto(photoData));

        resetComponentMessage();
    };

    // Show edit form
    const handleEdit = (photo) => {
        //valida se a edição esta sendo exibido:
        if (editPhotoForm.current.classList.contains("hide")) {
            //exibe o form de edição
            hideOrShowForms();
        }

        setEditId(photo._id);
        setEditImage(photo.image);
        setEditTitle(photo.title);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        //trabalha com o evendo que controla a exibição 
        //oculta o form de edição e momstra o de cadastrar
        hideOrShowForms();
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
                    {/* form para postar foto */}
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

                    {/* editar a foto */}
                    <div className="edit-photo hide" ref={editPhotoForm}>
                        <p>Editando:</p>
                        {/* Checa se a imagem ja chegou */}
                        {editImage && (
                            <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
                        )}
                        {/* Form para alterar a foto */}
                        <form onSubmit={handleUpdate}>
                            <input
                                type="text"
                                placeholder="Insira novo título"
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle || ""}
                            />
                            <input type="submit" value="Atualizar" />
                            {/* opção de cancelar a edição */}
                            <button className="cancel-btn" onClick={handleCancelEdit}>
                                Cancelar edição
                            </button>
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
                                <div className="actions">
                                    <Link to={`/photos/${photo._id}`}>
                                        <BsFillEyeFill />
                                    </Link>
                                    <BsPencilFill onClick={() => handleEdit(photo)} />
                                    <BsXLg onClick={() => handleDelete(photo._id)} />
                                </div>
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