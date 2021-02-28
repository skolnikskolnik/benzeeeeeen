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
import API from "../utils/API";
import Alert from "../components/Alert";


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
  const [acidValue, setAcidValue] = useState("pKa");
  const [acidName, setAcidName] = useState("");
  const [displayString, setDisplayString] = useState("");
  const [acidList, setAcidList] = useState([]);

  //Loads all acids currently in the db
  useEffect(() => {
    // loadAcids()
  }, []);


  //Takes data from the calculator and turns it into a displayed string
  const handleBtnClick = event => {
    event.preventDefault();

    let currentValue = event.currentTarget.value;
    if ((currentValue == "0") || (currentValue == "1") || (currentValue == "2") || (currentValue == "3") || (currentValue == "4") || (currentValue == "5") || (currentValue == "6") || (currentValue == "7") || (currentValue == "8") || (currentValue == "9") || (currentValue == "^") || (currentValue == "-") || (currentValue == "*") || (currentValue == ".")) {
      //Need to convert to tex
      setDisplayString(displayString + currentValue);
    } else if (currentValue == "Delete") {
      let stringToDisplay = displayString;
      stringToDisplay = stringToDisplay.substring(0, stringToDisplay.length - 1);
      //Need to convert to tex
      setDisplayString(stringToDisplay);
    } else {
      //Need to convert to tex
      setDisplayString("");
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
      valKa = Math.pow(10, (-1 * pKa));
      valKa = valKa.toFixed(6);


    } else {
      console.log("Ka");
    }

    let inputObject = {
      name: acidName,
      pKa: pKa,
      Ka: valKa
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
        {/* <Display /> */}
        <Grid item xs={4}>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <Input className={classes.acidName} onChange={handleChange} placeholder="Acid name" inputProps={{ 'aria-label': 'description' }} />
            </div>
            <TextField className={classes.display} id="outlined-basic" value={displayString} variant="outlined" />
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
        <Grid item xs={8}>
          <Table />
        </Grid>
      </Grid>
    </Container >
  );
}

export default AcidDatabase;
