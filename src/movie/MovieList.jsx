import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';

export default ({ movies }) => {
  return (
    <Fragment>
      {movies.map((movie, index) => (
        <Card
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
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
};
