import React, { useState, useEffect } from 'react';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import movieService from './services';

export default ({
  match: {
    params: { imdbID }
  }
}) => {
  const [movie, setMovie] = useState({});

  useEffect(
    () => {
      movieService.get({ i: imdbID, plot: 'full' }).then(({ data }) => {
        setMovie(data);
      });
    },
    [imdbID]
  );

  return (
    <Card className="movieDetails">
      <h1>{movie.Title}</h1>
      <div className="content">
        <img src={movie.Poster} alt="No Iamge" />
        <div>
          {Object.keys(movie).map(key => (
            <div>
              <span>Year:</span>
              <span>{movie['Year']}</span>
            </div>
          ))}
        </div>
      </div>
      <Button variant="outlined">
        <Link to="/movie">Back</Link>
      </Button>
    </Card>
  );
};
