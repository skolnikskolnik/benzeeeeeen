import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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

function createData(name, formula, pKa, Ka) {
  return { name, formula, pKa, Ka };
}

//The rows will need to be made from props
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Acid name</StyledTableCell>
            <StyledTableCell align="right">Chemical formula</StyledTableCell>
            <StyledTableCell align="right">pKa</StyledTableCell>
            <StyledTableCell align="right">Ka</StyledTableCell>
            <StyledTableCell align="right">Edit entry</StyledTableCell>
            <StyledTableCell align="right">Delete entry</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.formula}</StyledTableCell>
              <StyledTableCell align="right">{row.pKa}</StyledTableCell>
              <StyledTableCell align="right">{row.Ka}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary">
                  Edit entry
</Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="secondary">
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
