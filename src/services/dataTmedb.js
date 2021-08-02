const API_KEY = 'b2536b447f12c078fe720040b76a4271';
const BASE_URL = 'https://api.themoviedb.org/3';

const basicFetch = async (endPoint) => {
  const req = await fetch(`${BASE_URL}${endPoint}`);
  return req.json();
}

const gettingDataFromTmdb = async ( ) => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch(`/discovery/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'treding',
        title: 'Recomendados para você',
        items: await basicFetch(`/trending/all/week&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: 'Em alta',
        items: await basicFetch(`/movie/top_rated&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch(`/discovery/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch(`/discovery/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch(`/discovery/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: 'Romance',
        items: await basicFetch(`/discovery/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: 'Documentário',
        items: await basicFetch(`/discovery/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      }
    ]
}

export default gettingDataFromTmdb;
