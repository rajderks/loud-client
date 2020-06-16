import React, { FunctionComponent } from 'react';
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from '@material-ui/core';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const MapsAddDialog: FunctionComponent<Props> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} maxWidth="lg">
      <DialogContent>
        <TextField
          label="Map name"
          InputLabelProps={{ shrink: true }}
          placeholder="Enter the map name"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          ADD
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MapsAddDialog;
