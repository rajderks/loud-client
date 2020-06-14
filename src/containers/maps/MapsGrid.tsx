import React, { FunctionComponent } from 'react';
import { Grid, useTheme } from '@material-ui/core';

const MapsGrid: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      // spacing={2}
      style={{ padding: theme.spacing(4), maxWidth: 1440, margin: '0 auto' }}
      alignContent="flex-start"
    >
      {children}
    </Grid>
  );
};

export default MapsGrid;
