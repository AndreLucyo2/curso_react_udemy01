import "./Search.css";

// hooks
import { useEffect } from "react";
import { useQuery } from "../../hooks/useQuery";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// components
import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

// Redux
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
    //obtem a query da url e tranforma em objeto
    const query = useQuery();
    //obtem o valor do paremetro "q", pode pegar mais parametros caso tiver
    const search = query.get("q");

    const dispatch = useDispatch();

    const resetMessage = useResetComponentMessage(dispatch);

    const { user } = useSelector((state) => state.auth);
    const { photos, loading } = useSelector((state) => state.photo);

    // Load all photos, é disparado conforme o dispatch e a busca
    useEffect(() => {
        //faz a busca nas fotos:
        dispatch(searchPhotos(search));
    }, [dispatch, search]);

    //like a photo
    const handleLike = (photo = null) => {
        dispatch(like(photo._id));

        resetMessage();
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div id="search">
            <h2>Você está buscando por: {search}</h2>
            {photos && photos.map((photo) => (
                <div key={photo._id}>
                    <PhotoItem photo={photo} />
                    <LikeContainer photo={photo} user={user} handleLike={handleLike} />
                    <Link className="btn" to={`/photos/${photo._id}`}>
                        Ver mais
                    </Link>
                </div>
            ))}
            {/* Caso nao tiver fotos cadastradas*/}
            {photos && photos.length === 0 && (
                <h2 className="no-photos">
                    Ainda não há fotos publicadas,{" "}
                    <Link to={`/users/${user._id}`}>clique aqui</Link> para começar.
                </h2>
            )}
        </div>
    );
};

export default Search