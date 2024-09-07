import { useEffect, useState } from "react";
import MoviePoster from "./MoviePoster";
import { IMovies } from "../types/IMovies";
import './MovieType.css';
import { upcomingMovies } from "../services/upcomingMovies";
import ErrorDialog from "./common/error/Error";
import Spinner from "./common/spinner/Spinner";
import { Link } from "react-router-dom";
import { addToFavourite, getFavouriteMovies } from "../services/favourite";
import FavouriteButton from "./FavouriteButton";
import DialogMessage from "./common/dialogMessage/DialogMessage";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    title?: string,
    searchValue: string
}

const UpcomingMovies = ({ title = "Movies", searchValue }: Props) => {
    const [movies, setMovies] = useState<IMovies[]>([]);
    const [favouriteMovies, setFavouriteMovies] = useState<IMovies[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);


    const filteredMovie = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchValue.toLowerCase());
    })

    useEffect(
        () => {
            const fetchMovies = async () => {
                try {
                    const data = await upcomingMovies();
                    setMovies(data);
                    setLoading(false);
                } catch (error) {
                    setError(error as Error);
                    setLoading(false)
                }
            }

            fetchMovies();
        }, []
    )

    useEffect(
        () => {
            const fetchMovies = async () => {
                try {
                    const data = await getFavouriteMovies();
                    setFavouriteMovies(data);
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
        // console.log("clicked");
        const currentMovieId = parseInt(event.currentTarget.dataset.movieId as string)
        // console.log(event.currentTarget.dataset.movieId);
        const foundMovie = favouriteMovies.find(movie => parseInt(movie.id as any) === currentMovieId);
        if (foundMovie) {
            setShowErrorMessage(true);
            // console.log("Already in favourite");
        } else {
            const data: IMovies | undefined = movies.find(movie => parseInt(movie.id as any) === currentMovieId);
            addToFavourite(data)
            setShowSuccessMessage(true)
            // console.log("Add to favourite");
        }

    }

    const successMessageButtonHandle = () => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
    }

    if(showSuccessMessage || showErrorMessage){
        setTimeout(() => successMessageButtonHandle(), 3000)
    }

    return (
        <>

            <div className="moviePosterContainer">
                <h1>{title}</h1>
                <div className="moviePosters">
                    {
                        loading && error === null && 
                        (<Spinner/>)
                    }

                    {
                        !loading && error !== null &&
                        (<ErrorDialog>{error}</ErrorDialog>)
                    }

                    {
                        !loading && error === null && searchValue.length <= 0 && (
                            movies.map((movie, idx) => {
                                return (
                                    <div className="moviePoster" key={idx}>
                                        <Link to={`/movies-coming/${movie.id}`}>
                                            <MoviePoster movie={movie} key={idx}/>
                                        </Link>
                                        <FavouriteButton onclick={FavouriteButtonHandle} movieId={movie.id} />
                                    </div>
                                )
                            })
                        )
                    }
                    {
                        !loading && error === null && searchValue.length > 0 && filteredMovie.length !== 0 && (
                            filteredMovie.map((movie, idx) => {
                                return (
                                    <div className="moviePoster" key={idx}>
                                        <Link to={`/movies-coming/${movie.id}`}>
                                            <MoviePoster movie={movie} key={idx}/>
                                        </Link>
                                        <FavouriteButton onclick={FavouriteButtonHandle} movieId={movie.id} />
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
                        <DialogMessage icon={faCircleCheck} messageTitle="Success" message="successfully added to favourite" cancelToggle={successMessageButtonHandle} />
                    </div>)
            }
            {
                showErrorMessage && (
                    <div className="successs-message">
                        <DialogMessage icon={faCircleXmark} messageTitle="error" message="Already added in favourite" cancelToggle={successMessageButtonHandle} iconColor="red" iconSize={30} />
                    </div>)
            }
        </>
    )
}

export default UpcomingMovies;