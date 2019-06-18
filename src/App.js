import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink
} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Movies from './movie';

function App() {
  return (
    <Router>
      <header>
        <Link component={RouterLink} to="/">
          <h1>Movies</h1>
        </Link>
      </header>
      <nav>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        <Link component={RouterLink} to="/test">
          Test
        </Link>
      </nav>
      <main>
        <Route path="/" exact component={Movies} />
        <Route path="/test/" component={() => <div>test</div>} />
        <Route path="/test1/" component={() => <div>test</div>} />
      </main>
      <footer>movie@com</footer>
    </Router>
  );
}

export default App;
