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
    //make an API call to GPT API and get movie results
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt =
      "Act as a movie recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ".only give me names of movies,comma separated like example result given ahead.Example result:Gadar,Sholay,Godzilla,Inception,Interstellar.";
    const result = await model.generateContent(prompt);
    const gptResults = await result.response;
    console.log(gptResults);
    if (!gptResults.candidates) {
      // TODO: handle error case
    }
    const gptMovies =
      gptResults.candidates?.[0]?.content?.parts?.[0]?.text.split(",");
    //for each movie we will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    //array of promises [pro1,pro2,pro3,pro4,pro5]

    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
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
