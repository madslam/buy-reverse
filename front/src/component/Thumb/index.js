import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cBox: {
    backgroundColor: 'rgb(191, 191, 195)',

    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 300,
    [theme.breakpoints.up('sm')]: {
      height: 150,
    },
    [theme.breakpoints.up('md')]: {
      height: 200,
    },
    [theme.breakpoints.up('lg')]: {
      height: 350,
    },
  },
  imageContent: {width: '100%', height: '100%'},
}));

const Thumb = ({src, alt, title, onClick}) => {
  const classes = useStyles();

  return (
    <div className={classes.cBox} onClick={onClick}>
      <img className={classes.imageContent} src={src} alt={alt} title={title} />
    </div>
  );
};

Thumb.propTypes = {
  alt: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.string,
  src: PropTypes.string.isRequired,
};

export default Thumb;
