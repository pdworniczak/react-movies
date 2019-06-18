import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// import NavigateNext from '@material-ui/icons/';

import movieService from './service';
import MovieList from './MovieList';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useState({ page: 1 });


  const fetchMovies = (page) => {
    setSearchParams({ ...searchParams, page });
    movieService
      .get({ ...searchParams, page })
      .then(({ data: { Search, totalResults } }) => {
        setMovies(Search);
        setTotalResults(totalResults);
      });
  } 

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
            onChange={event =>
              setSearchParams({
                ...searchParams,
                s: event.target.value
              })
            }
          />
          <Button type="submit">Search</Button>
        </form>
        <MovieList movies={movies} />
        {movies.length
          ? `${searchParams.page}/${Math.ceil(totalResults / 10)} page`
          : ''}{' '}
        {totalResults}
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
        <div />
      </section>
    </article>
  );
}

export default Movies;
