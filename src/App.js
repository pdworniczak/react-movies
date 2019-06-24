import React from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link as RouterLink
} from 'react-router-dom';
import Link from '@material-ui/core/Link';

import Movies from './movie';
import Movie from './movie/Movie';

function App() {
  return (
    <Router>
      <header className="backgroundGradient">
        <Link style={{ display: 'flex' }} component={RouterLink} to="/">
          <img
            style={{ height: '5em', marginRight: '2em' }}
            src="movie.png"
            alt=""
          />
          <h1>Movie Search</h1>
        </Link>
      </header>
      <nav>
        <span>
          <Link component={RouterLink} to="/">
            Home
          </Link>
        </span>
        <span>
          <Link component={RouterLink} to="/movie">
            Movies
          </Link>
        </span>
      </nav>
      <main>
        <Switch>
          <Route
            path="/"
            exact
            component={() => (
              <article>
                <h1>Welcome</h1>
              </article>
            )}
          />
          <Route path="/movie" exact component={Movies} />
          <Route path="/movie/:imdbID" component={Movie} />
        </Switch>
      </main>
      <footer>movie@com</footer>
    </Router>
  );
}

export default App;
