import { WeightFormData, WeightType } from '../utils/types';
import AddWeightForm from './AddWeightForm';

interface AddModalProps {
  userWeights: WeightType[];
  addWeight: (newWeight: WeightFormData) => void;
  modalClass: string;
  closeModal: () => void;
}

const AddModal = ({
  userWeights,
  addWeight,
  modalClass,
  closeModal,
}: AddModalProps) => {
  return (
    <div className={modalClass} id="add-weight-modal">
      <button className="btn close-btn" onClick={closeModal}>
        x
      </button>
      <AddWeightForm
        userWeights={userWeights}
        addWeight={addWeight}
        closeModal={closeModal}
      />
    </div>
  );
};

export default AddModal;
