import "./PhotoItem.css";

//caminho para os arquivos das imagens
import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

//recebe uma foto completa
const PhotoItem = ({ photo }) => {
    return (
        <div className="photo-item">
            {/* Valida se a foto esta carregada */}
            {photo.image && (
                <img src={`${uploads}/photos/${photo.image}`} alt={photo.title} />
            )}
            <h2>{photo.title}</h2>
            <p className="photo-author">
                Publicada por: {" "}
                <Link to={`/users/${photo.userId}`}>{photo.userName}</Link>
            </p>
        </div>
    );
};

export default PhotoItem;