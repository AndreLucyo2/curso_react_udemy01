//Styles
import styles from './Navbar.module.css'

//react
import { NavLink } from 'react-router-dom'

//hook
import { useAuthentication } from "../hooks/useAuthentication";

//contexto para usuario autenticado
import { useAuthValue } from "../contexts/AuthContext";

const Navbar = () => {
    //user do contexto
    const { user } = useAuthValue();
    //hook função de logout
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" className={styles.brand}>
                Mini <span>Blog</span>
            </NavLink>
            <ul className={styles.links_list}>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
                        Home
                    </NavLink>
                </li>

                {/* Valida se nao tiver usuario logado ... */}
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}

                {/* Valida se tiver usuario logado exibe */}
                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Novo Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                )}

                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : '')}>
                        Sobre
                    </NavLink>
                </li>

                {/* Se tem usuario logado mostra menu Sair */}
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}


            </ul>
        </nav>
    )
}

export default Navbar