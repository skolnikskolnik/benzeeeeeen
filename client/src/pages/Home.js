import React from "react";
import { Container } from "../components/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
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

function Home() {
  
  const classes = useStyles();

  return (
    <Container fluid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper_main}>
            <h1>Benzeeeeeen</h1>
          </Paper>
        </Grid>
        <Grid item xs={3}>
            <Card image={nanoparticles} />
        </Grid>
        <Grid item xs={9}>
            <h1>About us</h1>
            <p>This website is dedicated to make the everyday lives of chemistry teachers a bit easier, as it is designed by a teacher with eight years of teaching experience.</p>
            <p>Some portions of this site require a membership as we crowd-source certain pieces of information, like pKa values of weak acids, or specific information about what chemicals are stored in the lab. Anything that can be open to the public will be.</p>
            <p>For more information, visit &nbsp;    
              <Link href="https://skolnikskolnik.github.io/skolportfolio/#/">
              Julie's website .
              </Link>
              </p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;


