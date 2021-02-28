import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import API from "../../utils/API";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});




export default function CustomizedTables(props) {
  const classes = useStyles();
  const [acidList, setAcidList] = useState([]);
  
  //Loads all acids currently in the db
  useEffect(() => {
    loadAcids()
  }, []);

  //Gets acids from the db
  const loadAcids = () => {
    API.getAllAcids()
    .then(res => {
      setAcidList(res.data);
    })
  }

  const handleDelete = (event, idNum) => {
    event.preventDefault();
    //Need to target the id number to delete the acid
    API.removeAcid(idNum)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }



  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Acid name</StyledTableCell>
            <StyledTableCell align="right">pKa</StyledTableCell>
            <StyledTableCell align="right">Ka</StyledTableCell>
            <StyledTableCell align="right">Edit entry</StyledTableCell>
            <StyledTableCell align="right">Delete entry</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {acidList.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.pKa}</StyledTableCell>
              <StyledTableCell align="right">{item.Ka} </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary">
                  Edit entry
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={event => handleDelete(event, item._id)} variant="contained" color="secondary" value={item._id}>
                  Delete entry
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
