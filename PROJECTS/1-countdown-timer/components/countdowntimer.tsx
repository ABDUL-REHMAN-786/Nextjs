"use client"; // Enables client-side rendering for this component

import { useState, useRef, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component

export default function Countdown() {
  // State to manage the duration input
  const [duration, setDuration] = useState<number | string>("");
  // State to manage the countdown timer value
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // State to track if the timer is active
  const [isActive, setIsActive] = useState<boolean>(false);
  // State to track if the timer is paused
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // Reference to store the timer ID
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle setting the duration of the countdown
  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration); // Set the countdown timer
      setIsActive(false); // Reset active state
      setIsPaused(false); // Reset paused state
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to start the countdown timer
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true); // Set the timer as active
      setIsPaused(false); // Unpause the timer if it was paused
    }
  };

  // Function to pause the countdown timer
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true); // Set the timer as paused
      setIsActive(false); // Set the timer as inactive
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  // Function to reset the countdown timer
  const handleReset = (): void => {
    setIsActive(false); // Set the timer as inactive
    setIsPaused(false); // Set the timer as not paused
    setTimeLeft(typeof duration === "number" ? duration : 0); // Reset the timer to the original duration
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // useEffect hook to manage the countdown interval
  useEffect(() => {
    // If the timer is active and not paused
    if (isActive && !isPaused) {
      // Set an interval to decrease the time left
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          // If time is up, clear the interval
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          // Decrease the time left by one second
          return prevTime - 1;
        });
      }, 1000); // Interval of 1 second
    }
    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]); // Dependencies array to rerun the effect

  // Function to format the time left into mm:ss format
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds
    // Return the formatted string
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to handle changes in the duration input field
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || ""); // Update the duration state
  };

  // JSX return statement rendering the Countdown UI
  return (

    
    // Container div for centering the content
    
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 p-4">
      {/* Timer box container */}
      <h1 className="text-center font-extrabold text-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-8 w-full max-w-lg transform transition-all hover:scale-105 border border-gray-300 dark:border-gray-700"> 
        Next-js Count Down Timer</h1>
      <br /><br />
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-8 w-full max-w-lg transform transition-all hover:scale-105 border border-gray-300 dark:border-gray-700">
        {/* Title of the countdown timer */}
        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white text-center tracking-wide">
          Develop By <br />Abdul-Rehman
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 p-3 rounded-lg border-2 border-blue-400 dark:border-blue-600 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 px-5 py-2 rounded-lg shadow-lg"
          >
            Set
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-10 text-center shadow-inner py-4 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-blue-500">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className={`${
              isPaused ? "bg-green-600" : "bg-teal-500"
            } text-white hover:bg-teal-600 transition-all duration-300 px-6 py-3 rounded-lg shadow-lg`}
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 px-6 py-3 rounded-lg shadow-lg"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600 transition-all duration-300 px-6 py-3 rounded-lg shadow-lg"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
