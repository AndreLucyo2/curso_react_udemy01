import { useEffect, useState } from "react";

// 4 - custom hook dinamico : recebe uma url da API retorna os dados
export const useFetch = (url) => {

    //trabalhar com os recebe os dados da API, inicia como null
    const [data, setData] = useState(null);

    //--------------------------------------------------------------------------------------
    // 5 - refatorando post
    const [config, setConfig] = useState(null);//recebe as config. da rrequisição
    const [method, setMethod] = useState(null);//metodos https
    const [callFetch, setCallFetch] = useState(false);//semrpe que alterar traz os dados novamente


    //--------------------------------------------------------------------------------------
    // 6 - estado de loading
    const [loading, setLoading] = useState(false);

    //--------------------------------------------------------------------------------------
    // 7 - Tratando erros
    const [error, setError] = useState(null);

    //--------------------------------------------------------------------------------------
    // 8 - recebe o Id para o Delete : desafio 6
    const [itemId, setItemId] = useState(null);

    //--------------------------------------------------------------------------------------
    // 5 - refatorando post: fica dinamico, altera as configs conforme o metodo
    const httpConfig = (data, method) => {

        //fica dinamico para cada tipo de metodo
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            setMethod("POST");

            //pode receber um delete: Desafio 6
        } else if (method === "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            setMethod("DELETE");

            //Aqui seta o id para deletar:
            setItemId(data);
        }

    };


    //--------------------------------------------------------------------------------------
    //cria a requisição: se mudar a url executa novamente
    useEffect(() => {
        //carrega os dados
        const fetchData = async () => {

            // 6 - estado de loading : Inicio
            setLoading(true);

            // 7 - Tratando erros
            try {
                //dispara uma request
                const resp = await fetch(url);
                //recebe os dados e converte para json
                const json = await resp.json();
                //seta os dados no useState para retornar os dados 
                setData(json);
                setMethod(null);
                setError(null);

            } catch (error) {
                console.log(error.message);
                //Definir o retorno do erro
                setError("Ops! Algo deu errado! Tente mais tarde!");
            }

            // 6 - estado de loading : Encerra
            setLoading(false);
        };

        //executa a função
        fetchData();

        //Adicionamos dados no sistema , da um callFetche me atualiza
    }, [url, callFetch]);//usa a url como dependencia, pois se mudar a url ele dispara novamente


    //--------------------------------------------------------------------------------------
    // 5 - refatorando post : caso tiver alguma alteração na config, dispara novamente 
    useEffect(() => {

        const httpRequest = async () => {

            //checa o tipo do metodo:
            if (method === "POST") {

                // 5 - refatorando post : fica dinamico, pode ser outras urls, e outras confign
                let fetchOptions = [url, config];
                //recebe os dados: 
                const resp = await fetch(...fetchOptions);

                const json = await resp.json();
                //sempre dispara uma requisição quando o post for concluido
                setCallFetch(json);

                //pode receber um delete: Desafio 6
            } else if (method === "DELETE") {

                //Montar a url de remoção: metodo delete
                const deleteUrl = `${url}/${itemId}`;

                //recebe algo como respota:
                const resp = await fetch(deleteUrl, config);

                const json = await resp.json();
                //sempre dispara uma requisição quando o post for concluido
                setCallFetch(json);
            };
        };

        //chama a função: fica dinamico independete do metodo
        httpRequest();

    }, [config, method, url]);//array de dependencias - sendo monitorados

    //retorna os dados da response da requisição: exporta o que quer usar
    //Exporta as configs , para poder alterar
    //Exporta o loading
    //Exporta o retorno do erro
    return { data, httpConfig, loading, error };
}