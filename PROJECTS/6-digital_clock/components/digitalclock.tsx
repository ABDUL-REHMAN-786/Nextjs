"use client"; // Enables client-side rendering for this component

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Default export of the DigitalClockComponent function
export default function DigitalClockComponent() {
  const [time, setTime] = useState<Date>(new Date());
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true); // Set mounted status to true
    const interval = setInterval(() => {
      setTime(new Date()); // Update the time every second
    }, 1000);
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const formattedTime = useMemo<string>(() => {
    if (!mounted) return ""; // Don't render time on the server
    const hours = is24Hour
      ? time.getHours().toString().padStart(2, "0") // Format hours in 24-hour format
      : (time.getHours() % 12 || 12).toString().padStart(2, "0"); // Format hours in 12-hour format
    const minutes = time.getMinutes().toString().padStart(2, "0"); // Format minutes
    const seconds = time.getSeconds().toString().padStart(2, "0"); // Format seconds
    return `${hours}:${minutes}:${seconds}`; // Return formatted time string
  }, [time, is24Hour, mounted]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      {/* Card container for the digital clock */}
      <Card className="p-20 shadow-5xl rounded-3xl bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30">
        <div className="flex flex-col items-center justify-center">
          {/* Header with embossed effect */}
          <div className="text-6xl text-red-900 font-extrabold tracking-wide mb-4 relative">
            <span className="relative text-shadow-emboss">Digital Clock</span>
          </div>
          {/* Developer name */}
          <div className="text-5xl text-black text-center">
            Developed by Abdul Rehman
          </div>
          <br />
          {/* Description */}
          <div className="text-2xl text-orange-900 mb-4">
            Displaying current time in hours, minutes, and seconds.
          </div>
          {/* Embossed Time */}
          <div className="text-7xl font-bold tracking-widest text-white mb-6 drop-shadow-lg relative">
            <span className="text-shadow-emboss">{formattedTime}</span>
          </div>
          {/* Buttons to switch between 24-hour and 12-hour formats */}
          <div className="mt-4 flex items-center space-x-4">
            <Button
              variant={is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(true)}
              className={`font-bold py-2 px-4 rounded-lg text-white ${
                is24Hour ? "bg-gradient-to-r from-green-400 to-blue-500" : "border border-white"
              } hover:from-green-300 hover:to-blue-400`}
            >
              24-Hour Format
            </Button>
            <Button
              variant={!is24Hour ? "default" : "outline"}
              onClick={() => setIs24Hour(false)}
              className={`font-bold py-2 px-4 rounded-lg text-white ${
                !is24Hour ? "bg-gradient-to-r from-purple-400 to-pink-500" : "border border-white"
              } hover:from-purple-300 hover:to-pink-400`}
            >
              12-Hour Format
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
