import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import MovieIcon from '@material-ui/icons/Movie';

export default withRouter(({ movies, history }) => {
  return (
    <Fragment>
      {movies.map((movie, index) => (
        <Card
          key={index}
          className="movie"
          onClick={() => {
            history.push(`movie/${movie.imdbID}`);
          }}
        >
          <span>
            {index + 1}: {movie.Title} {movie.Year}
          </span>
          {movie.Poster === 'N/A' ? (
            <MovieIcon style={{ width: '4em' }} />
          ) : (
            <img
              style={{ width: '4em' }}
              src={movie.Poster}
              alt={movie.Title}
            />
          )}
        </Card>
      ))}
    </Fragment>
  );
});
