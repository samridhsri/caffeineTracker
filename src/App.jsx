// src/App.jsx
import React, { useState, useEffect } from 'react';
import CaffeineForm from './components/CaffeineForm';
import CaffeineList from './components/CaffeineList';
import TotalCaffeine from './components/TotalCaffeine';
import { loadEntries, saveEntries } from './utils/localStorage';

function App() {
  // Initialize state from localStorage
  const [entries, setEntries] = useState(() => loadEntries());

  // Effect to save entries to localStorage whenever they change
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleAddEntry = (newEntry) => {
    setEntries(prevEntries => [...prevEntries, newEntry]);
  };

  const handleDeleteEntry = (idToDelete) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== idToDelete));
  };

  // Optional: Function to clear all entries
  // const handleClearAll = () => {
  //   if (window.confirm("Are you sure you want to delete all entries? This cannot be undone.")) {
  //      setEntries([]);
  //      // localStorage is cleared by the useEffect hook when entries become []
  //   }
  // }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-indigo-700">Caffeine Tracker</h1>
        <p className="text-gray-600 mt-2">Monitor your daily caffeine consumption.</p>
      </header>

      <main>
        {/* Display Total First */}
        <TotalCaffeine entries={entries} />

        {/* Form to Add New Entry */}
        <CaffeineForm onAddEntry={handleAddEntry} />

        {/* List of Today's Entries */}
        <CaffeineList
            entries={entries}
            onDeleteEntry={handleDeleteEntry}
            // onClearAll={handleClearAll} // Uncomment if using clear all
         />
      </main>

      <footer className="text-center mt-12 text-sm text-gray-500">
        <p>Data is stored locally in your browser.</p>
        <p>Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;