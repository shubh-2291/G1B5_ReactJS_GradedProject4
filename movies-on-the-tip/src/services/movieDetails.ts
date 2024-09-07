import axios from "axios"
import { IMovies } from "../types/IMovies";

const getMovieDetails = (movieChoice: string, id: number) => {
   const response = axios.get<IMovies>(`${process.env.REACT_APP_BASE_URL}/${movieChoice}/${id}`);
   return response.then(res => res.data);
}

export default getMovieDetails;