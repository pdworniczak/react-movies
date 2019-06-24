import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

import ErrorIcon from '@material-ui/icons/Error';

export default props => {
  const { open, message, closeAction } = props;

  return (
    <Dialog
      open={open}
      onClose={closeAction}
      aria-labelledby="error-title"
      aria-describedby="error-description"
    >
      <DialogTitle id="error-title">
        <div style={{ color: 'red', display: 'flex', alignItems: 'center' }}>
          <ErrorIcon />
          Error
        </div>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="error-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeAction}
          color="primary"
          autoFocus
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
