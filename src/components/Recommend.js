import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../context/MoviesContext';
import gettingDataFromTmdb, { getMovieInfo } from '../services/dataTmdb';
import '../components/featuredMovie.css';

function Recommend() {
  const { clickedState, allData } = useContext(DataContext);
  const [recom, setRecom] = useState([]);
  const [hover, setHover] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const loadAll = async () => {
      let list = await gettingDataFromTmdb();
      const originals = list.find((e) => e.slug === 'originals');
      const index = Math.floor(Math.random() * originals.items.results.length -1);
      const movie = originals.items.results[index];
      let movieRecom = await getMovieInfo(`/tv/${movie.id}?language=pt-BR&api_key=`);
      setRecom(movieRecom);
    }
    loadAll();
  }, []);

  const styleMain = {
    backgroundSize: 'cover',
    backgroundPosition: 'center 10%',
    backgroundImage: `url(http://image.tmdb.org/t/p/original${recom.poster_path})`,
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
    height: '100px',
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
    recom.genres && Object.values(recom.genres).map((e, i) => arr.push(e.name));
    return arr.join(', ');
  }

   let description = recom.overview ? recom.overview : [];
   if (description.length > 200) {
     description = description.substring(0, 200)+'...';
   };

  return (
    <section className="featured" style={ styleMain }>
      <div style={ styleVertical }>
        <div style={ styleHorizontal }>
          <div style={ featuredName }>
            { Object.keys(recom).includes('name') ? recom.name : recom.title }
          </div>
          <div style={ featuredInfo }>
            <div style={ featuredPoints }>
              { recom.vote_average } pontos
            </div>
            <div style={ featuredSeasons }>
              { Object.keys(recom).includes('first_air_date')
                ? (new Date(recom.first_air_date)).getFullYear() : (new Date(recom.release_date)).getFullYear() }
            </div>
            <div style={ featuredSeasons }>
              { recom.number_of_seasons } temporada{recom.number_of_seasons > 1 ? 's' : ''}
            </div>
            <div style={ featuredDescription }>{ description }</div>
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

export default Recommend;