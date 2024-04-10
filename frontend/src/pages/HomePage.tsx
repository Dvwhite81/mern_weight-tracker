import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  WeightType,
  UserType,
  WeightFormData,
  ChartDataType,
} from '../utils/types';
import WeightChart from '../components/WeightChart';
import AddModal from '../components/AddModal';
import { getChartData } from '../utils/helpers';

interface HomePageProps {
  loggedInUser: UserType | null;
  userWeights: WeightType[];
  addWeight: (newWeight: WeightFormData) => void;
  handleDeleteWeight: (weightId: string) => void;
}

const HomePage = ({ loggedInUser, userWeights, addWeight }: HomePageProps) => {
  const [modalClass, setModalClass] = useState('modal hide');
  const [currentTimeFrame, setCurrentTimeFrame] = useState('all');
  const [data, setData] = useState<ChartDataType>(
    getChartData(userWeights, 'all')
  );

  console.log('data:', data);

  const navigate = useNavigate();

  const updateData = (timeFrame: string) => {
    setCurrentTimeFrame(timeFrame);
    const chartData = getChartData(userWeights, timeFrame);

    setData(chartData);
  };

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <div className="timeframe-btns">
        <button
          type="button"
          className="btn timeframe-btn"
          onClick={() => updateData('all')}
        >
          All
        </button>
        <button
          type="button"
          className="btn timeframe-btn"
          onClick={() => updateData('year')}
        >
          This Year
        </button>
        <button
          type="button"
          className="btn timeframe-btn"
          onClick={() => updateData('month')}
        >
          This Month
        </button>
      </div>
      <WeightChart
        data={data}
        userWeights={userWeights}
        updateData={updateData}
        currentTimeFrame={currentTimeFrame}
      />
      <button
        type="button"
        className="btn btn-submit"
        onClick={() => setModalClass('modal')}
      >
        Add Weight
      </button>
      <AddModal
        userWeights={userWeights}
        addWeight={addWeight}
        modalClass={modalClass}
        setModalClass={setModalClass}
        updateData={updateData}
        currentTimeFrame={currentTimeFrame}
      />
    </div>
  );
};

export default HomePage;
