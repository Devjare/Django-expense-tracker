
import React, {useState, useEffect } from 'react';
import { IChartProps, ChartData, ChartOptions } from '../types';
import { generalOptions, baseChartData } from '../constants';

import { Chart } from 'react-chartjs-2';

const BookSalesChart = ( { publishersData, data: baseChartData, options: generalOptions } : IChartProps ) => { 

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; 
  let series = [1,2,3,4,5,5,6,7,8];
  const [ data, setData ] = useState<ChartData>(baseChartData);
 
  const randomIntFromInterval = (min:number, max:number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  let updatedOptions = { ...generalOptions };

  const onChangeSelect = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = e?.target.selectedOptions[0].value;

    if (selected != undefined && selected == "2") {
      series = series.map((el) => el + randomIntFromInterval(-100,100));
    }
    else if (selected != undefined && selected == "3") {
      series = series.map((el) => el + randomIntFromInterval(-100,100));
    } else {
      series = series.map((el) => el + randomIntFromInterval(-100,100));
    }

    setData({ 
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: series,
          borderColor: ['rgb(53, 162, 235)'],
          backgroundColor: ['rgba(53, 162, 235, 0.5)'],
        }
      ]
    });
  }
  
  updatedOptions.plugins = updatedOptions.plugins || {};
  updatedOptions.plugins.title = updatedOptions.plugins.title || {};
  updatedOptions.plugins.title.text = "Gral Options title";
  
  return (
    <div>
      <div>
        <select className='rounded-lg border-2 p-2' onChange={(e) => onChangeSelect(e)}>
          <option id="opt-1" value="1">opt-1</option>
          <option id="opt-2" value="2">opt-2</option>
          <option id="opt-3" value="3">opt-3</option>
        </select>
      </div>
      <Chart 
        type='line'
        width={300}
        options={updatedOptions} 
        data={data} />
    </div>
  );
}

export default BookSalesChart;
