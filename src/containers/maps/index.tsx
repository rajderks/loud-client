import React, { FunctionComponent, useEffect, useState } from 'react';
import { MapAttr } from '../../types';
import api from '../../api/api';
import MapsTile from './MapsTile';
import MapsGrid from './MapsGrid';

const Maps: FunctionComponent<{}> = () => {
  const [maps, setMaps] = useState<MapAttr[] | null>(null);
  const [mapsFailed, setMapsFailed] = useState(false);
  useEffect(() => {
    api.get<MapAttr[]>('maps').subscribe(
      (n) => {
        setMapsFailed(false);
        setMaps([...n, ...n, ...n, ...n]);
      },
      (e) => {
        console.error(e);
        setMapsFailed(true);
      }
    );
  }, []);
  return mapsFailed ? (
    <>please refresh to try again!</>
  ) : (
    <MapsGrid>
      {maps
        ?.map((x, i) => ({ ...x, id: i }))
        .map((mapAttr) => (
          <MapsTile {...mapAttr} key={mapAttr.id} />
        ))}
    </MapsGrid>
  );
};

export default Maps;
