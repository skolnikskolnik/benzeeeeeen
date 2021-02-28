import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
  volumeDisplay: {
      float: "right"
  }
}));


//Returns the value from
const valuetext = value => {
    return `${value}`;
}

export default function DiscreteSlider(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-custom" gutterBottom>
        Volume {props.acidName} added (mL):
        <span className={classes.volumeDisplay}>{props.volToDisplay} mL</span>
      </Typography>
      <Slider
        onChange={(event, value) => props.handleChange(event, value)}
        defaultValue={20}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={1}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
