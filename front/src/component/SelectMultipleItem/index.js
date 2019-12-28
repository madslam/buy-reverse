import MenuItem from '@material-ui/core/MenuItem';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  textField: {
    marginLeft: theme.spacing (1),
    marginRight: theme.spacing (1),
    width: 150,
  },
  chip: {margin: 4},
}));
const SelectDay = ({daysAvalaible, handleChange}) => {
  const classes = useStyles ();

  const [newDaysAvalaible, setDaysAvalaible] = useState (daysAvalaible);
  const [itemSelected, setItemSelected] = useState ('');
  const days = ['test 1', 'test 2', 'test 3', 'test 4', 'test 5'];

  const handleChangeSelect = () => event => {
    const {value} = event.target;
    setItemSelected (value);

    if (daysAvalaible.includes (value)) {
      alert (`${value} est déjà sélectionné`);
    } else {
      setDaysAvalaible ([...newDaysAvalaible, value]);
      handleChange ([...newDaysAvalaible, value]);
    }
  };
  const handleDeleteSelect = value => {
    const filterList = newDaysAvalaible.filter (day => day !== value);
    setDaysAvalaible ([...filterList]);
    handleChange (value);
  };
  return (
    <div>
      <TextField
        select
        variant="outlined"
        label="test filter"
        value={itemSelected}
        margin="normal"
        className={classes.textField}
        onChange={handleChangeSelect ()}
      >
        {days.map (day => (
          <MenuItem key={day} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>

      <div>
        {newDaysAvalaible.map (day => (
          <Chip
            key={day}
            label={day}
            color="primary"
            className={classes.chip}
            onDelete={() => handleDeleteSelect (day)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectDay;
