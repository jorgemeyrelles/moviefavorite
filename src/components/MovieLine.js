import React, { useEffect, useState } from 'react';
import gettingDataFromTmdb from '../services/dataTmdb';
import './movieLine.css';

function MovieLine() {
  const [movieList, SetMovieList] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      let list = await gettingDataFromTmdb();
      SetMovieList(list);
    }
    
    loadAll();
  }, []);

  const URL_IMG = "http://image.tmdb.org/t/p/w300";

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((e, i) => {
          return (
            <div className="movieRow">
              <h2>{e.title}</h2>
              <div className="movieRow--listarea">
                <div className="movieRow--list">
                  {e.items.results.length > 0 &&
                    e.items.results.map((value, key) => (
                      <div className="movieRow--item">
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
  );
}

export default MovieLine;