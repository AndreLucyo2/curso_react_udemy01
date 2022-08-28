import "./Profile.css";

import { uploads } from "../../utils/config";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
//icons
import {
    BsFillEyeFill,
    BsPencilFill,
    BsXLg
} from "react-icons/bs";

// hooks
import { useEffect, useState, useRef } from "react";
//selecionar contextos e disparar funções
import { useSelector, useDispatch } from "react-redux";
//para pegar parametros passados  da url
import { useParams } from "react-router-dom";


// Redux


const Profile = () => {
    return (
        <div>Profile</div>
    )
}

export default Profile