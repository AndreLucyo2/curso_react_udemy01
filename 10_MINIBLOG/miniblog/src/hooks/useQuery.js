import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery() {
    const { search } = useLocation();
    
    //só executa quando o search sofrer alteração
    return useMemo(() => new URLSearchParams(search), [search]);
}
