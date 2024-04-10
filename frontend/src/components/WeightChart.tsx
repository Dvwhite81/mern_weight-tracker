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
import { ChartDataType } from '../utils/types';

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
}

const WeightChart = ({ data }: WeightChartProps) => {
  return (
    <div className="weight-chart-container">
      <Line data={data} />
    </div>
  );
};

export default WeightChart;
