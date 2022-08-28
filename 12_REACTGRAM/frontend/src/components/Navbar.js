//Styles
import "./Navbar.css"

// Components
import { NavLink, Link } from "react-router-dom";
//icons
import {
    BsSearch,
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill,
    BsArrowBarRight,
} from "react-icons/bs";

//Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


//Redux
import { logout, reset } from "../slices/authSlice";


const Navbar = () => {
    //pega a autenticação
    const { auth } = useAuth();
    //pega os dados do user que esta registrado 
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //ação de logout
    const handleLogout = () => {
        //so tem ação e limpa os dados do back
        dispatch(logout());
        dispatch(reset());

        //manda para a login, pois o user esta desconectado
        navigate("/login");
    };


    return (
        <nav id="nav">
            <Link to="/">ReactGram</Link>
            <form id="search-form">
                <BsSearch />
                <input type="text" />
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                        <li>
                            <NavLink to="/">
                                <BsHouseDoorFill />
                            </NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to={`/users/${user._id}`}>
                                    <BsFillCameraFill />
                                </NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/profile">
                                <BsFillPersonFill />
                            </NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout}>
                                <BsArrowBarRight />
                            </span>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login">Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Cadastrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav >
    )
}

export default Navbar