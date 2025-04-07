// src/components/CaffeineForm.jsx
import React, { useState } from 'react';

function CaffeineForm({ onAddEntry }) {
  const [drinkType, setDrinkType] = useState('Coffee');
  const [caffeineMg, setCaffeineMg] = useState(''); // Store as string for input flexibility

  const drinkOptions = ['Coffee', 'Tea', 'Energy Drink', 'Soda', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(caffeineMg, 10); // Convert to number for storage

    if (!drinkType || !caffeineMg || isNaN(amount) || amount <= 0) {
      alert('Please select a drink type and enter a valid caffeine amount (mg > 0).');
      return;
    }

    const newEntry = {
      id: Date.now(), // Simple unique ID using timestamp
      drinkType,
      caffeineMg: amount,
      timestamp: Date.now(),
    };

    onAddEntry(newEntry);

    // Reset form (optional: keep drinkType?)
    // setDrinkType('Coffee');
    setCaffeineMg('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">Log Caffeine Intake</h2>
      <div>
        <label htmlFor="drinkType" className="block text-sm font-medium text-gray-700 mb-1">
          Drink Type:
        </label>
        <select
          id="drinkType"
          value={drinkType}
          onChange={(e) => setDrinkType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {drinkOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="caffeineMg" className="block text-sm font-medium text-gray-700 mb-1">
          Caffeine Amount (mg):
        </label>
        <input
          type="number"
          id="caffeineMg"
          value={caffeineMg}
          onChange={(e) => setCaffeineMg(e.target.value)}
          placeholder="e.g., 95"
          min="1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        Add Entry
      </button>
    </form>
  );
}

export default CaffeineForm;