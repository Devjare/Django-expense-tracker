import React, { useEffect, useState } from 'react';

import { ChartData, IDistributionExpenses } from '../types';

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

import { Chart, Doughnut, Line } from 'react-chartjs-2';

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

const generalOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: ''
    },
  },
};


const PublisherDEChart = ( { publishersData } : IDistributionExpenses ) => {
  
  const [ selectedPublisher, setSelectedPublisher ] = useState("");
  const [ data, setData ] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        fill: true,
        label: 'Placeholder label',
        data: [],
        borderColor: ['rgb(53, 162, 235)'],
        backgroundColor: ['rgba(53, 162, 235, 0.5)'],
      },
    ],
  });  

  useEffect(() => { 
  
    if (publishersData != null) {
      setSelectedPublisher(Object.keys(publishersData)[0]);
      generalOptions.plugins.title.text = `${selectedPublisher} distribution expense`

      const labels = Object.keys(publishersData[selectedPublisher].categories)
      const values = Object.values<number>(publishersData[selectedPublisher].categories)
      setData({
        labels: labels ? labels : [],
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: values ? values : [],
            borderColor: ['rgb(53, 162, 235)'],
            backgroundColor: ['rgba(53, 162, 235, 0.5)'],
          },
        ],
      })

    }
  }, 
  [selectedPublisher])

  return (
  <div className='flex'>
      <select id="select-publisher">
        {
          Object.keys(publishersData).map( 
          name => <option id={`p-${name}`} value={name}>{name}</option> )
        }
      </select>
      <Doughnut
        data={data}
      />
  </div>
  ) 
}

const BookSalesChart = () => { 

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; 
  let series = [1,2,3,4,5,5,6,7,8];
  const [ data, setData ] = useState({
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: series,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });
 
  const randomIntFromInterval = (min:number, max:number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const onChangeSelect = (e?: React.ChangeEvent<HTMLSelectElement>) => {
    let selected = e?.target.selectedOptions[0].value;
    console.log("Selected value: ", selected)
    console.log("Series: ", series)
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
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    });
  }
  
  generalOptions.plugins.title.text = "Gral Options title"
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
        options={generalOptions} 
        data={data} />
    </div>
  );
}

export default function ReportsPage() {
  
  const [ publishersData, setPublishersData ] = useState<IDistributionExpenses>({});

  useEffect(() => {
    fetch("http://localhost:8000/reports/publishers/")
    .then((response) => response.json())
    .then(data => {
        setPublishersData(data);
      })
  }, [])

  return (
    <div className="w-full h-screen p-5">
      <div className="grid grid-cols-3">
        <div className="flex">
          <p>Grid col 1</p>
        </div>
        <div className="flex">
          <p>Grid col 2</p>
        </div>
        <div className="flex">
          <p>Grid col 3</p>
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div className="flex col-span-4">
          <BookSalesChart />
        </div>
        <div className="flex col-span-1">
          <PublisherDEChart publishersData={publishersData}/>
        </div>
      </div>
    </div>
  )
}
