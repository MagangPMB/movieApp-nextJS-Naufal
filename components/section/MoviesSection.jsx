import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import MovieCard from "../artifacts/MovieCard";
import Image from "next/image";
import Link from "next/link";
import { useSWR } from "swr";

const MoviesSection = ({ data, header }) => {
  const [movies, setMovies] = useState(data.data.results);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [showAllMovies, setShowAllMovies] = useState(false);

  const searchMovies = async (e) => {
    if (e.length < 1) {
      setSearchedMovies([]);
    }
    if (e.length > 0) {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${e}&api_key=40a2a6297df6cc19c9ed6c934fa0763b&language=en-US&page=1`
      );
      const data = await res.json();
      setSearchedMovies(data.results);
      console.log(data.results);
    }
  };

  const debounceSearch = debounce((e) => searchMovies(e), 500);

  return (
    <div className='w-3/4 mx-auto mt-10 pb-10'>
      <h1 className='text-center mb-10 text-6xl px-2.5 py-0.5 rounded font-bold text-white mt-20'>
        Nefliks<span className='text-blue-500'>.</span>
      </h1>
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

      {searchedMovies.length > 0 && (
        <div className='relative mt-5'>
          <div className='absolute bg-gray-300 max-h-[440px] overflow-y-scroll w-full p-5 rounded-lg'>
            <ul>
              {searchedMovies.length > 0 &&
                searchedMovies.map((movie, index) => (
                  <Link
                    href={`/${movie.id}`}
                    key={index}
                    className='text-white flex flex-col mb-3 hover:bg-slate-100'>
                    <div className='flex'>
                      <div className=''>
                        <Image
                          src={
                            movie.poster_path != null
                              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                              : "https://via.placeholder.com/256x384.png?text=Sorry+There's+No+Image"
                          }
                          width={100}
                          height={150}
                          alt='movie poster'
                        />
                      </div>
                      <div className='ml-3 text-gray-900'>
                        <h1 className='text-lg font-bold'>{movie.title}</h1>
                        <p className='text-sm'>{movie.vote_average + "⭐"}</p>
                        <p className='text-sm'>
                          {movie.overview.length > 20
                            ? movie.overview.substring(0, 200) + "..."
                            : movie.overview}
                        </p>
                      </div>
                    </div>
                    <div className='w-full h-0.5 mt-2 bg-gray-100'></div>
                  </Link>
                ))}
            </ul>
            {/* {searchedMovies.length > 5 && (
              <button
                className='flex mx-auto bg-blue-500 px-5 py-3 rounded-lg text-white'
                onClick={() => setShowAllMovies(!showAllMovies)}>
                {showAllMovies === true ? "Show less" : "Show all"}
              </button>
            )} */}
          </div>
        </div>
      )}

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
