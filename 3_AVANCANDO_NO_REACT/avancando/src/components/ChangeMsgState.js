
function ChangeMsgState({alterarMsg}) {
    const mensagens = ["Oi!", "Olá!", "Oi, Fui!"]

  return (
    <>
    <button onClick={()=>alterarMsg(mensagens[0])}>msg 1</button>
    <button onClick={()=>alterarMsg(mensagens[1])}>msg 2</button>
    <button onClick={()=>alterarMsg(mensagens[2])}>msg 3</button>
    </>
  )
}

export default ChangeMsgState