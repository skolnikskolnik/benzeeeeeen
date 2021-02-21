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
            margin: theme.spacing(1),
        },
    },
}));

export default function BasicButtonGroup() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>7</Button>
                <Button>8</Button>
                <Button>9</Button>
                <Button>^</Button>
            </ButtonGroup>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>4</Button>
                <Button>5</Button>
                <Button>6</Button>
                <Button>-</Button>
            </ButtonGroup>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
                <Button>*</Button>
            </ButtonGroup>
            <Button variant="contained" color="secondary">
                Submit
</Button>
        </div>
    );
}