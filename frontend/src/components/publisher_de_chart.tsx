import React, { useState, useEffect } from 'react';
import { generateColors } from "../utils";

import { IChartProps, ChartData, ChartOptions } from '../types';

import { Doughnut } from 'react-chartjs-2';


const PublisherDEChart = ( { 
  data: baseChartData, 
  options: generalOptions, 
  publishersData: publishersData } : IChartProps ) => {
  
  const [ selectedPublisher, setSelectedPublisher ] = useState(""); 
  const [ data, setData ] = useState<ChartData>(baseChartData);  
  
  let updatedOptions = { ...generalOptions };

  useEffect(() => { 
    if (publishersData != null && Object.keys(publishersData).length > 0) {
      if (selectedPublisher != "") {
        updatedOptions.plugins = updatedOptions.plugins || {};
        updatedOptions.plugins.title = updatedOptions.plugins.title || {};
        updatedOptions.plugins.title.text = `${selectedPublisher} distribution expense`;

        console.log("Publishers data: ")
        console.log(typeof publishersData)
    
        const selectedData = publishersData[selectedPublisher];
          
        if ('categories' in selectedData) {

          const labels = Object.keys(selectedData.categories);
          const values = Object.values<number>(selectedData.categories);

          console.log(labels)
          console.log(values)

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
          publishersData ? Object.keys(publishersData).map( name => <option id={`p-${name}`} value={name}>{name}</option> ) : ""
        }
      </select>
      <Doughnut
        data={data}
        options={updatedOptions}
      />
  </div>
  ) 
}

export default PublisherDEChart;
