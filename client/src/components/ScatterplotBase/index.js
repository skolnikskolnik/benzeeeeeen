import React, { Component } from 'react'
import Chart from "chart.js";


export default class ScatterPlot extends Component {
    
    state = {
        coordinates: this.props.xyCoordinates
    }

    chartRef = React.createRef();

    componentDidMount() {
        this.displayChart();
    }

    displayChart(){
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'pH values',
                    data: this.state.coordinates,
                    borderColor: "#363A59"
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: "volume H^+ added"
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "pH"
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate(prevProps){
        if (this.props.xyCoordinates !== prevProps.xyCoordinates) {
            this.displayChart();
        }
    }



    render() {

        return (
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}