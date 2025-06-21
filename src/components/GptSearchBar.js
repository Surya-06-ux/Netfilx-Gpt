import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { GEMINI_API_KEY, API_OPTIONS, OPENAI_KEY } from "../utils/constants";
// import openai from "../utils/openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    console.log(movie);

    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "%22&include_adult=false&page=1&sort_by=popularity.desc",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const handleGptSearchClick = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // downgraded to avoid quota
      const prompt =
        "Act as a movie recommendation system and suggest some movies for the query " +
        searchText.current.value +
        ". Only give me names of movies, comma separated like: Gadar, Sholay, Godzilla.";

      const result = await model.generateContent(prompt);
      const gptResults = result.response;

      if (!gptResults.candidates) {
        alert("Gemini API limit exceeded. Try again later.");
        return;
      }

      const gptMovies =
        gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTMDB(movie.trim())
      );
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Gemini API Error:", error);
      alert(
        "Gemini API Error: You may have exceeded your quota. Try again later."
      );
    }
  };

  return (
    <div className="pt-[30%] md:pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={searchText}
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
        />

        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey]?.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
