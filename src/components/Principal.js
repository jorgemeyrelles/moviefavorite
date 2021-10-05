import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { DataContext } from '../context/MoviesContext';
import gettingDataFromTmdb from '../services/dataTmdb';
import Footer from './Footer';
import Header from './Header';
import Highlighted from './Highlighted';
import './movieLine.css';

function Principal() {
  const { setClickedState, setAllData, setShowHeader } = useContext(DataContext);
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

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);
  
  const home = () => {
    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className="page">
        <Header />
        { high && <Highlighted /> }
        <section className={ high ? "lists" : "lists2" }>
          {movies.map((e, i) => {
            return (
              <div className="movieRow" key={ i }>
                <h2>{e.title}</h2>
                <Slider {...settings}>
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
                </Slider>
              </div>
            )
          })}
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <>
      {!isLoading ? <div style={ { textAlign: 'center', marginTop: '100px' } }>Loading...</div> : home()}
    </>
  );
};

export default Principal;