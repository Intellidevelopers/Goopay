// src/helpers/progress.hook.js
import { useState, useEffect } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState(0.5); // Set to 50% as an example

  // Optional: You could add logic here to update progress dynamically
  // For instance, a timer or API call that increments the progress

  return progress;
};
