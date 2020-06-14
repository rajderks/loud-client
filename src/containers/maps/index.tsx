import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { MapAttr } from '../../types';
import api from '../../api/api';
import MapsTile from './MapsTile';
import MapsGrid from './MapsGrid';
import MapsFilters from './MapsFilters';
import { makeStyles } from '@material-ui/core';
import { MapsFilter } from './types';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    padding: theme.spacing(0, 4, 4, 4),
    maxWidth: 1440,
    margin: '0 auto',
  },
}));

const Maps: FunctionComponent<{}> = () => {
  const classes = useStyles();
  const [maps, setMaps] = useState<MapAttr[] | null>(null);
  const [mapsFailed, setMapsFailed] = useState(false);

  useEffect(() => {
    api.get<MapAttr[]>('maps').subscribe(
      (n) => {
        setMapsFailed(false);
        setMaps(n);
      },
      (e) => {
        console.error(e);
        setMapsFailed(true);
      }
    );
  }, []);

  const handleFiltersChanged = useCallback((filters: MapsFilter[]) => {
    console.warn(filters);
  }, []);

  return mapsFailed ? (
    <>please refresh to try again!</>
  ) : (
    <div className={classes.root}>
      <MapsFilters onChangeFilters={handleFiltersChanged} />
      <MapsGrid>
        {maps
          ?.map((x, i) => ({ ...x, id: i }))
          .map((mapAttr) => (
            <MapsTile {...mapAttr} key={mapAttr.id} />
          ))}
      </MapsGrid>
    </div>
  );
};

export default Maps;
