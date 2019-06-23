import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';

import movieService from './service';
import MovieList from './MovieList';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    movieService
      .get(params)
      .then(({ data: { Search, totalResults, Response, Error } }) => {
        setLoading(false);
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
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '1rem',
            justifyContent: 'center'
          }}
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
          <TextField
            name="year"
            label="Year"
            value={searchParams.y || ''}
            onChange={event => {
              dispatch({
                type: 'setSearchParams',
                payload: {
                  ...searchParams,
                  y: Number.parseInt(event.target.value)
                }
              });
              console.log(event.target.value);
            }}
          />
          <TextField
            select
            name="type"
            label="Type"
            value={searchParams.type || ''}
            onChange={event => {
              dispatch({
                type: 'setSearchParams',
                payload: {
                  ...searchParams,
                  type: event.target.value
                }
              });
              console.log(event.target.value);
            }}
            helperText="Select type"
          >
            {[
              // { value: '', label: 'None'},
              { value: 'movie', label: 'Movie' },
              { value: 'series', label: 'Series' },
              { value: 'episode', label: 'Episode' }
            ].map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button type="submit">Search</Button>
          <Button onClick={() => dispatch({ type: 'clearSearchParams' })}>
            Clear
          </Button>
        </form>
        {loading && <div>Loading...</div>}
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
