import { faBars, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Header.css';
import { movieOptions } from "../util/movieOptions";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

type Props = {
    options: movieOptions[],
    showOption: (option: movieOptions) => void,
    movieChoice: movieOptions,
    onSearch: (value: string) => void
}

const Header = ({ options, showOption, movieChoice, onSearch }: Props) => {

    const [searchInput, setSearchInput] = useState<string>("");
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    
    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
        onSearch(event.target.value);
    }

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth)
    }, [])

    const ShowMenu = () => {
        setShowMenu(true);
    }

    const HideMenu = () => {
        setShowMenu(false);
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    return (
        <>
            {
                windowWidth > 900 ? (
                    <nav className='navbar'>
                        <div className='movie-types'>
                            {options.map((Option, idx) => {
                                return (
                                    <span
                                        className={movieChoice === Option ? "active" : ""}
                                        key={idx}
                                        onClick={() => showOption(Option)}
                                    >
                                        {Option}
                                    </span>
                                )
                            })}
                        </div>
                        <div className='search-box'>
                            <input type="text" placeholder='search movie' value={searchInput} onChange={searchHandler} />
                            <span>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                        </div>
                    </nav>
                ) : (
                    <>
                        {
                            !showMenu && (
                                <>
                                    <div className="hamburger-container">
                                        <div className="hamburger-icon" onClick={ShowMenu}>
                                            <FontAwesomeIcon icon={faBars} />
                                        </div>
                                        <div className='search-box'>
                                            <input type="text" placeholder='search movie' value={searchInput} onChange={searchHandler} />
                                            <span>
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            </span>
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            )
                        }
                        {
                            showMenu && (
                                <div className="menu">
                                    <div className="menuItems">
                                        {options.map((Option, idx) => {
                                            return (
                                                <div
                                                    className={movieChoice === Option ? "active" : ""}
                                                    key={idx}
                                                    onClick={() => {
                                                        showOption(Option)
                                                        HideMenu()
                                                    }}
                                                >
                                                    {Option}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="cancelIcon" onClick={HideMenu}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                </div>
                            )
                        }

                    </>
                )
            }
           
        </>
    )
}

export default Header;