
import './Navbar.css'

import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (

        //Forma 1: utilizando Link direto, sem efeito de CSS
        // <nav>
        //     <Link to="/">Home</Link>
        //     <Link to="/about">Sobre</Link>
        // </nav>

        //Forma 2: utilizando NavLink e aplicando o CSS de forma direta
        // <nav>
        //     <NavLink to="/">Home</NavLink>
        //     <NavLink to="/about">Sobre</NavLink>
        // </nav>
        //Forma 3: utilizando NavLink e aplicando uma condição para estilizar CSS comforme esta ativo ou não
        <nav>
            <NavLink className={({ isActive }) => (isActive ? "active" : undefined)} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => (isActive ? "active2" : undefined)} to="/about">Sobre</NavLink>
        </nav>

    )
}

export default Navbar