import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

//FIREBASE
import { collection, addDoc, Timestamp } from "firebase/firestore";

//inicia sem loadin e sem erro
const initialState = {
    loading: null,
    error: null,
};

//REDUCER SWITCH  ---------------------------------------------------------------
const insertReducer = (state, action) => {

    //cada estado da inserção do documento
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null };
        case "INSERTED_DOC":
            return { loading: false, error: null };
        case "ERROR":
            return { loading: false, error: action.payload };
        default:
            return state;
    };
};

//INSERT DOC recebe uma coleção -----------------------------------------------------
export const useInsertDocument = (docCollection) => {
    //reducer
    const [response, dispatch] = useReducer(insertReducer, initialState);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
    //antes de fazer alguma ação vAlida se esta cancelada
    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            //se precisa continuar com hook ou não
            dispatch(action);
        }
    };

    //INSERT DOC recebe um document ------------------------------------------------
    //inserir o documento
    const insertDocument = async (document) => {

        //carregando o insert
        checkCancelBeforeDispatch({ type: "LOADING" });

        try {
            //cria o objeto e adiciona o campo de timestamp
            const newDocument = { ...document, createdAt: Timestamp.now() };

            //procura na coleção o documento que recebeu como argumento função
            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            //Monta o metodo
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument,
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
    return { insertDocument, response };
};
