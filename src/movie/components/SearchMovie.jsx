import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

export default props => {
  const { fetchMovies, clear } = props;

  const [valid, setValid] = useState(true);
  const { searchParams } = useSelector(state => state.movies);
  const dispatch = useDispatch();

  return (
    <form
      className="searchMovie"
      noValidate
      onSubmit={event => {
        event.preventDefault();
        if (!searchParams.s) {
          setValid(false);
        } else {
          fetchMovies(1);
        }
      }}
    >
      {valid}
      <TextField
        name="title"
        label="Movie title"
        value={searchParams.s || ''}
        onChange={event => {
          setValid(true);
          dispatch({
            type: 'setSearchParams',
            payload: { ...searchParams, s: event.target.value }
          });
        }}
        error={!valid}
        helperText={valid || 'Can\'t be empty'}
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
              y: event.target.value ? Number.parseInt(event.target.value) : ''
            }
          });
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
        }}
        helperText="Select type"
      >
        {[
          { value: 'movie', label: 'Movie' },
          { value: 'series', label: 'Series' },
          { value: 'episode', label: 'Episode' }
        ].map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!valid}
      >
        Search
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          clear();
          dispatch({ type: 'clearSearchParams' });
        }}
      >
        Clear
      </Button>
    </form>
  );
};
