import React, { useEffect, useState, useRef } from 'react';

import { IChartProps, IDistributionExpenses, PublisherData } from '../types';
import { baseChartData, generalOptions } from '../constants';
import PublisherDEChart from '../components/publisher_de_chart';
import BookSalesChart from '../components/authors_de_chart';

import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function ReportsPage() {
  
  const [ publishersData, setPublishersData ] = useState<IDistributionExpenses>({});
  const [ authorsData, setAuthorsData ] = useState<IDistributionExpenses>({});

  useEffect(() => {
    fetch("http://localhost:8000/reports/publishers/expenses")
    .then((response) => response.json())
    .then(data => {
        console.log("Obtained publishers data: ")
        setPublishersData(data)
      });

    fetch("http://localhost:8000/reports/authors/expenses")
    .then((response) => response.json())
    .then(data => {
        setAuthorsData(data)
      })
  }, [])

  return (
    <div className="w-full h-screen p-5 flex flex-col">
      <div className="grid grid-cols-3 p-5"> 
        <div className="flex flex-col"> 
          <h1 className="mr-1"> Top <span className="mr-1 font-bold">N</span> Sold books with expense</h1> 
          <BookSalesChart 
            publishersData={publishersData} 
            data={baseChartData} 
            options={generalOptions} />
        </div>
        <div className="flex flex-col"> 
          <h1 className="mr-1"> Top <span className="mr-1 font-bold">N</span> Authors' books' sold</h1> 
          <BookSalesChart 
            publishersData={publishersData} 
            data={baseChartData} 
            options={generalOptions} />
        </div>
        <div className="flex flex-col"> 
          <h1 className="mr-1"> Top <span className="mr-1 font-bold">N</span> Publisher's book's sold</h1> 
          <BookSalesChart 
            publishersData={publishersData} 
            data={baseChartData} 
            options={generalOptions} />
        </div>
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="w-full flex justify-center">
          <PublisherDEChart 
            publishersData={authorsData} 
            data={baseChartData} 
            options={generalOptions}/>
        </div>
        <div className="w-full flex justify-center">
          <PublisherDEChart 
            publishersData={publishersData} 
            data={baseChartData} 
            options={generalOptions}/>
        </div>
      </div>
    </div>
  )
}
