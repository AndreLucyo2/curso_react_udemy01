const Events = () => {

    const handleMyEvent = (e) => {
        console.log(e)
        alert('Me clicou!')
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

        </div>
    )
}

export default Events