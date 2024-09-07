import axios from "axios";
import { IMovies } from "../types/IMovies";

const upcomingMovies = () => {
    const response = axios.get<IMovies[]>(`${process.env.REACT_APP_BASE_URL}/movies-coming`);
    return response.then(res => res.data)
}

export {
    upcomingMovies
}