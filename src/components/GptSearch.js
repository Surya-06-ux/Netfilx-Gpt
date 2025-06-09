import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen text-white">
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_URL}
          alt="background"
          className="w-full h-full object-cover opacity-100"
        />
      </div>
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
