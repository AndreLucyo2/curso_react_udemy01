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

const Search = () => {
  return (
    <div>Search</div>
  )
}

export default Search