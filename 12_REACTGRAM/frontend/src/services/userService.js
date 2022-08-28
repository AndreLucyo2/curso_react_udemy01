import { api, requestConfig } from "../utils/config";

// Get user details, obtem os dados com base no usuário logado
const profile = async (user, token) => {
    const config = requestConfig("GET", user, token);

    try {
        const res = await fetch(api + "/users/profile", config)
            .then((res) => res.json())
            .catch((err) => err);

        //retorna o usuario para poder exibir os dados na tela
        return res;

    } catch (error) {
        console.log(error);
    }
};

// Update user details
const updateProfile = async (user, token) => {
    //esta requisição pode ter imegns
    const config = requestConfig("PUT", user, token, true);

    try {
        const res = await fetch(api + "/users/", config)
            .then((res) => res.json())
            .catch((err) => err);

        return res;

    } catch (error) {
        console.log(error);
    }
};

// Get user details by ID, obtem os dados do usuário com base no ID passado pela url
const getUserDetails = async (id) => {
    const config = requestConfig("GET");

    try {
        //obtem o user
        const res = await fetch(api + "/users/" + id, config)
            .then((res) => res.json())
            .catch((err) => err);

        //retorna a resposta
        return res;

    } catch (error) {
        console.log(error);
    }
};


const userService = {
    profile,
    updateProfile,
    getUserDetails,
};

export default userService;