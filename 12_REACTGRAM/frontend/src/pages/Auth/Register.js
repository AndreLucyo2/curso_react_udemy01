import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux : importa os metodos vindo do slice
import { register, reset } from "../../slices/authSlice";

const Register = () => {
    //states:
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Permite usar as funções do redux
    const dispatch = useDispatch();

    //Extrai o estado que esta rolando no slice com o useSelector 
    //Permite pegar o estado e de qual reducer/context
    //o error é usado para mostrar na mensagem, vem do slice
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            confirmPassword,
        };

        console.log(user);

        //recebe os dados do user e manda para a API e aguarda a resposta
        dispatch(register(user));
    };


    // Clean all auth states : limpar os dados sempre que rolar um dispatch 
    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ''}
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email || ''}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password || ''}
                />
                <input
                    type="password"
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword || ''}
                />
                {/* valida o estado para amostrar as mensagens e controlar o stado do botão*/}
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" disabled value="Aguarde..." />}
                {error && <Message msg={error} type="error" />}                
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui</Link>
            </p>
        </div>
    )
}

export default Register