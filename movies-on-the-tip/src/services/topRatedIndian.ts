import axios from "axios";
import { IMovies } from "../types/IMovies";

const topRatedIndian = () => {
    const response = axios.get<IMovies[]>(`${process.env.REACT_APP_BASE_URL}/top-rated-india`);
    return response.then(res => res.data)
}

export {
    topRatedIndian
}