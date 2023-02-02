import Image from "next/image";
import Link from "next/link";
import React from "react";

const MovieCard = ({ title, rating, date, img, id, language }) => {
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var realeseDate = new Date(date).toLocaleDateString("en-US", options);
  return (
    <Link href={`/${id}`} className='flex flex-col w-64 mb-10'>
      <div>
        <Image
          src={
            img != null
              ? `https://image.tmdb.org/t/p/w500${img}`
              : "https://via.placeholder.com/256x384.png?text=Sorry+There's+No+Image"
          }
          width={256}
          height={384}
          className='rounded-lg'
          alt={title}
        />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col mt-4'>
          <p className='text-white text-md font-bold mb-1'>
            {title.length > 20 ? title.substring(0, 20) + "..." : title}
          </p>
          <p className='text-white text-sm flex gap-2'>
            {language == "en" ? (
              <Image
                width={20}
                height={20}
                alt='English'
                className='rounded-xl'
                src={"https://flagcdn.com/108x81/gb.png"}
              />
            ) : (
              ""
            )}
            {realeseDate}
          </p>
        </div>
        <p className='text-white mt-4'>{rating != 0 ? rating : "N/A"}⭐</p>
      </div>
    </Link>
  );
};

export default MovieCard;
