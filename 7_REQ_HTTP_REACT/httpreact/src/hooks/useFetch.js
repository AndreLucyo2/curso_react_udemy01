import { useEffect, useState } from "react";

// 4 - custom hook dinamico : recebe uma url da API retorna os dados
export const useFetch = (url) => {
    //trabalhar com os recebe os dados da API, inicia como null
    const [data, setData] = useState(null);

    // 5 - refatorando post
    const [config, setConfig] = useState(null);//recebe as config. da rrequisição
    const [method, setMethod] = useState(null);//metodos https
    const [callFetch, setCallFetch] = useState(false);//semrpe que alterar traz os dados novamente

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

            setMethod(method);
        };

    };


    //cria a requisição: se mudar a url executa novamente
    useEffect(() => {
        //carrega os dados
        const fetchData = async () => {
            //dispara uma request
            const resp = await fetch(url);
            //recebe os dados e converte para json
            const json = await resp.json();
            //seta os dados no useState para retornar os dados 
            setData(json);
        };

        //executa a função
        fetchData();

        //Adicionamos dados no sistema , da um callFetche me atualiza
    }, [url, callFetch]);//usa a url como dependencia, pois se mudar a url ele dispara novamente


    // 5 - refatorando post : caso tiver alguma alteração na config, dispara novamente 
    useEffect(() => {

        const httpRequest = async () => {

            //checa o tipo do metodo:
            if (method === "POST") {

                // 5 - refatorando post : fica dinamico, pode ser outras urls, e outras confign
                let fetchOptions = [url, config];
                //recebe os dados: 
                const res = await fetch(...fetchOptions);

                const json = await res.json();
                //sempre dispara um GET quando o post for concluido
                setCallFetch(json);
            }
        };

        //chama a função: fica dinamico independete do metodo
        httpRequest();

    }, [config], method, url);

    console.log(config);

    //retorna os dados da response da requisição: exporta o que quer usar
    //Exporta as configs , para poder alterar
    return { data , httpConfig };
}