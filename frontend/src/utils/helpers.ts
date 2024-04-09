import { compareAsc } from 'date-fns';
import { TimeFrameType, WeightType } from './types';

export const getFirstUserWeight = (userWeights: WeightType[]) => {
  if (userWeights.length === 0) {
    return 170;
  } else {
    return userWeights[0].weight;
  }
};

const addDays = (current: Date, days: number) => {
  const date = new Date(current);
  date.setDate(date.getDate() + days);
  return date;
};

const getDates = (date: Date) => {
  const dates = [];
  let current = date;
  const now = new Date();

  while (current <= now) {
    dates.push(current);
    current = addDays(current, 1);
  }

  return dates;
};

const getOneYearAgo = (date: Date) => {
  const dateObj = new Date(date);
  const yearAgo = dateObj.getFullYear() - 1;
  dateObj.setFullYear(yearAgo);
  return dateObj;
};

const getSixMonthsAgo = (date: Date) => {
  const dateObj = new Date(date);
  const sixMonthsAgo = dateObj.getMonth() - 6;
  dateObj.setMonth(sixMonthsAgo);
  return dateObj;
};

const getOneMonthAgo = (date: Date) => {
  const dateObj = new Date(date);
  const oneMonthAgo = dateObj.getMonth() - 1;
  dateObj.setMonth(oneMonthAgo);
  return dateObj;
};

const getLastYear = (now: Date, dates: Date[]) => {
  const oneYearAgo = getOneYearAgo(now);
  const yearDates = getDates(oneYearAgo);

  return dates.filter((date) => yearDates.indexOf(date) !== -1);
};

const getLastSixMonths = (now: Date, dates: Date[]) => {
  const sixMonthsAgo = getSixMonthsAgo(now);
  const sixMonthsDates = getDates(sixMonthsAgo);

  return dates.filter((date) => sixMonthsDates.indexOf(date) !== -1);
};

const getLastOneMonth = (now: Date, dates: Date[]) => {
  const oneMonthAgo = getOneMonthAgo(now);
  const oneMonthDates = getDates(oneMonthAgo);

  return dates.filter((date) => oneMonthDates.indexOf(date) !== -1);
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
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

const getYearLabels = (dates: Date[]) => {
  const years = dates.map((date) => new Date(date).getFullYear());
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const yearLabels = [];
  for (let i = minYear; i <= maxYear; i++) {
    yearLabels.push(i.toString());
  }

  return yearLabels;
};

const getMonthLabels = (numMonths: number) => {
  let currentMonthIndex = new Date().getMonth();

  const labels = [];

  while (labels.length < numMonths) {
    const month = monthLabels[currentMonthIndex];
    labels.push(month);
    currentMonthIndex = (currentMonthIndex + 1) % 12;
  }

  return labels;
};

const getDayLabels = () => {
  const currentDay = new Date().getDate();
  const labels = [];

  for (let i = 1; i <= currentDay; i++) {
    labels.push(i.toString());
  }
};

export const getLabels = (timeFrame: string, dates: Date[]) => {
  switch (timeFrame) {
    case 'all': {
      return getYearLabels(dates);
    }
    case 'year': {
      return getMonthLabels(12);
    }
    case 'sixMonths': {
      return getMonthLabels(6);
    }
    case 'oneMonth': {
      return getDayLabels();
    }
    default: {
      return getYearLabels(dates);
    }
  }
};

export const getUserTimeFrame = (userWeights: WeightType[]) => {
  const sortedWeights = userWeights.sort((a, b) => compareAsc(a.date, b.date));
  const dates = sortedWeights.map((weight) => weight.date);
  const now = new Date();

  const all = {
    labels: sortedWeights.map((weight) => new Date(weight.date).toDateString()),
    weights: sortedWeights,
  };
  const year = {
    labels: getLabels('year', dates),
    weights: getLastYear(now, dates),
  };
  const sixMonths = {
    labels: getLabels('sixMonths', dates),
    weights: getLastSixMonths(now, dates),
  };
  const oneMonth = {
    labels: getLabels('oneMonth', dates),
    weights: getLastOneMonth(now, dates),
  };

  return {
    all,
    year,
    sixMonths,
    oneMonth,
  };
};

export const getChartData = (timeFrameObj: TimeFrameType) => {
  const { labels, weights } = timeFrameObj;
  return {
    labels,
    datasets: [
      {
        label: `Your weights for this time frame`,
        data: weights.map((weight) => weight.weight),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};
