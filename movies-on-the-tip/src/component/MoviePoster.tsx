import './MoviePoster.css';
import { IMovies } from '../types/IMovies';


type Props = {
    movie: IMovies,
}
const MoviePoster = ({ movie}: Props) => {

    const { title, posterurl } = movie;

    return (
        <div className='moviePoster'>
            <div className='imgContainer'>
                <img src={posterurl} alt={title} loading='lazy' />
            </div>
            <p>{title}</p>
        </div>
    )
}

export default MoviePoster;