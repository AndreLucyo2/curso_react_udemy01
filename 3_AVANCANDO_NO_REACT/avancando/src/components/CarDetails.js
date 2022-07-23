
function CarDetails({ brand, km, color, newCar }) {
    return (
        <div>
            <h2>Detalhes do carro:</h2>
            <ul>
                <li>Marca: {brand}</li>
                <li>Kilometragem: {km}</li>
                <li>Cor: {color}</li>
            </ul>
            {/* Validação condiciona se o carro é novo */}
            {newCar && <p>Carro novo!</p>}
        </div>
    )
}

export default CarDetails