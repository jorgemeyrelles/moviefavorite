import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import './Header.css';
import C4 from '../img/C4.png';
import C5 from '../img/C5.png';
import { DataContext } from '../context/MoviesContext';

function Header() {
  const history = useHistory();
  const { showHeader } = useContext(DataContext);

  return (
    <header style={ { background: showHeader ? '#141414' : 'transparent' } }>
      <div className="headerLogo">
        <div
          role="button"
          onKeyPress={ () => history.push('/') }
          onClick={ () => history.push('/') }
          tabIndex="0"
        >
          <img style={ { height: '30px' } } src={ C4 } alt="logo" />
        </div>
      </div>
      <div
          role="button"
          onKeyPress={ () => history.push('/') }
          onClick={ () => history.push('/') }
          tabIndex="0"
        >
          <img style={ { height: '30px', borderRadius: '5px' } } src={ C5 } alt="logo" />
        </div>
    </header>
  );
}

export default Header;