import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import VolumeSlider from "../VolumeSlider";
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import ScatterPlot from '../ScatterPlot';
import ExcelOutput from "../ExcelOutput";
import generateXYstrong from "../../lib/generateXYstrong";

//Inline CSS
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    inLine: {
        display: "in-line"
    },
    box: {
        padding: "5px",
        margins: "5px"
    },
    line: {
        width: "60%",
        float: "left",
        margins: "5px"
    },
    submit: {
        margins: "15px",
        left: "10px"
    },
    genExcel: {
        float: "left"
    }
}));

//Styling the input for base increments
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);


export default function TextFieldSizes() {
    const classes = useStyles();
    const [acidSelected] = useState("HA");
    const [acidVolume, setAcidVolume] = useState(20);
    const [baseVolume, setBaseVolume] = useState(20);
    const [baseIncrement, setBaseIncrement] = useState("0.1");
    const [acidConc, setAcidConc] = useState(0);
    const [acidConcPow, setAcidConcPow] = useState(0);
    const [baseConc, setBaseConc] = useState(0);
    const [baseConcPow, setBaseConcPow] = useState(0);
    const [pHCoordinates, setPHcoordinates] = useState([]);
    const [scatPlotVis, setScatPlotVis] = useState(false);

    //Pull all acids from the db
    useEffect(() => {

    }, []);



    //gets quantity from acid volume slider
    const acidVolumeFunction = (event, value) => {
        event.preventDefault();
        setAcidVolume(value);
    }

    //Gets base volume
    const baseVolumeFunction = (event, value) => {
        event.preventDefault();
        setBaseVolume(value);
    }

    //Gets vol increments from selector
    const incrementSelector = event => {
        event.preventDefault();
        setBaseIncrement(event.target.value);
    }

    //Gets components of acid concentration
    const handleAcidConc = event => {
        event.preventDefault();
        setAcidConc(event.target.value);
    }

    //Gets power of ten of acid concentration
    const handleAcidConcPow = event => {
        event.preventDefault();
        setAcidConcPow(event.target.value);
    }

    //Gets reg number for base conc
    const handleBaseConc = event => {
        event.preventDefault();
        setBaseConc(event.target.value);
    }

    //Gets power of ten for base conc
    const handleBaseConcPow = event => {
        event.preventDefault();
        setBaseConcPow(event.target.value);
    }

    //When user clicks submit, this generates the xy coordinates and sets the visibility of the chart to true 
    const handleSubmit = event => {
        event.preventDefault();

        //Need acid name, volume acid, acid concentration, volume base, base concentration, and increments, final vol base
        let acidConcNew = acidConc * Math.pow(10, acidConcPow);
        let baseConcNew = baseConc * Math.pow(10, baseConcPow);

        let xyCoordinates = generateXYstrong(acidConcNew, acidVolume, baseConcNew, baseVolume, baseIncrement);
        // let xyCoordinates = generateXY(selectedPka, acidConcNew, baseConcNew, baseIncrement, baseVolume, acidVolume);
        setPHcoordinates(xyCoordinates);
        setScatPlotVis(true);


    }



    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Box className={classes.box}>
                <h3>This form is for strong-acid/strong base titrations.</h3>
                <h4>Want to see weak-acid/strong-base? Click
                <Link href="/titrationcurve">
                            &nbsp; here.
              </Link></h4>
              <h4>Want to see strong-acid/weak-base? Click
                <Link href="/weakbasestrongacid">
                            &nbsp; here.
              </Link></h4>
                    
                <div className={classes.inLine}>
                    <FormControl className={classes.formControl}>
                    </FormControl>
                </div>
            </Box>
            <hr className={classes.line}></hr>
            <Box className={classes.box}>
                <div>
                    <h3>H<sup>+</sup> volume and concentration:</h3>
                    <VolumeSlider handleChange={acidVolumeFunction} volToDisplay={acidVolume} acidName={acidSelected} />
                    <br></br>
                    <TextField onChange={handleAcidConc} label="Acid concentration" id="standard-size-small" placeholder="1.00" size="small" />
                    <span>*10^</span>
                    <TextField onChange={handleAcidConcPow} label="Power of ten" id="standard-size-small" placeholder="0" size="small" />
                </div>
            </Box>
            <hr className={classes.line}></hr>
            <Box className={classes.box}>
                <div>
                    <h3>Hydroxide volume, concentration, and frequency:</h3>
                    <VolumeSlider handleChange={baseVolumeFunction} volToDisplay={baseVolume} acidName="hydroxide" />
                    <br></br>
                    <TextField onChange={handleBaseConc} label="Base concentration" id="standard-size-small" placeholder="1.00" size="small" />
                    <span>*10^</span>
                    <TextField onChange={handleBaseConcPow} label="Power of ten" id="standard-size-small" placeholder="0" size="small" />
                    <br></br>
                    <h4>Increments for measuring pH:</h4>
                    <NativeSelect
                        onChange={incrementSelector}
                        id="demo-customized-select-native"
                        // value={age}
                        input={<BootstrapInput />}
                    >
                        <option value={0.01}>0.01 mL</option>
                        <option value={0.05}>0.05 mL</option>
                        <option value={0.10}>0.10 mL</option>
                        <option value={0.50}>0.50 mL</option>
                        <option value={1.00}>1.00 mL</option>
                    </NativeSelect>
                </div>
            </Box>
            <hr className={classes.line}></hr>
            <br></br>
            <Button onClick={handleSubmit} className={classes.submit} variant="contained" color="secondary">
                Submit
            </Button>
            {scatPlotVis ?
                <ExcelOutput
                    coordinates={pHCoordinates}
                />
                : null}
            <Box>
                {scatPlotVis ?
                    <h3>Titration curve for {acidSelected}</h3>
                    : null}
                {scatPlotVis ?
                    <ScatterPlot
                        xyCoordinates={pHCoordinates}
                    />
                    : null
                }
            </Box>
        </form>

    );
}
