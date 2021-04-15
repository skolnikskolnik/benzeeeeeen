import React from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import WeakBaseForm from "../components/WeakBaseForm";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper_main: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: "#CCCFE0",
    }
}));


function WeakBaseStrongAcid() {

    const classes = useStyles();


    return (
        <Container fluid>
            <Grid item xs={12}>
                <Paper className={classes.paper_main}>
                    <h1>Strong acid/weak base titrations (In-progress)</h1>
                </Paper>
                <WeakBaseForm />
            </Grid>
        </Container>
    );
}

export default WeakBaseStrongAcid;