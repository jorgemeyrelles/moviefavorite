import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/MoviesContext';
import gettingDataFromTmdb from '../services/dataTmdb';
import Footer from './Footer';
import Header from './Header';
import Highlighted from './Highlighted';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './movieLine.css';
import Recommend from './Recommend';

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

  const styleArrow = {
    position: 'absolute',
    width: '40px',
    height: '225px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
    opacity: '1',
    zIndex: '99',
    alignItems: 'center',
  };
  
  const [scrollx, setScrollx] = useState(-400);
  const [key1, setKey] = useState('');

  const home = () => {
    const handleClickLeft = (value) => {
      let x = scrollx + Math.round(window.innerWidth / 2);
      if (x > 0) {
        x = 0;
      };
      setKey(value);
      setScrollx(x);
    };

    const handleClickRight = (value) => {
      // se o key recebido !== lastKey return setScrollx(0)
      let x = scrollx - Math.round(window.innerWidth / 2);
      let listW = value[0] * 150;
      if ((window.innerWidth - listW) > x) {
        x = (window.innerWidth - listW) - 60;
      };
      setKey(value[1])
      setScrollx(x);
    };
    return (
      <div className="page">
        <Header />
        { high ? <Highlighted /> : <Recommend /> }
        <section className={ high ? "lists" : "lists2" }>
          {movies.map((e, i) => {
            return (
              <div className="movieRow" key={ i }>
                <h2>{e.title}</h2>
                <div
                  style={ {...styleArrow, left: '0' } }
                  onClick={ () => handleClickLeft(i) }
                >
                  <NavigateBeforeIcon style={ { fontSize: 50} } />
                </div>
                <div
                  style={ {...styleArrow, right: '0' } }
                  onClick={ () => handleClickRight([e.items.results.length, i]) }
                >
                  <NavigateNextIcon style={ { fontSize: 50} } />
                </div>
                <div className="movieRow--listarea" key={ i }> 
                  <div
                    className="movieRow--list"
                    style={ {
                      marginLeft: key1 === i ? scrollx : () => setScrollx(0),
                      width: e.items.results.length * 150
                    } }
                  >
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
        <Footer />
      </div>
    )
  }

  const loading = () => {
    return (
      <div style={ {
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        zIndex: '99',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      } }>
        <img src="https://i.gifer.com/8Etj.gif" alt="loading" />
      </div>
    );
  };

  return (
    <>
      {!isLoading ? loading() : home()}
    </>
  );
};

export default Principal;