import React, { FunctionComponent } from 'react';
import { Select, MenuItem, SelectProps } from '@material-ui/core';

interface Props
  extends Pick<SelectProps, 'classes' | 'defaultValue' | 'value'> {
  onChange: (size: number) => void;
}

const MapsSizeSelect: FunctionComponent<Props> = ({
  classes,
  value,
  onChange,
  defaultValue,
}) => {
  return (
    <Select
      classes={classes}
      id="size-select"
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        onChange(e.target.value as number);
      }}
    >
      <MenuItem value={-1}>All</MenuItem>
      <MenuItem value={0}>5x5</MenuItem>
      <MenuItem value={1}>10x10</MenuItem>
      <MenuItem value={2}>20x20</MenuItem>
      <MenuItem value={3}>40x40</MenuItem>
      <MenuItem value={4}>80x80</MenuItem>
    </Select>
  );
};

export default MapsSizeSelect;
