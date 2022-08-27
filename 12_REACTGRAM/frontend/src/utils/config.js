export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

//função para configurar as requisições prevendo todos os cenarios 
export const requestConfig = (method, data, token = null, image = null) => {
    let config;

    if (image) {
        config = {
            method: method,
            body: data,
            headers: {},
        };
    } else if (method === "DELETE" || data === null) {
        config = {
            method: method,
            headers: {},
        };
    } else {
        config = {
            method: method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    //valida se tem o token, para requisições que precisão de autenticação
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};