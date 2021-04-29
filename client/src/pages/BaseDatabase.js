import React, { useState } from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import "../styles/homepage.css";
import Grid from '@material-ui/core/Grid';
import Calculator from "../components/Calculator";
import TableBase from "../components/TableBase";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import getKaFromPka from "../lib/getKaFromPka";
import API from "../utils/API";
import log10 from "../lib/log10";




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



function BaseDatabase() {
    const classes = useStyles();


    const [displayString, setDisplayString] = useState("");
    const [baseValue, setBaseValue]= useState("pKb");

    const [baseName, setBaseName] = useState("");

  
  
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
        if (string.includes("*10^")) {
            let beforeString = string.split("^")[0];
            let afterString = string.split("^")[1];
            setDisplayNumber(beforeString);
            setDisplayPowerOfTen(afterString);
        } else {
            setDisplayNumber(string);
            setDisplayPowerOfTen("")
        }
    }

    //
    const generateBaseData = event => {
        event.preventDefault();

        let pKb=0;
        let valKb=0;


        if (baseValue == "pKb") {
            pKb = parseFloat(displayString);
            pKb = pKb.toFixed(4);

            //Calculate Kb from pKb
            valKb = getKaFromPka(pKb);

    
            insertIntoDB(pKb, valKb);
          } else {
            valKb = displayString;
            let valKbSplit = valKb.split("*10^-");
    
            // //This will have two elements if entered in sci notation and one if entered in standard notation
            if (valKbSplit.length == 1) {
              valKb = parseFloat(valKb);
              valKb = valKb.toFixed(10);
              pKb = -1 * log10(valKb);
              pKb = pKb.toFixed(4);

    
              insertIntoDB(pKb, valKb);
              //If it is entered in scientific notation
            } else if (valKbSplit.length == 2) {
              let regNumKb = valKbSplit[0];
              regNumKb = parseFloat(regNumKb);
              let powerOfTen = valKbSplit[1];
              powerOfTen = parseFloat(powerOfTen);
    
              valKb = regNumKb * Math.pow(10, -1 * powerOfTen);
              valKb = valKb.toFixed(10);
              pKb = -1 * log10(valKb);
              pKb = pKb.toFixed(4);

              insertIntoDB(pKb, valKb);
            }
        }

    }

    //Togles between kB and pKb
    const manageRadio = event => {
        event.preventDefault();
        let inputType = event.target.value;
        setBaseValue(inputType);   
    }

    //Gets acid name
    const getAcidName = event => {
        event.preventDefault();
        let { value } = event.target;
        setBaseName(value);
    }

    //Adds an acid to the db from the info given
  const insertIntoDB = (pKb, Kb) => {
    let inputObject = {
      name: baseName,
      pKb: pKb,
      Kb: Kb
    }


    API.addBaseToDB(inputObject)
      .then(() => {
        setSuccessOpen(true);
      })
      .catch(err => console.log(err));

    window.location.reload(true);
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
                            <Input className={classes.acidName} onChange={getAcidName} placeholder="Base name" inputProps={{ 'aria-label': 'description' }} />

                        </div>
                        <Box className={classes.display} variant="outlined"> Value: {displayNumber} <sup>{displayPowerOfTen}</sup></Box>
                        <Calculator
                            id="acidpKa"
                            handleBtnClick={handleBtnClick} />
                        <RadioGroup aria-label="pKaorKa" name="pKaorKa" >
                            <FormControlLabel value="pKb" onChange={manageRadio} control={<Radio />} label="pKb" />
                            <FormControlLabel value="Kb" onChange={manageRadio} control={<Radio />} label="Kb" />
                        </RadioGroup>
                        <Box textAlign='center'>
                            <Button className={classes.submit} onClick={generateBaseData} variant="contained" color="secondary" >
                                Submit new base to database
            </Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item item lg={8} md={8} sm={12} xs={12}>
                    <TableBase />
                </Grid>
            </Grid>
        </Container >
    );
}

export default BaseDatabase;