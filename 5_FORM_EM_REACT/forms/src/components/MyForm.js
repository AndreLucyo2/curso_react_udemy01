import './MyForm.css'

function MyForm() {
    return (
        <div>
            {/* 1 - Criando o form */}
            <form>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" placeholder="Digite o seu nome" />
                </div>
                <input type="button" value="Enviar" />
            </form>
        </div>
    )
}

export default MyForm