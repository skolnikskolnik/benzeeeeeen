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
import PopupForm from "../PopupForm";

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
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  popup: {
    padding: "25px",
    zIndex: "1"
  }
});




export default function CustomizedTables(props) {
  const classes = useStyles();
  const [acidList, setAcidList] = useState([]);
  const [formDisplay, setFormDisplay] = useState("none");
  const [idToEdit, setIdToEdit] = useState("");
  const [newPka, setNewPka] = useState("");

  //Loads all acids currently in the db
  useEffect(() => {
    loadAcids()
  }, [acidList]);

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

  const handleEdit = (event, idNum) => {
    event.preventDefault();

    // console.log(idNum);
    setIdToEdit(idNum);
    //Need to bring up a form upon hitting edit
    setFormDisplay("block");
  }

  //Makes form invisible again if dismiss button is clicked
  const dismissForm = event => {
    event.preventDefault();
    setFormDisplay("none");
  }

  //Gets the info from the popup to update the database
  const updateFromPopup = event => {
    event.preventDefault();
    //Name is idToEdit and pKa is newPka - both custom hooks
    //Need to convert pKa to Ka
    let pKa = parseFloat(newPka);
    pKa = pKa.toFixed(4);
    let newKa = Math.pow(10, (-1*pKa));
    newKa = newKa.toFixed(6);

    let inputObject = {
      name: idToEdit,
      pKa: pKa,
      Ka: newKa
    }

    //Need a put route
    //!!!!!!!!!!!!!!!

  }

  //Gets name from the popup form
  const handleNameChange = event => {
    event.preventDefault();
    setIdToEdit(event.target.value);
  }

  //Gets new pKa from the popup form
  const handleNewpKa = event => {
    event.preventDefault();
    setNewPka(event.target.value);
  }

  return (
    <div>
      <PopupForm 
      handleNewpKa={handleNewpKa}
      handleNameChange={handleNameChange} 
      displayItem={formDisplay} 
      className={classes.popup} 
      updateFromPopup={updateFromPopup} 
      dismissForm={dismissForm}/>
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
                  <Button onClick={event => handleEdit(event, item._id)} variant="contained" color="primary">
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
    </div>
  );
}
