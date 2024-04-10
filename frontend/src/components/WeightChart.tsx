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
import { ChartDataType, WeightType } from '../utils/types';
import { useEffect } from 'react';

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
  data: ChartDataType;
  userWeights: WeightType[];
  updateData: (value: string) => void;
  currentTimeFrame: string;
}

const WeightChart = ({
  data,
  userWeights,
  updateData,
  currentTimeFrame,
}: WeightChartProps) => {
  useEffect(() => {
    updateData(currentTimeFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWeights]);

  return (
    <div className="weight-chart-container">
      <Line data={data} />
    </div>
  );
};

export default WeightChart;
