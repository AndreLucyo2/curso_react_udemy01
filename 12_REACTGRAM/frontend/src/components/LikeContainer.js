import "./LikeContainer.css";

//importa os icones
import { BsHeart, BsHeartFill } from "react-icons/bs";

//recebe a foto o user e a função que executa o like
const LikeContainer = ({ photo, user, handleLike }) => {
    return (
        <div className="like">
            {/* Valida se veio os dados que precisa */}
            {photo.likes && user && (
                <>
                    {/*Faz a validação se o user ja deu like na foto sendo exibida*/}
                    {photo.likes.includes(user._id) ? (
                        //exibe o icone ja deu like
                        <BsHeartFill />
                    ) : (
                        //ação de dar o like ao clicar no icone
                        <BsHeart onClick={() => handleLike(photo)} />
                    )}
                    {/* Contagem de likes */}
                    <p>{photo.likes.length} like(s)</p>
                </>
            )}
        </div>
    );
};

export default LikeContainer;
