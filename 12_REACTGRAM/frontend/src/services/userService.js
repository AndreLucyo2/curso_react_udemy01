import { api, requestConfig } from "../utils/config";

// Get user details, busca os dados do usuario logado
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


const userService = {
    profile,
};

export default userService;