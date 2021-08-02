import React, { useEffect } from 'react';
import gettingDataFromTmdb from './services/dataTmdb';

function MoviesContext() {
  useEffect(() => {
    const loadAll = async () => {
      let list = await gettingDataFromTmdb();
      console.log(list);
    }

    loadAll();
  }, []);
  return (
  <div>
    Olá, mundo!
  </div>);
}

export default MoviesContext;