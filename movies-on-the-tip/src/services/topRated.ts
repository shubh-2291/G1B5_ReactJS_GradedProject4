import axios from "axios";
import { IMovies } from "../types/IMovies";

const topRated = () => {
    const response = axios.get<IMovies[]>(`${process.env.REACT_APP_BASE_URL}/top-rated-movies`);
    return response.then(res => res.data)
}

export {
    topRated
}