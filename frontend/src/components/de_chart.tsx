import React, { useState, useEffect } from 'react';
import { generateColors } from "../utils";
import { baseChartData, generalOptions } from '../constants';

import { IChartProps, ChartData } from '../types';

import { Chart, Doughnut } from 'react-chartjs-2';

import { 
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';


ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
);


const DEChart = ( { reportData: publishersData, chartTitle: chartTitle } : IChartProps ) => {
  
  const [ selectedPublisher, setSelectedPublisher ] = useState(""); 
  const [ data, setData ] = useState<ChartData>(baseChartData);  
  
  // const updatedOptions = { ...generalOptions };
  const updatedOptions = JSON.parse(JSON.stringify(generalOptions));

  useEffect(() => { 
    console.log("Rendering Doughnut charts.")
    if (publishersData != null && Object.keys(publishersData).length > 0) {
      if (selectedPublisher != "") {
        updatedOptions.plugins = updatedOptions.plugins || {};
        updatedOptions.plugins.title = updatedOptions.plugins.title || {};
        updatedOptions.plugins.title.text = `${selectedPublisher} distribution expense`;
        
        updatedOptions.plugins.tooltip = updatedOptions.plugins.tooltip || {};
        updatedOptions.plugins.tooltip.callbacks = updatedOptions.plugins.tooltip.callbacks || {};
        updatedOptions.plugins.tooltip.callbacks.title = (tooltipItem) => tooltipItem.label;
      
        const selectedData = publishersData[selectedPublisher];
          
        if ('categories' in selectedData) {

          const labels = Object.keys(selectedData.categories);
          const values = Object.values<number>(selectedData.categories);

          setData({
            labels: labels ? labels : [],
            datasets: [
              {
                data: values ? values : [],
                borderColor: ['rgba(0, 0, 0, 0.2)'],
                backgroundColor: generateColors(labels.length),
              },
            ],
          })
        }
      }
    }
  }, 
  [selectedPublisher])

  return (
  <div className='flex flex-col'>
      <select 
        id="select-publisher" 
        className='max-w-lg p-2 mr-2 bg-white rounded-lg shadow-lg'
        onChange={(e) => {setSelectedPublisher(e.target.value)} }>
        {
          Object.keys(publishersData).length != 0 ? Object.keys(publishersData).map( name => <option key={name} id={`p-${name}`} value={name}>{name}</option> ) : ""
        }
      </select>
      <Chart
        id={chartTitle}
        type="doughnut"
        data={data}
        options={updatedOptions}
      />
  </div>
  ) 
}

export default DEChart;
