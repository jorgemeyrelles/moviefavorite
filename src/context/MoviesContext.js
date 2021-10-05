import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

function MoviesProvider({ children }) {
  const [allData, setAllData] = useState({});
  const [clickedState, setClickedState] = useState([]);

  const value = {
    allData,
    setAllData,
    clickedState,
    setClickedState
  }
  
  return (
    <DataContext.Provider value={ value }>
      { children }
    </DataContext.Provider>
  );
}

MoviesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export { MoviesProvider, DataContext };
