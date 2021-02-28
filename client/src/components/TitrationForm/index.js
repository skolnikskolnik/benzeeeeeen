import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import API from "../../utils/API";
import VolumeSlider from "../VolumeSlider";
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

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
    const [acids, setAcids] = useState([]);
    const [acidSelected, setAcidSelected] = useState("HA");
    const [acidVolume, setAcidVolume] = useState(0);
    const [baseVolume, setBaseVolume] = useState(0);
    const [baseIncrement, setBaseIncrement] = useState(0);

    //Pull all acids from the db
    useEffect(() => {
        loadAcids()
    }, []);

    //Gets all the acids from the database
    const loadAcids = () => {
        API.getAllAcids()
            .then(res => {
                setAcids(res.data);
            });
    }

    //Gets acid from radio 
    const selectAcid = event => {
        event.preventDefault();
        setAcidSelected(event.target.id);
    }

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

    const handleSubmit = event => {
        event.preventDefault();
        console.log("test");
    }


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Box className={classes.box}>
                <div className={classes.inLine}>
                    <FormControl className={classes.formControl}>
                        <Select
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {acids.map((item, index) => {
                                return (
                                    <MenuItem key={index} onClick={selectAcid} value={item.name} id={item.name}>{item.name}</MenuItem>
                                );
                            })}
                        </Select>
                        <FormHelperText>Select your acid</FormHelperText>
                        <span>Not seeing the acid you want? &nbsp;
                    <Link href="/aciddatabase/">
                                Click here to edit the database.
                    </Link>
                        </span>
                    </FormControl>
                </div>
            </Box>
            <hr className={classes.line}></hr>
            <Box className={classes.box}>
                <div>
                    <h3>{acidSelected} volume and concentration:</h3>
                    <VolumeSlider handleChange={acidVolumeFunction} volToDisplay={acidVolume} acidName={acidSelected} />
                    <br></br>
                    <TextField label="Base concentration" id="standard-size-small" placeholder="1.00" size="small" />
                    <span>*10^</span>
                    <TextField label="Power of ten" id="standard-size-small" placeholder="0" size="small" />
                </div>
            </Box>
            <hr className={classes.line}></hr>
            <Box className={classes.box}>
                <div>
                    <h3>Hydroxide volume, concentration, and frequency:</h3>
                    <VolumeSlider handleChange={baseVolumeFunction} volToDisplay={baseVolume} acidName="hydroxide" />
                    <br></br>
                    <TextField label="Base concentration" id="standard-size-small" placeholder="1.00" size="small" />
                    <span>*10^</span>
                    <TextField label="Power of ten" id="standard-size-small" placeholder="0" size="small" />
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
        </form>
    );
}
