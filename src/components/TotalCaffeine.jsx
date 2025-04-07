// src/components/TotalCaffeine.jsx
import React, { useMemo } from 'react';

function TotalCaffeine({ entries }) {

  const calculateTotalForToday = () => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

    return entries
      .filter(entry => entry.timestamp >= startOfDay)
      .reduce((sum, entry) => sum + entry.caffeineMg, 0);
  };

  // useMemo ensures calculation only runs when entries change
  const totalToday = useMemo(calculateTotalForToday, [entries]);

  // Example suggested limit (adjust as needed)
  const dailyLimit = 400;
  const percentage = dailyLimit > 0 ? Math.min((totalToday / dailyLimit) * 100, 100) : 0;

  // Determine color based on percentage
  let progressBarColor = 'bg-green-500';
  if (percentage > 50) progressBarColor = 'bg-yellow-500';
  if (percentage > 80) progressBarColor = 'bg-red-500';


  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-indigo-600">Today's Total</h2>
        <div className="text-3xl font-bold text-center mb-4">
            {totalToday} mg
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
                 className={`h-4 rounded-full ${progressBarColor} transition-all duration-300 ease-in-out`}
                 style={{ width: `${percentage}%` }}
            ></div>
        </div>
         <p className="text-sm text-gray-600 text-center">
            {percentage.toFixed(0)}% of suggested {dailyLimit}mg daily limit.
         </p>
    </div>
  );
}

export default TotalCaffeine;