import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";


const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = movies?.[0];
  if (!mainMovie) return null;

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <VideoBackground movieId={id} />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black/10"></div>

      <div className="absolute top-[25%] left-[5%] z-10 text-white max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.9)]">
          {original_title}
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium drop-shadow-[1px_1px_2px_rgba(0,0,0,0.85)]">
          {overview}
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-white text-black text-lg font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition">
            ▶ Play
          </button>
          <button className="bg-gray-700 bg-opacity-70 text-white text-lg font-semibold px-6 py-2 rounded-md hover:bg-gray-600 transition">
            ℹ More Info
          </button>
        </div>
      </div>

    </div>
  );
};

export default MainContainer;
