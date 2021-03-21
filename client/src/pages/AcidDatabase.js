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
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import API from "../utils/API";
import log10 from "../lib/log10";
import getKaFromPka from "../lib/getKaFromPka";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: "90%",
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  display: {
    width: "100%",
    padding: "5px",
    borderStyle: "ridge",
    margin: "5px"
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
  },
  paper_main: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: "#CCCFE0",
  }
}));



function AcidDatabase() {
  const classes = useStyles();

  const [acidValue, setAcidValue] = useState("pKa");
  const [acidName, setAcidName] = useState("");

  const [displayString, setDisplayString] = useState("");

  const [acidList, setAcidList] = useState([]);

  //Trying a workaround to display the value entered as Ka as a power of ten
  const [displayNumber, setDisplayNumber] = useState("");
  const [displayPowerOfTen, setDisplayPowerOfTen] = useState("");



  //Takes data from the calculator and turns it into a displayed string
  const handleBtnClick = event => {
    event.preventDefault();

    let currentValue = event.currentTarget.value;
    if ((currentValue == "0") || (currentValue == "1") || (currentValue == "2") || (currentValue == "3") || (currentValue == "4") || (currentValue == "5") || (currentValue == "6") || (currentValue == "7") || (currentValue == "8") || (currentValue == "9") || (currentValue == "^") || (currentValue == "-") || (currentValue == "*") || (currentValue == ".")) {
      //Need to convert to tex
      setDisplayString(displayString + currentValue);
      addExponent(displayString + currentValue);
    } else if (currentValue == "Delete") {
      let stringToDisplay = displayString;
      stringToDisplay = stringToDisplay.substring(0, stringToDisplay.length - 1);
      //Need to convert to tex
      setDisplayString(stringToDisplay);
      addExponent(stringToDisplay);
    } else {
      //Need to convert to tex
      setDisplayString("");
      addExponent("");
    }

  }

  //Takes display string and breaks it into two parts to display on screen with exponent
  const addExponent = string => {
    if(string.includes("*10^")){
      let beforeString = string.split("^")[0];
      let afterString = string.split("^")[1];
      setDisplayNumber(beforeString);
      setDisplayPowerOfTen(afterString);
    } else {
      setDisplayNumber(string);
      setDisplayPowerOfTen("")
    }
  }

  //Generates the object to enter to the db
  const generateAcidData = event => {
    event.preventDefault();
    //Need to get the values from the inputs
    //Starting with the radio dial
    let pKa = 0;
    let valKa = 0;

    if (acidValue == "pKa") {
      pKa = parseFloat(displayString);
      pKa = pKa.toFixed(4);
      //Calculate Ka from pKa
      valKa = getKaFromPka(pKa);

      insertIntoDB(pKa, valKa);
    } else {
      valKa = displayString;
      let valKaSplit = valKa.split("*10^-");

      //This will have two elements if entered in sci notation and one if entered in standard notation
      if (valKaSplit.length == 1) {
        valKa = parseFloat(valKa);
        valKa = valKa.toFixed(10);
        pKa = -1 * log10(valKa);
        pKa = pKa.toFixed(4);

        insertIntoDB(pKa, valKa);
        //If it is entered in scientific notation
      } else if (valKaSplit.length == 2) {
        let regNumKa = valKaSplit[0];
        regNumKa = parseFloat(regNumKa);
        let powerOfTen = valKaSplit[1];
        powerOfTen = parseFloat(powerOfTen);

        valKa = regNumKa * Math.pow(10, -1 * powerOfTen);
        valKa = valKa.toFixed(10);
        pKa = -1 * log10(valKa);
        pKa = pKa.toFixed(4);

        insertIntoDB(pKa, valKa);
      }
    }

  }

  //Adds an acid to the db from the info given
  const insertIntoDB = (pKa, Ka) => {
    let inputObject = {
      name: acidName,
      pKa: pKa,
      Ka, Ka
    }

    API.addAcidToDB(inputObject)
      .then(() => {
        setSuccessOpen(true);
      })
      .catch(err => console.log(err));

    window.location.reload(true);
  }

  //Toggles between pKa and Ka
  const manageRadio = event => {
    event.preventDefault();
    let inputType = event.target.value;
    setAcidValue(inputType);

  }

  //Gets acid name
  const handleChange = event => {
    event.preventDefault();
    let { value } = event.target;
    setAcidName(value);
  }



  return (
    <Container fluid>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <Paper className={classes.paper_main}>
            <h1>Benzeeeeeen</h1>
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <Input className={classes.acidName} onChange={handleChange} placeholder="Acid name" inputProps={{ 'aria-label': 'description' }} />
            </div>
            <Box className={classes.display} variant="outlined"> Value: {displayNumber} <sup>{displayPowerOfTen}</sup>  </Box>
            <Calculator
              id="acidpKa"
              handleBtnClick={handleBtnClick} />
            <RadioGroup aria-label="pKaorKa" name="pKaorKa" value={acidValue}>
              <FormControlLabel onChange={manageRadio} value="pKa" control={<Radio />} label="pKa" />
              <FormControlLabel onChange={manageRadio} value="Ka" control={<Radio />} label="Ka" />
            </RadioGroup>
            <Box textAlign='center'>
              <Button className={classes.submit} variant="contained" color="secondary" onClick={generateAcidData}>
                Submit new acid to database
            </Button>
            </Box>
          </form>
        </Grid>
        <Grid item item lg={8} md={8} sm={12} xs={12}>
          <Table />
        </Grid>
      </Grid>
    </Container >
  );
}

export default AcidDatabase;