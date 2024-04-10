import { compareAsc } from 'date-fns';
import { ChartDataType, WeightType } from './types';

export const getFirstUserWeight = (userWeights: WeightType[]) => {
  if (userWeights.length === 0) {
    return 170;
  } else {
    const last = userWeights[userWeights.length - 1];
    return last.weight;
  }
};

export const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getAllWeights = (sortedWeights: WeightType[]) => {
  return sortedWeights;
};

const getYearWeights = (sortedWeights: WeightType[]) => {
  const now = new Date();
  const currentYear = now.getFullYear();

  return sortedWeights.filter(
    (weight) => new Date(weight.date).getFullYear() === currentYear
  );
};

const getMonthWeights = (sortedWeights: WeightType[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();

  return sortedWeights.filter(
    (weight) => new Date(weight.date).getMonth() === currentMonth
  );
};

export const getWeightsInTimeFrame = (
  userWeights: WeightType[],
  timeFrame: string
) => {
  const sortedWeights = userWeights.sort((a, b) => compareAsc(a.date, b.date));

  switch (timeFrame) {
    case 'all':
    default: {
      return getAllWeights(sortedWeights);
    }
    case 'year': {
      return getYearWeights(sortedWeights);
    }
    case 'month': {
      return getMonthWeights(sortedWeights);
    }
  }
};

export const getChartData = (
  userWeights: WeightType[],
  timeFrame: string
): ChartDataType => {
  const weightsForChart = getWeightsInTimeFrame(userWeights, timeFrame);
  const labels = weightsForChart.map((weight) =>
    new Date(weight.date).toDateString()
  );
  console.log('weightsForChart:', weightsForChart);

  const chartLabel =
    timeFrame === 'all'
      ? 'Your weights - All'
      : `Your weights for this ${timeFrame}`;
  return {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: weightsForChart.map((weight) => weight.weight),
        borderColor: 'rgb(214, 143, 214)',
        backgroundColor: 'rgba(214, 143, 214, 0.5)',
      },
    ],
  };
};
