import axios from "axios";
import { IMovies } from "../types/IMovies";

const getFavouriteMovies = () => {
    const response = axios.get<IMovies[]>(`${process.env.REACT_APP_BASE_URL}/favourite`);
    return response.then(res => res.data)
}

const removeFavouriteMovie = (id: number) => {
    const response = axios.delete(`${process.env.REACT_APP_BASE_URL}/favourite/${id}`);
    return response.then(res => res.data)
}

const addToFavourite = (data: IMovies | undefined) => {
    const response = axios.post(`${process.env.REACT_APP_BASE_URL}/favourite`, data, {
        headers: {
            'Content-Type':'application/json'
        }
    });
    return response.then(res => res.data)
}


export {
    getFavouriteMovies,
    removeFavouriteMovie,
    addToFavourite
}