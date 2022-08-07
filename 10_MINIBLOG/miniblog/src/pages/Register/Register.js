import styles from "./Register.module.css";

import { useEffect, useState } from "react";
//importa o hook das funções de autenticação do firebase
import { useAuthentication } from "../../hooks/useAuthentication";


const Register = () => {

  //Usetates:
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //Erros
  const [error, setError] = useState("");

  //importa os elementos da autenticação do firebase:
  const { createUser, error: authError, loading } = useAuthentication();

  //submit é assincrono
  const handleSubmit = async (e) => {
    //nao recarregar pagina automatico
    e.preventDefault();

    //erro inicia vazio
    setError("");

    //Cria o objeto para submeter
    const user = {
      displayName,
      email,
      password,
    };

    //Valida se as senhas converem
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    };


    //mecanismo de criação do user no firebase:
    const res = await createUser(user);

    //Exibir o objeto no console
    console.log(user);

  };

  //fica mapeando se o erro mudou:
  //alterna entre erro de front-end e erro do back-end
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError])


  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
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
        <label>
          <span>Confirmação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {/* Efeito enquanto aguarda o cadastro */}
        {!loading && <button className="btn">Cadastrar</button>}
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

export default Register;