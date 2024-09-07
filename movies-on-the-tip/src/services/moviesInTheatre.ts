import axios from "axios";
import { IMovies } from "../types/IMovies";

const getMoviesInTheatre = () => {
    const response = axios.get<IMovies[]>(`${process.env.REACT_APP_BASE_URL}/movies-in-theaters`);
    return response.then(res => res.data)
}

export {
    getMoviesInTheatre
}