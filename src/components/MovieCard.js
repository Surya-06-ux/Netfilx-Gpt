import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null;

  return (
    <div className="min-w-[500px] md:min-w-[175px] transform transition-transform hover:scale-105 cursor-pointer">
      <img
        alt="Movie Poster"
        src={IMG_CDN_URL + posterPath}
        className="rounded-xl shadow-lg"
      />
    </div>
  );
};

export default MovieCard;
