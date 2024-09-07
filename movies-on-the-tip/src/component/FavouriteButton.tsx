import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"

type Props = {
    button?: string,
    buttonIcon?: any,
    onclick: (event: any) => void,
    movieId: number
}

const FavouriteButton = ({ button="add to favourite", buttonIcon=faHeart, onclick, movieId}: Props) => {

    useEffect(() => {

    }, [])
    return (
        <button onClick={onclick} data-movie-id={movieId}>
            <span>{button}</span>
            <FontAwesomeIcon icon={buttonIcon} />
        </button>
    )
}

export default FavouriteButton;