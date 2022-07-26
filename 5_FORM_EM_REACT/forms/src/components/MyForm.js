import './MyForm.css'
import { useState } from 'react';

function MyForm({ user }) {
    /* 3 - Gerenciar dados do input - obter o dado digitado */
    //Definir um estado inicial, carregando a pagina
    //carregar a pagina ja pre´-preenchida
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [bio, setBio] = useState(user ? user.bio : '');
    const [role, setRole] = useState(user ? user.role : '');

    //Lidar com o nome: handle = lidar com....
    const handleName = (e) => {
        setName(e.target.value);
    }

    //pega o stado alterado no momento peganod o valor do unput
    //vai imprimir a cada rendereização do componente.
    //console.log(name)
    //console.log(email)

    /* 6 - submetendo o forme sem pagereload  handle = lidar com.... */
    const handleSubmit = (event) => {
        //Para de recarregar a pagina:
        event.preventDefault();
        //aqui pode ser feita as validações:
        //Submete o form
        //faz o processamento
        console.log('Enviando formulario!');
        console.log(`Nome: ${name} \nEmail: ${email} \nFunção:${role} \nBio: ${bio}`);

        //Limpar o form: 
        setName("");
        setEmail("");
        setBio("");
        setRole("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* 1 - Criando o form */}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite o seu nome"
                        onChange={handleName}
                        value={name}
                    />
                </div>

                {/* 2 - Label envolvendo o input - REcomendado! */}
                {/* 5 - simplificando a manipulação de dados do input */}
                <label>
                    <span>E-mail</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite o seu e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                {/* 8 - unput textArea textos grandes */}
                <label>
                    <span>Bio</span>
                    <textarea
                        name="bio"
                        placeholder="Descrição do usuario"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    />
                </label>
                <label>
                    <span>Função no sistema</span>
                    <select name="role"
                        onChange={(e) => setRole(e.target.value)}
                        value={role} >
                        <option value="" hidden>Selecione...</option>
                        <option value="user">Usuário</option>
                        <option value="editor">Editor</option>
                        <option value="admin">administrador</option>
                    </select>
                </label>

                {/* 6 - Envio do forme */}
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm