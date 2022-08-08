import { useState, useEffect } from "react";
import { db } from "../firebase/config";

//firebase: metodos para trabalhar com dados
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";

//coleção sáo os dados, texto de busca, uid para filtrar
export const useFetchDocuments = (docCollection, search = null, uid = null) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //limpeza de momoria: deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    //mapea elementos para facilitar o tratamento de dados
    useEffect(() => {

        async function loadData() {
            //valida se o hook ainda faz efeito
            if (cancelled) {
                return;
            }

            //ativa o loading de carregando dados
            setLoading(true);

            //referencia da colção: de qual banco e qual entidade
            const collectionRef = await collection(db, docCollection);

            try {
                //consulta:
                let q;

                if (search) {
                    //consulta por tags, ordenado mais novos primeiros
                    q = await query(
                        collectionRef,
                        where("tags", "array-contains", search),
                        orderBy("createdAt", "desc")
                    );

                } else {
                    //consulta mais simples, traz o que tem ordenado mais novos primeiros
                    q = await query(
                        collectionRef,
                        orderBy("createdAt", "desc")
                    );
                };

                //monitora e atualiza os dados se tiver alterações
                await onSnapshot(q, (querySnapshot) => {

                    //desestrutura o que vem do firebase:
                    setDocuments(
                        //cria um novo objeto, deixa semelhanto ao que é criado
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                });

            } catch (error) {
                console.log(error);
                setError(error.message);
            }

            //desativa o loading
            setLoading(false);

        };

        //toda vez que cai aqui chama o loadData
        //executa quando docCollection, search, uid, cancelled forem alterados
        loadData();

    }, [docCollection, search, uid, cancelled]);

    console.log(documents);

    //limpeza de momoria:
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    //retornos:retorna como objeto para acessar os itens individualmente onde for necessario
    return { documents, loading, error };

};