const TemplateExpressions = () =>{

    const name = 'Andre Lucio'
    const data = {
        idade: 31,
        profissao:'Programador'
    }

    return(
        <div>
            <h1>Olá {name} tudo bem?</h1>
            <p>Você atua como {data.profissao}</p>
            <p>Calculo com js 4x4={4+4}</p>
            <p>{console.log('isto é um log!')}</p>
        </div>
    )
}

export default TemplateExpressions;