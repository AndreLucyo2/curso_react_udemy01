import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//serve para detectar se o user esta logado
export const useAuth = () => {
    //seletor para pegar o dado do store
  const { user } = useSelector((state) => state.auth);

  //se esta autenticado
  const [auth, setAuth] = useState(false);
  //a aplicação nao deve mostrar nada enquanto oser nao estiver logado - inicia como loading
  const [loading, setLoading] = useState(true);

  //é ativado sempre que o user modar
  useEffect(() => {

    //valida se tem user = logado se nao tem , nao esta logado
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    //validou se esta ok, terminou o loading
    setLoading(false);

  }, [user]);

  //vai poder verificar se o user esta logado e pode utilizar em varios pontos da aplicação
  return { auth, loading };
};
