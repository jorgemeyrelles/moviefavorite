import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../context/MoviesContext';
import { getMovieInfo } from '../services/dataTmdb';
import '../components/featuredMovie.css';

function Highlighted() {
  const { clickedState } = useContext(DataContext);
  const [clicked, setClicked] = useState([]);
  const [hover, setHover] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loadAll = async () => {
      let list = await getMovieInfo(clickedState);
      setClicked(list);
    }
    loadAll();
  }, [clickedState]);
  console.log(clicked);

  const styleMain = {
    backgroundSize: 'cover',
    backgroundPosition: 'center 10%',
    backgroundImage: `url(http://image.tmdb.org/t/p/original${clicked.poster_path})`,
  };

  // não está funcionando utilizando arquivo css
  const styleVertical = {
    width: 'inherit',
    height: 'inherit',
    background: 'linear-gradient(to top, #111 10%, transparent 90%)',
  };

  // não está funcionando utilizando arquivo css
  const styleHorizontal = {
    background: 'linear-gradient(to right, #111 30%, transparent 70%)',
    display: 'flex',
    flexDirection: 'column',
    height: 'inherit',
    justifyContent: 'center',
    paddingLeft: '30px',
    paddingBottom: '150px',
    paddingTop: '70px',
    width: 'inherit',
  };

  const featuredName = {
    fontSize: '60px',
    fontWeight: 'bold',
  };

  const featuredInfo = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '15px',
  };

  const featuredSeasons = {
    display: 'inline-block',
    marginRight: '15px',
  };

  const featuredPoints = {
    color: '#46d369',
    display: 'inline-block',
    marginRight: '15px',
  };

  const featuredDescription = {
    marginRight: '15px',
    fontSize: '20px',
    color: '#999',
    maxWidth: '40%',
  };

  const featuredBtnDetail = (hover) => ({
    display: 'inline-block',
    fontSize: '20px',
    fontWeight: 'bold',
    padding: '10px 25px',
    borderRadius: '5px',
    textDecoration: 'none',
    marginRight: '10px',
    backgroundColor: '#fff',
    color: '#000',
    transition: 'all ease 0.2s',
    cursor: 'pointer',
    opacity: hover ? '0.7' : '1',
  });

  const featuredGenres = {
    marginTop: '15px',
    fontSize: '18px',
    color: '#999',
  };

  const genresArr = () => {
    const arr = [];
    clicked.genres && Object.values(clicked.genres).map((e, i) => arr.push(e.name));
    return arr.join(', ');
  }

  return (
    <section className="featured" style={ styleMain }>
      <div style={ styleVertical }>
        <div style={ styleHorizontal }>
          <div style={ featuredName }>
            { Object.keys(clicked).includes('name') ? clicked.name : clicked.title }
          </div>
          <div style={ featuredInfo }>
            <div style={ featuredPoints }>
              { clicked.vote_average } pontos
            </div>
            <div style={ featuredSeasons }>
              { Object.keys(clicked).includes('first_air_date')
                ? (new Date(clicked.first_air_date)).getFullYear() : (new Date(clicked.release_date)).getFullYear() }
            </div>
            <div style={ featuredSeasons }>
              { clicked.number_of_seasons } temporada{clicked.number_of_seasons > 1 ? 's' : ''}
            </div>
            <div style={ featuredDescription }>{ clicked.overview }</div>
            <div style={ { marginTop: '15px' } }>
              <div
                role="button"
                onKeyPress={ () => history.push('/') }
                onClick={ () => history.push('/') }
                tabIndex="0"
                style={ featuredBtnDetail(hover) }
                onPointerOver={ ()=> setHover(true) }
                onPointerOut={ () => setHover(false) }
              >
                Mais detalhes
              </div>
            </div>
            <div style={ featuredGenres }>
              <strong style={ { color: '#fff' } }>Gêneros:</strong>
              <div style={ { marginTop: '10px' } }>{ genresArr() }</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlighted;