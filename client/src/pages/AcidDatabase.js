import React from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import "../styles/homepage.css";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Calculator from "../components/Calculator";
import Table from "../components/Table";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

function AcidDatabase() {
    const classes = useStyles();

    return (
        <Container fluid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Calculator />
                    <Paper className={classes.paper}>Test</Paper>
            </Grid>
                <Grid item xs={6}>
                    Acids in db will populate here
                    <Table />
            </Grid>
            </Grid>
        </Container>
    );
}

export default AcidDatabase;
