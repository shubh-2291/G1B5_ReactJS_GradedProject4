import { useEffect, useState } from "react";
import MoviePoster from "./MoviePoster";
import { IMovies } from "../types/IMovies";
import './MovieType.css';
import { getFavouriteMovies, removeFavouriteMovie } from "../services/favourite";
import ErrorDialog from "./common/error/Error";
import Spinner from "./common/spinner/Spinner";
import { Link } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import FavouriteButton from "./FavouriteButton";
import DialogMessage from "./common/dialogMessage/DialogMessage";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

type Props = {
    title?: string,
    searchValue: string
}

const FavouriteMovies = ({ title = "Movies", searchValue }: Props) => {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const filteredMovie = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    })

    useEffect(
        () => {
            const fetchMovies = async () => {
                try {
                    const data = await getFavouriteMovies();
                    setMovies(data);
                    setLoading(false);
                } catch (error) {
                    setError(error as Error);
                    setLoading(false)
                }
            }

            fetchMovies();
        }, [showSuccessMessage]
    )

    const FavouriteButtonHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        const currentMovieId = parseInt(event.currentTarget.dataset.movieId as string)
        removeFavouriteMovie(currentMovieId);
        setShowSuccessMessage(true);
    }

    const successMessageButtonHandle = () => {
        setShowSuccessMessage(false);
    }

    if(showSuccessMessage ){
        setTimeout(() => successMessageButtonHandle(), 3000)
    }

    return (
        <>

            <div className="moviePosterContainer">
                <h1>{title}</h1>
                <div className="moviePosters">
                    {
                        loading && error === null &&
                        (<Spinner />)
                    }

                    {
                        !loading && error !== null &&
                        (<ErrorDialog>{error}</ErrorDialog>)
                    }

                    {
                        !loading && error === null && searchValue.length <= 0 &&(
                            movies.map((movie, idx) => {
                                return (
                                    <div className="moviePoster" key={idx}>
                                        <Link to={`/favourite/${movie.id}`}>
                                            <MoviePoster movie={movie} key={idx} />
                                        </Link>
                                        <FavouriteButton button="remove from favourite" buttonIcon={faXmark} onclick={FavouriteButtonHandle} movieId={movie.id}/>
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        !loading && error === null && movies.length === 0 && (<div className="noResult">No movies found</div>)
                    }
                    {
                        !loading && error === null && searchValue.length > 0 && filteredMovie.length !== 0 && (
                            filteredMovie.map((movie, idx) => {
                                return (
                                    <div className="moviePoster" key={idx}>
                                        <Link to={`/favourite/${movie.id}`}>
                                            <MoviePoster movie={movie} key={idx}/>
                                        </Link>
                                        <FavouriteButton button="remove from favourite" buttonIcon={faXmark} onclick={FavouriteButtonHandle} movieId={movie.id}/>
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        !loading && error === null && searchValue.length > 0 && filteredMovie.length === 0 && (<div className="noResult">No result found</div>)
                    }
                </div>
            </div>
            {
                showSuccessMessage && (
                    <div className="successs-message">
                        <DialogMessage icon={faCircleCheck} messageTitle="Success" message="successfully removed from favourite" cancelToggle={successMessageButtonHandle} />
                    </div>)
            }
        </>
    )
}

export default FavouriteMovies;