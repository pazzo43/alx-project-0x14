// interfaces/index.ts
import { ReactNode } from "react";

export interface ComponentProps {
  children: ReactNode
}

export interface ButtonProps {
  title: string
  action?: () => void
}

// Interface used by the MovieCard component to display data
export interface MovieProps {
  id?: string
  posterImage: string
  releaseYear: string
  title: string
}

// API Response Sub-interfaces
interface PrimaryImage {
  url: string
}

interface TitleText {
  text: string
}

interface ReleaseYear {
  year: string
}

// Interface for the raw movie object returned from the MoviesDatabase API
export interface MoviesProps {
  id: string
  primaryImage: PrimaryImage
  titleText: TitleText
  releaseYear: ReleaseYear
}

# .env.local
# This key is strictly for server-side (Next.js API Routes) use only.
MOVIE_API_KEY=PASTE_YOUR_API_KEY_HERE

// components/commons/MovieCard.tsx
import { MovieProps } from "@/interfaces"
import Image from "next/image"
import React from "react"

const MovieCard: React.FC<MovieProps> = ({ title, posterImage, releaseYear }) => {
  return (
    <div className="h-[563px]">
      <div>
        <Image 
          className="h-[430px] w-full rounded-md hover:cursor-pointer object-cover" 
          src={posterImage || "/placeholder.png"} // Use placeholder if image is missing
          width={400} // Increase width/height for better image quality/layout
          height={600} 
          alt={title} 
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold truncate">{title}</p>
        <p className="text-xl text-[#E2D609]">{releaseYear}</p>
      </div>
    </div>
  )
}

export default MovieCard

// components/commons/Loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4 animate-pulse">
          Loading...
        </h1>
        <p className="text-lg text-gray-300">Please wait, we&apos;re getting next set of movies ready for you.</p>
      </div>
    </div>
  );
};

export default Loading;

// pages/api/fetch-movies.ts
import { MoviesProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (request: NextApiRequest, response: NextApiResponse)  {
  const apiKey = process.env.MOVIE_API_KEY;

  // 1. Check HTTP Method
  if (request.method !== "POST") {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end(`Method ${request.method} Not Allowed in here`);
  }

  // 2. Check API Key Security (Error Handling)
  if (!apiKey) {
      return response.status(500).json({ error: "Server configuration error: MOVIE_API_KEY is missing." });
  }

  try {
    const { year, page, genre } = request.body;
    const date = new Date();
    
    // Construct the query string parameters
    const queryYear = year || date.getFullYear();
    const queryGenre = genre && genre !== "All" ? `&genre=${genre}` : '';

    const resp = await fetch(
      `https://moviesdatabase.p.rapidapi.com/titles?year=${queryYear}&sort=year.decr&limit=12&page=${page}${queryGenre}`,
      {
        headers: {
          "x-rapidapi-host": "moviesdatabase.p.rapidapi.com",
          "x-rapidapi-key": `${apiKey}`,
        },
      }
    );

    // 3. Handle External API Errors (Fetch API Best Practice)
    if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        console.error("External API Error:", errorData);
        return response.status(resp.status).json({ error: errorData.message || "Failed to fetch movies from external API." });
    }

    const moviesResponse = await resp.json();
    const movies: MoviesProps[] = moviesResponse.results;

    // 4. Success Response
    return response.status(200).json({
      movies,
    });
  } catch (error) {
    console.error("API Route Internal Error:", error);
    return response.status(500).json({ error: "Internal server error during data fetching." });
  }
};

// pages/movies/index.tsx
import Button from "@/components/commons/Button";
import Loading from "@/components/commons/Loading";
import MovieCard from "@/components/commons/MovieCard";
import { MoviesProps } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";
import React from "react";

// The component doesn't need MProps if it fetches data client-side
const Movies: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const [year, setYear] = useState<number | null>(null)
  const [genre, setGenre] = useState<string>("All")
  const [movies, setMovies] = useState<MoviesProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  const fetchMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
        const response = await fetch('/api/fetch-movies', {
          method: 'POST',
          body: JSON.stringify({
            page,
            year, 
            genre: genre
          }),
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch movies");
        }

        const data = await response.json()
        const results: MoviesProps[] = data.movies
        
        // Only set movies if results exist, otherwise clear/maintain current
        if (results && results.length > 0) {
            setMovies(results);
        } else if (page > 1) {
            // If on page > 1 and no results, rollback page
            setPage(prev => prev > 1 ? prev - 1 : 1);
            setError("No more movies found for the current filter/page.");
        } else {
            setMovies([]);
            setError("No movies found for the selected filters.");
        }
        
    } catch (e: any) {
        console.error(e)
        setError(e.message || "Something went wrong during data fetching.")
        setMovies([])
    } finally {
        setLoading(false)
    }

  }, [page, year, genre])


  // Trigger fetch when page, year, or genre changes
  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])
  
  // Handlers for pagination and filtering
  const handlePrevious = () => {
      setPage(prev => prev > 1 ? prev - 1 : 1);
  }
  
  const handleNext = () => {
      setPage(prev => prev + 1);
  }
  
  const handleGenreChange = (newGenre: string) => {
      setGenre(newGenre);
      setPage(1); // Reset page on filter change
  }
  
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newYear = Number(event.target.value) || null;
      setYear(newYear);
      setPage(1); // Reset page on filter change
  }


  return (
    <div className="min-h-screen bg-[#110F17] text-white px-4 md:px-10 lg:px-44">
      <div className="py-16">
        <div className="flex flex-col md:flex-row justify-between mb-4 items-center space-x-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search for a movie... (Functionality coming soon)"
            className="border-2 w-full md:w-96 border-[#E2D609] outline-none bg-transparent px-4 py-2 rounded-full text-white placeholder-gray-400"
            disabled // Disable search input for now
          />

          <select
            onChange={handleYearChange}
            value={year || ''}
            className="border-2 border-[#E2D609] outline-none bg-[#110F17] px-4 md:px-8 py-2 mt-4 md:mt-0 rounded-full w-full md:w-auto text-white"
          >
            <option value="">Select Year</option>
            {
              [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y: number) => (
                <option value={y} key={y} className="bg-[#110F17] text-white">{y}</option>
              ))
            }
          </select>
        </div>

        <p className="text-[#E2D609] text-xl mb-6 mt-6">Online streaming | Page {page}</p>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-lg md:text-6xl font-bold">{year || 'Latest'} {genre} Movie List</h1>
          <div className="flex flex-wrap space-x-0 md:space-x-4 mt-4 md:mt-0">
            {
              ['All', 'Animation', 'Comedy', 'Fantasy', 'Action', 'Drama'].map((g: string, key: number) => (
                <Button 
                    title={g} 
                    key={key} 
                    action={() => handleGenreChange(g)} 
                    className={g === genre ? 'bg-[#E2D609] text-black border-none' : ''}
                />
              ))
            }
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
            <div className="mt-8 p-4 text-center bg-red-800 text-white rounded-lg">
                <p className="font-bold">Error:</p> {error}
            </div>
        )}

        {/* Movies output */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-10">
          {
            !loading && movies.length > 0 && movies.map((movie: MoviesProps, key: number) => (
              <MovieCard
                title={movie?.titleText.text}
                posterImage={movie?.primaryImage?.url || "/placeholder.png"}
                releaseYear={movie?.releaseYear.year}
                key={movie.id || key} // Use unique ID as key if available
              />
            ))
          }
          
          {/* If loading and no existing movies, show a loading message in the grid */}
          {loading && movies.length === 0 && (
              <div className="col-span-full text-center py-20">
                  <p className="text-gray-400">Fetching the first set of movies...</p>
              </div>
          )}
        </div>
        
        {/* Pagination buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <Button title="Previous" action={handlePrevious} disabled={page === 1 || loading} />
          <Button title={`Next (Page ${page + 1})`} action={handleNext} disabled={loading} />
        </div>
      </div>
      {
        loading && <Loading />
      }
    </div>
  )
}


export default Movies;

Verification
Save all files.

Ensure your MOVIE_API_KEY is set in .env.local.

Run the application: npm run dev

Navigate to http://localhost:3000, and click "Browse Movies" (or go directly to http://localhost:3000/movies).

The page should display the movie listing, showing the current year's movies, and you should be able to click the genre buttons and the pagination buttons to update the list, demonstrating the integrated data flow.


