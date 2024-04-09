import { SyntheticEvent, useEffect, useState } from 'react';

import { WeightType, UserType, WeightFormData } from '../utils/types';
import AddWeightForm from '../components/AddWeightForm';
import { useNavigate } from 'react-router-dom';
import WeightChart from '../components/WeightChart';

interface HomePageProps {
  loggedInUser: UserType | null;
  userWeights: WeightType[];
  addWeight: (newWeight: WeightFormData) => void;
  handleDeleteWeight: (weightId: string) => void;
  handleLogOut: (e: SyntheticEvent) => void;
}

const HomePage = ({
  loggedInUser,
  userWeights,
  addWeight,
  handleDeleteWeight,
  handleLogOut,
}: HomePageProps) => {
  const [showWeights, setShowWeights] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect loggedInUser:', loggedInUser);

    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page home-page">
      <h2>Logged In User: {loggedInUser?.username}</h2>
      <button type="button" onClick={handleLogOut}>
        Log Out
      </button>

      {!showWeights && (
        <button type="button" onClick={() => setShowWeights(true)}>
          Show Weights
        </button>
      )}

      {showWeights && (
        <div>
          <button type="button" onClick={() => setShowWeights(false)}>
            Hide Weights
          </button>
          <WeightChart
            userWeights={userWeights}
            handleDeleteWeight={handleDeleteWeight}
          />
        </div>
      )}

      <AddWeightForm userWeights={userWeights} addWeight={addWeight} />
    </div>
  );
};

export default HomePage;
