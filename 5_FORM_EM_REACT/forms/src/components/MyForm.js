import './MyForm.css'

function MyForm() {
    return (
        <div>
            <form>
                {/* 1 - Criando o form */}
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" placeholder="Digite o seu nome" />
                </div>

                {/* 2 - Label envolvendo o input - REcomendado! */}
                <label>
                    <span>E-mail</span>
                    <input type="email" name="email" placeholder="Digite o seu e-mail" />
                </label>
                <input type="button" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm