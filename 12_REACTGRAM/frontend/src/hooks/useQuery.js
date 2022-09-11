import { useLocation } from "react-router-dom";
//controla a rerendeização do compomente
import { useMemo } from "react";

//este hook serve para pegar parametros da query string
export function useQuery() {
    //extrai a query
    const { search } = useLocation();

    //Retorna a query string em forma de objeto, e assim tendo acesso aos parametros de busca
    //Segue a mesma ideia do useEfetch
    return useMemo(() => new URLSearchParams(search), [search]);
}
