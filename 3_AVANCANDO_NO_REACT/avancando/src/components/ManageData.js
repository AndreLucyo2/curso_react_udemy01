import  {useState} from "react"

const ManageData = () => {
let someDate = 10

let [number, setNumber] = useState(15)

console.log(number)

  return (
    <div>
        <div>
            <p>Valor: {someDate}</p>
            <button onClick={()=>(someDate =15)}>Mudar Variavel</button>
        </div>
        <div>
            <p>Valor: {number}</p>
            <button onClick={()=> setNumber(30)}>Mudar Variavel UseState</button>
        </div>
    </div>
  )
}

export default ManageData