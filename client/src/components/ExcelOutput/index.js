import React from "react";
import ReactExport from "react-data-export";
import Button from '@material-ui/core/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//Stops page from refreshing when user downloads the excel file
const handleClick = event => {
    event.preventDefault();
}


export default class Download extends React.Component {
    
    state = {
        coordinates: this.props.coordinates
    }

    render() {
        return (
            <ExcelFile element={<Button
            onClick={handleClick}
            variant="contained"
            color="primary"
            style={{ float: "right" }}
            >
                Download .csv file
                </Button>}>
                <ExcelSheet data={this.state.coordinates} name="Employees">
                    <ExcelColumn label="pH" value="x"/>
                    <ExcelColumn label="Volume base added" value="y"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}
