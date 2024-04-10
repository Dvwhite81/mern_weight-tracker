import { WeightFormData, WeightType } from '../utils/types';
import AddWeightForm from './AddWeightForm';

interface AddModalProps {
  userWeights: WeightType[];
  addWeight: (newWeight: WeightFormData) => void;
  modalClass: string;
  setModalClass: (value: string) => void;
  updateData: (value: string) => void;
  currentTimeFrame: string;
}

const AddModal = ({
  userWeights,
  addWeight,
  modalClass,
  setModalClass,
  updateData,
  currentTimeFrame,
}: AddModalProps) => {
  const closeModal = () => setModalClass('modal hide');
  return (
    <div className={modalClass} id="add-weight-modal">
      <button className="btn close-btn" onClick={closeModal}>
        x
      </button>
      <AddWeightForm
        userWeights={userWeights}
        addWeight={addWeight}
        closeModal={closeModal}
        updateData={updateData}
        currentTimeFrame={currentTimeFrame}
      />
    </div>
  );
};

export default AddModal;
