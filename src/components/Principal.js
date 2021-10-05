import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/MoviesContext';
import gettingDataFromTmdb from '../services/dataTmdb';
import Highlighted from './Highlighted';
import './movieLine.css';

function Principal() {
  const { setClickedState, setAllData } = useContext(DataContext);
  const [movies, setMovies] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [high, setHigh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const loadAll = async () => {
      let list = await gettingDataFromTmdb();
      setAllData(list);
      setMovies(list);
      setIsLoading(true);
    }

    loadAll();
  }, [setAllData]);

  const clickedMovie = (event) => {
    if (clicked === event[0].id) {
      setClicked([]);
      setHigh(false);
    } else {
      setClicked(event[0].id);
      const tv = `/tv/${event[0].id}?language=pt-BR&api_key=`;
      const movie = `/movie/${event[0].id}?language=pt-BR&api_key=`;
      setHigh(true)
      if (event[0].media_type === 'tv' || event[1] === 'originals') {
        return setClickedState(tv);
      }
      return setClickedState(movie);
    };
  }
  
  const URL_IMG = "http://image.tmdb.org/t/p/w300";
  
  const home = () => {
    return (
      <div className="page">
        { high && <Highlighted /> }
        <section className="lists">
          {movies.map((e, i) => {
            return (
              <div className="movieRow" key={ i }>
                <h2>{e.title}</h2>
                <div className="movieRow--listarea">
                  <div className="movieRow--list">
                    {e.items.results.length > 0 &&
                      e.items.results.map((value, key) => (
                        <div
                          role="button"
                          onKeyPress={ () => clickedMovie() }
                          onClick={ () => clickedMovie([value, e.slug]) }
                          tabIndex="0"
                          className="movieRow--item"
                          key={ key }
                        >
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