import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// Redux

const Register = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

    };


    return (
        <div id="register">
            <h2>ReactGram</h2>
            <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" />
                <input type="text" placeholder="E-mail" />
                <input type="text" placeholder="Senha" />
                <input type="text" placeholder="Confirme a senha" />
                <input type="submit" value="Cadastrar" />

            </form>
            <p>
                Já tem conta? <Link to="/login">Clique aqui</Link>
            </p>
        </div>
    )
}

export default Register