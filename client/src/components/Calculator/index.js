import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    calculator: {
        height: "60px",
        width: "90px",
        backgroundColor: "#07BEB8",
        color: "white"
    },
}));


export default function BasicButtonGroup(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup size="large" aria-label="outlined primary button group">
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="7">7</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="8">8</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="9">9</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="^">^</Button>
            </ButtonGroup>
            <ButtonGroup  size="large" aria-label="outlined primary button group">
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="4">4</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="5">5</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="6">6</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="-">-</Button>
            </ButtonGroup>
            <ButtonGroup  size="large" aria-label="outlined primary button group">
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="1">1</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="2">2</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="3">3</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="*">*</Button>
            </ButtonGroup>
            <ButtonGroup  size="large" aria-label="outlined primary button group">
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="0">0</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick}value=".">.</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="Delete">Del</Button>
                <Button className={classes.calculator} onClick={props.handleBtnClick} value="Clear">Clear</Button>
            </ButtonGroup>
        </div>
    );
}