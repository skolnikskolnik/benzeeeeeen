import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
            cursor: "pointer",
            opacity: 0.8,
            backgroundColor: "white"
        },
    },
    box: {
        backgroundColor: "#ffff99",
        position: "absolute",
        width: "65%",
        borderRadius: "5px",
        cursor: "pointer",
        zIndex: "1",
        borderStyle: "dashed",
        borderColor: "#b3b300"
    },
    textField: {
        width: "35%"
    },
    button: {
       zIndex: "1",
       opacity: "1",
       backgroundColor: "#333300"
    }
}));



export default function BasicTextFields(props) {
    const classes = useStyles();

    return (
        <Box display={props.displayItem} className={classes.box}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField onChange={props.handleNameChange} className={classes.textField} id="standard-basic" label="acid name" />
                <TextField onChange={props.handleNewpKa} className={classes.textField} id="standard-basic" label="acid pKa" />
                <Button onClick={props.updateFromPopup} className={classes.button} variant="contained" color="secondary">
                    Submit
                </Button>
                <Button onClick={props.dismissForm} className={classes.button} variant="contained" color="secondary">
                    Dismiss
                </Button>
            </form>
        </Box>
    );
}
