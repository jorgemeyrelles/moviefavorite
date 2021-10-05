import React from 'react';

// import { Container } from './styles';

function Footer() {
  return (
    <footer style={ { background: '#141414', padding: '10px 0 10px 0', textAlign: 'center' } }>
      Built by <a style={ { textDecoration: 'none' } } href="https://linkedin.com/in/jorgemeyrelles">Jorge Meyrelles Jr</a>
      <div>All rights reserved</div>
      <div>All data from themoviedb.org</div>
    </footer>
  );
}

export default Footer;
