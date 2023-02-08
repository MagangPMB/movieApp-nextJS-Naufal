import React, { useState } from "react";
import Image from "next/image";

export async function getServerSideProps(context) {
  const apiKey = process.env.APIKEY;
  const baseUrl = process.env.BASEURL;
  const id = context.params.id;
  const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const DetailsMovie = ({ data }) => {
  console.log(data);
  const [movie, setMovie] = useState(data);

  return (
    <>
      <div className='mx-auto w-[80%] pb-10'>
        <div className='flex flex-col items-center mt-10'>
          <Image
            priority
            src={
              movie.backdrop_path != null
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : "https://via.placeholder.com/700x384.png?text=Sorry+There's+No+Image"
            }
            width={700}
            height={384}
            className='rounded-lg'
            alt={movie.title}
          />
        </div>

        <div className='flex flex-col mt-10'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-white text-3xl font-bold mb-1'>
                {movie.title}
              </h1>
              <p className='text-white italic mb-2'>{movie.tagline}</p>
            </div>
          </div>
          <div className='flex flex-wrap mt-2 items-center'>
            {movie.genres.map((genre, index) => (
              <span
                key={index}
                className='bg-green-100 mb-2 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                {genre.name}
              </span>
            ))}
            <p className='text-white mb-2'>
              {movie.vote_average != 0
                ? movie.vote_average.toString().slice(0, 3)
                : "N/A"}
              ⭐
            </p>
          </div>
          <div>
            <p className='text-white mt-4'>
              {movie.overview != "" ? movie.overview : "No Overview Yet"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsMovie;
