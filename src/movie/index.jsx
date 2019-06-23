import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

import movieService from './service';
import MovieList from './MovieList';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const { searchParams } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  const init = () => {
    if (searchParams.s && searchParams.page) {
      fetchMovies();
    }
  };

  useEffect(() => {
    init();
  }, []);

  const fetchMovies = page => {
    const params = page ? { ...searchParams, page } : searchParams;
    if (page) {
      dispatch({ type: 'setSearchParams', payload: params });
    }

    movieService
      .get(params)
      .then(({ data: { Search, totalResults, Response, Error } }) => {
        if (Response === 'False') {
          console.error(Error);
        } else {
          setMovies(Search);
          setTotalResults(totalResults);
        }
      });
  };

  return (
    <article>
      <header>Movies</header>
      <section>
        <form
          noValidate
          onSubmit={event => {
            event.preventDefault();
            fetchMovies(1);
          }}
        >
          <TextField
            name="title"
            label="Movie title"
            value={searchParams.s || ''}
            onChange={event =>
              dispatch({
                type: 'setSearchParams',
                payload: { ...searchParams, s: event.target.value }
              })
            }
          />
          <Button type="submit">Search</Button>
          <Button onClick={() => dispatch({ type: 'clearSearchParams' })}>
            Clear
          </Button>
        </form>
        <MovieList movies={movies} />
        {movies.length ? (
          <Fragment>
            <span>
              {searchParams.page}/{Math.ceil(totalResults / 10)} page
            </span>
            <Fab
              onClick={() => {
                if (searchParams.page > 1) {
                  fetchMovies(searchParams.page - 1);
                }
              }}
            >
              prev
            </Fab>
            <Fab
              onClick={() => {
                if (searchParams.page < Math.ceil(totalResults / 10)) {
                  fetchMovies(searchParams.page + 1);
                }
              }}
            >
              next
            </Fab>
          </Fragment>
        ) : (
          ''
        )}
        <div />
      </section>
    </article>
  );
}

export default Movies;
