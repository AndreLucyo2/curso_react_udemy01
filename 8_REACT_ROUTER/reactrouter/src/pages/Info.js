//pegar informação que vem da rota
import { useParams } from 'react-router-dom'

const Info = () => {

    const { id } = useParams();

  return (
    <div>
        <h3>Mais informações sobre o produto: {id}</h3>
    </div>
  )
}

export default Info