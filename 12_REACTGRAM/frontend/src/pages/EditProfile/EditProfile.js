import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";


const EditProfile = () => {

    const dispatch = useDispatch();

    const { user, message, error, loading } = useSelector((state) => state.user);

    //states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [bio, setBio] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // Load user data
    useEffect(() => {
        dispatch(profile());
    }, [dispatch]);

    // fill user form, sempre que o user mudar ele é disparado 
    useEffect(() => {
        //valida se tem um user: 
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setBio(user.bio);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gather user data from states, nome é obrigatorio
        const userData = {
            name,
        };

        //opcional, se tem manda , se nao tem nnão manda
        if (profileImage) {
            userData.profileImage = profileImage;
        }
        //opcional, se tem manda , se nao tem nnão manda
        if (bio) {
            userData.bio = bio;
        }
        //opcional, se tem manda , se nao tem nnão manda
        if (password) {
            userData.password = password;
        }

        // build form data, controi o objeto para receber os novos dados
        const formData = new FormData();
        //cria um objeto definindo as chaves com um laço dinamico 
        const userFormData = Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );
        //carregar os dados no objeto completo
        formData.append("user", userFormData);

        //Manda a request para a API atualizar
        await dispatch(updateProfile(formData));

        //controle o tempo em que a messagem de sucesso fica visivel
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    }

    //lida com a imgem recebida
    const handleFile = (e) => {
        // image preview
        const image = e.target.files[0];

        //coloca a imagem na tela
        setPreviewImage(image);

        // change image state
        setProfileImage(image);
    };

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className="subtitle">
                Adicione uma imagem de perfil, e conte mais um pouco sobre você...
            </p>

            {/* preview da imagem, chea se o user tem imagem ou se chegou nova imagem */}
            {/* preview da imagem monstra primeiro, caso contrario mostra a oimagem atual */}
            {/* URL.createObjectURL(previewImage) conver a imagem selecionada para umagem html, dando um prevew */}
            {(user.profileImage || previewImage) && (
                <img
                    className="profile-image"
                    src={
                        previewImage
                            ? URL.createObjectURL(previewImage)
                            : `${uploads}/users/${user.profileImage}`
                    }
                    alt={user.name}
                />
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                />

                {/* Não é permitido alterar o e-mail, campo fica desabilitado */}
                <input
                    type="email"
                    placeholder="E-mail"
                    disabled
                    value={email || ""}
                />

                {/* Quando altera a imagem dispara o evendo para dar um preview na tela */}
                <label>
                    <span>Imagem de Perfil:</span>
                    <input type="file" onChange={handleFile} />
                </label>

                <label>
                    <span>Bio:</span>
                    <input
                        type="text"
                        placeholder="Descrição do perfil"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio || ""}
                    />
                </label>

                <label>
                    <span>Quer alterar sua senha?</span>
                    <input
                        type="password"
                        placeholder="Digite sua nova senha..."
                        onChange={(e) => setPassword(e.target.value)}
                        value={password || ""}
                    />
                </label>

                {!loading && <input type="submit" value="Atualizar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}
                {message && <Message msg={message} type="success" />}

            </form>

        </div>
    )
}

export default EditProfile