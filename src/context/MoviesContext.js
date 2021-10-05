import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DataContext = createContext();

function MoviesProvider({ children }) {
  const [allData, setAllData] = useState({});
  const [clickedState, setClickedState] = useState([]);
  const [showHeader, setShowHeader] = useState(false);

  const value = {
    allData,
    setAllData,
    clickedState,
    setClickedState,
    showHeader,
    setShowHeader,
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
