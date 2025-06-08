import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || !Array.isArray(movies) || movies.length === 0) return null;

  return (
    <div className="px-6 md:px-12 py-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-4 tracking-wide drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
        {title}
      </h1>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
