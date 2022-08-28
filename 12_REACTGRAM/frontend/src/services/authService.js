import { api, requestConfig } from "../utils/config";

//---------------------------------------------------------------------------------
// SERVCES - Aqui vai no services vao ter as requisições e os dados que precisam fornecer par ao backend
// e acessar os end-points da API
//---------------------------------------------------------------------------------


//--  REGITER ---------------------------------------------------------------------
// Register a user, registrar um usuario 
//função http assincrona
//data= é os dados recebidos 
const register = async (data) => {

    //configura a requisição: monta a request
    const config = requestConfig("POST", data);

    try {
        //monta a request complesta apontando para a url correspondente 
        //no then recebe dados e converte para obj javascript
        //Se der erro, pega e retorna o erro
        const res = await fetch(api + "/users/register", config).then((res) => res.json()).catch((err) => err);

        //caso receber uma resposta: recebe a resposta do backend
        if (res) {
            //salva no localStorage, para poder recuperar depois e extrair depois para validar se esta logado
            localStorage.setItem("user", JSON.stringify(res));
        }

        //Retorna a resposta para ser utlizado nos demais pontos
        return res;

    } catch (error) {
        console.log(error);
    }
};

// Logout a user
const logout = () => {
    //remove os dados de acesso la da local storage
    localStorage.removeItem("user");
};


//retorna os objetos :
const authService = {
    register,
    logout,
};

export default authService;