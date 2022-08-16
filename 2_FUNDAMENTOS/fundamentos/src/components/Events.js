const Events = () => {

    const handleMyEvent = (e) => {
        console.log(e)
        alert('Me clicou!')
    }

    const renderSomething = (x) =>{
        if (x) {
            return <h1>Rendrizou true!</h1>
        } else{
            return <h1>Rendrizou false!</h1>            
        }
    }

    return (
        <div>
            <div>
                <button onClick={handleMyEvent}>Clique aqui!</button>
            </div>
            <div>
                <button onClick={() => { console.log('Me clicou InLine!') }}>Cliqui aqui tambem!</button>
            </div>
            <div>
                <button onClick={() => {
                    if (true) {

                        console.log('Isso é uma má pratica função em bloco aqui!')
                    }
                }}
                >
                    Cliqui aqui por favor!</button>
            </div>
            {renderSomething(true)}
            {renderSomething(false)}

        </div>
    )
}

export default Events