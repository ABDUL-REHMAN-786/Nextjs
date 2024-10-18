"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, ChangeEvent } from "react";

// Import custom UI components from the UI directory
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Default export of the TipCalculator function
export default function TipCalculator() {
  // State hooks for managing the bill amount, tip percentage, tip amount, and total amount
  const [billAmount, setBillAmount] = useState<number>(0); // Default to 0
  const [tipPercentage, setTipPercentage] = useState<number>(0); // Default to 0
  const [tipAmount, setTipAmount] = useState<number>(0); // Default to 0
  const [totalAmount, setTotalAmount] = useState<number>(0); // Default to 0

  // Handler for updating bill amount state on input change
  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBillAmount(parseFloat(e.target.value) || 0); // Set to 0 if empty
  };

  // Handler for updating tip percentage state on input change
  const handleTipPercentageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTipPercentage(parseFloat(e.target.value) || 0); // Set to 0 if empty
  };

  // Function to calculate the tip and total amounts
  const calculateTip = (): void => {
    const tip = billAmount * (tipPercentage / 100); // Calculate the tip amount
    setTipAmount(tip); // Set the tip amount state
    setTotalAmount(billAmount + tip); // Set the total amount state
  };

  // JSX return statement rendering the tip calculator UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      {/* Center the tip calculator card within the screen */}
      <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <CardHeader>
          {/* Centered header with title and description */}
          <div className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">
              Tip Calculator
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter the bill amount and tip percentage to calculate the tip and
              total.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          {/* Input for bill amount */}
          <div className="grid gap-2">
            <Label htmlFor="bill-amount" className="text-lg text-purple-600">
              Bill Amount
            </Label>
            <Input
              id="bill-amount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount !== 0 ? billAmount : ""}
              onChange={handleBillAmountChange}
              className="text-center bg-gray-200"
            />
          </div>
          {/* Input for tip percentage */}
          <div className="grid gap-2">
            <Label htmlFor="tip-percentage" className="text-lg text-purple-600">
              Tip Percentage
            </Label>
            <Input
              id="tip-percentage"
              type="number"
              placeholder="Enter tip percentage"
              value={tipPercentage !== 0 ? tipPercentage : ""}
              onChange={handleTipPercentageChange}
              className="text-center bg-gray-200"
            />
          </div>
          {/* Colorful Button to calculate tip */}
          <Button
            onClick={calculateTip}
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-500 hover:to-blue-600 transition-colors"
          >
            Calculate Tip
          </Button>
        </CardContent>
        <CardFooter className="grid gap-2 text-center">
          {/* Display the calculated tip amount */}
          <div className="flex items-center justify-between">
            <span className="text-lg">Tip Amount:</span>
            <span className="font-bold text-xl text-pink-600">
              ${tipAmount.toFixed(2)}
            </span>
          </div>
          {/* Display the calculated total amount */}
          <div className="flex items-center justify-between">
            <span className="text-lg">Total Amount:</span>
            <span className="font-bold text-xl text-pink-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </CardFooter>
        {/* Developer's credit */}
        <div className="text-center text-sm pt-4">
          <p className="text-brown-800 dark:text-brown-400">
            Developed by Abdul Rehman
          </p>
        </div>
      </Card>
    </div>
  );
}
