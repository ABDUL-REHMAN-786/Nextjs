"use client"; // Enables client-side rendering for this component

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Helper function to fetch a random joke from the API
async function fetchRandomJoke(): Promise<JokeResponse> {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  return await response.json();
}

export default function EnhancedJokeGenerator() {
  // States for jokes, loading, error, and number of jokes
  const [jokes, setJokes] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jokeCount, setJokeCount] = useState<number>(1);

  // Function to fetch jokes based on the selected number of jokes
  const generateJokes = async () => {
    setLoading(true);
    setError(null); // Reset the error
    const newJokes: string[] = [];

    try {
      for (let i = 0; i < jokeCount; i++) {
        const joke = await fetchRandomJoke();
        newJokes.push(`${joke.setup} - ${joke.punchline}`);
      }
      setJokes(newJokes);
    } catch (e) {
      setError("Failed to fetch jokes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch new jokes on mount
  useEffect(() => {
    generateJokes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#6dd5ed] via-[#2193b0] to-[#f7797d] p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-[#333]">
          🎉 Random Joke Generator 🎉
        </h1>

        {/* Input field to select number of jokes */}
        <div className="mb-4 flex justify-center">
          <label className="mr-4 text-lg font-semibold text-[#555]">
            Select Number of Jokes:
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={jokeCount}
            onChange={(e) => setJokeCount(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-2 text-center text-lg w-16"
          />
        </div>

        {/* Joke Display or Loading/Error Message */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6 text-lg text-red-500 h-40 overflow-auto">
          {loading ? (
            <p>Loading jokes...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : jokes.length > 0 ? (
            jokes.map((joke, index) => <p key={index} className="mb-2">{joke}</p>)
          ) : (
            <p>No jokes to display.</p>
          )}
        </div>

        {/* Button to generate new jokes */}
        <Button
          onClick={generateJokes}
          className="bg-gradient-to-r from-[#ff8c00] to-[#ff0080] text-white font-bold py-3 px-6 rounded-full w-full transition-colors duration-300 transform hover:scale-105"
        >
          Generate New Jokes
        </Button>

        

        {/* Developer Credit */}
        <p className="mt-6 text-center text-amber-900 font-semibold text-3xl">
          Developed by Abdul Rehman
        </p>
      </div>
    </div>
  );
}
