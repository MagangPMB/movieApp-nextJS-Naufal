import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import MovieCard from "../artifacts/MovieCard";

const MoviesSection = ({ data, header }) => {
  const moviesDefault = data.data.results;

  const [movies, setMovies] = useState(moviesDefault);

  const searchMovies = async (e) => {
    if (e.length < 1) {
      setMovies(moviesDefault);
    }
    if (e.length > 0) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${e}&api_key=40a2a6297df6cc19c9ed6c934fa0763b&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
    }
  };

  const debounceSearch = debounce((e) => searchMovies(e), 500);

  return (
    <div className='w-3/4 mx-auto mt-10 pb-10'>
      <div className='relative xl:w-3/4 sm:w-full mx-auto'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <svg
            aria-hidden='true'
            className='w-5 h-5 text-gray-500 dark:text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
        </div>
        <input
          type='search'
          className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Find your movies here...'
          onChange={(e) => debounceSearch(e.target.value)}
        />
      </div>
      <h1 className='text-3xl font-bold text-white mt-20'>
        {movies.length != 0 && header}
      </h1>
      <div className='flex flex-wrap gap-3 mt-10  max-[640px]:justify-center'>
        {movies.length < 1 ? (
          <div className='flex flex-col items-center mx-auto mt-40'>
            <h1 className='text-2xl font-bold text-white'>No movies found</h1>
            <p className='text-white'>Try something else</p>
          </div>
        ) : (
          movies?.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.title}
              date={movie.release_date}
              rating={movie.vote_average}
              img={movie.poster_path}
              id={movie.id}
              language={movie.original_language}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MoviesSection;
