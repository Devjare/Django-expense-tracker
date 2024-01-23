// constants.ts
// import { ChartData, ChartOptions } from 'chart.js';
import { ChartData, ChartOptions } from './types';

export const baseChartData: ChartData = {
  labels: [],
  datasets: [
    {
      fill: true,
      label: '',
      data: [],
      borderColor: [],
      backgroundColor: [],
    },
  ],
};

export let generalOptions : ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

