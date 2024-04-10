import { SyntheticEvent, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import FormInput from './FormInput';
import { WeightFormData, WeightType } from '../utils/types';
import { getFirstUserWeight } from '../utils/helpers';

interface AddWeightFormProps {
  addWeight: (newWeight: WeightFormData) => void;
  userWeights: WeightType[];
  closeModal: () => void;
  updateData: (value: string) => void;
  currentTimeFrame: string;
}

const AddWeightForm = ({
  addWeight,
  userWeights,
  closeModal,
  updateData,
  currentTimeFrame,
}: AddWeightFormProps) => {
  const [weight, setWeight] = useState<number>(getFirstUserWeight(userWeights));
  const [date, setDate] = useState<Date>();

  const handleAddWeight = (e: SyntheticEvent) => {
    e.preventDefault();

    if (weight !== 0 && date) {
      const label = date.toDateString();
      console.log('form weight, date:', weight, date);
      const newWeight = { weight, label, date };
      addWeight(newWeight);
      updateData(currentTimeFrame);
      closeModal();
    }
  };

  return (
    <form className="form new-weight-form" onSubmit={handleAddWeight}>
      <div className="form-input-container">
        <DayPicker mode="single" selected={date} onSelect={setDate} />
      </div>
      <FormInput
        field={{
          name: 'new-weight-input',
          label: 'Weight',
          inputType: 'text',
          value: weight.toString(),
          setValue: (value: string) => setWeight(parseFloat(value)),
        }}
      />
      <button type="submit" className="btn btn-submit">
        Add Weight
      </button>
    </form>
  );
};

export default AddWeightForm;
