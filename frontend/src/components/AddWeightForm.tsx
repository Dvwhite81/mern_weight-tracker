import { SyntheticEvent, useState } from 'react';
import FormInput from './FormInput';
import { WeightFormData, WeightType } from '../utils/types';
import { getFirstUserWeight } from '../utils/helpers';

interface AddWeightFormProps {
  addWeight: (newWeight: WeightFormData) => void;
  userWeights: WeightType[];
}

const AddWeightForm = ({ addWeight, userWeights }: AddWeightFormProps) => {
  const [weight, setWeight] = useState<number>(getFirstUserWeight(userWeights));

  const handleAddWeight = (e: SyntheticEvent) => {
    e.preventDefault();

    if (weight !== 0) {
      const date = new Date();
      const label = date.toLocaleDateString('en-US');
      console.log('form weight, date:', weight, date);
      const newWeight = { weight, label, date };
      addWeight(newWeight);
    }
  };
  return (
    <form className="form event-form" onSubmit={handleAddWeight}>
      <FormInput
        field={{
          name: 'event-weight-input',
          label: 'Weight',
          inputType: 'text',
          value: weight.toString(),
          setValue: (value: string) => setWeight(parseFloat(value)),
        }}
      />
      <button type="submit">Add Weight</button>
    </form>
  );
};

export default AddWeightForm;
