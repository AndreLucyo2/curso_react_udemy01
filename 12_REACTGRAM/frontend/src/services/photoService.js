import { api, requestConfig } from "../utils/config";

// Publish an user's photo, manda tru no ultimo argumento pois tem foto envolvida
const publishPhoto = async (data, token) => {
    //monta a request
    const config = requestConfig("POST", data, token, true);

    try {
        //manda a requisição para a api
        const res = await fetch(api + "/photos", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

// Get user photos: como é uma rota privada precisa do ide e do token
const getUserPhotos = async (id, token) => {
    //monta a request: nao recebe dados mas recebo o token
    const config = requestConfig("GET", null, token);

    try {
        //dispara a requisição do para a API com o ID
        const res = await fetch(api + "/photos/user/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

// Get photo, pega o id pela url
const getPhoto = async (id) => {
    const config = requestConfig("GET");

    try {
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};


// Delete a photo, dele a foto postada pelo usuário, e percisa de autenticação
const deletePhoto = async (id, token) => {
    const config = requestConfig("DELETE", null, token);

    try {
        //api
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};


// Update a photo
const updatePhoto = async (data, id, token) => {
    //monta a request
    const config = requestConfig("PUT", data, token);

    try {
        //api
        const res = await fetch(api + "/photos/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;
    } catch (error) {
        console.log(error);
    }
};

const photoService = {
    publishPhoto,
    getUserPhotos,
    deletePhoto,
    updatePhoto,
    getPhoto,
};

export default photoService;