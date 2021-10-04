import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/MoviesContext';
import gettingDataFromTmdb from '../services/dataTmdb';
import './movieLine.css';

function Principal() {
  const { allData, setAllData } = useContext(DataContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadAll = async () => {
      let list = await gettingDataFromTmdb();
      setAllData(list);
      setMovies(list);
      setIsLoading(true);
    }

    loadAll();
  }, []);
  
  const URL_IMG = "http://image.tmdb.org/t/p/w300";
  
  const home = () => {
    return (
      <div className="page">
        <section className="lists">
          {movies.map((e, i) => {
            return (
              <div className="movieRow" key={ i }>
                <h2>{e.title}</h2>
                <div className="movieRow--listarea">
                  <div className="movieRow--list">
                    {e.items.results.length > 0 &&
                      e.items.results.map((value, key) => (
                        <div className="movieRow--item" key={ key }>
                          <img src={`${URL_IMG}${value.poster_path}`} alt={`poster ${value.name}`} />
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    )
  }

  return (
    <>
      {!isLoading ? <div>Loading...</div> : home()}
    </>
  );
};

export default Principal;