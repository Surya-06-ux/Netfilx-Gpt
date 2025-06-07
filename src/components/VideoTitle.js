const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-[30%] left-[5%] z-10 text-white max-w-2xl">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-[2px_2px_4px_rgba(0,0,0,0.9)]">
        {title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.85)]">
        {overview}
      </p>
      <div className="mt-6 flex gap-4">
        <button className="bg-white text-black text-lg font-semibold px-6 py-2 rounded-md hover:bg-gray-300 transition">
          ▶ Play
        </button>
        <button className="bg-gray-700 text-white text-lg font-semibold px-6 py-2 rounded-md hover:bg-gray-600 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
