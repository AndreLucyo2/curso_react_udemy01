import { useEffect, useState } from "react";

// 4 - custom hook para GET : recebe uma url da API retorna os dados
export const useFetch = (url) => {
    //trabalhar com os recebe os dados da API, inicia como null
    const [data, setData] = useState(null);

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

    }, [url]);//usa a url como dependencia, pois se mudar a url ele dispara novamente

    //retorna os dados da response da requisição: exporta o que quer usar
    return { data };
}