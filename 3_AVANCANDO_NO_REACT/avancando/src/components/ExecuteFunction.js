
function ExecuteFunction({minhaFuncao}) {
  return (
    <div>
        {/* Executa a função recebida do pai quando clicar*/}
        <button onClick={minhaFuncao}>Clique aqui e execute a função que o pai mantou!</button>
    </div>
  )
}

export default ExecuteFunction