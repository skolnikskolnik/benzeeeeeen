import React from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import nanoparticles from "../images/nanoparticle.jpg";
import Card from "../components/Card";
import "../styles/homepage.css";

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

function Calculator() {
  
  const classes = useStyles();

  return (
    <Container fluid>
        
    </Container>
  );
}

export default Calculator;