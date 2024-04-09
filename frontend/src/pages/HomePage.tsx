import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { WeightType, UserType, WeightFormData } from '../utils/types';
import WeightChart from '../components/WeightChart';
import AddModal from '../components/AddModal';

interface HomePageProps {
  loggedInUser: UserType | null;
  userWeights: WeightType[];
  addWeight: (newWeight: WeightFormData) => void;
  handleDeleteWeight: (weightId: string) => void;
}

const HomePage = ({
  loggedInUser,
  userWeights,
  addWeight,
  handleDeleteWeight,
}: HomePageProps) => {
  const [modalClass, setModalClass] = useState('modal hide');

  const navigate = useNavigate();

  const closeModal = () => setModalClass('modal hide');
  const openModal = () => setModalClass('modal');

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <div className="timeframe-btns">
        <button type="button" className="btn timeframe-btn">
          All
        </button>
        <button type="button" className="btn timeframe-btn">
          This Year
        </button>
        <button type="button" className="btn timeframe-btn">
          Last Six Months
        </button>
        <button type="button" className="btn timeframe-btn">
          This Month
        </button>
      </div>
      <WeightChart
        userWeights={userWeights}
        handleDeleteWeight={handleDeleteWeight}
      />
      <button type="button" className="btn" onClick={openModal}>
        Add Weight
      </button>
      <AddModal
        userWeights={userWeights}
        addWeight={addWeight}
        modalClass={modalClass}
        closeModal={closeModal}
      />
    </div>
  );
};

export default HomePage;
