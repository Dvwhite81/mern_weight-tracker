import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { WeightType, UserType } from '../utils/types';

interface ProfilePageProps {
  loggedInUser: UserType | null;
  userWeights: WeightType[];
}

const ProfilePage = ({ loggedInUser, userWeights }: ProfilePageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  });

  return (
    <div className="page profile-page">
      <h2>Your Weights</h2>
      <div className="weight-table-container">
        <table id="weight-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {userWeights.map((weight) => (
              <tr key={weight._id}>
                <td>{new Date(weight.date).toDateString()}</td>
                <td>{weight.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
