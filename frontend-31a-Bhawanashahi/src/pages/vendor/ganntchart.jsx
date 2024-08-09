import React from 'react';
import { Chart } from 'react-google-charts';

const GanttChart = () => {
   
   
      const data = [
        ['Month', 'Booking Increasing Rate'],
        ['January', 10],
        ['February', 20],
        ['March', 30],
        ['April', 40],
        ['May', 50],
        ['June', 60],
        ['July', 70],
        ['August', 80],
        ['September', 90],
        ['October', 100],
        ['November', 110],
        ['December', 120],
      ];
    
      const options = {
        title: 'Booking Increasing Rate by Month',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
          title: 'Month',
        },
        vAxis: {
          title: 'Rate',
        },
      };
    
      return (
        <div className="chart-container">
          <h2>Booking Increasing Rate</h2>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      );
    };
    
    
    

export default GanttChart;
