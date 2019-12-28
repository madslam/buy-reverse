import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

const sortBy = [
  {value: '', label: 'Select'},
  {value: 'lowestprice', label: 'Lowest to highest'},
  {value: 'highestprice', label: 'Highest to lowest'},
];
const useStyles = makeStyles (theme => ({
  textField: {
    margin: theme.spacing (1),
    width: 100,
  },
}));

const Sort = () => {
  const classes = useStyles ();

  const [sort, setSort] = React.useState ('');
  const handleChange = value => {
    console.log (value);
    setSort (value.target.value);
  };

  return (
    <div className="sort">
      <TextField
        select
        label="Order by"
        margin="dense"
        onChange={handleChange}
        className={classes.textField}
        value={sort}
        variant="outlined"
      >
        {sortBy.map (s => <MenuItem value={s.value}>{s.label}</MenuItem>)}

      </TextField>
    </div>
  );
};

export default Sort;
