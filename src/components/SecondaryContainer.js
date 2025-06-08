import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);

  return (
    movies && (
      <div className="relative z-20 bg-gradient-to-b from-black via-gray-900 to-black pb-10">
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies?.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies?.popularMovies} />
        <MovieList
          title={"Upcoming Movies"}
          movies={movies?.nowPlayingMovies}
        />
      </div>
    )
  );
};

export default SecondaryContainer;
