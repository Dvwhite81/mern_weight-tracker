import { useEffect, useState } from 'react';
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
import { getChartData, getUserTimeFrame } from '../utils/helpers';

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

  useEffect(() => {
    const updateData = () => {
      setTimeFrame(timeFrame);
      setData(getChartData(timeFrame));
    };

    updateData();
  }, [timeFrame, userWeights]);

  return (
    <div className="weight-chart-container">
      <Line data={data} />
    </div>
  );
};

export default WeightChart;
