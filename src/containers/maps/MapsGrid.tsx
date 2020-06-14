import React, { FunctionComponent } from 'react';
import { Grid, useTheme } from '@material-ui/core';

const MapsGrid: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      // spacing={2}
      style={{ padding: theme.spacing(4) }}
      alignContent="flex-start"
    >
      {children}
    </Grid>
  );
};

export default MapsGrid;
