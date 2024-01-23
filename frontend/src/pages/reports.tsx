import React, { useEffect, useState, useRef } from 'react';

import { IChartProps, IDistributionExpenses, ISalesReport } from '../types';
import DEChart from '../components/de_chart';
import BookSalesChart from '../components/sales_chart';

const fetchData = async (timeout: number = 3000) : Promise<IDistributionExpenses[]> => {

  const controller = new AbortController();

  const options = {
    timeout: timeout,
    signal: controller.signal
  }

  const id = setTimeout(() => controller.abort(), timeout);

  const [ publishersResponse, authorsResponse ] = await Promise.all([
    fetch("http://localhost:8000/reports/publishers/expenses", options ),
    fetch("http://localhost:8000/reports/authors/expenses", options )
  ]);

  const publishersDE = await publishersResponse.json();
  const authorsDE = await authorsResponse.json();

  clearTimeout(id)

  return [publishersDE, authorsDE]
}

export default function ReportsPage() {

  const [ publishersDEData, setPublishersDEData ] = useState<IDistributionExpenses>({});
  const [ authorsDEData, setAuthorsDEData ] = useState<IDistributionExpenses>({});

  const [ booksSalesData, setBooksSalesData ] = useState<ISalesReport>({});
  const [ authorsSalesData, setAuthorsSalesData ] = useState<ISalesReport>({});
  const [ publishersSalesData, setPublishersSalesData ] = useState<IDistributionExpenses>({});

  useEffect(() => {
    console.log("Fetching charts data...") 
    fetchData()
      .then(response => {
        setPublishersDEData(response[0]);
        setAuthorsDEData(response[1]);
      });

    fetch("http://localhost:8000/reports/books/10")
      .then((response) => response.json())
      .then(data => {
        setBooksSalesData(data)
      });
    
    fetch("http://localhost:8000/reports/authors/10")
      .then((response) => response.json())
      .then(data => {
        setAuthorsSalesData(data)
      });
    
    fetch("http://localhost:8000/reports/publishers/10")
      .then((response) => response.json())
      .then(data => {
        setPublishersSalesData(data)
      });

  }, [])

  return (
    <div className="w-full h-screen p-3 flex flex-col">
      <div className="grid grid-cols-3 p-5"> 
        <div className="flex flex-col"> 
          { Object.keys(booksSalesData).length != 0 ? 
            <BookSalesChart 
              reportData={booksSalesData} 
              chartTitle={"Top N books sales"} /> : 
            <div>Loading...</div>
          }
        </div>
        <div className="flex flex-col"> 
          <h1 className="mr-1"> Top <span className="mr-1 font-bold">N</span> Authors' books' sold</h1> 
          { Object.keys(authorsSalesData).length != 0 ? 
            <BookSalesChart 
              reportData={authorsSalesData}
              chartTitle={"Top N author's book's sales."} /> :
            <div>Loading...</div>
          }
        </div>
        <div className="flex flex-col"> 
          <h1 className="mr-1"> Top <span className="mr-1 font-bold">N</span> Publisher's book's sold</h1> 
          { Object.keys(authorsSalesData).length != 0 ? 
            <BookSalesChart 
              reportData={publishersSalesData} /> :
            <div>Loading...</div>
          }
        </div>
      </div>
      <div className="grid grid-cols-2 p-5">
        <div className="w-full flex justify-center">
          <DEChart 
            reportData={authorsDEData} 
            chartTitle='Authors DE Data'
          />
        </div>
        <div className="flex justify-center">
          { Object.keys(publishersDEData).length != 0 ? 
            <DEChart 
              reportData={publishersDEData} 
              chartTitle='Publishers DE Data'
            /> :
            <div>Loading...</div>
          } 
        </div>
      </div>
    </div>
  )
}
