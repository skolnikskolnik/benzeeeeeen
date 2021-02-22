import React, { useEffect, useState } from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import "../styles/homepage.css";
import Grid from '@material-ui/core/Grid';
import Calculator from "../components/Calculator";
import Table from "../components/Table";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  display: {
    width: "100%",
    padding: "5px"
  },
  submit: {
    margin: "10px"
  },
  acidName: {
    width: "95%",
    margin: "10px"
  },
  acidInfo: {
    width: "45%",
    margin: "10px"
  }
}));

function AcidDatabase() {
  const classes = useStyles();
  const [acidValue, setAcidValue] = useState('pKa');
  const [displayString, setDisplayString] = useState("");

  //Takes data from the calculator and turns it into a displayed string
  const handleBtnClick = event => {
    event.preventDefault();

    let currentValue = event.currentTarget.value;
    if((currentValue == "0")||(currentValue == "1")||(currentValue == "2")||(currentValue == "3")||(currentValue == "4")||(currentValue == "5")||(currentValue == "6")||(currentValue == "7")||(currentValue == "8")||(currentValue == "9")||(currentValue == "^")||(currentValue == "-")||(currentValue == "*")||(currentValue == ".")){
      setDisplayString(displayString + currentValue);
    } else if (currentValue == "Delete"){
      let stringToDisplay = displayString;
      stringToDisplay = stringToDisplay.substring(0, stringToDisplay.length -1);
      setDisplayString(stringToDisplay);
    } else {
      setDisplayString("");
    }

  }


  const handleRadioChange = (event) => {
    setAcidValue(event.target.value);
  };


  return (
    <Container fluid>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <Input className={classes.acidName} defaultValue="Acid name" inputProps={{ 'aria-label': 'description' }} />
              <Input className={classes.acidInfo} defaultValue="pKa" inputProps={{ 'aria-label': 'description' }} />
              <Input className={classes.acidInfo} defaultValue="Ka" inputProps={{ 'aria-label': 'description' }} />
            </div>
            <TextField className={classes.display} id="outlined-basic" label={displayString} variant="outlined" />
            <Calculator
              id="acidpKa"
              handleBtnClick={handleBtnClick} />
            <RadioGroup aria-label="pKaorKa" name="pKaorKa" value={acidValue} onChange={handleRadioChange}>
              <FormControlLabel value="pKa" control={<Radio />} label="pKa" />
              <FormControlLabel value="Ka" control={<Radio />} label="Ka" />
            </RadioGroup>
            <Box textAlign='center'>
              <Button className={classes.submit} variant="contained" color="secondary">
                Submit new acid to database
            </Button>
            </Box>
          </form>
        </Grid>
        <Grid item xs={8}>
          <Table />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AcidDatabase;
