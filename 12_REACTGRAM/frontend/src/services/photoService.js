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

const photoService = {
    publishPhoto,
};

export default photoService;