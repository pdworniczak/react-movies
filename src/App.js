import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link as RouterLink
} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Movies from './movie';
import Movie from './movie/Movie'

function App() {
  return (
    <Router>
      <header>
        <Link component={RouterLink} to="/">
          <h1>Movie Search</h1>
        </Link>
      </header>
      <nav>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        <Link component={RouterLink} to="/movie">
          Movies
        </Link>
        <Link component={RouterLink} to="/test">
          Test
        </Link>
      </nav>
      <main>
        <Switch>
          <Route path="/" exact />
          <Route path="/movie" exact component={Movies} />
          <Route
            path="/movie/:imdbID"
            component={Movie}
          />
          <Route path="/test1/" component={() => <div>test</div>} />
        </Switch>
      </main>
      <footer>movie@com</footer>
    </Router>
  );
}

export default App;
