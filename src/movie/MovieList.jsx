import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import { withRouter } from 'react-router-dom';

export default withRouter(({ movies, history }) => {
  return (
    <Fragment>
      {movies.map((movie, index) => (
        <Card
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'poiner',
            marginBottom: '.5em'
          }}
          onClick={() => {
            console.log(movie.imdbID);
            history.push(`movie/${movie.imdbID}`);
          }}
        >
          <span>
            {index + 1}: {movie.Title} {movie.Year}
          </span>
          <img style={{ width: '4em' }} src={movie.Poster} alt={movie.Title} />
        </Card>
      ))}
    </Fragment>
  );
});
