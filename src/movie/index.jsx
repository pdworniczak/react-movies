import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import movieService from './services';
import MovieList from './components/MovieList';
import SearchMovie from './components/SearchMovie';
import MoviesPagination from './components/MoviesPagination';
import ErrorDialog from './dialogs/Error';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ open: false, message: '' });

  const { searchParams } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.s && searchParams.page) {
      fetchMovies();
    }
  }, []);

  const fetchMovies = async page => {
    const params = page ? { ...searchParams, page } : searchParams;
    if (page) {
      dispatch({ type: 'setSearchParams', payload: params });
    }

    setLoading(true);

    const {
      data: { Search, totalResults, Response, Error }
    } = await movieService.get(params);

    setLoading(false);
    if (Response === 'False') {
      setErrorDialog({ open: true, message: Error });
    } else {
      setMovies(Search);
      setTotalResults(totalResults);
    }
  };

  return (
    <article>
      <header>Movies</header>
      <section>
        <SearchMovie fetchMovies={fetchMovies} clear={() => setMovies([])} />
        {loading && <div>Loading...</div>}
        <MovieList movies={movies} />
        <MoviesPagination hasMovies={movies.length} fetchMovies={fetchMovies} totalResults={totalResults} />
        <div />
      </section>
      <ErrorDialog
        open={errorDialog.open}
        closeAction={() => setErrorDialog({ open: false })}
        message={errorDialog.message}
      />
    </article>
  );
}

export default Movies;
