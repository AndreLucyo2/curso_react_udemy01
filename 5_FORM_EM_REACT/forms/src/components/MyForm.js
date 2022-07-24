import './MyForm.css'
import { useState } from 'react';

function MyForm() {
    /* 3 - Gerenciar dados do input - obter o dado digitado */
    const[name, setName] = useState();
    const[email, setEmail] = useState();

    //Lidar com o nome:
    const handleName = (e) => {
        setName(e.target.value);
    }

    //pega o stado alterado no momento peganod o valor do unput
    //vai imprimir a cada rendereização do componente.
    console.log(name)
    console.log(email)


    return (
        <div>
            <form>
                {/* 1 - Criando o form */}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite o seu nome"
                        onChange={handleName}
                    />
                </div>

                {/* 2 - Label envolvendo o input - REcomendado! */}
                <label>
                    <span>E-mail</span>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder="Digite o seu e-mail" 
                    onChange={(e)=>setEmail(e.target.value)}/>
                </label>
                <input type="button" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm