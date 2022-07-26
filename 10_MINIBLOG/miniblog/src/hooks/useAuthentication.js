import { db } from "../firebase/config";

//imports do Firebase, detalhe o firebase salva apenas e-mail e senha -- display name vai depois
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {

    //pegar possiveis erros e o loadins
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //como troca de paginas, cancela depois de as coisas derem certo
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    //Pega autenticação para manipular depois
    const auth = getAuth();

    //Evitar vazamento de memória : verifica o fluxo foi cancelado
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        };
    };

    //HOOK DO REGISTER ================================================================
    //Função para criar o usuário no firebase: deve ser assincrona
    const createUser = async (data) => {
        //valida se não esta cancelado o fluxo
        checkIfIsCancelled();

        //ativa o loading
        setLoading(true);

        //limpa erro:
        setError(null);

        //usa tratamento de erros:
        try {

            //Monta o objeto do usuario passando a função do firestore
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            //Firebase:  faz uma atualização para enviar o nome depois do ligin criado
            //Espera o usuario chegar e envia o nome
            await updateProfile(user, {
                displayName: data.displayName,
            });

            //desativa o loading.
            setLoading(false);

            //retorna o usuario criado
            return user;


        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            //Manipular as mensagens de erro para tornar mais amigavel para o usuario
            let systemErrorMessage;
            //trata a msg do erro:
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            //desativa o loading.
            setLoading(false);

            //recebe e manda a mensagem recebido:
            setError(systemErrorMessage);
        };
    };

    //HOOK DO LOGOUT =================================================================
    //logout - sign out
    const logout = () => {
        //Evitar vazamento de memória : verifica o fluxo foi cancelado
        checkIfIsCancelled();

        //usa do própio firebase
        signOut(auth);
    };

    //HOOK DO LOGIN ==================================================================
    //login - sig in
    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            //tenta logar:
            await signInWithEmailAndPassword(auth, data.email, data.password);

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

            let systemErrorMessage;

            //Tratamento de mensagens para ficar mais amigavel
            if (error.message.includes("user-not-found")) {
                systemErrorMessage = "Usuário não encontrado.";

            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Senha incorreta.";

            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            console.log(systemErrorMessage);

            //Passa o erro para o componente
            setError(systemErrorMessage);
        }

        console.log(error);

        //desativa o loading
        setLoading(false);
    };


    //TRATAMENTO DE MEMORI LIK =======================================================
    //colocar o cancelado como true assim que sai da pagina
    //é executado apenas um vez
    useEffect(() => {
        //tratamento de memoria:
        return () => setCancelled(true);
    }, []);

    //retorna para usar nas paginas
    return {
        auth,
        error,
        loading,
        createUser,
        login,
        logout,
    };

};