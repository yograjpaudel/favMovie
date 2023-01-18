import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import Constant from "./Constants.json";

const API_URL = "http://www.omdbapi.com/?apikey="+Constant.API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    const searchResult = data.Search;
    let moviesWithIds = searchResult.map((movie, index) => {
      movie.id = index
      return movie;
    });
    setMovies(moviesWithIds);
  };

  useEffect(() => {
    searchMovies("Iron Man");
  }, []);

  return (
    <div className="app">
      <h1>FavMovies</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={
            () => searchTerm !== '' ? searchMovies(searchTerm) : ''
          } 
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="container">
          <h2>No movie found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
