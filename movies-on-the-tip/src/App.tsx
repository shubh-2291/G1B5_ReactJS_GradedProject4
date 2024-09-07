import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './component/Header';
import MoviesInTheatre from './component/MoviesInTheatre';
import UpcomingMovies from './component/UpcomingMovies';
import TopRatedIndians from './component/TopRatedIndians';
import { movieOptions } from './util/movieOptions';
import TopRatedMovies from './component/TopRatedMovies';
import FavouriteMovies from './component/FavouriteMovies';
import MovieDetails from './component/MovieDetails';

import './App.css';

const Options: movieOptions[] = [
  movieOptions.moviesInTheatre,
  movieOptions.upcomingMovies,
  movieOptions.topRatedIndianMovies,
  movieOptions.topRatedMovies,
  movieOptions.favouriteMovies
]

function App() {

  const [movieChoice, setMovieChoice] = useState(Options[0]);
  const [searchValue, setSearchValue] = useState<string>("");

  const showOption = (option: movieOptions) => {
    setMovieChoice(option);
  }

  return (
    <Routes>
      <Route path='/' element={
        <div className="App">
          <Header options={Options} showOption={showOption} movieChoice={movieChoice} onSearch={setSearchValue} />
          {movieChoice === movieOptions.moviesInTheatre && <MoviesInTheatre searchValue={searchValue} />}
          {movieChoice === movieOptions.upcomingMovies && <UpcomingMovies searchValue={searchValue} />}
          {movieChoice === movieOptions.topRatedIndianMovies && <TopRatedIndians searchValue={searchValue} />}
          {movieChoice === movieOptions.topRatedMovies && <TopRatedMovies searchValue={searchValue} />}
          {movieChoice === movieOptions.favouriteMovies && <FavouriteMovies title='Favourite' searchValue={searchValue} />}
        </div>
      } />
      <Route path='/:endpoint/:id' Component={MovieDetails} />
    </Routes>


  );
}

export default App;
