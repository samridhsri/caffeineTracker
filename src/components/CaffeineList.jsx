// src/components/CaffeineList.jsx
import React from 'react';

function CaffeineList({ entries, onDeleteEntry }) {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Filter for today's entries (could also be done in App.js)
  const getStartOfDay = (date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    return start.getTime();
  };
  const todayStart = getStartOfDay(new Date());
  const todaysEntries = entries.filter(entry => entry.timestamp >= todayStart);

  if (todaysEntries.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No caffeine logged yet today.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Today's Log</h2>
      <ul className="space-y-3">
        {todaysEntries.slice().reverse().map((entry) => ( // Show newest first
          <li
            key={entry.id}
            className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-b-0"
          >
            <div>
              <span className="font-medium">{entry.drinkType}</span>
              <span className="text-gray-600"> - {entry.caffeineMg} mg</span>
              <span className="block text-sm text-gray-500">
                at {formatDate(entry.timestamp)}
              </span>
            </div>
            <button
              onClick={() => onDeleteEntry(entry.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium focus:outline-none"
              aria-label={`Delete entry for ${entry.drinkType}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
       {/* Optional: Button to clear all entries */}
      {/* <button
        onClick={onClearAll} // Needs implementation in App.js
        className="mt-4 text-sm text-gray-500 hover:text-red-600"
      >
        Clear All Entries
      </button> */}
    </div>
  );
}

export default CaffeineList;