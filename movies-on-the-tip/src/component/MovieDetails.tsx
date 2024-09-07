import { useNavigate, useParams } from 'react-router-dom';
import './MovieDetails.css';
import { useEffect, useState } from 'react';
import getMovieDetails from '../services/movieDetails';
import { IMovies } from '../types/IMovies';
import Spinner from './common/spinner/Spinner';
import ErrorDialog from './common/error/Error';

const MovieDetails = () => {
    const { endpoint, id }: any = useParams();
    const [details, setDetails] = useState<IMovies>();
    const [showImg, setShowImg] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const helper = async () => {
            try {
                const details = await getMovieDetails(endpoint, id);
                setLoading(false);
                setError(null);
                setDetails(details);
            } catch (error) {
                setLoading(false)
                setError(error as Error);
            }
        }
        helper();
    }, [])

    const handleBackToHome = () => {
        navigate("/");
    }

    const showFullImg = () => {
        setShowImg(true)
    }

    const handleClose = () => {
        setShowImg(false);
    }

    return (
        <div className='movieDetails'>
            {!loading && error === null && (
                <>
                    <button onClick={handleBackToHome}>Back To Home</button>
                    <hr />
                    <div className='details'>
                        <div className='imgContainerForDetails' onClick={showFullImg}>
                            <img src={details?.posterurl} alt={details?.title} />
                            <div className='overlay'>Preview</div>
                        </div>
                        <div>
                            <h1>{details?.title}({details?.year})</h1>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Imdb Rating</td>
                                        <td>{details?.imdbRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Content Rating</td>
                                        <td>{details?.contentRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Average Rating</td>
                                        <td>{details?.averageRating}</td>
                                    </tr>
                                    <tr>
                                        <td>Duration</td>
                                        <td>{details?.duration}</td>
                                    </tr>
                                    <tr>
                                        <td>Genres</td>
                                        <td>{details?.genres.map((each) => each).join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <td>Actors</td>
                                        <td>{details?.actors.map((each) => each).join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <td>Release Date</td>
                                        <td>{details?.releaseDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Storyline</td>
                                        <td>{details?.storyline}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
            {
                showImg && (
                    <div className='imgBody'>
                        <button onClick={handleClose}>Close</button>
                        <div className='fullImageContainer'>
                            <img src={details?.posterurl} alt={details?.title} />
                        </div>
                    </div>
                )
            }
            {
                loading && error === null &&
                (<Spinner />)
            }

            {
                !loading && error !== null &&
                (<ErrorDialog>{error}</ErrorDialog>)
            }
        </div>
    )
}

export default MovieDetails;