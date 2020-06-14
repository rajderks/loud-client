import React, { FunctionComponent, useState, useRef, useEffect } from 'react';
import { MapsFilter, MapsFilterComparator } from './types';
import {
  TextField,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  IconButton,
  Icon,
  Zoom,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import PlayersIcon from '@material-ui/icons/Group';
import SizeIcon from '@material-ui/icons/AspectRatio';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: '1 0 100%',
    flexWrap: 'wrap',
    margin: theme.spacing(3, 0, 3, 0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  filterWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '& > div:first-child': {
      margin: theme.spacing(1, 0),
    },
    '& > div:nth-child(2)': {
      marginLeft: 0,
      minWidth: 40,
      textAlign: 'center',
    },
  },
  sizeIcon: {
    position: 'absolute',
    bottom: 13,
  },
  sizeSelect: {
    marginLeft: 32,
  },
}));

interface Props {
  onChangeFilters: (filters: MapsFilter[]) => void;
}

const MapsFilters: FunctionComponent<Props> = ({ onChangeFilters }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(-1);
  const [sizeComparator, setSizeComparator] = useState<MapsFilterComparator>(
    '='
  );
  const [players, setPlayers] = useState('');
  const [playersComparator, setPlayersComparator] = useState<
    MapsFilterComparator
  >('=');
  const subjectRef = useRef<Subject<never>>(new Subject());

  useEffect(() => {
    const subscription = subjectRef
      .current!.pipe(debounceTime(225))
      .subscribe((n) => {
        const filters: MapsFilter[] = [];
        if (search) {
          filters.push({ key: 'search', value: search, comparator: '=' });
        }
        if (size !== -1) {
          filters.push({
            key: 'size',
            value: size,
            comparator: sizeComparator,
          });
        }
        onChangeFilters(filters);
      });
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [onChangeFilters, search, size, sizeComparator]);

  useEffect(() => {
    subjectRef.current!.next();
  }, [search, size, players]);

  return (
    <div className={classes.root}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" disablePointerEvents>
              <Icon>
                <SearchIcon />
              </Icon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Zoom in={!!search.length}>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSearch('');
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Zoom>
            </InputAdornment>
          ),
        }}
        fullWidth
        placeholder="Search for a map by name or author"
        label="Search"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        value={search}
      />
      <div className={classes.filterWrapper}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="size-select">
            Size
          </InputLabel>
          <Select
            classes={{ select: classes.sizeSelect }}
            id="size-select"
            defaultValue={-1}
            value={size}
            onChange={(e) => {
              setSize(e.target.value as number);
            }}
          >
            <MenuItem value={-1}>All</MenuItem>
            <MenuItem value={0}>5x5</MenuItem>
            <MenuItem value={1}>10x10</MenuItem>
            <MenuItem value={2}>20x20</MenuItem>
            <MenuItem value={3}>40x40</MenuItem>
            <MenuItem value={4}>80x80</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="size-select"></InputLabel>
          <Select
            id="size-select"
            defaultValue="="
            value={sizeComparator}
            onChange={(e) => {
              setSizeComparator(e.target.value as MapsFilterComparator);
            }}
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
          </Select>
        </FormControl>

        <SizeIcon className={classes.sizeIcon} />
      </div>
      <div className={classes.filterWrapper}>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="players-textfield">
            Players
          </InputLabel>
          <TextField
            inputMode="numeric"
            id="players-textfield"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" disablePointerEvents>
                  <Icon>
                    <PlayersIcon />
                  </Icon>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Zoom in={!!players.length}>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setPlayers('');
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Zoom>
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length && !val.match(/^\d+$/)) {
                return;
              }

              setPlayers(val);
            }}
            placeholder="Amount of players..."
            label="Players"
            value={players}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="size-select"></InputLabel>
          <Select
            id="size-select"
            defaultValue="="
            value={playersComparator}
            onChange={(e) => {
              setPlayersComparator(e.target.value as MapsFilterComparator);
            }}
          >
            <MenuItem value="=">=</MenuItem>
            <MenuItem value=">">{'>'}</MenuItem>
            <MenuItem value="<">{'<'}</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default MapsFilters;
