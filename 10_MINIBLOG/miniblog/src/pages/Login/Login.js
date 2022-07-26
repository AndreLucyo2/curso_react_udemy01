import styles from "./Login.module.css";

import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
    //imports:
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //hook importa a função de login
    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        //monta o obj user para submeter
        const user = {
            email,
            password,
        };

        //função de login
        const res = await login(user);

        console.log(res);
    };

    useEffect(() => {
        console.log(authError);
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Faça o login para poder utilizar o sistema</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>E-mail:</span>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="E-mail do usuário"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Senha:</span>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Insira a senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                {!loading && <button className="btn">Entrar</button>}
                {loading && (
                    <button className="btn" disabled>
                        Aguarde...
                    </button>
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
