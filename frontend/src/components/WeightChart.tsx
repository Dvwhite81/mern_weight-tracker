import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeightType } from '../utils/types';
import { getChartData, getUserTimeFrame, options } from '../utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeightChartProps {
  userWeights: WeightType[];
  handleDeleteWeight: (weightId: string) => void;
}

const WeightChart = ({ userWeights }: WeightChartProps) => {
  const userTimeFrame = getUserTimeFrame(userWeights);

  const [timeFrame, setTimeFrame] = useState(userTimeFrame.all);
  const [data, setData] = useState(getChartData(timeFrame));

  return (
    <div className="weight-chart-container">
      <Line options={options} data={data} />
    </div>
  );
};

export default WeightChart;
