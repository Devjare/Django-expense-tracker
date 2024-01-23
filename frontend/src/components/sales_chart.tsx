
import React, {useState, useEffect } from 'react';
import { IChartProps, ChartData, ChartOptions, SaleData } from '../types';
import { baseChartData } from '../constants';

import { Chart } from 'react-chartjs-2';

import { 
  Chart as ChartJS,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale
} from 'chart.js';


ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  LinearScale,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

import { generateColors } from '../utils';

const BookSalesChart = ( { reportData: salesData, chartTitle: chartTitle } : IChartProps ) => { 
  
  const [ qty, setQty ] = useState(10); 
  const [ data, setData ] = useState<ChartData>(baseChartData);  
  
  let updatedOptions : ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
      tooltip: {
      callbacks: { 
          title: (tooltipItem) => {
            const itemId = tooltipItem[0].label;
            const name = 'title' in salesData ? salesData[itemId].title : salesData[itemId].name;
            return name;
          }
      }
    }
    }
  }
  
  updatedOptions.plugins.title.text = `${chartTitle}`;

  useEffect(() => { 
    console.log("Rendering bar charts, with data: ")
    console.log(salesData)
    if (salesData != null && Object.keys(salesData).length > 0) {
  
      let labels : string[] = []
      let values : number[] = []
      
      Object.entries(salesData).forEach(([key, value]) => {
        labels.push(key);
        values.push(value?.de);
      });

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
  }, 
  [qty])
  
  return (
    <div>
      <div className='flex justify-center'>
        <input 
          type='number' 
          placeholder='N'
          min={10}
          className='w-50 rounded-lg shadow-lg p-2 mx-auto border border-gray-300'
        />
      </div>
      <Chart 
        id={chartTitle}
        type='polarArea'
        width={300}
        options={updatedOptions} 
        data={data} />
    </div>
  );
}

export default BookSalesChart;
