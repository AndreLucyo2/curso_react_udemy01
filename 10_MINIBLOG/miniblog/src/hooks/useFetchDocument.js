import { useState, useEffect } from "react";
import { db } from "../firebase/config";
//permite pegar um docmento do nosso banco
import { doc, getDoc } from "firebase/firestore";

//precisa receber uma coleção para saber qual documento retornar pelo id
export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //limpeza de momoria: deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        //carrega um docment
        const loadDocument = async () => {

            //valida se o hook ainda faz efeito
            if (cancelled) {
                return;
            }

            //ativa o loading de carregando dados
            setLoading(true);

            try {

                //pega a referencia de um docment, banco, a coleção e o id do que quer
                const docRef = await doc(db, docCollection, id);
                //snap do docment firebase
                const docSnap = await getDoc(docRef);

                //recebe os dados que vieram 
                setDocument(docSnap.data());

            } catch (error) {

                console.log(error);
                //recebe o erro
                setError(error.message);
            }

            //desativa o loading
            setLoading(false);
        };

        //toda vez que cai aqui chama o loadDocument
        //executa quando docCollection, id
        loadDocument();

    }, [docCollection, id]);

    console.log(document);

    //limpeza de momoria: útil se mudar de pagina durante um carregamento 
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
};