import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';

export default (props) => {
  const { hasMovies, fetchMovies, totalResults } = props;
  
  const { searchParams } = useSelector(state => state.movies);

  return (
    <Fragment>
      {hasMovies ? (
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
    </Fragment>
  );
};
