import React, { useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const MuiAlert = (props) => <Alert elevation={6} variant="filled" {...props} />;

const MuiSnackbar = ({ variant, message }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={variant}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default MuiSnackbar;
