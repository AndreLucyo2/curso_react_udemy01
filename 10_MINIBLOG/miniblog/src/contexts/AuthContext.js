//hooks react
import { useContext, createContext } from "react";

//contexto
const AuthContext = createContext();

//cria o provider para prover o contexto
export function AuthProvider({ children, value }) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//retorna o contesto sendo utilizado:
export function useAuthValue() {
  return useContext(AuthContext);
}
