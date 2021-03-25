import React from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import StrongAcidForm from "../components/StrongAcidForm";



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


function StrongAcidStrongBase() {

    const classes = useStyles();


    return (
        <Container fluid>
            <Grid item xs={12}>
                <Paper className={classes.paper_main}>
                    <h1>Strong acid/strong base titrations </h1>
                </Paper>
                <StrongAcidForm />
            </Grid>
        </Container>
    );
}

export default StrongAcidStrongBase;