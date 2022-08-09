import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

//FIREBASE
import { doc, deleteDoc } from "firebase/firestore";

//inicia sem loadin e sem erro
const initialState = {
    loading: null,
    error: null,
};

//REDUCER SWITCH  ---------------------------------------------------------------
const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "DELETED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

//DELETE DOC recebe uma coleção -----------------------------------------------------
export const useDeleteDocument = (docCollection) => {
    //reducer
    const [response, dispatch] = useReducer(deleteReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    //antes de fazer alguma ação vAlida se esta cancelada
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            //se precisa continuar com hook ou não, user pode  ter fechado a pagina no meio do processo
            dispatch(action);
        }
    };

    //DELETE DOC recebe uma coleção pelo id
    const deleteDocument = async (id) => {

        //carregando o delete
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            //monta a ref. do cocumento
            const deletedDocument = await deleteDoc(doc(db, docCollection, id));

            //Monta o metodo
            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument,
            });

        } catch (error) {
            //dispara o erro caso acontecer
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message });
        }
    };

    //encerra o componente:
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    //exporta a função do hook e a resposta
    return { deleteDocument, response };
};
