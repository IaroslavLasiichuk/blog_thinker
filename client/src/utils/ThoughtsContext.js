import React, { createContext, useState } from 'react';

export const ThoughtsContext = createContext();

export const ThoughtsProvider = ({ children }) => {
  const [thoughts, setThoughts] = useState([]);

  const addThought = (newThought) => {
    setThoughts((prevThoughts) => [...prevThoughts, newThought]);
  };

  return (
    <ThoughtsContext.Provider value={{ thoughts, addThought }}>
      {children}
    </ThoughtsContext.Provider>
  );
};
