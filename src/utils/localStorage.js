// src/utils/localStorage.js
const STORAGE_KEY = 'caffeineEntries';

export const loadEntries = () => {
  try {
    const storedEntries = localStorage.getItem(STORAGE_KEY);
    if (storedEntries) {
      // Add validation/migration logic here if needed in the future
      return JSON.parse(storedEntries);
    }
  } catch (error) {
    console.error("Failed to load entries from localStorage:", error);
    // Handle error, maybe clear corrupted data?
    // localStorage.removeItem(STORAGE_KEY);
  }
  return []; // Return empty array if nothing stored or error
};

export const saveEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save entries to localStorage:", error);
    // Handle potential errors like storage full
  }
};